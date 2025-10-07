import React, {useEffect, useState} from 'react';
import {View, Text, RefreshControl, Platform} from 'react-native';
import {Switch} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {historyStyles as styles, quickBuyStyles} from '../styles';

import {FlatList} from 'react-native';
import HistoryItem from './HistoryItem';
import {QuickBuyActions} from '../../../store';
import {Loader} from '../../../enums';
import {AppFunctions} from '../../../utils';
import HistoryShimmer from './HistoryShimmer';
import {strings} from '../../../strings';
import {ThemeFunctions} from '../../../utils';
import {ThemeText} from '../../../components';
import StableCoinHistoryItem from './StableCoinHistoryItem';
import {getStableCoinPairs} from '../../../utils/trading/helpers';
import {rtlStyles} from '../../../globalstyles/styles';

const HistoryView = (props: any) => {
  const dispatch = useDispatch<any>();
  const quickBuyData = useSelector((state: any) => state.quickBuyReducer);
  const appData = useSelector((state: any) => state.appReducer);
  const {appTheme, userdata, appColor, isRtlApproach} = useSelector(
    (state: any) => state.globalReducer,
  );
  const [stableCoinHistory, setStableCoinHistory] = useState([]);

  useEffect(() => {
    updateHistory();
  }, [props.activeIndex]);

  useEffect(() => {
    setStableCoinHistory(quickBuyData?.tradeHistory);
  }, [props.activeIndex, quickBuyData]);

  const updateHistory = () => {
    // dispatch(QuickBuyActions.qbtSpotHistory());
    dispatch(QuickBuyActions.getTradeHistory());
  };

  const isLoading =
    appData.loading === Loader.QUICK_SWAP_HISTORY ||
    appData.loading === Loader.QUICK_BUY_STABLE_COIN_HISTORY;

  const stablecoinHistoryData = stableCoinHistory || [];
  // const qbtHistoryData = quickBuyData?.qbtSpotHistory || [];

  const stableList = (
    <FlatList
      data={quickBuyData?.tradeHistory}
      initialNumToRender={3}
      maxToRenderPerBatch={5}
      contentContainerStyle={styles.list}
      renderItem={({item}) => (
        <StableCoinHistoryItem
          trade={item}
          isRtlApproach={isRtlApproach}
          appTheme={appTheme}
          appColor={appColor}
        />
      )}
      keyExtractor={item => item.uuid.toString()}
      refreshControl={
        <RefreshControl
          colors={[ThemeFunctions.getColor(appColor)]}
          tintColor={ThemeFunctions.getColor(appColor)}
          refreshing={isLoading}
          onRefresh={() => updateHistory()}
        />
      }
      ListEmptyComponent={
        <Text
          style={{
            ...styles.placeHolderText,
            color: ThemeFunctions.customText(appTheme),
          }}>
          {strings('no_history')}
        </Text>
      }
    />
  );

  // const spotList = (
  //   <FlatList
  //     data={qbtHistoryData}
  //     initialNumToRender={3}
  //     maxToRenderPerBatch={5}
  //     contentContainerStyle={styles.list}
  //     renderItem={({item}) => (
  //       <HistoryItem
  //         trade={item}
  //         isRtlApproach={isRtlApproach}
  //         appTheme={appTheme}
  //         appColor={appColor}
  //       />
  //     )}
  //     keyExtractor={item => item.id.toString()}
  //     refreshControl={
  //       <RefreshControl
  //         colors={[ThemeFunctions.getColor(appColor)]}
  //         tintColor={ThemeFunctions.getColor(appColor)}
  //         refreshing={isLoading}
  //         onRefresh={() => updateHistory()}
  //       />
  //     }
  //     ListEmptyComponent={
  //       <Text
  //         style={{
  //           ...styles.placeHolderText,
  //           color: ThemeFunctions.customText(appTheme),
  //         }}>
  //         {strings('no_history')}
  //       </Text>
  //     }
  //   />
  // );

  const renderScene = () => {
    // if (isStableCoins) {
    return stableList;
    // } else {
    //   return spotList;
    // }
  };

  let switchStyle = {
    transform: [{scaleX: isRtlApproach ? -0.7 : 0.7}, {scaleY: 0.7}],
  };

  if (Platform.OS === 'android') {
    switchStyle = {transform: [{scaleX: isRtlApproach ? -1 : 1}, {scaleY: 1}]};
  }

  return (
    <View
      style={[
        quickBuyStyles.container,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      <View
        style={[
          {
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingHorizontal: 16,
          },
          isRtlApproach ? rtlStyles.reverseRow : {},
        ]}>
        {/* <ThemeText style={{fontSize: 18}}>{strings('stable_swap')}</ThemeText>
        <Switch
          value={isStableCoins}
          onValueChange={() => setIsStableCoins(!isStableCoins)}
          color={ThemeFunctions.toggleBg(appColor)}
          style={switchStyle}
        /> */}
      </View>
      {isLoading ? <HistoryShimmer /> : <>{renderScene()}</>}
    </View>
  );
};

export default HistoryView;
