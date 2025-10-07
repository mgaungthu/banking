import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {balanceStyles as styles} from '../styles'

import {FlatList} from 'react-native'
import WithdrawalListItem from './WithdrawalListItem'
import {Loader} from '../../../enums'
import {WalletActions, GlobalActions} from '../../../store'
import {AppFunctions} from '../../../utils'

const WithdrawalList = (props: any) => {
  const dispatch = useDispatch()
  const walletData = useSelector((state: any) => state.walletReducer)
  const appData = useSelector((state: any) => state.appReducer)
  return (
    <>
      <FlatList
        data={AppFunctions.sortCreatedDataDesc(walletData?.withdrawalHistory)}
        initialNumToRender={10}
        contentContainerStyle={[styles.list]}
        renderItem={({item}) => <WithdrawalListItem trade={item} />}
        keyExtractor={item => item?.transactionId?.toString()}
        onRefresh={async () => {
          await dispatch(GlobalActions.getAssetMetadata())
          dispatch(WalletActions.getBalanceHistory('Withdraw'))
        }}
        refreshing={
          appData.loading === Loader.GET_BALANCE_DEPOSIT_HISTORY ? true : false
        }
      />
    </>
  )
}

export default WithdrawalList
