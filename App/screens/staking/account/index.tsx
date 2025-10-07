import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  Linking,
  ScrollView,
  PixelRatio,
  Dimensions,
  Platform,
  FlatList,
  Animated,
  Keyboard,
  RefreshControl,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {CheckBox} from 'react-native-elements';

import {commonStyles} from '../../../globalstyles/styles';
import * as styles from './styles';
import * as ThemeFunctions from '../../../utils/ThemeFunctions';
import {
  FormatNumber,
  FormatToAbbreviateNumber,
} from '../../../utils/AppFunctions';
import Header from '../../../components/ui/Header';
import {homeStyles} from '../../home/styles';
import {strings} from '../../../strings';
import Navigation from '../../../utils/Navigation';
import {AppColor, Loader, Screen} from '../../../enums';
import IconVector from '../../../components/ui/IconVector';
import {
  ThemeText,
  SearchBar,
  LoadingSpinner,
  DismissKeyboardView,
  ThemeButton,
} from '../../../components';
import Colors from '../../../theme/Colors';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

import Image from 'react-native-fast-image';
import {DEFAULT_COIN_LOGO} from '../../../store/action/quickbuy/QuickBuyAction';
import PoolCard from './poolCard';
import {makeRequest, makeGetRequest} from '../../../services/StakingApiService';
import {APIConstants} from '../../../constants';
import {showToast} from '../../../utils/GenericUtils';
import {StakingActions} from '../../../store';
import {SCREEN_HEIGHT} from '../../../utils';

const Account = (props: any) => {
  const defaultFetchLimit = 5;

  const [availableSelector, setAvailableSelector] = useState(false);
  const [myStakeSelector, setMyStakeSelector] = useState(false);

  const [stakingType, setStakingType] = useState<StakingType>('locked');
  const [searchQuery, setSearchQuery] = useState<String>('');

  const [isLoadingNext, setIsLoadingNext] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isLoadingRewardSumary, setIsLoadingRewardSummary] = useState(false)
  const [rewardSummary, setRewardSummary] = useState([]);
  const [isLoadingRedeemAll, setLoadingRedeemAll] = useState(false);
  const [fetchedPage, setFetchedPage] = useState(1);
  const [historyData, setHistoryData] = useState([]);
  const [historyTotal, setHistoryTotal] = useState();
  // const [userStaked, setUserStaked] = useState<UserStaked>({
  //   currentStaked: 0,
  //   lockedStaked: 0,
  //   flexibleStaked: 0,
  // });
  // const [userEarnings, setUserEarnings] = useState<UserEarning>({
  //   totalEarning: 0,
  //   flexibleEarning: 0,
  //   lockedEarning: 0,
  // });

  const dispatch = useDispatch();

  const scrollViewRef = useRef();

  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer);
  const {
    isLoadingCurrentStaked,
    isLoadingCurrentEarnings,
    currentStaked,
    currentEarnings,
  } = useSelector((state: any) => state.stakingReducer);
  const quickBuyData = useSelector((state: any) => state.quickBuyReducer);

  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchHistory();
  }, [stakingType]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetchHistory();
    getAllRewards();

    dispatch(StakingActions.GetCurrentEarnings());
    dispatch(StakingActions.GetCurrentStaked());
  };

  const Scroll_Distance = 100,
    Header_Max_Height = 180,
    Header_Min_Height = 80,
    ScreenHeaderHeight = 60,
    CollapedHeaderHeight = 30;

  const cardHeight = 380;
  const paddingHeight = Math.max(
    SCREEN_HEIGHT + Scroll_Distance - cardHeight * historyData.length,
    0,
  );

  const animatedHeaderHeight = scrollY.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: 'clamp',
  });

  const animatedHideOpacity = scrollY.interpolate({
    inputRange: [0, Scroll_Distance * 0.2],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const animatedShowOpacity = scrollY.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const animatedHideHeight = (min, scrollDist = Scroll_Distance) =>
    scrollY.interpolate({
      inputRange: [0, scrollDist],
      outputRange: [min, 0],
      extrapolate: 'clamp',
    });

  const animatedHideHeightReverse = (min, scrollDist = Scroll_Distance) =>
    scrollY.interpolate({
      inputRange: [0, scrollDist],
      outputRange: [0, min],
      extrapolate: 'clamp',
    });

  // FETCH APIs

  const fetchHistory = () => {
    let url;

    if (stakingType === 'locked') url = APIConstants.STAKING_ACCOUNT_LOCKED;
    else url = APIConstants.STAKING_ACCOUNT_FLEXIBLE;
    setIsLoadingHistory(true);
    makeGetRequest(url, {
      page: 1,
      limit: defaultFetchLimit,
    })
      .then(res => {
        const {
          data,
          metadata: {total},
        } = res;

        setHistoryTotal(total);
        setHistoryData(data);
        setFetchedPage(1);
      })
      .catch(e => {})
      .finally(() => {
        setIsLoadingHistory(false);
      });
  };

  const loadNextHistory = () => {
    let url;

    if (stakingType === 'locked') url = APIConstants.STAKING_ACCOUNT_LOCKED;
    else url = APIConstants.STAKING_ACCOUNT_FLEXIBLE;

    setIsLoadingNext(true);

    makeGetRequest(url, {
      page: fetchedPage + 1,
      limit: defaultFetchLimit,
    })
      .then(res => {
        const {
          data,
          metadata: {total},
        } = res;

        setHistoryTotal(total);
        setHistoryData([...historyData, ...data]);
        setFetchedPage(fetchedPage + 1);
      })
      .catch(e => {})
      .finally(() => {
        setIsLoadingNext(false);
      });
  };

  const getAllRewards = () => {
    setIsLoadingRewardSummary(true)
    makeGetRequest(`pool/account/reward/${stakingType}`).then(res => {
      setRewardSummary(res.data)
    })
    .catch()
    .finally(() => {
      setIsLoadingRewardSummary(false)
    })
  }

  const onRedeemAll = () => {
    setLoadingRedeemAll(true);
    const url = `pool/${stakingType}/redeemdrip-all-reward`;
    makeGetRequest(url)
      .then(res => {
        let {status, message, data} = res;
        
        let type = 'error';
        if (status == 200) {
          type = 'success';
          fetchData();
        } else {
          if (data.message) {
            message = data.message
          }
        }
        showToast('Staking', message, type);
      })
      .catch(e => {
        showToast('Redeem All', 'error while redeeming', 'error');
      })
      .finally(() => {
        setLoadingRedeemAll(false);
      });
  };

  // const fetchStats_CurStaked = () => {
  //   makeGetRequest(APIConstants.STAKING_STATS_CURRENT_STAKED)
  //     .then(resp => {
  //       if (resp.data) {
  //         const {
  //           currentStaked = '0',
  //           lockedStaking = '0',
  //           flexibleStaking = '0',
  //         } = resp.data;

  //         setUserStaked({
  //           currentStaked,
  //           lockedStaked: lockedStaking,
  //           flexibleStaked: flexibleStaking,
  //         });
  //       }
  //     })
  //     .catch(e => {
  //       showToast('Staking', 'Error while fetching statistics', 'error');
  //     });
  // };

  // const fetchStats_CurEarning = () => {
  //   makeGetRequest(APIConstants.STAKING_STATS_CURRENT_EARNING)
  //     .then(resp => {
  //       if (resp.data) {
  //         const {
  //           flexibleEarning = '0',
  //           lockedEarning = '0',
  //           totalEarning = '0',
  //         } = resp.data;
  //         setUserEarnings({totalEarning, flexibleEarning, lockedEarning});
  //       }
  //     })
  //     .catch(e => {
  //       showToast('Staking', 'Error while fetching statistics', 'error');
  //     });
  // };

  const renderScene = () => {
    if (isLoadingHistory) {
      return (
        <View style={[styles.containerStyle.container]}>
          <View
            style={{
              paddingTop: Header_Max_Height,
              padding: 10,
              marginTop: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <LoadingSpinner
              color={ThemeFunctions.getColor(appColor)}
              size="large"
            />
          </View>
        </View>
      );
    }

    if (historyData.length === 0) {
      return (
        <View style={[styles.containerStyle.container]}>
          <View
            style={{
              paddingTop: Header_Max_Height,
              padding: 10,
              marginTop: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ThemeText
              style={[
                commonStyles.placeHolderText,
                {color: ThemeFunctions.customText(appTheme)},
              ]}>
              {strings('empty')}
            </ThemeText>
          </View>
        </View>
      );
    }

    return (
      <View style={[styles.containerStyle.container]}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          ref={scrollViewRef}
          refreshControl={
            <RefreshControl
              refreshing={isLoadingHistory}
              onRefresh={() => fetchData()}
            />
          }
          // onScrollEndDrag={({nativeEvent}) => {
          //   if (!isLoadingNext) handleScroll(nativeEvent);
          // }}
          scrollEventThrottle={16}
          onScroll={x => {
            const scrollDist = x.nativeEvent.contentOffset.y;

            scrollY.setValue(scrollDist);
          }}>
          <Animated.View
            style={{
              paddingTop: animatedHeaderHeight,
              paddingBottom: paddingHeight,
            }}>
            {historyData.map((item, i) => (
              <PoolCard item={item} key={i} />
            ))}

            {isLoadingNext ? (
              <LoadingSpinner
                color={ThemeFunctions.getColor(appColor)}
                size="large"
              />
            ) : historyData.length < parseFloat(historyTotal) ? (
              <TouchableOpacity
                onPress={() => loadNextHistory()}
                style={[styles.containerStyle.loadMoreContainer]}>
                <ThemeText
                  style={[
                    {color: ThemeFunctions.customText(appTheme)},
                    styles.containerStyle.loadMoreText,
                  ]}>
                  {strings('load_more')}
                </ThemeText>
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </Animated.View>
        </ScrollView>
      </View>
    );
  };

  const currentStakedValue = isLoadingCurrentStaked
    ? '-'
    : FormatToAbbreviateNumber(currentStaked.currentStaked);

  const currentEarningsValue = isLoadingCurrentEarnings
    ? '-'
    : FormatToAbbreviateNumber(currentEarnings.totalEarning);


  const redeemAllBtnEnable = !isLoadingRedeemAll && !isLoadingHistory && !isLoadingRewardSumary && rewardSummary.length>0

  return (
    <SafeAreaView
      onStartShouldSetResponder={() => {
        Keyboard.dismiss();
      }}
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      <Header title={strings('staking_account')} />

      {renderScene()}

      <Animated.View
        style={[
          {
            height: animatedHeaderHeight,
            overflow: 'hidden',
            marginTop: ScreenHeaderHeight,
            padding: animatedHideHeight(10),
          },
          styles.headerStyle.headerContainer,
          ThemeFunctions.setBackground(appTheme),
        ]}>
        <Animated.View
          style={[
            styles.headerStyle.statsCard,
            {
              height: animatedHideHeight(100),
              margin: animatedHideHeight(8),
              padding: animatedHideHeight(10),
              backgroundColor:
                ThemeFunctions.setIEOCardBG(appTheme).backgroundColor,
              opacity: animatedHideOpacity,
            },
          ]}>
          <View style={[{marginBottom: 10}]}>
            <ThemeText style={[{color: ThemeFunctions.customText(appTheme)}]}>
              {strings('my_staked_usd')} ( USD )
            </ThemeText>
          </View>
          <View
            style={[
              {
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
              },
            ]}>
            <View>
              <Text
                style={[ThemeFunctions.textColor(appTheme), {fontSize: 30}]}>
                {currentStakedValue}
              </Text>

              <Text style={[{color: ThemeFunctions.customText(appTheme)}]}>
                {strings('current_staked')} ( USD )
              </Text>
            </View>

            <View>
              <Text
                style={[
                  {
                    fontSize: 30,
                    textAlign: 'right',
                    color: Colors.currencyGreen,
                  },
                ]}>
                {currentEarningsValue}
              </Text>

              <Text
                style={[
                  {
                    color: ThemeFunctions.customText(appTheme),
                    textAlign: 'right',
                  },
                ]}>
                {strings('my_earnings')} ( USD )
              </Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View
          style={[
            {
              height: animatedHideHeightReverse(CollapedHeaderHeight),
              opacity: animatedShowOpacity,
              borderColor: ThemeFunctions.customText(appTheme),
            },
            ThemeFunctions.setIEOCardBG(appTheme),

            styles.headerStyle.collapsedHeaderContainer,
          ]}>
          <View style={[styles.headerStyle.collapsedHeaderContainerRow]}>
            <View style={[styles.headerStyle.collapsedHeaderContainerRowLeft]}>
              <ThemeText numberOfLines={1}>
                {strings('current_staked')}: {currentStakedValue} USD
              </ThemeText>
            </View>

            <View style={[styles.headerStyle.collapsedHeaderContainerRowRight]}>
              <ThemeText style={{fontSize: 15}}>
                {strings('my_earnings')}:{' '}
                <ThemeText
                  numberOfLines={1}
                  style={{fontSize: 15, color: Colors.currencyGreen}}>
                  {currentEarningsValue}
                </ThemeText>{' '}
                USD
              </ThemeText>
            </View>
          </View>
        </Animated.View>

        <View style={[styles.headerStyle.stakingTypeContainer]}>
          <TouchableOpacity
            style={{width: '50%'}}
            onPress={() => setStakingType('locked')}>
            <ThemeText style={{textAlign: 'center'}}>
              {strings('locked')}
            </ThemeText>
            <View
              style={{
                marginTop: 3,
                height: 3,
                width: '100%',
                backgroundColor:
                  stakingType === 'locked'
                    ? ThemeFunctions.getColor(appColor)
                    : 'transparent',
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{width: '50%'}}
            onPress={() => setStakingType('flexible')}>
            <ThemeText style={{textAlign: 'center'}}>
              {strings('flexible')}
            </ThemeText>
            <View
              style={{
                marginTop: 3,
                height: 3,
                width: '100%',
                backgroundColor:
                  stakingType === 'flexible'
                    ? ThemeFunctions.getColor(appColor)
                    : 'transparent',
              }}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>

      <View
        style={[
          styles.redeemAllStyle.container,
          {borderColor: ThemeFunctions.getBorderColorCardDarker(appTheme)},
        ]}>
        <View>
          <TouchableOpacity
            style={[
              styles.redeemAllStyle.redeemAllBtn,
              {
                backgroundColor: !redeemAllBtnEnable
                  ? Colors.gray
                  : ThemeFunctions.getColor(appColor),
              },
            ]}
            disabled={!redeemAllBtnEnable}
            onPress={() => {
              onRedeemAll();
            }}>
            <ThemeText style={styles.poolCard.buttonText}>
              {strings('redeem_all')}
            </ThemeText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Account;
