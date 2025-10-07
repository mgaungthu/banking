import React, {useState} from 'react'
import {Text, View, useWindowDimensions} from 'react-native'
import {commonStyles} from '../../../globalstyles/styles'
import {Header} from '../../../components'
import {strings} from '../../../strings'
import {quickBuyStyles as styles} from '../../quickbuy/styles'
import  {rapunzelTheme} from '../../../theme/Colors'
import {TabView, TabBar} from 'react-native-tab-view'
import {useSelector} from 'react-redux'
import {ThemeFunctions} from '../../../utils'
import Listing from './Listing'
import FiatPayment from './FiatPayment'

const CreditCardDeposit = (props: any) => {
  const {navigation} = props
  const [index, setIndex] = useState(0)
  const [routes] = React.useState([
    {key: 'fiat', title: strings('fiat')},
    {key: 'history', title: strings('history')},
  ])
  const [routesReverse] = React.useState([
    {key: 'history', title: strings('history')},
    {key: 'fiat', title: strings('fiat')},
  ])
  const {isRtlApproach, appTheme} = useSelector(
    (state: any) => state.globalReducer,
  )

  const renderScene = ({route: {key}}) => {
    return (
      <>
        {key === 'fiat' ? (
          <FiatPayment
            activeIndex={index}
            setIndex={setIndex}
            navigation={navigation}
          />
        ) : (
          <Listing activeIndex={index} />
        )}
      </>
    )
  }

  const handleIndexChange = (index: number) => {
    setIndex(index)
  }

  return (
    <View style={[commonStyles.safeView]}>
      <Header title={strings('credit_card_deposit')} isTab={true} />
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

export default CreditCardDeposit
