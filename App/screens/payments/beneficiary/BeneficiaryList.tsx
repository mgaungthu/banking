import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {FlatList, Text, View} from 'react-native';
import BeneficiaryItem from './BeneficiaryItem';
import {Loader} from '../../../enums';
import {strings} from '../../../strings';
import {withdrawalStyles} from '../styles';
import {ThemeFunctions} from '../../../utils';
import {PaymentActions} from '../../../store';
import HistoryShimmer from '../../funding/withdrawals/ListShimmer';

const BeneficiaryList = (props: any) => {
  const dispatch = useDispatch();
  const {appTheme} = useSelector((state: any) => state.globalReducer);
  const appData = useSelector((state: any) => state.appReducer);
  const {beneficiaryList} = useSelector((state: any) => state.paymentReducer);

  useEffect(() => {
    if (beneficiaryList?.length === 0 && props.activeIndex === 1)
      dispatch(PaymentActions.beneficiaryList());
  }, [props.activeIndex]);

  return (
    <View style={[ThemeFunctions.setBackground(appTheme), {flex: 1}]}>
      {appData.loading === Loader.GET_BENEFICIARY_LIST ? (
        <HistoryShimmer />
      ) : (
        <>
          {beneficiaryList?.length > 0 ? (
            <FlatList
              data={beneficiaryList}
              initialNumToRender={10}
              contentContainerStyle={{paddingTop: 22}}
              renderItem={({item}) => <BeneficiaryItem trade={item} />}
              keyExtractor={item => item?.id?.toString()}
              onRefresh={() => dispatch(PaymentActions.beneficiaryList())}
              refreshing={
                appData.loading === Loader.GET_BENEFICIARY_LIST ? true : false
              }
            />
          ) : (
            <Text
              style={{
                ...withdrawalStyles.placeHolderText,
                color: ThemeFunctions.customText(appTheme),
              }}>
              {strings('no_list')}
            </Text>
          )}
        </>
      )}
    </View>
  );
};

export default BeneficiaryList;
