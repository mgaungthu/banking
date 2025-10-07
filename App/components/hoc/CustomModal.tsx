import React from 'react'
import {StatusBar, View} from 'react-native'
import Modal from 'react-native-modal'
import { isIOS } from '../../utils/DeviceConfig'

const CustomModal = (Comp: any) => {
  return ({children, onBackdropPress, ...props}: any) => (
    <Modal
      isVisible={props.visibility}
      backdropOpacity={0.2}
      style={{
        margin: 0,
        justifyContent: props.justify ? 'flex-end' : 'center',
        backgroundColor:props.customBackground?props.customBackground:'transparent',
      }}
      hideModalContentWhileAnimating={true}
      onBackdropPress={onBackdropPress}
    >
      <Comp {...props}>{children}</Comp>
    </Modal>
  )
}
const DismissKeyboardView = CustomModal(View)
export default DismissKeyboardView
