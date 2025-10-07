import React, {useEffect, useState} from 'react'
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  BackHandler,
} from 'react-native'
import {commonStyles, rtlStyles} from '../../globalstyles/styles'
import * as Images from '../../assets'
import {
  OtpInputContainer,
  ThemeButton,
  ImageContainer,
  AppTermination,
  AwareScrollView,
} from '../../components'
import {GenericFunctions, StorageManager} from '../../utils'
import {strings} from '../../strings'
import {verifyPasscodeStyles as styles} from '../../screens/bioauth/styles'
import Colors from '../../theme/Colors'
import {Icon} from 'react-native-elements'
import ResetPasscode from '../../screens/bioauth/ResetPasscode'
import {MapperConstants} from '../../constants'
import {useFocusEffect} from '@react-navigation/native'
import {useSelector} from 'react-redux'
import Toast from 'react-native-toast-message'

const VerifyPasscode = (props: any) => {
  const [passcode, setPasscode] = useState<any>('')
  const [isForgetPasscode, setIsForgetPasscode] = useState<Boolean>(
    MapperConstants.StatusMapper.disable,
  )
  const {isRtlApproach} = useSelector((state: any) => state.globalReducer)

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
      if (credentials.password === passcode) {
        props?.route.params.setIsVisible(MapperConstants.StatusMapper.disable)
        props.navigation.pop(1)
      } else {
        GenericFunctions.showToast(
          strings('verify_passcode'),
          strings('passcode_error'),
          'info',
        )
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

  const handleBack = () => {
    setIsTermination(MapperConstants.StatusMapper.enable)
  }
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        handleBack()
        return true
      }
      BackHandler.addEventListener('hardwareBackPress', onBackPress)
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress)
    }, []),
  )
  return (
    <SafeAreaView style={commonStyles.safeView}>
      <View
        style={[
          styles.header,
          isRtlApproach ? rtlStyles.alignStart : rtlStyles.alignEnd,
        ]}>
        <TouchableOpacity style={styles.close} onPress={handleBack}>
          <Icon name='close' type='material' size={22} color={Colors.gray} />
        </TouchableOpacity>
      </View>
      <AwareScrollView persistTap='never'>
        <View style={[commonStyles.alignCenter, styles.container]}>
          <ImageContainer
            imagePath={Images.Lock}
            imgStyle={styles.lock}
            noTransform={true}
          />
          <Text style={styles.label}>{strings('enter_your_passcode')}</Text>
          <OtpInputContainer
            passcode={passcode}
            updatePasscode={setPasscode}
            filled={true}
            isValid={isValid}
            secureTextEntry={MapperConstants.StatusMapper.enable}
          />
          <Text
            style={styles.forgotText}
            onPress={() =>
              setIsForgetPasscode(MapperConstants.StatusMapper.enable)
            }>
            {strings('forgot_passcode')}?
          </Text>
          <View style={styles.btnContainer}>
            <ThemeButton
              text='continue'
              onClickHandler={handleSubmit}
              loading={loading}
            />
          </View>
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
    </SafeAreaView>
  )
}

export default VerifyPasscode
