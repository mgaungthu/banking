import React, {useState} from 'react'
import {TouchableOpacity, Text, View} from 'react-native'
import {commonStyles} from '../../globalstyles/styles'
import {CustomModal, ThemeButton} from '../../components'
import {strings} from '../../strings'
import {useDispatch, useSelector} from 'react-redux'
import Colors from '../../theme/Colors'
import {confirmationStyles, verifyPasscodeStyles} from './styles'
import {Icon} from 'react-native-elements'
import {MapperConstants} from '../../constants'
import {StorageManager} from '../../utils'
import {AuthActions, GlobalActions} from '../../store'
import Navigation from '../../utils/Navigation'
import {Screen} from '../../enums'

const ResetPasscode = ({isVisible, setIsVisible}: any) => {
  const {isRtlApproach} = useSelector((state: any) => state.globalReducer)
  const [loading, setLoading] = useState(MapperConstants.StatusMapper.disable)
  const dispatch = useDispatch()

  const handleForget = async () => {
    setLoading(MapperConstants.StatusMapper.enable)
    await dispatch(GlobalActions.updateUserdata(null))
    await dispatch(AuthActions.updateLoginResponse({}))
    await StorageManager.setItem('tfa_status', null)
    await StorageManager.resetCredentials()
    setIsVisible(MapperConstants.StatusMapper.disable)
    setLoading(MapperConstants.StatusMapper.disable)

    Navigation.reset(Screen.Auth)
  }

  return (
    <CustomModal visibility={isVisible} justify='bottom'>
      <View style={{backgroundColor: Colors.white}}>
        <View style={verifyPasscodeStyles.header}>
          <TouchableOpacity
            style={verifyPasscodeStyles.close}
            onPress={() => setIsVisible(MapperConstants.StatusMapper.disable)}>
            <Icon name='close' type='material' size={22} color={Colors.gray} />
          </TouchableOpacity>
        </View>
        <View style={commonStyles.alignCenter}>
          <View style={verifyPasscodeStyles.text}>
            <Text
              style={[
                verifyPasscodeStyles.reset,
                isRtlApproach ? {marginHorizontal: 6} : {},
              ]}
              adjustsFontSizeToFit={true}>
              {strings('reset_passcode')}
            </Text>
            <Text style={verifyPasscodeStyles.passcodeMsg}>
              {strings('reset_passcode_msg')}
            </Text>
          </View>
          <View style={confirmationStyles.btn}>
            <ThemeButton
              text='logout'
              onClickHandler={handleForget}
              loading={loading}
              isModal={MapperConstants.StatusMapper.enable}
            />
          </View>
        </View>
      </View>
    </CustomModal>
  )
}

export default ResetPasscode
