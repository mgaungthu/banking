import React, { useEffect, useRef, useState } from 'react'
import { TouchableOpacity, View, Text, Image, ScrollView, TextInput, SafeAreaView, Platform } from 'react-native'
import { commonStyles } from '../../globalstyles/styles'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeFunctions } from '../../utils'
import WebView from 'react-native-webview'
import { Header } from '../../components'
import { strings } from '../../strings'
import Navigation from '../../utils/Navigation'
import { showToast } from '../../utils/GenericUtils'

export default (props) => {
    const appData = useSelector((state: any) => state.appReducer)

    const { appTheme } = useSelector((state: any) => state.globalReducer)

    const dataCheckout = props.route.params?.data;
    const cardName = props.route.params.cardName;

    const backgroundColor = ThemeFunctions.setBackground(appTheme).backgroundColor

    const _renderWebview = () => {
        switch (cardName) {
            case 'axcessms':
                const html = `
                    <meta name="viewport" content="initial-scale=1.0">
                    <div className="qbt-main-panel">
                        <div className="container ">
                        <form
                            action="https://exchange.globiance.com/checkout-status"
                            class="paymentWidgets"
                            data-brands="VISA MASTER AMEX"
                        ></form>
                        </div>
                    </div>
                    <script src="https://eu-prod.oppwa.com//v1/paymentWidgets.js?checkoutId=${dataCheckout?.checkoutId}" async="true"></script>
                    <script type="text/javascript">var wpwlOptions = {
                        maskCvv: true,
                        brandDetection: true,
                        brandDetectionType: "binlist",
                        billingAddress: {
                        country: "${dataCheckout?.country || ""}",
                        state: "${dataCheckout?.state || ""}",
                        city: "${dataCheckout?.city || ""}",
                        postcode: "${dataCheckout?.postcode || ""}",
                        street1: "${dataCheckout?.street1 || ""}",
                    },
                        mandatoryBillingFields: {
                        country: true,
                        state: true,
                        city: true,
                        postcode: true,
                        street1: true,
                        street2: false,
                        },
                    };</script>
                `;
                return (
                    <>
                        <WebView
                            source={{ html }}
                            style={[{ flex: 1, backgroundColor:'transparent' }]}
                            mixedContentMode='always'
                            scalesPageToFit={true}
                        />
                    </>
                )
            default:
                return(
                    <WebView
                        source={{ uri: dataCheckout }}
                        style={[{ flex: 1, backgroundColor:'transparent' }]}
                        mixedContentMode='always'
                        scalesPageToFit={true}
                    />
                )
        }
        return null
    }

    useEffect(() => {
        if (!cardName) {
            showToast(strings('deposit_credit'), 'Error', 'error')
            Navigation.goBack()
        }
    }, [])

    return (
        <View
            style={[
                commonStyles.tabSafeView,
                ThemeFunctions.setBackground(appTheme),
            ]}>
            <Header title='Check out' />
            {_renderWebview()}
        </View>
    )
}
