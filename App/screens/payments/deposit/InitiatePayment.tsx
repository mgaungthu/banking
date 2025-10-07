import React, {useEffect, useState} from 'react';
import {Keyboard, View} from 'react-native';
import {commonStyles} from '../../../globalstyles/styles';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import _ from 'lodash';
import {ThemeFunctions, AppFunctions} from '../../../utils';
import InitiatePaymentForm from './InitiatePaymentForm';
import {DismissKeyboardView, Space, ThemeButton} from '../../../components';
import {FormConstants, Loader} from '../../../enums';
import SelectToken from './SelectToken';
import {APIConstants, MapperConstants} from '../../../constants';
import {PaymentActions} from '../../../store';

import {
  SelectCountry,
  SelectBank,
  SelectType,
  ReferenceDetails,
} from '../common';
import {makeRequestNew} from '../../../services/ApiService';
import {axiosInstance} from '../../../services/AxiosOrder';

const AddPayment = (props: any) => {
  const dispatch = useDispatch();
  const {appTheme} = useSelector((state: any) => state.globalReducer);
  const appData = useSelector((state: any) => state.appReducer);
  const {activeIndex} = props;
  // const {userInfo} = useSelector((state: any) => state.paymentReducer);
  const [isReferencePopup, setIsReferencePopup] = useState(
    MapperConstants.StatusMapper.disable,
  );
  const [referenceId, setIsReferenceId] = useState(null);

  // for currency
  const [isModal, setIsModal] = useState(MapperConstants.StatusMapper.disable);
  const [currency, setCurrency] = useState<any>('');
  const [scrollingIndex, setScrollingIndex] = useState(0);
  const [currencyId, setCurrencyId] = useState(null);

  // for country
  const [isCountryPicker, setIsCountryPicker] = useState(
    MapperConstants.StatusMapper.disable,
  );
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [countryScrollingIndex, setCountryScrollingIndex] = useState(0);

  // for type
  const [isDepositType, setIsDepositType] = useState(
    MapperConstants.StatusMapper.disable,
  );
  const [selectedType, setSelectedType] = useState<any>(null);

  // For bank selection
  const [isBankModal, setIsBankModal] = useState<Boolean>(
    MapperConstants.StatusMapper.disable,
  );
  const [selectedBank, setSelectedBank] = useState<any>(null);
  const [bankScrollingIndex, setBankScrollingIndex] = useState(0);

  const [banks, setBanks] = useState([]);
  const [selectedBankDetails, setSelectedBankDetails] = useState({});

  const [depositCode, setDepositCode] = useState(Number);
  const [clientId, setClientId] = useState(null);
  const resetToIntialValues = () => {
    reset();
    setScrollingIndex(0);
    setCurrencyId(null);
    setSelectedCountry(null);
    setCountryScrollingIndex(0);
    setSelectedBankDetails({});
    setCurrency('');
    setSelectedBank(null);
    setSelectedType(null);
    setBankScrollingIndex(0);
    setSelectedBankDetails({});
    // setTransfer();
  };

  const {
    control,
    formState: {errors},
    setValue,
    getValues,
    handleSubmit,
    reset,
  } = useForm();
  // useEffect(() => {
  //   setTransfer();
  // }, []);

  // const setTransfer = async () => {
  //   let {regionDigit, clientIdPrefix, clientIdNumber} = userInfo;
  //   regionDigit = AppFunctions.PrefixPad(regionDigit, '0', 2);
  //   clientIdNumber = AppFunctions.PrefixPad(clientIdNumber, '0', 8);
  //   let id = `${clientIdPrefix}-${regionDigit}-${clientIdNumber}`;
  //   setClientId(`${clientIdPrefix}-${regionDigit}-${clientIdNumber}`);
  //   const response = await PaymentActions.getTransferId(id);
  //   if (response.status === 200 && response.data) {
  //     setTransferId(response.data.transferId);
  //   }
  // };
  useEffect(() => {
    if (activeIndex === 0) resetToIntialValues();
  }, [activeIndex]);

  useEffect(() => {
    setValue(FormConstants.Currency_Label, currency);
  }, [currency]);

  // useEffect(() => {
  //   setValue(FormConstants.ClientId, clientId);
  // }, [clientId]);
  // const updateReferenceId = () => {
  //   setIsReferenceId(`${clientId} ${transferId}`);
  //   setIsReferencePopup(MapperConstants.StatusMapper.enable);
  // };

  const getRandom = length => {
    return Math.floor(
      Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1),
    );
  };

  const onSubmit = async (data: any) => {
    const payload = {
      amount: data.amount,
      bank_id: selectedBank,
      description: depositCode,
      isValidated: true,
      payment_type: data.type.toUpperCase(),
      fiat_currency_id: banks[0].currency.id,
    };

    // console.log(payload);
    dispatch(PaymentActions.createDepositRequest(payload, resetToIntialValues));
    Keyboard.dismiss();
  };

  // for country
  // const handleCountry = (item, index) => () => {
  //   setSelectedCountry(item.uniqueId);
  //   setCountryScrollingIndex(index);
  //   setValue(FormConstants.Country, item.name);
  //   setIsCountryPicker(MapperConstants.StatusMapper.disable);
  // };

  // function getPaymentType(type) {
  //   return type === 'Swift' ? 1 : 2;
  // }

  const handleCurrency = (item, index) => () => {
    setCurrency(item.symbol);
    setCurrencyId(item.currency.id);
    setIsModal(MapperConstants.StatusMapper.disable);
    setScrollingIndex(index);
    setSelectedBankDetails({});
    setBanks([]);
    setSelectedBank(null);
    setSelectedType(null);
    setValue(FormConstants.BankName, '');
    setValue(FormConstants.Type, '');
  };

  // for type
  const handleType = item => async () => {
    setSelectedType(item.value);
    setValue(FormConstants.Type, item.label);
    setIsDepositType(MapperConstants.StatusMapper.disable);
    setSelectedBankDetails({});

    const url = `${
      APIConstants.GET_BANKS
    }/${currencyId}/${item.value.toUpperCase()}`;
    const response = await axiosInstance.get(url);

    // console.log(url);

    if (response.status === 200) {
      updateProcessingBanks(response.data.data);
    }
  };

  const updateProcessingBanks = selectedBankList => {
    setBanks(selectedBankList);
  };

  // on selecting bank
  const handleBank = (item, index) => () => {
    setSelectedBank(item.id);
    setIsBankModal(MapperConstants.StatusMapper.disable);
    setBankScrollingIndex(index);
    setValue(FormConstants.BankName, item.name);
    setDepositCode(getRandom(10));
    if (currencyId && selectedType) {
      let filteredBanks = banks.find(res => res.id === item.id);
      if (filteredBanks && Object.keys(filteredBanks).length > 0) {
        setSelectedBankDetails(filteredBanks);
      } else {
        setSelectedBankDetails({});
      }
    } else {
      setSelectedBankDetails({});
      setValue(FormConstants.BankName, '');
    }
  };

  const handlePicker = (value: any) => () => {
    switch (value) {
      case 1:
        setIsModal(MapperConstants.StatusMapper.enable);
        break;
      case 2:
        setIsCountryPicker(MapperConstants.StatusMapper.enable);
        break;
      case 3:
        setIsDepositType(MapperConstants.StatusMapper.enable);
        break;
      case 4:
        setIsBankModal(MapperConstants.StatusMapper.enable);
        break;
    }
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
            depositCode={depositCode}
            handlePicker={handlePicker}
            setValue={setValue}
            selectedBankDetails={selectedBankDetails}
          />
          <SelectToken
            currency={currency}
            isVisible={isModal}
            setIsVisible={setIsModal}
            setCurrency={setCurrency}
            updateToken={handleCurrency}
            setScrollingIndex={setScrollingIndex}
            scrollingIndex={scrollingIndex}
          />
          {/* <SelectCountry
            isVisible={isCountryPicker}
            setIsVisible={setIsCountryPicker}
            selectedCountry={selectedCountry}
            scrollingIndex={countryScrollingIndex}
            setScrollingIndex={setCountryScrollingIndex}
            handleCountry={handleCountry}
          /> */}
          <SelectType
            isVisible={isDepositType}
            setIsVisible={setIsDepositType}
            selectedType={selectedType}
            handleType={handleType}
          />
          <SelectBank
            isVisible={isBankModal}
            setIsVisible={setIsBankModal}
            selectedBank={selectedBank}
            scrollingIndex={bankScrollingIndex}
            setScrollingIndex={setBankScrollingIndex}
            handleBank={handleBank}
            processingBanks={banks}
          />
          <ReferenceDetails
            isVisible={isReferencePopup}
            setIsVisible={setIsReferencePopup}
            referenceId={referenceId}
          />

          <Space height={50} />
        </DismissKeyboardView>
      </KeyboardAwareScrollView>
      <View style={commonStyles.paddingHorizontalView}>
        <ThemeButton
          text="submit"
          onClickHandler={handleSubmit(onSubmit)}
          loading={
            appData.loading === Loader.CREATE_DEPOSIT_REQUEST ? true : false
          }
        />
      </View>
    </View>
  );
};

export default AddPayment;
