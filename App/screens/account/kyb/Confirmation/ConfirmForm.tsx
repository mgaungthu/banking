import React, {useRef, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image} from 'react-native';

import {accountFeeStyles, formStyles as styles} from '../../styles';
import {Cell, Input, ThemeText} from '../../../../components';
import {FormConstants, ReturnKeyTypes} from '../../../../enums';
import {strings} from '../../../../strings';
import {useSelector, useDispatch} from 'react-redux';
import {commonStyles} from '../../../../globalstyles/styles';
import {AppActions} from '../../../../store';
import {CheckBox} from 'react-native-elements';
import {ThemeFunctions} from '../../../../utils';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {IC_BASIC_TICK} from '../../../../assets';
import {t} from 'react-native-tailwindcss';

const LicenseInfoForm = (props: any) => {
  const {control, errors, agree, setAgree, setConfirm, confirm, isValidate} =
    props;

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
      <View style={commonStyles.rowView}>
        <TouchableWithoutFeedback onPress={() => setAgree(!agree)}>
          <View
            style={[
              commonStyles.rowView,
              styles.minorAccountView,
              {alignItems: 'flex-start'},
            ]}>
            <View
              style={[
                styles.checkbox,
                {borderColor: ThemeFunctions.customText(appTheme), top: 2},
              ]}>
              {agree ? (
                <Image
                  source={IC_BASIC_TICK}
                  style={[
                    styles.tickIcon,
                    {tintColor: ThemeFunctions.getColor(appColor)},
                  ]}
                />
              ) : null}
            </View>
            <View>
              <Text
                style={[
                  styles.text,
                  commonStyles.marginHorizontalView,
                  {color: ThemeFunctions.customText(appTheme)},
                ]}>
                I confirm that I understand the KYC/KYB requirements asked in
                the form.
              </Text>
              {!agree && isValidate && (
                <Text style={[t.textRed700, t.textXs, t.p1]}>
                  The confirm understanding field is required.
                </Text>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View style={commonStyles.rowView}>
        <TouchableWithoutFeedback onPress={() => setConfirm(!confirm)}>
          <View
            style={[
              commonStyles.rowView,
              styles.minorAccountView,
              {alignItems: 'flex-start'},
            ]}>
            <View
              style={[
                styles.checkbox,
                {borderColor: ThemeFunctions.customText(appTheme), top: 2},
              ]}>
              {confirm ? (
                <Image
                  source={IC_BASIC_TICK}
                  style={[
                    styles.tickIcon,
                    {tintColor: ThemeFunctions.getColor(appColor)},
                  ]}
                />
              ) : null}
            </View>
            <View>
              <Text
                style={[
                  styles.text,
                  commonStyles.marginHorizontalView,
                  {color: ThemeFunctions.customText(appTheme)},
                ]}>
                I confirm that the data collected in my KYC/KYB are all correct
              </Text>
              {!confirm && isValidate && (
                <Text style={[t.textRed700, t.textXs, t.p1]}>
                  The confirm correct data field is required.
                </Text>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default LicenseInfoForm;
