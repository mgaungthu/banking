import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, View, ScrollView, Text, Platform} from 'react-native';
import {commonStyles} from '../../globalstyles/styles';
import {strings} from '../../strings';
import {Header, Input, ThemeButton, ThemeText} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {APIConstants, AppConstants, MapperConstants} from '../../constants';
import {FormConstants, ReturnKeyTypes} from '../../enums';
import {showToast} from '../../utils/GenericUtils';
import {withdrawAddressStyles as styles} from './styles';
import {useForm} from 'react-hook-form';
import {Icon} from 'react-native-elements';
import {PERMISSIONS, request} from 'react-native-permissions';
import {makeRequest, makeRequestNew} from '../../services/ApiService';
import BackgroundTimer from 'react-native-background-timer';
import QrScanModal from '../../components/popups/QrScanModal';
import {WalletActions} from '../../store';
import {
  AppFunctions,
  GenericFunctions,
  RegexExpression,
  ThemeFunctions,
} from '../../utils';
import {FormatNumber} from '../../utils/AppFunctions';

const DEST_CURRENCY = ['XLM', 'XRP'];

const GetDestLabel = symbol => {
  if (symbol === 'XRP') return strings('destTag');
  if (symbol === 'XLM') return 'Memo Tag';
  return strings('destTag');
};

const WithdrawalAddress = (props: any) => {
  const {appTheme, userdata, appColor} = useSelector(
    (state: any) => state.globalReducer,
  );
  const {userProfileData} = useSelector((state: any) => state.appReducer);

  const {data, isEnabledDeposit, isEndableWithdrawal} = props.route.params;

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    reset,
    getValues,
  } = useForm();
  const [loading, setLoading] = useState(MapperConstants.StatusMapper.disable);
  const [feeDetails, setFeeDetails] = useState<any>({});
  const [amount, setAmount] = useState('');
  const [showModalQrScan, setShowModalQrScan] = useState(false);
  const destTagRef = useRef(null);
  const amountRef = useRef(null);
  const tfaRef = useRef(null);

  const dispatch = useDispatch<any>();

  const {fundsList} = useSelector((state: any) => state.quickBuyReducer);

  useEffect(() => {
    //check android perrmission camera to scan qr code
    if (Platform.OS === 'android') request(PERMISSIONS.ANDROID.CAMERA);

    dispatch(WalletActions.getWalletList());
    // setValue(FormConstants.Amount, '1');
  }, []);

  useEffect(() => {
    const Amount = parseFloat(amount);
    const feeAmount = parseFloat(data.currency.fee_withdraw);

    const decimal = 8;

    const totalCost = Amount * 1 + feeAmount * 1;

    setValue(FormConstants.Amount, `${amount}`);

    let details = {
      receivedAmount: Amount ? parseFloat(Amount).toFixed(decimal) : 0,
      amount: totalCost ? parseFloat(totalCost).toFixed(decimal) : 0,
      fee: parseFloat(data.currency.fee_withdraw).toFixed(decimal) || 0,
    };
    // updateTimerCount();
    setFeeDetails(details);
  }, [amount]);

  const setMaxAmount = () => {
    // setValue(FormConstants.Amount, `${data.available}`);
    const availableAmount = data.available;
    const calMaxAmount = (availableAmount - feeDetails?.fee).toFixed(8);
    setAmount(parseFloat(calMaxAmount));
  };

  const toogleModalQrScan = () => {
    setShowModalQrScan(state => !state);
  };

  const minimumAmount = () => {
    let minDepositAmt = '';

    if (fundsList?.length > 0) {
      const res =
        fundsList.find(item => item.currency.symbol === data?.symbol) || {};

      minDepositAmt = (res.currency.min_withdraw * 1).toFixed(
        res.decimals > 8 ? 8 : res.decimals,
      );
    }

    return minDepositAmt || '';
  };

  const onSubmit = async (dataForm: any) => {
    let minamt = minimumAmount() ? minimumAmount() : 0;
    const bal = data?.available ? parseFloat(data?.available) : 0;
    if (
      parseFloat(dataForm.amount) >= minamt &&
      parseFloat(dataForm.amount) <= bal
    ) {
      setLoading(MapperConstants.StatusMapper.enable);

      let payload = {
        currency: data.currency_id,
        amount: dataForm.amount * 1,
        destTag: data.destTag || '',
        address: dataForm.address,
        isValidated: true,
        otp: dataForm.tfa,
      };
      console.log(payload);
      const response = await makeRequestNew(
        MapperConstants.ApiTypes.POST,
        APIConstants.VALIDATE_WITHDRAW,
        {},
        payload,
      );
      console.log(response.data, 'here');
      if (response.data?.validated) {
        const completeWithdraw = await makeRequestNew(
          MapperConstants.ApiTypes.POST,
          APIConstants.WITHDRAW_COMPLETE,
          {},
          payload,
        );

        if (completeWithdraw.data.success) {
          showToast(strings('Withdraw'), 'Withdraw Succesfully', 'success');
          reset();
        } else if (completeWithdraw.data?.message === 'two_fa_incorrect_code') {
          showToast(
            strings('Withdraw'),
            'Your one time password is incorrect',
            'error',
          );
        } else {
          showToast(strings('Withdraw'), response.data.message, 'error');
        }
      } else {
        showToast(
          strings('Withdraw'),
          response.data?.errors?.address?.[0] ||
            response.data?.errors?.amount?.[0],
          'error',
        );
      }

      setLoading(MapperConstants.StatusMapper.disable);
    } else {
      if (parseFloat(dataForm.amount) < minamt) {
        console.log(minamt);
        showToast(
          strings('Withdraw'),
          strings('min_withdrawal_amount', {
            key: `${AppFunctions.standardDigitConversion(
              parseFloat((minamt * 1).toFixed(data.decimals)),
            )} ${data.symbol}`,
          }),
          'error',
        );
        return;
      }

      if (parseFloat(dataForm.amount) > bal) {
        showToast(
          strings('Withdraw'),
          strings('insufficient_balance', {
            key: data.symbol,
          }),
          'error',
        );
        return;
      }
    }
  };

  const onSuccessScanQrCode = event => {
    if (event.data) {
      setShowModalQrScan(false);
      setValue(FormConstants.Address, event.data.replace(/.*:/, ''));
    }
  };

  return (
    <SafeAreaView
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      <Header title={`Withdraw ${data.symbol}`} isNormalText />
      <ScrollView contentContainerStyle={styles.container}>
        <>
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
            {strings('balance')}
          </ThemeText>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={[
                {backgroundColor: ThemeFunctions.getTabBgColor(appTheme)},
                styles.addressContainer,
              ]}>
              <ThemeText style={{textAlign: 'center'}} numberOfLines={1}>
                {AppFunctions.standardDigitConversion(
                  (data?.available * 1).toFixed(8),
                )}{' '}
                {data.symbol}
              </ThemeText>
            </View>
          </View>

          <Input
            id={FormConstants.Address}
            key={'form_1_address'}
            placeholder=""
            control={control}
            errors={errors}
            isFieldFilledBg={true}
            isRequired={true}
            showTick={false}
            fontSize={16}
            returnKeyType={ReturnKeyTypes.Next}
            label={strings('address')}
            showMargin={false}
            pattern={RegexExpression.AddressRegex(
              data?.symbol,
              data?.currency.network_name,
            )}
            rightComponent={
              <TouchableOpacity
                style={styles.qrScanButton}
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

          <Input
            reference={amountRef}
            key={'form_1_amount'}
            id={FormConstants.Amount}
            placeholder=""
            control={control}
            errors={errors}
            onChangeVal={val => setAmount(val)}
            isFieldFilledBg={true}
            isRequired={true}
            showTick={false}
            keyboardType="decimal-pad"
            returnKeyType={ReturnKeyTypes.Go}
            isModal={MapperConstants.StatusMapper.enable}
            label={strings('amount')}
            showMargin={false}
            rightComponent={
              <TouchableOpacity style={styles.maxButton} onPress={setMaxAmount}>
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit={true}
                  style={{color: ThemeFunctions.getColor(appColor)}}>
                  MAX
                </Text>
              </TouchableOpacity>
            }
          />

          {/* <Input
            id={FormConstants.DestinationTag}
            label={strings('Payment ID or Destination tag')}
            control={control}
            errors={errors}
            isFieldFilledBg={false}
            isRequired={false}
            showDropDown={false}
            dropdown={false}
            showTick={false}
          /> */}

          {userProfileData.two_fa_enabled === 1 && (
            <Input
              id={FormConstants.TFA}
              label={strings('Two Factor Authentication')}
              control={control}
              errors={errors}
              isFieldFilledBg={false}
              isRequired={true}
              showDropDown={false}
              dropdown={false}
              showTick={false}
            />
          )}

          <View style={styles.tipRow}>
            <ThemeText style={[{marginVertical: 4}]}>
              {strings('tips')}
            </ThemeText>
            {minimumAmount() && minimumAmount() > 0 ? (
              <View style={[commonStyles.rowItem, styles.tipRow]}>
                <View style={styles.bullet} />
                <ThemeText style={styles.tips}>
                  {strings('withdrawal_tip1', {
                    key: minimumAmount()
                      ? AppFunctions.standardDigitConversion(
                          (minimumAmount() * 1).toFixed(8),
                        ) +
                        ' ' +
                        data?.symbol
                      : 0 + ' ' + data?.symbol,
                  })}
                </ThemeText>
              </View>
            ) : null}
            <View style={[commonStyles.rowItem, styles.tipRow]}>
              <View style={styles.bullet} />
              <ThemeText style={styles.tips}>
                {strings('withdrawal_tip2')}
              </ThemeText>
            </View>
            <View style={[commonStyles.rowItem, styles.tipRow]}>
              <View style={styles.bullet} />
              <ThemeText style={styles.tips}>
                {strings('withdrawal_tip3')}
              </ThemeText>
            </View>

            <ThemeText style={[styles.amt, {marginTop: 16}]}>
              {strings('withdraw_amount', {key: feeDetails?.amount})}{' '}
              {data?.symbol}
            </ThemeText>

            <ThemeText style={[styles.amt]}>
              {strings('withdraw_fee', {
                key: `${feeDetails?.fee}  ${data?.symbol}`,
              })}
            </ThemeText>

            <ThemeText style={[styles.amt]}>
              {strings('received_amount', {key: feeDetails?.receivedAmount})}{' '}
              {data?.symbol}
            </ThemeText>

            {/* <ThemeText style={[styles.amt]}>
                {strings('additional_fee')}
              </ThemeText> */}
          </View>
        </>
      </ScrollView>
      <View style={commonStyles.paddingHorizontalView}>
        <ThemeButton
          text="withdrawal"
          onClickHandler={handleSubmit(onSubmit)}
          loading={loading ? true : false}
          disabled={loading ? true : false}
        />
      </View>
      <QrScanModal
        onSuccess={onSuccessScanQrCode}
        visibility={showModalQrScan}
        onClose={toogleModalQrScan}
      />
    </SafeAreaView>
  );
};

export default WithdrawalAddress;
