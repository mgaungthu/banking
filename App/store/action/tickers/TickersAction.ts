import { GET_TICKERS_LOADING, GET_TICKERS_SUCCESSFULL, GET_TICKERS_ERROR } from '../../constants/ReduxConstants';
import { socketIO } from '../../../utils/SocketUtil';
import { TickerActions } from '../..';

export const getTickers = () => async (dispatch: any) => {
    try {
        if (socketIO?.connected) {
            dispatch({ type: GET_TICKERS_LOADING });
            socketIO?.on("summary.query", (responce) => {
                const tickers = JSON.parse(responce) || []
                dispatch({ type: GET_TICKERS_SUCCESSFULL, payload: tickers });
                dispatch(TickerActions.updateTickers(tickers))
            });
            socketIO?.emit("message", {
                id: 1,
                jsonrpc: "2.0",
                method: "summary.query",
                params: {}
            });
        }
        else {
            dispatch({ type: GET_TICKERS_ERROR });
        }
    }
    catch (ex) {
        dispatch({ type: GET_TICKERS_ERROR });
    }
}
