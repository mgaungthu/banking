import React, {useEffect} from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {Screen} from '../enums'
import {
  SetupPasscode,
  ConfigureBioAuth,
  VerifyBioAuth,
  VerifyPasscode,
} from './index'
import {useSelector} from 'react-redux'
import {ThemeFunctions} from '../utils'

import AuthLoading from './AuthLoading'

const Stack = createStackNavigator()

const BioAuthLoading = () => {
  const {appTheme} = useSelector((state: any) => state.globalReducer)

  const options = () => {
    const navigatorOptions = {
      headerShown: false,
      cardStyle: {backgroundColor: ThemeFunctions.setBackgroundColor(appTheme)},
    }
    return navigatorOptions
  }
  return (
    <Stack.Navigator
      screenOptions={options()}
      initialRouteName={Screen.AuthLoading}>
      <Stack.Screen name={Screen.SetupPasscode} component={SetupPasscode} />
      <Stack.Screen
        name={Screen.ConfigureBioAuth}
        component={ConfigureBioAuth}
      />
      <Stack.Screen name={Screen.VerifyBioAuth} component={VerifyBioAuth} />
      <Stack.Screen name={Screen.VerifyPasscode} component={VerifyPasscode} />
      <Stack.Screen name={Screen.AuthLoading} component={AuthLoading} />
    </Stack.Navigator>
  )
}

export default BioAuthLoading
