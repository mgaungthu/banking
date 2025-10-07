import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {FlatList, Text, View} from 'react-native';
import HistoryItem from './HistoryItem';
import {strings} from '../../../strings';
import {withdrawalStyles as styles} from '../styles';
import {ThemeFunctions} from '../../../utils';
import HistoryShimmer from '../../funding/withdrawals/ListShimmer';
import {PaymentActions} from '../../../store';
import {Loader} from '../../../enums';

const History = (props: any) => {
  const dispatch = useDispatch<any>();
  const {appTheme} = useSelector((state: any) => state.globalReducer);
  const {internalPaymentList} = useSelector(
    (state: any) => state.paymentReducer,
  );
  const appData = useSelector((state: any) => state.appReducer);

  useEffect(() => {
    // if (internalPaymentList?.length === 0 && props.activeIndex === 1) {
    dispatch(PaymentActions.internalPaymentList());
    // }
  }, [props.activeIndex]);

  // console.log(internalPaymentList, 'check');

  return (
    <View style={[ThemeFunctions.setBackground(appTheme), {flex: 1}]}>
      {appData.loading === Loader.GET_INTERNAL_PAYMENTS ? (
        <HistoryShimmer />
      ) : (
        <>
          {internalPaymentList?.length > 0 ? (
            <FlatList
              data={internalPaymentList}
              initialNumToRender={10}
              contentContainerStyle={{paddingTop: 22}}
              renderItem={({item}) => <HistoryItem trade={item} />}
              keyExtractor={item => item?.id?.toString()}
              onRefresh={() => dispatch(PaymentActions.internalPaymentList())}
              refreshing={
                appData.loading === Loader.GET_INTERNAL_PAYMENTS ? true : false
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
    </View>
  );
};

export default History;
