import React, {useState} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {strings} from '../../../strings';
import {commonStyles, rtlStyles} from '../../../globalstyles/styles';
import {useDispatch, useSelector} from 'react-redux';
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

const ListingItem = (props: any) => {
  const {trade} = props;
  const {isRtlApproach, appTheme, assetMetadata, appColor} = useSelector(
    (state: any) => state.globalReducer,
  );
  const dispatch = useDispatch();
  const quickBuyData = useSelector((state: any) => state.quickBuyReducer);

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
  const tokenImg = (res: any) => {
    return (
      AppConstants.tokenImages[res] ||
      Flags[res.toLowerCase()] ||
      Images.currency.IcUsd
    );
  };
  const checkStatus = () => {
    return trade.status.match('complete') || trade.status.match('Complete')
      ? [{color: ThemeFunctions.completeColor(appTheme)}]
      : styles.pending;
  };

  const getCurrency = () => {
    const currencyList = quickBuyData?.fundsList;
    if (currencyList?.length > 0) {
      const filteredData = currencyList.find(
        res => res.currencyId === trade.currencyId,
      );
      if (filteredData && Object.keys(filteredData).length > 0) {
        return filteredData.symbol;
      } else {
        return 'N/A';
      }
    } else {
      return 'N/A';
    }
  };
  let currencyDecimal = trade.fiat_currency.decimals || 4;

  const isPending = () => {
    return trade.status.match('pending') || trade.status.match('Pending');
  };

  const cancelRequest = () => {
    dispatch(
      PaymentActions.cancelDepositRequest({settlementId: trade.uniqueId}),
    );
  };

  const downloadRequest = () => {
    // dispatch(
    //   PaymentActions.downloadDepositPayment({settlementId: trade.uniqueId}),
    // )
  };

  const [isImageNotFound, setIsImageNotFound] = useState(
    MapperConstants.StatusMapper.disable,
  );
  const getImageUrl = (resp: any) => {
    return getImageFromURL(resp) || DEFAULT_COIN_LOGO;
  };

  const actions = isPending() ? (
    <>
      <TouchableOpacity
        style={[styles.icBtn, {marginRight: 7}]}
        onPress={cancelRequest}
        activeOpacity={0.5}>
        {isPending() && (
          <ImageContainer imagePath={Images.IcCancel} imgStyle={[styles.img]} />
        )}
      </TouchableOpacity>
    </>
  ) : (
    <ThemeText>-</ThemeText>
  );

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
              source={{uri: getImageUrl(trade.fiat_currency.name)}}
              onError={error => setIsImageNotFound(true)}
              resizeMode="contain"
              style={[styles.ic]}
            />
            <View
              style={[
                isImageNotFound || !getImageUrl(trade.fiat_currency.name)
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
            {trade.fiat_currency.name}
          </ThemeText>
        </View>
      </View>
      {/* <View style={reverseDirection()}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {strings('client_id')}
          </ThemeText>
        </View>

        <View style={rightAlignView()}>
          <ThemeText
            style={[styles.rightLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {trade?.clientId || 'N/A'}
          </ThemeText>
        </View>
      </View> */}
      <View style={reverseDirection()}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {strings('Code')}
          </ThemeText>
        </View>
        <View style={rightAlignView()}>
          <ThemeText
            style={[styles.rightLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {trade?.description || 'N/A'}
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
                  parseFloat((trade.amount * 1).toFixed(currencyDecimal)),
                )
              : 'N/A'}
          </ThemeText>
        </View>
      </View>

      <View style={[reverseDirection(), {borderBottomWidth: 0}]}>
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
      {/* <View style={[reverseDirection(), {borderBottomWidth: 0}]}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {strings('actions')}
          </ThemeText>
        </View>
        <View
          style={[
            commonStyles.rowItem,
            rightAlignView(),
            {justifyContent: isRtlApproach ? 'flex-start' : 'flex-end'},
          ]}>
          {actions}
        </View>
      </View> */}
    </View>
  );
};

export default ListingItem;
