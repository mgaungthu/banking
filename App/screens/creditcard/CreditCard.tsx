import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, View, useWindowDimensions } from 'react-native'
import { commonStyles } from '../../globalstyles/styles'
import { Header } from '../../components'
import { strings } from '../../strings'
import { creditCardStyles as styles } from './styles'
import Colors, { rapunzelTheme } from '../../theme/Colors'
import Functionality from './tab/Functionality'
import { TabView, TabBar } from 'react-native-tab-view'
import { useSelector } from 'react-redux'
import { ThemeFunctions } from '../../utils'
import HistoryView from '../creditcard/tab/History'
import { showToast } from '../../utils/GenericUtils'
import Navigation from '../../utils/Navigation'

const CreditCard = (props: any) => {
    const { navigation } = props
    const [index, setIndex] = useState(0)
    const [routes] = React.useState([
        { key: 'functionality', title: strings('fiat') },
        { key: 'history', title: strings('history') },
    ])
    const [routesReverse] = React.useState([
        { key: 'history', title: strings('history') },
        { key: 'functionality', title: strings('fiat') },
    ])
    const { isRtlApproach, appTheme, appColor } = useSelector(
        (state: any) => state.globalReducer,
    )

    const renderScene = ({ route: { key } }) => {
        return (
            <>
                {key === 'functionality' ? (
                    <Functionality dataCreditCard={dataCreditCard} />
                ) : (
                    <HistoryView dataCreditCard={dataCreditCard} activeIndex={index} />
                )}
            </>
        )
    }

    const handleIndexChange = (index: number) => {
        setIndex(index)
    }

    const dataCreditCard = props.route.params?.data;

    useEffect(() => {
        if (!dataCreditCard) {
            showToast(strings('deposit_credit'), 'Error', 'error')
            Navigation.goBack()
        }
    }, [])

    return (
        <SafeAreaView
            style={[
                commonStyles.tabSafeView,
                ThemeFunctions.setBackground(appTheme),
            ]}>
            <Header title={dataCreditCard?.cardName} isTab={true} />
            <View style={styles.view}>
                <TabView
                    tabBarPosition='top'
                    navigationState={{
                        index,
                        routes: isRtlApproach ? routesReverse : routes,
                    }}
                    renderScene={renderScene}
                    onIndexChange={index => handleIndexChange(index)}
                    initialLayout={{ width: useWindowDimensions().width }}
                    renderTabBar={props => (
                        <TabBar
                            bounces={true}
                            scrollEnabled={true}
                            indicatorStyle={ThemeFunctions.setBackground(appTheme)}
                            contentContainerStyle={[
                                styles.tabContainer,
                                { backgroundColor: ThemeFunctions.getTabBgColor(appTheme) }
                            ]}
                            style={ThemeFunctions.setBackground(appTheme)}
                            onTabLongPress={({ route: { key } }) => {
                                props.jumpTo(key)
                            }}
                            {...props}
                            renderLabel={({ route, focused, color }) => (
                                <View style={styles.tabView}>
                                    <Text
                                        adjustsFontSizeToFit={true}
                                        style={[
                                            styles.textTab,
                                            focused ? ThemeFunctions.textColor(appTheme) : { color: ThemeFunctions.customText(appTheme) }
                                        ]}>
                                        {route?.title}
                                    </Text>
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
                    )}
                />
            </View>
        </SafeAreaView>
    )
}

export default CreditCard
