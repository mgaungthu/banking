import {CurrentConfig} from '../../../../api_config';
import {makeRequest} from './../../../services/ApiService';

const ORIGIN = 'https://se.globiance.com';

export const getIeos = () => {
  return async (dispatch: any) => {
    dispatch({type: 'se_loading'});
    fetch(`${CurrentConfig.api_url}user/ieo/se/getallieos`, {
      headers: {Origin: ORIGIN},
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject('Произошла ошибка');
      })
      .then(res => {
        dispatch({type: 'se_successful', payload: res});
      })
      .catch(err => {
        console.log(err);
        dispatch({type: 'se_error'});
      });
  };
};

export const getIeoDetails = (id: number) => {
  return async (dispatch: any) => {
    dispatch({type: 'se_loadingD'});
    fetch(`${CurrentConfig.api_url}user/ieo/se/getieobyid?icoId=${id}`, {
      headers: {Origin: ORIGIN},
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject('Произошла ошибка');
      })
      .then(res => {
        dispatch({type: 'se_successfulD', payload: res.data});
      })
      .catch(err => {
        console.log(err);
        dispatch({type: 'se_errorD'});
      });
  };
};

export const getIeoRate = (id: number) => {
  return async (dispatch: any) => {
    dispatch({type: 'se_rateLoading'});
    fetch(`${CurrentConfig.api_url}user/ieo/se/get-rate?icoId=${id}`, {
      headers: {Origin: ORIGIN},
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject('Произошла ошибка');
      })
      .then(res => {
        dispatch({type: 'se_rateSuccessful', payload: res.data});
      })
      .catch(err => {
        console.log(err);
        dispatch({type: 'se_rateError'});
      });
  };
};

export const getIeoHistory = (ticker: string) => {
  return async (dispatch: any) => {
    dispatch({type: 'se_historyLoading'});
    makeRequest(
      'POST',
      `${CurrentConfig.api_url}user/ieo/se/trade-history`,
      {'Content-Type': 'application/json', Origin: ORIGIN},
      {
        ticker,
      },
    )
      .then(res => {
        dispatch({type: 'se_historySuccessful', payload: res.data});
      })
      .catch(err => {
        console.log(err);
        dispatch({type: 'se_historyError'});
      });
  };
};
