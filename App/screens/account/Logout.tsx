import React from 'react'
import {TouchableOpacity, Text, View} from 'react-native'
import {commonStyles, rtlStyles} from '../../globalstyles/styles'
import * as Images from '../../assets'
import {CustomModal, ImageContainer, ThemeButton, ThemeText} from '../../components'
import {strings} from '../../strings'
import {Icon} from 'react-native-elements'
import {useSelector} from 'react-redux'

import {logoutStyles as styles} from './styles'
import Colors from '../../theme/Colors'
import {MapperConstants} from '../../constants'
import { ThemeFunctions } from '../../utils'

const Logout = (props: any) => {
  const {isVisible, setIsLogoutVisible, handleLogout, loading} = props
  const {isRtlApproach, appTheme} = useSelector((state: any) => state.globalReducer)

  return (
    <CustomModal visibility={isVisible}>
      <View style={[styles.container, ThemeFunctions.setBackground(appTheme)]}>
        <View
          style={[styles.header, isRtlApproach ? rtlStyles.reverseRow : {}]}>
          <ThemeText style={styles.warning}>{strings('warning')}</ThemeText>
          <TouchableOpacity
            style={[commonStyles.backBtn, ThemeFunctions.setIEOCardBG(appTheme),{margin:4}]}
            onPress={() => {
              setIsLogoutVisible(false)
            }}>
            <Icon name='close' type='material' size={22} color={ThemeFunctions.getCurrentTextColor(appTheme)} />
          </TouchableOpacity>
        </View>
        <View
          style={[
            commonStyles.rowItem,
            styles.logoutMsg,
            isRtlApproach ? rtlStyles.reverseRow : {},
          ]}>
          <ImageContainer
            imagePath={Images.IcWarning}
            imgStyle={styles.warningIc}
          />
          <ThemeText
            style={[styles.logout, isRtlApproach ? {marginHorizontal: 6} : {}]}
            numberOfLines={3}
            adjustsFontSizeToFit={true}>
            {strings('logout_alert')}
          </ThemeText>
        </View>
        <View style={styles.btn}>
          <ThemeButton
            text='proceed'
            onClickHandler={handleLogout}
            loading={loading}
            isModal={MapperConstants.StatusMapper.enable}
          />
        </View>
      </View>
    </CustomModal>
  )
}

export default Logout
