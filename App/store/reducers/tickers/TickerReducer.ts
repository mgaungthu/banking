import {createReducer} from '../../ReducerUtil'
import {UPDATE_TICKERS} from '../../constants/ReduxConstants'

const initialState = {
  tickers: [],
}

export const updateTickers = (state: any, payload: any) => {
  return {
    ...state,
    ...payload,
  }
}

export default createReducer(initialState, {
  [UPDATE_TICKERS]: updateTickers,
})
