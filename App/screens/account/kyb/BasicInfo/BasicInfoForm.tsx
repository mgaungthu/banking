import React, {useRef, useEffect} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';

import {formStyles as styles} from '../../styles';
import {Input, ThemeText} from '../../../../components';
import {FormConstants, ReturnKeyTypes} from '../../../../enums';
import {strings} from '../../../../strings';
import {useSelector, useDispatch} from 'react-redux';
import {commonStyles} from '../../../../globalstyles/styles';
import {AppActions} from '../../../../store';

const BasicInfoForm = (props: any) => {
  const {control, errors, handlePicker, kybdata} = props;

  const businessNameRef = useRef(null);
  const RegisterationNoRef = useRef(null);
  const stateRef = useRef(null);

  // const countries = appData?.countries?.map(el => el.name).sort()
  // const countryCodes = appData?.countries
  //   ?.map(el => `+${el.phoneCode} (${el.name})`)
  //   .sort()

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AppActions.getUserProfile());
  }, [dispatch]);

  return (
    <View style={styles.formView}>
      <TouchableOpacity onPress={() => handlePicker(1)}>
        <Input
          id={FormConstants.RoleOfOwner}
          label={strings('The role of account owner')}
          placeholder={`${strings('select')} ${strings('shareholder')}`}
          control={control}
          errors={errors}
          isRequired={true}
          isFieldFilledBg={false}
          dropdown={true}
          showTick={false}
        />
      </TouchableOpacity>

      <Input
        id={FormConstants.BusinessName}
        label={strings('Business Name')}
        placeholder={strings('Business Name')}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={true}
        reference={businessNameRef}
        focusTo={RegisterationNoRef}
        returnKeyType={ReturnKeyTypes.Next}
      />

      <View style={commonStyles.rowView}>
        <View style={commonStyles.halfWidth}>
          <Input
            id={FormConstants.RegisterationNo}
            label={strings('Registration Number')}
            placeholder={strings('Registration Number')}
            control={control}
            errors={errors}
            isFieldFilledBg={false}
            isRequired={true}
            reference={RegisterationNoRef}
            returnKeyType={ReturnKeyTypes.Next}
          />
        </View>
        <View
          style={[commonStyles.halfWidth, {marginStart: 10, paddingEnd: 10}]}>
          <TouchableOpacity onPress={() => handlePicker(2)}>
            <Input
              id={FormConstants.Country}
              label={strings('Country of Registration')}
              placeholder={`${strings('select')} ${strings('country')}`}
              control={control}
              errors={errors}
              isRequired={true}
              isFieldFilledBg={false}
              dropdown={true}
              showTick={false}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => handlePicker(3)}>
        <Input
          id={FormConstants.RegisterationDate}
          label={strings('Date of Registration')}
          placeholder={strings('Date of Registration')}
          control={control}
          errors={errors}
          isFieldFilledBg={false}
          isRequired={true}
          dropdown={true}
          showDropDown={false}
          showTick={false}
        />
      </TouchableOpacity>

      <Input
        id={FormConstants.BusinessType}
        label={strings('Type of Business (i.e. Solo Trader, Corporation)')}
        placeholder={strings('Type of Business')}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={true}
        reference={stateRef}
        returnKeyType={ReturnKeyTypes.Next}
      />

      <View style={commonStyles.rowView}>
        <View style={commonStyles.halfWidth}>
          <TouchableOpacity onPress={() => handlePicker(4)}>
            <Input
              id={FormConstants.CountryUBO}
              label={strings('Country of UBO')}
              placeholder={`${strings('select')} ${strings('Country')}`}
              control={control}
              errors={errors}
              isRequired={true}
              isFieldFilledBg={false}
              dropdown={true}
              showTick={false}
            />
          </TouchableOpacity>
        </View>
        <View
          style={[commonStyles.halfWidth, {marginStart: 10, paddingEnd: 10}]}>
          <TouchableOpacity onPress={() => handlePicker(5)}>
            <Input
              id={FormConstants.Industry}
              label={strings('Industry')}
              placeholder={`${strings('select')} ${strings('industries')}`}
              control={control}
              errors={errors}
              isRequired={true}
              isFieldFilledBg={false}
              dropdown={true}
              showTick={false}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BasicInfoForm;
