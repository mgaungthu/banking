import React from 'react';
import WebView from 'react-native-webview';

export const Tradingview = ({ symbol }) => {
    return <WebView
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
            <div>
                <div style="height:90vh" id="tradingview_220f8"></div>
                <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
                <script type="text/javascript">
                    new TradingView.widget(
                        {
                            "autosize": true,
                            "symbol": "BINANCE:${symbol}",
                            "interval": "1H",
                            "timezone": "Etc/UTC",
                            "theme": "light",
                            "style": "1",
                            "locale": "en",
                            "toolbar_bg": "#f1f3f6",
                            "enable_publishing": false,
                            "allow_symbol_change": false,
                            "container_id": "tradingview_220f8"
                        }
                    );
                </script>
            </div>
        </body>                        
        </html>` }}
    />
}