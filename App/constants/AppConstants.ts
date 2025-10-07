import * as Images from '../assets';
import {isIOS} from '../utils/DeviceConfig';

export const dateFormat = 'YYYY-MM-DD';
export const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';

export const tokenImages = {
  BTC: Images.currency.IcBtc,
  XRP: Images.currency.IcXrp,
  BCHABC: Images.currency.IcBchabc,
  BCHSV: Images.currency.IcBchsv,
  ETH: Images.currency.IcEth,
  USDC: Images.currency.IcUsdc,
  USDT: Images.currency.IcUsdt,
  XDC: Images.currency.IcXdc,
  XDCE: Images.currency.IcXdce,
  EUR: Images.currency.IcEur,
  GBEX: Images.currency.IcGbex,
  PLI: Images.currency.IcPli,
  LGCY: Images.currency.IcLgcy,
};

export const MinimumTradeAmount = {
  'XRP-BTC': 10,
  'ETH-BTC': 0.01,
  'ETH-EUR': 0.01,
  'BTC-EUR': 0.001,
  'SGDG-SGD': 1,
  'HKDG-HKD': 1,
  'GBPG-GBP': 1,
  'EURG-EUR': 1,
  'USDG-USD': 1,
  'XRP-EUR': 10,
};

export const QuickSelectAmount = {
  EUR: [100, 200, 300, 500, 1000],
  BTC: [0.01, 0.02, 0.03, 0.05, 0.1],
  ETH: [0.1, 0.2, 0.3, 0.5, 1],
  SGD: [],
};

export const bitfinexPairs = [];

export const liquidPairs = [];

export const indoDexPairs = [];

export const swapPairs = [
  'SGDG-SGD',
  'EURG-EUR',
  'USDG-USD',
  'HKDG-HKD',
  'GBPG-GBP',
  'WXDC-XDC',
  'USDG-USDT',
  'USDG-USDC',
];

const swap = [
  'USDG-USD',
  'USDG-USDT',
  'USDG-USDC',
  'USD-USDG',
  'USDT-USDG',
  'SGDG-SGD',
  'SGD-SGDG',
  'GBPG-GBP',
  'GBP-GBPG',
  'HKDG-HKD',
  'HKD-HKDG',
  'WXDC-XDC',
  'XDC-WXDC',
  'USDC-USDG',
  'EURG-EUR',
  'EUR-EURG',
];

export const marginPairs = ['BTC-PERPETUAL', 'ETH-PERPETUAL'];
export const defaultDecimals = 2;

export const minPriceShow = {
  'XDC-ETH': 10,
  'XDC-BTC': 10,
  'XDC-XRP': 10,
  'XDC-XDCE': 1,
  'XDC-USDT': 10,
  'XDC-USDC': 10,
  'ETH-USDT': 100000,
  'BTC-USDC': 100000,
  'XRP-USDT': 10,
  'BTC-USDT': 100000,
};

export const QuickBuyDefault = {
  'ETH-BTC': 5,
  'BTC-EUR': 0.1,
  'ETH-EUR': 5,
  'XRP-BTC': 100,
  'XRP-EUR': 100,
};

export const FiatCurrency = [
  {value: 'EUR', label: 'EUR'},
  {value: 'USD', label: 'USD'},
  {value: 'SGD', label: 'SGD'},
  {value: 'AUD', label: 'AUD'},
  {value: 'INR', label: 'INR'},
];

export const FiatCurrencyPowerCash = [{value: 'EUR', label: 'EUR'}];
export const intervalTimeout = 10000;
export const minTradeAmountXRPUSDT = 100;
export const minTradeAmount = 0.1;
export const config = {cache: false};
export const highlightAmount = {
  'XDC-ETH': [100000],
  'XDC-BTC': [100000],
  'XDC-XRP': [100000],
  'XDC-XDCE': [100000],
  'XDC-USDT': [100000],
  'XDC-USDC': [100000],
  'ETH-USDT': [1],
  'BTC-USDC': [0.1],
  'XRP-USDT': [3000],
  'BTC-USDT': [0.1],
  'SRX-XDC': [1000],
  'PLI-XDC': [1000],
  'PLI-USDG': [1000],

  'ETH-BTC': [1],
  'BTC-EUR': [0.1],
  'ETH-EUR': [1],
  'XRP-BTC': [3000],
  'SGDG-SGD': [1000],
  'EURG-EUR': [1000],
  'WXDC-XDC': [10000],
  'GBPG-GBP': [1000],
  'USDG-USD': [1000],
  'HKDG-HKD': [1000],
  'XRP-EUR': [3000],
  'LGCY-XDC': [100000],
  'USDG-USDT': [1000],
  'USDG-USDC': [1000],
  'GBEX-EURG': [1000000000],
  'GBEX-USDG': [1000000000],
  'GBEX-XDC': [1000000000],
  'GBEX-XRP': [1000000000],

  'XDC-USDG': [100000],
  'ETH-USDG': [1],
  'BTC-USDG': [0.1],
  'XRP-USDG': [3000],

  'XDC-EURG': [100000],
  'ETH-EURG': [1],
  'BTC-EURG': [0.1],
  'XRP-EURG': [3000],

  'EURG-USDG': [1000],
};

export const minDepAmount = {
  BTC: 0.005,
  XRP: 20,
  BCHABC: 0.05,
  BCHSV: 0.05,
  ETH: 0.02,
  USDC: 20,
  USDT: 35,
  XDC: 1000,
  XDCE: 5000,
};

// withdraw min amount
export const minAmount = {
  BTC: 0.005,
  XRP: 100,
  ETH: 0.05,
  EUR: 100,
  SGDG: 100,
  EURG: 100,
  GBPG: 100,
  USDG: 100,
  HKDG: 100,
};

export const CurrencyDecimal = {
  LAK: 2,
  SGD: 2,
  DEX: 2,
  JPY: 2,
  NGN: 2,
  RUB: 2,
  MXN: 2,
  PEN: 2,
  TRY: 2,
  COL: 2,
  VND: 2,
  BRL: 2,
  AUD: 2,
  CNY: 2,
  KES: 2,
  ARS: 2,
  CLP: 2,
  KRW: 2,
  IDR: 2,
  MYR: 2,
  CAD: 2,
  UGX: 2,
  ZAR: 2,
  HKD: 2,
  USD: 2,
  THB: 2,
  NZD: 2,
  BTC: 9,
  XRP: 6,
  EUR: 2,
  ETH: 6,
  GBEX: 1,
};

export const CRYPTO_COIN_SYMBOL = [
  'XDC',
  'BTC',
  'XRP',
  'USDT',
  'ETH',
  'SGDG',
  'EURG',
  'HKDG',
  'GBPG',
  'USDG',
  'SRX',
  'GBEX',
  'PLI',
];

export const CurrencyAmountDecimal = {
  BTC: 4,
  EUR: 2,
  ETH: 3,
  XRP: 2,
  GBEX: 1,
};

export const QuickBuySides = ['Buy', 'Sell'];
export const DepositTypes = [
  {label: 'Swift', value: 'swift'},
  {label: 'Sepa', value: 'sepa'},
];
export const roleOfOwner = [
  {label: 'Director', value: 0},
  {label: 'Shareholder', value: 1},
  {label: 'UBO', value: 2},
];

export const Title = [
  {label: 'Mr.', value: 0},
  {label: 'Mrs.', value: 1},
];

export const Gender = [
  {label: 'Male', value: 0},
  {label: 'Female', value: 1},
];

export const MaritalStatus = [
  {label: 'Single', value: 0},
  {label: 'Married', value: 1},
  {label: 'Divorced', value: 2},
  {label: 'Windowed', value: 3},
];

export const AppLink = isIOS()
  ? 'https://apps.apple.com/us/app/globiance/id1584923932'
  : 'https://play.google.com/store/apps/details?id=com.solheaven.android';

export const defaultPageLimit = 10;

export const ApiCreditCard = {
  axcessms: {
    submit: 'user/axcessms/initiate-buy',
    log: 'user/axcessms/getdepositlogs',
  },
  powercash: {
    submit: 'user/powercash-deposit/get-hosted-url',
    log: 'user/powercash-deposit/get-history',
  },
  mercuryo: {
    submit: '/user/mercuryo/initiate-buy',
    log: '/user/mercuryo/getdepositlogs',
  },
};

// $1000
export const HighlightAmount: {[currency: string]: number} = {
  XDC: 30000,
  ETH: 0.5,
  BTC: 0.05,
  XRP: 3000,
  EUR: 1000,
  EURG: 1000,
  USDG: 1000,
  USD: 1000,
};

export const ShouldHighlight = (n: number, currency: string): boolean => {
  if (!HighlightAmount[currency]) return false;
  const hAmount: number = HighlightAmount[currency];
  return n >= hAmount;
};

export const GetPriceScale = (lastPrice: number): number => {
  if (lastPrice >= 10000) return 0;
  if (lastPrice >= 100) return 2;
  if (lastPrice >= 1) return 3;
  if (lastPrice >= 0.1) return 4;
  if (lastPrice >= 0.001) return 6;
  if (lastPrice >= 0.00001) return 8;
  if (lastPrice >= 0.0000001) return 10;
  return 12;
};

export const STAKING_TYPES: any = ['Pledge', 'Live', 'Cap Reached'];

export const ONE_DAY = 86400;
export const ONE_MONTH = 30 * ONE_DAY;

export const ONE_DAY_MS = 86400000;
export const ONE_MONTH_MS = 30 * ONE_DAY_MS;
