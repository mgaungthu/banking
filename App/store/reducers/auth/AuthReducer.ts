import {createReducer} from '../../ReducerUtil';
import {
  LOGIN,
  LOGIN_ACTIVITY_LOADER,
  LOGIN_DATA,
  REGISTER_USER,
} from '../../constants/ReduxConstants';

const initialState = {
  loading: false,
  loginType: '',
  loginData: {},
  registerUserData: {},
};

export const loginSuccess = (state: any, payload: any) => {
  return {
    ...state,
    loginType: payload,
  };
};
export const registerSuccess = (state: any, payload: any) => {
  return {
    ...state,
    ...payload,
  };
};

export const loginLoader = (state: any, payload: any) => {
  return {
    ...state,
    loading: payload,
  };
};

export const updateLoginResponse = (state: any, payload: any) => {
  return {
    ...state,
    loginData: payload,
  };
};

export default createReducer(initialState, {
  [LOGIN_ACTIVITY_LOADER]: loginLoader,
  [LOGIN]: loginSuccess,
  [LOGIN_DATA]: updateLoginResponse,
  [REGISTER_USER]: registerSuccess,
});
