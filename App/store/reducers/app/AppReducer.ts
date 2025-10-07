import {createReducer} from '../../ReducerUtil';
import {
  GET_COUNTRIES,
  GET_KYC_DATA,
  LOADING_DATA,
  SUBMIT_KYC_DATA,
  GET_USER_PROFILE,
  UPDATE_CUSTOM_ALERT,
  GET_STATISTICS,
  GET_ANNOUNCEMENTS,
  GET_KYB_DATA,
  SUBMIT_KYB_DATA,
  GET_ALLOWED_REGION,
  GET_INDUSTRIES,
} from '../../constants/ReduxConstants';
import {MapperConstants} from '../../../constants';

const initialState = {
  countries: [],
  industries: [],
  userKycData: null,
  userKybData: null,
  loading: MapperConstants.StatusMapper.disable,
  kycSuccessData: {},
  kybSuccessData: {},
  userProfileData: null,
  isCustomAlert: MapperConstants.StatusMapper.disable,
  alertData: {
    message: '',
    title: '',
    isConfirmation: true,
    type: '',
  },
  graphData: [],
  announcements: [],
  allowedRegion: [],
};

export const updateAlertData = (state: any, payload: any) => {
  return {
    ...state,
    ...payload,
  };
};

export const getCountriesSuccess = (state: any, payload: any) => {
  return {
    ...state,
    countries: payload,
  };
};

export const getIndustriesSuccess = (state: any, payload: any) => {
  return {
    ...state,
    industries: payload,
  };
};

export const updateLoading = (state: any, payload: any) => {
  return {
    ...state,
    loading: payload,
  };
};

export const getKycSuccess = (state: any, payload: any) => {
  return {
    ...state,
    userKycData: payload,
  };
};

export const submitKycSuccess = (state: any, payload: any) => {
  return {
    ...state,
    kycSuccessData: payload,
  };
};

export const getUserProfileSuccess = (state: any, payload: any) => {
  return {
    ...state,
    userProfileData: payload,
  };
};

export const getStatisticsSuccess = (state: any, payload: any) => {
  return {
    ...state,
    graphData: payload,
  };
};
export const annoucementSuccess = (state: any, payload: any) => {
  return {
    ...state,
    announcements: payload,
  };
};

export const getKybSuccess = (state: any, payload: any) => {
  return {
    ...state,
    userKybData: payload,
  };
};

export const submitKybSuccess = (state: any, payload: any) => {
  return {
    ...state,
    kybSuccessData: payload,
  };
};

export const getAllowedRegionSuccess = (state: any, payload: any) => {
  return {
    ...state,
    allowedRegion: payload,
  };
};

export default createReducer(initialState, {
  [GET_COUNTRIES]: getCountriesSuccess,
  [GET_INDUSTRIES]: getIndustriesSuccess,
  [GET_KYC_DATA]: getKycSuccess,
  [LOADING_DATA]: updateLoading,
  [SUBMIT_KYC_DATA]: submitKycSuccess,
  [GET_USER_PROFILE]: getUserProfileSuccess,
  [UPDATE_CUSTOM_ALERT]: updateAlertData,
  [GET_STATISTICS]: getStatisticsSuccess,
  [GET_ANNOUNCEMENTS]: annoucementSuccess,
  [GET_KYB_DATA]: getKybSuccess,
  [SUBMIT_KYB_DATA]: submitKybSuccess,
  [GET_ALLOWED_REGION]: getAllowedRegionSuccess,
});
