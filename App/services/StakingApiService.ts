import {GenericFunctions} from '../utils';
import {axiosInstanceStaking as axiosInstance} from './AxiosOrder';

export const makeRequest = async (
  method: any,
  url: string,
  headers: any = {},
  data: any = undefined,
  queryStringParams: any = {},
) => {
  let returnValue = {
    status: 0,
    data: null,
    message: '',
    responseTime: 0,
  };
  const startTime = Date.now();
  let requestDurationInMs;
  try {
    const response = await axiosInstance({
      method,
      url: url,
      headers: headers,
      params: queryStringParams,
      data: data,
      timeout: 20000,
    });

    const {status, message} = response.data.metadata;

    requestDurationInMs = Date.now() - startTime;
    returnValue.status = status;
    returnValue.data = response.data.data;
    returnValue.message = message;
    returnValue.responseTime = requestDurationInMs;

    if (message === 'please login again.') {
      GenericFunctions.sessionExpired(message);
    }
    return returnValue;
  } catch (error: any) {
    requestDurationInMs = Date.now() - startTime;
    returnValue.status = 0;
    returnValue.data = error?.response?.data;
    returnValue.message =
      error?.response?.data?.message ||
      error?.response?.data?.metadata?.message;
    returnValue.responseTime = requestDurationInMs;
    return returnValue;
  }
};

export const makeGetRequest = async (
  url: string,
  queryStringParams: any = {},
) => {
  let returnValue = {
    status: 0,
    data: null,
    message: '',
    responseTime: 0,
    metadata: null,
  };
  const startTime = Date.now();
  let requestDurationInMs;
  try {
    const response = await axiosInstance.get(`${url}?`, {
      params: queryStringParams,
    });

    const {status, message} = response.data.metadata;

    requestDurationInMs = Date.now() - startTime;
    if (response.data.data) {
      returnValue.status = status;
      returnValue.data = response.data.data;
      returnValue.message = message;
      returnValue.metadata = response.data.metadata;
      returnValue.responseTime = requestDurationInMs;
    }
    if (message === 'please login again.') {
      GenericFunctions.sessionExpired(message);
    }
    return returnValue;
  } catch (error) {
    requestDurationInMs = Date.now() - startTime;
    returnValue.status = 0;
    returnValue.data = error?.response?.data;
    returnValue.message = error?.response?.data?.metadata?.message;
    returnValue.metadata = error?.response?.data?.metadata;
    returnValue.responseTime = requestDurationInMs;
    return returnValue;
  }
};
