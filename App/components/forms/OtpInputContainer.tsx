import React from 'react'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import {otpStyles as styles} from '../../screens/bioauth/styles'
import Colors, { darkTheme, lightTheme } from '../../theme/Colors'
import {useSelector} from 'react-redux'
import {ThemeFunctions} from '../../utils'
import { isDarkTheme } from '../../utils/ThemeFunctions'

const OtpView = ({
  passcode,
  updatePasscode,
  filled = false,
  isValid = true,
  secureTextEntry = false,
  ...restProps
}: any) => {
  const {appTheme} = useSelector((state: any) => state.globalReducer)

  const borderClass = () => {
    if (filled && isValid) {
      return [
        styles.borderStyles,
        ThemeFunctions.otpBorderColor(appTheme),
        ThemeFunctions.otpInputColor(appTheme, ''),
        ThemeFunctions.textColor(appTheme),
      ]
    }
    if (filled && !isValid) {
      return [
        styles.borderStylesInvalid,
        ThemeFunctions.otpInputColor(appTheme, ''),
        ThemeFunctions.textColor(appTheme),
      ]
    }
    if (!filled && isValid) {
      return [
        styles.underlineStyleBase,
        ThemeFunctions.otpInputColor(appTheme, 'underline'),
        ThemeFunctions.textColor(appTheme),
      ]
    }
    if (!filled && !isValid) {
      return [
        styles.underlineStyleBaseInvalid,
        ThemeFunctions.textColor(appTheme),
      ]
    }
  }

  return (
    <OTPInputView
      style={styles.otpInput}
      pinCount={4}
      code={passcode}
      onCodeChanged={code => {
        updatePasscode(code)
      }}
      autoFocusOnLoad
      editable={true}
      selectionColor={isDarkTheme(appTheme) ? darkTheme.text: lightTheme.text}
      codeInputFieldStyle={borderClass()}
      codeInputHighlightStyle={isValid ? styles.underlineStyleHighLighted : {}}
      onCodeFilled={code => {}}
      secureTextEntry={secureTextEntry}
      {...restProps}
    />
  )
}

export default OtpView
