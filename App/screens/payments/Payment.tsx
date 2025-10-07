import React, {useEffect, useRef, useState} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {securityStyles} from '../account/styles';
import {Header} from '../../components';
import {strings} from '../../strings';
import {commonStyles} from '../../globalstyles/styles';
import {DefaultArray} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import RowItem from './RowItem';
import {getItem, ThemeFunctions} from '../../utils';
import {PaymentActions} from '../../store';
import {isDarkTheme} from '../../utils/ThemeFunctions';

const Payments = (props: any) => {
  const {appTheme} = useSelector((state: any) => state.globalReducer);
  const dispatch = useDispatch<any>();
  // const [rowList, setRowList] = useState(DefaultArray.paymentOptions);
  useEffect(() => {
    dispatch(PaymentActions.getUserInfo());
    dispatch(PaymentActions.getBankListing());
    dispatch(PaymentActions.beneficiaryList());
  }, []);

  // const region = getItem('Region');

  // region.then(res => {
  //   const is_payid_allowed = res.is_payid_allowed;
  //   if (!is_payid_allowed) {
  //     const filtered = DefaultArray.paymentOptions.filter(
  //       item => item.title !== 'PayID',
  //     );
  //     setRowList(filtered);
  //   }
  // });

  const isBackButton = () => {
    return props?.route?.params?.fromScreen ? true : false;
  };

  return (
    <SafeAreaView
      style={[commonStyles.safeView, ThemeFunctions.setBackground(appTheme)]}>
      <Header
        title={strings('banking')}
        showBack={isBackButton()}
        textStyle={{
          marginLeft: isBackButton() ? 0 : 40,
          color: isDarkTheme(appTheme) ? '#fff' : '#000',
        }}
      />
      <FlatList
        data={DefaultArray.paymentOptions}
        contentContainerStyle={securityStyles.list}
        renderItem={({item}) => <RowItem res={item} />}
        keyExtractor={(item, key) => `${key}`}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

export default Payments;
