import React from 'react'
import {StatusBar} from 'react-native'
import {useSelector} from 'react-redux'
import {ThemeFunctions} from '../../utils'

const CustomStatusBar = ({hidden}: any) => {
  const {appTheme} = useSelector((state: any) => state.globalReducer)
  return (
    <StatusBar
      animated={true}
      backgroundColor={ThemeFunctions.setBackgroundColor(appTheme)}
      barStyle={ThemeFunctions.isDarkTheme(appTheme)? 'light-content': 'dark-content'}
      hidden={hidden}
    />
  )
}

export default CustomStatusBar
