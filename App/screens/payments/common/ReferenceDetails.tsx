import React, {useEffect, useRef, useState} from 'react'
import {View, Text, TouchableOpacity, FlatList} from 'react-native'
import {ImageContainer, CustomModal} from '../../../components'

import {strings} from '../../../strings'
import {SCREEN_HEIGHT, ThemeFunctions} from '../../../utils'
import {Icon} from 'react-native-elements'
import {useSelector} from 'react-redux'
import Colors, {rapunzelTheme} from '../../../theme/Colors'
import {modalStyles as styles} from '../../gbex/styles'
import {commonStyles, rtlStyles} from '../../../globalstyles/styles'
import * as Images from '../../../assets'
import {MapperConstants, AppConstants} from '../../../constants'
import {withdrawalStyles} from '../styles'
import Clipboard from '@react-native-clipboard/clipboard'
import {showToast} from '../../../utils/GenericUtils'

const ReferenceDetails = ({
  isVisible,
  setIsVisible,
  referenceId,
  ...props
}: any) => {
  const {appTheme, isRtlApproach} = useSelector(
    (state: any) => state.globalReducer,
  )
  const copyToClipboard = (text: string) => () => {
    Clipboard.setString(text)
    showToast('', strings('copied'), 'info')
  }

  return (
    <CustomModal visibility={isVisible} style={[styles.typemodals]}>
      <View>
        <View
          style={[styles.header, isRtlApproach ? rtlStyles.reverseRow : {}]}>
          <View style={{width: 10}} />
          <Text
            style={[styles.headerText, ThemeFunctions.getTextColor(appTheme)]}
            adjustsFontSizeToFit={true}>
            {strings('payment_reference')}
          </Text>
          <TouchableOpacity
            onPress={() => setIsVisible(MapperConstants.StatusMapper.disable)}
            style={commonStyles.backBtn}>
            <Icon
              name='close'
              iconStyle={{transform: [{scaleX: isRtlApproach ? -1 : 1}]}}
              type='material'
              size={22}
              color={
                ThemeFunctions.isRapunzelTheme(appTheme)
                  ? rapunzelTheme.magenta
                  : Colors.gray
              }
            />
          </TouchableOpacity>
        </View>
        <View
          style={[
            commonStyles.alignCenter,
            commonStyles.marginVerticalView,
            {marginHorizontal: 20},
          ]}>
          <Text
            style={withdrawalStyles.referenceId}
            adjustsFontSizeToFit={true}>
            {referenceId}
          </Text>
          <Text
            style={commonStyles.copy}
            onPress={copyToClipboard(referenceId)}>
            {strings('copy')}
          </Text>
          <View style={styles.underline} />
          <View
            style={[
              commonStyles.rowItem,
              {marginTop: 14},
              isRtlApproach ? rtlStyles.reverseRow : {},
            ]}>
            <Text style={withdrawalStyles.note}>{strings('note')}</Text>
            <Text style={withdrawalStyles.paymentNote}>
              {strings('payment_reference_note')}
            </Text>
          </View>
        </View>
      </View>
    </CustomModal>
  )
}

export default ReferenceDetails
