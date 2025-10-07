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
import {ThemeFunctions} from '../../../../utils';

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
      <View style={{marginTop: 20}}>
        <Cell
          style={{flexWrap: 'wrap'}}
          onPress={() => setCheckBoxValue(!checkBoxValue)}>
          <CheckBox
            center
            checked={checkBoxValue}
            containerStyle={accountFeeStyles.checkbox}
            checkedColor={ThemeFunctions.getColor(appColor)}
            onPress={() => setCheckBoxValue(!checkBoxValue)}
          />
          <ThemeText>{strings('Licensed')}</ThemeText>
        </Cell>
      </View>

      <Input
        id={FormConstants.LicenseType}
        label={strings('License Type')}
        placeholder={strings('License Type')}
        control={control}
        errors={errors}
        errorMsg={'License Type is required'}
        isRequired={checkBoxValue}
        isFieldFilledBg={false}
      />

      <Input
        id={FormConstants.LicenseNumber}
        label={strings('License Number')}
        placeholder={strings('License Number')}
        control={control}
        errors={errors}
        errorMsg={'License Number is required'}
        isRequired={checkBoxValue}
        isFieldFilledBg={false}
      />

      <Input
        id={FormConstants.LicenseComments}
        multiline
        label={strings('License Comments')}
        placeholder={strings('License Comments')}
        errorMsg={'License Comments is required'}
        control={control}
        errors={errors}
        isRequired={checkBoxValue}
        isFieldFilledBg={false}
      />
    </View>
  );
};

export default LicenseInfoForm;
