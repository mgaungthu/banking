import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import {ThemeButton, UiHeader, Input, CustomModal} from '../../components';
import {commonStyles} from '../../globalstyles/styles';
import {strings} from '../../strings';
import Colors from '../../theme/Colors';
import {depositModalStyles as styles} from '../funding/styles';
import {ScrollView} from 'react-native-gesture-handler';
import {AppConstants, MapperConstants, APIConstants} from '../../constants';
import {showToast} from '../../utils/GenericUtils';
import {useForm} from 'react-hook-form';
import fonts from '../../theme/fonts';
import {withdrawalStyles} from './styles';
import {FormConstants, ReturnKeyTypes} from '../../enums';
import {Icon} from 'react-native-elements';
import {
  AppFunctions,
  RegexExpression,
  ThemeFunctions,
  GenericFunctions,
} from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {makeRequest} from '../../services/ApiService';
import BackgroundTimer from 'react-native-background-timer';
import Toast from 'react-native-toast-message';
import QrScanModal from '../../components/popups/QrScanModal';
import {request, PERMISSIONS} from 'react-native-permissions';

const WithdrawalAddress = ({
  isWithdrawalSheet,
  handleWithdrawalDetails,
  depositDetails,
  withdrawStep,
  setWithdrawStep,
  setIsWithdrawalSheet,
  setDepositDetails,
  setDepositInfo,
  ...props
}: any) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    reset,
    getValues,
  } = useForm();
  const {isRtlApproach, appTheme, userdata} = useSelector(
    (state: any) => state.globalReducer,
  );
  const [loading, setLoading] = useState(MapperConstants.StatusMapper.disable);
  const [feeDetails, setFeeDetails] = useState<any>({});
  const [timerCount, setTimerCount] = useState(120);
  const [showModalQrScan, setShowModalQrScan] = useState(false);
  useEffect(() => {
    setValue(FormConstants.Amount, minimumAmount());
  }, [isWithdrawalSheet]);

  useEffect(() => {
    //check android perrmission camera to scan qr code
    if (Platform.OS === 'android') request(PERMISSIONS.ANDROID.CAMERA);
  }, []);

  const updateTimerCount = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      setTimerCount(prevState => (prevState > 0 ? prevState - 1 : prevState));
    }, 1000);
    return () => {
      resetTimer();
    };
  };

  const resetTimer = () => {
    BackgroundTimer.stopBackgroundTimer();
    setTimerCount(120);
  };

  const minimumAmount = () => {
    return AppConstants.minAmount[depositDetails?.symbol]
      ? '' + AppConstants.minAmount[depositDetails?.symbol]
      : '';
  };

  const onSubmit = async (data: any) => {
    let minamt = minimumAmount() ? minimumAmount() : 0;
    const bal = depositDetails?.balance
      ? parseFloat(depositDetails?.balance)
      : 0;
    if (parseFloat(data.amount) >= minamt && parseFloat(data.amount) <= bal) {
      setLoading(MapperConstants.StatusMapper.enable);
      let payload = {
        currency: depositDetails.symbol,
        amount: data.amount,
        destTag: data.destTag,
      };
      const updatedPayload = GenericFunctions.convertToFormdata(payload);

      const response = await makeRequest(
        MapperConstants.ApiTypes.POST,
        APIConstants.REQUEST_OTP_FOR_WITHDRAWAL,
        {},
        updatedPayload,
      );
      setLoading(MapperConstants.StatusMapper.disable);

      if (response.status === 200) {
        const fee = userdata.feeDetail.find(
          resp => resp.symbol === depositDetails.symbol,
        );
        const calcFee =
          Object.keys(fee).length > 0 ? fee.withdrawalNormalFee : 0;
        const receivedAmount: any = parseFloat(data.amount) - calcFee;
        let details = {
          fee: calcFee,
          receivedAmount: parseFloat(receivedAmount).toFixed(2),
          amount: data.amount,
          address: data.address,
        };
        updateTimerCount();
        setFeeDetails(details);
        setWithdrawStep(1);
        showMsg(strings('withdraw'), response.message, 'success');
      } else {
        showMsg(strings('withdraw'), response.message, 'error');
      }
    } else {
      showMsg(
        strings('withdraw'),
        strings('insufficient_balance', {
          key: depositDetails.symbol,
        }),
        'error',
      );
    }
  };

  const resendOtp = async () => {
    if (timerCount === 0) {
      let payload = {
        currency: depositDetails.symbol,
        amount: getValues(FormConstants.Amount),
      };
      const updatedPayload = GenericFunctions.convertToFormdata(payload);
      const response = await makeRequest(
        MapperConstants.ApiTypes.POST,
        APIConstants.REQUEST_OTP_FOR_WITHDRAWAL,
        {},
        updatedPayload,
      );
      if (response.status === 200) {
        setTimerCount(120);
        showMsg(strings('resend'), response.message, 'success');
      } else {
        showMsg(strings('resend'), response.message, 'error');
      }
    }
  };
  const onOtpSubmit = async (data: any) => {
    setLoading(MapperConstants.StatusMapper.enable);

    let payload = {
      currency: depositDetails.symbol,
      amount: feeDetails.amount,
      toAddress: feeDetails.address,
      transactionSpeed: 'normal',
      otp: data[FormConstants.OTP],
      tfa: data[FormConstants.TFA],
      destinationTag: data[FormConstants.DestinationTag] || '',
    };

    const updatedPayload = GenericFunctions.convertToFormdata(payload);

    const response = await makeRequest(
      MapperConstants.ApiTypes.POST,
      APIConstants.REQUEST_WITHDRAWAL,
      {},
      updatedPayload,
    );
    setLoading(MapperConstants.StatusMapper.disable);

    if (response.status === 200) {
      resetTimer();
      setIsWithdrawalSheet(false);
      setFeeDetails({});
      setDepositDetails(null);
      setDepositInfo(null);
      reset();
      setWithdrawStep(0);

      showMsg(strings('withdraw'), response.message, 'success');
    } else {
      showMsg(strings('withdraw'), response.message, 'error');
      // showToast(strings('withdraw'), response.message, 'error')
    }
  };
  const showMsg = (title, msg, type) => {
    setIsToast(true);
    GenericFunctions.showModalToast(modalToastRef, title, msg, type);
    hideToast();
  };
  const handleClose = () => {
    resetTimer();
    setIsWithdrawalSheet(false);
    setFeeDetails({});
    setDepositDetails(null);
    setDepositInfo(null);
    reset();
    setWithdrawStep(0);
  };
  const modalToastRef = React.useRef() as any;
  const [isToast, setIsToast] = useState(false);

  const hideToast = () => {
    setTimeout(() => {
      setIsToast(false);
    }, 2000);
  };

  const destTagRef = useRef(null);
  const amountRef = useRef(null);
  const tfaRef = useRef(null);

  const toogleModalQrScan = () => {
    setShowModalQrScan(state => !state);
  };

  const onSuccessScanQrCode = event => {
    if (event.data) {
      setShowModalQrScan(false);
      setValue(FormConstants.Address, event.data.replace(/.*:/, ''));
    }
  };

  return (
    <CustomModal
      visibility={isWithdrawalSheet}
      customBackground={'#fff'}
      disableCoverScreen
      style={[
        withdrawalStyles.withdrawModals,
        {
          // bottom: withdrawStep === 0 ? -80 : -95,
        },
      ]}>
      <SafeAreaView style={[{alignSelf: 'flex-start'}]}>
        {isToast && <Toast ref={modalToastRef} style={{zIndex: 999}} />}

        <UiHeader
          title={withdrawStep === 0 ? strings('withdrawal') : ''}
          iconColor={Colors.dimGray}
          showBack={false}
          handleBack={handleClose}
        />
        <ScrollView>
          {withdrawStep === 0 ? (
            <>
              <Text style={withdrawalStyles.availableBalance}>
                {strings('available_balance')}: {depositDetails?.balance || 0}
              </Text>
              <Input
                id={FormConstants.Address}
                placeholder=""
                control={control}
                errors={errors}
                isFieldFilledBg={true}
                isRequired={withdrawStep === 0 ? true : false}
                showTick={false}
                fontSize={13}
                returnKeyType={ReturnKeyTypes.Next}
                isModal={MapperConstants.StatusMapper.enable}
                label={strings('address')}
                customLabelColor={{
                  ...ThemeFunctions.getTextColor(appTheme),
                  fontFamily: fonts.PoppinsBold,
                  fontWeight: 'heavy',
                }}
                focusTo={
                  depositDetails?.symbol === 'XRP' ? destTagRef : amountRef
                }
                showMargin={false}
                pattern={RegexExpression.AddressRegex(depositDetails?.symbol)}
                rightComponent={
                  <TouchableOpacity
                    style={withdrawalStyles.qrScanButton}
                    onPress={toogleModalQrScan}>
                    <Icon
                      name="qr-code-2"
                      type="material"
                      {...ThemeFunctions.getTextColor(appTheme)}
                      size={30}
                    />
                  </TouchableOpacity>
                }
              />
              {depositDetails?.symbol === 'XRP' && (
                <Input
                  reference={destTagRef}
                  focusTo={amountRef}
                  id={FormConstants.DestinationTag}
                  placeholder=""
                  control={control}
                  errors={errors}
                  isFieldFilledBg={true}
                  isRequired={
                    withdrawStep === 0 && depositDetails?.symbol === 'XRP'
                      ? true
                      : false
                  }
                  showTick={false}
                  keyboardType="decimal-pad"
                  fontSize={13}
                  returnKeyType={ReturnKeyTypes.Next}
                  isModal={MapperConstants.StatusMapper.enable}
                  label={strings('destTag')}
                  customLabelColor={{
                    ...ThemeFunctions.getTextColor(appTheme),
                    fontFamily: fonts.PoppinsBold,
                    fontWeight: 'heavy',
                  }}
                  showMargin={false}
                  pattern={RegexExpression.NUMBER_REGEX}
                />
              )}
              <Input
                reference={amountRef}
                id={FormConstants.Amount}
                placeholder=""
                control={control}
                errors={errors}
                isFieldFilledBg={true}
                isRequired={withdrawStep === 0 ? true : false}
                showTick={false}
                keyboardType="decimal-pad"
                fontSize={13}
                returnKeyType={ReturnKeyTypes.Go}
                isModal={MapperConstants.StatusMapper.enable}
                label={strings('amount')}
                customLabelColor={{
                  ...ThemeFunctions.getTextColor(appTheme),
                  fontFamily: fonts.PoppinsBold,
                  fontWeight: 'heavy',
                }}
                showMargin={false}
              />
              <ThemeButton
                text="withdrawal"
                onClickHandler={handleSubmit(onSubmit)}
                loading={loading ? true : false}
              />
              <View style={styles.tipsView}>
                <Text style={[styles.textTag, {marginVertical: 4}]}>
                  {strings('tips')}
                </Text>
                <View style={[commonStyles.rowItem, styles.tipRow]}>
                  <View style={styles.bullet} />
                  <Text style={styles.tips}>
                    {strings('withdrawal_tip1', {
                      key: minimumAmount()
                        ? minimumAmount()
                        : 0 + ' ' + depositDetails?.symbol,
                    })}
                  </Text>
                </View>
                <View style={[commonStyles.rowItem, styles.tipRow]}>
                  <View style={styles.bullet} />
                  <Text style={styles.tips}>{strings('withdrawal_tip2')}</Text>
                </View>
                <View style={[commonStyles.rowItem, styles.tipRow]}>
                  <View style={styles.bullet} />
                  <Text style={styles.tips}>{strings('withdrawal_tip3')}</Text>
                </View>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.withdrawCalc}>
                {strings('withdraw_fee_calc')}
              </Text>
              <Text
                style={[
                  ThemeFunctions.currencyTextColor(appTheme),
                  styles.amt,
                ]}>
                {strings('address')}:
              </Text>
              <Text
                style={[
                  ThemeFunctions.currencyTextColor(appTheme),
                  styles.amt,
                ]}>
                {feeDetails?.address}
              </Text>
              <View
                style={[commonStyles.rowItem, commonStyles.marginVerticalView]}>
                <View style={{width: '65%'}}>
                  <Input
                    id={FormConstants.OTP}
                    placeholder={strings('enter_otp')}
                    control={control}
                    errors={errors}
                    isFieldFilledBg={true}
                    isRequired={withdrawStep === 1 ? true : false}
                    showTick={false}
                    fontSize={13}
                    returnKeyType={ReturnKeyTypes.Next}
                    isModal={MapperConstants.StatusMapper.enable}
                    customLabelColor={{
                      ...ThemeFunctions.getTextColor(appTheme),
                      fontFamily: fonts.PoppinsBold,
                      fontWeight: 'heavy',
                    }}
                    showMargin={false}
                    maxLength={5}
                    minLength={5}
                    pattern={RegexExpression.NUMBER_REGEX}
                    focusTo={tfaRef}
                  />
                  <Text
                    style={[
                      ThemeFunctions.currencyTextColor(appTheme),
                      styles.timer,
                    ]}>
                    {AppFunctions.formatTime(timerCount)}
                  </Text>
                </View>
                <TouchableOpacity
                  style={[styles.otpBtn, ThemeFunctions.otpColor(appTheme)]}
                  onPress={resendOtp}>
                  <Text style={styles.btnText}>
                    {timerCount === 0
                      ? strings('get_otp')
                      : strings('otp_sent')}
                  </Text>
                </TouchableOpacity>
              </View>

              <Input
                id={FormConstants.TFA}
                reference={tfaRef}
                placeholder={strings('tfa_code')}
                control={control}
                errors={errors}
                isFieldFilledBg={true}
                isRequired={withdrawStep === 1 ? true : false}
                showTick={false}
                fontSize={13}
                returnKeyType={ReturnKeyTypes.Go}
                isModal={MapperConstants.StatusMapper.enable}
                customLabelColor={{
                  ...ThemeFunctions.getTextColor(appTheme),
                  fontFamily: fonts.PoppinsBold,
                  fontWeight: 'heavy',
                }}
                showMargin={false}
                maxLength={10}
                minLength={6}
                pattern={RegexExpression.NUMBER_REGEX}
              />
              <Text
                style={[
                  ThemeFunctions.currencyTextColor(appTheme),
                  styles.amt,
                  {marginTop: 16},
                ]}>
                {strings('withdraw_amount', {key: feeDetails?.amount})}
              </Text>
              <Text
                style={[
                  ThemeFunctions.currencyTextColor(appTheme),
                  styles.amt,
                ]}>
                {strings('received_amount', {key: feeDetails?.receivedAmount})}
              </Text>
              <Text
                style={[
                  ThemeFunctions.currencyTextColor(appTheme),
                  styles.amt,
                ]}>
                {strings('withdraw_fee', {key: feeDetails?.fee})}
              </Text>
              <ThemeButton
                text="withdrawal"
                onClickHandler={handleSubmit(onOtpSubmit)}
                loading={loading ? true : false}
              />
            </>
          )}
        </ScrollView>
      </SafeAreaView>
      <QrScanModal
        onSuccess={onSuccessScanQrCode}
        visibility={showModalQrScan}
        onClose={toogleModalQrScan}
      />
    </CustomModal>
  );
};

export default WithdrawalAddress;
