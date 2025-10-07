import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {commonStyles} from '../../../globalstyles/styles';
import {DismissKeyboardView, Header, ThemeButton} from '../../../components';
import {strings} from '../../../strings';
import {useForm} from 'react-hook-form';
import EditProfileForm from './EditProfileForm';
import {useDispatch, useSelector} from 'react-redux';
import {AppActions} from '../../../store';
import {FormConstants, Loader} from '../../../enums';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ThemeFunctions} from '../../../utils';
import {SelectCountry} from '../../payments/common';
import {MapperConstants} from '../../../constants';
import SelectPhoneCode from './SelectPhoneCode';
const EditProfile = (props: any) => {
  const {
    control,
    formState: {errors},
    setValue,
    getValues,
    handleSubmit,
  } = useForm();
  const [isMinorAccount, setMinorAccount] = useState(false);
  const dispatch = useDispatch<any>();
  // const [countryCodeData, setCountryCodeData] = useState('')
  const appData = useSelector((state: any) => state.appReducer);
  const {appTheme} = useSelector((state: any) => state.globalReducer);
  // for country
  const [isCountryPicker, setIsCountryPicker] = useState(
    MapperConstants.StatusMapper.disable,
  );
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [countryScrollingIndex, setCountryScrollingIndex] = useState(0);

  // for phone code
  const [isCodePicker, setIsCodePicker] = useState(
    MapperConstants.StatusMapper.disable,
  );
  const [selectedCode, setSelectedCode] = useState<any>(null);
  const [codeScrollingIndex, setCodeScrollingIndex] = useState(0);

  // const getCountryId = () => {
  //   const data = getValues()
  //   return appData.countries.find(res => res.name === data.country).uniqueId
  // }

  // for country
  const handleCountry = (item, index) => () => {
    setSelectedCountry(item.uniqueId);
    setCountryScrollingIndex(index);
    setValue(FormConstants.Country, item.name);
    setIsCountryPicker(MapperConstants.StatusMapper.disable);
  };

  const handleCode = (item, index) => () => {
    setSelectedCode(item.uniqueId);
    setCodeScrollingIndex(index);
    setValue(FormConstants.CountryCode, '+' + item.phoneCode);
    setIsCodePicker(MapperConstants.StatusMapper.disable);
  };
  const onSaveClicked = data => {
    let requestObject = {
      ...data,
      firstName: data.first_name,
      lastName: data.last_name,
      mobile_isd: data.mobile_isd.replace('+', '').trim(),
      address: data.street_address,
      isMinor: isMinorAccount,
      country_id: selectedCountry,
      // country_id: getCountryId(),
      // profile_image:'',
    };
    delete requestObject.first_name;
    delete requestObject.last_name;
    delete requestObject.street_address;
    delete requestObject.name;
    delete requestObject.email;
    dispatch(AppActions.updateUserProfile(requestObject));
  };
  const handlePicker = (value: any) => () => {
    switch (value) {
      case 1:
        setIsCountryPicker(MapperConstants.StatusMapper.enable);
        break;
      case 2:
        setIsCodePicker(MapperConstants.StatusMapper.enable);
        break;
    }
  };

  return (
    <SafeAreaView
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      {/* <Background imagePath={Images.BgLogin} /> */}
      <Header title={strings('edit_profile')} />
      <KeyboardAwareScrollView
        contentContainerStyle={[
          commonStyles.paddingHorizontalView,
          {paddingBottom: 20},
        ]}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={34}>
        <DismissKeyboardView>
          <EditProfileForm
            control={control}
            setValue={setValue}
            handlePicker={handlePicker}
            errors={errors}
            isMinorAccount={isMinorAccount}
            setMinorAccount={setMinorAccount}
            getValues={getValues}
            // setCountryCodeData={setCountryCodeData}
            setSelectedCountry={setSelectedCountry}
            setCountryScrollingIndex={setCountryScrollingIndex}
            setCodeScrollingIndex={setCodeScrollingIndex}
            setSelectedCode={setSelectedCode}
          />
          <SelectCountry
            isVisible={isCountryPicker}
            setIsVisible={setIsCountryPicker}
            selectedCountry={selectedCountry}
            scrollingIndex={countryScrollingIndex}
            setScrollingIndex={setCountryScrollingIndex}
            handleCountry={handleCountry}
          />
          <SelectPhoneCode
            isVisible={isCodePicker}
            setIsVisible={setIsCodePicker}
            selectedCountry={selectedCode}
            scrollingIndex={codeScrollingIndex}
            setScrollingIndex={setCodeScrollingIndex}
            handleCountry={handleCode}
          />
        </DismissKeyboardView>
      </KeyboardAwareScrollView>
      <View style={commonStyles.paddingHorizontalView}>
        <ThemeButton
          text="save"
          onClickHandler={handleSubmit(onSaveClicked)}
          loading={
            appData.loading === Loader.UPDATE_USER_PROFILE ? true : false
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
