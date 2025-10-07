import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  Linking,
  ScrollView,
} from 'react-native';
import {commonStyles, rtlStyles} from '../../globalstyles/styles';
import {accountStyles as styles} from './styles';
import {
  APIConstants,
  AppConstants,
  DefaultArray,
  MapperConstants,
} from '../../constants';
import {strings} from '../../strings';
import {useDispatch} from 'react-redux';
import {AppActions, AuthActions, GlobalActions} from '../../store';
import {Screen} from '../../enums';
import Logout from './Logout';
import {useSelector} from 'react-redux';
import {ThemeFunctions} from '../../utils';
import VersionCheck from 'react-native-version-check';
import InAppReview from 'react-native-in-app-review';
import {makeRequest} from '../../services/ApiService';
import messaging from '@react-native-firebase/messaging';
import Navigation from '../../utils/Navigation';
import {Cell} from '../../components';
import IconVector from '../../components/ui/IconVector';
import {showToast} from '../../utils/GenericUtils';
import ConfirmModel from './accountdetails/ConfirmModel';

const Account = () => {
  const dispatch = useDispatch<any>();
  const {navigate} = Navigation;

  const [isLogoutVisible, setIsLogoutVisible] = useState(
    MapperConstants.StatusMapper.disable,
  );

  const {userProfileData} = useSelector((state: any) => state.appReducer);
  const token = useSelector(
    (state: any) => state.globalReducer?.userdata?.token,
  );
  const [loading, setLoading] = useState(MapperConstants.StatusMapper.disable);

  const {isRtlApproach, appTheme} = useSelector(
    (state: any) => state.globalReducer,
  );

  const handleNavigation = (res: any) => async () => {
    if (res.route === Screen.Statistics) {
      await dispatch(AppActions.getStatistics());
    }
    if (res.route === Screen.MyAccount) {
      dispatch(AppActions.getUserProfile());
    }
    switch (res.route) {
      case 'logout':
        setIsLogoutVisible(true);
        break;
      case Screen.RaiseTicket:
        if (res.param) {
          navigate(res.route, {...res.param});
        } else {
          navigate(res.route);
        }
        break;
      case Screen.QuickSwapScreen:
        navigate(res.route, {fromScreen: res.route});
        break;
      case Screen.WalletScreen:
        navigate(res.route, {fromScreen: res.route});
        break;
      case Screen.TickerScreen:
        navigate(res.route, {fromScreen: res.route});
        break;
      case Screen.Gbex:
        navigate(res.route, {fromScreen: res.route});
        break;
      case 'rate':
        const appReviewAvailable = InAppReview.isAvailable();
        if (appReviewAvailable) {
          InAppReview.RequestInAppReview()
            .then(hasFlowFinishedSuccessfully => {
              if (hasFlowFinishedSuccessfully) {
                Linking.openURL(AppConstants.AppLink);
              }
            })
            .catch(error => {
              Linking.openURL(AppConstants.AppLink);
            });
        } else {
          Linking.openURL(AppConstants.AppLink);
        }
        break;
      case Screen.GlobiancePos:
        const isEligible = userProfileData?.isMerchant;
        if (isEligible) navigate(Screen.GlobiancePos);
        else navigate(Screen.Merchant);
        break;
      case Screen.Payment:
        navigate(Screen.Payment, {fromScreen: true});
        break;
      case Screen.PORScreen:
        navigate(Screen.PORScreen, {});
        // if (
        //   userProfileData?.kyc_record?.status !=
        //   MapperConstants.KycStatusConstant.approved
        // ) {
        //   showToast('', strings('please_complete_kyc'), 'info');
        // } else if (userProfileData?.por_submitted_at) {
        //   showToast('', strings('POR is verifiying'), 'info');
        // } else {
        //   navigate(Screen.PORScreen, {});
        // }
        break;
      default:
        res.route ? navigate(res.route) : null;
    }
  };

  useEffect(() => {
    dispatch(AppActions.getCountries());
    dispatch(AppActions.getUserProfile());
  }, [dispatch]);

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

    // setLoading(MapperConstants.StatusMapper.enable);
    // dispatch(GlobalActions.updateFavouriteSuccess([]));
    dispatch(AuthActions.clearSession({token}));
    dispatch(GlobalActions.updateMainCurrency({mainCurrency: 'USD'}));
    dispatch(GlobalActions.updateSecondaryCurrency({secondCurrency: 'BTC'}));

    dispatch(GlobalActions.hideSmallBalances());
    setLoading(MapperConstants.StatusMapper.disable);
    setIsLogoutVisible(false);
  };

  const headingClass = () => {
    return [
      styles.heading,
      ThemeFunctions.textColor(appTheme),
      isRtlApproach ? rtlStyles.alignSelfEnd : {},
    ];
  };

  const isReverseView = () => {
    return isRtlApproach ? rtlStyles.reverseRow : {};
  };
  const textColor = () => {
    return ThemeFunctions.customText(appTheme);
  };

  const showComingSoon = () => {
    showToast('', strings('coming_soon'), 'info');
  };

  const Item = ({res}) => (
    <Cell
      key={res.id}
      style={[styles.item]}
      onPress={
        res.title === 'rewards' ? showComingSoon : handleNavigation(res)
      }>
      <View style={[styles.leftView, isReverseView()]}>
        <View
          style={[
            {alignItems: 'center', flexDirection: 'row'},
            isReverseView(),
          ]}>
          <Image
            resizeMethod="scale"
            resizeMode="cover"
            source={res.icon}
            style={[
              styles.leftIcon,
              {transform: [{scaleX: isRtlApproach ? -1 : 1}]},
            ]}
          />
          <Text
            style={[
              styles.label,
              isRtlApproach
                ? {marginEnd: 10, ...ThemeFunctions.textColor(appTheme)}
                : ThemeFunctions.textColor(appTheme),
              (res.title === 'globiance_pos' || res.title === 'qr_pay') && {
                textTransform: 'none',
              },
              res.title?.includes('gbex') && {textTransform: 'none'},
            ]}>
            {strings(res.title)}
          </Text>
        </View>
        <IconVector.Entypo
          name="chevron-thin-right"
          size={18}
          color={ThemeFunctions.customText(appTheme)}
        />
      </View>
      <Text
        style={[
          styles.languageLabel,
          {color: textColor()},
          isRtlApproach ? {marginEnd: 10} : {},
          strings(res.desc)?.includes('GBEX') && {textTransform: 'none'},
        ]}>
        {strings(res.desc)}
      </Text>
    </Cell>
  );

  return (
    <SafeAreaView
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      <Logout
        isVisible={isLogoutVisible}
        setIsLogoutVisible={setIsLogoutVisible}
        handleLogout={handleLogout}
        loading={loading}
      />

      <ScrollView
        contentContainerStyle={{paddingHorizontal: 15, paddingBottom: 80}}>
        {DefaultArray.accounts.map(res => {
          return (
            <View key={Math.random()}>
              <Text style={headingClass()}>{strings(res.title)}</Text>
              {res.data.map(item => (
                <Item res={item} key={Math.random()} />
              ))}
            </View>
          );
        })}
        <Text
          style={[
            styles.version,
            {color: textColor()},
          ]}>{`V${VersionCheck.getCurrentVersion()} (${VersionCheck.getCurrentBuildNumber()})`}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;
