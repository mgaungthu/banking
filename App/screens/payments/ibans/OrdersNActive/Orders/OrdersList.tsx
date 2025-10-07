import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {PaymentActions} from '../../../../../store';
import {FlatList, Text, View} from 'react-native';
import {strings} from '../../../../../strings';
import {withdrawalStyles as styles} from '../../../styles';
import {ThemeFunctions} from '../../../../../utils';
import HistoryShimmer from '../../../../funding/withdrawals/ListShimmer';
import {Loader} from '../../../../../enums';
import IbansCard from './IbansCard';
import DetailModal from '../../DetailModal';

const OrdersList = (props: any) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [modalText, setModalText] = React.useState('');

  const dispatch = useDispatch<any>();
  const {appTheme} = useSelector((state: any) => state.globalReducer);
  const appData = useSelector((state: any) => state.appReducer);
  const {IbansRequest} = useSelector((state: any) => state.paymentReducer);

  useEffect(() => {
    if (IbansRequest.length === 0) {
      dispatch(PaymentActions.getIBANSRequest());
    }
  }, [props.activeIndex]);

  return (
    <View style={[ThemeFunctions.setBackground(appTheme), {flex: 1}]}>
      {appData.loading === Loader.IBANS_REQUEST ? (
        <HistoryShimmer />
      ) : (
        <>
          {IbansRequest?.length > 0 ? (
            <FlatList
              data={IbansRequest}
              initialNumToRender={10}
              contentContainerStyle={{paddingTop: 22}}
              renderItem={({item}) => (
                <IbansCard
                  item={item.iban_type}
                  status={item.status}
                  setIsVisible={setIsVisible}
                  setModalText={setModalText}
                />
              )}
              keyExtractor={item => item?.id?.toString()}
              onRefresh={() => dispatch(PaymentActions.getIBANSRequest())}
              refreshing={
                appData.loading === Loader.IBANS_REQUEST ? true : false
              }
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
      <DetailModal
        setIsVisible={setIsVisible}
        isVisible={isVisible}
        text={modalText}
      />
    </View>
  );
};

export default OrdersList;
