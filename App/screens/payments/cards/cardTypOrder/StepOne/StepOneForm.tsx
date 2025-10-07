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

const StepOneForm = (props: any) => {
  const {control, errors, handlePicker} = props;

  const stateRef = useRef(null);

  // const countries = appData?.countries?.map(el => el.name).sort()
  // const countryCodes = appData?.countries
  //   ?.map(el => `+${el.phoneCode} (${el.name})`)
  //   .sort()

  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(AppActions.getUserProfile());
  }, [dispatch]);

  return (
    <View style={styles.formView}>
      <Input
        id={FormConstants.CardType}
        label={strings('Card Type')}
        // placeholder={`${strings('select')} ${strings('shareholder')}`}
        control={control}
        errors={errors}
        isRequired={true}
        isFieldFilledBg={false}
        dropdown={true}
        showDropDown={false}
        showTick={false}
      />

      <TouchableOpacity onPress={() => handlePicker(1)}>
        <Input
          id={FormConstants.Title}
          label={strings('Title')}
          placeholder={`${strings('select')} ${strings('mr/mrs')}`}
          control={control}
          errors={errors}
          isRequired={true}
          isFieldFilledBg={false}
          dropdown={true}
          showDropDown={true}
          showTick={false}
        />
      </TouchableOpacity>

      <View style={commonStyles.rowView}>
        <View style={commonStyles.halfWidth}>
          <Input
            id={FormConstants.FirstName}
            label={strings('first_name')}
            placeholder={strings('first_name')}
            control={control}
            errors={errors}
            isFieldFilledBg={false}
            isRequired={true}
            dropdown={true}
            showDropDown={false}
            returnKeyType={ReturnKeyTypes.Next}
          />
        </View>
        <View
          style={[commonStyles.halfWidth, {marginStart: 10, paddingEnd: 10}]}>
          <Input
            id={FormConstants.LastName}
            label={strings('last_name')}
            placeholder={strings('last_name')}
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
        id={FormConstants.Email}
        label={strings('email')}
        placeholder={strings('email')}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={true}
        reference={stateRef}
        dropdown={true}
        showDropDown={false}
        returnKeyType={ReturnKeyTypes.Next}
      />

      {/* <TouchableOpacity onPress={() => handlePicker(2)}>
        <Input
          id={FormConstants.Gender}
          label={strings('gender')}
          placeholder={strings('gender')}
          control={control}
          errors={errors}
          isFieldFilledBg={false}
          isRequired={true}
          dropdown={true}
          showDropDown={true}
          showTick={false}
        />
      </TouchableOpacity> */}

      <PhoneNumberInput
        control={control}
        errors={errors}
        handlePicker={handlePicker}
      />
      {/* <TouchableOpacity onPress={() => handlePicker(3)}>
        <Input
          id={FormConstants.DOB}
          label={strings('dob')}
          placeholder={strings('dob')}
          control={control}
          errors={errors}
          isFieldFilledBg={false}
          isRequired={true}
          dropdown={true}
          showDropDown={false}
          showTick={false}
        />
      </TouchableOpacity> */}
    </View>
  );
};

export default StepOneForm;
