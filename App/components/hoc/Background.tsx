import React from 'react'
import {ImageBackground, View} from 'react-native'
import {commonStyles} from '../../globalstyles/styles'

const BackgroundView = (Comp: any) => {
  return ({children, customStyle, ...props}: any) => (
    <ImageBackground
      style={customStyle ? customStyle : commonStyles.bgView}
      source={props.imagePath}>
      <Comp {...props}>{children}</Comp>
    </ImageBackground>
  )
}
const Background = BackgroundView(View)
export default Background
