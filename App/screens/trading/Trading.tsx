import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {commonStyles} from '../../globalstyles/styles';
import {Header, ThemeText, ThemeButton, LoadingSpinner} from '../../components';
import {AppFunctions, SCREEN_WIDTH, ThemeFunctions} from '../../utils';
import {trdingStyles as styles} from './styles';
import Colors from '../../theme/Colors';
import {useSelector} from 'react-redux';
import IconVector from '../../components/ui/IconVector';
import OrderBook from './Tabs/OrderBook';
import RecentTrade from './Tabs/RecentTrade';
import {
  FormatNumber,
  RoundUptoSignificant,
  toRealNumber,
} from '../../utils/AppFunctions';
import {useTiker} from '../../utils/hooks/useTiker';
import {Screen} from '../../enums';
import {changePricePerCent} from '../../utils/trading/helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TabView, TabBar} from 'react-native-tab-view';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SelectCoin from './SelectCoin';
import {TVWidget} from './TVWidget';
import {strings} from '../../strings';
import {ScrollView} from 'react-native-gesture-handler';

const RootStack = createDrawerNavigator();

export default (componentProps: any) => {
  const {appTheme} = useSelector((state: any) => state.globalReducer);

  return (
    <RootStack.Navigator
      initialRouteName={Screen.TradingBuySellNavigation}
      drawerContent={props => <SelectCoin />}
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
        {props => <Trading {...componentProps?.route?.params} {...props} />}
      </RootStack.Screen>
    </RootStack.Navigator>
  );
};

const Trading = (props: any) => {
  const name = 'favouriteTickers';

  const [index, setIndex] = useState(0);
  const {pair, pairId, updateList} = props;
  const [isFav, setIsFav] = useState(false);
  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer);
  const [isTVShown, setIsTVShown] = useState(false);

  const {width: WIDTH} = useWindowDimensions();

  const [ticker, setTicker] = useState(props?.data);

  const [socketTicker] = useTiker(pair);

  const routes = [
    {key: 'order_book', title: strings('order_book')},
    {key: 'recent_trades', title: strings('recent_trades')},
  ];

  useEffect(() => {
    const isFav = async () => {
      try {
        const response = await AsyncStorage.getItem(name);
        if (response) {
          const favourites = JSON.parse(response);
          const set = new Set(favourites);
          setIsFav(set.has(pair.toLowerCase()));
        }
      } catch (err) {
        console.log(err);
      }
    };

    isFav();
    setTimeout(() => setIsTVShown(true), 500);
  }, []);

  useEffect(() => {
    if (socketTicker) {
      setTicker(socketTicker);
    }
  }, [socketTicker]);

  const _toogleDrawer = () => {
    props.navigation.openDrawer();
  };

  const priceChangePerCent =
    changePricePerCent({open: ticker?.open || 0, close: ticker?.close || 0}) ||
    0;

  const isDown = () => priceChangePerCent < 0;

  const _navigateBuySell = type => {
    props.navigation.navigate(Screen.TradingBuySell, {
      pair,
      type,
      pairId,
      ticker,
    });
  };

  const onFavouriteHandler = async () => {
    try {
      // AsyncStorage.removeItem('favouriteTickers');
      const response = await AsyncStorage.getItem(name);

      if (response) {
        const savedTickers = JSON.parse(response);
        const set = new Set(savedTickers);

        if (isFav) {
          set.delete(ticker.pairName.toLowerCase());
          setIsFav(false);
        } else {
          set.add(ticker.pairName.toLowerCase());
          setIsFav(true);
        }

        await AsyncStorage.setItem(name, JSON.stringify(Array.from(set)));
      } else {
        await AsyncStorage.setItem(
          name,
          JSON.stringify([ticker.pairName.toLowerCase()]),
        );
        setIsFav(true);
      }
      updateList && updateList();
    } catch (err) {
      console.log(err);
    }
  };

  const renderScene = ({route: {key}}) => {
    switch (key) {
      case 'order_book':
        return <OrderBook pair={pair} />;
      case 'recent_trades':
        return <RecentTrade pair={pair} />;
      default:
        return <OrderBook pair={pair} />;
    }
  };

  const currencies = pair?.split('-') || [];

  return (
    <SafeAreaView
      style={[commonStyles.safeView, ThemeFunctions.setBackground(appTheme)]}>
      <Header
        currency={true}
        currencyComponent={
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
            </TouchableOpacity>
          </View>
        }
        right={
          <TouchableOpacity
            style={styles.starContainer}
            onPress={onFavouriteHandler}>
            <IconVector.Material
              name={isFav ? 'star' : 'star-border'}
              size={26}
              color={Colors.yellow}
            />
          </TouchableOpacity>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.currencyInfoContainer}>
          <View style={styles.currencyValueContainer}>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              style={[
                styles.textValueHeader,
                ThemeFunctions.colorCurrencyStatus(isDown()),
              ]}>
              {FormatNumber(ticker?.last)}
              <IconVector.Ant
                name={isDown() ? 'arrowdown' : 'arrowup'}
                size={22}
              />
            </Text>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              style={[styles.textPercent, ThemeFunctions.textColor(appTheme)]}>
              <Text
                style={{
                  color: isDown() ? Colors.currencyRed : Colors.currencyGreen,
                }}>
                {priceChangePerCent || 0}%
              </Text>
            </Text>
          </View>
          <View style={styles.currencyVolContainer}>
            <View style={styles.colVolContainer}>
              <ThemeText style={styles.textVolHeader}>24h High</ThemeText>
              <ThemeText style={styles.textVolHeader}>
                {FormatNumber(ticker?.high || 0, 4, 0)}
              </ThemeText>
            </View>
            <View style={styles.colVolContainer}>
              <ThemeText style={styles.textVolHeader}>24h Low</ThemeText>
              <ThemeText style={styles.textVolHeader}>
                {FormatNumber(ticker?.low || 0, 4, 0)}
              </ThemeText>
            </View>
            <View style={styles.colVolContainer}>
              <ThemeText style={styles.textVolHeader}>
                Vol ( {currencies[0]} )
              </ThemeText>
              <ThemeText style={styles.textVolHeader}>
                {FormatNumber(ticker?.volume || 0, 4, 0)}
              </ThemeText>
            </View>
            <View style={styles.colVolContainer}>
              <ThemeText style={styles.textVolHeader}>
                Vol ( {currencies[1]} )
              </ThemeText>
              <ThemeText style={styles.textVolHeader}>
                {FormatNumber(ticker?.volume * ticker?.last || 0, 4, 0)}
              </ThemeText>
            </View>
          </View>
        </View>
        <View
          renderToHardwareTextureAndroid={true}
          style={{height: SCREEN_WIDTH * 1}}>
          {isTVShown ? (
            <TVWidget pair={pair} ticker={ticker} />
          ) : (
            <LoadingSpinner
              size="large"
              color={ThemeFunctions.getColor(appColor)}
            />
          )}
        </View>
        <View style={[{height: 500}]}>
          <TabView
            lazy
            tabBarPosition="top"
            navigationState={{
              index,
              routes,
            }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width: WIDTH}}
            renderTabBar={props => (
              <TabBar
                style={ThemeFunctions.setBackground(appTheme)}
                tabStyle={{width: WIDTH / 2}}
                indicatorStyle={{
                  backgroundColor: ThemeFunctions.getColor(appColor),
                }}
                scrollEnabled
                bounces={true}
                onTabLongPress={({route: {key}}) => {
                  props.jumpTo(key);
                }}
                {...props}
                renderLabel={({route, focused}) => (
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
                  </View>
                )}
              />
            )}
          />
        </View>
      </ScrollView>
      <View
        style={[
          styles.buttonBottomContainer,
          ThemeFunctions.setBackground(appTheme),
          {shadowColor: ThemeFunctions.getTabShadowColor(appTheme).color},
        ]}>
        <ThemeButton
          styleButton={[
            styles.buttonBottom,
            {backgroundColor: Colors.currencyGreen},
          ]}
          text="buy"
          onClickHandler={() => _navigateBuySell('buy')}
        />
        <ThemeButton
          styleButton={[
            styles.buttonBottom,
            {backgroundColor: Colors.currencyRed},
          ]}
          text="sell"
          onClickHandler={() => _navigateBuySell('sell')}
        />
      </View>
    </SafeAreaView>
  );
};
