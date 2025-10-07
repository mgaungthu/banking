import React, {useEffect, useRef} from 'react';
import {View, Button, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import {CurrentConfig} from '../../../api_config';

const GoogleReCaptcha = ({
  needRecaptcha,
  setNeedRecaptcha,
  getToken,
  baseURL,
}) => {
  const webViewRef = useRef(null);

  useEffect(() => {
    if (needRecaptcha) {
      reloadWebView();
    }
    const timer = setTimeout(() => {
      setNeedRecaptcha(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [needRecaptcha]);

  const reloadWebView = async () => {
    await webViewRef.current.reload();
  };

  return (
    <View style={{flex: 1}}>
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{uri: `${baseURL}/recaptcha`}}
        javaScriptEnabled
        onMessage={event => getToken(event.nativeEvent.data)}
      />
    </View>
  );
};

export default GoogleReCaptcha;
