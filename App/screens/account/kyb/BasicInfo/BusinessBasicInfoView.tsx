import React, {useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useForm} from 'react-hook-form';
import {commonStyles} from '../../../../globalstyles/styles';
import {
  DatePickerView,
  Header,
  ThemeButton,
  DismissKeyboardView,
} from '../../../../components';
import {navigate, ThemeFunctions} from '../../../../utils';
import {FormConstants, Loader, Screen} from '../../../../enums';
import {useDispatch, useSelector} from 'react-redux';
import {
  APIConstants,
  AppConstants,
  MapperConstants,
} from '../../../../constants';
import TabStep from '../TabStep';
import {accountStyles} from '../../styles';
import BasicInfoForm from './BasicInfoForm';
import {SelectCountry} from '../../../payments/common';
import SelectRole from './SelectRole';
import moment from 'moment';
import SelectIndustry from './SelectIndustry';
import {AppActions, KYBActions} from '../../../../store';
import {showToast} from '../../../../utils/GenericUtils';
import {makeRequestNew} from '../../../../services/ApiService';

const BusinessBasicInfoView = (props: any) => {
  const {
    navigation,
    route: {params},
  } = props;

  //   const {userProfileData} = useSelector((state: any) => state.appReducer);

  // for country
  const [isCountryPicker, setIsCountryPicker] = useState(
    MapperConstants.StatusMapper.disable,
  );
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [countryScrollingIndex, setCountryScrollingIndex] = useState(0);

  const [showRole, setShowRole] = useState(false);
  const [selectedRole, setSelectedRole] = useState();

  const [isUBOCountryPicker, setIsUBOCountryPicker] = useState(
    MapperConstants.StatusMapper.disable,
  );
  const [selectedUBOCountry, setSelectedUBOCountry] = useState(null);
  const [UBOCountryScrollingIndex, setUBOCountryScrollingIndex] = useState(0);

  const [isIndustryPicker, setIsIndustryPicker] = useState(
    MapperConstants.StatusMapper.disable,
  );
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [IndustryScrollingIndex, setIndustryScrollingIndex] = useState(0);

  const [showDate, setShowDate] = useState(false);
  const [regDate, setRegDate] = useState();

  const {appTheme} = useSelector((state: any) => state.globalReducer);
  const appData = useSelector((state: any) => state.appReducer);

  const {kybdata} = useSelector((state: any) => state.kybReducer);

  const {industries, countries} = useSelector((state: any) => state.appReducer);

  const dispatch = useDispatch<any>();

  const {
    control,
    formState: {errors},
    setValue,
    getValues,
    trigger,
    handleSubmit,
  } = useForm();

  useEffect(() => {
    if (Object.keys(kybdata.basicInfo).length > 0) {
      const role = AppConstants.roleOfOwner.find(
        val => val.label === kybdata.individual_business_role,
      );
      setSelectedRole(role?.value);
      setValue(
        FormConstants.RoleOfOwner,
        kybdata.basicInfo.individual_business_role,
      );
      trigger(FormConstants.RoleOfOwner);
      setValue(FormConstants.BusinessName, kybdata.basicInfo.name);
      trigger(FormConstants.BusinessName);
      setValue(
        FormConstants.RegisterationNo,
        kybdata.basicInfo.registration_number,
      );
      trigger(FormConstants.RegisterationNo);
      // console.log(countries);
      const Country = getCountryNameAndIndexByShortCode(
        kybdata.basicInfo.country_of_registration,
      );
      setSelectedCountry(Country.calling_code);
      setValue(FormConstants.Country, Country.countryName);
      setCountryScrollingIndex(Country.index + 1);
      trigger(FormConstants.Country);

      setValue(
        FormConstants.RegisterationDate,
        moment(kybdata.basicInfo.date_of_registration).format(
          AppConstants.dateFormat,
        ),
      );
      trigger(FormConstants.RegisterationDate);
      setRegDate(kybdata.basicInfo.date_of_registration);
      setValue(FormConstants.BusinessType, kybdata.basicInfo.type_of_business);
      trigger(FormConstants.BusinessType);
      const CountryUBO = getCountryNameAndIndexByShortCode(
        kybdata.basicInfo.country_of_residence_of_major_ubo,
      );
      setSelectedUBOCountry(CountryUBO.calling_code);
      setValue(FormConstants.CountryUBO, CountryUBO.countryName);
      setUBOCountryScrollingIndex(CountryUBO.index + 1);
      trigger(FormConstants.CountryUBO);

      const filterIndustry = industries.find(
        item => item.id === kybdata.basicInfo.industry,
      );
      setSelectedIndustry(kybdata.basicInfo.industry);
      setIndustryScrollingIndex(kybdata.basicInfo.industry);
      setValue(FormConstants.Industry, filterIndustry?.name);
      trigger(FormConstants.Industry);
    }
    dispatch(AppActions.getCountries());
    dispatch(AppActions.getIndustries());
  }, [kybdata.basicInfo]);

  const getCountryNameAndIndexByShortCode = shortCode => {
    const entries = Object.entries(countries.countries);
    const index = entries.findIndex(([key]) => key === shortCode);

    if (index !== -1) {
      const countryName = entries[index][1].name;
      const calling_code = entries[index][1].calling_code;
      return {index, countryName, calling_code};
    } else {
      return {index: -1, countryName: 'Country not found'};
    }
  };

  const handlePicker = value => {
    switch (value) {
      case 1:
        setShowRole(MapperConstants.StatusMapper.enable);
        break;
      case 2:
        setIsCountryPicker(MapperConstants.StatusMapper.enable);
        break;
      case 3:
        setShowDate(MapperConstants.StatusMapper.enable);
        break;
      case 4:
        setIsUBOCountryPicker(MapperConstants.StatusMapper.enable);
        break;
      case 5:
        setIsIndustryPicker(MapperConstants.StatusMapper.enable);
        break;
    }
  };

  const handleCountry = (item, index) => () => {
    setSelectedCountry(item.calling_code);
    setCountryScrollingIndex(index);
    setValue(FormConstants.Country, item.name);
    trigger(FormConstants.Country);
    setIsCountryPicker(MapperConstants.StatusMapper.disable);
  };

  const handleUBOCountry = (item, index) => () => {
    setSelectedUBOCountry(item.calling_code);
    setUBOCountryScrollingIndex(index);
    setValue(FormConstants.CountryUBO, item.name);
    trigger(FormConstants.CountryUBO);
    setIsUBOCountryPicker(MapperConstants.StatusMapper.disable);
  };

  const handleIndustry = (item, index) => () => {
    setSelectedIndustry(item.id);
    setIndustryScrollingIndex(item.id);
    setValue(FormConstants.Industry, item.name);
    trigger(FormConstants.Industry);
    setIsIndustryPicker(MapperConstants.StatusMapper.disable);
  };

  const handleRole = item => {
    // console.log(item);
    setSelectedRole(item.value);
    setValue(FormConstants.RoleOfOwner, item.label);
    trigger(FormConstants.RoleOfOwner);
    setShowRole(MapperConstants.StatusMapper.disable);
  };

  const checkIfSameDate = dateToCheck => {
    // Get today's date in 'YYYY-MM-DD' format
    const today = new Date();
    const todayDate = today.toISOString().split('T')[0];

    // Extract the 'YYYY-MM-DD' part from the given date
    const givenDate = new Date(dateToCheck).toISOString().split('T')[0];

    // Compare both dates and return an error message if they match
    if (givenDate === todayDate) {
      return true;
    } else {
      return false;
    }
  };

  const handleDate = selectedDate => {
    const res = checkIfSameDate(selectedDate);

    if (!res) {
      setValue(
        FormConstants.RegisterationDate,
        moment(selectedDate).format(AppConstants.dateFormat),
      );

      trigger(FormConstants.RegisterationDate);
    } else {
      showToast('', 'Please choose a date before this day', 'error');
    }
    setShowDate(false);
    setRegDate(selectedDate);
  };

  const findCountryByName = searchName => {
    return Object.entries(countries?.countries).find(
      ([key, country]) => country.name === searchName,
    );
  };

  const nextStep = async data => {
    // dispatch(KYBActions.resetToInitial());
    const country = findCountryByName(data.country);
    const countryUBO = findCountryByName(data.CountryUBO);
    let code = '';
    let codeUBO = '';

    if (country) {
      const [countryCode, countryData] = country;

      code = countryCode;
    }

    if (countryUBO) {
      const [countryCode, countryData] = countryUBO;

      codeUBO = countryCode;
    }

    const payload = {
      individual_business_role: data.role_of_owner,
      name: data.business_name,
      registration_number: data.companyNo,
      country_of_registration: code,
      date_of_registration: regDate,
      type_of_business: data.type_of_business,
      country_of_residence_of_major_ubo: codeUBO,
      industry: selectedIndustry,
      step: 0,
    };

    dispatch(AppActions.updateLoading(Loader.KYB_VERIFICATION));

    const response = await makeRequestNew(
      MapperConstants.ApiTypes.POST,
      `${APIConstants.VALIDATE_KYB}/0`,
      {},
      payload,
    );

    if (response.status === 200) {
      dispatch(KYBActions.KYBFormData(payload));
      dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
      navigation.push(Screen.BusinessCompanyDocuments);
    }
  };

  return (
    <SafeAreaView
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      <Header
        title={'Basic Information'}
        handleBack={() => navigate(Screen.Home, {})}
      />

      <TabStep curStep={0} />

      <KeyboardAwareScrollView
        contentContainerStyle={[accountStyles.scrollView, {paddingBottom: 10}]}>
        <DismissKeyboardView>
          <BasicInfoForm
            control={control}
            setValue={setValue}
            errors={errors}
            kybdata={kybdata}
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

          <SelectCountry
            isVisible={isCountryPicker}
            setIsVisible={setIsCountryPicker}
            selectedCountry={selectedCountry}
            scrollingIndex={countryScrollingIndex}
            setScrollingIndex={setCountryScrollingIndex}
            handleCountry={handleCountry}
          />
          <SelectCountry
            isVisible={isUBOCountryPicker}
            setIsVisible={setIsUBOCountryPicker}
            selectedCountry={selectedUBOCountry}
            scrollingIndex={UBOCountryScrollingIndex}
            setScrollingIndex={setUBOCountryScrollingIndex}
            handleCountry={handleUBOCountry}
          />
          <SelectIndustry
            isVisible={isIndustryPicker}
            setIsVisible={setIsIndustryPicker}
            selectedIndustry={selectedIndustry}
            scrollingIndex={IndustryScrollingIndex}
            setScrollingIndex={setIndustryScrollingIndex}
            handleIndustry={handleIndustry}
          />
          <SelectRole
            isVisible={showRole}
            setIsVisible={setShowRole}
            selectedRole={selectedRole}
            handleRole={handleRole}
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

export default BusinessBasicInfoView;
