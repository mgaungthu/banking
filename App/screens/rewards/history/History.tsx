import React, {useState} from 'react'
import {SafeAreaView} from 'react-native'
import {commonStyles} from '../../../globalstyles/styles'
import {strings} from '../../../strings'
import HistoryTab from './HistoryTab'
import {Header} from '../../../components'
import {useSelector} from 'react-redux'
import {ThemeFunctions} from '../../../utils'

const History = (props: any) => {
  const [index, setIndex] = useState(0)
  const {isRtlApproach, appTheme} = useSelector(
    (state: any) => state.globalReducer,
  )
  const [routes] = React.useState([
    {key: 'drip_logs', title: strings('drip_logs')},
    {key: 'redeem_history', title: strings('redeem_history')},
  ])
  const [reverseRoutes] = React.useState([
    {key: 'redeem_history', title: strings('redeem_history')},
    {key: 'drip_logs', title: strings('drip_logs')},
  ])

  const handleIndexChange = (index: number) => {
    setIndex(index)
  }

  return (
    <>
      <SafeAreaView
        style={[
          commonStyles.tabSafeView,
          ThemeFunctions.setBackground(appTheme),
        ]}>
        <Header title={strings('history')} isTab={true}/>
        <HistoryTab
          routes={isRtlApproach ? reverseRoutes : routes}
          index={index}
          navigation={props.navigation}
          handleIndexChange={handleIndexChange}
        />
      </SafeAreaView>
    </>
  )
}

export default History
