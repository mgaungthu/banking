import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Image from 'react-native-fast-image';
import {tickerStyles as styles, tickerRowStyles} from './styles';
import {rapunzelTheme} from '../../theme/Colors';
import {commonStyles, rtlStyles} from '../../globalstyles/styles';
import {ThemeFunctions, navigate} from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {Screen, StringConstants} from '../../enums';
import {MapperConstants} from '../../constants';
import {QuickBuyActions, GlobalActions} from '../../store';
import {isIOS} from '../../utils/DeviceConfig';
import IconVector from '../../components/ui/IconVector';
import {FormatNumber} from '../../utils/AppFunctions';
import {FlickerNumber, ThemeText} from '../../components';

export const SpotListItem = (props: any) => {
  const {isRtlApproach, appTheme, assetMetadata, appColor} = useSelector(
    (state: any) => state.globalReducer,
  );

  const {liveCurrencyPrices} = useSelector((state: any) => state.gbexReducer);

  const {data, priceDetails = {}} = props;
  const isLow = () => {
    return isRed()
      ? rapunzelTheme.danger
      : ThemeFunctions.completeColor(appTheme);
  };
  const isRed = () => {
    return data.colour === 'red';
  };
  const convertToDecimal = value => {
    if (value >= 100) {
      return Number(value).toFixed(2);
    }
    if (value > 1 && value < 100) {
      return Number(value).toFixed(4);
    }
    if (value <= 1) {
      return Number(value).toFixed(12);
    }
  };

  const textColor = () => {
    return ThemeFunctions.getTextColor(appTheme);
  };

  const getFirstCurrency = () => {
    // return data?.pairName?.split('-')[0]
    return data?.firstCurrency;
  };

  const getSecondCurrency = () => {
    // return data?.pairName?.split('-')[1]
    return data?.secondCurrency;
  };

  const [isImageNotFound, setIsImageNotFound] = useState(
    MapperConstants.StatusMapper.disable,
  );

  const getImageUrl = () => {
    const filteredData = assetMetadata?.find(
      res => res.currency.toLowerCase() === getFirstCurrency().toLowerCase(),
    );
    if (filteredData && Object.keys(filteredData).length > 0) {
      return QuickBuyActions.getImgUrl(
        filteredData.currency,
        filteredData.version,
      );
    } else {
      return null;
    }
  };

  const dispatch = useDispatch();

  const handleFavourite = () => {
    dispatch(GlobalActions.updateFavourite(data?.id, StringConstants.Spot));
  };

  const getPrice = () => {
    const first = getFirstCurrency();
    const second = getSecondCurrency();

    let instrument = first + second;
    const price = priceDetails[instrument];

    if (!price) return {bid: '-', ask: '-', price};

    if (first === 'GBEX') {
      return {bid: FormatNumber(price.bid), ask: '-', price};
    }

    return {bid: FormatNumber(price.bid), ask: FormatNumber(price.ask), price};
  };

  const {bid, ask, price} = getPrice();

  let secondPrice =
    liveCurrencyPrices.find(
      resp =>
        resp?.currencyName?.toUpperCase() ===
        getSecondCurrency()?.toUpperCase(),
    ) || 0;

  let usdElement = '-';

  if (secondPrice && price && price.bid) {
    usdElement = FormatNumber(
      parseFloat(price.bid) * parseFloat(secondPrice.usdPrice),
    );
  }

  const bidElement = (
    <FlickerNumber
      style={{...tickerRowStyles.spotCurrency}}
      value={bid}
      appTheme={appTheme}
    />
  );
  // const bidElement = bid==="-"?<ThemeText>{"-"}</ThemeText>:<ThemeText numberOfLines={1}>{bid}</ThemeText>
  // const askElement = ask==="-"?<ThemeText>{"-"}</ThemeText>:<FlickerNumber value={ask} format={true} appTheme={appTheme}/>

  return (
    <TouchableOpacity
      onPress={() =>
        navigate(Screen.QuickSwapScreen, {
          fromScreen: Screen.QuickBuySpot,
          pairName: {
            firstCurrency: getFirstCurrency(),
            secondCurrency: getSecondCurrency(),
          },
        })
      }
      style={[
        styles.card,
        ThemeFunctions.getTickerStripColor(appTheme, ''),
        isRtlApproach ? rtlStyles.reverseRow : '',
      ]}>
      <TouchableOpacity onPress={handleFavourite}>
        <IconVector.FontAwesome
          name={data?.isFavourite ? 'star' : 'star-o'}
          size={20}
          color={ThemeFunctions.getColor(appColor)}
        />
      </TouchableOpacity>
      <View style={[tickerRowStyles.col1]}>
        <View style={commonStyles.rowItem}>
          <>
            <Image
              source={{uri: getImageUrl()}}
              resizeMode="contain"
              style={[styles.img]}
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
                    {/* {getFirstCurrency().charAt(0)} */}
                  </Text>
                </View>
              ))}
          </>
          <Text
            style={[
              tickerRowStyles.currency,
              textColor(),
              {top: isIOS() ? 6 : 2},
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
      </View>
      <View style={[tickerRowStyles.col2, {marginLeft: '12%'}]}>
        {bidElement}
        <ThemeText
          style={[
            {fontSize: 12, color: ThemeFunctions.customText(appTheme)},
            tickerRowStyles.volume,
          ]}>
          $ {usdElement}
        </ThemeText>
      </View>
    </TouchableOpacity>
  );
};
