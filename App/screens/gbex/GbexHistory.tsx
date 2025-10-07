import React from 'react'
import {View} from 'react-native'
import {commonStyles} from '../../globalstyles/styles'
import {Header} from '../../components'
import {strings} from '../../strings'
import {quickBuyStyles as styles} from '../quickbuy/styles'
import HistoryView from './crypto/HistoryView'

const GbexHistory = (props: any) => {
  
  const isBackButton = () => {
    return true
  }
  return (
    <View style={[commonStyles.safeView]}>
      <Header
        title={strings('gbex_history')}
        isNormalText={true}
        showBack={isBackButton()}
        isTab={true}
      />
      <View style={styles.view}>
      <HistoryView />
      </View>
    </View>
  )
}

export default GbexHistory
