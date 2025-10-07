import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {commonStyles, rtlStyles} from '../../globalstyles/styles';
import * as Images from '../../assets';
import {
  Background,
  DismissKeyboardView,
  OtpInputContainer,
  ThemeButton,
  AwareScrollView,
  AppTermination,
} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {
  goBack,
  reset,
  SCREEN_HEIGHT,
  StorageManager,
  ThemeFunctions,
} from '../../utils';
import {strings} from '../../strings';
import {otpStyles as styles, verifyPasscodeStyles} from './styles';
import Colors, {rapunzelTheme} from '../../theme/Colors';
import {Screen} from '../../enums';
import {AuthActions, GlobalActions} from '../../store';
import {APIConstants, MapperConstants} from '../../constants';
import * as BiometricService from '../../services/BiometricService';
import {Icon} from 'react-native-elements';
import messaging from '@react-native-firebase/messaging';

import {showToast} from '../../utils/GenericUtils';
import {makeRequest} from '../../services/ApiService';

const SetupPasscode = (props: any) => {
  const {navigation} = props;
  const [passcode, setPasscode] = useState<any>('');
  const [confirmPasscode, setConfirmPasscode] = useState<any>('');
  const {userdata} = useSelector((state: any) => state.globalReducer);
  const isFromScreen = props?.route?.params?.fromScreen ? true : false;
  const [loading, setLoading] = useState(MapperConstants.StatusMapper.disable);
  const [isTermination, setIsTermination] = useState(
    MapperConstants.StatusMapper.disable,
  );
  const dispatch = useDispatch();
  const {isRtlApproach, appTheme} = useSelector(
    (state: any) => state.globalReducer,
  );
  const [isValid, setIsValid] = useState(MapperConstants.StatusMapper.enable);
  const [isValidConfirm, setIsValidConfirm] = useState(
    MapperConstants.StatusMapper.enable,
  );
  const token = useSelector(
    (state: any) => state.globalReducer?.userdata?.token,
  );

  const handleSubmit = async () => {
    if (isBtnEnabled()) {
      setLoading(MapperConstants.StatusMapper.enable);
      console.log(userdata);
      if (!isFromScreen) {
        const isBiometryAvailable =
          await BiometricService.checkBiometryAvailability();
        StorageManager.storeCredentials(userdata?.email, passcode);
        dispatch(
          GlobalActions.updatePasscodeStatus(
            MapperConstants.StatusMapper.enable,
          ),
        );
        setLoading(MapperConstants.StatusMapper.disable);
        isBiometryAvailable
          ? navigation.navigate(Screen.ConfigureBioAuth)
          : reset(Screen.App);
      } else {
        StorageManager.storeCredentials(userdata?.email, passcode);
        setLoading(MapperConstants.StatusMapper.disable);
        navigation.pop(2);
        showToast(
          strings('passcode_update'),
          strings('passcode_update_msg'),
          'success',
        );
      }
    } else {
      if (
        confirmPasscode.length === 4 &&
        passcode.length === 4 &&
        confirmPasscode !== passcode
      ) {
        setIsValidConfirm(MapperConstants.StatusMapper.disable);
        return;
      }
      if (confirmPasscode.length < 4 && passcode.length < 4) {
        setIsValidConfirm(MapperConstants.StatusMapper.disable);
        setIsValid(MapperConstants.StatusMapper.disable);
        return;
      }
      if (confirmPasscode.length < 4 && passcode.length === 4) {
        setIsValidConfirm(MapperConstants.StatusMapper.disable);
        setIsValid(MapperConstants.StatusMapper.enable);
        return;
      }
      if (confirmPasscode.length === 4 && passcode.length < 4) {
        setIsValidConfirm(MapperConstants.StatusMapper.enable);
        setIsValid(MapperConstants.StatusMapper.disable);
        return;
      }
    }
  };

  useEffect(() => {
    if (
      isValidConfirm === MapperConstants.StatusMapper.disable &&
      confirmPasscode.length === 4 &&
      passcode === confirmPasscode
    ) {
      setIsValidConfirm(MapperConstants.StatusMapper.enable);
    }
  }, [confirmPasscode.length]);

  useEffect(() => {
    if (
      isValid === MapperConstants.StatusMapper.disable &&
      passcode.length === 4
    ) {
      setIsValid(MapperConstants.StatusMapper.enable);
    }
  }, [passcode.length]);

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

  const handleLogout = () => {
    deleteTokenFCM();

    setLoading(MapperConstants.StatusMapper.enable);
    dispatch(GlobalActions.updateFavouriteSuccess([]));
    dispatch(AuthActions.clearSession());
    dispatch(GlobalActions.updateMainCurrency({mainCurrency: 'USD'}));
    dispatch(GlobalActions.updateSecondaryCurrency({secondCurrency: 'BTC'}));

    dispatch(GlobalActions.hideSmallBalances());
    setLoading(MapperConstants.StatusMapper.disable);
  };

  const logoutAndTerminate = () => {
    handleLogout();
    BackHandler.exitApp();
  };

  const handleBack = () => {
    setIsTermination(MapperConstants.StatusMapper.enable);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBack);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBack);
  }, []);

  const isBtnEnabled = () => {
    return (
      confirmPasscode.length === 4 &&
      passcode.length === 4 &&
      confirmPasscode === passcode
    );
  };

  return (
    <SafeAreaView
      style={[commonStyles.safeView, ThemeFunctions.setBackground(appTheme)]}>
      {isFromScreen && (
        <View
          style={[
            verifyPasscodeStyles.header,
            isRtlApproach ? rtlStyles.alignStart : rtlStyles.alignEnd,
          ]}>
          <TouchableOpacity
            style={verifyPasscodeStyles.close}
            onPress={() => goBack()}>
            <Icon
              name="close"
              type="material"
              size={22}
              color={
                ThemeFunctions.isRapunzelTheme(appTheme)
                  ? rapunzelTheme.magenta
                  : Colors.gray
              }
            />
          </TouchableOpacity>
        </View>
      )}
      <AwareScrollView
        style={!isFromScreen ? styles.container1 : styles.container}>
        <View style={{paddingLeft: 20}}>
          <Text style={[styles.label, ThemeFunctions.textColor(appTheme)]}>
            {strings('setup_passcode')}
          </Text>
          <OtpInputContainer
            passcode={passcode}
            updatePasscode={setPasscode}
            isValid={isValid}
            keyboardType={'phone-pad'}
            filled={true}
          />
          <Text
            style={[
              styles.label,
              styles.marginView,
              ThemeFunctions.textColor(appTheme),
            ]}>
            {strings('confirm_passcode')}
          </Text>
          <OtpInputContainer
            passcode={confirmPasscode}
            updatePasscode={setConfirmPasscode}
            isValid={isValidConfirm}
            keyboardType={'phone-pad'}
            filled={true}
          />
        </View>

        <AppTermination
          isVisible={isTermination}
          setIsVisible={setIsTermination}
          handleOK={logoutAndTerminate}
          showCancel={MapperConstants.StatusMapper.enable}
          msg="warn_setup_passcode_exit"
        />
      </AwareScrollView>
      <View
        style={[
          commonStyles.paddingHorizontalView,
          styles.marginView,
          {width: '100%'},
        ]}>
        <ThemeButton
          text="continue"
          onClickHandler={handleSubmit}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
};

export default SetupPasscode;
