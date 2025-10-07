import React from 'react'
import {View} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import DismissKeyboardView from '../hoc/DismissKeyboard'

const AwareScroll = (Comp: any) => {
  return ({children, ...props}: any) => (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps={props.persistTap ? 'never' : 'handled'}>
      <DismissKeyboardView>
        <Comp {...props}>{children}</Comp>
      </DismissKeyboardView>
    </KeyboardAwareScrollView>
  )
}
const AwareScrollView = AwareScroll(View)
export default AwareScrollView
