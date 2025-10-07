import {ENV} from '@env';

type ApiConfig = {
  dev: Config;
  prod: Config;
};

type Config = {
  base_url: string;
  api_url: string;
  staking_api_url: string;
  web_socket_url: string;
  exchange_id: string;
  socket_token: string;
  old_socket_url: string;
  origin: string;
  merchant_api: string;
};

const api_config: ApiConfig = {
  dev: {
    base_url: 'https://uat.globiance.tech/',
    api_url: 'https://uat.globiance.tech/api/v1',
    staking_api_url: 'https://uatv3apistaking.globiance.com/',
    web_socket_url: 'wss://trdeng.globiance.com/',
    exchange_id: '08c4a640-3d77-11eb-a3e9-01b6e5789197',
    socket_token: '1',
    old_socket_url: 'https://ws.globiance.com/',
    origin: 'https://eu.globiance.com',
    merchant_api: 'https://uatmerchantapi.globiance.com/',
  },
  prod: {
    base_url: 'https://bank.gamerswallet.io/',
    api_url: 'https://bank.gamerswallet.io/api/v1',
    // base_url: 'https://uat.globiance.tech/',
    // api_url: 'https://uat.globiance.tech/api/v1',
    staking_api_url: 'https://stakingapi.globiance.com/',
    web_socket_url: 'wss://staging2trdeng.globiance.com/',
    exchange_id: '2e54a010-4063-11eb-820e-27bfaf6f90c6',
    socket_token: '231864df-d709-45c2-913c-378f8d29d1cf',
    old_socket_url: 'https://ws.globiance.com/',
    origin: 'https://eu.globiance.com',
    merchant_api: 'https://merchantapi.globiance.com/',
  },
};

const mode: 'dev' | 'prod' = ENV;

export const CurrentConfig: Config = api_config[mode];
