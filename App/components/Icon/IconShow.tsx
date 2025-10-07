import React, {useState} from 'react';
import Image from 'react-native-fast-image';
import {getImageFromCDN, getImageFromURL} from '../../utils/AppFunctions';
import {DEFAULT_COIN_LOGO} from '../../store/action/quickbuy/QuickBuyAction';

const IconShow = ({currency, style}) => {
  // const [error, setError] = useState<any>(false);

  const _getImageCurrency = currencyName => {
    return getImageFromCDN(currencyName) || DEFAULT_COIN_LOGO;
  };

  return (
    <Image
      source={{uri: _getImageCurrency(currency)}}
      style={style}
      resizeMode="contain"
    />
  );
};

export default IconShow;
