import {createReducer} from '../../ReducerUtil';
import {KYB_DATA, RESET_INITIAL} from '../../constants/ReduxConstants';

const initialState = {
  kybdata: {
    basicInfo: {},
    docsInfo: {},
    licenseInfo: {},
    contactDetail: {},
  },
  step: 0,
};

export const updateKYBFormData = (state: any, payload: any) => {
  let data = {};
  if (payload.step === 0) {
    data = {basicInfo: {...payload}};
  } else if (payload.step === 1) {
    data = {docsInfo: {...payload}};
  } else if (payload.step === 2) {
    data = {licenseInfo: {...payload}};
  } else if (payload.step === 3) {
    data = {contactDetail: {...payload}};
  } else {
    data = {confirmation: {...payload}};
  }
  return {
    ...state,
    kybdata: {...state.kybdata, ...data},
    step: payload.step === state.step ? state.step + 1 : state.step,
  };
};

export const resetToInitial = (state: any) => {
  return {
    ...state,
    kybdata: {},
    step: 0,
  };
};

export default createReducer(initialState, {
  [KYB_DATA]: updateKYBFormData,
  [RESET_INITIAL]: resetToInitial,
});
