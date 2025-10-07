import {createReducer} from '../../ReducerUtil';
import {
  GET_LAUNCHPAD_LIST,
  GET_LAUNCHPAD_SETTING,
  GET_LAUNCHPAD_HISTORY,
} from '../../constants/ReduxConstants';

const initialState = {
  launchpad: [],
  setting: {},
  history: [],
};

export const updateLaunchPadList = (state: any, payload: any) => {
  return {
    ...state,
    launchpad: [...payload],
  };
};

export const updateLaunchPadSetting = (state: any, payload: any) => {
  return {
    ...state,
    setting: payload,
  };
};

export const updateLaunchPadHistory = (state: any, payload: any) => {
  return {
    ...state,
    history: payload,
  };
};

export default createReducer(initialState, {
  [GET_LAUNCHPAD_LIST]: updateLaunchPadList,
  [GET_LAUNCHPAD_SETTING]: updateLaunchPadSetting,
  [GET_LAUNCHPAD_HISTORY]: updateLaunchPadHistory,
});
