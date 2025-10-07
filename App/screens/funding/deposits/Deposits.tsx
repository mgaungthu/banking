import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Note} from '../../../components';
import {Loader} from '../../../enums';
import {WalletActions} from '../../../store';
import {strings} from '../../../strings';
import {ThemeFunctions} from '../../../utils';
import {walletStyles as styles} from '../styles';
import HistoryShimmer from '../withdrawals/ListShimmer';
import HistoryList from './DepositList';
import Placeholder from './Placeholder';

const Deposits = (props: any) => {
  const dispatch = useDispatch();
  const walletData = useSelector((state: any) => state.walletReducer);
  const {appTheme} = useSelector((state: any) => state.globalReducer);
  const appData = useSelector((state: any) => state.appReducer);

  useEffect(() => {
    if (walletData.depositHistory.length === 0)
      dispatch(WalletActions.getBalanceHistory('Deposit'));
  }, [props.activeIndex]);

  return (
    <View style={[styles.balanceView, ThemeFunctions.setBackground(appTheme)]}>
      {/* {appData.loading === Loader.GET_BALANCE_DEPOSIT_HISTORY ? (
        <HistoryShimmer />
      ) : (
        <>
          {walletData.depositHistory.length > 0 ? (
            <HistoryList activeIndex={props.activeIndex} />
          ) : (
            <Placeholder message={strings('no_deposit_placeholder')} />
          )}
        </>
      )} */}
    </View>
  );
};

export default Deposits;
