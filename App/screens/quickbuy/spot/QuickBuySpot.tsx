import React, {useState} from 'react'
import {SafeAreaView, Text, View, useWindowDimensions} from 'react-native'
import {commonStyles} from '../../../globalstyles/styles'
import {Header} from '../../../components'
import {strings} from '../../../strings'
import {quickBuyStyles as styles} from '../styles'
import Colors, {rapunzelTheme} from '../../../theme/Colors'
import Functionality from './Functionality'
import HistoryView from './HistoryView'
import {TabView, TabBar} from 'react-native-tab-view'
import {useSelector} from 'react-redux'
import {ThemeFunctions} from '../../../utils'

const QuickBuySpot = (props: any) => {
  const {navigation} = props
  const [index, setIndex] = useState(0)
  const [routes] = React.useState([
    {key: 'functionality', title: strings('functionality')},
    {key: 'history', title: strings('history')},
  ])
  const [routesReverse] = React.useState([
    {key: 'history', title: strings('history')},
    {key: 'functionality', title: strings('functionality')},
  ])
  const {isRtlApproach, appTheme} = useSelector(
    (state: any) => state.globalReducer,
  )

  const renderScene = ({route: {key}}) => {
    return (
      <>
        {key === 'functionality' ? (
          <Functionality
            activeIndex={index}
            setIndex={setIndex}
            navigation={navigation}
            selectedPair={props?.route?.params?.pairName}
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
    <SafeAreaView
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      <Header title={strings('spot')} showBack={isBackButton()} isTab={true} />
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
              pressColor='transparent'
              tabStyle={[
                styles.tabBarStyle,
                ThemeFunctions.getTopTabColor(appTheme),
                styles.tabInactive,
                ThemeFunctions.customTabBorderColor(appTheme),
              ]}
              renderLabel={({route, focused, color}) => (
                <View style={styles.tabView}>
                  <Text
                    style={
                      focused
                        ? [
                            styles.tabLabelActive,
                            ThemeFunctions.isRapunzelTheme(appTheme)
                              ? {color: rapunzelTheme.magenta}
                              : {},
                          ]
                        : [
                            styles.tabLabelActive,
                            ThemeFunctions.tabTextColor(appTheme),
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
    </SafeAreaView>
  )
}

export default QuickBuySpot
