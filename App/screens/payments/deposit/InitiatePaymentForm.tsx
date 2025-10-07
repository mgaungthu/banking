import React, {useEffect, useRef} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {formStyles as styles} from '../../account/styles';
import {Input, DropDown, ThemeText} from '../../../components';
import {FormConstants, ReturnKeyTypes} from '../../../enums';
import {strings} from '../../../strings';
import {useSelector} from 'react-redux';
import {ThemeFunctions} from '../../../utils';
import Colors from '../../../theme/Colors';
import {commonStyles, rtlStyles} from '../../../globalstyles/styles';
import {formStyles} from '../../../components/forms/styles';
import {withdrawalStyles} from '../styles';
import {historyStyles} from '../../quickbuy/styles';
import Clipboard from '@react-native-clipboard/clipboard';
import {showToast} from '../../../utils/GenericUtils';
import IconVector from '../../../components/ui/IconVector';

const InitiatePaymentForm = (props: any) => {
  const {appTheme, isRtlApproach} = useSelector(
    (state: any) => state.globalReducer,
  );
  const appData = useSelector((state: any) => state.appReducer);

  const {
    control,
    errors,
    handlePicker,
    setValue,
    selectedBankDetails,
    depositCode,
  } = props;
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  // const getCountry = () => {
  //   if (selectedBankDetails && Object.keys(selectedBankDetails).length > 0) {
  //     const countryData = appData?.countries?.find(
  //       res =>
  //         res?.shortName?.toLowerCase() ===
  //         selectedBankDetails?.countryId?.trim()?.toLowerCase(),
  //     );
  //     return countryData.name;
  //   } else {
  //     return 'N/A';
  //   }
  // };

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
  const renderFee = fee => {
    const feeValDeposit =
      fee.feeType === 'absolute'
        ? `${fee.depositFee} ${fee.currency}`
        : `${fee.depositFee} %`;

    const feeValWithdraw =
      fee.feeType === 'absolute'
        ? `${fee.withdrawalFee} ${fee.currency}`
        : `${fee.withdrawalFee} %`;
    return (
      <>
        <View
          style={[
            commonStyles.rowItem,
            commonStyles.justifySpace,
            {paddingTop: 2},
          ]}
          key={Math.random()}>
          <View>
            <Text adjustsFontSizeToFit={true} style={labelValueClass()}>
              {fee.currency}
            </Text>
          </View>
          <View>
            <Text adjustsFontSizeToFit={true} style={labelValueClass()}>
              {feeValDeposit}
            </Text>
          </View>
          <View>
            <Text adjustsFontSizeToFit={true} style={labelClass()}>
              {feeValWithdraw}
            </Text>
          </View>
        </View>
      </>
    );
  };

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
  const bankView = (label, value) => {
    return (
      <View style={reverseDirection()} key={Math.random()}>
        <View style={leftAlignView()}>
          <Text style={[withdrawalStyles.leftLabel, leftTextColor()]}>
            {label}:
          </Text>
        </View>
        <View />
        <View
          style={[
            rightAlignView(),
            {flexDirection: 'row', justifyContent: 'flex-end'},
          ]}>
          <TouchableOpacity
            style={{marginRight: 5}}
            onPress={() => copyContent(value)}>
            <IconVector.FontAwesome5
              name="copy"
              {...ThemeFunctions.getTextColor(appTheme)}
              size={15}
            />
          </TouchableOpacity>
          <Text style={[withdrawalStyles.rightLabel, leftTextColor()]}>
            {value}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.formView}>
      {/* <TouchableOpacity style={{paddingTop: 0}} onPress={handlePicker(2)}>
        <Input
          id={FormConstants.Country}
          label={strings('from_country')}
          placeholder={strings('select')}
          control={control}
          errors={errors}
          isRequired={true}
          isFieldFilledBg={false}
          dropdown={true}
          showTick={false}
        />
      </TouchableOpacity> */}

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

      <TouchableOpacity style={{paddingTop: 0}} onPress={handlePicker(3)}>
        <Input
          id={FormConstants.Type}
          label={strings('type')}
          placeholder={strings('select')}
          control={control}
          errors={errors}
          isRequired={true}
          isFieldFilledBg={false}
          dropdown={true}
          showTick={false}
        />
      </TouchableOpacity>

      <TouchableOpacity style={{paddingTop: 0}} onPress={handlePicker(4)}>
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
        textTransform="none"
      />
      {selectedBankDetails && Object.keys(selectedBankDetails).length > 0 && (
        <>
          <View style={[styles.input, {borderBottomWidth: 0}]}>
            {/* <Text
              style={[formStyles.heading, formStyles.container, alignEnd()]}>
              {strings('available_currencies')}
            </Text> */}

            <View
              style={[
                commonStyles.rowItem,
                commonStyles.justifySpace,
                commonStyles.marginVerticalView,
              ]}>
              {/* <View>
                <Text adjustsFontSizeToFit={true} style={labelClass()}>
                  {strings('currency_label')}
                </Text>
              </View>
              <View>
                <Text adjustsFontSizeToFit={true} style={labelClass()}>
                  {strings('deposit')}
                </Text>
              </View>
              <View>
                <Text adjustsFontSizeToFit={true} style={labelClass()}>
                  {strings('withdrawal')}
                </Text>
              </View> */}
            </View>
            {selectedBankDetails?.feeInfo?.map(res => {
              return renderFee(res);
            })}
          </View>
          <View
            style={{
              ...ThemeFunctions.customInputBordeColor(appTheme),
              borderTopWidth: 1,
              paddingTop: 5,
            }}>
            {/* {bankView(
              strings('beneficiaryName'),
              selectedBankDetails?.companyName || 'N/A',
            )} */}
            {bankView(strings('bank_name'), selectedBankDetails?.name || 'N/A')}
            {bankView(
              strings('Band Address'),
              selectedBankDetails?.address || 'N/A',
            )}
            {bankView(
              strings('iban_acc_no'),
              selectedBankDetails?.iban || 'N/A',
            )}
            {bankView(
              strings('swift_bic_code'),
              selectedBankDetails?.swift_code || 'N/A',
            )}

            {bankView(strings('Description Code*'), depositCode || 'N/A')}

            <ThemeText style={{fontSize: 14}}>
              *Provide this code as the reference when transferring money over
              to the bank, any deposits sent without a reference code will be
              lost. Also ensure you enter the amount you are sending and press
              the deposit button. If you don't do this your funds will be lost
              also.
            </ThemeText>

            {/* {bankView(strings('bank_country'), getCountry())} */}
          </View>
        </>
      )}
    </View>
  );
};

export default InitiatePaymentForm;
