import React, {useRef} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {formStyles as styles} from '../../account/styles';
import {Input} from '../../../components';
import {FormConstants, ReturnKeyTypes} from '../../../enums';
import {strings} from '../../../strings';
import {useSelector} from 'react-redux';
import {ThemeFunctions, RegexExpression, AppFunctions} from '../../../utils';
import {MapperConstants} from '../../../constants';
import {withdrawAddressStyles} from '../../funding/styles';
import {withdrawalStyles} from '../styles';
import {rtlStyles} from '../../../globalstyles/styles';
import {historyStyles} from '../../quickbuy/styles';

const AddPaymentForm = (props: any) => {
  const {appTheme, appColor, isRtlApproach} = useSelector(
    (state: any) => state.globalReducer,
  );

  const {
    control,
    errors,
    setIsVisible,
    setValue,
    feeAmount,
    userProfileData,
    setAmount,
    amount,
    total,
    setMaxAmount,
    currency,
    decimals,
  } = props;
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const amountRef = useRef(null);

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

  return (
    <View style={styles.formView}>
      <TouchableOpacity
        style={{paddingTop: 0}}
        onPress={() => setIsVisible(MapperConstants.StatusMapper.enable)}>
        <Input
          id={FormConstants.Currency}
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
      <Input
        id={FormConstants.Balance}
        label={strings('balance')}
        placeholder="0"
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        showDropDown={false}
        dropdown={true}
      />
      <Input
        id={FormConstants.Email}
        label={strings('recipient_email')}
        placeholder=""
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={true}
        pattern={RegexExpression.EMAIL_REGEX}
        keyboardType="email-address"
        reference={emailRef}
        focusTo={amountRef}
        returnKeyType={ReturnKeyTypes.Next}
      />
      <Input
        reference={amountRef}
        key={'form_1_amount'}
        id={FormConstants.Amount}
        placeholder=""
        control={control}
        errors={errors}
        onChangeVal={val => setAmount(val)}
        isFieldFilledBg={true}
        isRequired={true}
        showTick={false}
        keyboardType="decimal-pad"
        returnKeyType={ReturnKeyTypes.Go}
        isModal={MapperConstants.StatusMapper.enable}
        label={strings('amount')}
        showMargin={false}
        rightComponent={
          <TouchableOpacity
            style={withdrawAddressStyles.maxButton}
            onPress={setMaxAmount}>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              style={{color: ThemeFunctions.getColor(appColor)}}>
              MAX
            </Text>
          </TouchableOpacity>
        }
      />
      {amount && (
        <View style={{borderTopWidth: 1, marginTop: 20}}>
          <View style={[reverseDirection(), {marginTop: 10}]}>
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
                {AppFunctions.smartRound(amount * 1, decimals)} {currency}
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
                {AppFunctions.smartRound(feeAmount * 1, decimals)} {currency}
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
                {AppFunctions.smartRound(
                  parseFloat(amount) + parseFloat(feeAmount),
                  decimals,
                )}{' '}
                {currency}
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* <Input
        id={FormConstants.FinalAmount}
        label={strings('total_amount')}
        placeholder={strings('total_amount')}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        showDropDown={false}
        dropdown={true}
      /> */}
      {userProfileData?.two_fa_enabled === 1 && (
        <Input
          id={FormConstants.TFA}
          label={`${strings('Two Factor Authentication Code')}`}
          placeholder={strings('Two Factor Authentication Code')}
          control={control}
          errors={errors}
          isFieldFilledBg={false}
          // errorMsg={err}
          isRequired={true}
        />
      )}
    </View>
  );
};

export default AddPaymentForm;
