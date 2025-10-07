import React, {useState} from 'react'
import {Text, View, Image} from 'react-native'
import {strings} from '../../../strings'
import {balanceStyles as styles} from '../styles'
import {commonStyles, rtlStyles} from '../../../globalstyles/styles'
import {FormatDateTime} from '../../../utils/AppFunctions'
import {MapperConstants} from '../../../constants'
import {AppFunctions} from '../../../utils'
import {useSelector} from 'react-redux'
import {ThemeFunctions} from '../../../utils'
import {QuickBuyActions} from '../../../store'

const WithdrawalListItem = (props: any) => {
  const {trade} = props

  const {isRtlApproach, appTheme, assetMetadata} = useSelector(
    (state: any) => state.globalReducer,
  )
  // const tokenImg =
  //   AppConstants.tokenImages[trade.currencyName] ||
  //   Flags[trade.currencyName.toLowerCase()] ||
  //   Images.currency.IcUsd

  const checkStatus = () => {
    return trade.status.match('complete') || trade.status.match('Complete')
      ? [styles.completed, {color: ThemeFunctions.completeColor(appTheme)}]
      : styles.pending
  }
  
  const reverseDirection = () => {
    return [
      styles.rowItem,
      ThemeFunctions.cardInputBorderColor(appTheme),
      isRtlApproach ? rtlStyles.reverseRow : {},
    ]
  }

  const rightAlignView = () => {
    return [
      styles.rightView,
      isRtlApproach ? rtlStyles.alignStart : rtlStyles.alignEnd,
    ]
  }
  const textColor = () => {
    return ThemeFunctions.customInputText(appTheme)
  }

  const [isImageNotFound, setIsImageNotFound] = useState(
    MapperConstants.StatusMapper.disable,
  )

  const getImageUrl = () => {
    const filteredData = assetMetadata?.find(
      res => res.currency.toLowerCase() === trade?.currencyName.toLowerCase(),
    )
    if (filteredData && Object.keys(filteredData).length > 0) {
      return QuickBuyActions.getImgUrl(filteredData.currency)
    } else {
      return null
    }
  }
  
  return (
    <View style={[styles.balanceCard, ThemeFunctions.getCardColor(appTheme)]}>
      <View style={reverseDirection()}>
        <View style={[commonStyles.rowItem, {alignItems: 'center'}]}>
          {/* <ImageContainer imagePath={tokenImg} imgStyle={styles.img} /> */}
          <>
            <Image
              source={{uri: getImageUrl()}}
              onError={error => setIsImageNotFound(true)}
              resizeMode='contain'
              style={[styles.img]}
            />
            <View
              style={[
                isImageNotFound || !getImageUrl()
                  ? {
                      ...ThemeFunctions.bgImgColor(appTheme),
                      position: 'absolute',
                    }
                  : {position: 'absolute'},
                styles.img,
              ]}
            />
          </>
          <View>
            <Text
              style={[styles.leftLabel, textColor()]}
              adjustsFontSizeToFit={true}>
              {trade?.currencyName}
            </Text>
            <Text
              style={[
                styles.leftLabel,
                styles.smallText,
                ThemeFunctions.currencyTextColor(appTheme),
              ]}
              adjustsFontSizeToFit={true}>
              {trade?.currencyName}
            </Text>
          </View>
        </View>
        <View style={rightAlignView()}>
          <Text
            style={[styles.rightLabel, textColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {strings('status')}
          </Text>
          <Text
            style={[styles.rightLabel, styles.priceText, checkStatus()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {trade?.status}
          </Text>
        </View>
      </View>
      <View style={[reverseDirection(), styles.paddingView]}>
        <Text
          style={[styles.availableBal, textColor()]}
          adjustsFontSizeToFit={true}
          numberOfLines={2}>
          {strings('amount')}
        </Text>
        <View style={rightAlignView()}>
          <Text
            style={[
              styles.rightLabel,
              styles.priceText,
              {color: ThemeFunctions.customText(appTheme)},
            ]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {trade?.amount
              ? AppFunctions.standardDigitConversion(parseFloat(trade?.amount))
              : 'N/A'}
          </Text>
        </View>
      </View>
      <View style={[reverseDirection(), styles.paddingView]}>
        <Text
          style={[styles.availableBal, textColor()]}
          adjustsFontSizeToFit={true}>
          {strings('date')}
        </Text>
        <View style={rightAlignView()}>
          <Text
            style={[
              styles.rightLabel,
              styles.priceText,
              {color: ThemeFunctions.customText(appTheme)},
            ]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {FormatDateTime(trade?.createdAt)}
          </Text>
        </View>
      </View>
      <View
        style={[
          reverseDirection(),
          styles.paddingView,
          {borderBottomWidth: 0},
        ]}>
        <Text
          style={[styles.availableBal, textColor()]}
          adjustsFontSizeToFit={true}
          numberOfLines={2}>
          {strings('transaction_id')}
        </Text>
        <View style={rightAlignView()}>
          <Text
            style={[
              styles.rightLabel,
              styles.priceText,
              textColor(),
              {textTransform: 'none'},
            ]}
            adjustsFontSizeToFit={true}
            numberOfLines={5}>
            {trade?.transactionId}
          </Text>
        </View>
      </View>
      <View
        style={[
          reverseDirection(),
          styles.paddingView,
          {borderBottomWidth: 0},
        ]}>
        <Text
          style={[styles.availableBal, textColor()]}
          adjustsFontSizeToFit={true}
          numberOfLines={2}>
          {strings('from_address')}
        </Text>
        <View style={rightAlignView()}>
          <Text
            style={[
              styles.rightLabel,
              styles.priceText,
              textColor(),
              {textTransform: 'none'},
            ]}
            adjustsFontSizeToFit={true}
            numberOfLines={5}>
            {trade?.fromAddress||'N/A'}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default WithdrawalListItem
