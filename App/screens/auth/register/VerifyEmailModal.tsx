import React from 'react'
import {Text, View, TouchableOpacity} from 'react-native'
import {commonStyles} from '../../../globalstyles/styles'
import {BottomPoup, ThemeButton, CustomModal} from '../../../components'
import {strings} from '../../../strings'
import {verificationStyles} from '../style'
import {Icon} from 'react-native-elements'
import {useSelector} from 'react-redux'
import {MapperConstants} from '../../../constants'

const VerifyEmailModal = (props: any) => {
  const {isVisible, closeClicked, okClicked, description, title} = props
  const {isRtlApproach} = useSelector((state: any) => state.globalReducer)

  return (
    <CustomModal visibility={isVisible} style={verificationStyles.modals}>
      <View style={commonStyles.justifyCenter}>
        <TouchableOpacity
          style={[
            isRtlApproach
              ? verificationStyles.closeBtn1
              : verificationStyles.closeBtn,
            commonStyles.absoluteTopPosition,
          ]}
          onPress={closeClicked}>
          <Icon name='clear' type='material' size={20} />
        </TouchableOpacity>

        <Text
          style={[verificationStyles.heading, commonStyles.marginVerticalView]}>
          {title || strings('verify_email')}
        </Text>

        <Text style={verificationStyles.txtInfo}>
          {description || strings('kindly_check_email')}
        </Text>

        <View style={{width: '100%'}}>
          <ThemeButton
            text='ok'
            onClickHandler={okClicked}
            isModal={MapperConstants.StatusMapper.enable}
          />
        </View>
      </View>
    </CustomModal>
  )
}

export default VerifyEmailModal
