import React from 'react'
import { Text, View, useWindowDimensions } from 'react-native'
import { quickBuyStyles as styles } from '../../quickbuy/styles'
import { rapunzelTheme } from '../../../theme/Colors'
import { walletStyles } from '../../funding/styles'
import { ThemeFunctions } from '../../../utils'
import { TabView, TabBar } from 'react-native-tab-view'
import { useSelector } from 'react-redux';
import LogList from './LogList'
import RedeemList from './RedeemList'

const HistoryTab = (props: any) => {
  const { routes, index, handleIndexChange } = props
  const { appTheme, appColor } = useSelector((state: any) => state.globalReducer)

  const renderScene = ({ route: { key } }) => {
    switch (key) {
      case 'drip_logs':
        return <LogList />
      case 'redeem_history':
        return <RedeemList />
    }
  }

  return (
    <View style={styles.view}>
      <TabView
        tabBarPosition='top'
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={index => handleIndexChange(index)}
        initialLayout={{ width: useWindowDimensions().width }}
        renderTabBar={props => (
          <TabBar
            bounces={true}
            scrollEnabled={true}
            indicatorStyle={{backgroundColor:"transparent"}}
            contentContainerStyle={[
              styles.tabContainer,
            ]}
            onTabLongPress={({ route: { key } }) => {
              props.jumpTo(key)
            }}
            {...props}
            style={[
              {backgroundColor: ThemeFunctions.getTabBgColor(appTheme)},
              styles.tabStyle
            ]} 
            pressColor='transparent'
            renderLabel={({ route, focused, color }) => {              
              return <View style={styles.tabView}>
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
            }

             
            }
          />
        )}
      />
    </View>
  )
}

export default HistoryTab
