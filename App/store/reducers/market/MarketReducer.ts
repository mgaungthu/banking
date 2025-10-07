import {createReducer} from '../../ReducerUtil';
import {GET_MARKET_LIST} from '../../constants/ReduxConstants';

const initialState = {
  markets: [],
};

export const updateMarket = (state: any, payload: any) => {
  return {
    ...state,
    markets: [...payload],
  };
};

export default createReducer(initialState, {
  [GET_MARKET_LIST]: updateMarket,
});
