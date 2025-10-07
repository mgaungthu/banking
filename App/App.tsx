import React, {useEffect} from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {configureStore} from './store/StoreManager';
import AppNavigator from './layout/Navigation';
import {
  Connectivity,
  SocketWrapper,
  Informer,
  AppUpdate,
  CustomFallback,
  StateManagement,
} from './components';
import Toast from 'react-native-toast-message';
import './strings/localization';

const {store, persistor} = configureStore();
import {enableScreens} from 'react-native-screens';
import messaging from '@react-native-firebase/messaging';
import ConfigToast from './components/event/ConfigToast';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Bugsnag from '@bugsnag/react-native';

Bugsnag.start();

const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React);

enableScreens();

const App = () => {
  useEffect(() => {
    messaging().requestPermission();
    SplashScreen.hide();

    //
  }, []);

  return (
    <Provider store={store}>
      <ErrorBoundary FallbackComponent={CustomFallback}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <Connectivity />
            <Informer />
            <AppNavigator />
            <AppUpdate />
            <StateManagement />
            <Toast config={ConfigToast} />
            <SocketWrapper />
          </SafeAreaProvider>
        </PersistGate>
      </ErrorBoundary>
    </Provider>
  );
};
export default App;
