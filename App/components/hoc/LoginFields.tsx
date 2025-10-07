import React from 'react'
import {View} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {commonStyles} from '../../globalstyles/styles'

const LoginFieldsView = (Comp: any) => {
  return ({children, ...props}: any) => (
    <KeyboardAwareScrollView
      contentContainerStyle={commonStyles.paddingHorizontalView}
      keyboardShouldPersistTaps='handled'>
      <Comp {...props}>{children}</Comp>
    </KeyboardAwareScrollView>
  )
}
const LoginFields = LoginFieldsView(View)
export default LoginFields
