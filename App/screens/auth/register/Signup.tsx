import React, {useEffect, useState} from 'react';
import {WebView} from 'react-native-webview';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {commonStyles} from '../../../globalstyles/styles';
import {
  Background,
  DismissKeyboardView,
  Header,
  ThemeButton,
} from '../../../components';
import {accountStyles as styles} from '../../account/styles';
import {strings} from '../../../strings';
import {useForm} from 'react-hook-form';
import SignupForm from './SignupForm';
import {authStyles} from '../style';
import Navigation from '../../../utils/Navigation';
import {FormConstants, Loader, Screen} from '../../../enums';
import VerifyEmailModal from './VerifyEmailModal';
import {showToast} from '../../../utils/GenericUtils';
import {useDispatch, useSelector} from 'react-redux';
import {AppActions, AuthActions} from '../../../store';
import {AppFunctions, ThemeFunctions} from '../../../utils';
import {MapperConstants} from '../../../constants';
import SelectCountry from './SelectCountry';
import SelectLivingCountry from './SelectLivingCountry';
import GoogleReCaptcha from '../GoogleReCaptcha';
import {CurrentConfig} from '../../../../api_config';

const Signup = (props: any) => {
  const {
    control,
    formState: {errors},
    setValue,
    handleSubmit,
    reset,
  } = useForm();
  const dispatch = useDispatch<any>();
  const [verifyEmailPopupVisible, setVerifyEmailPopupVisible] = useState(false);
  const [agree, setAgree] = useState(false);
  const authData = useSelector((state: any) => state.authReducer);
  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer);

  useEffect(() => {
    let referralCode = props?.route?.params?.referralCode;

    if (referralCode) {
      setValue(FormConstants.RefCode, referralCode);
    }
    dispatch(AppActions.getCountries());
  }, []);

  useEffect(() => {
    if (Object.keys(authData.registerUserData).length > 0) {
      setVerifyEmailPopupVisible(true);
    }
  }, [authData.registerUserData]);

  const handleNavigation = (screen: any) => () => {
    Navigation.navigate(screen, {});
  };

  const onVerifyEmailOkClicked = () => {
    dispatch(AuthActions.registerSuccess({registerUserData: {}}));
    Navigation.reset(Screen.Auth);
    reset();
    setVerifyEmailPopupVisible(false);
  };

  const [needRecaptcha, setNeedRecaptcha] = useState(false);
  const [gtoken, setGtoken] = useState();

  // for nationality
  const [isCountryPicker, setIsCountryPicker] = useState(
    MapperConstants.StatusMapper.disable,
  );
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [countryScrollingIndex, setCountryScrollingIndex] = useState(0);

  // for country where you live
  const [showLiving, setShowLiving] = useState(
    MapperConstants.StatusMapper.disable,
  );
  const [selectedLivingCountry, setSelectedLivingCountry] = useState<any>(null);
  const [livingCountryScrollingIndex, setLivingCountryScrollingIndex] =
    useState(0);

  // for nationality
  const handleCountry = (item, index) => () => {
    setSelectedCountry(item.iso_3166_1_alpha2);
    setCountryScrollingIndex(index);
    setValue(FormConstants.Nationality, item.name);
    setIsCountryPicker(MapperConstants.StatusMapper.disable);
  };

  // for country where you live
  const handleLivingCountry = (item, index) => () => {
    setSelectedLivingCountry(item.iso_3166_1_alpha2);
    setLivingCountryScrollingIndex(index);
    setValue(FormConstants.Country, item.name);
    setShowLiving(MapperConstants.StatusMapper.disable);
  };

  const handlePicker = (value: any) => () => {
    switch (value) {
      case 1:
        setIsCountryPicker(MapperConstants.StatusMapper.enable);
        break;
      case 2:
        setShowLiving(MapperConstants.StatusMapper.enable);
        break;
    }
  };

  const onCreateAccountClicked = data => {
    if (data.password !== data.confirmPassword) {
      showToast(
        strings('register'),
        strings('confirm_password_not_matched'),
        'error',
      );
      return;
    }
    if (!agree) {
      showToast(
        strings('register'),
        strings('You must agree to the terms of service'),
        'info',
      );
      return;
    }

    setNeedRecaptcha(true);

    const payload = {
      name: '',
      email: data.email,
      nationality: selectedCountry.toLowerCase(),
      country_of_residence: selectedLivingCountry.toLowerCase(),
      password: data.password,
      password_confirmation: data.confirmPassword,
      g_recaptcha_response: gtoken,
      refcode: data.referral_code || '',
    };

    dispatch(AuthActions.registerUser(payload));
  };

  return (
    <SafeAreaView
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      {/* <Background imagePath={Images.BgLogin} /> */}
      <Header title={strings('register')} />

      <ScrollView contentContainerStyle={styles.scrollView}>
        <DismissKeyboardView>
          <SignupForm
            control={control}
            setValue={setValue}
            errors={errors}
            agree={agree}
            setAgree={setAgree}
            handlePicker={handlePicker}
          />
          <SelectCountry
            isVisible={isCountryPicker}
            setIsVisible={setIsCountryPicker}
            selectedCountry={selectedCountry}
            scrollingIndex={countryScrollingIndex}
            setScrollingIndex={setCountryScrollingIndex}
            handleCountry={handleCountry}
          />
          <SelectLivingCountry
            isVisible={showLiving}
            setIsVisible={setShowLiving}
            selectedCountry={selectedLivingCountry}
            scrollingIndex={livingCountryScrollingIndex}
            setScrollingIndex={setLivingCountryScrollingIndex}
            handleCountry={handleLivingCountry}
          />
          <GoogleReCaptcha
            baseURL={CurrentConfig.base_url}
            needRecaptcha={needRecaptcha}
            setNeedRecaptcha={setNeedRecaptcha}
            getToken={data => setGtoken(data)}
          />
        </DismissKeyboardView>
      </ScrollView>
      <View style={commonStyles.paddingHorizontalView}>
        <ThemeButton
          text="create_account"
          onClickHandler={handleSubmit(onCreateAccountClicked)}
          loading={authData.loading === Loader.REGISTERATION_PROCESSED}
        />
        <TouchableOpacity onPress={handleNavigation(Screen.Login)}>
          <Text
            style={[
              authStyles.textReg,
              {color: ThemeFunctions.getColor(appColor)},
            ]}>
            {strings('login_text')}
          </Text>
        </TouchableOpacity>
      </View>
      <VerifyEmailModal
        isVisible={verifyEmailPopupVisible}
        closeClicked={() => {
          setVerifyEmailPopupVisible(!verifyEmailPopupVisible);
          reset();
        }}
        okClicked={onVerifyEmailOkClicked}
      />
    </SafeAreaView>
  );
};

export default Signup;
