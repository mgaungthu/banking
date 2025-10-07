import React, {useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Big from 'big.js';

import {useForm} from 'react-hook-form';
import {commonStyles} from '../../../../../globalstyles/styles';
import {
  DatePickerView,
  Header,
  ThemeButton,
  DismissKeyboardView,
  ThemeText,
} from '../../../../../components';
import {useDispatch, useSelector} from 'react-redux';
import {AppActions, KYBActions, QuickBuyActions} from '../../../../../store';
import {APIConstants, MapperConstants} from '../../../../../constants';
import TabStep from '../TabStep';
import {accountStyles} from '../../../../account/styles';
import {navigate, ThemeFunctions} from '../../../../../utils';
import StepThreeForm from './StepThreeForm';
import {FormConstants, Loader, Screen} from '../../../../../enums';
import {makeRequestNew} from '../../../../../services/ApiService';
import {SelectCountry} from '../../../common';
import SelectDelivery from './SelectDelivery';
import SelectOrderAs from './SelectOrderAs';
import SelectWallet from './SelectWallet';
import {strings} from '../../../../../strings';
import {showToast} from '../../../../../utils/GenericUtils';

const StepThreeView = (props: any) => {
  const {
    navigation,
    route: {params},
  } = props;
  const [isCountryPicker, setIsCountryPicker] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [selectedCountryName, setSelectedCountryName] = useState<any>(null);
  const [countryScrollingIndex, setCountryScrollingIndex] = useState(0);

  //for wallet
  const [isWalletModelOpen, setWalletModelOpen] = useState(
    MapperConstants.StatusMapper.disable,
  );
  const [wallet, setWallet] = useState<any>('');
  const [walletType, setWalletType] = useState();
  const [walletAmount, setWalletAmount] = useState(0);
  const [walletId, setWalletId] = useState(null);
  const [walletPayload, setWalletPayload] = useState({});

  const [showDelivery, setShowDelivery] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState();
  const [deliID, setSelectedDeliveryID] = useState();
  const [selectedDeliveryFee, setSelectedDeliveryFee] = useState(0);

  const [orderAs, setOrderAs] = useState();
  const [orderAsShow, setOrderAsShow] = useState(false);

  const {appTheme} = useSelector((state: any) => state.globalReducer);

  const appData = useSelector((state: any) => state.appReducer);
  const {userProfileData} = useSelector((state: any) => state.appReducer);
  const {fundsList} = useSelector((state: any) => state.quickBuyReducer);
  const dispatch = useDispatch<any>();
  const [amount, setAmount] = useState(0);

  const item = params.item;

  const [docsData, setDocsData] = useState({
    BiometricImage: null,
    PassportImage: null,
    SignatureImage: null,
    PictureSelfieImage: null,
  });

  const {
    control,
    formState: {errors},
    setValue,
    getValues,
    reset,
    trigger,
    handleSubmit,
  } = useForm();

  useEffect(() => {
    // if (Object.keys(kybdata.docsInfo).length > 0) {
    //   setValue(FormConstants.companyCert, kybdata.docsInfo.companyCert.name);
    //   setValue(
    //     FormConstants.memoAndArticle,
    //     kybdata.docsInfo.memoAndArticle.name,
    //   );
    //   setValue(
    //     FormConstants.registerOfShareholders,
    //     kybdata.docsInfo.registerOfShareholders.name,
    //   );
    //   setValue(
    //     FormConstants.registerOfOfficer,
    //     kybdata.docsInfo.registerOfOfficer.name,
    //   );
    //   setValue(
    //     FormConstants.bankStatement,
    //     kybdata.docsInfo.bankStatement.name,
    //   );
    //   setValue(
    //     FormConstants.meetingToOpen,
    //     kybdata.docsInfo.meetingToOpen.name,
    //   );
    //   setDocsData(kybdata.docsInfo);
    // }
    dispatch(QuickBuyActions.getPairs());
  }, []);

  const handleDocs = (title, data) => {
    console.log(title, data.file);
    setValue(title, data.file);
    trigger(title);

    const updateData = {[title]: {tmp: data.tmp, name: data.file}};
    setDocsData(prevData => ({
      ...prevData,
      ...updateData,
    }));
  };

  const handleCountry = (item, index) => () => {
    setSelectedCountry(item.name);
    setCountryScrollingIndex(index);
    setSelectedCountryName(item.name);
    setValue(FormConstants.MailingCountry, item.name);
    setValue(FormConstants.Delivery, '');
    setSelectedDeliveryFee('');
    setIsCountryPicker(MapperConstants.StatusMapper.disable);
  };

  const handleDelivery = item => {
    const deliName = `DHL (${parseFloat(item.amount)} USD) - ${
      item.average_delivery_time_in_days
    } Days`;
    setSelectedDelivery('DHL');
    // setSelectedDeliveryID(item.pricings[0].id);
    // setSelectedDeliveryFee(parseFloat(item.pricings[0].price_in_usd));
    setValue(FormConstants.Delivery, deliName);
    trigger(FormConstants.Delivery);
    setShowDelivery(MapperConstants.StatusMapper.disable);
  };

  const handlePicker = value => {
    switch (value) {
      case 1:
        setIsCountryPicker(MapperConstants.StatusMapper.enable);
        break;
      case 2:
        setShowDelivery(MapperConstants.StatusMapper.enable);
        break;
      case 3:
        setOrderAsShow(MapperConstants.StatusMapper.enable);
        break;
      case 4:
        setWalletModelOpen(MapperConstants.StatusMapper.enable);
        break;
    }
  };

  const updateOrderAs = item => {
    setOrderAs(item.name);
    setOrderAsShow(false);
    setValue(FormConstants.OrderAS, item.name);
    trigger(FormConstants.OrderAS);
  };

  const handleWallet = (item, index) => () => {
    setWallet(item.symbol);

    console.log(item, 'filteredWallets');
    setWalletPayload(item);
    setWalletId(item.id);
    setWalletType(item.type);
    setWalletAmount(item.available);
    setWalletModelOpen(MapperConstants.StatusMapper.disable);
    setValue(FormConstants.Wallet, `${item.symbol} (${item.available})`);
    trigger(FormConstants.Wallet);
  };

  // const convertAmount = (value: any): any => {
  //   if (wallet === item.fiat_currency.symbol || wallet === 'USDG') {
  //     return value;
  //   } else {
  //     const res = fundsList.find(item => item.symbol === wallet);
  //     const total = value * item.fiat_currency.usd_value;
  //     const sum = total / res.currency.usd_value;
  //     return (sum / 10000).toFixed(8);
  //   }
  // };
  const conversionPercentage = 2;
  const convertAmount = amount => {
    const sourceCurrency = item.fiat_currency;
    if (item.fiat_currency.symbol === wallet) {
      return amount;
    }
    const res = fundsList.find(item => item.symbol === wallet);
    // console.log(sourceCurrency, 'data');
    const sourceCurrencyUSDValue = sourceCurrency.usd_value;
    const targetCurrencyUSDValue = res.currency.usd_value;
    console.log();
    const amountInUSD = sourceCurrencyUSDValue * amount;
    const feeMultiplier = 1 + conversionPercentage / 100;

    return (amountInUSD / targetCurrencyUSDValue) * feeMultiplier;
  };

  const convertUSDAmount = (value: any): any => {
    const res = fundsList.find(item => item.symbol === wallet);
    const total = value * 10000;
    const sum = total / res.currency.usd_value;
    return (sum / 10000).toFixed(8);
  };

  let data = [{name: ''}];
  const fullName = `${userProfileData?.kyc_record.first_name} ${
    userProfileData?.kyc_record.middle_name || ''
  } ${userProfileData?.kyc_record.last_name || ''}`.trim();
  if (userProfileData?.kyc_record) {
    data = [{name: fullName}];
  } else if (
    userProfileData?.kyc_record &&
    userProfileData?.is_business_account
  ) {
    data = [
      {name: fullName},
      {name: userProfileData.business_basic_information?.name},
    ];
  }

  const {cardRequestList} = useSelector((state: any) => state.paymentReducer);

  const GoSubmit = async data => {
    if (amount < parseFloat(item.minimum_first_deposit)) {
      showToast(
        '',
        `The minimun First deposit should be ${parseFloat(
          item.minimum_first_deposit,
        )} USD`,
        'error',
      );
      return false;
    }

    dispatch(AppActions.updateLoading(Loader.CARDS_REQUEST));
    const {stepone, steptwo} = cardRequestList;

    const payload = {
      wallet: walletPayload,
      card_type_id: stepone.card_type_id,
      card_type: stepone.card_type,
      title: stepone.title.toUpperCase(),
      date_of_birth: stepone.date_of_birth,
      // gender: stepone.gender.toUpperCase(),
      mobile_number: stepone.mobile_number.replace(/[^\d+]/g, ''),
      mobile: stepone.mobile,
      // marital_status: steptwo.marital_status.toUpperCase(),
      // emergency_contact_name: steptwo.emergency_contact_name,
      // emergency_contact_mobile_number:
      //   steptwo.emergency_contact_mobile_number.replace(/[^\d+]/g, ''),
      // emergency_contact_mobile: steptwo.emergency_contact_mobile,
      pay_with: {type: walletType, id: walletId},
      first_deposit: data.FirstDeposit,
      order_as: userProfileData?.is_business_account ? 'BUSINESS' : 'RETAIL',
    };

    if (['Retail BIN-named cards'].includes(item.card_type)) {
      payload.biometric_image = docsData.BiometricImage.tmp;
      payload.passport_image = docsData.PassportImage.tmp;
      payload.signature_image = docsData.SignatureImage.tmp;
      payload.selfie_image = docsData.PictureSelfieImage.tmp;
      payload.mailing_country = data.MailingCountry;
      payload.mailing_address = data.MailingAddress;
      payload.mailing_city = data.MailingCity;
      payload.mailing_postal_code = data.MailingPostalCode;
      payload.mailing_state = data.MailingState;
      payload.delivery_provider_id = deliID;
    }

    if (data.Voucher) {
      payload.voucher = data.Voucher;
    }
    console.log(payload, 'here');

    const response = await makeRequestNew(
      MapperConstants.ApiTypes.POST,
      `${APIConstants.CARDS_TYPE_REQUEST}`,
      {},
      payload,
    );

    console.log(response.data);

    if (response.status === 200) {
      dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
      showToast('Card', 'Successfully Submitted Card Request', 'success');
      reset();
      navigate(Screen.CardsLandingScreen, {});
    } else {
      dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
      if (response.data?.errors?.pay_with?.[0] === 'Insufficient Balance') {
        showToast('Card', 'Insufficient Balance', 'error');
      } else {
        showToast('Card', response.data.message, 'error');
      }
    }
  };

  return (
    <SafeAreaView
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      <Header title={'Order Card Form'} />

      <TabStep curStep={2} item={params.item} />

      <KeyboardAwareScrollView
        contentContainerStyle={[accountStyles.scrollView, {paddingBottom: 10}]}>
        <DismissKeyboardView>
          <StepThreeForm
            handleDocs={handleDocs}
            errors={errors}
            control={control}
            setValue={setValue}
            getValue={getValues}
            handlePicker={handlePicker}
            item={item}
            walletPayload={walletPayload}
            setAmount={setAmount}
            amount={amount}
            wallet={wallet}
            convertAmount={convertAmount}
            convertUSDAmount={convertUSDAmount}
            deliFeeNormal={selectedDeliveryFee}
          />
          <SelectCountry
            isVisible={isCountryPicker}
            setIsVisible={setIsCountryPicker}
            selectedCountry={selectedCountry}
            scrollingIndex={countryScrollingIndex}
            setScrollingIndex={setCountryScrollingIndex}
            handleCountry={handleCountry}
          />
          <SelectDelivery
            isVisible={showDelivery}
            setIsVisible={setShowDelivery}
            selectedRole={selectedDelivery}
            handleRole={handleDelivery}
            selectedCountry={selectedCountryName}
          />

          <SelectOrderAs
            data={data}
            isVisible={orderAsShow}
            setIsVisible={setOrderAsShow}
            updateOrderAS={updateOrderAs}
          />

          <SelectWallet
            CardTypeCurrency={item.fiat_currency.symbol}
            isVisible={isWalletModelOpen}
            setIsVisible={setWalletModelOpen}
            setCurrency={setWallet}
            updateToken={handleWallet}
          />
        </DismissKeyboardView>
      </KeyboardAwareScrollView>

      <View style={commonStyles.paddingHorizontalView}>
        <View style={commonStyles.rowView}>
          <View style={[commonStyles.halfWidth, {paddingEnd: 8}]}>
            <ThemeButton
              text={'Prev'}
              onClickHandler={() => {
                navigate(Screen.StepOneCardsTypeOrderScreen, {item});
              }}
              styleText={{textTransform: 'uppercase'}}
            />
          </View>
          <View style={commonStyles.halfWidth}>
            <ThemeButton
              text={'Submit'}
              onClickHandler={handleSubmit(GoSubmit)}
              styleText={{textTransform: 'uppercase'}}
              loading={appData.loading === Loader.CARDS_REQUEST ? true : false}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StepThreeView;
