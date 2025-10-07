import React, {useEffect, useState} from 'react';
import {View, Text, Keyboard} from 'react-native';
import {commonStyles} from '../../../globalstyles/styles';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import _ from 'lodash';
import {AppFunctions, ThemeFunctions} from '../../../utils';
import AddPaymentForm from './AddPaymentForm';
import {DismissKeyboardView, Space, ThemeButton} from '../../../components';
import {FormConstants, Loader} from '../../../enums';
import {strings} from '../../../strings';
import {withdrawalStyles as styles} from '../styles';
import SelectToken from '../../gbex/crypto/SelectToken';
import {APIConstants, AppConstants, MapperConstants} from '../../../constants';
import {GbexActions, PaymentActions} from '../../../store';
import {makeRequest} from '../../../services/ApiService';
import {showToast} from '../../../utils/GenericUtils';

const AddPayment = (props: any) => {
  const dispatch = useDispatch<any>();
  const {appTheme} = useSelector((state: any) => state.globalReducer);
  const appData = useSelector((state: any) => state.appReducer);
  const quickBuyData = useSelector((state: any) => state.quickBuyReducer);
  const {userProfileData} = useSelector((state: any) => state.appReducer);

  const [isModal, setIsModal] = useState(MapperConstants.StatusMapper.disable);
  const [currency, setCurrency] = useState<any>('');
  const {liveCurrencyPrices} = useSelector((state: any) => state.gbexReducer);
  const [scrollingIndex, setScrollingIndex] = useState(0);

  const [total, setTotal] = useState('');
  const [amount, setAmount] = useState('');
  const [feeAmount, setFeeAmount] = useState('');
  let decimals;
  if (quickBuyData?.fundsList && currency) {
    const curr = quickBuyData?.fundsList.find(res => res.symbol === currency);
    decimals = curr.decimals;
  }

  const {
    control,
    formState: {errors},
    setValue,
    getValues,
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    // setAmount(sendAmount);
    setValue(FormConstants.Amount, `${amount}`);
    calculateFee();
  }, [amount]);

  useEffect(() => {
    setValue(FormConstants.Currency, currency);
    getBalance();
    calculateFee();
  }, [currency]);

  const getBalance = () => {
    let curr = null;
    let _total = 0;
    if (currency === '') return null;

    if (quickBuyData?.fundsList?.length > 0) {
      curr = quickBuyData?.fundsList.find(res => res.symbol === currency);

      _total =
        curr && Object.keys(curr).length > 0 && curr?.available
          ? curr.available * 1
          : 0;
      setTotal(_total);
      setValue(
        FormConstants.Balance,
        '' + AppFunctions.smartRound(_total, decimals),
      );
    } else {
      setValue(FormConstants.Balance, '0');
    }
  };

  const resetToIntialValues = () => {
    reset();
    setAmount('');
    calculateFee();
    setValue(FormConstants.FinalAmount, '0');
  };

  const updateToken = (item, index) => () => {
    setCurrency(item.symbol);
    setIsModal(MapperConstants.StatusMapper.disable);
    setScrollingIndex(index);
  };

  const calculateFee = () => {
    if (currency && getValues(FormConstants.Balance)) {
      const feeAmount = (0.1 * amount) / 100;
      setFeeAmount(feeAmount);
    }
  };

  const setMaxAmount = () => {
    // setValue(FormConstants.Amount, `${data.available}`);
    if (getValues(FormConstants.Currency)) {
      const availableAmount = Math.abs((0.1 * total) / 100 - total);

      setAmount(availableAmount.toFixed(6));
      calculateFee();
    } else {
      showToast('', 'Please choose currency first', 'info');
    }
  };

  const onSubmit = async (data: any) => {
    let filteredData = quickBuyData?.fundsList?.find(
      res => res.symbol === currency,
    );

    if (
      parseFloat(data.final_amount) > parseFloat(data.balance.replace(/,/g, ''))
    ) {
      showToast(strings('internal_payments'), 'Insufficent Balance', 'error');
      return;
    }

    delete filteredData.assetUrl;
    delete filteredData.version;

    let payload = {
      currency: filteredData,
      amount: data.amount,
      recipient_email: data.email,
      currency_type: filteredData.type,
    };
    if (userProfileData.two_fa_enabled === 1) {
      payload.otp = data.tfa;
    }
    dispatch(
      PaymentActions.createInternalPayment(payload, resetToIntialValues),
    );
    Keyboard.dismiss();
  };

  return (
    <View
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      <KeyboardAwareScrollView
        contentContainerStyle={[commonStyles.paddingHorizontalView]}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={34}>
        <DismissKeyboardView>
          <Text
            style={[ThemeFunctions.labelText(appTheme), styles.internalNote]}>
            {strings('internal_payment_note')}
          </Text>
          <AddPaymentForm
            control={control}
            errors={errors}
            setIsVisible={setIsModal}
            feeAmount={feeAmount}
            setAmount={setAmount}
            amount={amount}
            total={total}
            setMaxAmount={setMaxAmount}
            setValue={setValue}
            currency={currency}
            decimals={decimals}
            userProfileData={userProfileData}
          />
          <SelectToken
            secondCurrency={currency}
            isVisible={isModal}
            setIsVisible={setIsModal}
            liveCurrencyPrices={liveCurrencyPrices}
            setSecondCurrency={setCurrency}
            updateToken={updateToken}
            setScrollingIndex={setScrollingIndex}
            scrollingIndex={scrollingIndex}
          />

          <Space height={50} />
        </DismissKeyboardView>
      </KeyboardAwareScrollView>
      <View style={commonStyles.paddingHorizontalView}>
        <ThemeButton
          text="submit"
          onClickHandler={handleSubmit(onSubmit)}
          loading={
            appData.loading === Loader.CREATE_INTERNAL_PAYMENT ? true : false
          }
        />
      </View>
    </View>
  );
};

export default AddPayment;
