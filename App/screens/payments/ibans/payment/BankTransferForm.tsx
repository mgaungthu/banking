import React, {useEffect, useRef, useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {formStyles as styles} from '../../../account/styles';
import {Input, DropDown, ThemeText} from '../../../../components';
import {FormConstants, ReturnKeyTypes} from '../../../../enums';
import {strings} from '../../../../strings';
import {useSelector} from 'react-redux';
import {ThemeFunctions} from '../../../../utils';

import {commonStyles, rtlStyles} from '../../../../globalstyles/styles';
import {formStyles} from '../../../../components/forms/styles';
import {withdrawalStyles} from '../../styles';
import {historyStyles} from '../../../quickbuy/styles';
import Clipboard from '@react-native-clipboard/clipboard';
import {showToast} from '../../../../utils/GenericUtils';
// import IconVector from '../../../../components/ui/IconVector';

const BankTransferForm = (props: any) => {
  const {appTheme, isRtlApproach} = useSelector(
    (state: any) => state.globalReducer,
  );
  const appData = useSelector((state: any) => state.appReducer);

  const {control, errors, handlePicker, currency, selectedChannelFullValue} =
    props;
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const [amount, setAmount] = useState(0);

  const copyContent = (content: string) => {
    Clipboard.setString(content);
    showToast(strings('deposit'), strings('Copied to clipboard'), 'success');
  };

  const reverseDirection = () => {
    return [
      historyStyles.rowItem,
      {
        borderBottomWidth: 0,
        paddingTop: 10,
        paddingBottom: 10,
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
  };

  const getFee = () => {
    if (selectedChannelFullValue) {
      const minFee = selectedChannelFullValue.minFee;
      const maxFee = selectedChannelFullValue.maxFee;
      const percentFee = (amount * selectedChannelFullValue.percentage) / 100;

      if (percentFee < minFee) return minFee;
      else if (percentFee > maxFee) return maxFee;
      else return percentFee;
    }
  };
  return (
    <View style={styles.formView}>
      <TouchableOpacity style={{paddingTop: 0}} onPress={handlePicker(1)}>
        <Input
          id={FormConstants.From}
          label={strings('From')}
          placeholder={strings('Select From')}
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

      <TouchableOpacity style={{paddingTop: 0}} onPress={handlePicker(3)}>
        <Input
          id={FormConstants.Channel}
          label={strings('Channel')}
          placeholder={strings('select')}
          control={control}
          errors={errors}
          isRequired={true}
          isFieldFilledBg={false}
          dropdown={true}
          showTick={false}
        />
      </TouchableOpacity>
      <Input
        id={FormConstants.Reference}
        label={strings('reference')}
        placeholder=""
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        showDropDown={false}
        dropdown={false}
        isRequired={true}
        textTransform="none"
      />
      <Input
        id={FormConstants.Amount}
        label={strings('amount')}
        placeholder=""
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        showDropDown={false}
        dropdown={false}
        isRequired={true}
        onChangeVal={handleAmount}
        textTransform="none"
      />

      <View style={reverseDirection()}>
        <View style={leftAlignView()}>
          {/* <Text style={[withdrawalStyles.leftLabel, leftTextColor()]}>
            Send Amount:
          </Text> */}
        </View>
        <View />
        <View
          style={[
            rightAlignView(),
            {flexDirection: 'row', justifyContent: 'flex-end'},
          ]}>
          <Text style={[withdrawalStyles.rightLabel, leftTextColor()]}>
            Min: 1.00000000 {currency}
          </Text>
        </View>
      </View>

      {amount > 0 && currency != '' && selectedChannelFullValue?.length > 0 && (
        <>
          <View style={{borderBottomWidth: 1, marginTop: 20}} />
          <View style={reverseDirection()}>
            <View style={leftAlignView()}>
              <Text style={[withdrawalStyles.leftLabel, leftTextColor()]}>
                Send Amount:
              </Text>
            </View>
            <View />
            <View
              style={[
                rightAlignView(),
                {flexDirection: 'row', justifyContent: 'flex-end'},
              ]}>
              <Text style={[withdrawalStyles.rightLabel, leftTextColor()]}>
                {(amount * 1).toFixed(8)} {currency}
              </Text>
            </View>
          </View>

          <View style={reverseDirection()}>
            <View style={leftAlignView()}>
              <Text style={[withdrawalStyles.leftLabel, leftTextColor()]}>
                Fee:
              </Text>
            </View>
            <View />
            <View
              style={[
                rightAlignView(),
                {flexDirection: 'row', justifyContent: 'flex-end'},
              ]}>
              <Text style={[withdrawalStyles.rightLabel, leftTextColor()]}>
                {(getFee() * 1).toFixed(8)} {currency}
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
                {(Number(getFee()) + Number(amount)).toFixed(8)} {currency}
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default BankTransferForm;
