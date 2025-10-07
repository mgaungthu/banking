import {MapperConstants, APIConstants} from '../../../constants';
import {Loader} from '../../../enums';
import {
  makeGetRequest,
  makeRequest,
  makeRequestNew,
} from '../../../services/ApiService';
import {
  GET_BALANCE_DEPOSIT_HISTORY,
  GET_BALANCE_WITHDRAWAL_HISTORY,
  GET_CURRENCY_STATUS,
  GET_MIN_DEPOSIT_LOADING,
  GET_MIN_DEPOSIT_SUCCESSFULL,
  GET_MIN_DEPOSIT_ERROR,
  GET_WALLET_LIST,
} from '../../constants/ReduxConstants';
import {AppActions} from '../..';
import {convertToFormdata} from '../../../utils/GenericUtils';
import {CurrentConfig} from '../../../../api_config';

export const getBalanceHistorySuccess =
  (type: string, payload: any) => async (dispatch: any) => {
    dispatch({
      type:
        type === 'Deposit'
          ? GET_BALANCE_DEPOSIT_HISTORY
          : GET_BALANCE_WITHDRAWAL_HISTORY,
      payload,
    });
  };

export const getBalanceHistory =
  (type: string) => async (dispatch: any, getState: any) => {
    let payload: any = {
      type: type,
      uniqueId: getState().globalReducer.userdata.uniqueId,
      exchangeId: CurrentConfig.exchange_id,
    };
    if (type === 'Deposit') {
      dispatch(AppActions.updateLoading(Loader.GET_BALANCE_DEPOSIT_HISTORY));
    }
    if (type === 'Withdraw') {
      dispatch(AppActions.updateLoading(Loader.GET_BALANCE_WITHDRAWAL_HISTORY));
    }

    const response = await makeGetRequest(APIConstants.WALLET_HISTORY, payload);
    dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
    if (response.status === 200) {
      let responseObject =
        type === 'Deposit'
          ? {
              depositHistory: response.data,
              withdrawalHistory: getState().walletReducer.withdrawalHistory,
            }
          : {
              withdrawalHistory: response.data,
              depositHistory: getState().walletReducer.depositHistory,
            };
      dispatch(getBalanceHistorySuccess(type, responseObject));
    }
  };

export const getAddressDetails = async (payload: any) => {
  payload.exchangeId = CurrentConfig.exchange_id;
  const updatedPayload = convertToFormdata(payload);
  const response = await makeRequest(
    MapperConstants.ApiTypes.POST,
    APIConstants.GET_ADDRESS,
    {},
    updatedPayload,
  );
  return response;
};

export const getCurrencyStatusSuccess =
  (payload: any) => async (dispatch: any) => {
    dispatch({
      type: GET_CURRENCY_STATUS,
      payload,
    });
  };

export const getCurrencyStatus = () => async (dispatch: any) => {
  const response = await makeGetRequest(APIConstants.GET_CURRENCY_STATUS, {});

  if (response.status === 200) {
    let receivedData: any = response.data;
    let updatedData: any = [];
    Object.keys(receivedData).forEach(key => {
      updatedData.push({
        currency: key,
        isDeposit:
          receivedData[key][1] === 'Active'
            ? MapperConstants.StatusMapper.enable
            : MapperConstants.StatusMapper.disable,
        isWithdrawal:
          receivedData[key][2] === 'Active'
            ? MapperConstants.StatusMapper.enable
            : MapperConstants.StatusMapper.disable,
        isCrypto:
          receivedData[key][0] !== 'Fiat'
            ? MapperConstants.StatusMapper.enable
            : MapperConstants.StatusMapper.disable,
      });
    });
    dispatch(getCurrencyStatusSuccess({currencyStatusData: updatedData}));
  }
};

export const getdepositWithdrawalMin = () => async (dispatch: any) => {
  dispatch({
    type: GET_MIN_DEPOSIT_LOADING,
  });

  try {
    const response = await makeRequest(
      MapperConstants.ApiTypes.POST,
      APIConstants.MIN_DEPOSIT_URL,
      {},
    );

    console.log(response.data);

    if (response.data) {
      dispatch({
        type: GET_MIN_DEPOSIT_SUCCESSFULL,
        payload: response.data,
      });
    } else {
      dispatch({
        type: GET_MIN_DEPOSIT_ERROR,
      });
    }
  } catch {
    dispatch({
      type: GET_MIN_DEPOSIT_ERROR,
    });
  }
};

export const getWalletList = () => async (dispatch: any) => {
  try {
    const response = await makeRequestNew(
      MapperConstants.ApiTypes.GET,
      APIConstants.GET_WALLETS,
    );
    if (response.status === 200) {
      dispatch(getWalletListSuccess(response.data.data));
    }
  } catch (error) {}
};

export const getWalletListSuccess = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: GET_WALLET_LIST,
    payload,
  });
};
