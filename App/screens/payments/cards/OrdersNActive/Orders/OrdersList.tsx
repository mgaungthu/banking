import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {PaymentActions} from '../../../../../store';
import {FlatList, Text, View} from 'react-native';
import {strings} from '../../../../../strings';
import {withdrawalStyles as styles} from '../../../styles';
import {ThemeFunctions} from '../../../../../utils';
import HistoryShimmer from '../../../../funding/withdrawals/ListShimmer';
import {Loader} from '../../../../../enums';
import Cards from './Cards';
import DetailModal from '../../DetailModal';

const OrdersList = (props: any) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [modalText, setModalText] = React.useState('');

  const dispatch = useDispatch();
  const {appTheme} = useSelector((state: any) => state.globalReducer);
  const appData = useSelector((state: any) => state.appReducer);
  const {cardRequestedList} = useSelector((state: any) => state.paymentReducer);

  useEffect(() => {
    if (cardRequestedList.length === 0) {
      dispatch(PaymentActions.getCardRequestedList());
    }
  }, [props.activeIndex]);

  return (
    <View style={[ThemeFunctions.setBackground(appTheme), {flex: 1}]}>
      {appData.loading === Loader.IBANS_TYPES ? (
        <HistoryShimmer />
      ) : (
        <>
          {cardRequestedList?.length > 0 ? (
            <FlatList
              data={cardRequestedList}
              initialNumToRender={10}
              contentContainerStyle={{paddingTop: 22}}
              renderItem={({item}) => (
                <Cards
                  item={item}
                  setIsVisible={setIsVisible}
                  setModalText={setModalText}
                />
              )}
              keyExtractor={item => item?.id?.toString()}
              onRefresh={() => dispatch(PaymentActions.getCardRequestedList())}
              refreshing={appData.loading === Loader.IBANS_TYPES ? true : false}
            />
          ) : (
            <Text
              style={{
                ...styles.placeHolderText,
                color: ThemeFunctions.customText(appTheme),
              }}>
              {strings('No Orders Available')}
            </Text>
          )}
        </>
      )}
      <DetailModal
        setIsVisible={setIsVisible}
        isVisible={isVisible}
        text={modalText}
      />
    </View>
  );
};

export default OrdersList;
