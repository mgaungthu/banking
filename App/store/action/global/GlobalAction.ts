import {GlobalActions, QuickBuyActions, TickerActions} from '../..';
import {MapperConstants, APIConstants} from '../../../constants';
import {BiometryType, StringConstants} from '../../../enums';
import {makeGetRequest} from '../../../services/ApiService';
import {setOrigin} from '../../../services/AxiosOrder';
import {showToast} from '../../../utils/GenericUtils';
import {
  UPDATE_CONNECTIVITY_STATUS,
  UPDATE_USERDATA,
  UPDATE_APP_APPROACH,
  UPDATE_PASSCODE_STATUS,
  SET_BIOMETRIC_TYPE,
  SET_BIOMETRY,
  UPDATE_THEME,
  HIDE_SMALL_BALANCES,
  UPDATE_BALANCE_VISIBILITY,
  GET_ASSET_METADATA,
  UPDATE_FAVOURITE,
  UPDATE_MAIN_CURRENCY,
  UPDATE_SECONDARY_CURRENCY,
  UPDATE_FAVOURITE_SPOT,
  UPDATE_COLOR,
  UPDATE_REGION,
  UPDATE_SERVER_REACHABILITY,
} from '../../constants/ReduxConstants';

export const updateConnectivity = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: UPDATE_CONNECTIVITY_STATUS,
    payload,
  });
};

export const updateServerReachability =
  (payload: any) => async (dispatch: any) => {
    dispatch({
      type: UPDATE_SERVER_REACHABILITY,
      payload,
    });
  };

export const updateUserdata = (payload: any) => async (dispatch: any) => {
  if (payload === null) {
    await dispatch(GlobalActions.setBiometryType(BiometryType.Unknown));
    await dispatch(
      GlobalActions.updatePasscodeStatus(MapperConstants.StatusMapper.disable),
    );
    await dispatch(
      GlobalActions.setBiometry(MapperConstants.StatusMapper.disable),
    );
  }
  dispatch({
    type: UPDATE_USERDATA,
    payload,
  });
};

export const updateAppApproach = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: UPDATE_APP_APPROACH,
    payload,
  });
};

export const updatePasscodeStatus = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: UPDATE_PASSCODE_STATUS,
    payload,
  });
};

export const setBiometryType = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: SET_BIOMETRIC_TYPE,
    payload,
  });
};

export const setBiometry = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: SET_BIOMETRY,
    payload,
  });
};

export const changeAppearance = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: UPDATE_THEME,
    payload,
  });
};

export const changeRegion = (payload: any) => async (dispatch: any) => {
  payload = payload.toLowerCase();
  setOrigin(payload);
  dispatch({
    type: UPDATE_REGION,
    payload,
  });
};

export const hideSmallBalances = () => async (dispatch: any) => {
  dispatch({
    type: HIDE_SMALL_BALANCES,
  });
};

export const updateBalanceVisibility = () => async (dispatch: any) => {
  dispatch({
    type: UPDATE_BALANCE_VISIBILITY,
  });
};

export const getAssetMetadataSuccess =
  (payload: any) => async (dispatch: any) => {
    dispatch({
      type: GET_ASSET_METADATA,
      payload,
    });
  };

export const getAssetMetadata = () => async (dispatch: any) => {
  const response = await makeGetRequest(APIConstants.GET_ASSETMETADATA, {});
  if (response.status === 200) {
    let receivedData: any = response.data;
    let updatedData: any = [];
    Object.keys(receivedData.WALLET).forEach(key => {
      updatedData.push({
        currency: key,
        version: receivedData.WALLET[key],
      });
    });
    let updatedAnnouncementData: any = [];
    Object.keys(receivedData.ANNOUNCEMENT).forEach(key => {
      updatedAnnouncementData.push({
        image: key,
        version: receivedData.ANNOUNCEMENT[key],
      });
    });
    dispatch(
      getAssetMetadataSuccess({
        assetMetadata: updatedData,
        announcementMeta: updatedAnnouncementData,
      }),
    );
  }
};

export const updateFavourite =
  (id: any, type: string) => async (dispatch: any, getState: any) => {
    if (type === StringConstants.Limit) {
      const tickers = getState().tickerReducer.tickers;
      tickers.map((res: any) => {
        res.isFavourite =
          res.id === id
            ? !res.isFavourite
            : res.isFavourite
            ? res.isFavourite
            : MapperConstants.StatusMapper.disable;
        if (res.id === id && res.isFavourite)
          showToast('', 'Added to favourites', 'success');
      });
      dispatch(TickerActions.updateTickers(tickers));
      dispatch(updateFavouriteSuccess(tickers));
    } else {
      const pairs = getState().quickBuyReducer.pairs;
      pairs.map((res: any) => {
        res.isFavourite =
          res.id === id
            ? !res.isFavourite
            : res.isFavourite
            ? res.isFavourite
            : MapperConstants.StatusMapper.disable;
      });
      dispatch(QuickBuyActions.pairSuccess({pairs}));
      dispatch(updateFavouriteSpot(pairs));
    }
  };
export const updateFavouriteSpot = (pairs: any) => async (dispatch: any) => {
  dispatch({
    type: UPDATE_FAVOURITE_SPOT,
    payload: {
      favouriteSpot: pairs.filter((res: any) => res.isFavourite),
    },
  });
};
export const updateFavouriteSuccess =
  (tickers: any) => async (dispatch: any) => {
    dispatch({
      type: UPDATE_FAVOURITE,
      payload: {
        favouriteTickers: tickers.filter((res: any) => res.isFavourite),
      },
    });
  };
export const updateSecondaryCurrency =
  (payload: any) => async (dispatch: any) => {
    dispatch({
      type: UPDATE_SECONDARY_CURRENCY,
      payload,
    });
  };
export const updateMainCurrency = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: UPDATE_MAIN_CURRENCY,
    payload,
  });
};

export const changeColor = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: UPDATE_COLOR,
    payload,
  });
};
