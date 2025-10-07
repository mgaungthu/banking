import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  Button,
} from 'react-native';
import {useForm} from 'react-hook-form';

import {commonStyles} from '../../globalstyles/styles';
import * as Images from '../../assets';
import {
  DismissKeyboardView,
  ImageContainer,
  Space,
  ThemeButton,
} from '../../components';
import LoginForm from './LoginForm';
import {AppColor, Loader, Screen} from '../../enums';
import {DefaultArray, MapperConstants} from '../../constants';
import VerificationProcess from './VerificationProcess';
import BackgroundTimer from 'react-native-background-timer';
import {useDispatch, useSelector} from 'react-redux';
import {AppActions, AuthActions, GlobalActions} from '../../store';
import {getItem, ThemeFunctions} from '../../utils';
import {strings} from '../../strings';
import {authStyles} from './style';
import Navigation from '../../utils/Navigation';
import {LoginFields} from '../../components';
import {useTranslation} from 'react-i18next';
import {Icon} from 'react-native-elements';
import NavigationService from '../../utils/Navigation';
import {showToast} from '../../utils/GenericUtils';
import {CurrentConfig} from '../../../api_config';
import GoogleReCaptcha from './GoogleReCaptcha';
import {axiosInstance} from '../../services/AxiosOrder';
import InfoModal from './InfoModal';

const Login = (props: any) => {
  const {navigation} = props;
  const [isVisible, setIsVisible] = useState(
    MapperConstants.StatusMapper.disable,
  );
  const [socketToken, setSocketTokenId] = useState<any>('');
  const [verficationStep, setVerificationStep] = useState(
    MapperConstants.Steps.first,
  );
  const [editable, setEditable] = React.useState(false);
  const [timerCount, setTimerCount] = useState(60);
  const [resendActive, setResendActive] = useState(
    MapperConstants.StatusMapper.enable,
  );
  const {i18n} = useTranslation();
  const selectedLngCode = i18n.language;
  const [selectedLanguage, setSelectedLanguage] = useState(
    DefaultArray.languages[0],
  );
  const [needRecaptcha, setNeedRecaptcha] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [baseURL, setBaseURL] = useState(CurrentConfig.base_url);
  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer);
  const [isModalVisible, setModalVisible] = React.useState(false);

  useEffect(() => {
   const filteredLanguage = DefaultArray.languageArray.find(
  res => res.value === selectedLngCode,
  )!;
  setSelectedLanguage(filteredLanguage);
  }, []);

  useEffect(() => {
    dispatch(AppActions.getCountries());
    setTimeout(() => {
      setEditable(true);
    }, 100);
  }, []);

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm();

  const dispatch = useDispatch<any>();
  const authData = useSelector((state: any) => state.authReducer);

  useEffect(() => {
    if (authData.loginType === Loader.LOGIN_SUCCESS) {
      NavigationService.reset(Screen.BioAuthNavigator);
    }
    // initializeCaptcha();
  }, [authData.loginType]);

  const onSubmit = async (data: any) => {
    const payload = data;

    if (recaptchaToken) {
      payload.g_recaptcha_response = recaptchaToken;
    }

    Keyboard.dismiss();
    setResendActive(MapperConstants.StatusMapper.enable);
    const res = await dispatch(AuthActions.login(payload));

    if (res === 'ga') {
      setIsVisible(true);
    } else if (res === 'recaptcha') {
      // onExecute();
      showToast('', 'Invalid Email or Password!', 'error');
      setNeedRecaptcha(true);
    } else if (res === 'user_region_not_allowed') {
      console.log(res);
      setModalVisible(true);
    }
  };

  const updateTimerCount = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      setTimerCount(prevState => (prevState > 0 ? prevState - 1 : prevState));
    }, 1000);
    return () => {
      resetTimer();
    };
  };

  const resetTimer = () => {
    BackgroundTimer.stopBackgroundTimer();
    setTimerCount(60);
  };

  const onRegisterClicked = () => {
    Navigation.navigate(Screen.Signup, {});
  };

  const onForgotPasswordClicked = () => {
    Navigation.navigate(Screen.ForgotPasswordEnterEmail, {});
  };

  const textClickStyle = [
    authStyles.linkText,
    commonStyles.textUnderline,
    {color: ThemeFunctions.getColor(appColor)},
  ];

  const _getLogo = () => {
    switch (appColor) {
      case AppColor.pink:
        return Images.logo_pink;
      case AppColor.green:
        return Images.logo_green;
    }
    return Images.logo_black;
  };

  // const region = getItem('Region');

  // region.then(res => {
  //   console.log(res);
  //   const replaceAPIurl = res.url;
  //   axiosInstance.defaults.baseURL = replaceAPIurl + '/api/v1';
  //   setBaseURL(replaceAPIurl);
  // });

  return (
    <SafeAreaView
      style={[commonStyles.safeView, ThemeFunctions.setBackground(appTheme)]}>
      <LoginFields>
        <DismissKeyboardView>
          <>
            <TouchableOpacity
              style={authStyles.languagePicker}
              onPress={() =>
                Navigation.navigate(Screen.SelectLanguage, {
                  fromScreen: 'login',
                })
              }>
              <Text
                style={[
                  authStyles.language,
                  {color: ThemeFunctions.customText(appTheme)},
                ]}>
                {selectedLanguage?.name}
              </Text>
              <Icon
                name="keyboard-arrow-down"
                type="material"
                color={ThemeFunctions.customText(appTheme)}
                size={25}
                style={{marginTop: 2}}
              />
            </TouchableOpacity>
            <ImageContainer
              imagePath={_getLogo()}
              imgStyle={commonStyles.logo}
              noTransform={true}
            />

            <LoginForm control={control} errors={errors} editable={editable} />

            <GoogleReCaptcha
              needRecaptcha={needRecaptcha}
              setNeedRecaptcha={setNeedRecaptcha}
              baseURL={baseURL}
              getToken={data => {
                // console.log(data, 'token');
                setRecaptchaToken(data);
              }}
            />
          </>
          <View style={commonStyles.paddingHorizontalView}>
            <View
              style={[commonStyles.justifyCenter, commonStyles.generalPadding]}>
              <Text onPress={onForgotPasswordClicked} style={textClickStyle}>
                {strings('forgot_password')}
              </Text>
            </View>
          </View>
        </DismissKeyboardView>
      </LoginFields>
      <View style={commonStyles.paddingHorizontalView}>
        <ThemeButton
          text="login"
          onClickHandler={handleSubmit(onSubmit)}
          loading={authData.loading === Loader.LOGIN_PROCESSED}
          testID="LoginButton"
        />
        <TouchableOpacity onPress={onRegisterClicked}>
          <Text
            style={[
              authStyles.textReg,
              {color: ThemeFunctions.getColor(appColor)},
            ]}>
            {strings('reg_text')}
          </Text>
        </TouchableOpacity>
      </View>
      <VerificationProcess
        verficationStep={verficationStep}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        setVerificationStep={setVerificationStep}
        timerCount={timerCount}
        setTimerCount={setTimerCount}
        resendActive={resendActive}
        setResendActive={setResendActive}
        resetTimer={resetTimer}
        userData={getValues()}
        socketToken={socketToken}
        setSocketTokenId={setSocketTokenId}
        updateTimerCount={updateTimerCount}
        navigation={navigation}
        appTheme={appTheme}
      />
      <InfoModal setIsVisible={setModalVisible} isVisible={isModalVisible} />
    </SafeAreaView>
  );
};

export default Login;
