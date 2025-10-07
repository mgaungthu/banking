import React from 'react'
import {View, TouchableOpacity} from 'react-native'
import {formStyles as styles} from '../../account/styles'
import {Input,DropDown} from '../../../components'
import {FormConstants, ReturnKeyTypes} from '../../../enums'
import {strings} from '../../../strings'
import {useSelector} from 'react-redux'
import {RegexExpression, ThemeFunctions} from '../../../utils'
import { AppConstants } from '../../../constants'

const FiatPaymentForm = (props: any) => {
  const {appTheme} = useSelector((state: any) => state.globalReducer)
  const {control, errors,setValue,getValues} = props
  const fiatCurrencies = AppConstants.FiatCurrencyPowerCash?.map(el => el.label).sort()
  
  const onChangeAmount = e => {
   const feePercentage = parseFloat(getValues(FormConstants.Fee))
    setValue(FormConstants.FeeAmount,''+((parseFloat(e)*feePercentage)/100))
    setValue(FormConstants.Amount,''+e)
  }
  return (
    <View style={styles.formView}>
      {/* <TouchableOpacity style={{paddingTop: 0,marginTop:-14}} onPress={handleCurrency(1)}> */}
      <DropDown
        options={fiatCurrencies}
        customHeight={60}
        customWidth="92%"
        updateValue={index =>
          setValue(FormConstants.Currency_Label,fiatCurrencies[index] )
        }>
        <Input
          id={FormConstants.Currency_Label}
          label={strings('currency_label')}
          placeholder={strings('select')}
          control={control}
          errors={errors}
          isFieldFilledBg={false}
          isRequired={true}
          dropdown={true}
          returnKeyType={ReturnKeyTypes.Next}
          customStyles={[
            styles.input,
            ThemeFunctions.customInputBorderColor(appTheme),
          ]}
        />
        </DropDown>
      {/* </TouchableOpacity> */}
      <Input
        id={FormConstants.Fee}
        label={strings('fee_percentage')}
        placeholder='0'
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={true}
        customStyles={[
          styles.input,
          ThemeFunctions.customInputBorderColor(appTheme),
        ]}
        showDropDown={false}
        dropdown={true}
      />
      <Input
        id={FormConstants.Amount}
        label={strings('amount')}
        placeholder={strings('enter_amount')}
        control={control}
        errors={errors}
        pattern={RegexExpression.DECIMAL_REGEX}
        maxLength={20}
        keyboardType='decimal-pad'
        isFieldFilledBg={false}
        isRequired={true}
        returnKeyType={ReturnKeyTypes.Go}
        onChangeVal={onChangeAmount}
        customStyles={[
          styles.input,
          ThemeFunctions.customInputBorderColor(appTheme),
        ]}
      />
      <Input
        id={FormConstants.FeeAmount}
        label={strings('fee_amount')}
        placeholder={strings('fee_amount')}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={true}
        customStyles={[
          styles.input,
          ThemeFunctions.customInputBorderColor(appTheme),
        ]}
        showDropDown={false}
        dropdown={true}
      />
    </View>
  )
}

export default FiatPaymentForm
