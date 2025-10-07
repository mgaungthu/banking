import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {tickerStyles as styles, tickerRowStyles} from './styles';
import Colors, {rapunzelTheme} from '../../theme/Colors';
import {commonStyles, rtlStyles} from '../../globalstyles/styles';
import {AppFunctions, ThemeFunctions} from '../../utils';
import {useSelector} from 'react-redux';
import {Screen, StringConstants} from '../../enums';
import {CryptoIconConstants, MapperConstants} from '../../constants';
import {QuickBuyActions} from '../../store';
import {isIOS} from '../../utils/DeviceConfig';
import Navigation from '../../utils/Navigation';
import Image from 'react-native-fast-image';
import {
  FormatNumber,
  FormatToAbbreviateNumber,
  getImageFromURL,
} from '../../utils/AppFunctions';
import {DEFAULT_COIN_LOGO} from '../../store/action/quickbuy/QuickBuyAction';

const TickersRow = ({
  data,
  checkboxSelected,
  updateList,
  isQuickBuy,
  firstCurrency,
  navigate,
}) => {
  // const [tickerSocket] = useTiker(data.pairName);

  // useEffect(() => {
  //   if (tickerSocket) {
  //     setTicker({...data, ...tickerSocket});
  //   }
  // }, [tickerSocket]);

  const {isRtlApproach, appTheme, assetMetadata} = useSelector(
    (state: any) => state.globalReducer,
  );

  let stockUsdPrice = data?.usdPrice || 0,
    moneyUsdPrice = 0;

  if (data.stockUsdPrice) {
    stockUsdPrice = data.stockUsdPrice;
  }

  if (data.moneyUsdPrice) {
    moneyUsdPrice = data.moneyUsdPrice;
  }

  const changeColor = () => {
    if (data?.percentChange > 0) {
      return Colors.seagreen;
    } else if (data?.percentChange < 0) {
      return '#F82929';
    } else {
      return ThemeFunctions.getCurrentTextColor(appTheme);
    }
  };

  const isLow = () => {
    return isRed()
      ? rapunzelTheme.danger
      : ThemeFunctions.completeColor(appTheme);
  };
  const isRed = () => {
    return data?.colour === 'red';
  };

  const textColor = () => {
    return ThemeFunctions.getTextColor(appTheme);
  };

  const getFirstCurrency = () => {
    return firstCurrency;
  };
  const getSecondCurrency = () => {
    return data?.pair;
  };

  const [isImageNotFound, setIsImageNotFound] = useState(
    MapperConstants.StatusMapper.disable,
  );
  const getImageUrl = () => {
    return getImageFromURL(firstCurrency) || DEFAULT_COIN_LOGO;
  };

  let volumeUsd = data?.volume * data?.last * moneyUsdPrice;

  let lastUsd = data?.last * moneyUsdPrice || 0;

  const SwitchElement = () => {
    if (checkboxSelected === StringConstants.Volume) {
      if (data?.volume > 1000000000) {
        return (
          <Text
            adjustsFontSizeToFit={true}
            numberOfLines={1}
            style={[styles.rightText, ThemeFunctions.getTextColor(appTheme)]}>
            {FormatToAbbreviateNumber(data?.volume || 0)}
          </Text>
        );
      }

      return (
        <Text
          adjustsFontSizeToFit={true}
          numberOfLines={1}
          style={[styles.rightText, ThemeFunctions.getTextColor(appTheme)]}>
          {FormatNumber(data?.volume || 0, 3, 0)}
        </Text>
      );
    }

    return (
      <Text
        adjustsFontSizeToFit={true}
        numberOfLines={1}
        style={[
          styles.rightText,
          {
            color: changeColor(),
          },
        ]}>
        {FormatNumber(data?.percentChange || 0)}%
      </Text>
    );
  };

  const _navigateTrading = () => {
    Navigation.navigate(Screen.Trading, {
      pair: data?.pairName,
      pairId: data?.pairId,
      data,
      updateList,
    });
  };

  return (
    <TouchableOpacity
      onPress={isQuickBuy ? navigate : _navigateTrading}
      style={[
        styles.card,
        ThemeFunctions.getTickerStripColor(appTheme, ''),
        isRtlApproach ? rtlStyles.reverseRow : '',
      ]}>
      <Image
        source={{uri: getImageUrl()}}
        resizeMode="contain"
        style={[styles.img, {marginLeft: 0}]}
      />
      {isImageNotFound ||
        (!getImageUrl() && (
          <View
            style={[
              styles.imgView,
              isImageNotFound || !getImageUrl()
                ? {
                    ...ThemeFunctions.bgImgColor(appTheme),
                    position: 'absolute',
                  }
                : {position: 'absolute'},
            ]}>
            <Text
              style={{
                ...styles.icImg,
                color: ThemeFunctions.customText(appTheme),
              }}>
              {getFirstCurrency()?.charAt(0)}
            </Text>
          </View>
        ))}
      <View style={tickerRowStyles.col1}>
        <View style={commonStyles.rowItem}>
          <Text
            style={[
              tickerRowStyles.currency,
              textColor(),
              {top: isIOS() ? 5 : 0},
            ]}>
            {getFirstCurrency()}
            <Text
              style={[
                tickerRowStyles.secondcurrency,
                {color: ThemeFunctions.customText(appTheme)},
              ]}>
              /{getSecondCurrency()}
            </Text>
          </Text>
        </View>
        {!isQuickBuy ? (
          <View style={commonStyles.rowItem}>
            <Text
              style={[
                tickerRowStyles.volume,
                {color: ThemeFunctions.customText(appTheme)},
                ,
                {top: isIOS() ? 6 : 0},
              ]}
              adjustsFontSizeToFit={true}
              numberOfLines={1}>
              ${FormatNumber(volumeUsd || 0)}
            </Text>
          </View>
        ) : null}
      </View>
      {!isQuickBuy ? (
        <View
          style={[
            tickerRowStyles.col2,
            {marginLeft: '8%', top: isIOS() ? 5 : 0},
          ]}>
          <Text
            style={[tickerRowStyles.currency, textColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={1}>
            {FormatNumber(data?.last || 0)}
          </Text>
          <Text
            style={[
              tickerRowStyles.volume,
              {color: ThemeFunctions.customText(appTheme)},
            ]}
            adjustsFontSizeToFit={true}
            numberOfLines={1}>
            ${FormatNumber(lastUsd || 0)}
          </Text>
        </View>
      ) : null}
      <View
        style={[
          tickerRowStyles.change,
          {marginTop: isQuickBuy ? 7 : 0, marginLeft: 10},
        ]}>
        {!isQuickBuy ? <SwitchElement /> : null}
        {isQuickBuy ? (
          <View
            style={{
              backgroundColor: '#3378E1',
              borderRadius: 4,
              padding: 3,
              marginTop: 3,
            }}>
            <Text
              style={{
                fontSize: 8,
                color: '#fff',
                textAlign: 'center',
                textTransform: 'uppercase',
              }}>
              Quick swap
            </Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(TickersRow);
