import {MapperConstants, APIConstants} from '../../../constants';
import {Loader} from '../../../enums';
import {makeRequestNew} from '../../../services/ApiService';
import {GET_MARKET_LIST} from '../../constants/ReduxConstants';
import {AppActions} from '../..';

export const getMarketList = () => async (dispatch: any) => {
  try {
    const response = await makeRequestNew(
      MapperConstants.ApiTypes.GET,
      APIConstants.GET_MARKETS,
    );
    if (response.status === 200) {
      dispatch(getMarketListSuccess(response.data.data));
    }
  } catch (error) {}
};

export const getMarketListSuccess = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: GET_MARKET_LIST,
    payload,
  });
};
