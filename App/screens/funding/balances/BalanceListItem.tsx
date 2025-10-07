import React, {useState} from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import {strings} from '../../../strings';
import {balanceStyles as styles} from '../styles';
import {commonStyles, rtlStyles} from '../../../globalstyles/styles';
import {AppConstants, MapperConstants} from '../../../constants';
import {AppFunctions} from '../../../utils';
import {useSelector} from 'react-redux';
import {ThemeFunctions} from '../../../utils';
import {t} from 'react-native-tailwindcss';
import {
  getImageFromURL,
  getImageUrlFromAsset,
  SanitizeNumber,
} from '../../../utils/AppFunctions';
import {DEFAULT_COIN_LOGO} from '../../../store/action/quickbuy/QuickBuyAction';

const BalanceListItem = (props: any) => {
  const {trade} = props;
  const {
    isRtlApproach,
    appTheme,
    isBalanceHidden = false,
  } = useSelector((state: any) => state.globalReducer);
  const {currencyStatusData} = useSelector((state: any) => state.walletReducer);
  const livePrices = useSelector(
    (state: any) => state.gbexReducer?.liveCurrencyPrices,
  );
  const [isImageNotFound, setIsImageNotFound] = useState(
    MapperConstants.StatusMapper.disable,
  );

  // const tokenImg = trade?.assetUrl ? trade.assetUrl : DEFAULT_COIN_LOGO;

  const _getImageCurrency = currencyName => {
    return getImageFromURL(currencyName) || DEFAULT_COIN_LOGO;
  };

  let currencyDecimal =
    trade.decimals || AppConstants.CurrencyDecimal[trade.symbol];

  const getTotalBalance = () => {
    const _total = parseFloat(trade?.total);

    return AppFunctions.standardDigitConversion(
      parseFloat(_total?.toFixed(currencyDecimal)),
    );
  };

  // const getUsdPrice = () => {
  //   const _total = parseFloat(trade?.total);

  //   // const _total =
  //   // parseFloat(trade?.total) +
  //   // parseFloat(trade?.available) +
  //   // parseFloat(SanitizeNumber(trade?.staking_balance)) +
  //   // parseFloat(SanitizeNumber(trade?.locked_balance));

  //   const usdPrice =
  //     livePrices.find(item => item?.currencyName == trade?.symbol)?.usdPrice ||
  //     0;

  //   return AppFunctions.standardDigitConversion(
  //     parseFloat((_total * usdPrice)?.toFixed(currencyDecimal)),
  //   );
  // };

  const reverseDirection = () => {
    return [
      styles.rowItem,
      {paddingHorizontal: 20},
      ThemeFunctions.cardInputBorderColor(appTheme),
      isRtlApproach ? rtlStyles.reverseRow : {},
    ];
  };

  const rightAlignView = () => {
    return [
      styles.rightView,
      isRtlApproach ? rtlStyles.alignStart : rtlStyles.alignEnd,
    ];
  };

  const imgUi = () => {
    return isRtlApproach ? {marginStart: 4} : {};
  };

  const isDepositEnabled = () => {
    const filteredData = currencyStatusData?.find(
      res => res?.currency?.toLowerCase() === trade?.symbol?.toLowerCase(),
    );
    if (filteredData && Object.keys(filteredData).length > 0) {
      return filteredData?.isDeposit;
    } else {
      return MapperConstants.StatusMapper.disable;
    }
  };

  const isWithdrawalEnabled = () => {
    const filteredData = currencyStatusData?.find(
      res => res?.currency?.toLowerCase() === trade?.symbol?.toLowerCase(),
    );
    if (filteredData && Object.keys(filteredData).length > 0) {
      return filteredData?.isWithdrawal;
    } else {
      return MapperConstants.StatusMapper.disable;
    }
  };

  return (
    <TouchableOpacity
      style={[ThemeFunctions.getCardColor(appTheme), styles.balanceCard]}
      onPress={props.handleChooseCurrency(
        trade,
        trade.currency.deposit_enabled ? true : false,
        trade.currency.withdraw_enabled ? true : false,
      )}>
      <View style={reverseDirection()}>
        <View
          style={[
            commonStyles.rowItem,
            commonStyles.alignCenter,
            styles.leftView,
            isRtlApproach ? rtlStyles.reverseRow : {},
          ]}>
          {!trade?.assetUrl || isImageNotFound ? (
            <View
              style={[
                {...ThemeFunctions.bgImgColor(appTheme)},
                styles.img,
                imgUi(),
              ]}
            />
          ) : (
            <>
              <Image
                source={{uri: _getImageCurrency(trade.symbol)}}
                onError={error => setIsImageNotFound(true)}
                resizeMode="contain"
                style={[styles.img, imgUi()]}
              />
            </>
          )}
          <View>
            <Text
              style={[
                styles.leftLabel,
                {color: ThemeFunctions.getCurrentTextColor(appTheme)},
              ]}
              adjustsFontSizeToFit={true}>
              {trade?.symbol}
            </Text>
            <Text
              style={[
                styles.leftLabel,
                styles.smallText,
                {color: ThemeFunctions.customText(appTheme)},
                {paddingTop: 4},
              ]}
              adjustsFontSizeToFit={true}>
              {trade?.name}
            </Text>
          </View>
        </View>
        <View style={rightAlignView()}>
          <Text
            style={[
              styles.rightLabel,
              {color: ThemeFunctions.getCurrentTextColor(appTheme)},
              {paddingTop: 2},
            ]}
            adjustsFontSizeToFit={true}
            numberOfLines={4}>
            {isBalanceHidden ? '****' : getTotalBalance()}
          </Text>
          {/* <Text
            style={[
              styles.rightLabel,
              {color: ThemeFunctions.customText(appTheme)},
              {paddingTop: 2},
            ]}
            adjustsFontSizeToFit={true}
            numberOfLines={4}>
            ${isBalanceHidden ? '****' : getUsdPrice()}
          </Text> */}
        </View>
      </View>

      <View
        style={[reverseDirection(), styles.paddingView, commonStyles.noBorder]}>
        <View style={styles.leftView}>
          <Text
            style={[
              styles.leftLabel,
              {...t.capitalize},
              {color: ThemeFunctions.getCurrentTextColor(appTheme)},
            ]}
            adjustsFontSizeToFit={true}>
            {strings('available_balance')}
          </Text>
        </View>
        <View style={rightAlignView()}>
          <Text
            style={[
              styles.rightLabel,
              {color: ThemeFunctions.getCurrentTextColor(appTheme)},
            ]}
            adjustsFontSizeToFit={true}
            numberOfLines={4}>
            {isBalanceHidden
              ? '****'
              : AppFunctions.standardDigitConversion(
                  parseFloat((trade?.available * 1).toFixed(currencyDecimal)),
                )}
          </Text>
        </View>
      </View>

      {/* <View style={[reverseDirection(), styles.paddingView]}>
        <View style={styles.leftView}>
          <Text
            style={[
              styles.availableBal,
              ThemeFunctions.customInputText(appTheme),
            ]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {strings('in_order')}
          </Text>
        </View>
        <View style={rightAlignView()}>
          <Text
            style={[
              styles.rightLabel,
              styles.priceText,
              {color: ThemeFunctions.customText(appTheme)},
            ]}
            adjustsFontSizeToFit={true}
            numberOfLines={4}>
            {isBalanceHidden
              ? '****'
              : AppFunctions.standardDigitConversion(
                  parseFloat((trade?.inTrade).toFixed(currencyDecimal)),
                )}
          </Text>
        </View>
      </View>
      <View
        style={[
          reverseDirection(),
          commonStyles.justifySpace,
          styles.paddingView,
          commonStyles.noBorder,
        ]}>
        <TouchableOpacity
          activeOpacity={isDepositEnabled() ? 0.2 : 1}
          style={[
            styles.deposit,
            isDepositEnabled()? {borderColor:ThemeFunctions.activeColor(appTheme)}
              : ThemeFunctions.customBtnBorderColor(appTheme)
          ]}
          onPress={props.handleDepositDetails(trade, isDepositEnabled())}>
          <Text
            style={[
              styles.rightLabel,
              isDepositEnabled()
              ? {color:ThemeFunctions.activeText(appTheme)}
              : ThemeFunctions.withdrawColor(appTheme)
            ]}>
            {strings('deposit')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={isWithdrawalEnabled() ? 0.2 : 1}
          onPress={props.handleWithdrawalDetails(trade, isWithdrawalEnabled())}
          style={[
            styles.deposit,
            isWithdrawalEnabled()
              ? {borderColor:ThemeFunctions.activeColor(appTheme)}
              : ThemeFunctions.customBtnBorderColor(appTheme)
          ]}>
          <Text
            style={[
              styles.rightLabel,
              isWithdrawalEnabled()
                ? {color:ThemeFunctions.activeText(appTheme)}
                : ThemeFunctions.withdrawColor(appTheme)
            ]}>
            {strings('withdrawal')}
          </Text>
        </TouchableOpacity>
      </View> */}
    </TouchableOpacity>
  );
};

export default BalanceListItem;
