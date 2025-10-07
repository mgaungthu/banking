import React, { useState } from 'react'
import { SafeAreaView, View } from 'react-native'
import { commonStyles } from '../../../globalstyles/styles'
import {
  DismissKeyboardView,
  Header,
  ThemeButton,
} from '../../../components'
import { accountStyles as styles } from '../styles'
import { strings } from '../../../strings'
import { useForm } from 'react-hook-form'
import ChangePasswordForm from './ChangePasswordForm'
import { MapperConstants } from '../../../constants'
import { AppActions } from '../../../store'
import { useSelector, useDispatch } from 'react-redux'
import VerifyUsingGoogleAuth from './VerifyUsingGoogleAuth'
import { showToast } from '../../../utils/GenericUtils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ThemeFunctions } from '../../../utils'

const ChangePassword = (props: any) => {
  const {
    control,
    formState: { errors },
    setValue,
    getValues,
    handleSubmit,
    reset,
  } = useForm()
  const [isVisible, setIsVisible] = useState(
    MapperConstants.StatusMapper.disable,
  )
  const dispatch = useDispatch()
  const { userProfileData } = useSelector((state: any) => state.appReducer)
  const { appTheme } = useSelector((state: any) => state.globalReducer)

  const responseFunc = () => {
    setIsVisible(MapperConstants.StatusMapper.disable)
    reset()
  }
  const onChangePasswordClicked = async (data: any) => {
    await dispatch(AppActions.getUserProfile())
    if (data.newPassword !== data.confirmPassword) {
      showToast(
        strings('change_password'),
        strings('password_not_matched'),
        'error',
      )
      return
    }
    let requestObject = { ...data }

    if (
      userProfileData?.tfaStatus === 1 ||
      userProfileData?.tfaStatus === 'enable' ||
      userProfileData?.tfaStatus === '1'
    ) {
      setIsVisible(MapperConstants.StatusMapper.enable)
    } else {
      dispatch(AppActions.changePassword(requestObject, responseFunc))
    }
  }

  return (
    <SafeAreaView
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      {/* <Background imagePath={Images.BgLogin} /> */}
      <Header title={strings('change_password')} />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps='handled'>
        <DismissKeyboardView>
          <ChangePasswordForm
            control={control}
            setValue={setValue}
            errors={errors}
          />
          <VerifyUsingGoogleAuth
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            userData={getValues()}
            responseFunc={responseFunc}
          />
        </DismissKeyboardView>
      </KeyboardAwareScrollView>
      <View style={commonStyles.paddingHorizontalView}>
        <ThemeButton
          text='change_password'
          onClickHandler={handleSubmit(onChangePasswordClicked)}
        />
      </View>
    </SafeAreaView>
  )
}

export default ChangePassword
