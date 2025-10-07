import React, {useEffect, useImperativeHandle, forwardRef} from 'react';
import {BiometryCase, BiometryType} from '../../enums';
import ReactNativeBiometrics from 'react-native-biometrics';
import {useDispatch, useSelector} from 'react-redux';
import * as BiometricService from '../../services/BiometricService';
import {GlobalActions} from '../../store';
import {Linking} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {MapperConstants} from '../../constants';
import {strings} from '../../strings';
import {showToast} from '../../utils/GenericUtils';
import {isIOS} from '../../utils/DeviceConfig';

type BioAuthProps = {
  type?: 'security' | 'app';
  // setIsVisible: any
};
type BioAuthHandle = {
  setBioAuth: () => Promise<void>;
  promptBioAuth: () => void;
  checkBiometryAvailability: () => Promise<boolean>;
};

const BiometricWrapper: React.ForwardRefRenderFunction<
  BioAuthHandle,
  BioAuthProps
> = (props, forwardedRef) => {
  const {type} = props;
  const dispatch = useDispatch();

  const {biometryType, isBioAuthConfigure} = useSelector(
    (state: any) => state?.globalReducer,
  );

  const rnBiometrics = new ReactNativeBiometrics();

  useEffect(() => {
    updateBiometryType();
  }, [dispatch]);

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

  useImperativeHandle(forwardedRef, () => ({
    async setBioAuth() {
      if (isIOS() && biometryType === BiometryType.FaceID) {
        const permissionResults = await check(PERMISSIONS.IOS.FACE_ID);
        switch (permissionResults) {
          case RESULTS.DENIED:
            const result = await request(PERMISSIONS.IOS.FACE_ID);
            if (result === RESULTS.GRANTED) {
              this.promptBioAuth();
            } else {
              Linking.openSettings();
            }

            break;
          case RESULTS.GRANTED:
            this.promptBioAuth();
            break;
        }
      } else {
        this.promptBioAuth();
      }
    },
    async promptBioAuth() {
      try {
        const msg = strings('prompt_message', {
          key: biometryType,
        });

        const resultObject = await ReactNativeBiometrics.simplePrompt({
          promptMessage: msg,
        });
        const {success, error} = resultObject;
        if (success) {
          if (type === 'security')
            dispatch(
              GlobalActions.setBiometry(MapperConstants.StatusMapper.enable),
            );
        } else {
          switch (error) {
            case BiometryCase.UserCancellation:
              type === 'security'
                ? dispatch(
                    GlobalActions.setBiometry(
                      MapperConstants.StatusMapper.disable,
                    ),
                  )
                : this.backAction();
              break;
            default:
            // setIsVisible(MapperConstants.StatusMapper.enable)
            // Navigation.navigate(Screen.VerifyModal, {
            //   setIsVisible: setIsVisible,
            // })
          }
          showToast(strings('biometrics'), error, 'error');
        }
      } catch (e) {
        // if (e.message === BiometryCase.DeviceLocked && isBioAuthConfigure) {
        if (e.message === BiometryCase.DeviceLocked) {
          showToast(strings('biometrics'), e.message, 'error');
          // this.backAction()
        }
      }
    },
    async checkBiometryAvailability() {
      const {available} = await rnBiometrics.isSensorAvailable();
      return available;
    },
    backAction() {
      // setIsVisible(MapperConstants.StatusMapper.enable)
      // Navigation.navigate(Screen.VerifyModal, {setIsVisible: setIsVisible})
    },
  }));

  return <></>;
};

export default forwardRef(BiometricWrapper);
