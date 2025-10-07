import React, {useEffect, useState} from 'react'
import {View, Keyboard} from 'react-native'
import {commonStyles} from '../../../globalstyles/styles'
import {useDispatch, useSelector} from 'react-redux'
import {useForm} from 'react-hook-form'
import FunctionalityForm from './FunctionalityForm'
import {FormConstants} from '../../../enums'
import {QuickBuyActions} from '../../../store'
import {AppConstants} from '../../../constants'
import _ from 'lodash'
import {strings} from '../../../strings'
import {ThemeFunctions} from '../../../utils'
import {showToast} from '../../../utils/GenericUtils'

const Functionality = (props: any) => {
  const dispatch = useDispatch()
  const [estimatedDetails, setEstimatedDetails] = useState<any>({})
  const [actionSide, setActionSide] = useState<string>('bid')
  const [pairName, setPairName] = useState<string>('')
  const [pairId, setPairId] = useState<any>('')
  const [firstCurrency, setFirstCurrency] = useState<any>(
    strings('first_currency'),
  )
  const [secondCurrency, setSecondCurrency] = useState<any>(
    strings('second_currency'),
  )
  const [quickBuyPairData, setQuickBuyPairData] = useState<any>([])
  const {appTheme} = useSelector((state: any) => state.globalReducer)

  const quickBuyData = useSelector((state: any) => state.quickBuyReducer)

  const {
    control,
    formState: {errors},
    setValue,
    getValues,
    handleSubmit,
    reset,
  } = useForm()

  useEffect(() => {
    if (props.activeIndex === 0) resetToIntialValues()
  }, [props.activeIndex])

  const resetToIntialValues = () => {}

  useEffect(() => {
    setInitialValues()
  }, [])

  useEffect(() => {
    if (quickBuyData?.pairs?.length > 0) {
      let quickBuyNew = []
      quickBuyData?.pairs?.map(pairData => {
        quickBuyNew.push({
          label: `${pairData.firstCurrency}-${pairData.secondCurrency}`,
          value: pairData.pairId,
        })
      })
      setQuickBuyPairData(quickBuyNew)
    }
  }, [quickBuyData.pairs])

  useEffect(()=>{
    if (quickBuyData?.pairs?.length === 0) 
    dispatch(QuickBuyActions.getPairs())

  },[quickBuyData?.pairs])

  const setUpdatedPairName = () => {
    if (props?.selectedPair) {
      setPairName(props?.selectedPair)
      updateValues(props?.selectedPair?.replace('/', '-'))
      setValue(
        FormConstants.Pair,
        props?.selectedPair?.replace('/', '-')
      )
      setValue(FormConstants.Total, '0')
      const totalCur =
        actionSide === 'bid'
          ? props?.selectedPair.split('/')[1]
          : props?.selectedPair.split('/')[0]
      let curr = null
      if (quickBuyData?.fundsList?.length > 0) {
        curr = quickBuyData?.fundsList?.filter(({name}) => name === totalCur)[0]
        if (_.isUndefined(curr) || _.isNull(curr)) {
          setValue(FormConstants.Balance, '0')
        } else {
          setValue(FormConstants.Balance, curr?.balance ? curr.balance : '0')
        }
      } else {
        setValue(FormConstants.Balance, '0')
      }
    } else {
      setValue(FormConstants.Pair, '')
      setPairName('')
    }
  }
  useEffect(() => {
    setUpdatedPairName()
  }, [])

  const getPairId = pair => {
    return quickBuyPairData.find(res => res.label === pair)?.value
  }
  useEffect(() => {
    getUpdatedPrice()
  }, [pairName])

  const updateValues = (pair: string) => {
    setPairName(pair)
    setFirstCurrency(pair.split('-')[0])
    setSecondCurrency(pair.split('-')[1])
    setValue(
      FormConstants.Volume,
      AppConstants.QuickBuyDefault[pair]
        ? '' + AppConstants.QuickBuyDefault[pair]
        : '0',
    )
    setPairId(getPairId(pair))
  }

 
  const getUpdatedPrice = async () => {
    if (pairName) {
      const priceDetails = await QuickBuyActions.getPrice({pairName})
      if (priceDetails.status === 200) {
        setEstimatedDetails(priceDetails.data)
      }
    }
  }

  useEffect(() => {
    dispatch(QuickBuyActions.fundsList())
    const timeInterval = setInterval(() => {
      getUpdatedPrice()
    }, 1000)
    return () => {
      clearInterval(timeInterval)
    }
  }, [dispatch, pairName])

  const setInitialValues = () => {
    setValue(FormConstants.Volume, '0')
    setValue(FormConstants.Total, '0')
    setValue(FormConstants.Side, actionSide === 'bid' ? 'Buy' : 'Sell')
  }

  const getSideBalance = () => {
    if (!pairName || !actionSide) return null
    const totalCur = actionSide === 'bid' ? secondCurrency : firstCurrency
    let curr = null
    if (quickBuyData?.fundsList?.length > 0)
      curr = quickBuyData?.fundsList?.filter(({name}) => name === totalCur)[0]
    if (_.isUndefined(curr) || _.isNull(curr)) return null
    const {balance} = curr
    const deci = AppConstants.CurrencyAmountDecimal[totalCur] || 4
    return Math.floor(balance * Math.pow(10, deci)) / Math.pow(10, deci)
  }

  const onSubmit = async (data: any) => {
    let payload = {
      side: actionSide,
      volume: data.volume,
      pair: data.pair,
      pairId: pairId,
    }

    await dispatch(QuickBuyActions.quickBuy(payload, resetToIntialValues))
    Keyboard.dismiss()
  }

  return (
    <View
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      <FunctionalityForm
        control={control}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        quickBuyPairData={quickBuyPairData}
        firstCurrency={firstCurrency}
        secondCurrency={secondCurrency}
        estimatedDetails={estimatedDetails}
        updateValues={updateValues}
        pairName={pairName}
        actionSide={actionSide}
        getSideBalance={getSideBalance}
        setActionSide={setActionSide}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      />
    </View>
  )
}

export default Functionality
