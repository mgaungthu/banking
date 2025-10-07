import React, {useRef, useEffect} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';

import {formStyles as styles} from '../../../../account/styles';
import {Input, ThemeText} from '../../../../../components';
import {FormConstants, ReturnKeyTypes} from '../../../../../enums';
import {strings} from '../../../../../strings';
import {useSelector, useDispatch} from 'react-redux';
import {commonStyles} from '../../../../../globalstyles/styles';
import {AppActions} from '../../../../../store';
import PhoneNumberInput from './PhoneNumberInput';

const StepTwoForm = (props: any) => {
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
      <Input
        id={FormConstants.StreetAddress}
        label={strings('street_address')}
        placeholder={`${strings('street_address')}`}
        control={control}
        errors={errors}
        isRequired={true}
        isFieldFilledBg={false}
        dropdown={true}
        showDropDown={false}
        showTick={false}
      />

      <View style={commonStyles.rowView}>
        <View style={commonStyles.halfWidth}>
          <Input
            id={FormConstants.City}
            label={strings('city')}
            placeholder={strings('city')}
            control={control}
            errors={errors}
            isRequired={true}
            isFieldFilledBg={false}
            dropdown={true}
            showDropDown={false}
            showTick={false}
          />
        </View>
        <View
          style={[commonStyles.halfWidth, {marginStart: 10, paddingEnd: 10}]}>
          <Input
            id={FormConstants.State}
            label={strings('state')}
            placeholder={strings('state')}
            control={control}
            errors={errors}
            isFieldFilledBg={false}
            isRequired={false}
            dropdown={true}
            showDropDown={false}
            returnKeyType={ReturnKeyTypes.Next}
          />
        </View>
      </View>

      <Input
        id={FormConstants.PostalCode}
        label={strings('postal_code')}
        placeholder={strings('postal_code')}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={true}
        reference={stateRef}
        dropdown={true}
        showDropDown={false}
        returnKeyType={ReturnKeyTypes.Next}
      />

      <View style={commonStyles.rowView}>
        <View style={commonStyles.halfWidth}>
          <Input
            id={FormConstants.Country}
            label={strings('country')}
            placeholder={strings('country')}
            control={control}
            errors={errors}
            isRequired={true}
            isFieldFilledBg={false}
            dropdown={true}
            showDropDown={false}
            showTick={false}
          />
        </View>
        <View
          style={[commonStyles.halfWidth, {marginStart: 10, paddingEnd: 10}]}>
          <Input
            id={FormConstants.Nationality}
            label={strings('Nationality')}
            placeholder={strings('Nationality')}
            control={control}
            errors={errors}
            isFieldFilledBg={false}
            isRequired={false}
            dropdown={true}
            showDropDown={false}
            returnKeyType={ReturnKeyTypes.Next}
          />
        </View>
      </View>

      <TouchableOpacity onPress={() => handlePicker(1)}>
        <Input
          id={FormConstants.MaritalStatus}
          label={strings('Marital Status')}
          placeholder={`${strings('select')} ${strings('Marital Status')}`}
          control={control}
          errors={errors}
          isRequired={true}
          isFieldFilledBg={false}
          dropdown={true}
          showDropDown={true}
          showTick={false}
        />
      </TouchableOpacity>

      <Input
        id={FormConstants.EmergencyContactName}
        label={strings('Emergency Contact Name')}
        placeholder={strings('Emergency Contact Name')}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={true}
        returnKeyType={ReturnKeyTypes.Next}
      />

      <PhoneNumberInput
        control={control}
        errors={errors}
        handlePicker={handlePicker}
      />
    </View>
  );
};

export default StepTwoForm;
