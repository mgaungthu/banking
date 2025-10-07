import React, {useEffect, useState} from 'react';
import {Keyboard, View} from 'react-native';
import {commonStyles} from '../../../../globalstyles/styles';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import _ from 'lodash';
import {ThemeFunctions, AppFunctions, navigate} from '../../../../utils';
import CardTopupForm from './CardTopupForm';
import {DismissKeyboardView, Space, ThemeButton} from '../../../../components';
import {FormConstants, Loader, Screen} from '../../../../enums';

import {APIConstants, MapperConstants} from '../../../../constants';
import {AppActions, PaymentActions} from '../../../../store';
import {makeRequestNew} from '../../../../services/ApiService';
import {showToast} from '../../../../utils/GenericUtils';
import SelectCard from './SelectCard';
import PayWith from './PayWith';

const CardTopup = (props: any) => {
  const dispatch = useDispatch<any>();
  const {appTheme} = useSelector((state: any) => state.globalReducer);
  const appData = useSelector((state: any) => state.appReducer);
  const {activeIndex, params, setIndex} = props;

  // for currency
  const [fromModalShow, setFromModalShow] = useState(
    MapperConstants.StatusMapper.disable,
  );
  const [currency, setCurrency] = useState<any>('');
  const [scrollingIndex, setScrollingIndex] = useState(0);
  const [CardID, setCardID] = useState(null);
  const [percentage, setCardPercentage] = useState(0);

  // for wallet

  const [isWalletModelOpen, setWalletModelOpen] = useState(
    MapperConstants.StatusMapper.disable,
  );
  const [wallet, setWallet] = useState<any>('');
  const [walletType, setWalletType] = useState();
  const [walletAmount, setWalletAmount] = useState(0);
  const [walletId, setWalletId] = useState(null);

  const resetToIntialValues = () => {
    reset();
    setScrollingIndex(0);
    setCardID(null);
    setCurrency('');
    setWallet('');

    // setTransfer();
  };

  // const {
  //   route: {params},
  // } = props;

  const {
    control,
    formState: {errors},
    setValue,
    getValues,
    handleSubmit,
    trigger,
    reset,
  } = useForm();

  useEffect(() => {
    if (params?.data) {
      handleDefaultValue();
    }
  }, [params?.data]);

  const {fundsList} = useSelector((state: any) => state.quickBuyReducer);
  const [cardAvailableBalance, setCardAvailableBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [amountWallet, setAmountWallet] = useState(0);
  const [originalTopupFee, setOriginalTopupFee] = useState(0);
  const [topupFee, setTopupFee] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (wallet) {
      const res = fundsList.find(item => item.symbol === wallet);
      const usdValueSelectedCurrency = shiftDecimalPlaces(
        res.currency.usd_value,
        8,
      );
      const amountValue = amount / usdValueSelectedCurrency;
      const fee = (amount * percentage) / 100;
      setOriginalTopupFee(fee);
      const feeValue = fee / usdValueSelectedCurrency;

      setAmountWallet(amountValue.toFixed(8));
      setTopupFee(feeValue.toFixed(8));
      const total =
        parseFloat(amountValue.toFixed(8)) + parseFloat(feeValue.toFixed(8));
      setTotalAmount(total);
    }
  }, [wallet, amount]);

  const shiftDecimalPlaces = (value, decimals = 12) => {
    let numStr = value.toString();

    numStr = numStr.replace('.', '');

    let newDecimalPosition = numStr.length - 12;

    if (newDecimalPosition < 0) {
      numStr = '0'.repeat(Math.abs(newDecimalPosition)) + numStr;
      newDecimalPosition = 0;
    }

    const result =
      numStr.slice(0, newDecimalPosition) +
      '.' +
      numStr.slice(newDecimalPosition);

    return parseFloat(result);
  };

  const handleDefaultValue = () => {
    const item = params.data;
    // console.log(item?.iban_type?.fiat_currency?.symbol);
    setCurrency(item?.card_type?.fiat_currency?.symbol);
    setCardID(item.id);
    setCardPercentage(item.card_type.topup_fee_percentage);
    // setScrollingIndex(index);
    setValue(
      FormConstants.Card,
      `${item?.card_number.replace(/(.{4})/g, '$1 ')} - ${
        item?.card_type?.fiat_currency?.name
      } (${item?.available_balance})`,
    );
    trigger(FormConstants.Card);
  };

  useEffect(() => {
    // if (activeIndex === 0) resetToIntialValues();
    dispatch(PaymentActions.getActiveCardList());
  }, [activeIndex]);

  const handleFrom = (item, index) => () => {
    setCurrency(item?.card_type?.fiat_currency?.symbol);
    setFromModalShow(MapperConstants.StatusMapper.disable);
    setCardID(item.id);
    setCardPercentage(item.card_type.topup_fee_percentage);
    setScrollingIndex(index);
    setValue(
      FormConstants.Card,
      `${item?.card_number.replace(/(.{4})/g, '$1 ')}`,
    );
    setCardAvailableBalance(
      `${item?.available_balance} ${item?.card_type?.fiat_currency?.symbol}`,
    );
    trigger(FormConstants.From);
  };

  const handleWallet = (item, index) => () => {
    setWallet(item.symbol);
    setWalletId(item.id);
    setWalletType(item.type);
    setWalletAmount(item.available);
    setWalletModelOpen(MapperConstants.StatusMapper.disable);
    setValue(FormConstants.Wallet, `${item.symbol} (${item.available})`);
    trigger(FormConstants.Wallet);
  };

  const handlePicker = (value: any) => () => {
    switch (value) {
      case 1:
        setFromModalShow(MapperConstants.StatusMapper.enable);
        break;
      case 2:
        setWalletModelOpen(MapperConstants.StatusMapper.enable);
        break;
    }
  };

  const onSubmit = async (data: any) => {
    const payload = {
      card_id: CardID,
      amount: amount,
      pay_with: {type: walletType, id: walletId},
    };

    dispatch(AppActions.updateLoading(Loader.TOPUP_CARD));
    const response = await makeRequestNew(
      MapperConstants.ApiTypes.POST,
      APIConstants.TOP_UP_CARDS,
      {},
      payload,
    );
    console.log(response.data);
    if (response.status === 200) {
      showToast('Card Top-Up', 'Topup Succesfully', 'success');
      resetToIntialValues();
      dispatch(PaymentActions.getCardtransactionList());
      // setIndex(1);
    } else {
      showToast(
        'Card Top-Up',
        response.data.errors?.pay_with?.[0] ||
          response.data.errors?.amount?.[0],
        'success',
      );
    }

    dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));

    Keyboard.dismiss();
  };

  // const item = params.data;

  return (
    <View
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      <KeyboardAwareScrollView
        contentContainerStyle={[
          commonStyles.paddingHorizontalView,
          {paddingBottom: 20},
        ]}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={34}>
        <DismissKeyboardView>
          <CardTopupForm
            control={control}
            errors={errors}
            handlePicker={handlePicker}
            setValue={setValue}
            currency={currency}
            setAmount={setAmount}
            cardAvailableBalance={cardAvailableBalance}
            amount={amount}
            wallet={wallet}
            totalAmount={totalAmount}
            topupFee={topupFee}
            amountWallet={amountWallet}
            originalTopupFee={originalTopupFee}
          />
          <SelectCard
            currency={currency}
            isVisible={fromModalShow}
            setIsVisible={setFromModalShow}
            setCurrency={setCurrency}
            updateFrom={handleFrom}
            setScrollingIndex={setScrollingIndex}
            scrollingIndex={scrollingIndex}
          />

          <PayWith
            currency={wallet}
            isVisible={isWalletModelOpen}
            setIsVisible={setWalletModelOpen}
            setCurrency={setWallet}
            updateToken={handleWallet}
          />

          <Space height={50} />
        </DismissKeyboardView>
      </KeyboardAwareScrollView>
      <View style={commonStyles.paddingHorizontalView}>
        <ThemeButton
          text="Topup"
          onClickHandler={handleSubmit(onSubmit)}
          loading={appData.loading === Loader.TOPUP_CARD ? true : false}
        />
      </View>
    </View>
  );
};

export default CardTopup;
