import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, Keyboard} from 'react-native'
import {useForm} from 'react-hook-form'
import {verificationStyles as styles} from '../../auth/style'
import {Input, ThemeButton, CustomModal} from '../../../components'
import {
  FormConstants,
  Loader,
  ReturnKeyTypes,
} from '../../../enums'
import {strings} from '../../../strings'
import {RegexExpression} from '../../../utils'
import {Icon} from 'react-native-elements'
import {MapperConstants} from '../../../constants'
import {useDispatch, useSelector} from 'react-redux'
import {AppActions} from '../../../store'
import {rtlStyles} from '../../../globalstyles/styles'
import { isIOS } from '../../../utils/DeviceConfig'
import { lightTheme } from '../../../theme/Colors'

const VerifyUsingGoogleAuth = ({
  isVisible,
  setIsVisible,
  userData,
  responseFunc,
  ...props
}: any) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm()
  const [isKeyboardVisible, setKeyboardVisible] = useState(false)
  const [keyboardHeight, setKeyboardHeight] = useState(0)
  const {isRtlApproach} = useSelector((state: any) => state.globalReducer)

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        setKeyboardHeight(e.endCoordinates.height)
        setKeyboardVisible(true) // or some other action
      },
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0)
        setKeyboardVisible(false) // or some other action
      },
    )

    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])
  const dispatch = useDispatch()
  const {loading} = useSelector((state: any) => state.appReducer)

  const submitResponse = () => {
    responseFunc()
    reset()
  }
  const onSubmit = async data => {
    let requestObject = {...userData, code: data.otp}
    dispatch(AppActions.changePassword(requestObject, submitResponse))
  }

  const handleClose = () => {
    setIsVisible(MapperConstants.StatusMapper.disable)
    reset()
  }

  return (
    <CustomModal
      visibility={isVisible}
      style={
        isKeyboardVisible && isIOS()
          ? [styles.popupView1, {bottom: keyboardHeight}]
          : styles.popupView
      }>
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={[isRtlApproach ? styles.closeBtn1 : styles.closeBtn]}
          onPress={handleClose}>
          <Icon name='clear' type='material' size={20} />
        </TouchableOpacity>
        <Text style={styles.heading}>{strings('google_auth')}</Text>
        <Input
          id={FormConstants.OTP}
          placeholder={strings('google_auth')}
          maxLength={6}
          minLength={6}
          control={control}
          errors={errors}
          isFieldFilledBg={true}
          pattern={RegexExpression.NUMBER_REGEX}
          isRequired={true}
          keyboardType='phone-pad'
          fontSize={13}
          showTick={false}
          returnKeyType={ReturnKeyTypes.Go}
          isModal={MapperConstants.StatusMapper.enable}
          customStyles={{backgroundColor: 'white'}}
          customInputStyles={{color: lightTheme.text}}
        />
      </View>

      <ThemeButton
        text='submit'
        isModal={MapperConstants.StatusMapper.enable}
        onClickHandler={handleSubmit(onSubmit)}
        loading={loading === Loader.CHANGE_PASSWORD_PROCESSED}
      />
    </CustomModal>
  )
}

export default VerifyUsingGoogleAuth
