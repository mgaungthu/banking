import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Header,
  BiometricWrapper,
  ThemeButton,
  ImageContainer,
  Input,
  LoadingSpinner,
  CustomModal,
  ThemeText,
} from '../../components';
import {strings} from '../../strings';
import {commonStyles} from '../../globalstyles/styles';
import {
  APIConstants,
  AppConstants,
  DefaultArray,
  MapperConstants,
} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {navigate, RegexExpression, ThemeFunctions} from '../../utils';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {request, PERMISSIONS} from 'react-native-permissions';
import {showToast} from '../../utils/GenericUtils';
import styles from './styles';
import * as Images from '../../assets';
import {FormConstants, ReturnKeyTypes, Screen} from '../../enums';
import {useForm} from 'react-hook-form';
import {ScrollView} from 'react-native-gesture-handler';
import {makeRequest} from '../../services/ApiService';
import {QuickBuyActions, WalletActions} from '../../store';
import {convertToUsdPrice, roundFloatNumber} from '../../utils/AppFunctions';
import Colors from '../../theme/Colors';
import Title from '../../components/ui/pos/Title';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import InputPos from '../../components/forms/InputPos';
import DepositAddress from '../funding/deposits/DepositAddress';
import Space from '../../components/ui/Space';
import Toast from 'react-native-toast-message';
import {Icon} from 'react-native-elements';
import {CurrentConfig} from '../../../api_config';

const QrPayTransaction = props => {
  const {
    control,
    formState: {errors},
    handleSubmit,
    setValue,
    reset,
  } = useForm();
  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer);
  const [isDepositSheet, setIsDepositSheet] = useState(false);
  const [depositInfo, setDepositInfo] = useState(null);
  const [depositDetails, setDepositDetails] = useState(null);

  const qrScanRef = useRef(null);
  const modalToastRef: any = useRef(null);

  const [qrCodeData, setQrCodeData] = useState(null);
  const [oldTotal, setOldTotal] = useState('0');

  const dispatch = useDispatch();

  const [isPress, setIsPress] = useState(false);

  const [showModal2FA, setShowModal2FA] = useState(false);

  useEffect(() => {
    //check android perrmission camera to scan qr code
    if (Platform.OS === 'android') request(PERMISSIONS.ANDROID.CAMERA);
  }, []);

  const styleResultContainer = [
    styles.resultContainer,
    {borderBottomColor: ThemeFunctions.sortColor(appTheme)},
  ];

  const currencys = useSelector(
    (state: any) => state.quickBuyReducer.fundsList,
  );
  const currentCurrency = currencys?.find(
    el => el.name == qrCodeData?.currencyName,
  );
  const balanceUser = currentCurrency?.balance || 0;
  const isEnoughtBalance = balanceUser >= qrCodeData?.amount;

  const {userProfileData} = useSelector((state: any) => state.appReducer);

  const onPay = async data => {
    if (!isPress) {
      try {
        setIsPress(true);
        const formData = {
          dataPayment: {
            ...qrCodeData,
            isVat: qrCodeData.isVat ? 1 : 0,
          },
          currencyId: qrCodeData.currencyId,
          toEmail: qrCodeData.email,
          amount: qrCodeData.amount,
          myReference: '',
          tfaCode: data.tfa,
          tip: data.tip || 0,
        };
        const response = await makeRequest(
          MapperConstants.ApiTypes.POST,
          APIConstants.QR_PAYMENT,
          {},
          formData,
        );
        _toggleModal2FA();
        if (response.status === 200) {
          setIsPress(false);
          showToast(strings('qr_pay'), response.message, 'success');
          dispatch(QuickBuyActions.fundsList());
          setQrCodeData(null);
          reset();
        } else {
          showToast(strings('qr_pay'), response.message, 'error');
          setIsPress(false);
        }
      } catch (error) {
        showToast(strings('qr_pay'), 'Error when payment', 'error');
        setIsPress(false);
        console.log(error);
      }
    }
  };

  const onSuccess = result => {
    try {
      const jsonDecode = JSON.parse(result.data);
      if (
        jsonDecode.amount >= 0 &&
        jsonDecode.uniqueId &&
        jsonDecode.currencyId &&
        jsonDecode.reference &&
        jsonDecode.email &&
        jsonDecode.currencyName &&
        jsonDecode.vatCalc >= 0 &&
        jsonDecode.total >= 0
      ) {
        setQrCodeData(jsonDecode);
        setOldTotal(jsonDecode.total);
        reset();
      } else {
        showToast(
          strings('qr_pay'),
          'Please scan a GlobiancePOS code only',
          'error',
        );
        qrScanRef.current.reactivate();
      }
    } catch (error) {
      console.log(error);
      qrScanRef.current?.reactivate();
      showToast(
        strings('qr_pay'),
        'Please scan a GlobiancePOS code only',
        'error',
      );
    }
  };

  const changeTip = data => {
    let tip = data.replace(',', '.') || 0;
    setValue(FormConstants.Tips, tip);
    setQrCodeData({
      ...qrCodeData,
      tip,
      total: roundFloatNumber(
        (parseFloat(oldTotal) + parseFloat(tip)).toFixed(12),
        12,
      ),
    });
  };

  const {currencyStatusData} = useSelector((state: any) => state.walletReducer);

  const isNonFiatCurrency = (currencyName: string) => {
    const filteredData = currencyStatusData.find(
      res => res?.currency === currencyName,
    );
    if (filteredData && Object.keys(filteredData).length > 0) {
      return filteredData?.isCrypto;
    } else {
      return MapperConstants.StatusMapper.disable;
    }
  };

  const deposit = async data => {
    if (data === null) {
      setIsDepositSheet(false);
      setDepositDetails(null);
      setDepositInfo(null);
    } else {
      if (
        userProfileData?.documentStatus ===
          MapperConstants.KycStatusConstant.rejected ||
        userProfileData?.documentStatus ===
          MapperConstants.KycStatusConstant.pending
      ) {
        showToast(strings('balance_deposit'), strings('kyc_msg'), 'error');
      } else {
        const data = currencys?.find(el => el.name == qrCodeData?.currencyName);
        if (isNonFiatCurrency(data.symbol) || data.symbol === 'ETH') {
          setIsDepositSheet(true);
          const depositData = await WalletActions.getAddressDetails({
            uniqueId: data.uniqueId,
            tokenSymbol: data.symbol,
            exchange_id: CurrentConfig.exchange_id,
          });
          if (depositData?.status === 200 && depositData?.data) {
            setDepositInfo(depositData.data);
          } else if (depositData?.status === 200 && depositData?.message) {
            const x: any = depositData.message;
            setDepositInfo(x.data);
          } else {
            setDepositInfo({
              address: data.currencyAddress,
              destinationTag: data.destinationTag,
              name: data.symbol,
            });
          }
          setDepositDetails(data);
        } else navigate(Screen.Payment, {});
      }
    }
  };

  const _toggleModal2FA = () => {
    setShowModal2FA(state => !state);
  };

  useEffect(() => {
    if (props.qrCodeData) onSuccess(props.qrCodeData);
  }, [props.qrCodeData]);

  return (
    <>
      {qrCodeData ? (
        <>
          <ScrollView>
            <View style={styles.formView}>
              <View
                style={[
                  styles.balanceContainer,
                  {backgroundColor: ThemeFunctions.getColor(appColor)},
                ]}>
                <Title>{strings('your_balance')}</Title>
                <View style={styles.totalBalanceContainer}>
                  <Title>{qrCodeData.currencyName}</Title>
                  <View>
                    <Title>
                      {balanceUser} {qrCodeData.currencyName}
                    </Title>
                    <ThemeText style={[styles.textDollar]}>
                      ≈{' '}
                      {convertToUsdPrice(qrCodeData.currencyName, balanceUser)}{' '}
                      USD
                    </ThemeText>
                  </View>
                </View>
              </View>
              <View style={styleResultContainer}>
                <Title>{strings('merchant')}</Title>
                <Title>{qrCodeData.email}</Title>
              </View>
              <View style={styleResultContainer}>
                <Title>{strings('reference')}</Title>
                <Title
                  styleExtend={{flex: 1, maxWidth: '70%', textAlign: 'right'}}>
                  {qrCodeData.reference}
                </Title>
              </View>
              <View style={styleResultContainer}>
                <Title>{strings('pay_with')}</Title>
                <View style={styles.currencyNameContainer}>
                  <Image
                    source={{uri: currentCurrency?.assetUrl}}
                    style={styles.imageCurrency}
                  />
                  <Title>{qrCodeData.currencyName}</Title>
                </View>
              </View>
              <View style={styleResultContainer}>
                <Title>{strings('amount')}</Title>
                <Title>
                  {qrCodeData.amount} {qrCodeData.currencyName}
                </Title>
              </View>
              <View style={styleResultContainer}>
                <Title>
                  {strings('vat')} ({qrCodeData.vatPercent || 0}%)
                </Title>
                <Title>
                  {qrCodeData.vatCalc} {qrCodeData.currencyName}
                </Title>
              </View>
              <InputPos
                id={FormConstants.Tips}
                label={'Tips'}
                pattern={RegexExpression.DECIMAL_REGEX}
                control={control}
                errors={errors}
                isFieldFilledBg={false}
                customStyles={[{marginBottom: 10}]}
                showMargin={false}
                labelStyles={{margin: 0}}
                showDropDown={false}
                showTick={false}
                keyboardType="decimal-pad"
                placeholder={`0.0 ${qrCodeData.currencyName}`}
                onChangeVal={changeTip}
                noMgLeft
              />
              <View style={styleResultContainer}>
                <Title>{strings('total')}</Title>
                <View>
                  <Title>
                    {qrCodeData.total} {qrCodeData.currencyName}
                  </Title>
                  <Text style={styles.textDollar}>
                    {convertToUsdPrice(
                      qrCodeData.currencyName,
                      qrCodeData.total,
                    )}{' '}
                    USD
                  </Text>
                </View>
              </View>
              {isEnoughtBalance ? (
                <>
                  <Space height={30} />
                  <ThemeButton
                    text={`Pay ${qrCodeData.total} ${qrCodeData.currencyName}`}
                    onClickHandler={_toggleModal2FA}
                    styleText={{textTransform: 'none'}}
                  />
                </>
              ) : (
                <>
                  <View
                    style={[
                      styles.notEnoughtBalanceContainer,
                      {backgroundColor: ThemeFunctions.getColor(appColor)},
                    ]}>
                    <Title styleExtend={{alignSelf: 'center'}}>
                      Not enough balance
                    </Title>
                  </View>
                  <View style={styles.notEnoughtContainer}>
                    <Text style={styles.notEnoughtText}>
                      Not enough {qrCodeData.currencyName}
                    </Text>
                    <Text style={styles.notEnoughtText}>
                      Please
                      <Text
                        style={styles.actionnotEnought}
                        onPress={() => deposit(1)}>
                        {' '}
                        {strings('deposit')}{' '}
                      </Text>
                      or
                      <Text
                        style={styles.actionnotEnought}
                        onPress={() =>
                          navigate(Screen.QuickSwapScreen, {fromScreen: true})
                        }>
                        {' '}
                        {strings('quick_swap')}{' '}
                      </Text>
                      to continue
                    </Text>
                  </View>
                </>
              )}
            </View>
            {Platform.OS === 'ios' && <KeyboardSpacer />}
          </ScrollView>
          <DepositAddress
            isDepositSheet={isDepositSheet}
            handleDepositDetails={deposit}
            depositDetails={depositDetails}
            handleBack={() => deposit(null)}
            depositInfo={depositInfo}
          />
          <CustomModal
            visibility={showModal2FA}
            style={styles.modal2FA}
            disableCoverScreen={true}
            onBackdropPress={_toggleModal2FA}>
            <TouchableOpacity style={styles.closeBtn} onPress={_toggleModal2FA}>
              <Icon name="clear" type="material" size={20} />
            </TouchableOpacity>
            <Text style={styles.heading}>{strings('google_auth')}</Text>
            <Input
              id={FormConstants.TFA}
              placeholder={strings('google_auth')}
              control={control}
              errors={errors}
              isFieldFilledBg={true}
              pattern={RegexExpression.NUMBER_REGEX}
              isRequired={true}
              keyboardType="phone-pad"
              showTick={false}
              fontSize={13}
              maxLength={6}
              minLength={6}
              returnKeyType={ReturnKeyTypes.Go}
              isModal={MapperConstants.StatusMapper.enable}
            />
            <ThemeButton
              text="submit"
              onClickHandler={handleSubmit(onPay)}
              loading={isPress}
              isModal={MapperConstants.StatusMapper.enable}
              disabled={isPress}
            />
            {Platform.OS === 'ios' && <KeyboardSpacer />}
          </CustomModal>
        </>
      ) : (
        <View style={styles.qrPayShowCameraContainer}>
          {props.loading ? (
            <LoadingSpinner color={Colors.white} size="small" />
          ) : (
            <ThemeButton
              text={`Scan QR code/ barcode`}
              onClickHandler={props.onQrScan}
              styleButton={{paddingHorizontal: 20}}
              styleText={{textTransform: 'none'}}
            />
          )}
        </View>
      )}
    </>
  );
};

export default QrPayTransaction;
