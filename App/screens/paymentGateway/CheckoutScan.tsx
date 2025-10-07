import React, {useState} from 'react';

import {SafeAreaView, View} from 'react-native';

import {useSelector} from 'react-redux';
import {ThemeButton} from '../../components';
import {commonStyles} from '../../globalstyles/styles';
import {navigate, ThemeFunctions} from '../../utils';

import QrScanModal from '../../components/popups/QrScanModal';
import {Screen} from '../../enums';
import {showToast} from '../../utils/GenericUtils';

const CheckoutScan = (props: any) => {
  const {appTheme} = useSelector((state: any) => state.globalReducer);
  const [showModalQrScan, setShowModalQrScan] = useState(false);

  const toggleModalScan = () => {
    setShowModalQrScan(showModalQrScan => !showModalQrScan);
  };

  const onSuccessScanQrCode = result => {
    try {
      toggleModalScan();

      const data = JSON.parse(result.data);

      if (data.isCryptoPay) {
        navigate(Screen.Checkout, {data});
      } else {
        navigate(Screen.QrPay, {data: result});
      }
    } catch (e) {
      showToast('QR Pay', 'please scan valid globiance checkout QR', 'error');
    }
  };

  return (
    <SafeAreaView
      style={[commonStyles.safeView, ThemeFunctions.setBackground(appTheme)]}>
      <View
        style={[
          {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}>
        <ThemeButton
          text={`Scan QR Code`}
          onClickHandler={() => toggleModalScan()}
          styleButton={{paddingHorizontal: 20}}
          styleText={{textTransform: 'none'}}
        />
      </View>

      <QrScanModal
        onSuccess={onSuccessScanQrCode}
        visibility={showModalQrScan}
        onClose={toggleModalScan}
      />
    </SafeAreaView>
  );
};

export default CheckoutScan;
