import React from 'react';
import {Text, View, useWindowDimensions} from 'react-native';
import {quickBuyStyles as styles} from '../../quickbuy/styles';
import {rapunzelTheme} from '../../../theme/Colors';
import {walletStyles} from '../../funding/styles';
import {ThemeFunctions} from '../../../utils';
import {TabView, TabBar} from 'react-native-tab-view';
import {useSelector} from 'react-redux';
import LogList from './LogList';
import RedeemList from './RedeemList';

const HistoryTab = (props: any) => {
  const {routes, index, handleIndexChange} = props;
  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer);

  const renderScene = ({route: {key}}) => {
    switch (key) {
      case 'referrals_history':
        return;
      case 'redeem_history':
        return <RedeemList />;
    }
  };

  return (
    <View style={styles.view}>
      <LogList />
    </View>
  );
};

export default HistoryTab;
