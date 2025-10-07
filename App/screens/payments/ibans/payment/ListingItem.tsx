import React, {useState} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {strings} from '../../../../strings';
import {commonStyles, rtlStyles} from '../../../../globalstyles/styles';
import {useDispatch, useSelector} from 'react-redux';
import {ThemeFunctions, AppFunctions} from '../../../../utils';
import {historyStyles as styles} from '../../../quickbuy/styles';
import {ImageContainer, ThemeText} from '../../../../components';
import * as Images from '../../../../assets';
import {AppConstants, MapperConstants} from '../../../../constants';
import * as Flags from '../../../../assets/flags';
import {PaymentActions, QuickBuyActions} from '../../../../store';
import Colors from '../../../../theme/Colors';
import {isDarkTheme} from '../../../../utils/ThemeFunctions';
import {getImageUrlFromAsset} from '../../../../utils/AppFunctions';
import {DEFAULT_COIN_LOGO} from '../../../../store/action/quickbuy/QuickBuyAction';

const ListingItem = (props: any) => {
  const {item} = props;
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
  const tokenImg = (res: any) => {
    return (
      AppConstants.tokenImages[res] ||
      Flags[res.toLowerCase()] ||
      Images.currency.IcUsd
    );
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
            {AppFunctions.FormatDateTime(item?.created_at)}
          </ThemeText>
        </View>
      </View>

      <View style={reverseDirection()}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {strings('from')}
          </ThemeText>
        </View>
        <View style={rightAlignView()}>
          <ThemeText
            style={[styles.rightLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {item?.iban.iban}
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
            {item?.amount
              ? AppFunctions.standardDigitConversion(
                  (item.amount * 1).toFixed(8),
                )
              : 'N/A'}
          </ThemeText>
        </View>
      </View>

      <View style={[reverseDirection()]}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {strings('fees')}
          </ThemeText>
        </View>
        <View style={rightAlignView()}>
          <ThemeText
            style={[styles.rightLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {(item?.fee * 1).toFixed(8)}
          </ThemeText>
        </View>
      </View>
      <View style={[reverseDirection()]}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {strings('type')}
          </ThemeText>
        </View>
        <View style={rightAlignView()}>
          <ThemeText
            style={[
              styles.rightLabel,
              {
                color:
                  item?.type === 'credit'
                    ? Colors.currencyRed
                    : Colors.currencyGreen,
              },
            ]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {item?.type}
          </ThemeText>
        </View>
      </View>
      <View style={[reverseDirection()]}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {strings('reference')}
          </ThemeText>
        </View>
        <View style={rightAlignView()}>
          <ThemeText
            style={[styles.rightLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {item?.reference || 'N/A'}
          </ThemeText>
        </View>
      </View>
      <View style={[reverseDirection()]}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {strings('Sender/ Receiver')}
          </ThemeText>
        </View>
        <View style={rightAlignView()}>
          <ThemeText
            style={[styles.rightLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {`${item?.beneficiary?.name || ''} ${
              item?.beneficiary?.bank_address || ''
            }`}{' '}
            {!item?.beneficiary?.name && 'N/A'}
          </ThemeText>
        </View>
      </View>
      <View style={[reverseDirection(), {borderBottomWidth: 0}]}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {strings('Status')}
          </ThemeText>
        </View>
        <View style={rightAlignView()}>
          <ThemeText
            style={[
              styles.rightLabel,
              {
                backgroundColor:
                  item.status === 'completed' ? '#198754' : '#ffc107',
                padding: 6,
                color: '#fff',
                borderRadius: 6,
                fontSize: 12,
              },
            ]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {item.status}
          </ThemeText>
        </View>
      </View>
    </View>
  );
};

export default ListingItem;
