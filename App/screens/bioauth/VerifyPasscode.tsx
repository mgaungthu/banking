import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  BackHandler,
} from 'react-native'
import { commonStyles, rtlStyles } from '../../globalstyles/styles'
import * as Images from '../../assets'
import {
  OtpInputContainer,
  ThemeButton,
  ImageContainer,
  AppTermination,
  AwareScrollView,
} from '../../components'
import { StorageManager, ThemeFunctions } from '../../utils'
import { strings } from '../../strings'
import { verifyPasscodeStyles as styles } from './styles'
import Colors, { rapunzelTheme } from '../../theme/Colors'
import { Screen } from '../../enums'
import { Icon } from 'react-native-elements'
import ResetPasscode from './ResetPasscode'
import { MapperConstants } from '../../constants'
import Navigation from '../../utils/Navigation'
import { showToast } from '../../utils/GenericUtils'
import { useFocusEffect } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const VerifyPasscode = (props: any) => {
  const [passcode, setPasscode] = useState<any>('')
  const isFromScreen = props?.route?.params?.fromScreen ? true : false
  const [isForgetPasscode, setIsForgetPasscode] = useState<Boolean>(
    MapperConstants.StatusMapper.disable,
  )
  const { isRtlApproach, appTheme } = useSelector(
    (state: any) => state.globalReducer,
  )

  const [loading, setLoading] = useState(MapperConstants.StatusMapper.disable)
  const [isTermination, setIsTermination] = useState(
    MapperConstants.StatusMapper.disable,
  )
  const [isValid, setIsValid] = useState(MapperConstants.StatusMapper.enable)

  const handleSubmit = async () => {
    if (passcode.length === 4) {
      setLoading(MapperConstants.StatusMapper.enable)
      setIsValid(MapperConstants.StatusMapper.enable)
      const credentials = await StorageManager.getCredentialsAsync()
      setLoading(MapperConstants.StatusMapper.disable)

      if (credentials && credentials.password === passcode) {
        !isFromScreen
          ? Navigation.reset(Screen.App)
          : Navigation.navigate(Screen.ChangePasscode, {
            fromScreen: Screen.CurrentPasscode,
          })
      } else {
        setIsValid(MapperConstants.StatusMapper.disable)
        showToast(strings('verify_passcode'), strings('passcode_error'), 'info')
      }
    } else {
      setIsValid(MapperConstants.StatusMapper.disable)
    }
  }

  useEffect(() => {
    checkIsValid()
  }, [passcode.length])

  const checkIsValid = async () => {
    const credentials = await StorageManager.getCredentialsAsync()
    if (passcode.length === 4 && credentials.password === passcode) {
      setIsValid(MapperConstants.StatusMapper.enable)
    }
  }

  const handleClose = () => {
    // terminate app
    if (!isFromScreen) setIsTermination(MapperConstants.StatusMapper.enable)
    else Navigation.goBack()
  }

  const handleBack = () => {
    setIsTermination(MapperConstants.StatusMapper.enable)
  }
  useFocusEffect(
    React.useCallback(() => {
      if (!isFromScreen) {
        const onBackPress = () => {
          handleBack()
          return true
        }
        BackHandler.addEventListener('hardwareBackPress', onBackPress)
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', onBackPress)
      }
    }, []),
  )
  return (
    <SafeAreaView
      style={[commonStyles.safeView, ThemeFunctions.setBackground(appTheme)]}>
      <View
        style={[
          styles.header,
          isRtlApproach ? rtlStyles.alignStart : rtlStyles.alignEnd,
        ]}>
        <TouchableOpacity style={styles.close} onPress={handleClose}>
          <Icon
            name='close'
            type='material'
            size={22}
            color={Colors.gray}
          />
        </TouchableOpacity>
      </View>
      <AwareScrollView>
        <View style={[commonStyles.alignCenter, styles.container]}>
          <ImageContainer
            imagePath={Images.Lock}
            imgStyle={[styles.lock, ThemeFunctions.imgColor(appTheme)]}
            noTransform={true}
          />
          <Text
            style={[
              styles.label,
              ThemeFunctions.textColor(appTheme),
            ]}>
            {strings(
              isFromScreen ? 'enter_current_passcode' : 'enter_your_passcode',
            )}
          </Text>
          <OtpInputContainer
            passcode={passcode}
            updatePasscode={setPasscode}
            filled={true}
            isValid={isValid}
            secureTextEntry={MapperConstants.StatusMapper.enable}
          />
          <Text
            style={[styles.forgotText, ThemeFunctions.textColor(appTheme)]}
            onPress={() =>
              setIsForgetPasscode(MapperConstants.StatusMapper.enable)
            }>
            {strings('forgot_passcode')}?
          </Text>
        </View>
        <ResetPasscode
          isVisible={isForgetPasscode}
          setIsVisible={setIsForgetPasscode}
        />
        <AppTermination
          isVisible={isTermination}
          setIsVisible={setIsTermination}
          showCancel={MapperConstants.StatusMapper.enable}
          msg='terminate_app'
        />
      </AwareScrollView>
      <View style={styles.btnContainer}>
        <ThemeButton
          text='continue'
          onClickHandler={handleSubmit}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  )
}

export default VerifyPasscode
