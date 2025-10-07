import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, View, ScrollView, Platform} from 'react-native';
import {commonStyles} from '../../globalstyles/styles';
import {strings} from '../../strings';
import {Header, LoadingSpinner, Space, ThemeText} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {ThemeFunctions} from '../../utils';
import {TouchableOpacity} from 'react-native-gesture-handler';
import IconVector from '../../components/ui/IconVector';
import {APIConstants, AppConstants, MapperConstants} from '../../constants';
import {showToast} from '../../utils/GenericUtils';
import {depositAddressStyles as styles} from './styles';
import QRCode from 'react-native-qrcode-svg';
import Clipboard from '@react-native-clipboard/clipboard';
import Share from 'react-native-share';
import {WalletActions} from '../../store';
import {CurrentConfig} from '../../../api_config';
import {axiosInstance} from '../../services/AxiosOrder';
import {makeRequestNew} from '../../services/ApiService';

const DepositAddress = (props: any) => {
  const qrCodeRef: any = useRef(null);
  const dispatch = useDispatch<any>();
  const {wallets} = useSelector(state => state.walletReducer);

  const {data} = props.route.params;

  const [currencyAddress, setCurrencyAddress] = useState();
  const [isAddressLoading, setIsAddressLoading] = useState(false);

  useEffect(() => {
    dispatch(WalletActions.getWalletList());
    getLatestAddress();
  }, []);

  const minimumAmount = () => {
    let minDepositAmt = '';
    if (wallets?.length > 0) {
      const res = wallets.find(item => item.currency === data?.symbol) || {};

      minDepositAmt = (res.min_deposit * 1).toFixed(
        res.currency_decimals > 8 ? 8 : res.currency_decimals,
      );
    }

    return minDepositAmt || '';
  };

  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer);

  const getLatestAddress = async () => {
    setIsAddressLoading(true);

    if (wallets?.length > 0) {
      const res = wallets.find(item => item.currency === data?.symbol);
      if (res?.crypto_address) {
        setCurrencyAddress(res.crypto_address);
      } else if (data?.symbol) {
        let response;
        if (Platform.OS === 'ios') {
          const url = `${APIConstants.GENERATE_ADDRESS}?currency=${res.currency_id}`;
          response = await axiosInstance.post(url);
        } else {
          response = await makeRequestNew(
            MapperConstants.ApiTypes.POST,
            APIConstants.GENERATE_ADDRESS,
            {},
            {},
            {currency: res.currency_id},
          );
        }
        // console.log(res);
        setCurrencyAddress(response.data.data);
      } else {
        showToast('Wallet Deposit Address', 'Address not founded', 'error');
      }

      setIsAddressLoading(false);
    }
  };

  const _copyAddress = () => {
    if (isAddressLoading || !currencyAddress) {
      showToast('Wallet Deposit Address', 'Address not loaded', 'error');
      return;
    }

    Clipboard.setString(currencyAddress);
    showToast('', strings('Copied'), 'info');
  };

  const _shareQr = () => {
    try {
      qrCodeRef.current.toDataURL(data_qr => {
        const shareImageBase64 = {
          title: `${data?.symbol} Deposit`,
          message: `Globiance ${data?.symbol} Deposit Address`,
          url: `data:image/png;base64,${data_qr}`,
        };
        Share.open(shareImageBase64);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const _destTag = () => {
    if (data.currencyName !== 'XRP') return <></>;
    return (
      <>
        <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
          Destination Tag
        </ThemeText>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={[
              {backgroundColor: ThemeFunctions.getTabBgColor(appTheme)},
              styles.addressContainer,
            ]}>
            <ThemeText style={{textAlign: 'center'}} numberOfLines={1}>
              {currencyAddress}
            </ThemeText>
          </View>
          <TouchableOpacity
            style={[
              styles.copyButton,
              {backgroundColor: ThemeFunctions.getColor(appColor)},
            ]}
            onPress={() => {
              if (isAddressLoading) {
                showToast(
                  'Wallet Deposit Address',
                  'Address not loaded',
                  'error',
                );
                return;
              }
              Clipboard.setString(`${currencyAddress}`);
              showToast('', strings('Copied'), 'info');
            }}>
            <IconVector.FontAwesome5 name="copy" color="white" size={22} />
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <SafeAreaView
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      <Header title={`Deposit ${data?.symbol}`} isNormalText />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.qrContainer}>
          <View style={styles.wrapQr}>
            {isAddressLoading ? (
              <LoadingSpinner
                size={190}
                color={ThemeFunctions.getColor(appColor)}
              />
            ) : (
              <QRCode
                size={190}
                value={currencyAddress}
                quietZone={10}
                logoBorderRadius={20}
                getRef={qrCodeRef}
              />
            )}
          </View>
        </View>
        <TouchableOpacity style={styles.shareContainer} onPress={_shareQr}>
          <ThemeText
            style={[
              styles.textShare,
              {color: ThemeFunctions.getColor(appColor)},
            ]}>
            Share
          </ThemeText>
          <IconVector.Feather
            name="share"
            color={ThemeFunctions.getColor(appColor)}
            size={20}
          />
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          {data.network && (
            <>
              <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
                Token Type
              </ThemeText>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={[
                    {backgroundColor: ThemeFunctions.getTabBgColor(appTheme)},
                    styles.addressContainer,
                  ]}>
                  <ThemeText style={{textAlign: 'center'}} numberOfLines={1}>
                    {data.network}
                  </ThemeText>
                </View>
              </View>
            </>
          )}

          <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
            Deposit Address
          </ThemeText>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={[
                {backgroundColor: ThemeFunctions.getTabBgColor(appTheme)},
                styles.addressContainer,
              ]}>
              <ThemeText numberOfLines={1}>{currencyAddress}</ThemeText>
            </View>
            <TouchableOpacity
              style={[
                styles.copyButton,
                {backgroundColor: ThemeFunctions.getColor(appColor)},
              ]}
              onPress={_copyAddress}>
              <IconVector.FontAwesome5 name="copy" color="white" size={22} />
            </TouchableOpacity>
          </View>
          {_destTag()}

          <Space height={10} />
          <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
            {strings('Information')}
          </ThemeText>
          <Space height={10} />
          <View style={[commonStyles.rowItem, styles.tipRow]}>
            {/* <View style={styles.bullet} /> */}
            <ThemeText
              style={[styles.tips, {color: ThemeFunctions.getColor(appColor)}]}>
              Make sure to confirm the address you copied when you paste it into
              another location.
            </ThemeText>
          </View>

          <View style={[commonStyles.rowItem, styles.tipRow]}>
            {/* <View style={styles.bullet} /> */}
            {data?.currency.currency_type == 2 && (
              <ThemeText style={styles.tips}>
                You can only deposit {data?.currency.token_type}-based{' '}
                {data?.currency.name} ({data?.currency.symbol}) via the{' '}
                {data?.currency.network_name} blockchain to the address above.
              </ThemeText>
            )}
            {data?.currency.currency_type == 1 && (
              <ThemeText style={styles.tips}>
                You can only deposit {data?.currency.name} (
                {data?.currency.symbol}) via the {data?.currency.network_name}{' '}
                blockchain to the address above.
              </ThemeText>
            )}
          </View>
          {minimumAmount() && minimumAmount() > 0 ? (
            <View style={[commonStyles.rowItem, styles.tipRow]}>
              {/* <View style={styles.bullet} /> */}
              <ThemeText style={styles.tips}>
                Minimum deposit amount is {`${minimumAmount()} ${data?.symbol}`}{' '}
                {`\n`}
                Deposits lower than {`${minimumAmount()} ${data?.symbol}`} won't
                be refunded.
              </ThemeText>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DepositAddress;
