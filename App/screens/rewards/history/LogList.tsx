import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {balanceStyles as styles} from '../../funding/styles'
import {withdrawalStyles} from '../../payments/styles'

import {FlatList, Text} from 'react-native'
import {Loader} from '../../../enums'
import {GbexActions} from '../../../store'
import RowItem from './RowItem'
import HistoryShimmer from '../../funding/withdrawals/ListShimmer'
import {ThemeFunctions} from '../../../utils'
import {strings} from '../../../strings'

const LogList = (props: any) => {
  const dispatch = useDispatch()
  const appData = useSelector((state: any) => state.appReducer)
  const {dripLogs} = useSelector((state: any) => state.gbexReducer)
  const {appTheme} = useSelector((state: any) => state.globalReducer)

  useEffect(() => {
    if (dripLogs?.length === 0) dispatch(GbexActions.getDripLogs())
  }, [props.activeIndex])

  return (
    <>
      {dripLogs?.length === 0 && appData.loading === Loader.GET_DRIP_LOGS ? (
        <HistoryShimmer />
      ) : (
        <FlatList
          data={dripLogs}
          initialNumToRender={10}
          contentContainerStyle={[styles.rewardlist]}
          renderItem={({item, index}) => (
            <RowItem trade={item} index={index} type={1} />
          )}
          keyExtractor={item => item?.id?.toString()}
          onRefresh={() => dispatch(GbexActions.getDripLogs())}
          refreshing={appData.loading === Loader.GET_DRIP_LOGS ? true : false}
          ListEmptyComponent={() => (
              <Text
                style={{
                  ...withdrawalStyles.placeHolderText,
                  color: ThemeFunctions.customText(appTheme),
                }}>
                {strings('no_history')}
              </Text>
          )}
        />
      )}
    </>
  )
}

export default LogList
