import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {tickerStyles as styles, tickerRowStyles} from './styles';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import TickersRow from './TickersRow';
import {ThemeFunctions} from '../../utils';
import {commonStyles, rtlStyles} from '../../globalstyles/styles';
import {strings} from '../../strings';
import {StringConstants, Screen} from '../../enums';
import {LoadingSpinner, ThemeButton} from '../../components';
import {SpotListItem} from './SpotListItem';
import {APIConstants, MapperConstants} from '../../constants';
import {makeRequest} from '../../services/ApiService';
import {QuickBuyActions, TickersAction} from '../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThreeWaySortable from '../../components/ui/ThreeWaySortable';
import Navigation from '../../utils/Navigation';
import _ from 'lodash';
import {useIsMounted} from '../../utils/hooks/useIsMounted';

const TickersList = (props: any) => {
  const {
    selectedState,
    headerTabSelected,
    checkboxSelected,
    searchQuery,
    openPair,
    opened,
    setOpened,
  } = props;

  const dispatch = useDispatch();
  const {appColor} = useSelector((state: any) => state.globalReducer);
  const {pairs, stableCoins} = useSelector(
    (state: any) => state.quickBuyReducer,
  );
  const {tickers, isLoading, error} = useSelector(
    (state: any) => state.tickersReducer,
  );
  const [spotLoading, setSpotLoading] = useState(false);
  const [filteredTickers, setFilteredTickers] = useState(tickers);
  const [update, setUpdate] = useState({});
  const [priceDetails, setPriceDetails] = useState([]);
  const [firstLoaing, setFirstLoading] = useState(true);
  const [sortDirection, setSortDirection] = useState<SortDirection>(0);
  const [sortType, setSortType] = useState<SortType>('volume');

  const isMounted = useIsMounted();

  const toggleSort = (_sortType: SortType) => {
    if (sortType !== _sortType) {
      setSortDirection(1);
      setSortType(_sortType);
    } else {
      if (sortDirection === -1) setSortDirection(0);
      else if (sortDirection === 0) setSortDirection(1);
      else setSortDirection(-1);
    }
  };

  let polling: NodeJS.Timer;

  useEffect(() => {
    getPrices(true);
    dispatch(QuickBuyActions.getPairs());
    dispatch(QuickBuyActions.getStableCoin());
    if (tickers?.length === 0 && isLoading === false) {
      dispatch(TickersAction.getTickers());
    }
    setFirstLoading(false);

    polling = setInterval(() => {
      getPrices();
    }, 2000);

    return () => {
      if (polling) {
        clearInterval(polling);
      }
    };
  }, []);

  useEffect(() => {
    if (isMounted()) getTickers(tickers);
  }, [
    headerTabSelected,
    tickers,
    update,
    searchQuery,
    sortDirection,
    sortType,
    stableCoins,
  ]);

  useEffect(() => {
    if (sortType === 'volume') setSortDirection(0);
  }, [checkboxSelected]);

  const _isStablePair = pairName => {
    const [first, second] = pairName.split('-');
    let stableData = stableCoins || {};
    return (
      (stableData[first] || []).includes(second) ||
      (stableData[second] || []).includes(first)
    );
  };

  const getTickers = async tickers => {
    try {
      let filteredList = [
        ...tickers.filter(({pairName}) => !_isStablePair(pairName)),
      ];

      filteredList = filteredList.map(data => {
        let stockUsdPrice = data?.usdPrice || 0;
        let moneyUsdPrice = 0;
        if (data.stockUsdPrice) {
          stockUsdPrice = data.stockUsdPrice;
        }

        if (data.moneyUsdPrice) {
          moneyUsdPrice = data.moneyUsdPrice;
        }

        data['volumeUsd'] = data?.volume * data?.last * moneyUsdPrice || 0;
        return data;
      });

      if (headerTabSelected === 'star') {
        const name = 'favouriteTickers';
        const response = await AsyncStorage.getItem(name);

        if (response) {
          const favouriteNames = JSON.parse(response);
          const set = new Set(favouriteNames);
          filteredList = filteredList.filter(ticker =>
            set.has(ticker.pairName.toLowerCase()),
          );
        } else {
          filteredList = [];
        }
      }

      if (searchQuery) {
        filteredList = filteredList.filter(ticker =>
          ticker.pairName.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      }

      if (headerTabSelected !== 'ALL' && headerTabSelected !== 'star') {
        filteredList = filteredList.filter(
          ticker => ticker.pairName.split('-')[1] === headerTabSelected,
        );
      }

      if (sortDirection !== 0) {
        if (sortType === 'volume') {
          if (checkboxSelected === StringConstants.Volume) {
            filteredList = filteredList.sort(
              (a, b) => sortDirection * (b?.volume - a?.volume),
            );
          } else {
            filteredList = filteredList.sort(
              (a, b) => sortDirection * (b?.percentChange - a?.percentChange),
            );
          }
        } else {
          filteredList = filteredList.sort(
            (a, b) => sortDirection * (b?.volumeUsd - a?.volumeUsd),
          );
        }
      }

      if (openPair && !opened) {
        const matches = filteredList.filter(x => x.pairName === openPair);
        if (matches.length > 0) {
          const item = matches[0];

          setOpened(true);
          Navigation.navigate(Screen.Trading, {
            pair: item?.pairName,
            pairId: item?.pairId,
            data: item,
            updateList: () => setUpdate({}),
          });
        }
      }
      setFilteredTickers(filteredList);
    } catch (err) {
      console.log(err);
    }
  };

  const getPairs = () => {
    try {
      let filteredPairs = [...pairs];

      if (headerTabSelected === 'star') {
        filteredPairs = filteredPairs.filter(e => e.isFavourite);
      }

      if (searchQuery) {
        filteredPairs = filteredPairs.filter(ticker =>
          ticker.pair.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      }

      if (headerTabSelected !== 'ALL' && headerTabSelected !== 'star') {
        filteredPairs = filteredPairs.filter(
          ticker => ticker.secondCurrency === headerTabSelected,
        );
      }

      return filteredPairs;
    } catch (e) {
      console.log(e);
    }
  };

  const getPrices = async (shouldSetLoading?: boolean) => {
    if (shouldSetLoading) {
      setSpotLoading(true);
    }
    makeRequest(
      MapperConstants.ApiTypes.POST,
      APIConstants.GET_ALL_LATEST_PRICE,
      {},
      {},
    )
      .then(priceDetails => {
        setPriceDetails(priceDetails?.data || []);
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        if (shouldSetLoading) setSpotLoading(false);
      });
  };

  const {isRtlApproach, appTheme} = useSelector(
    (state: any) => state.globalReducer,
  );

  const sortDirectionVolume = sortType === 'volume' ? sortDirection : 0;
  const sortDirectionVolumeUsd = sortType === 'volumeUsd' ? sortDirection : 0;

  return (
    <>
      <View
        style={[
          styles.rowCard,
          {height: 40},
          isRtlApproach ? rtlStyles.reverseRow : '',
          ThemeFunctions.getTickerStripColor(appTheme, 'top'),
        ]}>
        <View
          style={[
            tickerRowStyles.col1,
            commonStyles.rowItem,
            styles.sort,
            styles.rowCardItem,
          ]}>
          <Text
            style={[
              styles.label,
              ThemeFunctions.getTickerHeader(appTheme),
              selectedState === StringConstants.Spot && {marginLeft: 30},
            ]}
            adjustsFontSizeToFit={true}
            numberOfLines={1}>
            {strings('pair')}
          </Text>

          {selectedState === StringConstants.Limit ? (
            <TouchableOpacity
              onPress={() => toggleSort('volumeUsd')}
              style={[
                {
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                },
              ]}>
              <Text
                style={[
                  styles.label,
                  ThemeFunctions.getTickerHeader(appTheme),
                  {marginRight: 5, marginLeft: 4},
                ]}
                adjustsFontSizeToFit={true}
                numberOfLines={1}>
                / {strings('volume')}
              </Text>

              <ThreeWaySortable sortDirection={sortDirectionVolumeUsd} />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
        <View
          style={[
            tickerRowStyles.col2,
            {marginLeft: '8%'},
            styles.rowCardItem,
            commonStyles.rowItem,
            styles.sort,
          ]}>
          <Text
            style={[styles.label, ThemeFunctions.getTickerHeader(appTheme)]}
            adjustsFontSizeToFit={true}
            numberOfLines={1}>
            {strings('price')}
          </Text>
        </View>
        {selectedState === StringConstants.Limit && (
          <TouchableOpacity
            onPress={() => toggleSort('volume')}
            style={[
              tickerRowStyles.change,
              styles.rowCardItem,
              commonStyles.rowItem,
              styles.sort,
            ]}>
            <Text
              style={[
                styles.label,
                ThemeFunctions.getTickerHeader(appTheme),
                {marginRight: 8},
              ]}
              adjustsFontSizeToFit={true}
              numberOfLines={1}>
              {checkboxSelected === StringConstants.Volume
                ? strings('vol_24')
                : strings('change')}
            </Text>

            <ThreeWaySortable sortDirection={sortDirectionVolume} />
          </TouchableOpacity>
        )}
      </View>
      {firstLoaing ? (
        <LoadingSpinner size="large" color={appColor} />
      ) : selectedState === StringConstants.Limit ? (
        error ? (
          <View style={{marginTop: 70}}>
            <Text
              style={[
                {fontSize: 20, fontWeight: '400', textAlign: 'center'},
                ThemeFunctions.getTextColor(appTheme),
              ]}>
              {strings('error_boundary_msg')}
            </Text>
            <ThemeButton
              text={strings('Try again')}
              onClickHandler={() => {
                dispatch(TickersAction.getTickers());
              }}
            />
          </View>
        ) : (
          <FlatList
            keyboardShouldPersistTaps="handled"
            data={filteredTickers}
            initialNumToRender={7}
            maxToRenderPerBatch={7}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.list]}
            refreshControl={
              <RefreshControl
                colors={[ThemeFunctions.getColor(appColor)]}
                tintColor={ThemeFunctions.getColor(appColor)}
                refreshing={isLoading}
                onRefresh={() => dispatch(TickersAction.getTickers())}
              />
            }
            renderItem={({item}) => (
              <TickersRow
                data={item}
                checkboxSelected={checkboxSelected}
                // updateList={() => setUpdate({})}
              />
            )}
            keyExtractor={(item, key) => {
              return `${item.pairName}`;
            }}
          />
        )
      ) : (
        <FlatList
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          data={getPairs()}
          initialNumToRender={7}
          maxToRenderPerBatch={7}
          contentContainerStyle={[styles.list]}
          refreshControl={
            <RefreshControl
              colors={[ThemeFunctions.getColor(appColor)]}
              tintColor={ThemeFunctions.getColor(appColor)}
              refreshing={spotLoading}
              onRefresh={() => getPrices(true)}
            />
          }
          renderItem={({item}) => (
            <SpotListItem data={item} priceDetails={priceDetails} />
          )}
          keyExtractor={item => item?.id?.toString()}
          ListEmptyComponent={item => (
            <Text
              style={{
                ...styles.placeholder,
                color: ThemeFunctions.customText(appTheme),
              }}>
              {strings('no_pairs_available')}
            </Text>
          )}
        />
      )}
    </>
  );
};

export default React.memo(TickersList, _.isEqual);
