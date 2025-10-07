import React from 'react'
import { useSelector } from 'react-redux'
import { tickerStyles as styles, } from './styles'
import { FlatList, SafeAreaView } from 'react-native'
import TickersRow from './TickersRow'
import { ThemeFunctions } from '../../utils'
import { commonStyles } from '../../globalstyles/styles'
import { strings } from '../../strings'
import { Header } from '../../components'

const Limit = () => {

  const { tickers } = useSelector((state: any) => state.tickerReducer)
  const { appTheme } = useSelector(
    (state: any) => state.globalReducer,
  )

  return (
    <SafeAreaView
      style={[
        commonStyles.tabSafeView,
        commonStyles.topPadding,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      <Header title={strings('limit')} showBack={true} />
      <FlatList
        data={tickers}
        initialNumToRender={10}
        contentContainerStyle={[styles.list]}
        renderItem={({ item }) => (
          <TickersRow data={item} checkboxSelected={false} />
        )}
        keyExtractor={item => item?.id?.toString()}
        ListEmptyComponent={() => (
          <>
          </>
        )}
      />
    </SafeAreaView>
  )
}

export default Limit
