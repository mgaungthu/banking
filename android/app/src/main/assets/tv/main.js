const tradingEngineSocketApiKey = '231864df-d709-45c2-913c-378f8d29d1cf';
const tradingEngineSocketUrl = "wss://staging2trdeng.globiance.com/";
const ServerUTCDiff = 19800000;

const supportedResolutions = ["1", "3", "5", "15", "30", "60", "120", "240", "1D", "1W", "M"]

const getSupportedResolution = (x) => {
  if (x==="1D") return "D"
  if (x==="1W") return "W"
  if (x==="1M") return "M"
  return x
}

const config = {
    supported_resolutions: supportedResolutions
};

const pairDecimals = {
    "XDC-ETH": [8],
    "XDC-BTC": [10],
    "XDC-XRP": [8],
    "XDC-XDCE": [8],
    "XDC-USDT": [8],
    "XDC-USDC": [8],
    "ETH-USDT": [2],
    "BTC-USDC": [2],
    "XRP-USDT": [5],
    "BTC-USDT": [2],

    "ETH-BTC": [4],
    "BTC-EUR": [2],
    "ETH-EUR": [2],
    "XRP-BTC": [8],
    "XRP-EUR": [5],
    "SRX-XDC": [2],
    "PLI-XDC": [2],
    "PLI-USDG": [3],
    "LGCY-XDC": [3],
    "USDG-USDT": [2],
    "USDG-USDC": [2],
    "GBEX-EURG": [10],
    "GBEX-USDG": [10],
    "GBEX-XDC": [10],
    "GBEX-XRP": [10],


    "XDC-USDG": [8],
    "ETH-USDG": [2],
    "BTC-USDG": [2],
    "XRP-USDG": [8],


    "XDC-EURG": [8],
    "ETH-EURG": [2],
    "BTC-EURG": [2],
    "XRP-EURG": [8],

    "EURG-USDG": [3],

};

const createRpcRequest = (method, params = {}) => {
    return {
        id: 1,
        jsonrpc: '2.0',
        method: method,
        params: params
    };
};

const tradingEngineSocket = io(tradingEngineSocketUrl, {
    transports: ['websocket'],
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    withCredentials: true,
    auth: {
        id: 'Globiance UI',
        token: tradingEngineSocketApiKey
    }
});

const history = {};

async function getBarsFromTradingEngine(market, resolution, from, to) {
    return new Promise(resolve => {
        tradingEngineSocket.send(createRpcRequest('kline.query', {
            "market": market,
            "interval": resolution,
            "start": from,
            "end": to
        }));

        tradingEngineSocket.once('kline.query', response => {
            resolve(response);
        });
    });
}

const historyProvider = {
    history: history,

    getBars: async function (symbolInfo, resolution, from, to, first, limit) {
        const [stock, money] = symbolInfo.name.split('-');
        const market = stock + money;
        const resp = await getBarsFromTradingEngine(market, getSupportedResolution(resolution), from, to);
        const bars = JSON.parse(resp);

        if (first && bars.length >= 0) {
            const lastBar = bars.length ? bars[bars.length - 1] : null;
            history[symbolInfo.name] = { lastBar: lastBar };
        }

        if (!bars.length) {
            return []
        }

        return bars;
    },
};

let socket = io.connect(tradingEngineSocketUrl, {
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    auth: {
        token: tradingEngineSocketApiKey
    }
});

function createEventListener(market) {
    socket.on(`kline~${market}`, response => {
        const responseObj = JSON.parse(response);
        const { market } = responseObj;
        const sub = _subs.find((e) => e.channelString === market);

        if (sub && responseObj.data[0]) {
            let _lastBar;
            if (sub.lastBar) {
                // responseObj.records[0].time = responseObj.data[0].time - ServerUTCDiff;

                if (responseObj.data[0].time < sub.lastBar.time) {
                    return;
                }

                _lastBar = updateBar(responseObj.data[0], sub);
            } else {
                _lastBar = { ...responseObj.data[0] };
            }

            if (!_lastBar) {
                return;
            }

            sub.listener(_lastBar);
            sub.lastBar = _lastBar;
        }
    });
}

var _subs = [];
const tradingEngineSubs = new Map();

const stream = {
    subscribeBars: function (symbolInfo, resolution, updateCb, uid, resetCache) {
        const market = symbolInfo.name.split('-').join('');

        const params = {
            "market": market,
            "interval": resolution,
            "offset": -1
        }

        socket.send(createRpcRequest('kline.subscribe', params));
        tradingEngineSubs.set(uid, params);

        var newSub = {
            channelString: market,
            uid,
            resolution,
            symbolInfo,
            lastBar: historyProvider.history[symbolInfo.name].lastBar,
            listener: updateCb,
        };

        _subs.push(newSub);
        createEventListener(market);
    },
    unsubscribeBars: function (uid) {
        var subIndex = _subs.findIndex((e) => e.uid === uid);
        if (subIndex === -1) {
            //console.log("No subscription found for ",uid)
            return;
        }

        if (!tradingEngineSubs.has(uid)) {
            return;
        }

        const params = tradingEngineSubs.get(uid);
        socket.send(createRpcRequest('kline.unsubscribe', params));

        var sub = _subs[subIndex];
        _subs.splice(subIndex, 1);
    },
};


function updateBar(data, sub) {
    var lastBar = sub.lastBar;
    let resolution = sub.resolution;
    if (resolution.includes("D")) {
        resolution = 1440;
    } else if (resolution.includes("W")) {
        resolution = 10080;
    }
    var coeff = resolution * 60;
    console.log({ coeff })
    var rounded = Math.floor((data.time / 1000) / coeff) * coeff;
    var lastBarSec = Math.floor(lastBar.time / (coeff * 1000)) * (coeff * 1000);
    var _lastBar;

    console.log("Lastbar time: Rounded ", rounded);
    console.log("Lastbar time: Data.ts ", data);
    console.log("Lastbar time: lastBarSec ", lastBarSec);
    console.log("Lastbar time: lastBar.time ", lastBar.time);

    if (data.time > lastBar.time) {
        _lastBar = {
            time: data.time,
            open: lastBar.close,
            high: lastBar.close,
            low: lastBar.close,
            close: data.close,
            volume: parseFloat(data.volume),
        };
    } else {
        if (data.close < lastBar.low) {
            lastBar.low = data.close;
        } else if (data.close > lastBar.high) {
            lastBar.high = data.close;
        }
        lastBar.volume = data.volume;
        lastBar.close = data.close;

        _lastBar = lastBar;
    }

    console.log('upd', _lastBar);
    return _lastBar;
}

function createChannelString(symbolInfo) {
    var channel = symbolInfo.name.split('-')
    const exchange = 'Globiance';
    return `0~${exchange}~${channel[0]}~${channel[1]}`
}

var Datafeed = (pricescale) => { return {
    onReady: cb => {
        setTimeout(() => cb(config), 0)

    },
    searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
    },
    resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
        var split_data = symbolName.split(/[:/]/)
        var symbol_stub = {
            name: symbolName,
            description: '',
            type: 'crypto',
            session: '24x7',
            timezone: 'UTC',
            ticker: symbolName,
            minmov: 1,
            pricescale: Math.pow(10, pricescale),
            has_intraday: true,
            has_daily: true,
            has_weekly_and_monthly: true,
            supported_resolution: supportedResolutions,
            volume_precision: 8,
            data_status: 'streaming',
            has_empty_bars: true
        }
        setTimeout(function () {
            onSymbolResolvedCallback(symbol_stub)
        }, 0)
    },
    getBars: async function (symbolInfo, resolution, {from, to,firstDataRequest}, onHistoryCallback, onErrorCallback) {
        try {
            const bars = await historyProvider.getBars(symbolInfo, resolution, from, to, firstDataRequest);

            if (bars.length > 0) {
                onHistoryCallback(bars, { noData: false })
            } else {
                onHistoryCallback([], { noData: true })
            }
        } catch (err) {
            console.error(err);
            onErrorCallback(err);
        }
    },
    subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {
        stream.subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback)
    },
    unsubscribeBars: subscriberUID => {
        stream.unsubscribeBars(subscriberUID)
    },
    calculateHistoryDepth: (resolution, resolutionBack, intervalBack) => {
        return resolution < 30 ? { resolutionBack: 'D', intervalBack: '1' } : undefined
    },
    getMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
    },
    getTimeScaleMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
    },
    getServerTime: cb => {
    }
}
}