import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {balanceStyles as styles} from '../styles';
import {FlatList, RefreshControl} from 'react-native';
import BalanceListItem from './BalanceListItem';
import {GlobalActions, PaymentActions, QuickBuyActions} from '../../../store';
import {Loader} from '../../../enums';
import {MapperConstants} from '../../../constants';
import {SanitizeNumber} from '../../../utils/AppFunctions';
import {ThemeFunctions} from '../../../utils';

function CheckTotal(balance: Number): number {
  return balance?.available;
}

const BalanceList = (props: any) => {
  const dispatch = useDispatch<any>();
  const quickBuyData = useSelector((state: any) => state.quickBuyReducer);
  const appData = useSelector((state: any) => state.appReducer);
  const {currencyStatusData} = useSelector((state: any) => state.walletReducer);

  const isSearchDataExists = () => {
    return props?.searchedData?.length > 0
      ? MapperConstants.StatusMapper.enable
      : MapperConstants.StatusMapper.disable;
  };

  const dataList =
    isSearchDataExists() || props.searchQuery
      ? props?.isSwitchOn
        ? props.searchedData?.filter(res => CheckTotal(res) > 0).sort()
        : props.searchedData?.sort()
      : props.isSwitchOn
      ? quickBuyData?.fundsList?.filter(res => CheckTotal(res) > 0).sort()
      : quickBuyData?.fundsList?.sort();

  return (
    <>
      <FlatList
        ListHeaderComponent={props.ListHeaderComponent}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        data={dataList}
        refreshControl={
          <RefreshControl
            tintColor={ThemeFunctions.getColor(props.appColor)}
            colors={[ThemeFunctions.getColor(props.appColor)]}
            onRefresh={async () => {
              try {
                await dispatch(GlobalActions.getAssetMetadata());
                dispatch(QuickBuyActions.fundsList());
                dispatch(PaymentActions.getActiveCardList());
              } catch (e) {
                console.log(e);
              }
            }}
            refreshing={
              appData.loading === Loader.GET_FUND_BALANCE ? true : false
            }
          />
        }
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        contentContainerStyle={styles.list}
        renderItem={({item}) => (
          <BalanceListItem
            trade={item}
            // handleDepositDetails={props.handleDepositDetails}
            // handleWithdrawalDetails={props.handleWithdrawalDetails}
            handleChooseCurrency={props.handleChooseCurrency}
          />
        )}
        keyExtractor={item => item?.id?.toString()}
      />
    </>
  );
};

export default BalanceList;
