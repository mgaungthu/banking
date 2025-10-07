import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {PaymentActions} from '../../../../store';
import {FlatList, Text, View} from 'react-native';
import ListingItem from './ListingItem';
import {strings} from '../../../../strings';
import {withdrawalStyles as styles} from '../../styles';
import {ThemeFunctions} from '../../../../utils';
import HistoryShimmer from '../../../funding/withdrawals/ListShimmer';
import {Loader} from '../../../../enums';

const Listing = (props: any) => {
  const dispatch = useDispatch<any>();
  const {appTheme} = useSelector((state: any) => state.globalReducer);
  const appData = useSelector((state: any) => state.appReducer);
  const {cardTransactinList} = useSelector(
    (state: any) => state.paymentReducer,
  );

  useEffect(() => {
    if (cardTransactinList?.length === 0) {
      dispatch(PaymentActions.getCardtransactionList());
    }
  }, [props.activeIndex]);

  return (
    <View style={[ThemeFunctions.setBackground(appTheme), {flex: 1}]}>
      {appData.loading === Loader.CARDS_REQUEST ? (
        <HistoryShimmer />
      ) : (
        <>
          {cardTransactinList?.length > 0 ? (
            <FlatList
              data={cardTransactinList}
              initialNumToRender={10}
              contentContainerStyle={{paddingTop: 22}}
              renderItem={({item}) => <ListingItem item={item} />}
              keyExtractor={item => item?.id?.toString()}
              onRefresh={() =>
                dispatch(PaymentActions.getCardtransactionList())
              }
              refreshing={
                appData.loading === Loader.CARDS_REQUEST ? true : false
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

export default Listing;
