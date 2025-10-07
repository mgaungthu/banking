import {createReducer} from '../../ReducerUtil';
import {
  UPDATE_CONNECTIVITY_STATUS,
  UPDATE_USERDATA,
  UPDATE_APP_APPROACH,
  UPDATE_PASSCODE_STATUS,
  SET_BIOMETRIC_TYPE,
  SET_BIOMETRY,
  UPDATE_THEME,
  HIDE_SMALL_BALANCES,
  UPDATE_BALANCE_VISIBILITY,
  GET_ASSET_METADATA,
  UPDATE_FAVOURITE,
  UPDATE_MAIN_CURRENCY,
  UPDATE_SECONDARY_CURRENCY,
  UPDATE_FAVOURITE_SPOT,
  UPDATE_COLOR,
  UPDATE_REGION,
  UPDATE_SERVER_REACHABILITY,
} from '../../constants/ReduxConstants';
import {MapperConstants} from '../../../constants';
import {AppColor, AppTheme} from '../../../enums';
import {DEFAULT_REGION} from '../../../constants/DefaultArray';

const initialState = {
  internetAvailable: true,
  userdata: null,
  isRtlApproach: MapperConstants.StatusMapper.disable,
  isPasscodeEnable: MapperConstants.StatusMapper.disable,
  biometryType: '',
  isBioAuthConfigure: MapperConstants.StatusMapper.disable,
  appTheme: AppTheme.dark,
  appColor: AppColor.pink,
  isSmallBalanceHidden: MapperConstants.StatusMapper.disable,
  isBalanceHidden: MapperConstants.StatusMapper.enable,
  assetMetadata: [],
  announcementMeta: [],
  favouriteTickers: [],
  mainCurrency: 'USD',
  secondCurrency: 'BTC',
  favouriteSpot: [],
  isInternetReachable: MapperConstants.StatusMapper.disable,
  isServerReachable: false,
  region: DEFAULT_REGION,
};

export const updateServerReachability = (state: any, payload: any) => {
  return {
    ...state,
    ...payload,
  };
};

export const updateConnectivity = (state: any, payload: any) => {
  return {
    ...state,
    ...payload,
  };
};

export const updateUserdata = (state: any, payload: any) => {
  return {
    ...state,
    userdata: payload,
  };
};

export const updateAppApproach = (state: any, payload: any) => {
  return {
    ...state,
    isRtlApproach: payload,
  };
};

export const updatePasscodeStatus = (state: any, payload: any) => {
  return {
    ...state,
    isPasscodeEnable: payload,
  };
};

export const setBiometryType = (state: any, payload: any) => {
  return {
    ...state,
    biometryType: payload,
  };
};

export const setBiometry = (state: any, payload: any) => {
  return {
    ...state,
    isBioAuthConfigure: payload,
  };
};

export const changeAppearance = (state: any, payload: any) => {
  return {
    ...state,
    appTheme: payload,
  };
};

export const changeRegion = (state: any, payload: any) => {
  return {
    ...state,
    region: payload,
  };
};

export const changeColor = (state: any, payload: any) => {
  return {
    ...state,
    appColor: payload,
  };
};

export const hideSmallBalances = (state: any, payload: any) => {
  return {
    ...state,
    isSmallBalanceHidden: !state.isSmallBalanceHidden,
  };
};

export const updateBalanceVisibility = (state: any, payload: any) => {
  return {
    ...state,
    isBalanceHidden: !state.isBalanceHidden,
  };
};
export const updateObject = (state: any, payload: any) => {
  return {
    ...state,
    ...payload,
  };
};
export default createReducer(initialState, {
  [UPDATE_CONNECTIVITY_STATUS]: updateConnectivity,
  [UPDATE_USERDATA]: updateUserdata,
  [UPDATE_APP_APPROACH]: updateAppApproach,
  [UPDATE_PASSCODE_STATUS]: updatePasscodeStatus,
  [SET_BIOMETRIC_TYPE]: setBiometryType,
  [SET_BIOMETRY]: setBiometry,
  [UPDATE_THEME]: changeAppearance,
  [HIDE_SMALL_BALANCES]: hideSmallBalances,
  [UPDATE_BALANCE_VISIBILITY]: updateBalanceVisibility,
  [GET_ASSET_METADATA]: updateObject,
  [UPDATE_FAVOURITE]: updateObject,
  [UPDATE_MAIN_CURRENCY]: updateObject,
  [UPDATE_SECONDARY_CURRENCY]: updateObject,
  [UPDATE_FAVOURITE_SPOT]: updateObject,
  [UPDATE_COLOR]: changeColor,
  [UPDATE_REGION]: changeRegion,
  [UPDATE_SERVER_REACHABILITY]: updateServerReachability,
});
