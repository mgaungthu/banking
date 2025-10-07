import {createReducer} from '../../ReducerUtil'
import {
  BUY_GBEX,
  GBEX_HISTORY,
  GET_LIVE_PRICE,
  GET_GBEX_STATUS,
  GET_GBEX_REWARDS,
  REDEEM_REWARDS,
  GET_DRIP_LOGS,
  GET_REWARDS_HISTORY
} from '../../constants/ReduxConstants'

const initialState = {
  gbexBuyResponse: null,
  gbexHistory: [],
  liveCurrencyPrices: [],
  gbexStatusData: [],
  gbexRewardsData: [],
  dripLogs:[],
  rewardsHistory:[]
}

export const buyGbexSuccess = (state: any, payload: any) => {
  return {
    ...state,
    gbexBuyResponse: payload,
  }
}

export const updateObject = (state: any, payload: any) => {
  return {
    ...state,
    ...payload,
  }
}
export default createReducer(initialState, {
  [BUY_GBEX]: buyGbexSuccess,
  [GBEX_HISTORY]: updateObject,
  [GET_LIVE_PRICE]: updateObject,
  [GET_GBEX_STATUS]: updateObject,
  [GET_GBEX_REWARDS]: updateObject,
  [REDEEM_REWARDS]: updateObject,
  [GET_DRIP_LOGS]:updateObject,
  [GET_REWARDS_HISTORY]:updateObject
})
