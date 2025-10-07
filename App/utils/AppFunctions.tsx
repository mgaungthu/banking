import {getItem} from './index';

import moment from 'moment';
import Big from 'big.js';
import {APIConstants, AppConstants, CryptoIconConstants} from '../constants';
import {globalStoreInstance} from '../store/StoreManager';
import Toast from 'react-native-toast-message';
import {isIPhoneX} from './DeviceConfig';
import {Image, Platform} from 'react-native';
import {CurrentConfig} from '../../api_config';

export const roundNumber = ({value, decimal}: any) => {
  if (value === 0) {
    return 0;
  }
  let round = 1;
  for (let i = 0; i < decimal; i++) {
    round *= 10;
  }
  return Math.round(value * round) / round;
};

export const smartRound = (value, decimals = null) => {
  if (value === null || value === undefined || isNaN(value)) return '0';

  try {
    const bigValue = new Big(String(value).replace(/,/g, '')); // Remove existing commas

    // Handle decimal precision constraints
    let numericString;
    if (decimals !== null) {
      decimals = Math.min(Math.max(Number(decimals), 0), 12);
      numericString = bigValue.toFixed(decimals);
    } else {
      // Keep all decimals if no rounding specified
      numericString = bigValue.toFixed();
    }

    // Ensure valid numeric string (handles edge cases like scientific notation)
    let sanitizedValue = numericString.replace(/[^\d.]/g, '');
    if (sanitizedValue === '') return '0';

    // Ensure only one decimal point exists
    const firstDotIndex = sanitizedValue.indexOf('.');
    if (firstDotIndex !== -1) {
      sanitizedValue =
        sanitizedValue.substring(0, firstDotIndex + 1) +
        sanitizedValue.substring(firstDotIndex + 1).replace(/\./g, '');
    }

    // Split integer and decimal parts
    let [integerPart, decimalPart = ''] = sanitizedValue.split('.');

    // Format integer part with commas
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Handle decimal part based on `decimals`
    return decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
  } catch (error) {
    console.error('Formatting error:', error);
    return '0';
  }
};

export const getJWT = async () => {
  const jwt = await getItem('jwt');
  return jwt;
};
export const sortCreatedDataDesc = (arr: any) =>
  arr.sort(
    ({createdAt: a}: any, {createdAt: b}: any) =>
      new Date(b).getTime() - new Date(a).getTime(),
  );

export const sortUpdatedDataDesc = (arr: any) =>
  arr.sort(
    ({updatedAt: a}: any, {updatedAt: b}: any) =>
      new Date(b).getTime() - new Date(a).getTime(),
  );

export const RemoveExpo = (x: any) => {
  var data = String(x).split(/[eE]/);
  if (data.length == 1) return data[0];

  var z = '',
    sign = x < 0 ? '-' : '',
    str = data[0].replace('.', ''),
    mag = Number(data[1]) + 1;

  if (mag < 0) {
    z = sign + '0.';
    while (mag++) z += '0';
    return z + str.replace(/^\-/, '');
  }
  mag -= str.length;
  while (mag--) z += '0';
  return str + z;
};

export const FormatDateTime = (date: any) => {
  return moment(date).format(AppConstants.dateTimeFormat);
};

export const FormatDate = (date: any) => {
  return moment(date).format(AppConstants.dateFormat);
};

export const FormatDateTs = (date: any) => {
  const dateObj = new Date(parseFloat(date));
  return `${PadTo2(dateObj.getDate())}-${PadTo2(
    dateObj.getMonth() + 1,
  )}-${dateObj.getFullYear()}`;
};

export const PadTo2 = (x: string | number) => {
  x = `${x}`;
  if (x.length <= 1) return `0${x}`;
  return x;
};

export const FormatDateTsTime = (date: any) => {
  const dateObj = new Date(parseFloat(date));
  return `${PadTo2(dateObj.getDate())}-${PadTo2(
    dateObj.getMonth() + 1,
  )}-${dateObj.getFullYear()} ${PadTo2(dateObj.getHours())}:${PadTo2(
    dateObj.getMinutes(),
  )}`;
};

export const standardDigitConversion = (val: any) => {
  val = RemoveExpo(val);

  let split = val.toString().split('.');

  if (split.length === 1) {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    let [whole, frac] = split;
    whole = whole.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `${whole}.${frac}`;
  }
};

export const transformRegisterUserData = (data: any) => {
  let payload = {...data, firstName: data.first_name, lastName: data.last_name};
  payload.first_name;
  payload.last_name;
  return payload;
};

export const amountSeperator = (num: any) =>
  standardDigitConversion(parseFloat(num));
export const convertToDecimal = (value: any) => {
  if (value >= 100) {
    return Number(value).toFixed(2);
  }
  if (value > 1 && value < 100) {
    return Number(value).toFixed(4);
  }
  if (value <= 1) {
    return Number(value).toFixed(9);
  }
};
export const PrefixPad = (n: any, ch: any, c: any) => {
  let prefix = '';
  n = `${n}`;
  c -= n.length;
  if (c <= 0) return n;
  for (let i = 0; i < c; i++) prefix += `${ch}`;
  return `${prefix}${n}`;
};

export const formatTime = (time: any) => {
  // Hours, minutes and seconds
  var hrs = ~~(time / 3600);
  var mins = ~~((time % 3600) / 60);
  var secs = ~~time % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = '';
  if (hrs > 0) {
    ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
  }
  ret += '0' + mins + ':' + (secs < 10 ? '0' : '');
  ret += '' + secs;
  return ret;
};
export const isValidUrl = (_string: string) => {
  const matchpattern =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
  return matchpattern.test(_string);
};

export const getAssetUrl = (item: any, announcementMeta: any) => {
  const assetImg = item?.assetUrl?.includes('.png')
    ? item?.assetUrl?.replace('.png', '')
    : item?.assetUrl;
  if (assetImg && announcementMeta.length > 0) {
    const filteredItem = announcementMeta.find(
      (resp: any) => assetImg === resp.image,
    );
    return filteredItem && Object.keys(filteredItem).length > 0
      ? APIConstants.GET_ANNOUNCEMENT_URL + filteredItem.image + '.png'
      : null;
  } else {
    return null;
  }
};

export const convertToUsdPrice = (currencyName: string, amount: string) => {
  try {
    const store = globalStoreInstance;
    const liveCurrencyPrices = store.getState().gbexReducer.liveCurrencyPrices;
    const usdPrice = liveCurrencyPrices.find(
      (el: any) => el.currencyName === currencyName,
    ).usdPrice;
    return Math.round(usdPrice * parseFloat(amount) * 100) / 100;
  } catch (error) {
    return 0;
  }
};

export const roundFloatNumber = (
  number: number,
  maxNumberBehind: number = 2,
) => {
  //@ts-ignore
  return +(
    Math.round(number + 'e+' + maxNumberBehind) +
    'e-' +
    maxNumberBehind
  );
};

export const parseJson = (data: string) => {
  try {
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
};

export const showNotificationBanner = (
  {title, content}: {title: string; content: string},
  onPress: () => void,
) => {
  Toast.show({
    type: 'notification',
    //@ts-ignore
    text1: {
      title,
      content,
    },
    //@ts-ignore
    text2: onPress,
    opOffset: isIPhoneX() ? 40 : Platform.OS === 'ios' ? 20 : 10,
  });
};

export const getQueryStringParams = (query: any) => {
  return query
    ? (/^[?#]/.test(query) ? query.slice(1) : query)
        .split('&')
        .reduce((params: any, param: any) => {
          let [key, value] = param.split('=');
          params[key] = value
            ? decodeURIComponent(value.replace(/\+/g, ' '))
            : '';
          return params;
        }, {})
    : {};
};

export function toRealNumber(x: any) {
  if (!x) return 0;
  if (Math.abs(x) < 1.0) {
    let e = parseInt(x.toString().split('e-')[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = '0.' + new Array(e).join('0') + x.toString().substring(2);
    }
  } else {
    let e = parseInt(x.toString().split('+')[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join('0');
    }
  }
  return x;
}

//@ts-ignore
export const replaceCost = (cost, isInt = false) => {
  cost = cost.toString().replace(/\,/g, '');
  if (cost == '') cost = 0;
  if (isInt) return parseInt(cost);
  else return parseFloat(cost);
};

export const formatDecimal = (value: any) => {
  if (value) {
    value = value.toString();
    value = value.replace(/\,/g, '');
    while (value.length > 1 && value[0] == '0' && value[1] != '.')
      value = value.substring(1);
    if (value != '' && value != '0') {
      if (value[value.length - 1] != '.') {
        if (value.indexOf('.000') > 0)
          value = value.substring(0, value.length - 3);
        value = addCommas(value);
        return value;
      } else return value;
    } else return 0;
  }
  return 0;
};

export const RoundUptoSignificant = (
  n: number | string,
  sig = 3,
  minDecimal = 2,
): string => {
  const nSplit = RemoveExpo(n).split('.');
  if (nSplit.length !== 2) return RemoveExpo(n);
  const wholeNumber = nSplit[0];
  const decimalNumber = nSplit[1];
  const wholeNumberLength = wholeNumber.length;

  if (parseFloat(wholeNumber) === 0) {
    let lastIndex = 0;

    for (let i = 0; i < nSplit[1].length; i++) {
      const ch = nSplit[1][i];
      if (ch !== '0') {
        lastIndex = i;
        break;
      }
    }

    return nSplit.join('.').slice(0, wholeNumberLength + 1 + lastIndex + sig);
  } else {
    const remSig =
      sig > wholeNumberLength ? sig - wholeNumberLength : minDecimal;

    return nSplit.join('.').slice(0, wholeNumberLength + 1 + remSig);

    // const significantDecimal = (decimalNumber.substr(0,sig))

    // if (parseFloat(significantDecimal)===0) {
    //   return wholeNumber
    // }else {
    //   return `${wholeNumber}.${significantDecimal}`
    // }
  }
};

export const SanitizeNumber = (n: any): any => {
  if (isNaN(parseFloat(`${n}`))) {
    return 0;
  }
  return n;
};

export const FormatNumber = (
  x: number | string,
  sig = 3,
  minDecimal = 2,
): string => {
  x = SanitizeNumber(x);
  x = RoundUptoSignificant(x, sig, minDecimal);
  return standardDigitConversion(parseFloat(x));
};

const addCommas = (nStr: any) => {
  nStr += '';
  var x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
};

export const ucFirst = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const createRpcRequest = (method: any, params = {}) => {
  return {
    id: 1,
    jsonrpc: '2.0',
    method: method,
    params: params,
  };
};

export const FormatToAbbreviateNumber = (num: string | number | undefined) => {
  try {
    num = parseFloat(num as string);

    if (isNaN(num)) {
      return '-';
    }

    if (num >= 1000000000000) {
      return (num / 1000000000000).toFixed(2).replace(/\.0$/, '') + ' T';
    }
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(2).replace(/\.0$/, '') + ' B';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2).replace(/\.0$/, '') + ' M';
    }
    if (num >= 100000) {
      return (num / 1000).toFixed(2).replace(/\.0$/, '') + ' K';
    }
    return FormatNumber(num);
  } catch (e) {
    return '-';
  }
};

export const GetDaysFromTs = (ts: string | number, placeholder = '-') => {
  const days = parseFloat(`${ts}`) / AppConstants.ONE_DAY_MS;
  if (!isNaN(days)) return days;
  return placeholder;
};

export const GetSignificantPrecision = (n: string | number, sig = 4) => {
  n = RemoveExpo(n);

  const nSplit = n.split('.');
  const wholeNumberLength = nSplit[0].length;

  if (parseFloat(nSplit[0]) > 0) {
    return Math.max(sig - wholeNumberLength, 0);
  }

  let lastIndex = 0;
  for (let i = 0; i < nSplit[1].length; i++) {
    const ch = nSplit[1][i];
    if (ch !== '0') {
      lastIndex = i;
      break;
    }
  }

  return lastIndex + sig;
};

export const getImageFromCDN = name => {
  const iconUrl = `https://cdn.globiancepay.com/logo/${name?.toUpperCase()}.png`;

  Image.prefetch(iconUrl)
    .then(() => {
      return iconUrl;
    })
    .catch(() => {
      getImageFromURL(name);
    });

  return false;
};

export const getImageFromURL = name => {
  const iconUrl = `https://banking.globiancepay.com/storage/icons/128/icon/${name.toLowerCase()}.png`;
  if (iconUrl) {
    return iconUrl;
  }

  return false;
};
