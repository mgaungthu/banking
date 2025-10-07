// import "./wdyr"; // <-- first import

import React from 'react'
import { AppRegistry } from 'react-native';
import 'react-native-reanimated';
import { Provider as PaperProvider } from 'react-native-paper';


import App from './App/App';
import { name as appName } from './app.json';

export default function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
