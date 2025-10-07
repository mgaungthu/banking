import React, {useEffect} from 'react'
import {View, Text} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {historyStyles as styles, quickBuyStyles} from '../../quickbuy/styles'

import {FlatList} from 'react-native'
import HistoryItem from './HistoryItem'
import {IeosActions, QuickBuyActions} from '../../../store'
import {Loader} from '../../../enums'
import {AppFunctions} from '../../../utils'
import HistoryShimmer from '../../quickbuy/spot/HistoryShimmer'
import {strings} from '../../../strings'
import {ThemeFunctions} from '../../../utils'
import { makeRequest } from '../../../services/ApiService'
import { ieoDetailsSelector, ieoHistorySelector } from '../../../store/selectors/ieosSelector'
import { ThemeButton } from '../../../components'

const HistoryView = (props: any) => {
  const dispatch = useDispatch()
  const appData = useSelector((state: any) => state.appReducer)
  const {appTheme} = useSelector((state: any) => state.globalReducer)
  const { ticker, isLoading, isError } = useSelector(ieoDetailsSelector)
  const { history, isLoading: isHistoryLoading, isError: isHistoryError } = useSelector(ieoHistorySelector);

  useEffect(() => {
    if (ticker) {
      dispatch(IeosActions.getIeoHistory(ticker.ticker));
    }
  }, [ticker])

  return (
    <View
      style={[
        quickBuyStyles.container,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      {appData.loading === Loader.QUICK_BUY_SPOT_HISTORY ? (
        <HistoryShimmer />
      ) : (
        <>
          {history.length > 0 ? (
            <FlatList
              data={history}
              initialNumToRender={10}
              contentContainerStyle={styles.list}
              renderItem={({item}) => <HistoryItem trade={item} />}
              keyExtractor={item => item.id.toString()}
              onRefresh={() => dispatch(QuickBuyActions.qbtSpotHistory())}
              refreshing={
                appData.loading === Loader.QUICK_BUY_SPOT_HISTORY ? true : false
              }
            />
          ) : (
            <Text
              style={{
                ...styles.placeHolderText,
                color: ThemeFunctions.customText(appTheme),
              }}>
              {strings('no_history')}
            </Text>
          )}
        </>
      )}
    </View>
  )
}

export default HistoryView
