import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, useWindowDimensions} from 'react-native';
import {commonStyles} from '../../../globalstyles/styles';
import {Header} from '../../../components';
import {strings} from '../../../strings';
import {creditCardStyles as styles} from '../styles';
import Colors, {rapunzelTheme} from '../../../theme/Colors';
import Functionality from '../tab/Functionality';
import {TabView, TabBar} from 'react-native-tab-view';
import {useSelector} from 'react-redux';
import {ThemeFunctions} from '../../../utils';
import HistoryView from '../../creditcard/tab/History';
import {showToast} from '../../../utils/GenericUtils';
import Navigation from '../../../utils/Navigation';
import WebView from 'react-native-webview';

const CreditCard = (props: any) => {
  const {appTheme} = useSelector((state: any) => state.globalReducer);

  const requestId = props.route.params?.data;  

  useEffect(() => {
    if (!requestId) {
      showToast(strings('deposit_credit'), 'Error', 'error');
      Navigation.goBack();
    }
  }, []);

  return (
    <SafeAreaView
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      <Header title={'Globiance Widget'} isTab={true} />
      <WebView
        scrollEnabled={false}
        source={{
          html: `<!DOCTYPE html>
        <html lang="en">                        
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Tradingview</title>
        </head>                        
        <body>
        <script>
        !function(){
            if(window.PartnerExchangeWidget = window.PartnerExchangeWidget || {open(e){window.partnerWidgetSettings = {immediateOpen: e}}}, "PartnerExchangeWidget" !== window.PartnerExchangeWidget.constructor.name){
                (() => {
                    const e = document.createElement("script");
                    e.type = "text/javascript";
                    e.defer = true;
                    e.src = "https://widget.paybis.com/partner-exchange-widget.js";
                    const t = document.getElementsByTagName("script")[0];
                    t.parentNode.insertBefore(e, t);
                })();
            }
        }();

        // Added code to run once the page loads
        window.onload = function() {
            // Assuming you've defined requestId somewhere in your code.
            const requestId = 'YOUR_REQUEST_ID_VALUE';
            
            window.PartnerExchangeWidget.open({
                requestId: '${requestId}',
            });
        }
    </script>
        </body>                        
        </html>`,
        }}
      />
    </SafeAreaView>
  );
};

export default CreditCard;
