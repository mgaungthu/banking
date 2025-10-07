import React, {useState} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {strings} from '../../../../../strings';
import {commonStyles, rtlStyles} from '../../../../../globalstyles/styles';
import {useDispatch, useSelector} from 'react-redux';
import {ThemeFunctions, AppFunctions} from '../../../../../utils';
import {historyStyles as styles} from '../../../../quickbuy/styles';
import {
  ImageContainer,
  ThemeButton,
  ThemeText,
} from '../../../../../components';
import * as Images from '../../../../../assets';
import {AppConstants, MapperConstants} from '../../../../../constants';
import * as Flags from '../../../../../assets/flags';
import {PaymentActions, QuickBuyActions} from '../../../../../store';
import Colors from '../../../../../theme/Colors';
import {isDarkTheme} from '../../../../../utils/ThemeFunctions';
import {getImageUrlFromAsset} from '../../../../../utils/AppFunctions';
import {DEFAULT_COIN_LOGO} from '../../../../../store/action/quickbuy/QuickBuyAction';
import {navigate} from '../../../../../utils';
import {Screen} from '../../../../../enums';

const ListingItem = (props: any) => {
  const {data} = props;
  const {isRtlApproach, appTheme, assetMetadata, appColor} = useSelector(
    (state: any) => state.globalReducer,
  );

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

  const [isImageNotFound, setIsImageNotFound] = useState(
    MapperConstants.StatusMapper.disable,
  );
  const getImageUrl = (resp: any) => {
    return getImageUrlFromAsset(resp) || DEFAULT_COIN_LOGO;
  };

  const handleBtn = () => {
    console.log(data);
    navigate(Screen.IBansPaymentScreen, {data});
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
            {strings('Country')}
          </ThemeText>
        </View>
        <View style={rightAlignView()}>
          <ThemeText
            style={[styles.rightLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {data?.iban_type.country}
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
              source={{uri: getImageUrl(data?.iban_type.fiat_currency.name)}}
              onError={error => setIsImageNotFound(true)}
              resizeMode="contain"
              style={[styles.ic]}
            />
            <View
              style={[
                isImageNotFound ||
                !getImageUrl(data?.iban_type.fiat_currency.name)
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
            {data?.iban_type.fiat_currency.symbol}
          </ThemeText>
        </View>
      </View>

      <View style={reverseDirection()}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {strings('IBAN')}
          </ThemeText>
        </View>
        <View style={rightAlignView()}>
          <ThemeText
            style={[styles.rightLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {data?.iban}
          </ThemeText>
        </View>
      </View>
      <View style={reverseDirection()}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {strings('balance')}
          </ThemeText>
        </View>

        <View style={rightAlignView()}>
          <ThemeText
            style={[styles.rightLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {data?.available_balance}
          </ThemeText>
        </View>
      </View>

      <View style={[reverseDirection()]}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {strings('currency')}
          </ThemeText>
        </View>
        <View style={rightAlignView()}>
          <ThemeText
            style={[styles.rightLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {data?.iban_type?.fiat_currency.name}
          </ThemeText>
        </View>
      </View>
      <View style={[commonStyles.rowView, commonStyles.paddingHorizontalView]}>
        <View style={[commonStyles.halfWidth, {paddingEnd: 8}]}>
          <ThemeButton
            text="Bank Detail"
            styleButton={{margin: 0, padding: 0}}
            onClickHandler={() => {}}
            // loading={false}
            // isModal={MapperConstants.StatusMapper.enable}
          />
        </View>
        <View style={[commonStyles.halfWidth, {paddingEnd: 8}]}>
          <ThemeButton
            text="Payments"
            styleButton={{margin: 0, padding: 0}}
            onClickHandler={handleBtn}
            // loading={false}
            // isModal={MapperConstants.StatusMapper.enable}
          />
        </View>
      </View>
    </View>
  );
};

export default ListingItem;
