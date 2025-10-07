import React, {useState} from 'react';
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
import ConfirmForm from './ConfirmForm';
import {makeRequestNew} from '../../../../services/ApiService';

const ConfirmView = (props: any) => {
  const {
    navigation,
    route: {params},
  } = props;

  const [checkBoxValue, setCheckBoxValue] = useState(false);

  const {appTheme} = useSelector((state: any) => state.globalReducer);
  const {kybdata} = useSelector((state: any) => state.kybReducer);
  const [agree, setAgree] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [isValidate, setValidate] = useState(false);

  const appData = useSelector((state: any) => state.appReducer);

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

  const Submit = async data => {
    setValidate(true);
    if (agree && confirm) {
      delete kybdata.basicInfo.step;
      delete kybdata.licenseInfo.step;
      delete kybdata.contactDetail.step;

      const docsInfo = {
        cert_incorporation_photo: kybdata.docsInfo.companyCert.tmp,
        register_of_officers_photo: kybdata.docsInfo.registerOfOfficer.tmp,
        register_of_shareholders_photo:
          kybdata.docsInfo.registerOfShareholders.tmp,
        ubo_declaration_photo: kybdata.docsInfo.bankStatement.tmp,
        signed_minutes_photo: kybdata.docsInfo.meetingToOpen.tmp,
        memorandum_and_articles_photo: kybdata.docsInfo.memoAndArticle.tmp,
      };

      const confirmation = {
        confirm_understanding: agree,
        confirm_correct_data: confirm,
      };
      const payload = {
        ...kybdata.basicInfo,
        ...docsInfo,
        ...kybdata.licenseInfo,
        ...kybdata.contactDetail,
        ...confirmation,
      };

      dispatch(AppActions.updateLoading(Loader.KYB_VERIFICATION));

      const response = await makeRequestNew(
        MapperConstants.ApiTypes.POST,
        APIConstants.KYB_SUBMIT,
        {},
        payload,
      );

      // console.log('basicInfo', response.data);
      if (response.status === 200) {
        dispatch(KYBActions.KYBFormData(payload));
        dispatch(
          AppActions.updateLoading(MapperConstants.StatusMapper.disable),
        );
        showToast(
          '',
          'Business Identity Verification Submitted succesfully',
          'success',
        );
        navigation.replace(Screen.IdentityVerificationScreen);
      }
    }
  };

  return (
    <SafeAreaView
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      <Header title={'Confirmation'} />

      <TabStep curStep={4} />

      <KeyboardAwareScrollView
        contentContainerStyle={[accountStyles.scrollView, {paddingBottom: 10}]}>
        <DismissKeyboardView>
          <ConfirmForm
            control={control}
            errors={errors}
            setAgree={setAgree}
            agree={agree}
            setConfirm={setConfirm}
            confirm={confirm}
            isValidate={isValidate}
          />
        </DismissKeyboardView>
      </KeyboardAwareScrollView>

      <View style={commonStyles.paddingHorizontalView}>
        <ThemeButton
          text={'Submit'}
          onClickHandler={handleSubmit(Submit)}
          styleText={{textTransform: 'uppercase'}}
          loading={appData.loading === Loader.KYB_VERIFICATION ? true : false}
        />
      </View>
    </SafeAreaView>
  );
};

export default ConfirmView;
