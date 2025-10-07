import {
  GET_TICKERS_LOADING,
  GET_TICKERS_SUCCESSFULL,
  GET_TICKERS_ERROR,
} from '../../constants/ReduxConstants';

const initialState = {
  tickers: [],
  isLoading: false,
  error: null,
};

const tickersReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case GET_TICKERS_LOADING:
      return {
        tickers: [],
        isLoading: true,
        error: null,
      };
    case GET_TICKERS_SUCCESSFULL:
      return {
        tickers: action?.payload || [],
        isLoading: false,
        error: null,
      };
    case GET_TICKERS_ERROR:
      return {
        tickers: [],
        isLoading: false,
        error: "Can't load tickers",
      };
    default:
      return state;
  }
};

export default tickersReducer;
