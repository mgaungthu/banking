import React from 'react';
import { View, ScrollView, FlatList, RefreshControl, } from 'react-native';
import { ThemeText, Space, LoadingSpinner, } from '../../../components';
import { AppFunctions, ThemeFunctions } from '../../../utils';
import { orderStyles as styles } from '../styles';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useRecentTrade } from '../../../utils/hooks/useRecentTrade';
import { FormatNumber } from '../../../utils/AppFunctions';
import { strings } from '../../../strings';
import _ from "lodash"

const RecentTradeItem = ({item}) => {
    return <View style={[styles.containerItem]}>
    <ThemeText style={[styles.textRecent]}>{moment(item?.time).format("DD-MM HH:mm")}</ThemeText>
    <ThemeText numberOfLines={1} style={[
        styles.textRecent,
        ThemeFunctions.colorCurrencyStatus(item?.type !== 'buy'),
        { textAlign: 'center' }
    ]}>
        {FormatNumber(item?.price)}
    </ThemeText>
    <ThemeText numberOfLines={1} style={[styles.textRecent, { textAlign: 'right' }]}>{FormatNumber(item?.amount)}</ThemeText>
</View>
}

const RecentTradeItemM = React.memo(RecentTradeItem, (prevProps, nextProps) => {
    return (
      _.isEqual(prevProps.item, nextProps.item)
      
      )
    }
)


const RecentTrade = ({ pair }) => {

    const { appTheme, appColor } = useSelector(
        (state: any) => state.globalReducer
    )

    const [recentTrades, isLoading, error, updateRecentTrades] = useRecentTrade(pair);    

    return (
        <View style={[styles.container]}>
            <View style={[styles.containerHeader]}>
                <ThemeText style={[
                    { color: ThemeFunctions.customText(appTheme) },
                    styles.textTitle
                ]}>{strings('time')}</ThemeText>
                <ThemeText style={[
                    { color: ThemeFunctions.customText(appTheme), textAlign: 'center' },
                    styles.textTitle
                ]}>{strings('price')}</ThemeText>
                <ThemeText style={[
                    { color: ThemeFunctions.customText(appTheme), textAlign: 'right' },
                    styles.textTitle
                ]}>{strings('amount')}</ThemeText>
            </View>
            <Space height={10} />


             {recentTrades.map((item, key) => <RecentTradeItemM key={`item_recent_${key}`} item={item} />)}

             {/* <FlatList 
                    data={recentTrades}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            onRefresh={() => updateRecentTrades()}
                            refreshing={isLoading}
                            tintColor={ThemeFunctions.getColor(appColor)}
                            colors={[ThemeFunctions.getColor(appColor)]}
                         />
                    }
                    
                    keyExtractor={(_, key) => {
                        return `$item_${key}`
                    }}
                    renderItem={({ item }) => (
                        <View style={[styles.containerItem]}>
                            <ThemeText style={[styles.textRecent]}>{moment(item?.time).format("DD-MM HH:mm")}</ThemeText>
                            <ThemeText numberOfLines={1} style={[
                                styles.textRecent,
                                ThemeFunctions.colorCurrencyStatus(item?.type !== 'buy'),
                                { textAlign: 'center' }
                            ]}>
                                {FormatNumber(item?.price)}
                            </ThemeText>
                            <ThemeText numberOfLines={1} style={[styles.textRecent, { textAlign: 'right' }]}>{FormatNumber(item?.amount)}</ThemeText>
                        </View>
                    )}
                />     */}
            
        </View>
    )
}

export default RecentTrade