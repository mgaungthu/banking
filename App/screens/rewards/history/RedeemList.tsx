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

const RedeemList = (props: any) => {
  const dispatch = useDispatch()
  const appData = useSelector((state: any) => state.appReducer)
  const {rewardsHistory} = useSelector((state: any) => state.gbexReducer)
  const {appTheme} = useSelector((state: any) => state.globalReducer)

  useEffect(() => {
    if (rewardsHistory?.length === 0) dispatch(GbexActions.getRewardsHistory())
  }, [props.activeIndex])

  return (
    <>
      {rewardsHistory.length === 0 &&
        appData.loading === Loader.GET_REWARDS_HISTORY ? (
        <HistoryShimmer />
      ) : (
        <FlatList
          data={rewardsHistory}
          initialNumToRender={10}
          contentContainerStyle={[styles.rewardlist]}
          renderItem={({item, index}) => (
            <RowItem trade={item} index={index} />
          )}
          keyExtractor={item => item?.id?.toString()}
          onRefresh={() => dispatch(GbexActions.getRewardsHistory())}
          refreshing={
            appData.loading === Loader.GET_REWARDS_HISTORY ? true : false
          }
          ListEmptyComponent={() => (
            <>
              <Text
                style={{
                  ...withdrawalStyles.placeHolderText,
                  color: ThemeFunctions.customText(appTheme),
                }}>
                {strings('no_history')}
              </Text>
            </>
          )}
        />
      )}
    </>
  )
}

export default RedeemList
