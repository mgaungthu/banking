import React from 'react'
import {Text, View} from 'react-native'
import {useSelector} from 'react-redux'
import {commonStyles, rtlStyles} from '../../../globalstyles/styles'
import {strings} from '../../../strings'
import {AppFunctions} from '../../../utils'
import {historyStyles as styles} from '../../quickbuy/styles'
import {ThemeFunctions} from '../../../utils'
import { ThemeText } from '../../../components'
import { isDarkTheme } from '../../../utils/ThemeFunctions'

const RowItem = ({trade, index, type}: any) => {
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
            {strings('sr_no')}
          </ThemeText>
        </View>
        <View style={rightAlignView()}>
          <ThemeText
            style={[styles.rightLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {index + 1}
          </ThemeText>
        </View>
      </View>
      <View style={reverseDirection()}>
        <View style={leftAlignView()}>
        <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {strings('currency_name')}
          </ThemeText>
        </View>
        <View style={rightAlignView()}>
        <ThemeText
            style={[styles.rightLabel, {color: ThemeFunctions.getColor(appColor)}]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {trade?.currencyName}
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
            {AppFunctions.standardDigitConversion(
              parseFloat(type === 1 ? trade?.rewards : trade?.amount),
            ) || 'N/A'}
          </ThemeText>
        </View>
      </View>
      <View style={[reverseDirection(), commonStyles.noBorder]}>
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
            style={[styles.rightLabel]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {AppFunctions.FormatDateTime(trade?.createdAt)}
          </ThemeText>
        </View>
      </View>
    </View>
  )
}

export default RowItem
