import React from 'react';
import {Text, View} from 'react-native';
import {strings} from '../../../strings';
import {rtlStyles} from '../../../globalstyles/styles';
import {useSelector} from 'react-redux';
import {AppFunctions, ThemeFunctions} from '../../../utils';
import {historyStyles as styles} from '../../quickbuy/styles';
import Colors from '../../../theme/Colors';
import {ThemeText} from '../../../components';
import {isDarkTheme} from '../../../utils/ThemeFunctions';

const BeneficiaryItem = (props: any) => {
  const {isRtlApproach, appTheme, appColor} = useSelector(
    (state: any) => state.globalReducer,
  );
  const {trade} = props;

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
            {strings('date')}
          </ThemeText>
        </View>
        <View style={rightAlignView()}>
          <ThemeText
            style={[styles.rightLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {AppFunctions.FormatDateTime(trade.createdAt)}
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
            {trade?.name}
          </ThemeText>
        </View>
      </View>
      <View style={reverseDirection()}>
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
            {trade?.currency.name}
          </ThemeText>
        </View>
      </View>
      <View style={reverseDirection()}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {strings('bank_name')}
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
            {trade?.bank_name || 'N/A'}
          </ThemeText>
        </View>
      </View>
      <View style={[reverseDirection()]}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {strings('SWIFT/BIC Code')}
          </ThemeText>
        </View>
        <View style={rightAlignView()}>
          <ThemeText
            style={[styles.rightLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {trade?.swift || 'N/A'}
          </ThemeText>
        </View>
      </View>
      <View style={[reverseDirection(), {borderBottomWidth: 0}]}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {strings('bank_iban')}
          </ThemeText>
        </View>
        <View style={rightAlignView()}>
          <ThemeText
            style={[styles.rightLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {trade?.iban || 'N/A'}
          </ThemeText>
        </View>
      </View>
    </View>
  );
};

export default BeneficiaryItem;
