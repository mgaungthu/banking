import React, {useState} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {strings} from '../../../strings';
import {rtlStyles} from '../../../globalstyles/styles';
import {useSelector, useDispatch} from 'react-redux';
import {ThemeFunctions, AppFunctions} from '../../../utils';
import {historyStyles as styles} from '../../quickbuy/styles';
import {ImageContainer, ThemeText} from '../../../components';
import * as Images from '../../../assets';
import {AppConstants, MapperConstants} from '../../../constants';
import * as Flags from '../../../assets/flags';
import {PaymentActions, QuickBuyActions} from '../../../store';
import Colors from '../../../theme/Colors';
import {isDarkTheme} from '../../../utils/ThemeFunctions';
import {
  getImageFromURL,
  getImageUrlFromAsset,
} from '../../../utils/AppFunctions';
import {DEFAULT_COIN_LOGO} from '../../../store/action/quickbuy/QuickBuyAction';

const HistoryItem = (props: any) => {
  const {isRtlApproach, appTheme, assetMetadata, appColor} = useSelector(
    (state: any) => state.globalReducer,
  );
  const dispatch = useDispatch();
  const {trade} = props;
  const quickBuyData = useSelector((state: any) => state.quickBuyReducer);
  console.log(trade);

  const reverseDirection = () => {
    return [
      styles.rowItem,
      {borderBottomColor: isDarkTheme(appTheme) ? '#1F1D2B' : '#d3d4db'},
      isRtlApproach ? rtlStyles.reverseRow : {},
    ];
  };

  const leftAlignView = () => {
    return [
      styles.leftItemView,
      isRtlApproach ? rtlStyles.alignEnd : rtlStyles.alignStart,
    ];
  };
  const rightAlignView = () => {
    return [
      styles.rightView,

      isRtlApproach ? rtlStyles.alignStart : rtlStyles.alignEnd,
    ];
  };

  const leftTextColor = () => {
    return ThemeFunctions.customInputText(appTheme);
  };
  // const tokenImg = (res: any) => {
  //   return (
  //     AppConstants.tokenImages[res] ||
  //     Flags[res.toLowerCase()] ||
  //     Images.currency.IcUsd
  //   )
  // }
  const checkStatus = () => {
    return trade.status.match('approved') ||
      trade.status.match('Complete') ||
      trade.status.match('approved') ||
      trade.status.match('Approved')
      ? [{color: ThemeFunctions.completeColor(appTheme)}]
      : styles.pending;
  };

  const cancelPayment = () => {
    dispatch(
      PaymentActions.cancelInternalPayment({settlementId: trade.uniqueId}),
    );
  };

  const isPending = () => {
    return trade?.status === 'pending' || trade?.status === 'Pending';
  };
  // let currencyDecimal = AppConstants.CurrencyDecimal[trade.symbol] || 0
  const [isImageNotFound, setIsImageNotFound] = useState(
    MapperConstants.StatusMapper.disable,
  );
  const getImageUrl = (resp: any) => {
    return getImageFromURL(resp) || DEFAULT_COIN_LOGO;
  };
  return (
    <View
      style={[
        styles.historyCard,
        ThemeFunctions.getListColor(appColor, appTheme),
      ]}>
      <View style={reverseDirection()}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {strings('date')}
          </ThemeText>
        </View>
        <View style={rightAlignView()}>
          <ThemeText
            style={[styles.rightLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {AppFunctions.FormatDateTime(trade.created_at)}
          </ThemeText>
        </View>
      </View>
      <View style={reverseDirection()}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}>
            {strings('currency_label')}
          </ThemeText>
        </View>
        <View
          style={[
            rightAlignView(),
            {
              flexDirection: 'row',
              justifyContent: isRtlApproach ? 'flex-start' : 'flex-end',
            },
          ]}>
          <>
            <Image
              source={{uri: getImageUrl(trade.currency)}}
              onError={error => setIsImageNotFound(true)}
              resizeMode="contain"
              style={[styles.ic]}
            />
            <View
              style={[
                isImageNotFound || !getImageUrl(trade.currency)
                  ? {
                      ...ThemeFunctions.bgImgColor(appTheme),
                      position: 'absolute',
                    }
                  : {position: 'absolute'},
                styles.img,
              ]}
            />
          </>
          {/* <ImageContainer
            imagePath={tokenImg(getCurrency())}
            imgStyle={[styles.ic]}
            noTransform={true}
          /> */}
          <ThemeText
            style={[
              styles.rightLabel,
              {color: ThemeFunctions.getColor(appColor)},
            ]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {trade.currency}
          </ThemeText>
        </View>
      </View>
      <View style={reverseDirection()}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {strings('amount')}
          </ThemeText>
        </View>
        <View style={rightAlignView()}>
          <ThemeText
            style={[styles.rightLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {trade?.amount
              ? AppFunctions.standardDigitConversion(
                  parseFloat(trade?.amount).toFixed(12),
                )
              : 'N/A'}
          </ThemeText>
        </View>
      </View>
      <View style={reverseDirection()}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {strings('fee')}
          </ThemeText>
        </View>
        <View style={rightAlignView()}>
          <ThemeText
            style={[styles.rightLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {trade?.amount
              ? AppFunctions.standardDigitConversion(
                  parseFloat(trade?.fee).toFixed(12),
                )
              : 'N/A'}
          </ThemeText>
        </View>
      </View>

      <View style={reverseDirection()}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {strings('recipient_email')}
          </ThemeText>
        </View>
        <View style={rightAlignView()}>
          <ThemeText
            style={[
              styles.rightLabel,
              {color: ThemeFunctions.getColor(appColor)},
              {textTransform: 'none'},
            ]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {trade?.recipient_email || 'N/A'}
          </ThemeText>
        </View>
      </View>
      <View
        style={[
          reverseDirection(),
          !isPending() ? {borderBottomWidth: 0} : {},
        ]}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {strings('status')}
          </ThemeText>
        </View>
        <View style={rightAlignView()}>
          <ThemeText
            style={[styles.rightLabel, leftTextColor(), checkStatus()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {trade?.status}
          </ThemeText>
        </View>
      </View>
      {isPending() && (
        <View style={[reverseDirection(), {borderBottomWidth: 0}]}>
          <View style={leftAlignView()}>
            <ThemeText
              style={[styles.leftLabel, leftTextColor()]}
              adjustsFontSizeToFit={true}
              numberOfLines={2}>
              {strings('actions')}
            </ThemeText>
          </View>
          <View style={[rightAlignView()]}>
            <TouchableOpacity
              style={[styles.icBtn]}
              activeOpacity={0.5}
              onPress={cancelPayment}>
              <ImageContainer
                imagePath={Images.IcCancel}
                imgStyle={[styles.img]}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default HistoryItem;
