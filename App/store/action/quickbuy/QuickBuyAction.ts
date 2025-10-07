import {
  MapperConstants,
  APIConstants,
  CryptoIconConstants,
} from '../../../constants';
import {Loader} from '../../../enums';
import {makeRequest, makeRequestNew} from '../../../services/ApiService';
import {convertToFormdata, showToast} from '../../../utils/GenericUtils';
import {
  GET_FUND_BALANCE,
  GET_PAIR_DETAILS,
  QUICK_BUY,
  QUICK_BUY_SPOT_HISTORY,
  GET_PAIRS,
  GET_STABLE_COIN,
  PAIRS_ERROR,
  QUICK_BUY_TRADE_HISTORY,
} from '../../constants/ReduxConstants';
import {AppActions, AuthActions} from '../..';
import {strings} from '../../../strings';
import {ENV} from '@env';
import {CurrentConfig} from '../../../../api_config';
import {Platform} from 'react-native';
import {axiosInstance} from '../../../services/AxiosOrder';

export const DEFAULT_COIN_LOGO =
  'https://api.globiance.com/assets/wallet/default.png';

export const fundsSuccess = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: GET_FUND_BALANCE,
    payload,
  });
};

export const fundsList = () => async (dispatch: any, getState: any) => {
  dispatch(AppActions.updateLoading(Loader.GET_FUND_BALANCE));
  // dispatch(fundsSuccess(null));

  const response = await makeRequestNew(
    MapperConstants.ApiTypes.GET,
    APIConstants.GET_BOTH_WALLETS,
  );

  dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));

  if (response.status === 200) {
    const responseData: any = response?.data.data;

    const sortedResponse = responseData?.sort((a: any, b: any) => {
      if (a?.name < b?.name) return -1;
      else if (a?.name > b?.name) return 1;
      else return 0;
    });

    dispatch(updateFundsList(sortedResponse));
  } else if (response.status === 401) {
    dispatch(AuthActions.clearSession({action: 'logout'}));
  }
};

export const updateFundsList =
  (payload: any) => async (dispatch: any, getState: any) => {
    const fundsList: any = payload;

    const cryptoIcons: any = CryptoIconConstants.cryptoIcons;

    if (fundsList?.length > 0 && Object.keys(cryptoIcons).length > 0) {
      let updatedFunds: any = [];
      fundsList.map((res: any) => {
        const isImgData = Object.keys(cryptoIcons).find(
          (resp: any) => resp === res?.symbol?.toUpperCase(),
        );

        // const version = isImgData?.version || 0;
        const iconUrl = cryptoIcons[isImgData];

        updatedFunds.push({
          ...res,
          assetUrl: isImgData ? iconUrl : DEFAULT_COIN_LOGO,
          version: isImgData ? 1 : null,
        });
      });

      dispatch(fundsSuccess(updatedFunds));
    }
  };
export const pairDetailsSuccess = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: GET_PAIR_DETAILS,
    payload,
  });
};

export const getPairDetails = () => async (dispatch: any, getState: any) => {
  let payload: any = {};
  payload.exchange_id = CurrentConfig.exchange_id;
  const updatedPayload = convertToFormdata(payload);
  dispatch(AppActions.updateLoading(Loader.GET_PAIR_DETAILS));
  dispatch(pairDetailsSuccess(null));
  const response = await makeRequest(
    MapperConstants.ApiTypes.POST,
    APIConstants.GET_PAIR_DETAILS,
    {},
    updatedPayload,
  );
  if (response.status === 200) {
    const pairData: any = {};
    const result: any = response.data;
    result.map((index: any) => {
      pairData[index.pairName] = index.pairId;
    });
    dispatch(
      pairDetailsSuccess({pairStatsList: result, pairDataWithId: pairData}),
    );
  }
};

export const getPrice = async (payload: any) => {
  const response = await makeRequest(
    MapperConstants.ApiTypes.POST,
    APIConstants.GET_LATEST_PRICE,
    {},
    payload,
  );
  return response;
};

export const quickBuySuccess = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: QUICK_BUY,
    payload,
  });
};

export const quickBuy =
  (payload: any, resetToIntialValues: any) => async (dispatch: any) => {
    const updatedPayload = convertToFormdata(payload);
    dispatch(AppActions.updateLoading(Loader.QUICK_BUY));
    dispatch(quickBuySuccess(null));
    const response = await makeRequest(
      MapperConstants.ApiTypes.POST,
      APIConstants.QUICK_BUY,
      {},
      updatedPayload,
    );
    dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));

    if (response.status === 200) {
      await dispatch(fundsList());
      dispatch(qbtSpotHistory());
      await dispatch(quickBuySuccess(response.data));
      resetToIntialValues();
      const msg = strings('order_placed');
      showToast(strings('quick_buy'), msg, 'success');
    } else {
      if (response.message) {
        showToast(strings('quick_buy'), response.message, 'error');
      }
    }
  };

export const qbtSpotHistorySuccess =
  (payload: any) => async (dispatch: any) => {
    dispatch({
      type: QUICK_BUY_SPOT_HISTORY,
      payload,
    });
  };

export const getTradeHistory = () => async (dispatch: any) => {
  dispatch(AppActions.updateLoading(Loader.QUICK_SWAP_HISTORY));
  let response;
  if (Platform.OS === 'ios') {
    const url = `${APIConstants.SWAP_BUY_HISTORY}?status=filled`;
    response = await axiosInstance.get(url);
  } else {
    response = await makeRequestNew(
      MapperConstants.ApiTypes.GET,
      APIConstants.SWAP_BUY_HISTORY,
      {},
      {},
      {status: 'filled'},
    );
  }

  dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));

  if (response?.status === 200) {
    dispatch({
      type: QUICK_BUY_TRADE_HISTORY,
      payload: response?.data.data,
    });
  } else {
    showToast(
      strings('quick_buy'),
      response?.message || 'Something went wrong',
      'error',
    );
  }
};

export const qbtSpotHistory = () => async (dispatch: any) => {
  dispatch(AppActions.updateLoading(Loader.QUICK_BUY_SPOT_HISTORY));
  const response = await makeRequest(
    MapperConstants.ApiTypes.POST,
    APIConstants.QUICK_BUY_HISTORY,
    {},
    {},
  );

  dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));

  if (response?.status === 200) {
    dispatch(qbtSpotHistorySuccess({qbtSpotHistory: response?.data}));
  } else {
    showToast(strings('quick_buy'), response.message, 'error');
  }
};

export const getImgUrl = (name: string, version = 1) => {
  return APIConstants.GET_ASSET_URL + name + `.png?v=$${version}`;
};

export const pairSuccess = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: GET_PAIRS,
    payload,
  });
};

export const getPairs = () => async (dispatch: any, getState: any) => {
  try {
    dispatch(AppActions.updateLoading(Loader.GET_PAIRS));
    dispatch(pairDetailsSuccess(null));
    const response = await makeRequestNew(
      MapperConstants.ApiTypes.GET,
      APIConstants.GET_PAIRS,
    );

    if (response.status === 200) {
      dispatch(pairSuccess({pairs: response.data.data}));

      // const responseData: any = response;
      // const receivedData =
      //   ENV === 'dev' || ENV === 'beta'
      //     ? responseData?.data?.data
      //     : responseData?.data;
      // if (receivedData?.length > 0) {
      //   const favouriteSpot = getState().globalReducer?.favouriteSpot;
      //   if (favouriteSpot && favouriteSpot?.length > 0) {
      //     receivedData.map((res: any) => {
      //       let existedData = favouriteSpot?.find(
      //         (resp: any) => resp.id === res.id,
      //       );
      //       res.isFavourite =
      //         existedData && Object.keys(existedData).length > 0
      //           ? MapperConstants.StatusMapper.enable
      //           : MapperConstants.StatusMapper.disable;
      //     });
      //     dispatch(pairSuccess({pairs: receivedData}));
      //   } else {
      //     dispatch(pairSuccess({pairs: receivedData}));
      //   }
      // } else {
      //   dispatch(pairSuccess({pairs: []}));
      // }
    } else {
      dispatch({type: PAIRS_ERROR, payload: `Error ${response.status}`});
    }
  } catch (e) {
    dispatch({type: PAIRS_ERROR, payload: e});
  } finally {
    dispatch(AppActions.updateLoading(null));
  }
};

export const getStableCoin = () => async (dispatch: any) => {
  try {
    dispatch(AppActions.updateLoading(Loader.QUICK_SWAP));
    const response = await makeRequest(
      MapperConstants.ApiTypes.GET,
      APIConstants.LIST_STABLE_COIN,
    );
    dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
    if (response.status === 200) {
      dispatch({
        type: GET_STABLE_COIN,
        payload: response.data,
      });
    } else showToast(strings('quick_buy'), response.message, 'error');
  } catch (error) {
    showToast(strings('quick_buy'), 'error', 'error');
  }
};
