import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {GlobalActions} from '../../store';

import {ThemeFunctions, AppFunctions} from '../../utils';

import {View} from 'react-native';

import {MapperConstants} from '../../constants';

import {homeStyles as styles} from './styles';
import {ThemeText} from '../../components';

import {strings} from '../../strings';
import IconVector from '../../components/ui/IconVector';

import _ from 'lodash';

const CurrentBalance = () => {
  const dispatch = useDispatch<any>();

  const quickBuyData = useSelector((state: any) => state.quickBuyReducer);
  const market = useSelector((state: any) => state.marketReducer);

  const {appTheme, mainCurrency, isBalanceHidden, isServerReachable} =
    useSelector((state: any) => state.globalReducer);

  const getEstimateValue = () => {
    // console.log(market);
    // const totalSum = quickBuyData?.fundsList.reduce(
    //   (acc, curr) => acc + parseFloat(curr.available),
    //   0,
    // );

    // return totalSum;
    let total = 0;
    quickBuyData?.fundsList.forEach((item, index) => {
      if (item.symbol !== 'USDG') {
        if (item.total > 0 && item.currency.is_stable_coin === 0) {
          const name = `${item.symbol}-USDG`;
          const mainQuoteMarket = getMarketByName(name);
          if (mainQuoteMarket) {
            if (mainQuoteMarket.bid > 0) {
              // console.log(mainQuoteMarket.name);
              total = total + item.total * mainQuoteMarket.bid;
            }
          }
        }
      } else {
        total = total + item.total * 1;
      }
    });

    const rounded = roundWithFilter(total, 2);
    // alert(rounded);
    return rounded + ' USDG';
  };

  const getMarketByName = name => {
    // console.log(name);
    const val = market?.markets.find(item => item.name === name);
    return val;
  };

  const roundWithFilter = (value, decimals) => {
    // Check if value is a valid numeric value
    if (isNaN(parseFloat(value)) || !isFinite(value)) {
      return value;
    }

    if (!value) {
      value = 0;
    }

    // if (!decimals) {
    //   decimals = 0;
    // }

    // // Set max 12 decimal size
    // if (decimals > 12) {
    //   decimals = 12;
    // }

    value = parseFloat(value)
      .toFixed(6)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,');

    return value;
  };

  // const getEstimatedTotal = estimatedTotal => {
  //   if (mainCurrency !== 'USD') {
  //     let currencyData = liveCurrencyPrices.find(
  //       resp =>
  //         resp?.currencyName?.toUpperCase() === mainCurrency?.toUpperCase(),
  //     );
  //     let calculatedValue = getEstimateValue() / currencyData?.usdPrice;
  //     return calculatedValue === Infinity ||
  //       isNaN(calculatedValue) ||
  //       _.isUndefined(calculatedValue) ||
  //       _.isNull(calculatedValue)
  //       ? 'N/A'
  //       : AppFunctions.standardDigitConversion(
  //           parseFloat(AppFunctions.convertToDecimal(calculatedValue)),
  //         );
  //   } else {
  //     return AppFunctions.standardDigitConversion(
  //       parseFloat(AppFunctions.convertToDecimal(estimatedTotal)),
  //     );
  //   }
  // };

  const estimatedTotal = getEstimateValue();

  // alert(isServerReachable);

  return (
    <View style={styles.balanceContainer}>
      <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
        {strings('current_balance')}
      </ThemeText>
      <ThemeText style={styles.textBalance}>
        {/* {MapperConstants.mainCurrencySymbol[mainCurrency]} */}
        {/* {isServerReachable
          ? isBalanceHidden
            ? '****'
            : estimatedTotal > 0
            ? estimatedTotal
            : '0.00'
          : '****'} */}

        {isServerReachable
          ? isBalanceHidden
            ? '****'
            : estimatedTotal
          : '****'}
      </ThemeText>

      <IconVector.Entypo
        name={isBalanceHidden ? 'eye-with-line' : 'eye'}
        color={ThemeFunctions.customText(appTheme)}
        size={24}
        onPress={() => dispatch(GlobalActions.updateBalanceVisibility())}
      />
    </View>
  );
};

export default React.memo(CurrentBalance);
