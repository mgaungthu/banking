import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {CurrentConfig} from '../../api_config';
import {getItem} from '../utils';

export const postConfig = {
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
};

export const formDataConfig = {
  headers: {'Content-Type': 'application/form-data'},
};

export const multiPartConfig = {
  headers: {'Content-Type': 'multipart/form-data'},
  cache: false,
};

// CurrentConfig.api_url = '"https://banco.conadepoa.mx';

export const axiosInstance = axios.create({
  baseURL: `${CurrentConfig.api_url}`,
  headers: {Origin: CurrentConfig.origin},
});

export const axiosInstanceStaking = axios.create({
  baseURL: CurrentConfig.staking_api_url,
  headers: {Origin: CurrentConfig.origin},
});

export const axiosInstancePaymentGateway = axios.create({
  baseURL: CurrentConfig.merchant_api,
  headers: {Origin: CurrentConfig.origin},
});

export const handleAxiosToken = (AUTH_TOKEN: any, expiresIn: any) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${AUTH_TOKEN}`;
  axiosInstanceStaking.defaults.headers.common.Authorization = `Bearer ${AUTH_TOKEN}`;
  axiosInstance.defaults.headers.common['X-CSRF-TOKEN'] = `${AUTH_TOKEN}`;
  axiosInstancePaymentGateway.defaults.headers.common.Authorization =
    AUTH_TOKEN;
  const expirationTime = Date.now() + expiresIn * 1000;
  if (AUTH_TOKEN) {
    AsyncStorage.setItem('accessToken', AUTH_TOKEN);
    AsyncStorage.setItem('tokenExpiry', expirationTime.toString());
  }
};

export const getAccessToken = async () => {
  return await AsyncStorage.getItem('accessToken'); // ✅ Retrieve token
};

export const setOrigin = (region: string) => {
  let origin = `https://${region}.globiance.com`;
  axiosInstance.defaults.headers.Origin = origin;
  axiosInstanceStaking.defaults.headers.Origin = origin;
};
