import {createReducer} from '../../ReducerUtil';
import {
  GET_BALANCE_DEPOSIT_HISTORY,
  GET_BALANCE_WITHDRAWAL_HISTORY,
  GET_CURRENCY_STATUS,
  GET_MIN_DEPOSIT_LOADING,
  GET_MIN_DEPOSIT_SUCCESSFULL,
  GET_MIN_DEPOSIT_ERROR,
  GET_WALLET_LIST,
} from '../../constants/ReduxConstants';

const initialState = {
  depositHistory: [],
  withdrawalHistory: [],
  currencyStatusData: [],
  depositWithdrawalMin: {
    isLoading: false,
    data: [],
    error: false,
  },
  wallets: [],
};

export const updateObject = (state: any, payload: any) => {
  return {
    ...state,
    ...payload,
  };
};

export const loadDepositWithdrawalMin = (state: any) => {
  return {
    ...state,
    depositWithdrawalMin: {
      isLoading: true,
      data: [],
      error: false,
    },
  };
};

export const depositWithdrawalMinSuccessfull = (state: any, payload: any) => {
  return {
    ...state,
    depositWithdrawalMin: {
      isLoading: false,
      data: [...payload],
      error: false,
    },
  };
};

export const errorDepositWithdrawalMin = (state: any) => {
  return {
    ...state,
    depositWithdrawalMin: {
      isLoading: false,
      data: [],
      error: true,
    },
  };
};

export const updateWallet = (state: any, payload: any) => {
  return {
    ...state,
    wallets: [...payload],
  };
};

export default createReducer(initialState, {
  [GET_BALANCE_DEPOSIT_HISTORY]: updateObject,
  [GET_BALANCE_WITHDRAWAL_HISTORY]: updateObject,
  [GET_CURRENCY_STATUS]: updateObject,
  [GET_MIN_DEPOSIT_LOADING]: loadDepositWithdrawalMin,
  [GET_MIN_DEPOSIT_SUCCESSFULL]: depositWithdrawalMinSuccessfull,
  [GET_MIN_DEPOSIT_ERROR]: errorDepositWithdrawalMin,
  [GET_WALLET_LIST]: updateWallet,
});
