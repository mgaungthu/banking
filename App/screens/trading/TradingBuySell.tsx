import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';
import _ from "lodash"
import {commonStyles, rtlStyles} from '../../globalstyles/styles';
import {
  ThemeButton,
  Header,
  ThemeText,
  PercentBox,
  Space,
  CustomModal,
  Cell,
  LoadingSpinner,
} from '../../components';
import {AppFunctions, ThemeFunctions} from '../../utils';
import {strings} from '../../strings';
import {buySellStyles, buySellStyles as styles} from './styles';
import Colors, {darkTheme, lightTheme, rapunzelTheme} from '../../theme/Colors';
import {Screen} from '../../enums';
import {Icon} from 'react-native-elements';
import {APIConstants, MapperConstants} from '../../constants';
import {showToast} from '../../utils/GenericUtils';
import {useDispatch, useSelector} from 'react-redux';
import IconVector from '../../components/ui/IconVector';
import {TabView, TabBar} from 'react-native-tab-view';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SelectCoin from './SelectCoin';
import {isDarkTheme} from '../../utils/ThemeFunctions';
import {
  formatDecimal,
  FormatNumber,
  RemoveExpo,
  replaceCost,
  RoundUptoSignificant,
  toRealNumber,
} from '../../utils/AppFunctions';
import {ShouldHighlight} from '../../constants/AppConstants';
import {makeRequest} from '../../services/ApiService';
import TradeHistory from './Tabs/TradeHistory';
import OpenOrder from './Tabs/OpenOrder';
import {useTiker} from '../../utils/hooks/useTiker';
import {changePricePerCent, ordersSort} from '../../utils/trading/helpers';
import {useOrderBook} from '../../utils/hooks/useOrderBook';
import {CurrentConfig} from '../../../api_config';
import {useUserOrders} from '../../utils/hooks/useUserOrders';
import {fundsList} from '../../store/action/quickbuy/QuickBuyAction';

const RootStack = createDrawerNavigator();

export default props => {
  const {appTheme} = useSelector((state: any) => state.globalReducer);
  const quickBuyData = useSelector((state: any) => state.quickBuyReducer);

  const {pair, type, pairId, ticker} = props.route.params;

  return (
    <RootStack.Navigator
      initialRouteName={Screen.TradingBuySellNavigation}
      drawerContent={props => <SelectCoin {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '85%',
          ...ThemeFunctions.setBackground(appTheme),
        },
        swipeEnabled: false,
        lazy: true,
      }}>
      <RootStack.Screen name={Screen.TradingBuySellNavigation}>
        {props => (
          <TradingBuySell
            {...props}
            ticker={ticker}
            pair={pair}
            type={type}
            pairId={pairId}
          />
        )}
      </RootStack.Screen>
    </RootStack.Navigator>
  );
};

const DynamicFontSize = (text: number | string): number => {
  const length = `${text}`.length;

  if (length >= 14) return 10;
  if (length >= 12) return 12;

  return 14;
};

const OrderBookBuy = ({isOrderBookLoading,appColor, listPriceBuy, secondCurrency, selectPrice }) => {  
  return <View style={[buySellStyles.buySideBook]}>
  {isOrderBookLoading ? (
    <LoadingSpinner
      color={ThemeFunctions.getColor(appColor)}
      size="small"
    />
  ) : (
    listPriceBuy.map((item, key) => (
      <View
        style={[
          styles.valueCurrencyContainer,
          ShouldHighlight(
            Math.abs(item.amount) * Math.abs(item.price),
            secondCurrency,
          ) && styles.bgGreen,
        ]}
        key={key}>
        <Pressable
          style={{width: '50%'}}
          onPress={() => selectPrice({...item, side: 'buy'})}>
          <ThemeText
            style={[styles.textGreen, styles.textPrice]}
            numberOfLines={1}>
            {AppFunctions.FormatNumber(+item?.price || 0, 4, 0)}
          </ThemeText>
        </Pressable>
        <Pressable
          style={{width: '50%'}}
          onPress={() => selectPrice({...item, side: 'buy'})}>
          <ThemeText
            style={[styles.textAmount, styles.textPrice]}
            numberOfLines={1}>
            {AppFunctions.FormatNumber(+item?.amount || 0, 4, 0)}
          </ThemeText>
        </Pressable>
      </View>
    ))
  )}
</View>
}
const OrderBookSell = ({isOrderBookLoading,appColor, listPriceSell, secondCurrency, selectPrice }) => {
  return <View style={[styles.sellSideBook]}>
  {isOrderBookLoading ? (
    <LoadingSpinner
      color={ThemeFunctions.getColor(appColor)}
      size="small"
    />
  ) : (
    listPriceSell.map((item, key) => (
      <View
        style={[
          styles.valueCurrencyContainer,
          ShouldHighlight(
            Math.abs(item.amount) * Math.abs(item.price),
            secondCurrency,
          ) && styles.bgRed,
        ]}
        key={key}>
        <Pressable
          style={{width: '50%'}}
          onPress={() => selectPrice({...item, side: 'sell'})}>
          <ThemeText
            style={[styles.textRed, styles.textPrice]}
            numberOfLines={1}>
            {AppFunctions.FormatNumber(+item?.price || 0, 4, 0)}
          </ThemeText>
        </Pressable>
        <Pressable
          style={{width: '50%'}}
          onPress={() => selectPrice({...item, side: 'sell'})}>
          <ThemeText
            style={[styles.textAmount, styles.textPrice]}
            numberOfLines={1}>
            {AppFunctions.FormatNumber(+item?.amount || 0, 4, 0)}
          </ThemeText>
        </Pressable>
      </View>
    ))
  )}
</View>
}


const OrderBookBuyM = React.memo(OrderBookBuy, (prevProps, nextProps) => {
  return (
    _.isEqual(prevProps.isOrderBookLoading, nextProps.isOrderBookLoading)&&
    _.isEqual(prevProps.listPriceBuy, nextProps.listPriceBuy)&&
    prevProps.secondCurrency === nextProps.secondCurrency&&
    prevProps.appColor === nextProps.appColor
  );
})

const OrderBookSellM = React.memo(OrderBookSell, (prevProps, nextProps) => {
  return (
    _.isEqual(prevProps.isOrderBookLoading, nextProps.isOrderBookLoading)&&
    _.isEqual(prevProps.listPriceSell, nextProps.listPriceSell)&&
    prevProps.secondCurrency === nextProps.secondCurrency&&
    prevProps.appColor === nextProps.appColor
  );
})


const TradingBuySell = (props: any) => {
  const {isRtlApproach, appTheme, appColor} = useSelector(
    (state: any) => state.globalReducer,
  );

  const typeBuySell = props?.type;
  const openOrderRef: any = useRef();
  // const tradeHistoryRef: any = useRef();

  const [orderBook, isOrderBookLoading, orderBookError] = useOrderBook(
    props.pair,
  );

  const [listPriceBuy, setListPriceBuy] = useState<any>([]);
  const [listPriceSell, setListPriceSell] = useState<any>([]);
  const [isBuy, setIsBuy] = useState(typeBuySell === 'buy');

  const [inputAmount, setInputAmount] = useState<any>('');
  const [inputPrice, setInputPrice] = useState<any>('');
  const [isPress, setIsPress] = useState(false);
  const [tradeType, setTradeType] = useState('limit');
  const [isVisible, setIsVisible] = useState(false);
  const [openOrderBook, isLoading, error] = useUserOrders(props?.pair);
  const [marketPriceBuy, setMarketPriceBuy] = useState({
    approxPrice: 0,
    lastPrice: 0,
    filledQty: 0,
    isFilled: false,
  });
  const [marketPriceSell, setMarketPriceSell] = useState({
    approxPrice: 0,
    lastPrice: 0,
    filledQty: 0,
    isFilled: false,
  });
  const [feeData, setFeeData] = useState({
    buyFee: 0.1,
    sellFee: 0.1,
  });
  const [feeDecimal, setFeeDecimal] = useState(0.1 / 100);

  const dispatch = useDispatch();

  const [index, setIndex] = useState(0);

  const [routes] = useState([
    {key: 'open_orders', title: strings('open_orders')},
    {key: 'trade_istory', title: strings('trade_history')},
  ]);

  const openOrders = openOrderBook?.filter(
    item => item?.status === 'active' || item?.status === 'partially',
  );
  const history = openOrderBook?.filter(
    item => !(item?.status === 'active') && !(item?.status === 'partially'),
  );

  useEffect(() => {
    const getFee = async () => {
      const response = await makeRequest('GET', `user/userfee`, {}, undefined, {
        symbol: getSecondCurrency(),
      });
      if (response.status === 200) {
        setFeeData(response.data);
      }
    };
    getFee();
    dispatch(fundsList());
  }, []);

  useEffect(() => {
    if (isBuy) {
      setFeeDecimal(feeData.buyFee / 100);
    } else {
      setFeeDecimal(feeData.sellFee / 100);
    }
  }, [feeData, isBuy]);

  useEffect(() => {
    if (!inputPrice && ticker?.last) {
      setInputPrice(RemoveExpo(ticker?.last));
    }
  }, [tradeType]);

  useEffect(() => {
    if (tradeType === 'limit') return;

    const uploadMarketPrices = async (side: string) => {
      try {
        const response = await makeRequest(
          'POST',
          `${CurrentConfig.api_url}/trade/get_market_price`,
          {},
          {
            amount: replaceCost(inputAmount),
            pairName: props?.pair,
            pair_id: props?.pairId,
            side,
          },
        );
        if (response?.status === 200) {
          if (side === 'sell') {
            setMarketPriceBuy({
              ...(response?.data || {approxPrice: 0, lastPrice: 0}),
            });
          } else if (side === 'buy') {
            setMarketPriceSell({
              ...(response?.data || {approxPrice: 0, lastPrice: 0}),
            });
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    uploadMarketPrices('buy');
    uploadMarketPrices('sell');
  }, [tradeType, inputAmount, isBuy, orderBook]);

  const renderScene = ({route: {key}}) => {
    switch (key) {
      case 'trade_istory':
        return (
          <TradeHistory
            appColor={appColor}
            appTheme={appTheme}
            orders={history}
            isLoading={isLoading}
            error={error}
            // ref={tradeHistoryRef}
            pair={pair}
          />
        );
    }
    return (
      <OpenOrder
        orders={openOrders}
        isLoading={isLoading}
        pair={pair}
        error={error}
        ref={openOrderRef}
      />
    );
  };

  const handleIndexChange = (index: number) => {
    setIndex(index);
  };

  const _toogleDrawer = () => {
    props.navigation.openDrawer();
  };

  const colorTheme = isDarkTheme(appTheme) ? darkTheme.text : lightTheme.text;

  const pair = props.pair || 'BTC-EUR';
  const market = pair?.replace(/-/g, '');

  const [ticker, setTicker] = useState(props.ticker);
  const [socketTicker] = useTiker(pair);

  useEffect(() => {
    if (socketTicker) {
      setTicker(socketTicker);
    }
  }, [socketTicker]);

  const priceChangedPercent =
    changePricePerCent({open: ticker?.open || 0, close: ticker?.close || 0}) ||
    0;
  const {userProfileData} = useSelector((state: any) => state.appReducer);

  const livePrices = useSelector(
    (state: any) => state.gbexReducer?.liveCurrencyPrices,
  );

  const getFirstCurrency = () => {
    return pair.split('-')[0];
  };

  const getSecondCurrency = () => {
    return pair.split('-')[1];
  };

  const firstCurrency = getFirstCurrency();
  const secondCurrency = getSecondCurrency();
  let gbexUsdPrice = livePrices?.find(
    el => el.currencyName === 'GBEX',
  )?.usdPrice;
  let secondCurrencyUsdPrice = livePrices?.find(
    el => el.currencyName === secondCurrency,
  )?.usdPrice;

  let firstCurrencyUsdPrice = livePrices?.find(
    el => el.currencyName === firstCurrency,
  )?.usdPrice;

  const getUsdPrice = (amount: number, currency: string) => {
    const usdPrice =
      livePrices?.find(item => item?.currencyName == currency)?.usdPrice || 0;
    return toRealNumber(RoundUptoSignificant(amount * usdPrice || 0));
  };

  const getMarketPrice = () => {
    return isBuy ? marketPriceBuy.approxPrice : marketPriceSell.approxPrice;
  };

  const getMarketFilledQty = () => {
    return isBuy ? marketPriceBuy.filledQty : marketPriceSell.filledQty;
  };

  const getMarketIsFilled = () => {
    return isBuy ? marketPriceBuy.isFilled : marketPriceSell.isFilled;
  };

  const getApproxAmountForTotal = (total: number) => {
    const book = listPriceSell;
    let amount = 0;
    let totalAval = total;
    for (let i = 0; i < book.length; i++) {
      if (totalAval <= 0) break;

      if (book[i].amount * book[i].price < totalAval) {
        
        const met = book[i].amount * book[i].price;
        totalAval -= met;
        amount += book[i].amount;
        continue;
      }

      const metAmount = totalAval / book[i].price;
      amount += metAmount;
      totalAval = 0;
    }

    return amount;
  };

  useEffect(() => {
    if (orderBook) {
      if (orderBook?.asks && orderBook?.bids) {
        const listSell = ordersSort({
          orders: orderBook?.asks || [],
          type: 'sell',
        });
        const listBuy = ordersSort({
          orders: orderBook?.bids || [],
          type: 'buy',
        });
        setListPriceBuy(listBuy);
        setListPriceSell(listSell);
      }
    }
  }, [orderBook]);

  const selectPrice = data => {
    setInputPrice(RemoveExpo(data?.price || 0));
    setInputAmount(RemoveExpo(data?.amount || 0));
    // setIsBuy(data?.side === 'sell');
  };
  const currencies = useSelector(
    (state: any) => state.quickBuyReducer.fundsList,
  );

  const firstCurrencyBal = currencies?.find(
    el => el.symbol === getFirstCurrency(),
  );
  const secondCurrencyBal = currencies?.find(
    el => el.symbol === getSecondCurrency(),
  );

  const gbexBal = currencies?.find(el => el.symbol === 'GBEX');

  const changePrice = text => {
    setInputPrice(text);
  };
  const changeAmount = text => {
    const amount = replaceCost(text);
    setInputAmount(amount);
  };

  const createOrder = async () => {
    try {
      const amount = replaceCost(inputAmount);
      const price = replaceCost(inputPrice);
      if (!amount || amount <= 0)
        return showToast(strings('trade'), 'Amount is not correct', 'error');

      const orderPrice = isLimit() ? price : ticker?.last || 0;
      if (!orderPrice || orderPrice <= 0)
        return showToast(strings('trade'), 'Price is not correct', 'error');
      setIsPress(true);
      const response: any = await makeRequest(
        MapperConstants.ApiTypes.POST,
        APIConstants.NEW_ORDER,
        {},
        {
          exchange_id: CurrentConfig.exchange_id,
          pair_id: props?.pairId,
          user_id: userProfileData.uniqueId,
          symbol: market,
          amount: amount,
          price: toRealNumber(orderPrice),
          side: isBuy ? 'buy' : 'sell',
          type: isLimit() ? 'limit' : 'market',
          stock: getFirstCurrency(),
          money: getSecondCurrency(),
        },
      );
      setIsPress(false);
      if (response.status === 200) {
        showToast(strings('trade'), response.message, 'success');
        openOrderRef?.current?.refreshList?.();
        // tradeHistoryRef?.current?.refreshList?.();
        setInputAmount('');
        // setInputPrice('');
      } else {
        showToast(strings('trade'), response.message, 'error');
      }
    } catch (error) {
      setIsPress(false);
      showToast(strings('trade'), 'Error', 'error');
    } finally {
      dispatch(fundsList());
    }
  };

  const selectPercentAmount = percent => {
    if (isLimit()) {
      if (isBuy) {
        // take secondary currency & last ticker
        const lastPrice = inputPrice
          ? parseFloat(inputPrice)
          : ticker?.last || 0;
        if (lastPrice === 0) return;
        const balance = secondCurrencyBal?.balance || 0;
        const amount = balance / lastPrice;
        setInputAmount(((amount * percent) / 100).toString());
      } else {
        // take first currency
        const balance = firstCurrencyBal?.balance || 0;
        setInputAmount(((balance * percent) / 100).toString());
      }
    } else {
      if (isBuy) {
        const balance = ((secondCurrencyBal?.balance || 0) * percent) / 100;
        const amount = getApproxAmountForTotal(balance);
        setInputAmount(amount.toString());
      } else {
        const balance = firstCurrencyBal?.balance || 0;
        setInputAmount(((balance * percent) / 100).toString());
      }
    }
  };

  const selectTrade = data => {
    setTradeType(data);
    setIsVisible(false);
    setInputAmount('');
    setInputPrice('');
  };

  const isLimit = () => tradeType == 'limit';

  const getTotalLimitPrice = () => {
    return AppFunctions.standardDigitConversion(
      replaceCost(inputPrice) * replaceCost(inputAmount),
    );
  };

  const minusPrice = () => {
    let price: any = replaceCost(inputPrice) - 1;
    price = price > 0 ? price : '';
    setInputPrice(formatDecimal(price));
  };
  const addPrice = () => {
    let price: any = replaceCost(inputPrice) + 1;
    setInputPrice(formatDecimal(price));
  };
  const addAmount = () => {
    const amount = (parseInt(inputAmount) || 0) + 1;
    setInputAmount(amount.toString());
  };
  const minusAmount = () => {
    let amount: any = parseInt(inputAmount) - 1;
    amount = amount > 0 ? amount : '';
    setInputAmount(amount.toString());
  };

  let placementButton;
  let fee;

  if (isLimit()) {
    const amount = replaceCost(inputAmount);
    const price = replaceCost(inputPrice);
    const total = amount * price;

    if (isBuy) {
      if (userProfileData?.preferredFeeCurrencyId) {
        fee =
          FormatNumber(
            amount * (firstCurrencyUsdPrice / gbexUsdPrice) * feeDecimal,
          ) + ' GBEX';
      } else {
        fee = FormatNumber(amount * feeDecimal) + ` ${firstCurrency}`;
      }
    } else {
      if (userProfileData?.preferredFeeCurrencyId) {
        fee =
          FormatNumber(
            total * (secondCurrencyUsdPrice / gbexUsdPrice) * feeDecimal,
          ) + ' GBEX';
      } else {
        fee = FormatNumber(total * feeDecimal) + ` ${secondCurrency}`;
      }
    }
  } else {
    const approxPrice = getMarketPrice();
    const approxAmount = getMarketFilledQty();

    const approxTotal = approxAmount * approxPrice;

    if (isBuy) {
      if (userProfileData?.preferredFeeCurrencyId) {
        // GBEX FEES

        fee =
          FormatNumber(
            approxAmount * (firstCurrencyUsdPrice / gbexUsdPrice) * feeDecimal,
          ) + ' GBEX';
      } else {
        fee = FormatNumber(approxAmount * feeDecimal) + ` ${firstCurrency}`;
      }
    } else {
      if (userProfileData?.preferredFeeCurrencyId) {
        // GBEX FEES

        fee =
          FormatNumber(
            approxTotal * (secondCurrencyUsdPrice / gbexUsdPrice) * feeDecimal,
          ) + ' GBEX';
      } else {
        fee = FormatNumber(approxTotal * feeDecimal) + ` ${secondCurrency}`;
      }
    }
  }

  if (isLimit()) {
    const amountNumber = replaceCost(inputAmount);
    const totalNumber = replaceCost(inputPrice) * replaceCost(inputAmount);

    if (isBuy) {
      if (secondCurrencyBal && secondCurrencyBal.balance < totalNumber) {
        placementButton = (
          <ThemeButton
            text={strings('insufficient_funds')}
            disabled={true}
            disabledColor={Colors.gray}
            styleButton={[
              styles.buttonBuyBTC,
              {
                backgroundColor: Colors.currencyGreen,
              },
            ]}
            styleText={{textTransform: 'none'}}
            onClickHandler={createOrder}
            loading={isPress}
          />
        );
      } else {
        placementButton = (
          <ThemeButton
            text={`${strings('buy')} ${getFirstCurrency()}`}
            styleButton={[
              styles.buttonBuyBTC,
              {
                backgroundColor: Colors.currencyGreen,
              },
            ]}
            styleText={{textTransform: 'none'}}
            onClickHandler={createOrder}
            loading={isPress}
            disabled={isPress}
          />
        );
      }
    } else {
      if (firstCurrencyBal && firstCurrencyBal.balance < amountNumber) {
        placementButton = (
          <ThemeButton
            text={strings('insufficient_funds')}
            disabled={true}
            disabledColor={Colors.gray}
            styleButton={[
              styles.buttonBuyBTC,
              {
                backgroundColor: Colors.currencyRed,
              },
            ]}
            styleText={{textTransform: 'none'}}
            onClickHandler={createOrder}
            loading={isPress}
          />
        );
      } else {
        placementButton = (
          <ThemeButton
            text={`${strings('sell')} ${getFirstCurrency()}`}
            styleButton={[
              styles.buttonBuyBTC,
              {
                backgroundColor: Colors.currencyRed,
              },
            ]}
            styleText={{textTransform: 'none'}}
            onClickHandler={createOrder}
            loading={isPress}
            disabled={isPress}
          />
        );
      }
    }
  } else {
    const amountNumber = replaceCost(inputAmount);

    if (isBuy) {
      const totalNumber = amountNumber * marketPriceBuy.approxPrice;

      if (secondCurrencyBal && secondCurrencyBal.balance < totalNumber) {
        placementButton = (
          <ThemeButton
            disabled={true}
            disabledColor={Colors.gray}
            text={`Insufficient Funds`}
            styleButton={[
              styles.buttonBuyBTC,
              {
                backgroundColor: Colors.currencyGreen,
              },
            ]}
            styleText={{textTransform: 'none'}}
            onClickHandler={createOrder}
            loading={isPress}
          />
        );
      } else {
        if (marketPriceBuy.isFilled) {
          placementButton = (
            <ThemeButton
              text={`${strings('buy')} ${getFirstCurrency()}`}
              styleButton={[
                styles.buttonBuyBTC,
                {
                  backgroundColor: Colors.currencyGreen,
                },
              ]}
              styleText={{textTransform: 'none'}}
              onClickHandler={createOrder}
              loading={isPress}
            />
          );
        } else {
          placementButton = (
            <ThemeButton
              disabled={true}
              disabledColor={Colors.gray}
              text={strings('cannot_fill')}
              styleButton={[
                styles.buttonBuyBTC,
                {
                  backgroundColor: Colors.currencyGreen,
                },
              ]}
              styleText={{textTransform: 'none'}}
              onClickHandler={createOrder}
              loading={isPress}
            />
          );
        }
      }
    } else {
      if (firstCurrencyBal && firstCurrencyBal.balance < amountNumber) {
        placementButton = (
          <ThemeButton
            text={`Insufficient Funds`}
            disabled={true}
            disabledColor={Colors.gray}
            styleButton={[
              styles.buttonBuyBTC,
              {
                backgroundColor: Colors.currencyRed,
              },
            ]}
            styleText={{textTransform: 'none'}}
            onClickHandler={createOrder}
            loading={isPress}
          />
        );
      } else {
        if (marketPriceSell.isFilled) {
          placementButton = (
            <ThemeButton
              text={`${strings('sell')} ${getFirstCurrency()}`}
              styleButton={[
                styles.buttonBuyBTC,
                {
                  backgroundColor: Colors.currencyRed,
                },
              ]}
              styleText={{textTransform: 'none'}}
              onClickHandler={createOrder}
              loading={isPress}
            />
          );
        } else {
          placementButton = (
            <ThemeButton
              text={`Cannot Fill`}
              disabled={true}
              disabledColor={Colors.gray}
              styleButton={[
                styles.buttonBuyBTC,
                {
                  backgroundColor: Colors.currencyRed,
                },
              ]}
              styleText={{textTransform: 'none'}}
              onClickHandler={createOrder}
              loading={isPress}
            />
          );
        }
      }
    }
  }

  let gbexBalance = <></>;

  if (
    userProfileData?.preferredFeeCurrencyId &&
    ![firstCurrency, secondCurrency].includes('GBEX')
  ) {
    gbexBalance = (
      <View
        style={[
          {flexDirection: 'row', flexWrap:"wrap"},
          isRtlApproach ? rtlStyles.reverseRow : {},
          {width: 95},
        ]}>
        <ThemeText
          style={[
            {color: ThemeFunctions.customText(appTheme)},
            styles.textExchange,
          ]}>
          {`${strings('available')} GBEX: `}
        </ThemeText>
        <ThemeText numberOfLines={1} style={styles.textExchange}>
          {FormatNumber(gbexBal?.balance, 1)}
        </ThemeText>
      </View>
    );
  }

  return (
    <SafeAreaView
      onTouchStart={() => props.navigation.closeDrawer()}
      style={[commonStyles.safeView, ThemeFunctions.setBackground(appTheme)]}>
      <Header title={strings('limit')} />
      <View style={styles.headerTextContainer}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={_toogleDrawer}>
          <IconVector.Ant
            name="menuunfold"
            size={22}
            color={ThemeFunctions.headerCurrencyColor(appTheme)}
          />
          <ThemeText style={styles.headerText}>
            {pair?.replace(/-/g, '/')}
          </ThemeText>
          <PercentBox percent={priceChangedPercent} />
        </TouchableOpacity>
        {/* <View style={styles.optionContainer}>
                    <TouchableOpacity style={styles.iconOption} onPress={_toogleDrawer}>
                        <IconVector.Feather
                            name='chevron-down'
                            size={28}
                            color={colorTheme}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.iconOption}
                        onPress={Navigation.goBack}
                    >
                        <Image
                            source={isDarkTheme(appTheme) ? Images.ic_chart_white : Images.ic_chart_dark}
                            style={styles.icChart}
                        />
                    </TouchableOpacity>
                </View> */}
      </View>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled>
        <View style={styles.containerBuySell}>
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row'}}>
              <ThemeButton
                styleButton={[
                  styles.buttonBuySell,
                  {backgroundColor: Colors.currencyGreen, marginRight: 5},
                ]}
                text="buy"
                onClickHandler={() => setIsBuy(true)}
              />
              <ThemeButton
                styleButton={[
                  styles.buttonBuySell,
                  {backgroundColor: Colors.currencyRed, marginLeft: 5},
                ]}
                text="sell"
                onClickHandler={() => setIsBuy(false)}
              />
            </View>
            <Space height={10} />
            <TouchableOpacity
              style={[
                styles.chooseTrade,
                {backgroundColor: isDarkTheme(appTheme) ? '#222430' : 'white'},
              ]}
              onPress={() => setIsVisible(true)}>
              <ThemeText style={styles.textBold}>
                {isLimit() ? strings('limit') : strings('market')}
              </ThemeText>
              <IconVector.Entypo
                name="chevron-down"
                size={20}
                color={ThemeFunctions.getCurrentTextColor(appTheme)}
              />
            </TouchableOpacity>
            {isLimit() ? (
              <>
                <View
                  style={[
                    styles.inputContainer,
                    {
                      backgroundColor: isDarkTheme(appTheme)
                        ? '#222430'
                        : 'white',
                    },
                  ]}>
                  <TouchableOpacity onPress={minusPrice}>
                    <IconVector.Ant name="minus" color={colorTheme} size={28} />
                  </TouchableOpacity>
                  <TextInput
                    placeholder={`${strings('price')}(${getSecondCurrency()})`}
                    placeholderTextColor={ThemeFunctions.customText(appTheme)}
                    style={[styles.input, ThemeFunctions.textColor(appTheme)]}
                    value={inputPrice}
                    onChangeText={changePrice}
                    keyboardType="numeric"
                  />
                  <TouchableOpacity onPress={addPrice}>
                    <IconVector.Ant name="plus" color={colorTheme} size={28} />
                  </TouchableOpacity>
                </View>
                <ThemeText style={styles.textBold}>
                  = {getUsdPrice(replaceCost(inputPrice), getSecondCurrency())}{' '}
                  $
                </ThemeText>
              </>
            ) : null}
            <View
              style={[
                styles.inputContainer,
                {backgroundColor: isDarkTheme(appTheme) ? '#222430' : 'white'},
              ]}>
              <TouchableOpacity onPress={minusAmount}>
                <IconVector.Ant name="minus" color={colorTheme} size={28} />
              </TouchableOpacity>
              <TextInput
                placeholder={`${strings('amount')}(${getFirstCurrency()})`}
                placeholderTextColor={ThemeFunctions.customText(appTheme)}
                style={[
                  styles.input,
                  ThemeFunctions.textColor(appTheme),
                  {fontSize: DynamicFontSize(FormatNumber(inputAmount))},
                ]}
                value={FormatNumber(inputAmount)}
                keyboardType="numeric"
                onChangeText={changeAmount}
              />
              <TouchableOpacity onPress={addAmount}>
                <IconVector.Ant name="plus" color={colorTheme} size={28} />
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={[
                  styles.buttonPercent,
                  ThemeFunctions.setBackground(appTheme),
                ]}
                onPress={() => selectPercentAmount(25)}>
                <ThemeText style={styles.textPercent}>25%</ThemeText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.buttonPercent,
                  ThemeFunctions.setBackground(appTheme),
                ]}
                onPress={() => selectPercentAmount(50)}>
                <ThemeText style={styles.textPercent}>50%</ThemeText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.buttonPercent,
                  ThemeFunctions.setBackground(appTheme),
                ]}
                onPress={() => selectPercentAmount(75)}>
                <ThemeText style={styles.textPercent}>75%</ThemeText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.buttonPercent,
                  ThemeFunctions.setBackground(appTheme),
                ]}
                onPress={() => selectPercentAmount(100)}>
                <ThemeText style={styles.textPercent}>100%</ThemeText>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex: 1}}>
            <View style={[styles.containerBuySell, {paddingRight: 0}]}>
              <View style={{flex: 1}}>
                <ThemeText
                  numberOfLines={1}
                  style={[
                    styles.titleSmall,
                    {color: ThemeFunctions.customText(appTheme)},
                  ]}>
                  {`${strings('price')}(${getSecondCurrency()})`}
                </ThemeText>
              </View>
              <View style={{flex: 1}}>
                <ThemeText
                  numberOfLines={1}
                  style={[
                    styles.titleSmall,
                    {color: ThemeFunctions.customText(appTheme)},
                    {textAlign: 'right'},
                  ]}>
                  {`${strings('amount')}(${getFirstCurrency()})`}
                </ThemeText>
              </View>
            </View>
            <OrderBookSellM isOrderBookLoading={isOrderBookLoading} listPriceSell={listPriceSell} secondCurrency={secondCurrency} appColor={appColor} selectPrice={selectPrice} />

          </View>
        </View>
        <View style={styles.containerBuySell}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={[
                {display: 'flex', flexDirection: 'column', width: '100%'},
              ]}>
              <View
                style={[
                  {flexDirection: 'row', flexWrap:"wrap"},
                  isRtlApproach ? rtlStyles.reverseRow : {},
                ]}>
                <ThemeText
                  style={[
                    {color: ThemeFunctions.customText(appTheme)},
                    styles.textExchange,
                  ]}>
                  {`${strings('available')} ${getFirstCurrency()}: `}
                </ThemeText>
                <ThemeText style={styles.textExchange}>
                  {FormatNumber(firstCurrencyBal?.balance)}
                </ThemeText>
              </View>

              <View
                style={[
                  {flexDirection: 'row', flexWrap:"wrap"},
                  isRtlApproach ? rtlStyles.reverseRow : {},
                ]}>
                <ThemeText
                  style={[
                    {color: ThemeFunctions.customText(appTheme)},
                    styles.textExchange,
                  ]}>
                  {`${strings('available')} ${getSecondCurrency()}: `}
                </ThemeText>
                <ThemeText style={styles.textExchange}>
                  {FormatNumber(secondCurrencyBal?.balance)}
                </ThemeText>
              </View>

              {gbexBalance}

              <TouchableOpacity
                onPress={() => dispatch(fundsList())}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <ThemeText
                  style={[
                    styles.textBold,
                    {
                      color: ThemeFunctions.customText(appTheme),
                      fontSize: 12,
                      marginRight: 5,
                    },
                    isRtlApproach ? rtlStyles.textRight : {},
                  ]}>
                  {strings('refresh_balance')}
                </ThemeText>

                <IconVector.FontAwesome5 color={ThemeFunctions.textColor(appTheme).color} name="sync" size={10} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={[{flex: 1, flexDirection: 'row', alignItems: 'center'}]}>
            <View style={{marginLeft: 10}}>
              <ThemeText
                style={[styles.textBold, {color: Colors.currencyGreen}]}>
                {RoundUptoSignificant(ticker?.last || 0)} {getSecondCurrency()}
              </ThemeText>
              <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
                ~{getUsdPrice(ticker?.last || 0, getSecondCurrency())} $
              </ThemeText>
            </View>
          </View>
        </View>
        <View style={styles.containerBuySell}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <View>
              {isLimit() ? (
                <ThemeText
                  style={[
                    styles.textBold,
                    {color: ThemeFunctions.customText(appTheme), fontSize: 12},
                    isRtlApproach ? rtlStyles.textRight : {},
                  ]}>
                  {`${strings('total')}: ${FormatNumber(
                    replaceCost(getTotalLimitPrice()) || 0,
                  )} ${getSecondCurrency()}`}
                </ThemeText>
              ) : (
                <>
                  <ThemeText
                    style={[
                      styles.textBold,
                      {
                        color: ThemeFunctions.customText(appTheme),
                        fontSize: 12,
                      },
                      isRtlApproach ? rtlStyles.textRight : {},
                    ]}>
                    {`${strings('fillable_quantity')}: ${FormatNumber(
                      getMarketFilledQty() || 0,
                    )} ${getFirstCurrency() || ''}`}
                  </ThemeText>
                  <ThemeText
                    style={[
                      styles.textBold,
                      {
                        color: ThemeFunctions.customText(appTheme),
                        fontSize: 12,
                      },
                      isRtlApproach ? rtlStyles.textRight : {},
                    ]}>
                    {`${strings('approx_price')}: ${FormatNumber(
                      getMarketPrice() || 0,
                    )} ${getSecondCurrency() || ''}`}
                  </ThemeText>
                  <ThemeText
                    style={[
                      styles.textBold,
                      {
                        color: ThemeFunctions.customText(appTheme),
                        fontSize: 12,
                      },
                      isRtlApproach ? rtlStyles.textRight : {},
                    ]}>
                    {`${strings('approx_total')}: ${FormatNumber(
                      getMarketPrice() * getMarketFilledQty() || 0,
                    )} ${getSecondCurrency() || ''}`}
                  </ThemeText>
                </>
              )}
              <ThemeText
                style={[
                  styles.textBold,
                  {color: ThemeFunctions.customText(appTheme), fontSize: 12},
                  isRtlApproach ? rtlStyles.textRight : {},
                ]}>
                {`${strings('fee')}: ${fee}`}
              </ThemeText>
            </View>
            <View
              style={{
                alignContent: 'center',
                width: '100%',
                alignSelf: 'flex-end',
              }}>
              {placementButton}
            </View>
          </View>
          <OrderBookBuyM isOrderBookLoading={isOrderBookLoading} listPriceBuy={listPriceBuy} secondCurrency={secondCurrency} appColor={appColor} selectPrice={selectPrice} />
        </View>
        <View style={{height: 400}}>
          <TabView
            lazy
            tabBarPosition="top"
            navigationState={{
              index,
              routes,
            }}
            renderScene={renderScene}
            onIndexChange={index => handleIndexChange(index)}
            initialLayout={{width: useWindowDimensions().width}}
            renderTabBar={props => (
              <TabBar
                style={ThemeFunctions.setBackground(appTheme)}
                tabStyle={{width: 120}}
                scrollEnabled
                bounces={true}
                contentContainerStyle={[ThemeFunctions.setBackground(appTheme)]}
                onTabLongPress={({route: {key}}) => {
                  props.jumpTo(key);
                }}
                {...props}
                renderLabel={({route, focused, color}) => (
                  <View>
                    <Text
                      adjustsFontSizeToFit={true}
                      style={[
                        focused
                          ? ThemeFunctions.textColor(appTheme)
                          : {color: ThemeFunctions.customText(appTheme)},
                      ]}>
                      {route?.title}
                    </Text>
                    <View
                      style={
                        focused && [
                          styles.line,
                          {backgroundColor: ThemeFunctions.getColor(appColor)},
                        ]
                      }
                    />
                  </View>
                )}
              />
            )}
          />
        </View>
      </ScrollView>
      <CustomModal
        visibility={isVisible}
        style={[styles.modals, ThemeFunctions.setBackground(appTheme)]}>
        <View
          style={[
            styles.headerModal,
            isRtlApproach ? rtlStyles.reverseRow : {},
          ]}>
          <View style={{width: 10}} />
          <ThemeText
            style={[
              styles.headerTextModal,
              {color: ThemeFunctions.customText(appTheme)},
            ]}
            adjustsFontSizeToFit={true}>
            {strings('select_trade')}
          </ThemeText>
          <TouchableOpacity
            onPress={() => setIsVisible(MapperConstants.StatusMapper.disable)}
            style={[
              commonStyles.backBtn,
              ThemeFunctions.setBackground(appTheme),
            ]}>
            <Icon
              name="close"
              iconStyle={{transform: [{scaleX: isRtlApproach ? -1 : 1}]}}
              type="material"
              size={22}
              color={
                ThemeFunctions.isRapunzelTheme(appTheme)
                  ? rapunzelTheme.magenta
                  : Colors.gray
              }
            />
          </TouchableOpacity>
        </View>
        <View style={{paddingHorizontal: 15}}>
          <Cell onPress={() => selectTrade('limit')}>
            <ThemeText>{strings('limit')}</ThemeText>
          </Cell>
          <Cell onPress={() => selectTrade('market')}>
            <ThemeText>{strings('market')}</ThemeText>
          </Cell>
        </View>
      </CustomModal>
    </SafeAreaView>
  );
};
