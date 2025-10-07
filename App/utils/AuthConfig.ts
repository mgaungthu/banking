import {CurrentConfig} from '../../api_config';

const authEndpoint = `${CurrentConfig.base_url}oauth/authorize`;
const tokenEndpoint = `${CurrentConfig.base_url}oauth/token-mobile`;

export const AuthConfig = {
  issuer: `${CurrentConfig.base_url}`,
  clientId: '3',
  redirectUrl: 'aaa://callback',
  scopes: ['manage_orders'],
  additionalParameters: {prompt: 'login'},
  serviceConfiguration: {
    authorizationEndpoint: authEndpoint,
    tokenEndpoint: tokenEndpoint,
  },
};
