import React, {useEffect, useRef, useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {formStyles as styles} from '../../account/styles';
import {Input, DropDown, DropDownUi, ThemeText} from '../../../components';
import {FormConstants, ReturnKeyTypes, Screen} from '../../../enums';
import {strings} from '../../../strings';
import {useDispatch, useSelector} from 'react-redux';
import {navigate, ThemeFunctions} from '../../../utils';
import Colors, {rapunzelTheme} from '../../../theme/Colors';
import {withdrawalStyles} from '../styles';
import {
  commonStyles,
  rtlStyles,
  textStyles,
} from '../../../globalstyles/styles';
import {formStyles} from '../../../components/forms/styles';

const InitiatePaymentForm = (props: any) => {
  const {appTheme, isRtlApproach} = useSelector(
    (state: any) => state.globalReducer,
  );

  const {
    control,
    errors,
    handlePicker,
    setValue,
    getValues,
    currencyFeeDetails,
  } = props;
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const amountRef = useRef(null);

  // useEffect(() => {
  //   if (getValues(FormConstants.Amount)) {
  //     let calculatedAmount = 0;
  //     const amount = getValues(FormConstants.Amount);
  //     if (getValues(FormConstants.Fee)) {
  //       calculatedAmount = parseFloat(amount) + getValues(FormConstants.Fee);
  //     }
  //     setValue(FormConstants.FinalAmount, '' + calculatedAmount);
  //   }
  // }, [currencyFeeDetails]);

  const onChangeAmount = e => {
    let calculatedAmount = 0;
    if (getValues(FormConstants.Fee)) {
      calculatedAmount =
        parseFloat(e) + parseFloat(getValues(FormConstants.Fee));
    }
    setValue(FormConstants.Amount, e === Infinity ? '0' : '' + e);

    setValue(
      FormConstants.FinalAmount,
      !calculatedAmount
        ? '0'
        : '' + parseFloat(calculatedAmount * 1).toFixed(2),
    );
  };

  const getDisabledColor = () => {
    return ThemeFunctions.isRapunzelTheme(appTheme)
      ? rapunzelTheme.secondaryColor
      : Colors.gray;
  };
  const pinkColor = () => {
    return {color: ThemeFunctions.customText(appTheme)};
  };
  const alignEnd = () => {
    return isRtlApproach ? [rtlStyles.alignSelfEnd, pinkColor()] : pinkColor();
  };

  const labelClass = () => {
    return [
      withdrawalStyles.lable,
      {color: ThemeFunctions.customText(appTheme)},
    ];
  };

  const labelValueClass = () => {
    return [
      withdrawalStyles.lableValue,
      {color: ThemeFunctions.customText(appTheme)},
    ];
  };

  const renderFee = (label, value) => {
    return (
      <>
        <Text adjustsFontSizeToFit={true} style={labelClass()}>
          {label}
        </Text>
        <Text adjustsFontSizeToFit={true} style={labelValueClass()}>
          {value}
        </Text>
      </>
    );
  };
  return (
    <View style={[styles.formView]}>
      <TouchableOpacity style={{paddingTop: 0}} onPress={handlePicker(1)}>
        <Input
          id={FormConstants.Currency_Label}
          label={strings('currency_label')}
          placeholder={strings('select')}
          control={control}
          errors={errors}
          isFieldFilledBg={false}
          isRequired={true}
          reference={nameRef}
          focusTo={emailRef}
          dropdown={true}
          returnKeyType={ReturnKeyTypes.Next}
        />
      </TouchableOpacity>

      <TouchableOpacity style={{paddingTop: 0}} onPress={handlePicker(2)}>
        <Input
          id={FormConstants.Beneficiary}
          label={strings('beneficiary')}
          placeholder={strings('select')}
          control={control}
          errors={errors}
          isRequired={true}
          isFieldFilledBg={false}
          dropdown={true}
          showTick={false}
        />
      </TouchableOpacity>

      <View style={commonStyles.rowItem}>
        <TouchableOpacity
          onPress={() => {
            navigate(Screen.Beneficiary, {});
          }}
          style={[
            {borderColor: ThemeFunctions.customText(appTheme)},
            withdrawalStyles.beneficiaryBtn,
          ]}>
          <ThemeText
            style={[
              withdrawalStyles.beneficiaryBtnText,
              {color: ThemeFunctions.customText(appTheme)},
            ]}>
            {strings('add_beneficiary')}
          </ThemeText>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={{paddingTop: 0}} onPress={handlePicker(3)}>
        <Input
          id={FormConstants.BankName}
          label={strings('processing_bank')}
          placeholder={strings('select_bank')}
          control={control}
          errors={errors}
          isRequired={true}
          isFieldFilledBg={false}
          dropdown={true}
          showTick={false}
        />
      </TouchableOpacity>
      {currencyFeeDetails && Object.keys(currencyFeeDetails).length > 0 && (
        <View style={[styles.input, {borderBottomWidth: 0}]}>
          <Text style={[formStyles.heading, formStyles.container, alignEnd()]}>
            {strings('currency_fees')}
          </Text>
          <View style={[commonStyles.rowItem, commonStyles.justifySpace]}>
            <View>
              {renderFee(
                strings('currency_label'),
                currencyFeeDetails?.currency,
              )}
            </View>
            <View>
              {renderFee(
                strings('deposit'),
                currencyFeeDetails?.depositFee + '%',
              )}
            </View>
            <View>
              {renderFee(
                strings('withdrawal'),
                currencyFeeDetails?.withdrawalFee + '%',
              )}
            </View>
          </View>
        </View>
      )}

      <Input
        id={FormConstants.Balance}
        label={strings('balance')}
        placeholder=""
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        showDropDown={false}
        dropdown={true}
        isRequired={true}
        disabledColor={getDisabledColor()}
      />
      <Input
        id={FormConstants.Amount}
        label={strings('amount')}
        placeholder={strings('enter_amount')}
        control={control}
        errors={errors}
        onChangeVal={onChangeAmount}
        keyboardType="decimal-pad"
        isFieldFilledBg={false}
        isRequired={true}
        reference={amountRef}
        returnKeyType={ReturnKeyTypes.Go}
      />
      <Input
        id={FormConstants.Fee}
        label={strings('fees')}
        placeholder=""
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={true}
        showDropDown={false}
        dropdown={true}
        disabledColor={getDisabledColor()}
      />
      <Input
        id={FormConstants.FinalAmount}
        label={strings('final_amount')}
        placeholder={strings('final_amount')}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={true}
        disabledColor={getDisabledColor()}
        showDropDown={false}
        dropdown={true}
      />
    </View>
  );
};

export default InitiatePaymentForm;
