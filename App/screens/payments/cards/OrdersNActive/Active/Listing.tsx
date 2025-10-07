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
import DetailModal from '../../DetailModal';

const Listing = (props: any) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [modalDetail, setModalDetail] = React.useState('');

  const dispatch = useDispatch<any>();
  const {appTheme} = useSelector((state: any) => state.globalReducer);
  const appData = useSelector((state: any) => state.appReducer);
  const {activeCardList} = useSelector((state: any) => state.paymentReducer);

  useEffect(() => {
    if (activeCardList?.length === 0) {
      dispatch(PaymentActions.getActiveCardList());
    }
  }, [props.activeIndex]);

  return (
    <View style={[ThemeFunctions.setBackground(appTheme), {flex: 1}]}>
      {appData.loading === Loader.ACTIVE_CARD ? (
        <HistoryShimmer />
      ) : (
        <>
          {activeCardList?.length > 0 ? (
            <FlatList
              data={activeCardList}
              initialNumToRender={10}
              contentContainerStyle={{paddingTop: 22}}
              renderItem={({item}) => (
                <ListingItem
                  data={item}
                  setIsVisible={setIsVisible}
                  setModalDetail={setModalDetail}
                />
              )}
              keyExtractor={item => item?.id?.toString()}
              onRefresh={() => dispatch(PaymentActions.getActiveCardList())}
              refreshing={appData.loading === Loader.ACTIVE_CARD ? true : false}
            />
          ) : (
            <Text
              style={{
                ...styles.placeHolderText,
                color: ThemeFunctions.customText(appTheme),
              }}>
              {strings('No Cards Available')}
            </Text>
          )}
          <DetailModal
            setIsVisible={setIsVisible}
            isVisible={isVisible}
            component={modalDetail}
          />
        </>
      )}
    </View>
  );
};

export default Listing;
