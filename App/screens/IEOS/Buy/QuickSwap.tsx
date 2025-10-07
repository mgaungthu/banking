import React, { useState } from 'react'
import { Text, View, useWindowDimensions } from 'react-native'
import { strings } from '../../../strings'
import { quickSwapStyles as styles } from '../../quickswap/styles'
import Exchange from './Exchange';
import { TabView, TabBar } from 'react-native-tab-view'
import { useSelector } from 'react-redux'
import { ThemeFunctions } from '../../../utils'
import HistoryView from './HistoryView'

const QuickSwap = (props: any) => {
    const [index, setIndex] = useState(0)
    const [routes] = React.useState([
        { key: 'exchange', title: strings('exchange') },
        { key: 'history', title: strings('history') },
    ])
    const [routesReverse] = React.useState([
        { key: 'history', title: strings('history') },
        { key: 'exchange', title: strings('exchange') },
    ])
    const { isRtlApproach, appTheme, appColor } = useSelector(
        (state: any) => state.globalReducer,
    )

    const isBackButton = () => {
        return props?.route?.params?.fromScreen ? true : false
    }

    const renderScene = ({ route: { key } }) => {
        return (
            <>
                {key === 'exchange' ? (
                    <Exchange pairName={props?.route?.params?.pairName} isBack={isBackButton()} />

                ) : (
                    <HistoryView activeIndex={index} isBack={isBackButton()} />
                )}
            </>
        )
    }

    const handleIndexChange = (index: number) => {
        setIndex(index)
    }

    return (
        <View style={[styles.view, ThemeFunctions.setBackground(appTheme)]}>
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
                        style={[
                            {backgroundColor: ThemeFunctions.getTabBgColor(appTheme)},
                            styles.tabStyle
                        ]}
                        indicatorStyle={{backgroundColor:"transparent"}}
                        contentContainerStyle={[
                            styles.tabContainer,
                        ]}
                        onTabLongPress={({ route: { key } }) => {
                            props.jumpTo(key)
                        }}
                        {...props}
                        pressColor='transparent'
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
    )
}

export default QuickSwap
