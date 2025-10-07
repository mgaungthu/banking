import {authorize, revoke} from 'react-native-app-auth';
import {GlobalActions} from '../..';
import {MapperConstants, APIConstants} from '../../../constants';
import {Loader, Screen} from '../../../enums';
import {makeRequest, makeRequestNew} from '../../../services/ApiService';
import {handleAxiosToken} from '../../../services/AxiosOrder';
import {strings} from '../../../strings';
import {setItem, deviceInfo, deviceName, removeItem} from '../../../utils';
import {
  convertToFormdata,
  infoAlert,
  showToast,
} from '../../../utils/GenericUtils';
import Navigation from '../../../utils/Navigation';
import {
  LOGIN_ACTIVITY_LOADER,
  LOGIN,
  LOGIN_DATA,
  REGISTER_USER,
} from '../../constants/ReduxConstants';
import {CurrentConfig} from '../../../../api_config';
import {AuthConfig} from '../../../utils/AuthConfig';

export const loginLoader = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: LOGIN_ACTIVITY_LOADER,
    payload,
  });
};

export const loginSuccess = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: LOGIN,
    payload,
  });
};

export const updateLoginResponse = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: LOGIN_DATA,
    payload,
  });
};

export const login = (payload: any) => async (dispatch: any) => {
  try {
    dispatch(loginLoader(Loader.LOGIN_PROCESSED));
    let userResponse;
    const result = await makeRequestNew(
      MapperConstants.ApiTypes.POST,
      APIConstants.LOGIN_USER,
      {},
      payload,
    );

    // console.log(result.data, 'here');
    if (result.data?.error === 'user_region_not_allowed') {
      dispatch(loginLoader(false));
      return result.data?.error;
    }

    if (!result.data.access_token) {
      const response = await makeRequestNew(
        MapperConstants.ApiTypes.GET,
        APIConstants.GC_CHECK,
      );
      console.log(response.data.required, 'lcs-response');
      dispatch(loginLoader(false));
      return response.data.required && 'recaptcha';
    } else {
      handleAxiosToken(result.data.access_token, result.data.expires_in);
      userResponse = await makeRequestNew(
        MapperConstants.ApiTypes.GET,
        APIConstants.GET_USER_PROFILE,
      );

      if (
        userResponse.data.two_fa_method === 'ga' &&
        userResponse.data.message === 'token_not_verified'
      ) {
        // dispatch(loginSuccess(Loader.LOGIN_SUCCESS));
        dispatch(loginLoader(false));
        return 'ga';
      } else {
        payload.exchange_id = CurrentConfig.exchange_id;
        payload.isMobileLogin = MapperConstants.StatusMapper.enable;
        payload.osVersion = deviceInfo().osVersion;
        payload.deviceName = await deviceName();
        payload.appVersion = deviceInfo().appVersion;
        payload.appBuildNo = deviceInfo().buildNumber;
        payload.deviceType = deviceInfo().deviceType;
        const expirationTime = Date.now() + result.data.expires_in * 1000;
        const userdata = {
          token: result.data.access_token,
          tokenExpirationDate: expirationTime.toString(),
          ...userResponse.data,
          ...payload,
        };

        console.log('USERDATA: ', userdata);
        dispatch(GlobalActions.updateUserdata(userdata));
        dispatch(loginSuccess(Loader.LOGIN_SUCCESS));
        dispatch(loginLoader(false));
      }
    }
  } catch (e) {
    console.log(e);
    showToast(strings('login'), 'Something went wrong', 'error');
  }
};

export const clearSession = (payload: any) => async (dispatch: any) => {
  // console.log(payload.token);
  // await revoke(AuthConfig, {
  //   tokenToRevoke: payload.token,
  //   // includeBasicAuth: true,
  //   sendClientId: true,
  // });
  const response = await makeRequestNew(
    MapperConstants.ApiTypes.POST,
    APIConstants.LOGOUT_USER,
    {},
    {},
  );

  if (response.status === 200) {
    handleAxiosToken(null, null);
    await dispatch(GlobalActions.updateUserdata(null));
    await dispatch(updateLoginResponse({}));
    await dispatch(loginSuccess({}));
    await removeItem('tfa_status');
    await removeItem('tokenExpiry');
    await removeItem('accessToken');
    Navigation.reset(Screen.Auth);
  }
};

export const registerSuccess = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: REGISTER_USER,
    payload,
  });
};

export const registerUser = (payload: any) => async (dispatch: any) => {
  dispatch(loginLoader(Loader.REGISTERATION_PROCESSED));

  console.log(payload);
  const response = await makeRequest(
    MapperConstants.ApiTypes.POST,
    APIConstants.REGISTER_USER,
    {},
    payload,
  );

  dispatch(loginLoader(MapperConstants.StatusMapper.disable));
  console.log(response.status);
  if (response.status === 201) {
    dispatch(registerSuccess({registerUserData: {registerType: 'success'}}));
  } else {
    console.log(response.data.errors.email);
    showToast(strings('register_user'), response.data.errors.email, 'error');
  }

  // dispatch(loginLoader(MapperConstants.StatusMapper.disable));

  // if (response.status === 200) {
  //   dispatch(registerSuccess({registerUserData: {registerType: 'success'}}));
  // } else {
  //   infoAlert(strings('register_user'), response.message);
  // }
};
