import React, {useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useForm} from 'react-hook-form';
import {commonStyles} from '../../../../../globalstyles/styles';
import {
  DatePickerView,
  Header,
  ThemeButton,
  DismissKeyboardView,
} from '../../../../../components';
import {reset, ThemeFunctions} from '../../../../../utils';
import {FormConstants, Loader, Screen} from '../../../../../enums';
import {useDispatch, useSelector} from 'react-redux';
import {
  APIConstants,
  AppConstants,
  MapperConstants,
} from '../../../../../constants';
import TabStep from '../TabStep';
import {accountStyles} from '../../../../account/styles';
import StepOneForm from './StepOneForm';
import {SelectCountry} from '../../../../payments/common';
import SelectTitle from './SelectTitle';
import SelectGender from './SelectGender';
import moment from 'moment';
import SelectCountryCode from './SelectCountryCode';
import {PaymentActions, QuickBuyActions} from '../../../../../store';

const StepOneView = (props: any) => {
  const {
    navigation,
    route: {params},
  } = props;

  const [showTitle, setShowTitle] = useState(false);
  const [showGender, setShowGender] = useState(false);
  const [selectedRole, setSelectedRole] = useState();
  const [selectGender, setSelectGender] = useState();

  const [showCountryCode, setShowCountryCode] = useState(false);
  const [countryCode, setCountryCode] = useState(false);

  const [showDate, setShowDate] = useState(false);
  const [regDate, setRegDate] = useState(new Date(2000, 0, 1));

  const {appTheme, userdata} = useSelector((state: any) => state.globalReducer);

  const appData = useSelector((state: any) => state.appReducer);
  const {cardRequestList} = useSelector((state: any) => state.paymentReducer);

  const dispatch = useDispatch<any>();

  // console.log(userdata.kyc_record);

  const {
    control,
    formState: {errors},
    setValue,
    getValues,
    trigger,
    handleSubmit,
  } = useForm();

  useEffect(() => {
    dispatch(PaymentActions.getDeliveryList());
    dispatch(QuickBuyActions.getPairs());
    const item = params.item;
    if (item) {
      setValue(FormConstants.CardType, item.name);
      setValue(FormConstants.FirstName, userdata.kyc_record.first_name);
      setValue(FormConstants.LastName, userdata.kyc_record.last_name);
      setValue(FormConstants.Email, userdata.email);
    }
    // if (cardRequestList.stepone) {
    //   const value = cardRequestList.stepone;
    //   console.log(value);
    //   setValue(FormConstants.Title, value.title);
    //   setValue(FormConstants.Gender, value.gender);
    //   setValue(FormConstants.DOB, value.date_of_birth);
    // }
    // console.log(cardRequestList.stepone);
  }, [params.item, cardRequestList.stepone]);

  const handlePicker = value => {
    switch (value) {
      case 1:
        setShowTitle(MapperConstants.StatusMapper.enable);
        break;
      case 2:
        setShowGender(MapperConstants.StatusMapper.enable);
        break;
      case 3:
        setShowDate(MapperConstants.StatusMapper.enable);
        break;
      case 4:
        setShowCountryCode(MapperConstants.StatusMapper.enable);
        break;
    }
  };

  const handleTitle = item => {
    // console.log(item);
    setSelectedRole(item.label);
    setValue(FormConstants.Title, item.label);
    trigger(FormConstants.Title);
    setShowTitle(MapperConstants.StatusMapper.disable);
  };

  const handleGender = item => {
    setSelectGender(item.label);
    setValue(FormConstants.Gender, item.label);
    trigger(FormConstants.Gender);
    setShowGender(MapperConstants.StatusMapper.disable);
  };

  const handleDate = selectedDate => {
    setValue(
      FormConstants.DOB,
      moment(selectedDate).format(AppConstants.dateFormat),
    );

    trigger(FormConstants.DOB);
    setShowDate(false);
    setRegDate(selectedDate);
  };

  const covertEmoji = item => {
    // console.log(unicodeString);
    const unicodeString = JSON.stringify(item);
    const emoji = JSON.parse(unicodeString);
    return emoji;
  };

  const handleCountryCode = item => {
    setCountryCode(item.value);
    setValue(
      FormConstants.CountryCode,
      `${item.value}  ${covertEmoji(item.emoji)}`,
    );
    trigger(FormConstants.CountryCode);
    setShowCountryCode(false);
  };

  const nextStep = async data => {
    // dispatch(KYBActions.resetToInitial());

    const item = params.item;
    const payload = {
      step: 0,
      card_type_id: item.id,
      card_type: item.name,
      title: data.Title,
      // date_of_birth: data.dob.replace(/-/g, '/'),
      gender: data.gender,
      mobile_number: `${data.mobile_isd}${data.mobile_no}`,
      mobile: data.mobile_no,
    };

    dispatch(PaymentActions.cardTypeRequestData(payload));
    navigation.push(Screen.StepThreeCardsTypeOrderScreen, {item});
  };

  return (
    <SafeAreaView
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      <Header
        handleBack={() => {
          dispatch(PaymentActions.resetToInitial());
          reset(Screen.Home);
        }}
        showClose={true}
        title={'Order Card Form'}
      />

      <TabStep curStep={0} item={params.item} />

      <KeyboardAwareScrollView
        contentContainerStyle={[
          accountStyles.scrollView,
          {paddingBottom: 10, paddingTop: 0},
        ]}>
        <DismissKeyboardView>
          <StepOneForm
            control={control}
            setValue={setValue}
            errors={errors}
            handlePicker={handlePicker}
          />

          <DatePickerView
            isDatePickerVisible={showDate}
            date={regDate}
            options={{
              // minimumDate: new Date(),
              type: 'expiryDate',
            }}
            onChange={handleDate}
            hideDatePicker={() => setShowDate(false)}
          />

          <SelectTitle
            isVisible={showTitle}
            setIsVisible={setShowTitle}
            selectedRole={selectedRole}
            handleRole={handleTitle}
          />
          <SelectGender
            isVisible={showGender}
            setIsVisible={setShowGender}
            selectedRole={selectGender}
            handleRole={handleGender}
          />
          <SelectCountryCode
            isVisible={showCountryCode}
            setIsVisible={setShowCountryCode}
            selectedCountryCode={countryCode}
            handleCountryCode={handleCountryCode}
            covertEmoji={covertEmoji}
          />
        </DismissKeyboardView>
      </KeyboardAwareScrollView>

      <View style={commonStyles.paddingHorizontalView}>
        <ThemeButton
          text={'Next'}
          onClickHandler={handleSubmit(nextStep)}
          styleText={{textTransform: 'uppercase'}}
          loading={appData.loading === Loader.KYB_VERIFICATION ? true : false}
        />
      </View>
    </SafeAreaView>
  );
};

export default StepOneView;
