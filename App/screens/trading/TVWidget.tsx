import React from 'react';
import {Platform, Alert, ToastAndroid, Linking} from 'react-native';
import {WebView} from 'react-native-webview';
import {useSelector} from 'react-redux';
import {GetPriceScale} from '../../constants/AppConstants';

export const TVWidget = ({pair, ticker}: any) => {
  const {appTheme} = useSelector((state: any) => state.globalReducer);

  const indexPage =
    appTheme === 'dark' ? 'mobile_black.html' : 'mobile_white.html';

  const uri =
    Platform.OS === 'android'
      ? `file:///android_asset/tv/${indexPage}`
      : `tv/${indexPage}`;

  let pricescale = 12;

  if (ticker && ticker.last) {
    pricescale = GetPriceScale(ticker.last);
  }

  const injectedJavascript = `
      initOnReady("${pair}", ${pricescale})
      tvWidget.onChartReady(function() {
          tvWidget.chart().onIntervalChanged().subscribe(
              null,
              function(interval) {
                  const response = { type: "onIntervalChanged", interval: interval }
                  //window.ReactNativeWebView.postMessage accepts one argument, data, 
                  //which will be available on the event object, event.nativeEvent.data. data must be a string.
                  window.ReactNativeWebView.postMessage(JSON.stringify(response));
              }
          );
      });
      true; // note: this is required, or you'll sometimes get silent failures 
            // (https://github.com/react-native-webview/react-native-webview/blob/master/docs/Guide.md)
  `;

  const onMessage =
    Platform.OS === 'android'
      ? event => {
          const data = JSON.parse(event.nativeEvent.data);
          if (data.type === 'onIntervalChanged') {
            ToastAndroid.show(
              'Interval = ' + data.interval,
              ToastAndroid.SHORT,
            );
          }
        }
      : event => {
          const data = JSON.parse(event.nativeEvent.data);
          if (data.type === 'onIntervalChanged') {
            Alert.alert(
              'onIntervalChanged',
              'Interval = ' + data.interval,
              [{text: 'OK', onPress: () => console.log('OK Pressed')}],
              {cancelable: true},
            );
          }
        };

  return (
    <WebView
      source={{uri}}
      nestedScrollEnabled={true}
      allowFileAccessFromFileURLs={true}
      allowFileAccess={true}
      originWhitelist={['*']}
      injectedJavaScript={injectedJavascript}
      onMessage={onMessage}
      onShouldStartLoadWithRequest={event => {
        if (event?.url.includes('http')) {
          Linking.openURL(event?.url);
          return false;
        }
        return true;
      }}
    />
  );
};
