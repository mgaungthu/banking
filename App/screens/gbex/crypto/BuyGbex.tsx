import React, {useEffect, useState, useRef} from 'react'
import {View, Keyboard} from 'react-native'
import {commonStyles} from '../../../globalstyles/styles'
import {useDispatch, useSelector} from 'react-redux'
import GbexCard from './BuyGbexCard'
import {GbexActions, QuickBuyActions} from '../../../store'
import {APIConstants, MapperConstants} from '../../../constants'
import _ from 'lodash'
import {strings} from '../../../strings'
import {ThemeFunctions} from '../../../utils'
import {makeGetRequest, makeRequest} from '../../../services/ApiService'
import SelectToken from './SelectToken'

const BuyGbex = (props: any) => {
  const dispatch = useDispatch()
  const [secondCurrency, setSecondCurrency] = useState<any>(
    strings('select_token'),
  )
  const [scrollingIndex, setScrollingIndex] = useState(0)
  const [isEnabled, setIsEnabled] = useState(
    MapperConstants.StatusMapper.disable,
  )

  const [isModal, setIsModal] = useState(MapperConstants.StatusMapper.disable)
  const [error, setError] = useState('')
  const [bonusEnabled, setBonusStatus] = useState(
    MapperConstants.StatusMapper.disabled,
  )
  const [allSecondaryPrice, setAllSecondaryPrice] = useState(null)
  const quickBuyData = useSelector((state: any) => state.quickBuyReducer)

  const {appTheme} = useSelector((state: any) => state.globalReducer)
  const {liveCurrencyPrices} = useSelector((state: any) => state.gbexReducer)
  const [purchaseInfo, setPurchaseInfo] = useState({
    volume: null,
    total: null,
    balance: null,
  })

  useEffect(() => {
    if (props.activeIndex === 0) resetToIntialValues()
  }, [props.activeIndex])

  const resetToIntialValues = () => {
    setSecondCurrency(strings('select_token'))
    setBonusStatus(MapperConstants.StatusMapper.disabled)
    setPurchaseInfo({volume: null, total: null, balance: null})
    getUpdatedPrice()
    updateGBEXBal()
  }

  const getUpdatedPrice = async () => {
    dispatch(GbexActions.getLivePrice())
    const response = await makeRequest(
      MapperConstants.ApiTypes.POST,
      APIConstants.GET_CRYPTO_IEO,
      {},
    )
    if (response.status === 200) {
      let data
      response?.data.map(ieo => {
        if (ieo.ticker === 'GBEX') {
          data = ieo
          return
        }
      })
      setPurchaseInfo(prevState => ({
        ...prevState,
        bonusPercentage: data.bonus,
        assetPriceInUsd: data.tokenPrice,
        bonusTotal: 0,
      }))
      setBonusStatus(data.discountFlag === 1)
    }
    const response1 = await makeGetRequest(
      APIConstants.GET_ALL_SECONDARY_PRICE,
      {},
    )
    if (response1.status === 200) {
      setAllSecondaryPrice(response1.data)
    }
  }

  useEffect(() => {
    updateGBEXBal()
  }, [quickBuyData?.fundsList?.length])

  const updateGBEXBal = () => {
    if (quickBuyData?.fundsList?.length > 0) {
      let curr = quickBuyData?.fundsList?.find(({name}) => name === 'GBEX')
      if (curr && Object.keys(curr).length > 0) {
        setPurchaseInfo(prevState => ({
          ...prevState,
          gbexBalance: curr.balance,
        }))
      }
    }
  }

  useEffect(() => {
    if (quickBuyData?.fundsList?.length === 0)
      dispatch(QuickBuyActions.fundsList())
  }, [dispatch])

  const handleClick = async () => {
    if (secondCurrency === strings('select_token')) {
      setError(strings('second_currency_validation'))
      return
    }
    if (!purchaseInfo.volume) {
      setError(strings('volume_validation'))
      return
    }
    if (purchaseInfo.balance !== null && purchaseInfo.total !== null) {
      const isLessVol =
        Number(purchaseInfo?.balance) < Number(purchaseInfo?.total)
      setIsEnabled(isLessVol)
      if (isLessVol) {
        setError(
          strings('insufficient_balance', {
            key: secondCurrency?.toUpperCase(),
          }),
        )
        return
      }
    }
    setError('')
    setIsEnabled(MapperConstants.StatusMapper.disable)
    const payload = {
      ticker: 'gbex',
      firstCurrency: 'gbex',
      secondCurrency: secondCurrency,
      secondCurrencyPrice: purchaseInfo?.total,
    }
    await dispatch(GbexActions.buyGbex(payload, resetToIntialValues))
    Keyboard.dismiss()
  }

  const updateToken = (item, index) => () => {
    setPurchaseInfo(prevState => ({
      ...prevState,
      total: null,
      volume: null,
      bonusTotal: null,
    }))
    setSecondCurrency(item.symbol)
    setIsModal(MapperConstants.StatusMapper.disable)
    setIsEnabled(MapperConstants.StatusMapper.disable)
    setError('')
    setScrollingIndex(index)
  }

  return (
    <View
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      <GbexCard
        secondCurrency={secondCurrency}
        liveCurrencyPrices={liveCurrencyPrices}
        setSecondCurrency={setSecondCurrency}
        purchaseInfo={purchaseInfo}
        setPurchaseInfo={setPurchaseInfo}
        allSecondaryPrice={allSecondaryPrice}
        bonusEnabled={bonusEnabled}
        error={error}
        onSubmit={handleClick}
        setIsVisible={setIsModal}
        isEnabled={isEnabled}
        setIsEnabled={setIsEnabled}
        setError={setError}
      />
      <SelectToken
        secondCurrency={secondCurrency}
        isVisible={isModal}
        setIsVisible={setIsModal}
        liveCurrencyPrices={liveCurrencyPrices}
        setSecondCurrency={setSecondCurrency}
        updateToken={updateToken}
        setScrollingIndex={setScrollingIndex}
        scrollingIndex={scrollingIndex}
        isGbex={false}
      />
    </View>
  )
}

export default BuyGbex
