import AsyncStorage from '@react-native-async-storage/async-storage';
import {MapperConstants, APIConstants, AppConstants} from '../../../constants';
import {FormConstants, Loader, Screen} from '../../../enums';
import {
  makeGetRequest,
  makeRequest,
  makeRequestNew,
} from '../../../services/ApiService';
import {
  convertToFormdata,
  infoAlert,
  showToast,
} from '../../../utils/GenericUtils';
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
import moment from 'moment';
import {navigate, setItem} from '../../../utils';
import {strings} from '../../../strings';
import {AppActions} from '../..';

import {CurrentConfig} from '../../../../api_config';

export const getCountriesSuccess = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: GET_COUNTRIES,
    payload,
  });
};

export const getCountries = () => async (dispatch: any) => {
  const response = await makeRequestNew(
    MapperConstants.ApiTypes.GET,
    APIConstants.GET_COUNTRIES,
  );
  if (response.status === 200) dispatch(getCountriesSuccess(response.data));
};

export const getIndustriesSuccess = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: GET_INDUSTRIES,
    payload,
  });
};

export const getIndustries = () => async (dispatch: any) => {
  const response = await makeRequestNew(
    MapperConstants.ApiTypes.GET,
    APIConstants.GET_INDUSTRIES,
  );
  if (response.status === 200)
    dispatch(getIndustriesSuccess(response.data.industries));
};

export const getKycSuccess = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: GET_KYC_DATA,
    payload,
  });
};

export const getKycDetails = () => async (dispatch: any) => {
  const response = await makeRequest(
    MapperConstants.ApiTypes.GET,
    APIConstants.GET_KYC_DATA,
    {},
    {},
  );
  if (response.status === 200) {
    dispatch(getKycSuccess(response.data));
  }
};

export const setKycDetails = (
  userKycData: any,
  setValue: any,
  countries: any,
) => {
  if (userKycData?.first_name) {
    setValue(FormConstants.FirstName, userKycData.first_name);
  }
  if (userKycData?.last_name) {
    setValue(FormConstants.LastName, userKycData.last_name);
  }
  if (userKycData?.gender) {
    setValue(FormConstants.Gender, MapperConstants.Gender[userKycData.gender]);
  }
  if (userKycData?.country_code) {
    const filteredCountry = countries?.find(
      (res: any) => res.shortName === userKycData?.country_code,
    );
    if (filteredCountry) {
      setValue(FormConstants.Country, filteredCountry.name);
    }
  }

  if (userKycData?.dob)
    setValue(
      FormConstants.DOB,
      moment(userKycData.dob).format(AppConstants.dateFormat),
    );

  if (userKycData?.issue_date)
    setValue(
      FormConstants.IssueDate,
      moment(userKycData.issue_date).format(AppConstants.dateFormat),
    );

  if (userKycData?.expiry_date)
    setValue(
      FormConstants.ExpiryDate,
      moment(userKycData.expiry_date).format(AppConstants.dateFormat),
    );
  if (userKycData?.tax_number && userKycData.tax_number !== 'undefined')
    setValue(FormConstants.Tax, userKycData.tax_number);

  if (userKycData?.document_number) {
    setValue(FormConstants.ProofId, userKycData.document_number);
  }
  // if (userKycData?.docId) {
  //   setValue(FormConstants.DocumentType, userKycData.docId)
  // }
};

export const updateLoading = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: LOADING_DATA,
    payload,
  });
};

export const submitKycSuccess = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: SUBMIT_KYC_DATA,
    payload,
  });
};

export const saveKycDetails = (payload: any) => async (dispatch: any) => {
  payload.exchange_id = CurrentConfig.exchange_id;
  const updatedPayload = convertToFormdata(payload);
  dispatch(updateLoading(Loader.SAVE_KYC_DATA));
  const response = await makeRequest(
    MapperConstants.ApiTypes.POST,
    APIConstants.SAVE_KYC_DATA,
    {},
    updatedPayload,
  );
  dispatch(updateLoading(MapperConstants.StatusMapper.disable));
  showToast(strings('saving_kyc'), response.message, 'info');
};

export const submitKycDetails = (payload: any) => async (dispatch: any) => {
  payload.exchange_id = CurrentConfig.exchange_id;
  const updatedPayload = convertToFormdata(payload);
  dispatch(updateLoading(Loader.SUBMIT_KYC_DATA));
  const response = await makeRequest(
    MapperConstants.ApiTypes.POST,
    APIConstants.GET_SHUFTI_TOKEN,
    {},
    updatedPayload,
  );
  if (response.status === 200) {
    dispatch(submitKycSuccess(response.data));
    let res: any = response.data;
    navigate(Screen.VerifyKyc, {
      url: res.verification_url,
    });
  }
  dispatch(updateLoading(MapperConstants.StatusMapper.disable));
  showToast('', strings('verifying_kyc'), 'info');
};

export const getUserProfileSuccess =
  (payload: any) => async (dispatch: any) => {
    dispatch({
      type: GET_USER_PROFILE,
      payload,
    });
  };

export const getUserProfile = () => async (dispatch: any, getState: any) => {
  dispatch(updateLoading(Loader.GET_USER_PROFILE));
  const response = await makeRequestNew(
    MapperConstants.ApiTypes.GET,
    APIConstants.GET_USER_PROFILE,
  );

  if (response.data.id) {
    dispatch(getUserProfileSuccess(response.data));
    updateTfaStatus(response.data);
  }
  dispatch(updateLoading(MapperConstants.StatusMapper.disable));
};

const updateTfaStatus = async (data: any) => {
  let tfaStatusCode: number;
  if (data.two_fa_enabled == 'enable' || data.two_fa_enabled == 1) {
    tfaStatusCode = 1;
    setItem('tfa_status', tfaStatusCode);
  } else if (
    data.tfaStatus == 'disable' ||
    data.tfaStatus == 0 ||
    data == null ||
    data == 'null'
  ) {
    tfaStatusCode = 0;
    setItem('tfa_status', tfaStatusCode);
  }
};

export const updateUserProfile =
  (payload: any) => async (dispatch: any, getState: any) => {
    payload.user_id = getState().globalReducer.userdata.uniqueId;
    const updatedPayload = convertToFormdata(payload);
    dispatch(updateLoading(Loader.UPDATE_USER_PROFILE));
    const response = await makeRequest(
      MapperConstants.ApiTypes.POST,
      APIConstants.UPDATE_USER_PROFILE,
      {},
      updatedPayload,
    );
    dispatch(updateLoading(MapperConstants.StatusMapper.disable));
    if (response.status === 200) {
      dispatch(getUserProfile());
      showToast(strings('updating_profile'), response.message, 'success');
    } else {
      showToast(strings('updating_profile'), response.message, 'error');
    }
  };

export const changePassword =
  (payload: any, responseFunc: any) => async (dispatch: any, getState: any) => {
    payload.user_id = getState().globalReducer.userdata.uniqueId;
    const updatedPayload = convertToFormdata(payload);
    dispatch(updateLoading(Loader.CHANGE_PASSWORD_PROCESSED));
    const response = await makeRequest(
      MapperConstants.ApiTypes.POST,
      APIConstants.CHANGE_PASSWORD,
      {},
      updatedPayload,
    );
    dispatch(updateLoading(MapperConstants.StatusMapper.disable));
    if (response.status === 200) {
      responseFunc();
      showToast(strings('change_password'), response.message, 'success');
    } else {
      infoAlert(strings('change_password'), response.message);
    }
  };

export const setUserProfileData = (
  userProfileData: any,
  setValue: any,
  countries: any,
) => {
  setValue(
    FormConstants.Name,
    `${userProfileData.firstName} ${userProfileData.lastName}`,
  );
  setValue(FormConstants.Email, userProfileData.email);
  setValue(FormConstants.FirstName, userProfileData?.kyc_record?.first_name);
  setValue(FormConstants.LastName, userProfileData?.kyc_record?.last_name);
  if (userProfileData.countryName) {
    setValue(FormConstants.Country, userProfileData.countryName);
  }
  if (userProfileData.city) {
    setValue(FormConstants.City, userProfileData.city);
  }
  if (userProfileData.state) {
    setValue(FormConstants.State, userProfileData.state);
  }
  if (userProfileData.address) {
    setValue(FormConstants.StreetAddress, userProfileData.address);
  }
  if (userProfileData.mobileNo) {
    setValue(FormConstants.PhoneNumber, userProfileData.mobileNo);
  }
  if (userProfileData.postalCode) {
    setValue(FormConstants.PostalCode, userProfileData.postalCode);
  }
  if (userProfileData?.isMinor && userProfileData?.parent1) {
    setValue(FormConstants.Parent1, userProfileData.parent1);
  }
  if (userProfileData?.isMinor && userProfileData?.parent1) {
    setValue(FormConstants.Parent1, userProfileData.parent1);
  }
  if (userProfileData?.isMinor && userProfileData?.parent2) {
    setValue(FormConstants.Parent2, userProfileData.parent2);
  }
  if (userProfileData.mobileISD) {
    setValue(FormConstants.CountryCode, '+' + userProfileData.mobileISD);
  }
};

export const updateAlertData = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: UPDATE_CUSTOM_ALERT,
    payload,
  });
};

export const getStatisticsSuccess = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: GET_STATISTICS,
    payload,
  });
};

export const getStatistics = () => async (dispatch: any) => {
  dispatch(AppActions.updateLoading(Loader.GET_STATISTICS));
  const response = await makeGetRequest(APIConstants.STATISTICS, {});
  dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
  if (response.status === 200) {
    dispatch(getStatisticsSuccess(response.data));
  }
};

export const annoucementSuccess = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: GET_ANNOUNCEMENTS,
    payload,
  });
};

export const announcementList = () => async (dispatch: any, getState: any) => {
  try {
    dispatch(AppActions.updateLoading(Loader.GET_ANNOUNCEMENTS));

    const name = 'announcements';

    const storageResponse = await AsyncStorage.getItem(name);

    if (storageResponse) {
      const announces = JSON.parse(storageResponse);
      dispatch(updateAnnouncementList(announces));
      dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
    }

    const response = await makeRequest(
      MapperConstants.ApiTypes.GET,
      APIConstants.GET_ANNOUNCEMENTS,
      {},
      {},
    );

    if (response && response?.status === 200) {
      const responseData: any = response.data.data;
      dispatch(updateAnnouncementList(responseData));
      await AsyncStorage.setItem(name, JSON.stringify(responseData));
    }
    dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
  } catch (err) {
    console.log(err);
  }
};

export const updateAnnouncementList =
  (payload: any) => async (dispatch: any, getState: any) => {
    const announcementList: any = payload;
    dispatch(annoucementSuccess(announcementList));
  };

// KYB details

export const getKybSuccess = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: GET_KYB_DATA,
    payload,
  });
};

export const getKybDetails = () => async (dispatch: any) => {
  const response = await makeRequest(
    MapperConstants.ApiTypes.GET,
    APIConstants.GET_KYB_DATA,
    {},
    {},
  );
  if (response.status === 200) {
    dispatch(getKybSuccess(response.data));
  }
};

export const setKybDetails = (
  userKybData: any,
  setValue: any,
  countries: any,
) => {
  if (userKybData?.companyName) {
    setValue(FormConstants.CompanyName, userKybData.companyName);
  }
  if (userKybData?.country_code) {
    const filteredCountry = countries?.find(
      (res: any) => res.countryId === userKybData?.countryId,
    );
    if (filteredCountry) {
      setValue(FormConstants.Country, filteredCountry.name);
    }
  }

  if (userKybData?.companyNo) {
    setValue(FormConstants.RegisterationNo, userKybData.companyNo);
  }

  if (userKybData?.regDate)
    setValue(
      FormConstants.RegisterationDate,
      moment(userKybData.regDate).format(AppConstants.dateFormat),
    );

  if (userKybData?.address)
    setValue(FormConstants.Address, userKybData?.address);
  if (userKybData?.city) setValue(FormConstants.City, userKybData?.city);
  if (userKybData?.state) setValue(FormConstants.State, userKybData?.state);
  if (userKybData?.postalCode)
    setValue(FormConstants.PostalCode, userKybData?.postalCode);
  if (userKybData?.vat_number)
    setValue(FormConstants.Vat, userKybData?.vat_number);
  if (userKybData?.tax_number)
    setValue(FormConstants.TaxNo, userKybData?.tax_number);
};

export const submitKybSuccess = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: SUBMIT_KYB_DATA,
    payload,
  });
};

export const saveKybDetails = (payload: any) => async (dispatch: any) => {
  payload.exchange_id = CurrentConfig.exchange_id;
  const updatedPayload = convertToFormdata(payload);
  dispatch(updateLoading(Loader.SAVE_KYB_DATA));
  const response = await makeRequest(
    MapperConstants.ApiTypes.POST,
    APIConstants.SAVE_KYB_DATA,
    {},
    updatedPayload,
  );
  dispatch(updateLoading(MapperConstants.StatusMapper.disable));
  showToast(strings('saving_kyb'), response.message, 'info');
};

export const submitKybDetails = (payload: any) => async (dispatch: any) => {
  payload.exchange_id = CurrentConfig.exchange_id;
  const updatedPayload = convertToFormdata(payload);
  dispatch(updateLoading(Loader.SUBMIT_KYB_DATA));
  const response = await makeRequest(
    MapperConstants.ApiTypes.POST,
    APIConstants.GET_SHUFTI_TOKEN_KYB,
    {},
    updatedPayload,
  );
  if (response.status === 200) {
    dispatch(submitKybSuccess(response.data));
    let res: any = response.data;
    navigate(Screen.VerifyKyb, {
      url: res.verification_url,
    });
  }
  dispatch(updateLoading(MapperConstants.StatusMapper.disable));
  showToast('', strings('verifying_kyb'), 'info');
};

export const getAllowedRegion = () => async (dispatch: any) => {
  try {
    const response = await makeGetRequest(APIConstants.APPROVE_REGION);
    if (response.status === 200) {
      dispatch({
        type: GET_ALLOWED_REGION,
        payload: response.data,
      });
    }
  } catch (e) {
    console.log(e);
  }
};
