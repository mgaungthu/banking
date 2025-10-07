import React from 'react';
import {Text, View} from 'react-native';
import {rtlStyles} from '../../../globalstyles/styles';
import {strings} from '../../../strings';
import {AppFunctions} from '../../../utils';
import {historyStyles as styles} from './styles';
import {ThemeFunctions} from '../../../utils';
import {ThemeText} from '../../../components';
import {isDarkTheme} from '../../../utils/ThemeFunctions';

const HistoryItem = ({data, appTheme, appColor, isRtlApproach}: any) => {
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
            {strings('time')}
          </ThemeText>
        </View>
        <View style={rightAlignView()}>
          <ThemeText
            style={[styles.rightLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {AppFunctions.FormatDateTime(data?.date)}
          </ThemeText>
        </View>
      </View>
      <View style={reverseDirection()}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}>
            {strings('name')}
          </ThemeText>
        </View>
        <View style={rightAlignView()}>
          <ThemeText
            style={[
              styles.rightLabel,
              {color: ThemeFunctions.getColor(appColor)},
            ]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {data?.setting.name}
          </ThemeText>
        </View>
      </View>
      <View style={reverseDirection()}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {strings('Currency Paid')}
          </ThemeText>
        </View>
        <View style={rightAlignView()}>
          <ThemeText
            style={[styles.rightLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {data?.crypto.name}
          </ThemeText>
        </View>
      </View>
      <View style={reverseDirection()}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {strings('Amount Paid')}
          </ThemeText>
        </View>
        <View style={rightAlignView()}>
          <ThemeText
            style={[styles.rightLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {data?.token_amount}
          </ThemeText>
        </View>
      </View>
      <View style={[reverseDirection(), styles.noBorder]}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {strings('Purchased Token')}
          </ThemeText>
        </View>
        <View style={rightAlignView()}>
          <ThemeText
            style={[
              styles.rightLabel,
              {color: ThemeFunctions.getColor(appColor)},
            ]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {data?.amount}
          </ThemeText>
        </View>
      </View>
      {/* <View style={reverseDirection()}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {strings('fee_amount')}
          </ThemeText>
        </View>
        <View style={rightAlignView()}>
          <ThemeText
            style={[styles.rightLabel, {color: ThemeFunctions.getColor(appColor)}]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {AppFunctions.standardDigitConversion(
              AppFunctions.RemoveExpo(trade.fee),
            )}
          </ThemeText>
        </View>
      </View> */}
      {/* <View style={reverseDirection()}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {strings('total')}
          </ThemeText>
        </View>
        <View style={rightAlignView()}>
          <ThemeText
            style={[
              styles.rightLabel,
              {color: ThemeFunctions.getColor(appColor)},
            ]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {AppFunctions.standardDigitConversion(data?.total)}
          </ThemeText>
        </View>
      </View> */}
      {/* <View style={[reverseDirection(), styles.noBorder]}>
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
            style={[
              styles.rightLabel,
              styles.completed,
              ThemeFunctions.completeTextColor(appTheme),
            ]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {data?.status}
          </ThemeText>
        </View>
      </View> */}
    </View>
  );
};

export default HistoryItem;
