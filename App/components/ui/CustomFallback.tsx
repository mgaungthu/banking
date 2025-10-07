import * as React from 'react'
import {Text, SafeAreaView, View,BackHandler} from 'react-native'
import {strings} from '../../strings'
import ThemeButton from '../ui/ThemeButton'
import {fallbackStyles as styles} from './styles'
import {useDispatch, useSelector} from 'react-redux'
import {ThemeFunctions} from '../../utils'
import Navigation from '../../utils/Navigation'
import {Screen} from '../../enums'
import {  AuthActions, GlobalActions } from '../../store'

const CustomFallback = (props:  { error: Error, resetError: Function }) => {
  const {appTheme} = useSelector((state: any) => state.globalReducer)
  const dispatch = useDispatch()
  return (
    <SafeAreaView
      style={[styles.container, ThemeFunctions.setBackground(appTheme)]}>
      <Text
        style={{...styles.error, color: ThemeFunctions.customText(appTheme)}}>
        {strings('oops')}
      </Text>
      <Text
        style={{...styles.error, color: ThemeFunctions.customText(appTheme)}}>
        {strings('error_boundary_msg')}
      </Text>
      <View style={styles.btn}>
        <ThemeButton text='restart' onClickHandler={() => {
          Navigation.reset(Screen.Auth)
          BackHandler.exitApp()
          dispatch(GlobalActions.updateFavouriteSuccess([]))
          dispatch(AuthActions.clearSession())
          dispatch(GlobalActions.updateMainCurrency({ mainCurrency: 'USD' }))
          dispatch(GlobalActions.updateSecondaryCurrency({ secondCurrency: 'BTC' }))
          dispatch(GlobalActions.hideSmallBalances())
        }} />
      </View>
    </SafeAreaView>
  )
}

export default CustomFallback
