import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {PaymentActions} from '../../../../../store';
import {FlatList, Text, View} from 'react-native';
import ListingItem from './ListingItem';
import {strings} from '../../../../../strings';
import {withdrawalStyles as styles} from '../../../styles';
import {ThemeFunctions} from '../../../../../utils';
import HistoryShimmer from '../../../../funding/withdrawals/ListShimmer';
import {Loader} from '../../../../../enums';

const Listing = (props: any) => {
  const dispatch = useDispatch();
  const {appTheme} = useSelector((state: any) => state.globalReducer);
  const appData = useSelector((state: any) => state.appReducer);
  const {IbansActive} = useSelector((state: any) => state.paymentReducer);

  useEffect(() => {
    if (IbansActive?.length === 0) {
      dispatch(PaymentActions.getIBANSActiveList());
    }
  }, [props.activeIndex]);

  return (
    <View style={[ThemeFunctions.setBackground(appTheme), {flex: 1}]}>
      {appData.loading === Loader.IBANS_TYPES ? (
        <HistoryShimmer />
      ) : (
        <>
          {IbansActive?.length > 0 ? (
            <FlatList
              data={IbansActive}
              initialNumToRender={10}
              contentContainerStyle={{paddingTop: 22}}
              renderItem={({item}) => <ListingItem data={item} />}
              keyExtractor={item => item?.id?.toString()}
              onRefresh={() => dispatch(PaymentActions.getIBANSActiveList())}
              refreshing={appData.loading === Loader.IBANS_TYPES ? true : false}
            />
          ) : (
            <Text
              style={{
                ...styles.placeHolderText,
                color: ThemeFunctions.customText(appTheme),
              }}>
              {strings('Currently No Orders')}
            </Text>
          )}
        </>
      )}
    </View>
  );
};

export default Listing;
