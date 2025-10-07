import React from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import {ThemeText, Space} from '../../../components';
import {AppFunctions, ThemeFunctions} from '../../../utils';
import {orderStyles as styles} from '../styles';
import {useSelector} from 'react-redux';
import {useOrderBook} from '../../../utils/hooks/useOrderBook';
import {ordersSort} from '../../../utils/trading/helpers';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {strings} from '../../../strings';
import _ from "lodash"

const OrderBookBuy = React.memo(({bids, appTheme}) => {
return <View style={[styles.buySide, {borderColor:ThemeFunctions.customText(appTheme)}]}>
{bids.map(item => (
  <View key={`buy_${item.price}`} style={[styles.rowList, {paddingRight: 5}]}>
    <ThemeText style={styles.textItem}>
      {AppFunctions.FormatNumber(+item?.amount, 4, 0)}
    </ThemeText>
    <ThemeText
      style={[
        styles.textItem,
        {textAlign: 'right'},
        styles.textGreen,
      ]}
      numberOfLines={1}>
      {AppFunctions.FormatNumber(+item?.price, 4, 0)}
    </ThemeText>
  </View>
))}
</View>
}, _.isEqual)

const OrderBookSell = React.memo(({asks, appTheme}) => {
  return <View style={[styles.sellSide]}>
  {asks.map(item => (
    <View key={`sell_${item.price}`} style={[styles.rowList, {paddingLeft: 5}]}>
      <ThemeText
        style={[styles.textItem, {textAlign: 'left'}, styles.textRed]}
        numberOfLines={1}>
        {AppFunctions.FormatNumber(+item?.price, 4, 0)}
      </ThemeText>
      <ThemeText style={[styles.textItem, {textAlign: 'right'}]}>
        {AppFunctions.FormatNumber(+item?.amount, 4, 0)}
      </ThemeText>
    </View>
  ))}
</View>

}, _.isEqual)

const OrderBook = ({pair}) => {
  const {appTheme} = useSelector((state: any) => state.globalReducer);

  const [orderBook] = useOrderBook(pair);

  const asks = ordersSort({orders: orderBook?.asks || [], type: 'sell'});
  const bids = ordersSort({orders: orderBook?.bids || [], type: 'buy'});

  return (
    <View style={[styles.container]}>
      <View style={styles.containerHeader}>
        <ThemeText
          style={{color: ThemeFunctions.customText(appTheme)}}>{`${strings(
          'amount',
        )} (${strings('buy')})`}</ThemeText>
        <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
          {strings('price')}
        </ThemeText>
        <ThemeText
          style={{color: ThemeFunctions.customText(appTheme)}}>{`${strings(
          'amount',
        )} (${strings('sell')})`}</ThemeText>
      </View>
      <Space height={10} />

      <View style={[styles.containerItem]}>
        
            <OrderBookBuy appTheme={appTheme} bids={bids} />
            <OrderBookSell appTheme={appTheme} asks={asks} />
        
        {/* <FlatList 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ 
                        minWidth: '100%', 
                        minHeight: '100%', 
                        paddingBottom: bids?.length > 5 ? bottomSAI + 60 : 0 
                    }}
                    refreshControl={
                        <RefreshControl
                            onRefresh={() => updateOrderBook()}
                            refreshing={isLoading}
                            tintColor={ThemeFunctions.getColor(appColor)}
                            colors={[ThemeFunctions.getColor(appColor)]}
                         />
                    }
                    data={bids}
                    renderItem={({ item }) => (
                        <View style={[
                            styles.rowList,
                            { paddingRight: 5},
                        ]}>
                            
                            <ThemeText
                                style={styles.textItem}
                                
                            >{AppFunctions.FormatNumber(+item?.amount, 4, 0)}</ThemeText>
                            <ThemeText
                                style={[
                                    styles.textItem,
                                    { textAlign: 'right' },
                                    styles.textGreen,
                                ]}
                                numberOfLines={1}
                            >{AppFunctions.FormatNumber(+item?.price, 4, 0)}</ThemeText> 
                        </View>
                      )}
                    keyExtractor={(_, key) => {
                        return `$item_${key}`
                    }}
                /> */}
        {/* <View style={[
                    styles.line,
                    { backgroundColor: ThemeFunctions.customText(appTheme) }
                ]}></View> */}
        {/* <FlatList 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ 
                        minWidth: '100%', 
                        minHeight: '100%',  
                        paddingBottom: asks?.length > 5 ? bottomSAI + 60 : 0 
                    }}
                    data={asks}
                    refreshControl={
                        <RefreshControl
                            onRefresh={() => updateOrderBook()}
                            refreshing={isLoading}
                            tintColor={ThemeFunctions.getColor(appColor)}
                            colors={[ThemeFunctions.getColor(appColor)]}
                         />
                    }
                    renderItem={({ item }) => (
                        <View
                            style={[
                                styles.rowList,
                                { paddingLeft: 5 }
                            ]}
                        >
                            <ThemeText
                                style={[
                                    styles.textItem,
                                    { textAlign: 'left' },
                                    styles.textRed,
                                ]}
                                numberOfLines={1}
                            >{AppFunctions.FormatNumber(+item?.price, 4, 0)}</ThemeText>
                            <ThemeText
                                style={[
                                    styles.textItem,
                                    { textAlign: 'right' }
                                ]}
                                
                            >{AppFunctions.FormatNumber(+item?.amount, 4, 0)}</ThemeText>
                        </View>
                      )}
                    keyExtractor={(_, key) => {
                    return `$item_${key}`
                    }}
                /> */}
      </View>
    </View>
  );
};

export default OrderBook;
