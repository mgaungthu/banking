import {
  GET_CURRENT_STAKED_END,
  GET_CURRENT_STAKED_START,
  GET_CURRENT_STAKED_SUCCESS,
  GET_CURRENT_EARNINGS_START,
  GET_CURRENT_EARNINGS_SUCCESS,
  GET_CURRENT_EARNINGS_END,
  UPDATE_STAKE_STATE,
  STAKE_DATA,
  STAKE_HISTROY_DATA,
} from '../../constants/ReduxConstants';
import {createReducer} from '../../ReducerUtil';

// const initialState = {
//   isLoadingCurrentStaked: false,
//   currentStaked: {
//     currentStaked: 0,
//     lockedStaked: 0,
//     flexibleStaked: 0,
//   },
//   isLoadingCurrentEarnings: false,
//   currentEarnings: {
//     totalEarning: 0,
//     flexibleEarning: 0,
//     lockedEarning: 0,
//   },
//   currentAccount: 0,
// };

const initialState = {
  stake: [],
  history: [],
};

// CURRENT STAKED

export const currentStakedStart = (state: any, payload: any) => {
  return {
    ...state,
    isLoadingCurrentStaked: true,
  };
};

export const currentStakedSuccess = (state: any, payload: any) => {
  return {
    ...state,
    currentStaked: payload,
  };
};

export const currentStakedEnd = (state: any, payload: any) => {
  return {
    ...state,
    isLoadingCurrentStaked: false,
  };
};

// CURRENT EARNING

export const currentEarningsStart = (state: any, payload: any) => {
  return {
    ...state,
    isLoadingCurrentEarnings: true,
  };
};

export const currentEarningsSuccess = (state: any, payload: any) => {
  return {
    ...state,
    currentEarnings: payload,
  };
};

export const currentEarningsEnd = (state: any, payload: any) => {
  return {
    ...state,
    isLoadingCurrentEarnings: false,
  };
};

// CURRENT Account

export const updateStakeState = (state: any, payload: any) => {
  return {
    ...state,
    stakeState: state.stakeState + 1,
  };
};

export const updateStake = (state: any, payload: any) => {
  return {
    ...state,
    stake: [...payload],
  };
};

export const updateStakeHistory = (state: any, payload: any) => {
  return {
    ...state,
    history: [...payload],
  };
};

export default createReducer(initialState, {
  [GET_CURRENT_STAKED_START]: currentStakedStart,
  [GET_CURRENT_STAKED_SUCCESS]: currentStakedSuccess,
  [GET_CURRENT_STAKED_END]: currentStakedEnd,
  [GET_CURRENT_EARNINGS_START]: currentEarningsStart,
  [GET_CURRENT_EARNINGS_SUCCESS]: currentEarningsSuccess,
  [GET_CURRENT_EARNINGS_END]: currentEarningsEnd,
  [UPDATE_STAKE_STATE]: updateStakeState,
  [STAKE_DATA]: updateStake,
  [STAKE_HISTROY_DATA]: updateStakeHistory,
});
