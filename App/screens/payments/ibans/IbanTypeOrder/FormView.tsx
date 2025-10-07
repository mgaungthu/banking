import React, {useRef, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';

import {formStyles as styles} from '../../../account/styles';
import {Input, ThemeText} from '../../../../components';
import {FormConstants, ReturnKeyTypes} from '../../../../enums';
import {strings} from '../../../../strings';
import {useSelector, useDispatch} from 'react-redux';
import {commonStyles, rtlStyles} from '../../../../globalstyles/styles';
import {AppActions} from '../../../../store';
import {useTranslation} from 'react-i18next';
import {ThemeFunctions} from '../../../../utils';

import {t} from 'react-native-tailwindcss';
import {historyStyles} from '../../../quickbuy/styles';
import {withdrawalStyles} from '../../styles';

const FormView = (props: any) => {
  const {control, errors, handlePicker, data, setValue, totalSetupFee, wallet} =
    props;

  const stateRef = useRef(null);
  const {appTheme, isRtlApproach} = useSelector(
    (state: any) => state.globalReducer,
  );

  // const [amount, setAmount] = useState(0);
  // const [fee, setFee] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AppActions.getUserProfile());
  }, [dispatch]);

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

  // const handleAmount = val => {
  //   const decimal = Number(val).toFixed(8);
  //   setAmount(decimal);
  //   setValue(FormConstants.Amount, val);
  //   const totalFee = val * filterStake.commission;
  //   const stakeVal = val - (totalFee * 0.01).toFixed(8);
  //   setTotalStake(stakeVal);
  //   setFee(totalFee);
  // };

  return (
    <View style={styles.formView}>
      <TouchableOpacity onPress={handlePicker(1)}>
        <Input
          id={FormConstants.OrderAS}
          label={strings('Order As')}
          placeholder={`${strings('Order As')}`}
          control={control}
          errors={errors}
          isRequired={true}
          isFieldFilledBg={false}
          dropdown={true}
          showTick={false}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={handlePicker(2)}>
        <Input
          id={FormConstants.Wallet}
          label={strings('Pay With')}
          placeholder={`${strings('Pay With')}`}
          control={control}
          errors={errors}
          isRequired={true}
          isFieldFilledBg={false}
          dropdown={true}
          showTick={false}
        />
      </TouchableOpacity>

      <Input
        id={FormConstants.Voucher}
        label={strings('Voucher')}
        placeholder={`${strings(
          'Voucher',
        )} (optional and this will be applied only to setup fee):`}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        showTick={false}
      />

      <View>
        <View style={[reverseDirection(), {marginTop: 10}]}>
          <View style={leftAlignView()}>
            <Text
              style={[
                withdrawalStyles.leftLabel,
                leftTextColor(),
                {fontSize: 16},
              ]}>
              Setup Fee:
            </Text>
          </View>
          <View />
          <View
            style={[
              rightAlignView(),
              {flexDirection: 'row', justifyContent: 'flex-end'},
            ]}>
            <Text style={[withdrawalStyles.rightLabel, leftTextColor()]}>
              {Math.floor(data.setup_fee)} USD = {totalSetupFee.toFixed(12)}{' '}
              {wallet}
            </Text>
          </View>
        </View>
        <View>
          <ThemeText style={leftTextColor()}>{data.description}</ThemeText>
        </View>
      </View>
    </View>
  );
};

export default FormView;
