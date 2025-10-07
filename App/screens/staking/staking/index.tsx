import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {commonStyles} from '../../../globalstyles/styles';
import * as styles from './styles';
import * as ThemeFunctions from '../../../utils/ThemeFunctions';

import Header from '../Header';
import {homeStyles} from '../../home/styles';
import {strings} from '../../../strings';
import Navigation from '../../../utils/Navigation';
import {Loader, Screen} from '../../../enums';
import IconVector from '../../../components/ui/IconVector';
import {LoadingSpinner, SearchBar} from '../../../components';
import StakeCard from './stakeCard';
import {StakingActions} from '../../../store';
import ScreenOverlay from '../../../components/ui/ScreenOverlay';

const Staking = (props: any) => {
  const [searchQuery, setSearchQuery] = useState<String>('');
  const [searchedData, setSearchedData] = useState([]);

  const [isOverlay, setIsOverlay] = useState(false);

  const dispatch = useDispatch<any>();

  const {appTheme, appColor, assetMetadata} = useSelector(
    (state: any) => state.globalReducer,
  );

  const isBackButton = () => {
    return props?.route?.params?.fromScreen ? true : false;
  };

  const appData = useSelector((state: any) => state.appReducer);

  const {stake} = useSelector((state: any) => state.stakingReducer);

  useEffect(() => {
    if (stake.length === 0) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    updateList();
  }, [stake]);

  const fetchData = () => {
    dispatch(StakingActions.getStakeData());
  };

  const searchText = e => {
    let text = e.toLowerCase().trim();
    setSearchQuery(e);
    updateList(text);
  };

  const updateList = (text = '') => {
    if (stake?.length > 0) {
      let List = stake;
      let filteredData = List.filter(item => {
        return (
          item.currency.name.toLowerCase().match(text) ||
          item.currency.symbol.toLowerCase().match(text)
        );
      });

      if (filteredData && Array.isArray(filteredData)) {
        setSearchedData(filteredData);
      } else {
        setSearchedData('');
      }
    }
  };

  const renderScene = () => {
    if (appData.loading === Loader.STAKE) {
      return (
        <View style={[styles.containerStyle.container]}>
          <View
            style={{
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

    return (
      <View style={[styles.containerStyle.container]}>
        <ScrollView
          refreshControl={
            <RefreshControl
              // refreshing={isPoolLoadingLocked}
              onRefresh={() => fetchData()}
            />
          }
          keyboardShouldPersistTaps="handled"
          scrollEventThrottle={16}>
          <View>
            {searchedData.map((item, i) => (
              <StakeCard key={i} data={item} appTheme={appTheme} />
            ))}

            {/* {isLoadingNext ? (
                <LoadingSpinner
                  color={ThemeFunctions.getColor(appColor)}
                  size="large"
                />
              ) : (
                <></>
              )} */}
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      {isOverlay && <ScreenOverlay />}

      <Header
        title={strings('staking')}
        showBack={isBackButton()}
        textStyle={{
          marginLeft: isBackButton() ? 0 : 40,
          color: ThemeFunctions.isDarkTheme(appTheme) ? '#fff' : '#000',
        }}
        right={
          <View style={[{flexDirection: 'row'}]}>
            {/* <TouchableOpacity
              onPress={() => Navigation.navigate(Screen.StakingAccount)}
              style={[
                homeStyles.profileBtn,
                ThemeFunctions.setIEOCardBG(appTheme),
                {marginRight: 10},
              ]}>
              <IconVector.FontAwesome5
                name="dollar-sign"
                color={ThemeFunctions.getCurrentTextColor(appTheme)}
                size={22}
              />
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => Navigation.navigate(Screen.StakingHistory)}
              style={[
                homeStyles.profileBtn,
                ThemeFunctions.setIEOCardBG(appTheme),
              ]}>
              <IconVector.FontAwesome5
                name="history"
                color={ThemeFunctions.getCurrentTextColor(appTheme)}
                size={22}
              />
            </TouchableOpacity>
          </View>
        }
      />
      <View style={{marginHorizontal: 10}}>
        <View style={[styles.headerStyle.searchContainer]}>
          <SearchBar
            onCancel={() => {
              setSearchQuery('');
              setSearchedData(stake);
            }}
            onChangeText={x => searchText(x)}
            searchQuery={searchQuery}
            placeholder={`${strings('search by token')}`}
          />
        </View>
      </View>
      {renderScene()}
    </SafeAreaView>
  );
};

export default Staking;
