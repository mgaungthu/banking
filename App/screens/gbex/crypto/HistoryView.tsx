import React, {useEffect, useState, useRef} from 'react'
import {View, Text} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {historyStyles as styles, quickBuyStyles} from '../../quickbuy/styles'

import {FlatList} from 'react-native'
import HistoryItem from './HistoryItem'
import {GbexActions} from '../../../store'
import {Loader} from '../../../enums'
import {AppFunctions} from '../../../utils'
import HistoryShimmer from './HistoryShimmer'
import {strings} from '../../../strings'
import {ThemeFunctions} from '../../../utils'

const HistoryView = (props: any) => {
  const dispatch = useDispatch()
  const {gbexHistory} = useSelector((state: any) => state.gbexReducer)
  const appData = useSelector((state: any) => state.appReducer)
  const {appTheme} = useSelector((state: any) => state.globalReducer)

  useEffect(() => {
    if (gbexHistory.length === 0)
      dispatch(GbexActions.gbexHistory())
  }, [])

  return (
    <View
      style={[
        quickBuyStyles.container,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      {appData.loading === Loader.GBEX_HISTORY ? (
        <HistoryShimmer />
      ) : (
        <>
          {gbexHistory?.length > 0 ? (
            <FlatList
              data={AppFunctions.sortCreatedDataDesc(gbexHistory)}
              initialNumToRender={10}
              contentContainerStyle={styles.list}
              renderItem={({item}) => <HistoryItem trade={item} />}
              keyExtractor={item => item?.id.toString()}
              onRefresh={() => dispatch(GbexActions.gbexHistory())}
              refreshing={
                appData.loading === Loader.GBEX_HISTORY ? true : false
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
