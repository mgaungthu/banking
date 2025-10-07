import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    TextInput,
    FlatList,
    RefreshControl,
} from 'react-native'
import { ThemeText } from '../../components'
import { AppFunctions, ThemeFunctions } from '../../utils'
import { strings } from '../../strings'
import { selectCoinStyles as styles } from './styles'
import Colors from '../../theme/Colors'
import { Screen } from '../../enums'
import { Icon } from 'react-native-elements'
import { DefaultArray } from '../../constants'
import Navigation from '../../utils/Navigation'
import { useSelector } from 'react-redux'
import IconVector from '../../components/ui/IconVector'
import { TabView, TabBar } from 'react-native-tab-view'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TickersAction } from '../../store'
import { useDispatch } from "react-redux"

const listCurrency = DefaultArray.tickersHeaderArray

const SelectCoin = () => {
    const { appTheme, appColor } = useSelector(
        (state: any) => state.globalReducer,
    )

    const {stableCoins} = useSelector(
        (state: any) => state.quickBuyReducer,
    );

    const dispatch  = useDispatch()

    const [isRefreshing, setIsRefreshing] = useState(false)

    const [inputSearch, setInputSearch] = useState('');
    const [listSearch, setListSearch] = useState([]);
    const [favs, setFavs] = useState([])

    const [index, setIndex] = useState(0)

    const [routes] = useState(listCurrency.map(item => ({
        key: item,
        title: item
    })))
    
  const _isStablePair = pairName => {
    const [first, second] = pairName.split('-');
    let stableData = stableCoins || {};    
    return (
      (stableData[first] || []).includes(second) ||
      (stableData[second] || []).includes(first)
    );
  };


    const fetchFavorites = async () => {
        try {            
          const response = await AsyncStorage.getItem("favouriteTickers");
          if (response) {
            const favourites = JSON.parse(response);
            setFavs(favourites);
        }
        } catch (err) {
          console.log(err);
        }
      };

    let { tickers } = useSelector((state: any) => state.tickerReducer)

    useEffect(() =>{
        fetchFavorites()
        setIsRefreshing(false)
      },[tickers])

      const fetchTickers = () => {
          setIsRefreshing(true);
          dispatch(TickersAction.getTickers())
      }
    
    const selectPair = (data) => {
        Navigation.goBack();
        Navigation.goBack();
        Navigation.goBack();
        Navigation.navigate(Screen.Trading, { pair: data?.pairName, pairId: data?.pairId, data })
    }

    tickers = tickers.filter(x => !_isStablePair(x.pairName))

    const tabTickers = tickers?.reduce((acc, cur)=>{
        const [first, second] = cur.pairName.split("-")
        if (!acc[second]) acc[second]=[]
        acc[second].push(cur)
        return acc;
    }, {})


    tabTickers["ALL"] = [...tickers]
    tabTickers["STAR"] = [...tickers.filter(item => favs.includes(item.pairName.toLowerCase()))]

    const changeColor = (data) => {
        if (data?.percentChange>0){
          return Colors.seagreen
        }else if (data?.percentChange<0) {
          return "#F82929"
        }else {
          return ThemeFunctions.getCurrentTextColor(appTheme)
        }
      }
    

    const renderScene = ({ route: { key } }) => {
        const list = inputSearch ? listSearch : tabTickers[key]
        return (
            <FlatList
                contentContainerStyle={styles.currencyListContainer}
                keyboardShouldPersistTaps="handled"
                data={list}
                keyExtractor={item => item.pairName}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={() => fetchTickers()}
                        tintColor={ThemeFunctions.getColor(appColor)}
                        colors={[ThemeFunctions.getColor(appColor)]}
                     />}
                renderItem={({ item }) =>
                    <TouchableOpacity
                        style={styles.cellInfo}
                        onPress={() => selectPair(item)}
                    >
                        <View style={styles.currencyNameContainer}>
                            <ThemeText style={[
                                styles.currencyNamePair,
                            ]}>{item.pairName.split('-')[0]}</ThemeText>
                            <ThemeText style={[
                                styles.currencyNamePair,
                                { color: ThemeFunctions.customText(appTheme), fontSize: 12, top: 4, fontWeight: 'normal' }
                            ]}>/{item.pairName.split('-')[1]}</ThemeText>
                        </View>
                        <View style={styles.currencyInfoContainer}>
                            <ThemeText style={[
                                styles.currencyNamePair,
                                {color:changeColor(item)}
                            ]}>{AppFunctions.standardDigitConversion(item.price)}</ThemeText>
                            <ThemeText style={[
                                styles.textPercent,
                                {color:changeColor(item)}
                            ]}>{item.percentChange}%</ThemeText>
                        </View>
                    </TouchableOpacity>
                }
            >
            </FlatList>
        )
    }

    const handleIndexChange = (index: number) => {
        setIndex(index)
    }

    const changeInputSearch = (text) => {
        setInputSearch(text);
        setListSearch(tickers.filter(item => item.pairName.includes(text.toUpperCase())))
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.headerContainer}>
                <ThemeText style={styles.headerText}>Select Coin</ThemeText>
                <View style={[
                    styles.inputContainer,
                    { borderColor: ThemeFunctions.customText(appTheme) }
                ]}>
                    <IconVector.Feather
                        name='search'
                        size={24}
                        style={[ThemeFunctions.textColor(appTheme), { marginRight: 10 }]}
                    />
                    <TextInput
                        style={[
                            styles.input,
                            ThemeFunctions.textColor(appTheme)
                        ]}
                        placeholder={strings('search')}
                        placeholderTextColor={ThemeFunctions.customText(appTheme)}
                        value={inputSearch}
                        onChangeText={changeInputSearch}
                    />
                </View>
            </View>
            <TabView
                lazy
                tabBarPosition='top'
                navigationState={{
                    index,
                    routes,
                }}
                renderScene={renderScene}
                onIndexChange={index => handleIndexChange(index)}
                initialLayout={{ width: useWindowDimensions().width }}
                renderTabBar={props => (
                    <>
                        {inputSearch ? null :
                            <TabBar
                                style={ThemeFunctions.setBackground(appTheme)}
                                tabStyle={{ width: 60 }}
                                scrollEnabled
                                bounces={true}
                                contentContainerStyle={[
                                    ThemeFunctions.setBackground(appTheme)
                                ]}
                                onTabLongPress={({ route: { key } }) => {
                                    props.jumpTo(key)
                                }}
                                {...props}
                                renderLabel={({ route, focused, color }) => (
                                    <View>
                                        {route.title == 'STAR' ?
                                            <Icon
                                                name='star-border'
                                                type='material'
                                                size={20}
                                                color={Colors.yellow}
                                                style={{ alignSelf: 'center', marginLeft: 5 }}
                                            />
                                            :
                                            <Text
                                                numberOfLines={1}
                                                adjustsFontSizeToFit={true}
                                                style={[
                                                    focused ? ThemeFunctions.textColor(appTheme) : { color: ThemeFunctions.customText(appTheme) }
                                                ]}>
                                                {route?.title}
                                            </Text>
                                        }
                                        <View style={
                                            focused && [
                                                styles.line,
                                                { backgroundColor: ThemeFunctions.getColor(appColor) }
                                            ]
                                        }
                                        />
                                    </View>
                                )}
                            />
                        }
                    </>

                )}
            />
        </View>
    )
}

export default SelectCoin

