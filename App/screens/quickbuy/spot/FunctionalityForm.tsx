import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { formStyles as styles } from '../../account/styles'
import { Input, ThemeButton } from '../../../components'
import { FormConstants, Loader } from '../../../enums'
import { strings } from '../../../strings'
import { AppConstants } from '../../../constants'
import { DropDown } from '../../../components'
import { commonStyles } from '../../../globalstyles/styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Chip } from 'react-native-paper'
import { quickBuyStyles } from '../styles'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import { ThemeFunctions } from '../../../utils'
import { rapunzelTheme } from '../../../theme/Colors'

const FunctionalityForm = ({
  control,
  errors,
  firstCurrency,
  actionSide,
  pairName,
  secondCurrency,
  setValue,
  quickBuyPairData,
  updateValues,
  getValues,
  getSideBalance,
  estimatedDetails,
  setActionSide,
  handleSubmit,
  onSubmit,
}: any) => {
  const quickBuyData = useSelector((state: any) => state.quickBuyReducer)
  const appData = useSelector((state: any) => state.appReducer)
  const { appTheme } = useSelector((state: any) => state.globalReducer)

  const secondaryBalance =
    getSideBalance() !== null ? parseFloat(getSideBalance()) : getSideBalance()

  const [pairOptions,setPairOptions]=useState([])

  const amountDeci = AppConstants.CurrencyAmountDecimal[firstCurrency]
  const totalDeci = AppConstants.CurrencyAmountDecimal[secondCurrency]
  const allBalanceCap = 0.995
  const feePercent = 0.001

  const inputStyles = () => {
    return [styles.input, ThemeFunctions.customInputBorderColor(appTheme)]
  }

  const getBalance = () => {
    if (!pairName || !actionSide) return null
    const totalCur = actionSide === 'bid' ? secondCurrency : firstCurrency
    let curr = null
    if (quickBuyData?.fundsList?.length > 0)
      curr = quickBuyData?.fundsList?.filter(({ name }) => name === totalCur)[0]
    if (_.isUndefined(curr) || _.isNull(curr)) return null

    const { balance, name } = curr
    setValue(FormConstants.Balance, '' + balance)
    return { name }
  }
  useEffect(() => {
    if (quickBuyData?.fundsList?.length > 0) getBalance()
  }, [quickBuyData?.fundsList])

  let currentSidePrice = 0

  useEffect(() => {
    if (Object.keys(estimatedDetails).length > 0) {
      switch (actionSide) {
        case 'bid': {
          currentSidePrice = estimatedDetails.bid
          break
        }
        case 'ask': {
          currentSidePrice = estimatedDetails.ask
          break
        }
        default: {
          currentSidePrice = 0
        }
      }
    }
    setValue(FormConstants.EstimatedPrice, '' + currentSidePrice)
    if (Number(getValues(FormConstants.Volume)) >= 0) {
      const estimatedFee =
        Number(currentSidePrice) *
        Number(getValues(FormConstants.Volume)) *
        feePercent
      setValue(
        FormConstants.EstimatedFees,
        estimatedFee === Infinity ? '0' : '' + estimatedFee,
      )
      const estimatedTotal =
        Number(currentSidePrice) * Number(getValues(FormConstants.Volume))
      setValue(
        FormConstants.EstimatedTotal,
        estimatedTotal === Infinity ? '0' : '' + estimatedTotal,
      )
    }
  }, [estimatedDetails, getValues(FormConstants.Volume)])

  const onChangeVal = e => {
    setValue(FormConstants.Volume, e === Infinity ? '0' : '' + e)
    const total = Number(e) * currentSidePrice
    setValue(FormConstants.Total, total === Infinity ? '0' : '' + total)
  }
  const onChangeTotal = e => {
    setValue(FormConstants.Total, e === Infinity ? '0' : '' + e)
    const total = Number(e) / currentSidePrice
    setValue(FormConstants.Volume, total === Infinity ? '0' : '' + total)
  }
  useEffect(()=>{
    setPairOptions(quickBuyPairData)
  },[quickBuyPairData])

  return (
    <View style={commonStyles.flexDisplay}>
      <KeyboardAwareScrollView contentContainerStyle={commonStyles.scrollView}>
        <DropDown
          options={pairOptions?.map(el => el.label)}
          customHeight={120}
          customTextStyle={{ textTransform: 'uppercase' }}
          updateValue={index => {
            updateValues(pairOptions?.map(el => el.label)[index])
            setValue(
              FormConstants.Pair,
              pairOptions?.map(el => el.label)[index],
            )
            setValue(FormConstants.Total, '0')
          }}>
          <Input
            id={FormConstants.Pair}
            label={strings('pair')}
            placeholder={`${strings('select')}`}
            control={control}
            errors={errors}
            isRequired={true}
            isFieldFilledBg={false}
            customStyles={inputStyles()}
            dropdown={true}
            showTick={false}
          />
        </DropDown>
        <DropDown
          options={AppConstants.QuickBuySides}
          customHeight={80}
          updateValue={index => {
            setValue(FormConstants.Side, AppConstants.QuickBuySides[index])
            // setValue(FormConstants.Side,strings(AppConstants.QuickBuySides[index].toLowerCase()))
            setActionSide(
              AppConstants.QuickBuySides[index] === 'Buy' ? 'bid' : 'ask',
            )
          }}>
          <Input
            id={FormConstants.Side}
            label={strings('side')}
            placeholder={`${strings('select')}`}
            control={control}
            errors={errors}
            isRequired={true}
            isFieldFilledBg={false}
            customStyles={inputStyles()}
            dropdown={true}
            showTick={false}
          />
        </DropDown>
        <Input
          id={FormConstants.Volume}
          label={strings('volume')}
          placeholder={'0'}
          control={control}
          errors={errors}
          isFieldFilledBg={false}
          isRequired={true}
          customStyles={inputStyles()}
          rightText={firstCurrency}
          showTick={false}
          onChangeVal={onChangeVal}
          keyboardType='decimal-pad'
        />
        <Input
          id={FormConstants.Balance}
          placeholder={`${strings('select')} ${strings('pair')}/${strings(
            'side',
          )}`}
          label={strings('balance')}
          control={control}
          errors={errors}
          customStyles={inputStyles()}
          rightText={getBalance()?.name || strings('currency')}
          isFieldFilledBg={false}
          isRequired={false}
          showDropDown={false}
          dropdown={true}
          showTick={false}
        />
        <View style={quickBuyStyles.badgeView}>
          {secondCurrency &&
            AppConstants.QuickSelectAmount[secondCurrency] &&
            AppConstants.QuickSelectAmount[secondCurrency].map(res => (
              <Chip
                key={res}
                textStyle={[
                  quickBuyStyles.chipText,
                  ThemeFunctions.isRapunzelTheme(appTheme)
                    ? {
                      color: rapunzelTheme.magenta,
                    }
                    : ThemeFunctions.customInputText(appTheme),
                ]}
                style={[
                  quickBuyStyles.badge,
                  ThemeFunctions.isRapunzelTheme(appTheme)
                    ? {
                      borderColor: rapunzelTheme.magenta,
                    }
                    : { borderColor: ThemeFunctions.chipColor(appTheme) },
                ]}
                onPress={() => {
                  setValue(FormConstants.Total, '' + res)
                  let vol = res / Number(currentSidePrice)
                  setValue(
                    FormConstants.Volume,
                    isNaN(vol) || vol === Infinity ? '0' : '' + vol,
                  )
                }}
                mode='outlined'>{`${res} ${secondCurrency}`}</Chip>
            ))}
          {secondaryBalance !== null ? (
            <Chip
              textStyle={[
                quickBuyStyles.chipText,
                ThemeFunctions.isRapunzelTheme(appTheme)
                  ? {
                    color: rapunzelTheme.magenta,
                  }
                  : ThemeFunctions.customInputText(appTheme),
              ]}
              style={[
                quickBuyStyles.badge,
                ThemeFunctions.isRapunzelTheme(appTheme)
                  ? {
                    borderColor: rapunzelTheme.magenta,
                  }
                  : { borderColor: ThemeFunctions.chipColor(appTheme) },
              ]}
              onPress={() => {
                let tot = (
                  (actionSide === 'bid'
                    ? secondaryBalance
                    : secondaryBalance * Number(currentSidePrice)) *
                  allBalanceCap
                ).toFixed(totalDeci)
                setValue(
                  FormConstants.Total,
                  isNaN(parseFloat(tot)) ? '0' : '' + tot,
                )
                let x = (
                  (actionSide === 'bid'
                    ? secondaryBalance / Number(currentSidePrice)
                    : secondaryBalance) * allBalanceCap
                ).toFixed(amountDeci)
                setValue(
                  FormConstants.Volume,
                  isNaN(parseFloat(x)) ? '0' : '' + x,
                )
              }}
              mode='outlined'>{`All ${actionSide === 'bid' ? secondCurrency : firstCurrency
                }`}</Chip>
          ) : null}
        </View>
        <Input
          id={FormConstants.Total}
          label={`${strings('total_in')} ${secondCurrency}`}
          placeholder={'0'}
          control={control}
          errors={errors}
          isFieldFilledBg={false}
          isRequired={true}
          customStyles={inputStyles()}
          rightText={secondCurrency}
          labelStyles={{ textTransform: 'none' }}
          showTick={false}
          onChangeVal={onChangeTotal}
          keyboardType='decimal-pad'
        />
        <Input
          id={FormConstants.EstimatedPrice}
          label={`${strings('estimated_price')}`}
          placeholder={'0'}
          control={control}
          errors={errors}
          isFieldFilledBg={false}
          isRequired={true}
          customStyles={inputStyles()}
          rightText={secondCurrency}
          showDropDown={false}
          dropdown={true}
          showTick={false}
        />
        <Input
          id={FormConstants.EstimatedTotal}
          label={`${strings('estimate_total')}`}
          placeholder={'0'}
          control={control}
          errors={errors}
          isFieldFilledBg={false}
          isRequired={true}
          customStyles={inputStyles()}
          rightText={secondCurrency}
          showDropDown={false}
          dropdown={true}
          showTick={false}
        />
        <Input
          id={FormConstants.EstimatedFees}
          label={`${strings('estimated_fees')}`}
          placeholder={'0'}
          control={control}
          errors={errors}
          isFieldFilledBg={false}
          isRequired={true}
          customStyles={inputStyles()}
          rightText={secondCurrency}
          showDropDown={false}
          dropdown={true}
          showTick={false}
        />
      </KeyboardAwareScrollView>
      <View style={commonStyles.paddingHorizontalView}>
        <ThemeButton
          text={actionSide === 'bid' ? 'buy' : 'sell'}
          onClickHandler={handleSubmit(onSubmit)}
          loading={appData.loading === Loader.QUICK_BUY ? true : false}
        />
      </View>
    </View>
  )
}

export default FunctionalityForm
