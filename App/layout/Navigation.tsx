import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import messaging from '@react-native-firebase/messaging';
import App from './AppNavigator';
import Auth from './AuthNavigator';
import BioAuthNavigator from './BioAuthLoading';
import {AppColor, AppTheme, Screen} from '../enums';
import Navigation, {navigationRef} from '../utils/Navigation';
import {useDispatch, useSelector} from 'react-redux';
import {handleAxiosToken, setOrigin} from '../services/AxiosOrder';
import {
  TickerActions,
  WalletActions,
  GlobalActions,
  AppActions,
  AuthActions,
} from '../store';
import {setItem, ThemeFunctions} from '../utils';
import {commonStyles} from '../globalstyles/styles';
import {CustomStatusBar} from '../components';
import {socket} from '../utils/SocketUtil';
import SocketConstants from '../constants/SocketConstants';
import {APIConstants, MapperConstants} from '../constants';
import {DEFAULT_REGION} from '../constants/DefaultArray';
import {makeRequest} from '../services/ApiService';
import {
  loginSuccess,
  updateLoginResponse,
} from '../store/action/auth/AuthAction';

const RootStack = createStackNavigator();

const AppNavigator = () => {
  const [loading, setLoading] = useState(MapperConstants.StatusMapper.disable);

  const globalData = useSelector((state: any) => state.globalReducer);

  const dispatch = useDispatch<any>();

  const {userdata} = useSelector((state: any) => state.globalReducer);
  const token = useSelector(
    (state: any) => state.globalReducer?.userdata?.token,
  );

  const tokenExpirationDate = parseInt(userdata?.tokenExpirationDate, 10); // Token expiration time in UTC
  const currentDate = Date.now(); // Current time

  useEffect(() => {
    if (currentDate > tokenExpirationDate) {
      handleLogout();
    }
  }, []);

  const handleLogout = async () => {
    deleteTokenFCM();
    handleAxiosToken(null, null);
    await dispatch(GlobalActions.updateUserdata(null));
    await dispatch(updateLoginResponse({}));
    await dispatch(loginSuccess({}));
    await setItem('tfa_status', null);
    Navigation.reset(Screen.Auth);
  };

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

  const isLoggedIn = () => {
    if (globalData.userdata) {
      handleAxiosToken(globalData.userdata.token);
      checkRegion();
    }
    if (globalData.userdata) {
      return globalData.userdata.email === 'appdev@globiance.com'
        ? Screen.App
        : Screen.BioAuthNavigator;
    } else {
      return Screen.Auth;
    }
  };

  const checkRegion = () => {
    if (!globalData.region)
      dispatch(GlobalActions.changeRegion(DEFAULT_REGION));
    else setOrigin(globalData.region);
  };

  const checkTheme = () => {
    const checkTheme = !Object.values(AppTheme).includes(globalData.appTheme);
    const checkColor = !Object.values(AppColor).includes(globalData.appColor);
    console.log(checkTheme);
    dispatch(GlobalActions.changeAppearance(AppTheme.dark));
    if (checkTheme || checkColor) {
      dispatch(GlobalActions.changeAppearance(AppTheme.dark));
      dispatch(GlobalActions.changeColor(AppColor.pink));
    }
  };

  useEffect(() => {
    // dispatch(GlobalActions.getAssetMetadata());
    // dispatch(WalletActions.getCurrencyStatus());
    checkTheme();
  }, []);

  useEffect(() => {
    if (socket.connect) {
      socket.emit(SocketConstants.Join, {pairStats: true}, response => {
        // console.log('emit acknowledgement',response)
      });
      socket.on(SocketConstants.PairStatus, data => {
        // Get Pair status list
        if (data && data.length) {
          const favouriteTickers = globalData.userdata
            ? globalData?.favouriteTickers
            : [];
          if (favouriteTickers && favouriteTickers?.length > 0) {
            data.map((res: any) => {
              let existedData = favouriteTickers?.find(
                resp => resp.id === res.id,
              );
              res.isFavourite =
                existedData && Object.keys(existedData)?.length > 0
                  ? MapperConstants.StatusMapper.enable
                  : MapperConstants.StatusMapper.disable;
            });
            dispatch(TickerActions.updateTickers(data));
          } else {
            dispatch(TickerActions.updateTickers(data));
          }
        }
      });
    }
  }, [globalData.userdata, socket.connect]);
  return (
    <SafeAreaView
      style={[
        commonStyles.safeView,
        ThemeFunctions.setBackground(globalData.appTheme),
      ]}>
      <CustomStatusBar hidden={false} />
      <NavigationContainer
        ref={navigationRef}
        theme={{
          dark: false,
          colors: {
            ...DefaultTheme.colors,
            background: ThemeFunctions.setBackgroundColor(globalData.appTheme),
          },
        }}>
        <RootStack.Navigator
          initialRouteName={isLoggedIn()}
          screenOptions={{headerShown: false}}>
          <RootStack.Screen name={Screen.App} component={App} />
          <RootStack.Screen name={Screen.Auth} component={Auth} />
          <RootStack.Screen
            name={Screen.BioAuthNavigator}
            component={BioAuthNavigator}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default AppNavigator;
