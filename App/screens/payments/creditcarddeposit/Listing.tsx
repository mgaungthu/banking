import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {FlatList, Text} from 'react-native'
import ListingItem from './ListingItem'
import {strings} from '../../../strings'
import {withdrawalStyles as styles} from '../styles'
import {ThemeFunctions} from '../../../utils'
import {Loader} from '../../../enums'
import HistoryShimmer from '../../funding/withdrawals/ListShimmer'
import {PaymentActions} from '../../../store'

const Listing = (props: any) => {
  const dispatch = useDispatch()
  const {appTheme} = useSelector((state: any) => state.globalReducer)
  const appData = useSelector((state: any) => state.appReducer)
  const {powerCashListing} = useSelector((state: any) => state.paymentReducer)

  useEffect(() => {
    if (powerCashListing?.length === 0 && props.activeIndex === 1)
      dispatch(PaymentActions.creditCardPaymentList())
  }, [props.activeIndex])

  return (
    <>
      {appData.loading === Loader.CREDIT_CARD_LIST ? (
        <HistoryShimmer />
      ) : (
        <>
          {powerCashListing?.length > 0 ? (
            <FlatList
              data={powerCashListing}
              initialNumToRender={10}
              contentContainerStyle={{paddingTop: 22}}
              renderItem={({item}) => <ListingItem trade={item} />}
              keyExtractor={item => item?.id?.toString()}
              onRefresh={() => dispatch(PaymentActions.creditCardPaymentList())}
              refreshing={
                appData.loading === Loader.CREDIT_CARD_LIST ? true : false
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
    </>
  )
}

export default Listing
