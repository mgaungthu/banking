import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {commonStyles} from '../../globalstyles/styles';
import * as Images from '../../assets';
import {ImageContainer} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {ThemeFunctions} from '../../utils';
import {strings} from '../../strings';
import {bioAuthStyles as styles} from './styles';
import ConfirmationPopup from './VerifyPopup';
import {GlobalActions} from '../../store';
import {MapperConstants} from '../../constants';
import ReactNativeBiometrics from 'react-native-biometrics';
import {AppColor, BiometryType, Screen} from '../../enums';
import * as BiometricService from '../../services/BiometricService';

const VerifyBioAuth = (props: any) => {
  const [isConfirmation, setIsConfirmation] = useState(
    MapperConstants.StatusMapper.disable,
  );
  const dispatch = useDispatch<any>();
  const globalData = useSelector((state: any) => state.globalReducer);

  useEffect(() => {
    getIntialState();
  }, []);

  const getIntialState = async () => {
    await updateBiometryType();
    await BiometricService.promptBioAuth(
      BiometricService.bioAuthMapper(globalData.biometryType),
      setIsConfirmation,
      Screen.App,
      null,
    );
  };

  const updateBiometryType = async () => {
    const bioAuthType = await BiometricService.getBiometryType();
    switch (bioAuthType) {
      case ReactNativeBiometrics.TouchID:
        dispatch(GlobalActions.setBiometryType(BiometryType.TouchID));
        break;
      case ReactNativeBiometrics.FaceID:
        dispatch(GlobalActions.setBiometryType(BiometryType.FaceID));
        break;
      case ReactNativeBiometrics.Biometrics:
        dispatch(GlobalActions.setBiometryType(BiometryType.Biometrics));
        break;
      default:
        dispatch(GlobalActions.setBiometryType(BiometryType.Unknown));
      // biometry is null when biometric authentication is supported
    }
  };

  const _getLogo = () => {
    switch (globalData.appColor) {
      case AppColor.pink:
        return Images.logo_pink;
      case AppColor.green:
        return Images.logo_green;
    }
    return Images.logo_black;
  };

  return (
    <SafeAreaView
      style={[
        commonStyles.safeView,
        ThemeFunctions.setBackground(globalData.appTheme),
      ]}>
      <ImageContainer
        imagePath={_getLogo()}
        imgStyle={commonStyles.logo}
        noTransform={true}
      />
      <ImageContainer
        imagePath={Images.Lock}
        imgStyle={[styles.lock, ThemeFunctions.imgColor(globalData.appTheme)]}
        noTransform={true}
      />
      <Text
        style={{
          ...styles.locked,
          color: ThemeFunctions.customText(globalData.appTheme),
        }}>
        {strings('app_locked')}
      </Text>
      <ConfirmationPopup
        isVisible={isConfirmation}
        setIsVisible={setIsConfirmation}
      />
    </SafeAreaView>
  );
};

export default VerifyBioAuth;
