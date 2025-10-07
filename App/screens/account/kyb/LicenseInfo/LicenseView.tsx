import React, {useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useForm} from 'react-hook-form';
import {commonStyles} from '../../../../globalstyles/styles';
import {Header, ThemeButton, DismissKeyboardView} from '../../../../components';
import {ThemeFunctions} from '../../../../utils';
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
import LicenseInfoForm from './LicenseInfoForm';
import {makeRequestNew} from '../../../../services/ApiService';

const LicenseView = (props: any) => {
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
    if (Object.keys(kybdata.licenseInfo).length > 0) {
      setCheckBoxValue(kybdata.licenseInfo.licensed);
      setValue(FormConstants.LicenseType, kybdata.licenseInfo.license_type);
      setValue(
        FormConstants.LicenseNumber,
        kybdata.licenseInfo.license_comments,
      );
      setValue(
        FormConstants.LicenseComments,
        kybdata.licenseInfo.license_number,
      );
    }
  }, [kybdata.licenseInfo]);

  const GoNext = async data => {
    const payload = {...data, ...{licensed: checkBoxValue}, ...{step: 2}};
    dispatch(AppActions.updateLoading(Loader.KYB_VERIFICATION));
    const response = await makeRequestNew(
      MapperConstants.ApiTypes.POST,
      `${APIConstants.VALIDATE_KYB}/2`,
      {},
      payload,
    );

    if (response.status === 200) {
      dispatch(KYBActions.KYBFormData(payload));
      dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
      navigation.push(Screen.ContactDetailView);
    }
  };

  return (
    <SafeAreaView
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      <Header title={'License Information'} />

      <TabStep curStep={2} />

      <KeyboardAwareScrollView
        contentContainerStyle={[accountStyles.scrollView, {paddingBottom: 10}]}>
        <DismissKeyboardView>
          <LicenseInfoForm
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
                // navigate(Screen.BusinessBasicInfoView, {});
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

export default LicenseView;
