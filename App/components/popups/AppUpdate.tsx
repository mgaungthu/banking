import React, {useEffect, useState, useRef} from 'react';
import {APIConstants, MapperConstants} from '../../constants';
import {makeRequest} from '../../services/ApiService';
import VersionCheck from 'react-native-version-check';

import CustomModal from '../hoc/CustomModal';
import ThemeButton from '../ui/ThemeButton';

import {View, Text, Linking, Image} from 'react-native';
import {appStyles as styles} from '../wrapper/styles';
import {AppStates} from '../../enums';
import {AppState, AppStateStatus} from 'react-native';
import {isIOS} from '../../utils/DeviceConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {commonStyles, maintenanceAlertStyles} from '../../globalstyles/styles';
import Colors from '../../theme/Colors';
import {ThemeFunctions} from '../../utils';
import {useSelector} from 'react-redux';
import ThemeText from '../ui/ThemeText';
import Link from '../../components/hoc/Link';

const AppUpdate = () => {
  const appState = useRef(AppState.currentState);
  const [maintenance, setMaintenance] = useState(false);

  const [step, setStep] = useState(0);
  const [msg, setMsg] = useState('');
  const [title, setTitle] = useState('');
  const [appLink, setAppLink] = useState('');
  const [appResponse, setAppResponse] = useState({});
  const [isUpdateModal, setIsUpdateModal] = useState(
    MapperConstants.StatusMapper.disable,
  );
  const [isSkipable, setSkipable] = useState(false);
  const {isRtlApproach, appTheme, internetAvailable} = useSelector(
    (state: any) => state.globalReducer,
  );

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    return () => {
      AppState.addEventListener('change', _handleAppStateChange);
    };
  }, [appResponse]);

  const _handleAppStateChange = async (nextAppState: AppStateStatus) => {
    let isAppChangingFromBgToFg = () =>
      (appState.current === AppStates.Inactive ||
        appState.current === AppStates.Background) &&
      nextAppState === AppStates.Active;

    if (isAppChangingFromBgToFg()) {
      checkUpdate(appResponse);
    }
    appState.current = nextAppState;
  };

  useEffect(() => {
    checkAppUpdate();
  }, []);

  const checkAppUpdate = async () => {
    try {
      let informedVerison: any = await AsyncStorage.getItem(
        MapperConstants.INFORMED_VERSION,
      );

      if (informedVerison) {
        informedVerison = parseFloat(informedVerison);
        if (isNaN(informedVerison)) informedVerison = null;
      }

      let response = await makeRequest(
        MapperConstants.ApiTypes.POST,
        APIConstants.APP_UPDATE,
        {},
        {device_type: isIOS() ? '2' : '1'},
      );

      if (response.status === 200) {
        setAppResponse(response.data);
        checkUpdate(response.data, informedVerison);
        if (response.data.maintenance == true) {
          setMaintenance(true);
        } else {
          setMaintenance(false);
        }
      } else {
        // internetAvailable && setMaintenance(true);
      }
    } catch (e) {
      console.log(e);
      // internetAvailable && setMaintenance(true);
    }
  };
  const checkUpdate = (appData: any, informedVersion = null) => {
    const {
      update_title,
      app_link,
      update_message,
      critical_version,
      latest_version,
      latest_build_version,
      critical_update_message,
    } = appData;

    setSkipable(false);
    const appVersion = VersionCheck.getCurrentVersion();
    const criticalVersion = critical_version;
    const latestVersion = latest_version;
    if (criticalVersion != null && criticalVersion > appVersion) {
      setMsg(critical_update_message);
      setTitle(update_title);
      setAppLink(app_link);
      setIsUpdateModal(MapperConstants.StatusMapper.enable);
      setStep(1);
    } else if (latestVersion != null && latestVersion > appVersion) {
      if (informedVersion && informedVersion >= latestVersion) {
        console.log('already informed, dont nag');
        setIsUpdateModal(false);
        return;
      }

      setSkipable(true);
      setAppLink(app_link);
      setMsg(update_message);
      setTitle(update_title);
      setIsUpdateModal(MapperConstants.StatusMapper.enable);
      setStep(2);

      AsyncStorage.setItem(MapperConstants.INFORMED_VERSION, `${latestVersion}`)
        .then()
        .catch(e => console.log(e));
    } else {
      setStep(0);
      setIsUpdateModal(MapperConstants.StatusMapper.disable);
    }
  };
  const handleOkPress = async () => {
    switch (step) {
      case 1:
        Linking.openURL(appLink);
        break;
      case 2:
        setIsUpdateModal(MapperConstants.StatusMapper.disable);
        Linking.openURL(appLink);

        break;
      default:
        setIsUpdateModal(MapperConstants.StatusMapper.disable);
    }
  };

  const skipableElement = (
    <View style={[styles.btn, commonStyles.rowItem]}>
      <View style={styles.btnStyle}>
        <ThemeButton
          styleButton={[{backgroundColor: Colors.gray}]}
          text="skip"
          onClickHandler={() => setIsUpdateModal(false)}
          isModal={MapperConstants.StatusMapper.enable}
          loading={false}
        />
      </View>

      <View style={{width: 10}} />

      <View style={styles.btnStyle}>
        <ThemeButton
          text="ok"
          onClickHandler={handleOkPress}
          isModal={MapperConstants.StatusMapper.enable}
          loading={false}
        />
      </View>
    </View>
  );

  const nonSkipableElement = (
    <View style={styles.btn}>
      <ThemeButton
        text="ok"
        onClickHandler={handleOkPress}
        isModal={MapperConstants.StatusMapper.enable}
        loading={false}
      />
    </View>
  );

  const RenderMaintenance = () => {
    if (!maintenance) return <></>;
    return (
      <View
        style={[
          maintenanceAlertStyles.maintenanceToastWrapper,
          ThemeFunctions.setPaymentDetailBg(appTheme),
        ]}>
        <ThemeText style={[maintenanceAlertStyles.maintenanceToastTitle]}>
          Ongoing Maintenance
        </ThemeText>

        <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
          Globiance APP is currently under maintenance. In case of query please
          contact support at <ThemeText>user-support@globiance.com</ThemeText>{' '}
          or follow our social media acocunts for latest updates.
        </ThemeText>

        <View style={maintenanceAlertStyles.socialMediaLinkContainer}>
          <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
            Social media:{' '}
          </ThemeText>

          <Link url={'https://twitter.com/globiance'}>
            <Image
              style={[
                maintenanceAlertStyles.socialIcon,
                {tintColor: ThemeFunctions.getTextColor(appTheme).color},
              ]}
              source={require('../../assets/icons/social/twitter.png')}
            />
          </Link>

          <Link url={'https://t.me/globiancegroup'}>
            <Image
              style={[
                maintenanceAlertStyles.socialIcon,
                {tintColor: ThemeFunctions.getTextColor(appTheme).color},
              ]}
              source={require('../../assets/icons/social/telegram.png')}
            />
          </Link>

          <Link url={'https://www.facebook.com/Globiance/'}>
            <Image
              style={[
                maintenanceAlertStyles.socialIcon,
                {tintColor: ThemeFunctions.getTextColor(appTheme).color},
              ]}
              source={require('../../assets/icons/social/facebook.png')}
            />
          </Link>
        </View>
      </View>
    );
  };

  return (
    <>
      <CustomModal visibility={isUpdateModal}>
        <View style={styles.popup}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.msg}>{msg}</Text>
          {isSkipable ? skipableElement : nonSkipableElement}
        </View>
      </CustomModal>

      <RenderMaintenance />
    </>
  );
};

export default AppUpdate;
