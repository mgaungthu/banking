import React from 'react'
import {Text, View} from 'react-native'

import {tickerStyles as styles} from './styles'
import {Icon} from 'react-native-elements'
import Colors from '../../theme/Colors'
import {commonStyles, rtlStyles} from '../../globalstyles/styles'
import {AppFunctions, ThemeFunctions} from '../../utils'
import {useSelector} from 'react-redux'

const TickerListItem = (props: any) => {
  const {isRtlApproach, appTheme} = useSelector(
    (state: any) => state.globalReducer,
  )

  const {data} = props

  const isLow = () => {
    return data.colour === 'red'
      ? Colors.contentRed
      : ThemeFunctions.completeColor(appTheme)
  }
  
  const isRed = () => {
    return data.colour === 'red'
  }

  return (
    <View
      style={[
        styles.card,
        ThemeFunctions.getCardColor(appTheme),
        isRtlApproach ? rtlStyles.reverseRow : '',
      ]}>
      <View style={[commonStyles.rowItem, commonStyles.justifyCenter]}>
        <Text style={styles.currency}>{data.pairName}</Text>
      </View>
      <View
        style={[
          styles.rightView,
          isRtlApproach ? rtlStyles.alignStart : rtlStyles.alignEnd,
        ]}>
        <Text style={[styles.rightText]}>
          {AppFunctions.standardDigitConversion(data.price)}
        </Text>
        <View
          style={[
            commonStyles.rowItem,
            commonStyles.justifyCenter,
            isRtlApproach ? rtlStyles.reverseRow : '',
          ]}>
          <Icon
            name={isRed() ? 'south' : 'north'}
            type='material'
            size={12}
            color={isLow()}
          />
          <Text
            numberOfLines={4}
            style={[
              styles.rightText,
              {
                color: isLow(),
              },
            ]}>
            {isRed() ? data.percentChange : data.percentChange}%
          </Text>
        </View>
      </View>
    </View>
  )
}

export default TickerListItem
