import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Keyboard} from 'react-native';
import {useForm} from 'react-hook-form';
import {verificationStyles as styles} from './style';
import {Input, ThemeButton, CustomModal, ThemeText} from '../../components';
import {FormConstants, Loader, ReturnKeyTypes, Screen} from '../../enums';
import {strings} from '../../strings';
import {
  GenericFunctions,
  RegexExpression,
  ThemeFunctions,
  deviceInfo,
  deviceName,
  setItem,
} from '../../utils';
import {Icon} from 'react-native-elements';
import {MapperConstants, APIConstants} from '../../constants';
import {convertToFormdata, showToast} from '../../utils/GenericUtils';
import {makeRequest, makeRequestNew} from '../../services/ApiService';
import {useDispatch, useSelector} from 'react-redux';
import {AuthActions, GlobalActions} from '../../store';
import NavigationService from '../../utils/Navigation';
import Toast from 'react-native-toast-message';
import {getAccessToken, handleAxiosToken} from '../../services/AxiosOrder';
import {isIOS} from '../../utils/DeviceConfig';
import messaging from '@react-native-firebase/messaging';
import Colors, {lightTheme, themeColor} from '../../theme/Colors';
import {CurrentConfig} from '../../../api_config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  loginSuccess,
  updateLoginResponse,
} from '../../store/action/auth/AuthAction';

const VerificationProcess = ({
  isVisible,
  verficationStep,
  setIsVisible,
  setVerificationStep,
  timerCount,
  setTimerCount,
  resendActive,
  setResendActive,
  resetTimer,
  userData,
  socketToken,
  setSocketTokenId,
  updateTimerCount,
  appTheme,
  ...props
}: any) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm();

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const {isRtlApproach} = useSelector((state: any) => state.globalReducer);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        setKeyboardHeight(e.endCoordinates.height);
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const [loading, setLoading] = useState<any>(
    MapperConstants.StatusMapper.disable,
  );
  const [error, setError] = useState(false);

  const dispatch = useDispatch<any>();
  const modalToastRef = React.useRef() as any;
  const [isToast, setIsToast] = useState(false);

  useEffect(() => {
    hideError();
  }, [error]);

  const hideError = () => {
    setTimeout(() => {
      setError(false);
    }, 2000);
  };

  const addTokenFCM = async () => {
    const tokenFCM = await messaging().getToken();
    makeRequest(
      MapperConstants.ApiTypes.POST,
      APIConstants.ADD_DEVICE_FCM,
      {},
      {tokenDevice: tokenFCM},
    );
  };

  const onSubmit = async data => {
    const accessToken = await getAccessToken();
    const tokenExpiry = await AsyncStorage.getItem('tokenExpiry');
    console.log(accessToken, tokenExpiry);
    // console.log(data);
    setLoading(true);
    const response = await makeRequestNew(
      MapperConstants.ApiTypes.POST,
      APIConstants.TWO_FA_VERIFY,
      {},
      {otp: data.otp},
    );
    if (response.status === 200) {
      let payload = {};

      payload.isMobileLogin = MapperConstants.StatusMapper.enable;
      payload.osVersion = deviceInfo().osVersion;
      payload.deviceName = await deviceName();
      payload.appVersion = deviceInfo().appVersion;
      payload.appBuildNo = deviceInfo().buildNumber;
      payload.deviceType = deviceInfo().deviceType;
      const response = await makeRequestNew(
        MapperConstants.ApiTypes.GET,
        APIConstants.GET_USER_PROFILE,
      );

      const userdata = {
        token: accessToken,
        tokenExpirationDate: tokenExpiry,
        ...response.data,
        ...payload,
      };

      dispatch(GlobalActions.updateUserdata(userdata));
      dispatch(loginSuccess(Loader.LOGIN_SUCCESS));
      setLoading(false);
    } else {
      setError(true);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    deleteTokenFCM();
    handleAxiosToken(null, null);
    const accessToken = await getAccessToken();
    dispatch(AuthActions.clearSession({accessToken}));
    await dispatch(GlobalActions.updateUserdata(null));
    await dispatch(updateLoginResponse({}));
    await dispatch(loginSuccess({}));
    await setItem('tfa_status', null);
  };

  const token = useSelector(
    (state: any) => state.globalReducer?.userdata?.token,
  );

  const deleteTokenFCM = async () => {
    try {
      const tokenFCM = await messaging().getToken();
      await makeRequest(
        MapperConstants.ApiTypes.DELETE,
        APIConstants.DELETE_DEVICE_FCM,
        {},
        {tokenDevice: tokenFCM},
      );
      makeRequest(
        MapperConstants.ApiTypes.POST,
        APIConstants.CLOSE_USER_MOBILE_SESSION,
        {},
        {
          tokenId: token,
          status: false,
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (timerCount === 0) setResendActive(MapperConstants.StatusMapper.disable);
  }, [timerCount]);

  // const resendOtp = async () => {
  //   let payload = {
  //     exchange_id: CurrentConfig.exchange_id,
  //     ...userData,
  //     isMobileLogin: MapperConstants.StatusMapper.enable,
  //   };
  //   const updatedRequestObject = convertToFormdata(payload);
  //   switch (verficationStep) {
  //     case MapperConstants.Steps.first:
  //       const response = await makeRequest(
  //         MapperConstants.ApiTypes.POST,
  //         APIConstants.LOGIN,
  //         {},
  //         updatedRequestObject,
  //       );

  //       console.log(response);

  //       if (response.status) {
  //         setTimerCount(60);
  //         setResendActive(MapperConstants.StatusMapper.enable);
  //       }
  //       setIsToast(true);
  //       GenericFunctions.showModalToast(
  //         modalToastRef,
  //         strings('resend_otp'),
  //         response.message,
  //         'info',
  //       );
  //       hideToast();
  //       break;
  //     case MapperConstants.Steps.second:
  //       const resendResponse = await makeRequest(
  //         MapperConstants.ApiTypes.POST,
  //         APIConstants.RESEND_OTP,
  //         {},
  //         updatedRequestObject,
  //       );
  //       if (resendResponse.status) {
  //         setTimerCount(60);
  //         setResendActive(MapperConstants.StatusMapper.enable);
  //         setSocketTokenId(resendResponse.data.socketToken);
  //       }
  //       setIsToast(true);
  //       GenericFunctions.showModalToast(
  //         modalToastRef,
  //         strings('resend_otp'),
  //         resendResponse.message,
  //         'info',
  //       );
  //       hideToast();
  //       break;
  //   }
  // };

  const handleClose = () => {
    resetTimer();
    setIsVisible(MapperConstants.StatusMapper.disable);
    setVerificationStep(MapperConstants.Steps.first);
    reset();
    setSocketTokenId();
    handleLogout();
  };

  const isGoogleAuthCode = () => {
    return verficationStep === MapperConstants.Steps.googleAuth;
  };

  return (
    <CustomModal
      visibility={isVisible}
      style={
        isKeyboardVisible && isIOS()
          ? [styles.focusedModals, {bottom: keyboardHeight}]
          : styles.modals
      }
      disableCoverScreen={true}>
      {isToast && <Toast ref={modalToastRef} style={{zIndex: 999}} />}
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={isRtlApproach ? styles.closeBtn1 : styles.closeBtn}
          onPress={handleClose}>
          <Icon name="clear" type="material" size={20} />
        </TouchableOpacity>
        <Text style={styles.heading}>Two Factor Authentication</Text>
        <Input
          id={FormConstants.OTP}
          placeholder={strings('google_auth')}
          control={control}
          errors={errors}
          isFieldFilledBg={true}
          pattern={RegexExpression.NUMBER_REGEX}
          isRequired={true}
          keyboardType="phone-pad"
          showTick={false}
          fontSize={13}
          maxLength={isGoogleAuthCode() ? 6 : 6}
          minLength={isGoogleAuthCode() ? 6 : 6}
          returnKeyType={ReturnKeyTypes.Go}
          isModal={MapperConstants.StatusMapper.enable}
          customStyles={{backgroundColor: 'white'}}
          customInputStyles={{color: lightTheme.text}}
        />
        {error && (
          <Text style={{color: Colors.pink, marginTop: 10}}>
            Your Google Auth code is incorrect!
          </Text>
        )}
      </View>

      <ThemeButton
        text="confirm"
        onClickHandler={handleSubmit(onSubmit)}
        loading={loading}
        isModal={MapperConstants.StatusMapper.enable}
        disabledColor={
          resendActive ? '' : ThemeFunctions.disableBtnColor(appTheme)
        }
        disabled={!resendActive}
      />
    </CustomModal>
  );
};

export default VerificationProcess;
