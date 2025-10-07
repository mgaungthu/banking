import React from 'react'
import {Text, View, useWindowDimensions} from 'react-native'
import {quickBuyStyles as styles} from '../quickbuy/styles'
import {rapunzelTheme} from '../../theme/Colors'
import {walletStyles} from './styles'
import Balances from './balances/Balances'
import Deposits from './deposits/Deposits'
import {ThemeFunctions} from '../../utils'
import {TabView, TabBar} from 'react-native-tab-view'
import Withdrawal from './withdrawals/Withdrawal'
import {useSelector} from 'react-redux';

const WalletTab = (props: any) => {
  const {routes, index, handleIndexChange} = props
  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer)

  const renderScene = ({route: {key}}) => {
    switch (key) {
      case 'balances':
        return <Balances activeIndex={index} />
      case 'deposits':
        return <Deposits activeIndex={index} />
      case 'withdrawals':
        return <Withdrawal activeIndex={index} />
    }
  }

  return (
    <View style={styles.view}>
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
            tabStyle={{width: useWindowDimensions().width / 2}}
            indicatorStyle={{
              backgroundColor: ThemeFunctions.getColor(appColor),
            }}
            scrollEnabled
            bounces={true}
            onTabLongPress={({route: {key}}) => {
              props.jumpTo(key);
            }}
            {...props}
            renderLabel={({route, focused}: any) => (
              <View style={walletStyles.tabView}>
                <Text
                  adjustsFontSizeToFit={true}
                  style={
                    focused
                      ? [
                          walletStyles.tabLabelActive,
                          walletStyles.upperCase,
                          ThemeFunctions.isRapunzelTheme(appTheme)
                            ? {color: rapunzelTheme.magenta}
                            : {},
                        ]
                      : [
                          walletStyles.tabLabelActive,
                          walletStyles.upperCase,
                          ThemeFunctions.tabTextColor(appTheme),
                        ]
                  }>
                  {route?.title}
                </Text>
                <View
                  style={
                    focused
                      ? [
                          walletStyles.line,
                          ThemeFunctions.topTabBorderColor(appTheme),
                        ]
                      : {}
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

export default WalletTab
