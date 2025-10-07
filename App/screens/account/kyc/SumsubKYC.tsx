import React, {useEffect, useState, useRef} from 'react';
import {Platform, SafeAreaView, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {makeRequestNew} from '../../../services/ApiService';
import {APIConstants, MapperConstants} from '../../../constants';

const SumsubKYC = () => {
  const [token, setToken] = useState('');
  useEffect(() => {
    getSumSubToken();
  }, []);

  const getSumSubToken = async () => {
    const response = await makeRequestNew(
      MapperConstants.ApiTypes.POST,
      APIConstants.GET_SUMSUB_TOKEN,
    );

    if (response.status === 200) {
      setToken(response.data.token.token);
      //   return response.data.token.token;
    }
  };

  const indexPage = 'index.html';
  const uri =
    Platform.OS === 'android'
      ? `file:///android_asset/sumsub/${indexPage}`
      : `tv/${indexPage}`;

  const injectedJavascript = `
        function getNewAccessToken() {
         return promise.resolve("${token}")
        }
        launchWebSdk("${token}");
        true;`;
  return (
    <View style={{flex: 1}}>
      {token ? (
        <>
          <WebView
            source={{uri}}
            nestedScrollEnabled={true}
            allowFileAccessFromFileURLs={true}
            allowFileAccess={true}
            originWhitelist={['*']}
            injectedJavaScript={injectedJavascript}
            // onMessage={onMessage}
            // onShouldStartLoadWithRequest={event => {
            //   if (event?.url.includes('http')) {
            //     Linking.openURL(event?.url);
            //     return false;
            //   }
            //   return true;
            // }}
          />
        </>
      ) : (
        <></>
      )}
    </View>
  );
};

export default SumsubKYC;
