import React from 'react'
import {View} from 'react-native'
import {BottomSheet} from 'react-native-elements'

const BottomPoupView = (Comp: any) => {
  return ({children, ...props}: any) => (
    <BottomSheet isVisible={props.isVisible} containerStyle={props.customStyle}>
      <Comp {...props}>{children}</Comp>
    </BottomSheet>
  )
}
const BottomPoup = BottomPoupView(View)
export default BottomPoup
