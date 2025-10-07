import React from 'react'
import {View} from 'react-native'
import {rtlStyles} from '../../../globalstyles/styles'
import {strings} from '../../../strings'
import {AppFunctions} from '../../../utils'
import {historyStyles as styles} from '../styles'
import {ThemeFunctions} from '../../../utils'
import { ThemeText } from '../../../components'
import { isDarkTheme } from '../../../utils/ThemeFunctions'

const HistoryItem = ({trade, isRtlApproach, appTheme, appColor}: any) => {
  let tradeType = '',
    receivedCur = '',
    boughtCur = '',
    originalAmount,
    receivedAmount,
    executionStatus =
      trade.size === trade.externalSizeUser
        ? 'Completed'
        : 'Partially Completed',
    total, 
    firstCurAmount,
    secondCurTotal = trade.total;
  if (trade.tradeType === 'bid') {
    tradeType = 'BUY'
    receivedCur = trade.pair.split('-')[0]
    boughtCur = trade.pair.split('-')[1]
    firstCurAmount = trade.size
    originalAmount = trade.size - trade.fee
    receivedAmount = trade.externalSizeUser - trade.fee
    total = trade.externalSizeUser
  } else {
    tradeType = 'SELL'
    receivedCur = trade.pair.split('-')[1]
    boughtCur = trade.pair.split('-')[0]
    firstCurAmount = trade.size
    originalAmount = trade.total - trade.fee
    receivedAmount = trade.externalTotalUser - trade.fee
    total = trade.externalTotalUser
  }
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
            {AppFunctions.FormatDateTime(trade.createdAt)}
          </ThemeText>
        </View>
      </View>
      <View style={reverseDirection()}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}>
            {strings('pair')}
          </ThemeText>
        </View>
        <View style={rightAlignView()}>
          <ThemeText
            style={[styles.rightLabel, {color: ThemeFunctions.getColor(appColor)}]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {trade.pair}
          </ThemeText>
        </View>
      </View>
      <View style={reverseDirection()}>
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
            style={[styles.rightLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {tradeType}
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
            {trade.externalPriceUser
              ? AppFunctions.FormatNumber(trade.externalPriceUser, 6, 4)
              : AppFunctions.FormatNumber(trade.price, 6, 4)
             }
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
            {AppFunctions.FormatNumber(firstCurAmount, 6, 4)} {trade.pair.split('-')[0]}
          </ThemeText>
        </View>
      </View>

      <View style={reverseDirection()}>
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
            style={[styles.rightLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {AppFunctions.FormatNumber(secondCurTotal, 6, 4)} {trade.pair.split('-')[1]}
          </ThemeText>
        </View>
      </View>
      
      {/* <View style={reverseDirection()}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {strings('original_quantity')}
          </ThemeText>
        </View>
        <View style={rightAlignView()}>
          <ThemeText
            style={[styles.rightLabel, {color: ThemeFunctions.getColor(appColor)}]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {`${AppFunctions.FormatNumber(
              originalAmount,
            )} ${receivedCur}`}
          </ThemeText>
        </View>
      </View> */}
      <View style={reverseDirection()}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {strings('received_amount_qs')}
          </ThemeText>
        </View>
        <View style={rightAlignView()}>
          <ThemeText
            style={[styles.rightLabel, {color: ThemeFunctions.getColor(appColor)}]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {`${AppFunctions.FormatNumber(
              receivedAmount,
               6, 4
            )} ${receivedCur}`}
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
            style={[styles.rightLabel]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {AppFunctions.FormatNumber(trade.fee, 6, 4)}{' '}
            {receivedCur}
          </ThemeText>
        </View>
      </View>
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
            style={[styles.rightLabel, {color: ThemeFunctions.getColor(appColor)}]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {`${AppFunctions.FormatNumber(total)} ${receivedCur}`}
          </ThemeText>
        </View>
      </View> */}
      <View style={[reverseDirection(), styles.noBorder]}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {strings('execution_status')}
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
            {`${executionStatus} `}
          </ThemeText>
        </View>
      </View>
    </View>
  )
}

export default HistoryItem
