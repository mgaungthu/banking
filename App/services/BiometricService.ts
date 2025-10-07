import ReactNativeBiometrics from 'react-native-biometrics';
import {BiometryType} from '../enums';
import {strings} from '../strings';
import {MapperConstants} from '../constants';
import Navigation from '../utils/Navigation';
import {Linking} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

import * as Images from '../assets';
import {ThemeFunctions} from '../utils';
import {isIOS} from '../utils/DeviceConfig';

const rnBiometrics = new ReactNativeBiometrics();

export const checkBiometryAvailability = async () => {
  const {available} = await rnBiometrics.isSensorAvailable();
  return available;
};

export const getBiometryType = async () => {
  const {biometryType} = await rnBiometrics.isSensorAvailable();
  return biometryType;
};

export const setBioAuth = async (
  biometricType: string,
  setIsVisible: any,
  screen: any,
  setBioAuthConfiguration: any,
) => {
  if (isIOS() && biometricType === BiometryType.FaceID) {
    const permissionResults = await check(PERMISSIONS.IOS.FACE_ID);
    switch (permissionResults) {
      case RESULTS.DENIED:
        const result = await request(PERMISSIONS.IOS.FACE_ID);
        if (result === RESULTS.GRANTED) {
          promptBioAuth(
            biometricType,
            setIsVisible,
            screen,
            setBioAuthConfiguration,
          );
        } else {
          Linking.openSettings();
        }

        break;
      case RESULTS.GRANTED:
        promptBioAuth(
          biometricType,
          setIsVisible,
          screen,
          setBioAuthConfiguration,
        );
        break;
    }
  } else {
    promptBioAuth(biometricType, setIsVisible, screen, setBioAuthConfiguration);
  }
};

export const promptBioAuth = async (
  biometricType: string,
  setIsVisible: any,
  screen: any,
  setBioAuthConfiguration: any,
) => {
  try {
    const msg = strings('bio_prompt_msg', {
      key: biometricType,
    });
    const resultObject = await rnBiometrics.simplePrompt({
      promptMessage: msg,
    });
    const {success, error} = resultObject;
    if (success) {
      if (screen) {
        Navigation.reset(screen);
      }
      if (setIsVisible) {
        setIsVisible(MapperConstants.StatusMapper.disable);
      }
      if (setBioAuthConfiguration)
        setBioAuthConfiguration(MapperConstants.StatusMapper.enable);
    } else if (error === 'User cancellation') {
      if (setBioAuthConfiguration)
        setBioAuthConfiguration(MapperConstants.StatusMapper.disable);
      if (setIsVisible) setIsVisible(MapperConstants.StatusMapper.enable);
    } else {
      if (setIsVisible) setIsVisible(MapperConstants.StatusMapper.enable);
    }
  } catch (e) {
    if (setBioAuthConfiguration)
      setBioAuthConfiguration(MapperConstants.StatusMapper.disable);
    if (setIsVisible) setIsVisible(MapperConstants.StatusMapper.enable);
  }
};

export const bioAuthMapper = (biometryType: string) => {
  if (biometryType === BiometryType.FaceID) return strings('face_id');
  if (biometryType === BiometryType.TouchID) return strings('touch_id');
  if (biometryType === BiometryType.Biometrics) return strings('biometrics');
};

export const getBioAuthImgActive = (biometryType: string, appTheme: string) => {
  if (biometryType === BiometryType.FaceID)
    return ThemeFunctions.isRapunzelTheme(appTheme)
      ? Images.IcFacePink
      : Images.IcFaceActive;
  if (biometryType === BiometryType.TouchID)
    return ThemeFunctions.isRapunzelTheme(appTheme)
      ? Images.IcTouchPink
      : Images.IcTouchActive;
  if (biometryType === BiometryType.Biometrics)
    return ThemeFunctions.isRapunzelTheme(appTheme)
      ? Images.IcBiometryPink
      : Images.IcBiometryActive;
};

export const getBioAuthImg = (biometryType: string, appTheme: string) => {
  if (biometryType === BiometryType.FaceID)
    return ThemeFunctions.isRapunzelTheme(appTheme)
      ? Images.IcFacePink
      : Images.IcFace;
  if (biometryType === BiometryType.TouchID)
    return ThemeFunctions.isRapunzelTheme(appTheme)
      ? Images.IcTouchPink
      : Images.IcTouch;
  if (biometryType === BiometryType.Biometrics)
    return ThemeFunctions.isRapunzelTheme(appTheme)
      ? Images.IcBiometryPink
      : Images.IcBiometry;
};
