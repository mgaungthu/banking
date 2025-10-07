import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Screen} from '../enums';
import {
  Login,
  Signup,
  WebViewWrapper,
  ChooseLanguage,
  ForgotPasswordEnterEmail,
  SelectRegion,
} from './index';
import EventInvite from '../components/event/EventInvite';
import PDFViewerScreen from '../components/ui/PDFViewerScreen';
import {Text, View} from 'react-native';
import {getItem} from '../utils';

const Stack = createStackNavigator();

const checkRegionSelected = () => {
  const selected = CheckSelected();
  // console.log(selected);
  // if (selected) {
  //   return Screen.Login;
  // }
  return Screen.Login;
};

const CheckSelected = async () => {
  const region = await getItem('Region');
  console.log(region.url);
  return region.url ? true : false;
};

const App = () => {
  return (
    <>
      <EventInvite />
      <Stack.Navigator
        initialRouteName={checkRegionSelected()}
        screenOptions={{
          headerMode: 'none',
        }}>
        <Stack.Screen name={Screen.Login} component={Login} />
        <Stack.Screen name={Screen.SelectRegion} component={SelectRegion} />
        <Stack.Screen name={Screen.Signup} component={Signup} />
        <Stack.Screen name={Screen.WebViewWrapper} component={WebViewWrapper} />
        <Stack.Screen
          name={Screen.PDFViewerScreen}
          component={PDFViewerScreen}
        />
        <Stack.Screen name={Screen.SelectLanguage} component={ChooseLanguage} />
        <Stack.Screen
          name={Screen.ForgotPasswordEnterEmail}
          component={ForgotPasswordEnterEmail}
        />
      </Stack.Navigator>
    </>
  );
};

export default App;
