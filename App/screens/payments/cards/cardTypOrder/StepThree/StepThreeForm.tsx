import React, {useRef, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';

import {formStyles as styles} from '../../../../account/styles';
import {Input, ThemeText} from '../../../../../components';
import {FormConstants, ReturnKeyTypes} from '../../../../../enums';
import {strings} from '../../../../../strings';
import {useSelector, useDispatch} from 'react-redux';
import {commonStyles, rtlStyles} from '../../../../../globalstyles/styles';
import UploadWebView from './UploadWebView';
import {AppActions} from '../../../../../store';
import Colors from '../../../../../theme/Colors';
import {t} from 'react-native-tailwindcss';
import {historyStyles} from '../../../../quickbuy/styles';
import {withdrawalStyles} from '../../../styles';
import {ThemeFunctions} from '../../../../../utils';

const StepThreeForm = (props: any) => {
  const {
    control,
    errors,
    setValue,
    getValue,
    handleDocs,
    handlePicker,
    item,
    amount,
    setAmount,
    wallet,
    convertAmount,
    convertUSDAmount,
    deliFeeNormal,
    walletPayload,
  } = props;

  const {appTheme, isRtlApproach} = useSelector(
    (state: any) => state.globalReducer,
  );

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
    setValue(FormConstants.FirstDeposit, val);
  };

  return (
    <View style={styles.formView}>
      {item.card_type === 'Retail BIN-named cards' && (
        <>
          <Input
            id={FormConstants.BiometricImage}
            label={strings('Biometric Image')}
            placeholder={strings('Biometric Image')}
            control={control}
            errors={errors}
            isFieldFilledBg={false}
            isRequired={true}
            showDropDown={false}
            dropdown={true}
            errorMsg={'The Biometric Image Photo is required'}
            rightComponent={
              <UploadWebView
                title={FormConstants.BiometricImage}
                handleDocs={handleDocs}
                defaultValue={getValue(FormConstants.BiometricImage)}
              />
            }
            returnKeyType={ReturnKeyTypes.Next}
          />

          <View style={{marginTop: 10}}>
            <ThemeText style={{color: Colors.cyan, fontSize: 10}}>
              Please select a file to upload. (Max Size: 10.0 MB, {'\n'}
              Recommended width/height: 64x64)
            </ThemeText>
          </View>

          <Input
            id={FormConstants.PassportImage}
            label={strings('Passport Image')}
            placeholder={strings('Passport Image')}
            control={control}
            errors={errors}
            isFieldFilledBg={false}
            isRequired={true}
            showDropDown={false}
            dropdown={true}
            errorMsg={'Passport Image is required'}
            rightComponent={
              <UploadWebView
                title={FormConstants.PassportImage}
                handleDocs={handleDocs}
                defaultValue={getValue(FormConstants.PassportImage)}
              />
            }
            returnKeyType={ReturnKeyTypes.Next}
          />

          <View style={{marginTop: 10}}>
            <ThemeText style={{color: Colors.cyan, fontSize: 10}}>
              Please select a file to upload. (Max Size: 10.0 MB, {'\n'}
              Recommended width/height: 64x64)
            </ThemeText>
          </View>

          <Input
            id={FormConstants.SignatureImage}
            label={strings('Signature Image')}
            placeholder={strings('Signature Image')}
            control={control}
            errors={errors}
            isFieldFilledBg={false}
            isRequired={true}
            showDropDown={false}
            dropdown={true}
            errorMsg={'Signature Image is required'}
            rightComponent={
              <UploadWebView
                title={FormConstants.SignatureImage}
                handleDocs={handleDocs}
                defaultValue={getValue(FormConstants.SignatureImage)}
              />
            }
            returnKeyType={ReturnKeyTypes.Next}
          />

          <View style={{marginTop: 10}}>
            <ThemeText style={{color: Colors.cyan, fontSize: 10}}>
              Please select a file to upload. (Max Size: 10.0 MB, {'\n'}
              Recommended width/height: 64x64)
            </ThemeText>
          </View>

          <Input
            id={FormConstants.PictureSelfieImage}
            label={strings('Picture/ Selfie Image')}
            placeholder={strings('Picture/ Selfie Image')}
            control={control}
            errors={errors}
            isFieldFilledBg={false}
            isRequired={true}
            showDropDown={false}
            dropdown={true}
            errorMsg={'Picture/ Selfie Image'}
            rightComponent={
              <UploadWebView
                title={FormConstants.PictureSelfieImage}
                handleDocs={handleDocs}
                defaultValue={getValue(FormConstants.PictureSelfieImage)}
              />
            }
            returnKeyType={ReturnKeyTypes.Next}
          />

          <View style={{marginTop: 10, marginBottom: 0}}>
            <ThemeText style={{color: Colors.cyan, fontSize: 10}}>
              Please select a file to upload. (Max Size: 10.0 MB, {'\n'}
              Recommended width/height: 64x64)
            </ThemeText>
          </View>
        </>
      )}

      {['Corporate BIN-no name cards', 'Retail BIN-named cards'].includes(
        item?.card_type,
      ) && (
        <>
          <Input
            id={FormConstants.MailingAddress}
            label={strings('Mailing Address')}
            placeholder={strings('Mailing Address')}
            control={control}
            errors={errors}
            isRequired={true}
            isFieldFilledBg={false}
            dropdown={false}
            showDropDown={false}
            showTick={false}
          />

          <View style={commonStyles.rowView}>
            <View style={commonStyles.halfWidth}>
              <Input
                id={FormConstants.MailingCity}
                label={strings('Mailing City')}
                placeholder={strings('Mailing City')}
                control={control}
                errors={errors}
                isRequired={true}
                isFieldFilledBg={false}
                dropdown={false}
                showDropDown={false}
                showTick={false}
              />
            </View>
            <View
              style={[
                commonStyles.halfWidth,
                {marginStart: 10, paddingEnd: 10},
              ]}>
              <Input
                id={FormConstants.MailingState}
                label={strings('Mailing State')}
                placeholder={strings('Mailing State')}
                control={control}
                errors={errors}
                isFieldFilledBg={false}
                isRequired={true}
                dropdown={false}
                showDropDown={false}
                returnKeyType={ReturnKeyTypes.Next}
              />
            </View>
          </View>

          <Input
            id={FormConstants.MailingPostalCode}
            label={strings('Mailing Postal Code')}
            placeholder={strings('Mailing Postal Code')}
            control={control}
            errors={errors}
            isFieldFilledBg={false}
            isRequired={true}
            dropdown={false}
            showDropDown={false}
            returnKeyType={ReturnKeyTypes.Next}
          />
          <TouchableOpacity onPress={() => handlePicker(1)}>
            <Input
              id={FormConstants.MailingCountry}
              label={strings('Mailing Country')}
              placeholder={strings('Mailing Country')}
              control={control}
              errors={errors}
              isFieldFilledBg={false}
              isRequired={true}
              dropdown={true}
              showDropDown={true}
              returnKeyType={ReturnKeyTypes.Next}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handlePicker(2)}>
            <Input
              id={FormConstants.Delivery}
              label={strings('Delivery Provider')}
              placeholder={strings('Delivery Provider')}
              control={control}
              errors={errors}
              isFieldFilledBg={false}
              isRequired={false}
              dropdown={true}
              showDropDown={true}
              returnKeyType={ReturnKeyTypes.Next}
            />
          </TouchableOpacity>
        </>
      )}

      <Input
        id={FormConstants.FirstDeposit}
        label={strings(
          `First Deposit (${item.fiat_currency.symbol.toUpperCase()})`,
        )}
        placeholder={strings('First Deposit')}
        control={control}
        errors={errors}
        isRequired={true}
        isFieldFilledBg={false}
        dropdown={false}
        showDropDown={false}
        keyboardType="numeric"
        showTick={false}
        value={amount}
        onChangeVal={handleAmount}
      />

      <TouchableOpacity onPress={() => handlePicker(3)}>
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

      <TouchableOpacity onPress={() => handlePicker(4)}>
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
      {walletPayload?.swapCurrency && (
        <Text
          style={[
            withdrawalStyles.leftLabel,
            {marginTop: 10, color: Colors.pink},
          ]}>
          Currency of wallet you selected is different from the currency of
          card. The system will automatically use SWAP!
        </Text>
      )}

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

      {!wallet ? (
        <View style={{borderTopWidth: 1, marginTop: 20}}>
          <View style={[reverseDirection(), {marginTop: 10}]}>
            <View style={leftAlignView()}>
              <Text style={[withdrawalStyles.leftLabel, leftTextColor()]}>
                Issuance Fee:
              </Text>
            </View>
            <View />
            <View
              style={[
                rightAlignView(),
                {flexDirection: 'row', justifyContent: 'flex-end'},
              ]}>
              <Text style={[withdrawalStyles.rightLabel, leftTextColor()]}>
                {parseFloat(item.issuance_fee)} {item.fiat_currency.symbol}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={{borderTopWidth: 1, marginTop: 20}}>
          <View style={[reverseDirection(), {marginTop: 10}]}>
            <View style={leftAlignView()}>
              <Text style={[withdrawalStyles.leftLabel, leftTextColor()]}>
                Issuance Fee:
              </Text>
            </View>
            <View />
            <View
              style={[
                rightAlignView(),
                {flexDirection: 'row', justifyContent: 'flex-end'},
              ]}>
              <Text style={[withdrawalStyles.rightLabel, leftTextColor()]}>
                {parseFloat(item.issuance_fee)} {item.fiat_currency.symbol} ={' '}
                {(convertAmount(item?.issuance_fee) * 1).toFixed(8)} {wallet}
              </Text>
            </View>
          </View>

          {deliFeeNormal != '' && (
            <View style={[reverseDirection()]}>
              <View style={leftAlignView()}>
                <Text style={[withdrawalStyles.leftLabel, leftTextColor()]}>
                  Delivery Fee:
                </Text>
              </View>
              <View />
              <View
                style={[
                  rightAlignView(),
                  {flexDirection: 'row', justifyContent: 'flex-end'},
                ]}>
                <Text style={[withdrawalStyles.rightLabel, leftTextColor()]}>
                  {parseFloat(deliFeeNormal)} {'USD'} ={' '}
                  {convertUSDAmount(deliFeeNormal)} {wallet}
                </Text>
              </View>
            </View>
          )}

          <View style={reverseDirection()}>
            <View style={leftAlignView()}>
              <Text style={[withdrawalStyles.leftLabel, leftTextColor()]}>
                First Deposit:
              </Text>
            </View>
            <View />
            <View
              style={[
                rightAlignView(),
                {flexDirection: 'row', justifyContent: 'flex-end'},
              ]}>
              <Text style={[withdrawalStyles.rightLabel, leftTextColor()]}>
                {amount} {item.fiat_currency.symbol} ={' '}
                {(convertAmount(amount) * 1).toFixed(8)} {wallet}
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
                {(
                  Number(convertAmount(amount)) +
                  Number(convertAmount(item.issuance_fee)) +
                  Number(convertUSDAmount(deliFeeNormal))
                ).toFixed(8)}{' '}
                {wallet}
                {/* {(amount * 1).toFixed(8)} {selectedStake} */}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default StepThreeForm;
