import React from 'react'
import {View} from 'react-native'
import {useSelector} from 'react-redux'
import {rtlStyles} from '../../../globalstyles/styles'
import {strings} from '../../../strings'
import {AppFunctions} from '../../../utils'
import {historyStyles as styles} from '../../quickbuy/styles'
import {ThemeFunctions} from '../../../utils'
import { ThemeText } from '../../../components'
import { isDarkTheme } from '../../../utils/ThemeFunctions'

const HistoryItem = ({trade}: any) => {
  const {isRtlApproach, appTheme, appColor} = useSelector(
    (state: any) => state.globalReducer,
  )

  const reverseDirection = () => {
    return [
      styles.rowItem,
      {borderBottomColor: isDarkTheme(appTheme) ? "#1F1D2B" : "#d3d4db"},
      isRtlApproach ? rtlStyles.reverseRow : {},
    ]
  }

  const leftAlignView = () => {
    return [
      styles.leftItemView,
      isRtlApproach ? rtlStyles.alignEnd : rtlStyles.alignStart,
    ]
  }
  const rightAlignView = () => {
    return [
      styles.rightView,
      isRtlApproach ? rtlStyles.alignStart : rtlStyles.alignEnd,
    ]
  }

  const leftTextColor = () => {
    return ThemeFunctions.customInputText(appTheme)
  }

  return (
    <View style={[styles.historyCard, ThemeFunctions.getListColor(appColor, appTheme)]}>
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
            {AppFunctions.FormatDateTime(trade?.createdAt) || '-'}
          </ThemeText>
        </View>
      </View>
      <View style={reverseDirection()}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {strings('price')}
          </ThemeText>
        </View>
        <View style={rightAlignView()}>
          <ThemeText
            style={[styles.rightLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {trade?.tokenPrice || 0}
          </ThemeText>
        </View>
      </View>
      <View style={reverseDirection()}>
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
            style={[styles.rightLabel, {color: ThemeFunctions.getColor(appColor), textTransform: 'uppercase'}]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {AppFunctions.standardDigitConversion(
              AppFunctions.RemoveExpo(trade?.fee || 0),
            )}{' '}
            {trade?.firstCurrency?.toUpperCase || '-'}
          </ThemeText>
        </View>
      </View>
      <View style={[
        styles.rowItem,
        {borderBottomWidth: 0},
        isRtlApproach ? rtlStyles.reverseRow : {},
      ]}>
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
            style={[styles.rightLabel, {color: ThemeFunctions.getColor(appColor), textTransform: 'uppercase'}]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {`${AppFunctions.standardDigitConversion(trade?.total || 0)} ${trade?.firstCurrency || '-'}`}
          </ThemeText>
        </View>
      </View>
    </View>
  )
}

export default HistoryItem
