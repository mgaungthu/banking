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
import {navigate, ThemeFunctions} from '../../../../../utils';
import {FormConstants, Loader, Screen} from '../../../../../enums';
import {useDispatch, useSelector} from 'react-redux';
import {
  APIConstants,
  AppConstants,
  MapperConstants,
} from '../../../../../constants';
import TabStep from '../TabStep';
import {accountStyles} from '../../../../account/styles';
import StepTwoForm from './StepTwoForm';
import SelectMaritalStatus from './SelectMaritalStatus';
import moment from 'moment';
import SelectCountryCode from './SelectCountryCode';
import {PaymentActions} from '../../../../../store';

const StepTwoView = (props: any) => {
  const {
    navigation,
    route: {params},
  } = props;

  const [showMaritalStatus, setShowMaritalStatus] = useState(false);
  const [selectMartialStatus, setselectMartialStatus] = useState();

  const [showCountryCode, setShowCountryCode] = useState(false);
  const [countryCode, setCountryCode] = useState(false);

  const {appTheme, userdata} = useSelector((state: any) => state.globalReducer);

  const appData = useSelector((state: any) => state.appReducer);

  const dispatch = useDispatch();

  const {
    control,
    formState: {errors},
    setValue,
    getValues,
    trigger,
    handleSubmit,
  } = useForm();

  useEffect(() => {
    setValue(
      FormConstants.StreetAddress,
      userdata.address_record?.street_address,
    );
    setValue(FormConstants.City, userdata.address_record?.city);
    setValue(FormConstants.State, userdata.address_record?.state);
    setValue(FormConstants.PostalCode, userdata.address_record?.postal_code);
    setValue(FormConstants.Country, userdata.country_of_residence);
    setValue(FormConstants.Nationality, userdata.nationality);
    // setValue(FormConstants.FirstName, userdata.kyc_record.first_name);
    // setValue(FormConstants.LastName, userdata.kyc_record.last_name);
    // setValue(FormConstants.Email, userdata.email);
  }, [userdata]);

  const handlePicker = value => {
    switch (value) {
      case 1:
        setShowMaritalStatus(MapperConstants.StatusMapper.enable);
        break;
      case 2:
        setShowCountryCode(MapperConstants.StatusMapper.enable);
        break;
    }
  };

  const handleMaritalStatus = item => {
    setselectMartialStatus(item.label);
    setValue(FormConstants.MaritalStatus, item.label);
    setShowMaritalStatus(MapperConstants.StatusMapper.disable);
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
    const item = params.item;
    const payload = {
      step: 1,
      emergency_contact_name: data.EmergencyContactName,
      emergency_contact_mobile_number: `${data.mobile_isd}${data.mobile_no}`,
      emergency_contact_mobile: data.mobile_no,
      marital_status: data.MaritalStatus,
    };
    // console.log(payload);
    dispatch(PaymentActions.cardTypeRequestData(payload));
    navigation.push(Screen.StepThreeCardsTypeOrderScreen, {item});
  };

  const item = params.item;

  return (
    <SafeAreaView
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      <Header title={'Order Card Form'} />

      <TabStep curStep={1} item={params.item} />

      <KeyboardAwareScrollView
        contentContainerStyle={[
          accountStyles.scrollView,
          {paddingBottom: 10, paddingTop: 0},
        ]}>
        <DismissKeyboardView>
          <StepTwoForm
            control={control}
            setValue={setValue}
            errors={errors}
            handlePicker={handlePicker}
          />

          <SelectMaritalStatus
            isVisible={showMaritalStatus}
            setIsVisible={setShowMaritalStatus}
            selectedRole={selectMartialStatus}
            handleRole={handleMaritalStatus}
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
              text={'Next'}
              onClickHandler={handleSubmit(nextStep)}
              styleText={{textTransform: 'uppercase'}}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StepTwoView;
