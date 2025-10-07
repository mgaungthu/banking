import React, {useEffect, useState} from 'react'
import {TouchableOpacity, Text, View} from 'react-native'
import {commonStyles, rtlStyles} from '../../globalstyles/styles'
import * as Images from '../../assets'
import {ImageContainer} from '../../components'
import {accountStyles as styles, securityStyles} from '../account/styles'
import {strings} from '../../strings'
import {useDispatch, useSelector} from 'react-redux'
import * as BiometricService from '../../services/BiometricService'
import {MapperConstants} from '../../constants'
import Navigation from '../../utils/Navigation'
import {showToast} from '../../utils/GenericUtils'
import {Switch} from 'react-native-paper'
import {BiometryType, Screen} from '../../enums'
import {ThemeFunctions} from '../../utils'
import {formStyles} from '../../components/forms/styles'

const GbexRow = (props: any) => {
  const {res} = props

  const {isRtlApproach, appTheme} = useSelector(
    (state: any) => state.globalReducer,
  )

  const dispatch = useDispatch()
  const isReverseView = () => {
    return isRtlApproach ? rtlStyles.reverseRow : {}
  }

  const handleRoute = async () => {
    Navigation.navigate(res.route, {
      fromScreen: Screen.Security,
    })
  }
  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        key={res.id}
        onPress={handleRoute}
        style={[securityStyles.item, isReverseView()]}>
        <View style={[styles.leftView, isReverseView()]}>
          {res.icon && (
            <ImageContainer imagePath={res.icon} imgStyle={styles.leftIcon} />
          )}
          <View style={{}}>
            <Text
              style={[
                securityStyles.label,
                isRtlApproach
                  ? {marginEnd: 10, color: ThemeFunctions.customText(appTheme)}
                  : {color: ThemeFunctions.customText(appTheme)},
              ]}>
              {strings(res.title)}
            </Text>
          </View>
        </View>
        <ImageContainer
          imagePath={Images.IcForwardArrow}
          imgStyle={[styles.rightIcon, ThemeFunctions.imgColor(appTheme)]}
        />
      </TouchableOpacity>
      <View
        style={[securityStyles.line, ThemeFunctions.borderLineColor(appTheme)]}
      />
    </>
  )
}

export default GbexRow
