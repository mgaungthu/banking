import React, {useRef, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';

import {accountFeeStyles, formStyles as styles} from '../../styles';
import {Cell, Input, ThemeText} from '../../../../components';
import {FormConstants, ReturnKeyTypes} from '../../../../enums';
import {strings} from '../../../../strings';
import {useSelector, useDispatch} from 'react-redux';
import {commonStyles} from '../../../../globalstyles/styles';
import {AppActions} from '../../../../store';
import {CheckBox} from 'react-native-elements';
import {RegexExpression, ThemeFunctions} from '../../../../utils';

const LicenseInfoForm = (props: any) => {
  const {control, errors, setCheckBoxValue, checkBoxValue} = props;

  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer);

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
        id={FormConstants.Phone1}
        label={strings('mobile_no_1')}
        placeholder={strings('mobile_no_1')}
        control={control}
        errors={errors}
        isRequired={true}
        isFieldFilledBg={false}
      />

      <Input
        id={FormConstants.Phone2}
        label={`${strings('mobile_no_2')} (Optional)`}
        placeholder={strings('mobile_no_2')}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
      />

      <Input
        id={FormConstants.BusinessEmail}
        label={`${strings('Business Email Address')}`}
        placeholder={strings('email')}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={true}
        pattern={RegexExpression.EMAIL_REGEX}
        // errorMsg={err}
      />
    </View>
  );
};

export default LicenseInfoForm;
