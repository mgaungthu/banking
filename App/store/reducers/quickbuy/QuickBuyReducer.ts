import {PAIRS_ERROR, QUICK_BUY_TRADE_HISTORY} from './../../constants/ReduxConstants';
import {createReducer} from '../../ReducerUtil';
import {
  GET_FUND_BALANCE,
  GET_PAIR_DETAILS,
  QUICK_BUY,
  QUICK_BUY_SPOT_HISTORY,
  GET_PAIRS,
  GET_STABLE_COIN,
} from '../../constants/ReduxConstants';

const initialState = {
  fundsList: [],
  pairStatsList: null,
  pairDataWithId: null,
  quickBuyResponse: null,
  qbtSpotHistory: [],
  tradeHistory: [],
  pairs: [],
  pairsError: '',
  stableCoins: {},
};

export const fundsSuccess = (state: any, payload: any) => {
  return {
    ...state,
    fundsList: payload,
  };
};

export const quickBuySuccess = (state: any, payload: any) => {
  return {
    ...state,
    quickBuyResponse: payload,
  };
};

export const tradeHistorySuccess = (state : any, payload : any) => {
  return {
    ...state,
    tradeHistory: [...payload]
  };
};

export const updateState = (state: any, payload: any) => {
  return {
    ...state,
    ...payload,
    pairsError: '',
  };
};

export const stableCoinSuccess = (state: any, payload: any) => {
  return {
    ...state,
    stableCoins: payload,
  };
};

export const pairsError = (state: any, payload: any) => {
  return {
    ...state,
    pairsError: payload,
  };
};

export default createReducer(initialState, {
  [GET_FUND_BALANCE]: fundsSuccess,
  [GET_PAIR_DETAILS]: updateState,
  [QUICK_BUY]: quickBuySuccess,
  [QUICK_BUY_SPOT_HISTORY]: updateState,
  [QUICK_BUY_TRADE_HISTORY]: tradeHistorySuccess,
  [GET_PAIRS]: updateState,
  [GET_STABLE_COIN]: stableCoinSuccess,
  [PAIRS_ERROR]: pairsError,
});
