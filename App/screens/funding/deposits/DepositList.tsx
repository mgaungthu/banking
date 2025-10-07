import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {balanceStyles as styles} from '../styles'

import {FlatList} from 'react-native'
import DepositListItem from './DepositListItem'
import {Loader} from '../../../enums'
import {GlobalActions, WalletActions} from '../../../store'
import {AppFunctions} from '../../../utils'

const DepositList = (props: any) => {
  const {activeIndex} = props
  const dispatch = useDispatch()
  const walletData = useSelector((state: any) => state.walletReducer)
  const appData = useSelector((state: any) => state.appReducer)
  return (
    <>
      <FlatList
        data={
          activeIndex === 1
            ? AppFunctions.sortCreatedDataDesc(walletData?.depositHistory)
            : AppFunctions.sortCreatedDataDesc(walletData?.withdrawalHistory)
        }
        initialNumToRender={10}
        contentContainerStyle={[styles.list]}
        renderItem={({item}) => <DepositListItem trade={item} />}
        keyExtractor={item => item?.transactionId?.toString()}
        onRefresh={async () => {
          await dispatch(GlobalActions.getAssetMetadata())
          activeIndex === 1
            ? dispatch(WalletActions.getBalanceHistory('Deposit'))
            : dispatch(WalletActions.getBalanceHistory('Withdraw'))
        }}
        refreshing={
          appData.loading === Loader.GET_BALANCE_DEPOSIT_HISTORY ? true : false
        }
      />
    </>
  )
}

export default DepositList
