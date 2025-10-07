import {UPDATE_TICKERS} from '../../constants/ReduxConstants'

export const updateTickers = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: UPDATE_TICKERS,
    payload: {tickers: payload},
  })
}
