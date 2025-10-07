import React, {useState} from 'react'
import {SafeAreaView, Text, View, useWindowDimensions} from 'react-native'
import {commonStyles} from '../../../globalstyles/styles'
import {Header} from '../../../components'
import {strings} from '../../../strings'
import {quickBuyStyles as styles} from '../../quickbuy/styles'
import Colors, {rapunzelTheme} from '../../../theme/Colors'
// import Functionality from './Functionality'
import HistoryView from './HistoryView'
import BuyGbex from './BuyGbex'

import {TabView, TabBar} from 'react-native-tab-view'
import {useSelector} from 'react-redux'
import {ThemeFunctions} from '../../../utils'

const CryptoPayment = (props: any) => {
  const {navigation} = props
  const [index, setIndex] = useState(0)
  const [routes] = React.useState([
    {key: 'functionality', title: strings('buy_gbex')},
    {key: 'history', title: strings('history')},
  ])
  const [routesReverse] = React.useState([
    {key: 'history', title: strings('history')},
    {key: 'functionality', title: strings('buy_gbex')},
  ])
  const {isRtlApproach, appTheme} = useSelector(
    (state: any) => state.globalReducer,
  )

  const renderScene = ({route: {key}}) => {
    return (
      <>
        {key === 'functionality' ? (
          <BuyGbex
            activeIndex={index}
            setIndex={setIndex}
            navigation={navigation}
          />
        ) : (
          <HistoryView activeIndex={index} />
        )}
      </>
    )
  }

  const handleIndexChange = (index: number) => {
    setIndex(index)
  }
  const isBackButton = () => {
    return props?.route?.params?.fromScreen ? true : false
  }
  return (
    <View style={[commonStyles.safeView]}>
      <Header
        title={strings('crypto_payment')}
        showBack={isBackButton()}
        isTab={true}
      />
      <View style={styles.view}>
        <TabView
          tabBarPosition='top'
          navigationState={{
            index,
            routes: isRtlApproach ? routesReverse : routes,
          }}
          renderScene={renderScene}
          onIndexChange={index => handleIndexChange(index)}
          initialLayout={{width: useWindowDimensions().width}}
          renderTabBar={props => (
            <TabBar
              bounces={true}
              scrollEnabled={true}
              indicatorStyle={{
                backgroundColor: ThemeFunctions.indicatorColor(appTheme),
              }}
              contentContainerStyle={[
                styles.tabContainer,
                ThemeFunctions.getTopTabColor(appTheme),
              ]}
              onTabLongPress={({route: {key}}) => {
                props.jumpTo(key)
              }}
              {...props}
              tabStyle={[
                styles.tabBarStyle,
                ThemeFunctions.getTopTabColor(appTheme),
                styles.tabInactive,
                ThemeFunctions.customInputBorderColor(appTheme),
              ]}
              renderLabel={({route, focused, color}) => (
                <View style={styles.tabView}>
                  <Text
                    style={
                      focused
                        ? [
                            styles.tabLabelActive,
                            ThemeFunctions.isRapunzelTheme(appTheme)
                              ? {
                                  color: rapunzelTheme.magenta,
                                  textTransform: 'uppercase',
                                }
                              : {textTransform: 'uppercase'},
                          ]
                        : [
                            styles.tabLabelActive,
                            ThemeFunctions.tabTextColor(appTheme),
                            {textTransform: 'uppercase'},
                          ]
                    }>
                    {route.title}
                  </Text>
                  <View
                    style={
                      focused
                        ? [
                            styles.line,
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
    </View>
  )
}

export default CryptoPayment
