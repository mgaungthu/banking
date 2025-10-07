import React from 'react'
import {View, Text} from 'react-native'
import {gbexStyles as styles} from '../styles'
import * as Images from '../../../assets'
import {strings} from '../../../strings'
import {commonStyles} from '../../../globalstyles/styles'
import {useSelector} from 'react-redux'
import {ThemeFunctions} from '../../../utils'
import {ImageContainer, ThemeText} from '../../../components'
import { AppColor } from '../../../enums'

const Header = (props: any) => {
  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer)

  const _getLogo = () =>{
    switch (appColor) {
      case AppColor.pink:
        return{
          app: Images.ic_app_pink,
          gbex: Images.gb_pink
        }
      case AppColor.green:
        return{
          app: Images.ic_app_green,
          gbex: Images.gb_green
        }
    }
    return {
      app: Images.ic_app_black,
      gbex: Images.gb_black
    }
  }

  return (
    <View style={[commonStyles.rowItem]}>
      <View style={[
          styles.columnItem,
          ThemeFunctions.getCardColor(appTheme),
          styles.rightCol,
          {borderColor: ThemeFunctions.customText(appTheme)}
        ]}>
        <ImageContainer
          imagePath={_getLogo().app}
          imgStyle={[styles.headerIcon]}
        />
        <ThemeText
          style={{
            ...styles.headerLable,
            color: ThemeFunctions.getColor(appColor),
          }}>
          {strings('app')}
        </ThemeText>
      </View>
      <View style={{width: 20}} />
      <View style={[
        styles.columnItem,
        ThemeFunctions.getCardColor(appTheme),
        styles.leftCol,
        {borderColor: ThemeFunctions.customText(appTheme)}
      ]}>
        <ImageContainer
          imagePath={_getLogo().gbex}
          imgStyle={[styles.headerIcon]}
        />
        <ThemeText
          style={{
            ...styles.headerLable,
            color: ThemeFunctions.getColor(appColor),
          }}>
          {strings('gbex')}
        </ThemeText>
      </View>
    </View>
  )
}

export default Header
