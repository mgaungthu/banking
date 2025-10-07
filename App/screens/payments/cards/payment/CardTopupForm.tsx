import React, {useEffect, useRef, useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {formStyles as styles} from '../../../account/styles';
import {Input, DropDown, ThemeText} from '../../../../components';
import {FormConstants, ReturnKeyTypes} from '../../../../enums';
import {strings} from '../../../../strings';
import {useSelector} from 'react-redux';
import {ThemeFunctions} from '../../../../utils';

import {rtlStyles} from '../../../../globalstyles/styles';
import {withdrawalStyles} from '../../styles';
import {historyStyles} from '../../../quickbuy/styles';

const CardTopupForm = (props: any) => {
  const {appTheme, isRtlApproach} = useSelector(
    (state: any) => state.globalReducer,
  );
  const appData = useSelector((state: any) => state.appReducer);

  const {
    control,
    setValue,
    errors,
    handlePicker,
    amount,
    originalTopupFee,
    topupFee,
    totalAmount,
    currency,
    wallet,
    setAmount,
    amountWallet,
    cardAvailableBalance,
  } = props;
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const reverseDirection = () => {
    return [
      historyStyles.rowItem,
      {
        borderBottomWidth: 0,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 0,
        paddingRight: 0,
      },
      isRtlApproach ? rtlStyles.reverseRow : {},
    ];
  };
  const leftAlignView = () => {
    return [
      withdrawalStyles.leftItemView,
      isRtlApproach ? rtlStyles.alignEnd : rtlStyles.alignStart,
    ];
  };
  const rightAlignView = () => {
    return [
      withdrawalStyles.rightView,

      isRtlApproach ? rtlStyles.alignStart : rtlStyles.alignEnd,
    ];
  };
  const leftTextColor = () => {
    return {color: ThemeFunctions.customText(appTheme)};
  };

  const handleAmount = val => {
    setAmount(val);
    setValue(FormConstants.Amount, val);
  };

  return (
    <View style={styles.formView}>
      <TouchableOpacity style={{paddingTop: 0}} onPress={handlePicker(1)}>
        <Input
          id={FormConstants.Card}
          label={strings('card')}
          placeholder={strings('Select Card')}
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
      {cardAvailableBalance != 0 && (
        <View style={{paddingTop: 10}}>
          <ThemeText style={[withdrawalStyles.leftLabel, leftTextColor()]}>
            Current Balance: {cardAvailableBalance}
          </ThemeText>
        </View>
      )}

      <TouchableOpacity style={{paddingTop: 0}} onPress={handlePicker(2)}>
        <Input
          id={FormConstants.Wallet}
          label={strings('Pay With')}
          placeholder={strings('Select Currency')}
          control={control}
          errors={errors}
          isRequired={true}
          isFieldFilledBg={false}
          dropdown={true}
          showTick={false}
        />
      </TouchableOpacity>
      <Input
        id={FormConstants.Amount}
        label={strings('amount')}
        placeholder="Your Topup Amount"
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        showDropDown={false}
        dropdown={false}
        isRequired={true}
        onChangeVal={handleAmount}
        textTransform="none"
      />

      {amount > 0 && (
        <View style={{borderTopWidth: 1, marginTop: 20}}>
          <View style={reverseDirection()}>
            <View style={leftAlignView()}>
              <Text style={[withdrawalStyles.leftLabel, leftTextColor()]}>
                Amount:
              </Text>
            </View>
            <View />
            <View
              style={[
                rightAlignView(),
                {flexDirection: 'row', justifyContent: 'flex-end'},
              ]}>
              <Text style={[withdrawalStyles.rightLabel, leftTextColor()]}>
                {amount} {currency} = {(amountWallet * 1).toFixed(12)} {wallet}
              </Text>
            </View>
          </View>
          <View style={reverseDirection()}>
            <View style={leftAlignView()}>
              <Text style={[withdrawalStyles.leftLabel, leftTextColor()]}>
                Topup Fees:
              </Text>
            </View>
            <View />
            <View
              style={[
                rightAlignView(),
                {flexDirection: 'row', justifyContent: 'flex-end'},
              ]}>
              <Text style={[withdrawalStyles.rightLabel, leftTextColor()]}>
                {originalTopupFee} {currency} = {(topupFee * 1).toFixed(12)}{' '}
                {wallet}
              </Text>
            </View>
          </View>
          <View style={reverseDirection()}>
            <View style={leftAlignView()}>
              <Text style={[withdrawalStyles.leftLabel, leftTextColor()]}>
                Total Amount:
              </Text>
            </View>
            <View />
            <View
              style={[
                rightAlignView(),
                {flexDirection: 'row', justifyContent: 'flex-end'},
              ]}>
              <Text style={[withdrawalStyles.rightLabel, leftTextColor()]}>
                {Number(amount) + Number(originalTopupFee)} {currency} ={' '}
                {(totalAmount * 1).toFixed(12)} {wallet}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default CardTopupForm;
