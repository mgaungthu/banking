import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Note} from '../../../components';
import {WalletActions} from '../../../store';
import {strings} from '../../../strings';
import {walletStyles as styles} from '../styles';
import WithdrawalList from './WithdrawalList';
import Placeholder from '../deposits/Placeholder';
import {Loader} from '../../../enums';
import HistoryShimmer from '../withdrawals/ListShimmer';
import {ThemeFunctions} from '../../../utils';

const Withdrawal = (props: any) => {
  const dispatch = useDispatch();
  const walletData = useSelector((state: any) => state.walletReducer);
  const {appTheme} = useSelector((state: any) => state.globalReducer);

  const appData = useSelector((state: any) => state.appReducer);

  useEffect(() => {
    if (walletData.withdrawalHistory.length === 0)
      dispatch(WalletActions.getBalanceHistory('Withdraw'));
  }, [props.activeIndex]);

  return (
    <View style={[styles.balanceView, ThemeFunctions.setBackground(appTheme)]}>
      <Note
        subtitle={strings('deposit_note', {
          key: strings('withdrawals'),
        })}
        appTheme={appTheme}
      />
      {appData.loading === Loader.GET_BALANCE_WITHDRAWAL_HISTORY ? (
        <HistoryShimmer />
      ) : (
        <>
          {walletData.withdrawalHistory.length > 0 ? (
            <WithdrawalList />
          ) : (
            <Placeholder message={strings('no_withdrawal_placeholder')} />
          )}
        </>
      )}
    </View>
  );
};

export default Withdrawal;
