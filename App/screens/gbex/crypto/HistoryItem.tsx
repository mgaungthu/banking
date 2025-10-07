import React from 'react'
import {Text, View} from 'react-native'
import {useSelector} from 'react-redux'
import {commonStyles, rtlStyles} from '../../../globalstyles/styles'
import {strings} from '../../../strings'
import {AppFunctions} from '../../../utils'
import {historyStyles as styles} from '../../quickbuy/styles'
import {ThemeFunctions} from '../../../utils'
import * as Flags from '../../../assets/flags'
import {AppConstants} from '../../../constants'
import * as Images from '../../../assets'
import {ImageContainer, ThemeText} from '../../../components'
import {buyStyles} from '../styles'
import Colors from '../../../theme/Colors'
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

  const tokenImg = (res: any) => {
    return (
      AppConstants.tokenImages[res] ||
      Flags[res?.toLowerCase()] ||
      Images.currency.IcUsd
    )
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
            {AppFunctions.FormatDateTime(trade?.createdAt)}
          </ThemeText>
        </View>
      </View>
      <View style={reverseDirection()}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}>
            {strings('asset')}
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
          <ImageContainer
            imagePath={tokenImg('GBEX')}
            imgStyle={[buyStyles.ic]}
            noTransform={true}
          />
          <ThemeText
            style={[styles.rightLabel, {color: ThemeFunctions.getColor(appColor)}]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            GBEX
          </ThemeText>
        </View>
      </View>
      <View style={reverseDirection()}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {strings('price')}($)
          </ThemeText>
        </View>
        <View style={rightAlignView()}>
          <ThemeText
            style={[styles.rightLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {AppFunctions.RemoveExpo(trade?.tokenPrice) || '-'}
          </ThemeText>
        </View>
      </View>
      <View style={reverseDirection()}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {strings('quantity')}(GBEX)
          </ThemeText>
        </View>
        <View style={rightAlignView()}>
          <ThemeText
            style={[styles.rightLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {AppFunctions.amountSeperator(trade?.total) || '-'}
          </ThemeText>
        </View>
      </View>
      <View style={reverseDirection()}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {strings('total')}($)
          </ThemeText>
        </View>
        <View style={rightAlignView()}>
          <ThemeText
            style={[styles.rightLabel, {color: ThemeFunctions.getColor(appColor)}]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {AppFunctions.amountSeperator(trade?.price * trade?.amount) || '-'}
          </ThemeText>
        </View>
      </View>
      <View style={reverseDirection()}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {strings('secondary_currency')}
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
          <ImageContainer
            imagePath={tokenImg(trade?.secondCurrency)}
            imgStyle={[buyStyles.ic]}
            noTransform={true}
          />
          <ThemeText
            style={[styles.rightLabel, {color: ThemeFunctions.getColor(appColor)}]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {trade?.secondCurrency || '-'}
          </ThemeText>
        </View>
      </View>

      <View style={[reverseDirection(), styles.noBorder]}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {strings('secondary_currency_amt')}
          </ThemeText>
        </View>
        <View style={rightAlignView()}>
          <ThemeText
            style={[styles.rightLabel, {color: ThemeFunctions.getColor(appColor)}]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {trade?.amount || '-'}
          </ThemeText>
        </View>
      </View>
    </View>
  )
}

export default HistoryItem
