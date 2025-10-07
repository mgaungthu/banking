import React, {useEffect} from 'react';
import {Screen} from '../enums';

import {useSelector} from 'react-redux';
import * as BiometricService from '../services/BiometricService';
import Navigation from '../utils/Navigation';

const AuthLoading = () => {
  const globalData = useSelector((state: any) => state.globalReducer);

  useEffect(() => {
    BiometricService.getBiometryType();
    isBiometric();
  }, []);

  const isBiometric = async () => {
    const res = await BiometricService.checkBiometryAvailability();
    let screenToNavigate;
    if (globalData.isPasscodeEnable && res && globalData.isBioAuthConfigure) {
      screenToNavigate = Screen.VerifyBioAuth;
    } else if (
      (globalData.isPasscodeEnable && !res) ||
      (globalData.isPasscodeEnable && !globalData.isBioAuthConfigure)
    ) {
      screenToNavigate = Screen.VerifyPasscode;
    } else {
      screenToNavigate = Screen.SetupPasscode;
    }

    Navigation.navigate(screenToNavigate, {});
  };

  return <></>;
};

export default AuthLoading;
