import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {CustomModal, Header} from '../../components';
import {strings} from '../../strings';
import {commonStyles} from '../../globalstyles/styles';
import {useSelector} from 'react-redux';
import {navigate, ThemeFunctions} from '../../utils';
import styles from './styles';
import * as Images from '../../assets';
import Colors, {rapunzelTheme} from '../../theme/Colors';
import {TabBar, TabView} from 'react-native-tab-view';
import QrPayTransaction from './QrPayTransaction';
import PosHistory from './PosHistory';
import {Icon} from 'react-native-elements';
import QrScanModal from '../../components/popups/QrScanModal';
import {makeRequest} from '../../services/ApiService';
import {APIConstants, MapperConstants} from '../../constants';
import {showToast} from '../../utils/GenericUtils';
import moment from 'moment';
import {AppColor, Screen} from '../../enums';

const QrPay = (props: any) => {
  const id = props.route.params?.id;
  const data = props.route.params?.data;

  const loadedData = id || data;

  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer);

  const [showModalQrScan, setShowModalQrScan] = useState(false);

  const [qrCodeData, setQrCodeData] = useState(null);
  const [loadingQr, setloadingQr] = useState(loadedData);

  const [index, setIndex] = useState(0);

  const [routes] = useState([
    {key: 'qr_pay', title: strings('qr_pay')},
    {key: 'history', title: strings('history')},
  ]);

  const renderScene = ({route: {key}}) => {
    switch (key) {
      case 'history':
        return <PosHistory isQrPay={true} />;
    }
    return (
      <QrPayTransaction
        qrCodeData={qrCodeData}
        onQrScan={toggleModalScan}
        loading={loadingQr}
      />
    );
  };

  const handleIndexChange = (index: number) => {
    setIndex(index);
  };

  const onSuccessScanQrCode = result => {
    toggleModalScan();
    setQrCodeData(result);
    setIndex(0);
  };

  const toggleModalScan = () => {
    setShowModalQrScan(state => !state);
  };

  const getDataQrCode = async () => {
    try {
      const response = await makeRequest(
        MapperConstants.ApiTypes.POST,
        APIConstants.GET_DATA_PAYMENT,
        {},
        {uniqueId: id},
      );
      setloadingQr(false);
      if (response.status === 200) {
        setQrCodeData({data: response.data.dataPayment});
      } else showToast(strings('qr_pay'), response.message, 'error');
    } catch (error) {
      setloadingQr(false);
      showToast(strings('qr_pay'), 'Error when payment', 'error');
    }
  };

  const navigateExport = () => {
    navigate(Screen.PosHistoryExport, {type: 1});
  };

  const _getLogo = () => {
    switch (appColor) {
      case AppColor.pink:
        return Images.logo_pink;
      case AppColor.green:
        return Images.logo_green;
    }
    return Images.logo_black;
  };

  useEffect(() => {
    if (id) {
      getDataQrCode();
    } else if (data) {
      setQrCodeData(data);
    }
  }, []);

  return (
    <>
      <SafeAreaView
        style={[commonStyles.safeView, ThemeFunctions.setBackground(appTheme)]}>
        <Header
          isImg={true}
          imgUrl={_getLogo()}
          imgStyle={styles.imgHeader}
          right={
            <>
              <TouchableOpacity
                style={styles.rightHeader}
                onPress={toggleModalScan}>
                <Icon
                  type="material-community"
                  name="qrcode-scan"
                  color={ThemeFunctions.getCurrentTextColor(appTheme)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconExport}
                onPress={navigateExport}>
                <Icon
                  type="foundation"
                  name="page-export"
                  color={ThemeFunctions.getCurrentTextColor(appTheme)}
                />
              </TouchableOpacity>
            </>
          }
        />
        <View style={{flex: 1}}>
          <TabView
            lazy
            tabBarPosition="top"
            navigationState={{
              index,
              routes,
            }}
            renderScene={renderScene}
            onIndexChange={handleIndexChange}
            // initialLayout={{ width: useWindowDimensions().width }}
            renderTabBar={props => (
              <TabBar
                bounces={true}
                scrollEnabled={true}
                indicatorStyle={{backgroundColor: 'transparent'}}
                contentContainerStyle={[styles.tabContainer]}
                onTabLongPress={({route: {key}}) => {
                  props.jumpTo(key);
                }}
                {...props}
                style={[
                  {backgroundColor: ThemeFunctions.getTabBgColor(appTheme)},
                  styles.tabStyle,
                ]}
                renderLabel={({route, focused, color}) => (
                  <View style={styles.tabView}>
                    <Text
                      adjustsFontSizeToFit={true}
                      style={[
                        styles.textTab,
                        focused
                          ? ThemeFunctions.textColor(appTheme)
                          : {color: ThemeFunctions.customText(appTheme)},
                      ]}>
                      {route?.title}
                    </Text>
                    <View
                      style={
                        focused && [
                          styles.line,
                          {backgroundColor: ThemeFunctions.getColor(appColor)},
                        ]
                      }
                    />
                  </View>
                )}
              />
            )}
          />
        </View>
      </SafeAreaView>
      <QrScanModal
        onSuccess={onSuccessScanQrCode}
        visibility={showModalQrScan}
        onClose={toggleModalScan}
      />
    </>
  );
};

export default QrPay;
