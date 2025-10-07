import React, {useEffect, useState} from 'react';
import {Keyboard, View} from 'react-native';
import {commonStyles} from '../../../globalstyles/styles';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import _ from 'lodash';
import {ThemeFunctions} from '../../../utils';
import InitiatePaymentForm from './InitiatePaymentForm';
import {DismissKeyboardView, Space, ThemeButton} from '../../../components';
import {FormConstants, Loader} from '../../../enums';
import SelectToken from '../deposit/SelectToken';
import {APIConstants, MapperConstants} from '../../../constants';
import {GbexActions, PaymentActions} from '../../../store';
import SelectBeneficiary from '../common/SelectBeneficiary';
import SelectBank from '../common/SelectBank';
import {axiosInstance} from '../../../services/AxiosOrder';

const AddPayment = (props: any) => {
  const dispatch = useDispatch<any>();
  const {appTheme} = useSelector((state: any) => state.globalReducer);
  const {beneficiaryList} = useSelector((state: any) => state.paymentReducer);

  const appData = useSelector((state: any) => state.appReducer);

  // For currency selection
  const [isModal, setIsModal] = useState(MapperConstants.StatusMapper.disable);
  const [currency, setCurrency] = useState<any>('');
  const [currencyId, setCurrencyId] = useState(null);
  const [scrollingIndex, setScrollingIndex] = useState(0);

  // For beneficiary selection
  const [isBenficiaryModal, setIsBenficiaryModal] = useState<Boolean>(
    MapperConstants.StatusMapper.disable,
  );
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<any>(null);
  const [beneficiaryScrollingIndex, setBeneficiaryScrollingIndex] = useState(0);

  // For bank selection
  const [isBankModal, setIsBankModal] = useState<Boolean>(
    MapperConstants.StatusMapper.disable,
  );
  const [selectedBank, setSelectedBank] = useState<any>(null);
  const [bankScrollingIndex, setBankScrollingIndex] = useState(0);

  const [processingBanks, setBanks] = useState([]);
  const [currencyFeeDetails, setCurrencyFeeDetails] = useState({});

  const {
    control,
    formState: {errors},
    setValue,
    getValues,
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    if (props.activeIndex === 0) {
      resetToIntialValues();
      if (beneficiaryList?.length === 0) {
        dispatch(PaymentActions.beneficiaryList());
      }
      // if (banks?.length === 0) {
      //   dispatch(PaymentActions.getBankListing())
      // }
    }
  }, [props.activeIndex]);

  useEffect(() => {
    setValue(FormConstants.Currency_Label, currency);
  }, [currency]);

  const resetToIntialValues = () => {
    reset();
    setSelectedBeneficiary(null);
    setCurrency('');
    setSelectedBank(null);
    setCurrencyId(null);
    setScrollingIndex(0);
    setBeneficiaryScrollingIndex(0);
    setBankScrollingIndex(0);
    setCurrencyFeeDetails({});
  };

  const onSubmit = async (data: any) => {
    const payload = {
      currency: currencyId,
      amount: data.amount,
      beneficiary: selectedBeneficiary,
      bank_id: selectedBank,
    };

    // console.log(payload);

    dispatch(
      PaymentActions.createWithdrawalRequest(payload, resetToIntialValues),
    );
    Keyboard.dismiss();
  };

  const handlePicker = (value: any) => () => {
    switch (value) {
      case 1:
        setIsModal(MapperConstants.StatusMapper.enable);
        break;
      case 2:
        setIsBenficiaryModal(MapperConstants.StatusMapper.enable);
        break;
      case 3:
        setIsBankModal(MapperConstants.StatusMapper.enable);
        break;
    }
  };

  // on selecting currency
  const handleCurrency = (item, index) => async () => {
    setCurrency(item.symbol);
    setCurrencyId(item.currency.id);
    setIsModal(MapperConstants.StatusMapper.disable);
    setScrollingIndex(index);
    let updatedArr = [];
    const _total = item?.available ? item.available : 0;
    setValue(FormConstants.Balance, '' + _total);

    const url = `${APIConstants.GET_BANKS}/${item.currency_id}`;
    const response = await axiosInstance.get(url);

    setValue(FormConstants.Beneficiary, '');
    setBeneficiaryScrollingIndex(null);
    setSelectedBeneficiary('');
    setValue(FormConstants.BankName, '');
    setValue(FormConstants.FinalAmount, '');
    setSelectedBank(null);
    setCurrencyFeeDetails({});
    setValue(FormConstants.Fee, '');
    setBanks(response.data.data);
  };

  // on selecting beneficiary
  const handleBeneficiary = (item, index) => () => {
    setSelectedBeneficiary(item.id);
    setIsBenficiaryModal(MapperConstants.StatusMapper.disable);
    setBeneficiaryScrollingIndex(index);
    setValue(
      FormConstants.Beneficiary,
      `${item?.name} - ${item?.bank_name} - ${item?.iban}`,
    );
  };

  // on selecting bank
  const handleBank = (item, index) => () => {
    setSelectedBank(item.id);
    setIsBankModal(MapperConstants.StatusMapper.disable);
    setBankScrollingIndex(index);
    setValue(FormConstants.BankName, item.name);
    setValue(FormConstants.Fee, item.fee_withdraw);

    // let filteredBanks = processingBanks.find(
    //   res => res.uniqueId === item.uniqueId,
    // );
    // if (filteredBanks && Object.keys(filteredBanks).length > 0) {
    //   setCurrencyFeeDetails(filteredBanks.feeInfo);
    //   setValue(FormConstants.Fee, `${filteredBanks.feeInfo.withdrawalFee}%`);
    // } else {
    //   setCurrencyFeeDetails({});
    //   setValue(FormConstants.Fee, '');
    //   setValue(FormConstants.FinalAmount, '');
    // }
  };

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
          <InitiatePaymentForm
            control={control}
            errors={errors}
            handlePicker={handlePicker}
            setValue={setValue}
            getValues={getValues}
            currencyFeeDetails={currencyFeeDetails}
          />
          <SelectToken
            currency={currency}
            isVisible={isModal}
            setIsVisible={setIsModal}
            setSecondCurrency={setCurrency}
            updateToken={handleCurrency}
            setScrollingIndex={setScrollingIndex}
            scrollingIndex={scrollingIndex}
          />
          <SelectBeneficiary
            currencySymbol={currency}
            isVisible={isBenficiaryModal}
            setIsVisible={setIsBenficiaryModal}
            selectedBeneficiary={selectedBeneficiary}
            scrollingIndex={beneficiaryScrollingIndex}
            setScrollingIndex={setBeneficiaryScrollingIndex}
            handleBeneficiary={handleBeneficiary}
          />
          <SelectBank
            isVisible={isBankModal}
            setIsVisible={setIsBankModal}
            selectedBank={selectedBank}
            scrollingIndex={bankScrollingIndex}
            setScrollingIndex={setBankScrollingIndex}
            handleBank={handleBank}
            processingBanks={processingBanks}
          />

          <Space height={50} />
        </DismissKeyboardView>
      </KeyboardAwareScrollView>
      <View style={commonStyles.paddingHorizontalView}>
        <ThemeButton
          text="submit"
          onClickHandler={handleSubmit(onSubmit)}
          loading={
            appData.loading === Loader.CREATE_WITHDRAWAL_REQUEST ? true : false
          }
        />
      </View>
    </View>
  );
};

export default AddPayment;
