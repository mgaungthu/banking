import React, {useRef} from 'react'
import {View} from 'react-native'
import {formStyles as styles} from '../styles'
import {Input} from '../../../components'
import {FormConstants, ReturnKeyTypes} from '../../../enums'
import {strings} from '../../../strings'
import {useSelector} from 'react-redux'
import {ThemeFunctions, RegexExpression} from '../../../utils'
import {MapperConstants} from '../../../constants'

const ChangePasswordForm = (props: any) => {
  const {control, errors, setValue} = props
  const currentPasswordRef = useRef(null)
  const newPasswordRef = useRef(null)
  const confirmNewPasswordRef = useRef(null)
  const {appTheme} = useSelector((state: any) => state.globalReducer)

  return (
    <View style={styles.formView}>
      <Input
        id={FormConstants.CurrentPassword}
        label={strings('oldPassword')}
        placeholder={strings('oldPassword')}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={true}
        reference={currentPasswordRef}
        focusTo={newPasswordRef}
        showTick={false}
        secureTextEntry={true}
        patternCustomMsg={MapperConstants.StatusMapper.enable}
        returnKeyType={ReturnKeyTypes.Next}
        pattern={RegexExpression.PASSWORD_REGEX}
      />

      <Input
        id={FormConstants.NewPassword}
        label={strings('newPassword')}
        placeholder={strings('newPassword')}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={true}
        reference={newPasswordRef}
        focusTo={confirmNewPasswordRef}
        showTick={false}
        pattern={RegexExpression.PASSWORD_REGEX}
        patternCustomMsg={MapperConstants.StatusMapper.enable}
        secureTextEntry={true}
        returnKeyType={ReturnKeyTypes.Next}
      />

      <Input
        id={FormConstants.ConfirmNewPassword}
        label={strings('confirm_new_password')}
        placeholder={strings('confirm_new_password')}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={true}
        reference={confirmNewPasswordRef}
        showTick={false}
        pattern={RegexExpression.PASSWORD_REGEX}
        secureTextEntry={true}
        patternCustomMsg={MapperConstants.StatusMapper.enable}
        returnKeyType={ReturnKeyTypes.Next}
      />
    </View>
  )
}

export default ChangePasswordForm
