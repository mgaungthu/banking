import React from 'react'
import {Text, View} from 'react-native'
import {commonStyles} from '../../globalstyles/styles'
import {CustomModal, ImageContainer, ThemeButton} from '../../components'
import {strings} from '../../strings'
import {useSelector} from 'react-redux'
import * as BiometricService from '../../services/BiometricService'
import {logoutStyles as styles} from '../account/styles'
import {confirmationStyles} from './styles'
import {MapperConstants} from '../../constants'
import Navigation from '../../utils/Navigation'
import {Screen} from '../../enums'

const ConfirmationPopup = ({setIsVisible, isVisible}: any) => {
  const {isRtlApproach} = useSelector((state: any) => state.globalReducer)
  const globalData = useSelector((state: any) => state.globalReducer)

  return (
    <CustomModal visibility={isVisible} justify='bottom'>
      <View style={confirmationStyles.container}>
        <View style={commonStyles.alignCenter}>
          <ImageContainer
            imagePath={BiometricService.getBioAuthImgActive(
              globalData.biometryType,
              globalData.appTheme,
            )}
            imgStyle={confirmationStyles.faceIcon}
          />
          <Text
            style={[styles.logout, isRtlApproach ? {marginHorizontal: 6} : {}]}
            numberOfLines={3}
            adjustsFontSizeToFit={true}>
            {strings('not_recognised', {
              key: BiometricService.bioAuthMapper(globalData.biometryType),
            })}
          </Text>
          <View style={confirmationStyles.btn}>
            <ThemeButton
              text='enter_passcode'
              onClickHandler={() => {
                setIsVisible(MapperConstants.StatusMapper.disable)
                Navigation.reset(Screen.VerifyPasscode)
              }}
              loading={false}
              isModal={MapperConstants.StatusMapper.enable}
            />
          </View>
        </View>
      </View>
    </CustomModal>
  )
}

export default ConfirmationPopup
