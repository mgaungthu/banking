import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {homeStyles as styles} from './styles';
import {View} from 'react-native';
import {ThemeFunctions} from '../../utils';
import {
  AppActions,
  GbexActions,
  GlobalActions,
  QuickBuyActions,
  WalletActions,
} from '../../store';
import {useFocusEffect} from '@react-navigation/native';
import HomeView from './HomeView';

const Home = (props: any) => {
  const dispatch = useDispatch<any>();

  const {appTheme} = useSelector((state: any) => state.globalReducer);
  const globalData = useSelector((state: any) => state.globalReducer);

  useEffect(() => {
    dispatch(QuickBuyActions.fundsList());
    // dispatch(GbexActions.getLivePrice());
    // dispatch(QuickBuyActions.getPairDetails());
    dispatch(QuickBuyActions.getPairs());
    dispatch(WalletActions.getWalletList());
    dispatch(
      GlobalActions.updateMainCurrency({
        mainCurrency: globalData?.mainCurrency
          ? globalData?.mainCurrency
          : 'USD',
      }),
    );
    dispatch(
      GlobalActions.updateSecondaryCurrency({
        secondCurrency: globalData?.secondCurrency
          ? globalData?.secondCurrency
          : 'BTC',
      }),
    );
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(AppActions.getUserProfile());
      dispatch(AppActions.getAllowedRegion());
    }, []),
  );

  return (
    <View
      style={[styles.containerView, ThemeFunctions.setBackground(appTheme)]}>
      <HomeView />
    </View>
  );
};

export default Home;
