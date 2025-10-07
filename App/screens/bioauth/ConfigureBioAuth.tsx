import React, {useEffect, useRef} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import {commonStyles} from '../../globalstyles/styles';
import * as Images from '../../assets';
import {
  Background,
  ImageContainer,
  ThemeButton,
  BiometricWrapper,
} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {SCREEN_HEIGHT, ThemeFunctions} from '../../utils';
import {strings} from '../../strings';
import {bioAuthStyles as styles} from './styles';
import {buttonStyles} from '../../components/ui/styles';
import {BiometryType, Screen} from '../../enums';
import * as BiometricService from '../../services/BiometricService';
import Navigation from '../../utils/Navigation';
import ReactNativeBiometrics from 'react-native-biometrics';
import {GlobalActions} from '../../store';

const ConfigureBioAuth = (props: any) => {
  const globalData = useSelector((state: any) => state.globalReducer);
  const dispatch = useDispatch<any>();
  const bioAuthRef: any = useRef();

  const handleNavigation = (type: string) => async () => {
    if (type === 'skip') {
      await dispatch(GlobalActions.setBiometryType(BiometryType.Unknown));
      navigateToScreen(Screen.App);
    } else {
      BiometricService.setBioAuth(
        BiometricService.bioAuthMapper(globalData.biometryType),
        null,
        Screen.App,
        setBioAuthConfiguration,
      );
    }
  };
  const setBioAuthConfiguration = (type: boolean) => {
    dispatch(GlobalActions.setBiometry(type));
  };

  const navigateToScreen = (screen: string) => {
    Navigation.reset(screen);
  };

  return (
    <SafeAreaView
      style={[
        commonStyles.safeView,
        ThemeFunctions.setBackground(globalData.appTheme),
      ]}>
      <BiometricWrapper ref={bioAuthRef} />
      <View
        style={[
          commonStyles.paddingHorizontalView,
          styles.container,
          {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          },
        ]}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ImageContainer
            imagePath={Images.ic_fingerprint}
            imgStyle={{
              ...styles.img,
              tintColor: ThemeFunctions.getColor(globalData.appColor),
            }}
            noTransform={true}
          />
          <Text
            style={[
              styles.bioAuth,
              {color: ThemeFunctions.customText(globalData.appTheme)},
            ]}>
            {BiometricService.bioAuthMapper(globalData.biometryType)}
          </Text>
          <Text
            style={{
              ...styles.authMsg,
              color: ThemeFunctions.customText(globalData.appTheme),
            }}>
            {strings('enable_bioauth_msg', {
              key: BiometricService.bioAuthMapper(globalData.biometryType),
            })}
          </Text>
        </View>

        <View style={styles.btnContainer}>
          <ThemeButton
            text={strings('enable', {
              key:
                globalData.biometryType !== BiometryType.Unknown
                  ? BiometricService.bioAuthMapper(globalData.biometryType)
                  : strings('bio_auth'),
            })}
            isLocalised={true}
            onClickHandler={handleNavigation('enable')}
            loading={false}
          />
          <TouchableOpacity
            style={styles.skip}
            onPress={handleNavigation('skip')}>
            <Text
              style={{
                ...buttonStyles.themeButton,
                color: ThemeFunctions.customText(globalData.appTheme),
              }}>
              {strings('skip')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ConfigureBioAuth;
