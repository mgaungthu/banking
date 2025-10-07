import {GenericFunctions} from '../utils';
import {axiosInstance} from './AxiosOrder';

export const makeDownloadRequest = async (
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
  };
  try {
    const response = await axiosInstance({
      method,
      url: url,
      headers: headers,
      params: queryStringParams,
      data: data,
      responseType: 'blob',
      timeout: 20000,
    });

    returnValue.status = response.status;
    returnValue.data = response.data.data;
    returnValue.message = 'data retrieved';
    return returnValue;
  } catch (error: any) {
    returnValue.status = 0;
    returnValue.data = error.response.data;
    returnValue.data = error.response.data.message;
    return returnValue;
  }
};

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

    if (url === 'user/userfee') {
      return {
        data: response.data,
        status: response.status,
      };
    }
    requestDurationInMs = Date.now() - startTime;
    returnValue.status = response.data.statusCode || response?.data?.status;
    returnValue.data = response.data.data;
    returnValue.message = response.data.message;
    returnValue.responseTime = requestDurationInMs;

    if (response.data.message === 'please login again.') {
      GenericFunctions.sessionExpired(response.data.message);
    }
    return response;
  } catch (error: any) {
    requestDurationInMs = Date.now() - startTime;
    returnValue.status = 0;
    returnValue.data = error?.response?.data;
    returnValue.message = error?.response?.data?.message;
    returnValue.responseTime = requestDurationInMs;
    return returnValue;
  }
};

export const makeRequestNew = async (
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

    // requestDurationInMs = Date.now() - startTime;
    // returnValue.status = response?.data?.status;
    // returnValue.data = response.data;
    // returnValue.responseTime = requestDurationInMs;

    // returnValue.message = response.data.message;

    // if (response.data.message === 'please login again.') {
    //   GenericFunctions.sessionExpired(response.data.message);
    // }

    return response;
  } catch (error: any) {
    requestDurationInMs = Date.now() - startTime;
    returnValue.status = 0;
    returnValue.data = error?.response?.data;
    returnValue.message = error?.response?.data?.message;
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
  };
  const startTime = Date.now();
  let requestDurationInMs;
  try {
    const response = await axiosInstance.get(`${url}`, {
      params: queryStringParams,
    });

    requestDurationInMs = Date.now() - startTime;
    if (response.data.data) {
      returnValue.status = response.data.statusCode || response.data.status;
      returnValue.data = response.data.data;
      returnValue.message = response.data.message;
      returnValue.responseTime = requestDurationInMs;
    }
    if (response.data.message === 'please login again.') {
      GenericFunctions.sessionExpired(response.data.message);
    }
    return returnValue;
  } catch (error) {
    requestDurationInMs = Date.now() - startTime;
    returnValue.status = 0;
    returnValue.data = error?.response?.data;
    returnValue.data = error?.response?.data?.message;
    returnValue.responseTime = requestDurationInMs;
    return returnValue;
  }
};

export const makeGetRequest2 = async (
  url: string,
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
    const response = await axiosInstance.get(`${url}`, {
      params: queryStringParams,
      timeout: 5000,
    });
    requestDurationInMs = Date.now() - startTime;
    if (response.data.data) {
      returnValue.status = response.data.statusCode || response.data.status;
      returnValue.data = response.data.data;
      returnValue.message = response.data.message;
      returnValue.responseTime = requestDurationInMs;
    }
    if (response.data.message === 'please login again.') {
      GenericFunctions.sessionExpired(response.data.message);
    }
    return returnValue;
  } catch (error) {
    requestDurationInMs = Date.now() - startTime;
    returnValue.status = 0;
    returnValue.data = error?.response?.data;
    returnValue.data = error?.response?.data?.message;
    returnValue.responseTime = requestDurationInMs;
    return returnValue;
  }
};
