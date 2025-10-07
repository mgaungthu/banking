import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList, Text} from 'react-native';
import HistoryItem from './HistoryItem';
import {strings} from '../../../strings';
import {historyStyles as styles} from '../styles';
import {ThemeFunctions} from '../../../utils';
import {Loader} from '../../../enums';
import HistoryShimmer from '../../funding/withdrawals/ListShimmer';
import {AppActions, PaymentActions} from '../../../store';
import {ApiCreditCard} from '../../../constants/AppConstants';
import {APIConstants, MapperConstants} from '../../../constants';
import {makeRequest} from '../../../services/ApiService';
import {showToast} from '../../../utils/GenericUtils';

const History = ({activeIndex}) => {
  const dispatch = useDispatch();
  const {appTheme} = useSelector((state: any) => state.globalReducer);
  const appData = useSelector((state: any) => state.appReducer);

  const [listHistory, setListHistory] = useState([]);

  const _getHistory = async () => {
    try {
      dispatch(AppActions.updateLoading(Loader.CREDIT_CARD_LIST));
      const response = await makeRequest(
        MapperConstants.ApiTypes.GET,
        APIConstants.GLOBIANCE_WIDGET_TXN,
      );

      dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
      if (response.status === 200) {
        setListHistory(response.data);
      } else showToast(strings('deposit_credit'), response.message, 'error');
    } catch (error) {
      console.log('e', error);

      showToast(strings('deposit_credit'), 'Error', 'error');
    }
  };

  useEffect(() => {
    if (listHistory.length === 0 && activeIndex === 1) _getHistory();
  }, [activeIndex]);

  return (
    <>
      {appData.loading === Loader.CREDIT_CARD_LIST ? (
        <HistoryShimmer />
      ) : (
        <>
          {listHistory?.length > 0 ? (
            <FlatList
              data={listHistory}
              initialNumToRender={10}
              contentContainerStyle={{paddingTop: 22}}
              renderItem={({item}) => <HistoryItem trade={item} />}
              keyExtractor={item => item?.id?.toString()}
              onRefresh={() => dispatch(PaymentActions.creditCardPaymentList())}
              refreshing={
                appData.loading === Loader.CREDIT_CARD_LIST ? true : false
              }
            />
          ) : (
            <Text
              style={{
                ...styles.placeHolderText,
                color: ThemeFunctions.customText(appTheme),
              }}>
              {strings('no_history')}
            </Text>
          )}
        </>
      )}
    </>
  );
};

export default History;
