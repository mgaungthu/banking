import {MapperConstants, APIConstants} from '../../../constants'
import {Loader} from '../../../enums'
import {makeGetRequest, makeRequest} from '../../../services/ApiService'
import {showToast} from '../../../utils/GenericUtils'
import {
  BUY_GBEX,
  GBEX_HISTORY,
  GET_LIVE_PRICE,
  GET_GBEX_STATUS,
  GET_GBEX_REWARDS,
  REDEEM_REWARDS,
  GET_DRIP_LOGS,
  GET_REWARDS_HISTORY,
} from '../../constants/ReduxConstants'
import {strings} from '../../../strings'
import {AppActions, QuickBuyActions} from '../..'

export const buyGbexSuccess = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: BUY_GBEX,
    payload,
  })
}

export const buyGbex = (payload: any, resetToIntialValues: any) => async (
  dispatch: any,
) => {
  dispatch(AppActions.updateLoading(Loader.BUY_GBEX))
  const response = await makeRequest(
    MapperConstants.ApiTypes.POST,
    APIConstants.BUY_GBEX,
    {},
    payload,
  )
  dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable))
  if (response.status === 200) {
    await dispatch(QuickBuyActions.fundsList())
    dispatch(gbexHistory())
    dispatch(buyGbexSuccess(response.data))
    resetToIntialValues()
    const msg = strings('order_placed')
    showToast(strings('buy_gbex'), msg, 'success')
  } else {
    showToast(strings('buy_gbex'), response.message, 'error')
  }
}

export const gbexHistorySuccess = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: GBEX_HISTORY,
    payload,
  })
}

export const gbexHistory = () => async (dispatch: any) => {
  dispatch(AppActions.updateLoading(Loader.GBEX_HISTORY))
  const response = await makeRequest(
    MapperConstants.ApiTypes.POST,
    APIConstants.GBEX_HISTORY,
    {},
  )

  dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable))
  if (response.status === 200) {
    dispatch(gbexHistorySuccess({gbexHistory: response.data}))
  }
}

export const livePriceSuccess = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: GET_LIVE_PRICE,
    payload,
  })
}

export const getLivePrice = () => async (dispatch: any) => {
  dispatch(AppActions.updateLoading(Loader.GET_LIVE_PRICE))
  const response = await makeGetRequest(APIConstants.GET_LIVE_PRICE)
  dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable))
  if (response.status === 200) {
    dispatch(livePriceSuccess({liveCurrencyPrices: response.data}))
  }
}
export const getGbexStatusSuccess = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: GET_GBEX_STATUS,
    payload,
  })
}

export const getGbexStatus = () => async (dispatch: any) => {
  dispatch(AppActions.updateLoading(Loader.GET_GBEX_STATUS))
  const response = await makeGetRequest(APIConstants.GET_GBEX_STATUS)
  dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable))
  if (response.status === 200) {
    dispatch(getGbexStatusSuccess({gbexStatusData: response.data}))
  }
}

export const getGbexRewardSuccess = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: GET_GBEX_REWARDS,
    payload,
  })
}

export const getGbexReward = () => async (dispatch: any) => {
  dispatch(AppActions.updateLoading(Loader.GET_GBEX_REWARDS))
  const response = await makeRequest(
    MapperConstants.ApiTypes.POST,
    APIConstants.GET_GBEX_REWARDS,
    {},
  )
  dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable))
  if (response.status === 200) {
    dispatch(getGbexRewardSuccess({gbexRewardsData: response.data}))
  }
}
export const redeemRewardSuccess = () => async (dispatch: any) => {
  dispatch({
    type: REDEEM_REWARDS,
  })
}

export const redeemRewards = () => async (dispatch: any) => {
  dispatch(AppActions.updateLoading(Loader.REDEEM_REWARDS))
  const response = await makeRequest(
    MapperConstants.ApiTypes.POST,
    APIConstants.REDEEM_REWARDS,
    {},
  )
  dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable))
  if (response.status === 200) {
    dispatch(redeemRewardSuccess())
    showToast(strings('rewards'), response.message, 'success')
  } else {
    showToast(strings('rewards'), response.message, 'error')
  }
}

export const dripLogSuccess = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: GET_DRIP_LOGS,
    payload,
  })
}

export const getDripLogs = () => async (dispatch: any) => {
  dispatch(AppActions.updateLoading(Loader.GET_DRIP_LOGS))
  const response = await makeRequest(
    MapperConstants.ApiTypes.POST,
    APIConstants.GET_DRIP_LOGS,
    {},
  )
  dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable))
  if (response.status === 200) {
    const responseData:any = response.data
    dispatch(dripLogSuccess({dripLogs: responseData.history}))
  }
}
export const rewardsHistorySuccess = (payload: any) => async (
  dispatch: any,
) => {
  dispatch({
    type: GET_DRIP_LOGS,
    payload,
  })
}

export const getRewardsHistory = () => async (dispatch: any) => {
  dispatch(AppActions.updateLoading(Loader.GET_REWARDS_HISTORY))
  const response = await makeRequest(
    MapperConstants.ApiTypes.POST,
    APIConstants.GET_REWARDS_HISTORY,
    {},
  )

  dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable))
  if (response.status === 200) {
    const responseData:any = response.data
    dispatch(rewardsHistorySuccess({rewardsHistory: responseData.history}))
  }
}
