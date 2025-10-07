import React, {useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useForm} from 'react-hook-form';
import {commonStyles} from '../../../../globalstyles/styles';
import {Header, ThemeButton, DismissKeyboardView} from '../../../../components';
import {navigate, ThemeFunctions} from '../../../../utils';
import {FormConstants, Loader, Screen} from '../../../../enums';
import {useDispatch, useSelector} from 'react-redux';
import {
  APIConstants,
  AppConstants,
  MapperConstants,
} from '../../../../constants';
import TabStep from '../TabStep';
import {accountStyles} from '../../styles';

import {AppActions, KYBActions} from '../../../../store';
import {showToast} from '../../../../utils/GenericUtils';
import ContactDetailForm from './ContactDetailForm';
import {makeRequestNew} from '../../../../services/ApiService';

const ContactDetailView = (props: any) => {
  const {
    navigation,
    route: {params},
  } = props;

  const [checkBoxValue, setCheckBoxValue] = useState(false);

  const {appTheme} = useSelector((state: any) => state.globalReducer);
  const {kybdata} = useSelector((state: any) => state.kybReducer);
  const appData = useSelector((state: any) => state.appReducer);

  //   console.log(kybdata);

  const dispatch = useDispatch();

  const {
    control,
    formState: {errors},
    setValue,
    getValues,
    trigger,
    handleSubmit,
  } = useForm();

  //   console.log(kybdata);
  useEffect(() => {
    if (Object.keys(kybdata.contactDetail).length > 0) {
      setValue(FormConstants.Phone1, kybdata.contactDetail.phone_1);
      setValue(FormConstants.Phone2, kybdata.contactDetail.phone_2);
      setValue(FormConstants.BusinessEmail, kybdata.contactDetail.email);
    }
  }, [kybdata.contactDetail]);

  const GoNext = async data => {
    const payload = {
      phone_1: data.mobile_no_1,
      phone_2: data.mobile_no_2,
      email: data.BusinessEmail,
      step: 3,
    };
    dispatch(AppActions.updateLoading(Loader.KYB_VERIFICATION));
    const response = await makeRequestNew(
      MapperConstants.ApiTypes.POST,
      `${APIConstants.VALIDATE_KYB}/3`,
      {},
      payload,
    );

    if (response.status === 200) {
      dispatch(KYBActions.KYBFormData(payload));
      dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
      navigation.push(Screen.ConfirmView);
    }
  };

  return (
    <SafeAreaView
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      <Header title={'Contact Details'} />

      <TabStep curStep={3} />

      <KeyboardAwareScrollView
        contentContainerStyle={[accountStyles.scrollView, {paddingBottom: 10}]}>
        <DismissKeyboardView>
          <ContactDetailForm
            control={control}
            errors={errors}
            setCheckBoxValue={setCheckBoxValue}
            checkBoxValue={checkBoxValue}
          />
        </DismissKeyboardView>
      </KeyboardAwareScrollView>

      <View style={commonStyles.paddingHorizontalView}>
        <View style={commonStyles.rowView}>
          <View style={[commonStyles.halfWidth, {paddingEnd: 8}]}>
            <ThemeButton
              text={'Prev'}
              onClickHandler={() => {
                navigate(Screen.LicenseInfoView, {});
              }}
              styleText={{textTransform: 'uppercase'}}
            />
          </View>
          <View style={commonStyles.halfWidth}>
            <ThemeButton
              text={'Next'}
              onClickHandler={handleSubmit(GoNext)}
              styleText={{textTransform: 'uppercase'}}
              loading={
                appData.loading === Loader.KYB_VERIFICATION ? true : false
              }
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ContactDetailView;
