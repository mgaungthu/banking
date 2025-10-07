import React, {useEffect, useState} from 'react'
import {View} from 'react-native'
import {commonStyles} from '../../../globalstyles/styles'
import {useDispatch, useSelector} from 'react-redux'
import {useForm} from 'react-hook-form'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

import _ from 'lodash'
import {ThemeFunctions} from '../../../utils'
import InitiatePaymentForm from './FiatPaymentForm'
import {DismissKeyboardView, ThemeButton, Note} from '../../../components'
import {FormConstants, Loader} from '../../../enums'
import {strings} from '../../../strings'
import SelectToken from '../../gbex/crypto/SelectToken'
import {MapperConstants} from '../../../constants'
import {AppActions, GbexActions, PaymentActions} from '../../../store'

const FiatPayment = (props: any) => {
  const dispatch = useDispatch()
  const {appTheme} = useSelector((state: any) => state.globalReducer)
  const appData = useSelector((state: any) => state.appReducer)
  // const [isModal, setIsModal] = useState(MapperConstants.StatusMapper.disable)
  // const [currency, setCurrency] = useState<any>('')
  const [showNote, setShowNote] = useState(MapperConstants.StatusMapper.disable)

  const {liveCurrencyPrices} = useSelector((state: any) => state.gbexReducer)
  // const [scrollingIndex, setScrollingIndex] = useState(0)

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
    if (liveCurrencyPrices?.length === 0) {
      dispatch(GbexActions.getLivePrice())
    }
  }, [props.activeIndex])

  // useEffect(() => {
  //   setValue(FormConstants.Currency_Label, currency)
  // }, [currency])

  useEffect(() => {
    dispatch(AppActions.getUserProfile())
  }, [])
  useEffect(() => {
    if (
      appData.userProfileData?.documentStatus !==
        MapperConstants.KycStatusConstant.approved &&
      appData.userProfileData?.documentStatus !==
        MapperConstants.KycStatus.approved
    ) {
      setShowNote(MapperConstants.StatusMapper.enable)
    } else {
      setShowNote(MapperConstants.StatusMapper.disable)
    }
  }, [appData.userProfileData])

  const resetToIntialValues = () => {
    setValue(FormConstants.Fee, '4.99')
    setValue(FormConstants.FeeAmount, '0')
  }

  const onSubmit = async (data: any) => {
    let payload = {
      amount: data.amount,
      currency: data.currency_label,
    }
    dispatch(PaymentActions.creditCardPayment(payload, resetToIntialValues))
  }

  // const updateToken = (item, index) => () => {
  //   setCurrency(item.symbol)
  //   setIsModal(MapperConstants.StatusMapper.disable)
  // }
  // const handleCurrency = (value: any) => () => {
  //   setIsModal(MapperConstants.StatusMapper.enable)
  // }

  return (
    <View
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      <KeyboardAwareScrollView
        contentContainerStyle={[commonStyles.paddingHorizontalView]}
        keyboardShouldPersistTaps='handled'
        extraScrollHeight={34}>
        <DismissKeyboardView>
          <View style={{marginTop: 14}}>
            {showNote && (
              <Note subtitle={strings('note_fiat')} appTheme={appTheme} />
            )}
          </View>
          <InitiatePaymentForm
            control={control}
            errors={errors}
            // handleCurrency={handleCurrency}
            setValue={setValue}
            getValues={getValues}
          />
          {/* <SelectToken
            secondCurrency={currency}
            isVisible={isModal}
            setIsVisible={setIsModal}
            liveCurrencyPrices={liveCurrencyPrices}
            setSecondCurrency={setCurrency}
            updateToken={updateToken}
            setScrollingIndex={setScrollingIndex}
            scrollingIndex={scrollingIndex}
          /> */}
        </DismissKeyboardView>
      </KeyboardAwareScrollView>
      <View style={commonStyles.paddingHorizontalView}>
        <ThemeButton
          text='submit'
          onClickHandler={handleSubmit(onSubmit)}
          loading={
            appData.loading === Loader.MAKE_CREDIT_CARD_PAYMENT ? true : false
          }
        />
      </View>
    </View>
  )
}

export default FiatPayment
