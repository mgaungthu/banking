import React, {useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useForm} from 'react-hook-form';
import {commonStyles} from '../../../../globalstyles/styles';
import {
  DatePickerView,
  Header,
  ThemeButton,
  DismissKeyboardView,
  ThemeText,
} from '../../../../components';
import {useDispatch, useSelector} from 'react-redux';
import {AppActions, KYBActions} from '../../../../store';
import {APIConstants, MapperConstants} from '../../../../constants';
import TabStep from '../TabStep';
import {accountStyles} from '../../styles';
import {navigate, ThemeFunctions} from '../../../../utils';
import DocsForm from './DocsForm';
import {FormConstants, Loader, Screen} from '../../../../enums';
import {makeRequestNew} from '../../../../services/ApiService';

const BusinessCompanyDocuments = (props: any) => {
  const {
    navigation,
    route: {params},
  } = props;
  const [isTermination, setIsTermination] = useState(
    MapperConstants.StatusMapper.disable,
  );
  const {appTheme} = useSelector((state: any) => state.globalReducer);
  const {kybdata} = useSelector((state: any) => state.kybReducer);
  const appData = useSelector((state: any) => state.appReducer);

  const dispatch = useDispatch();

  const [docsData, setDocsData] = useState({
    companyCert: {tmp: '', name: ''},
    memoAndArticle: {tmp: '', name: ''},
    registerOfShareholders: {tmp: '', name: ''},
    registerOfOfficer: {tmp: '', name: ''},
    bankStatement: {tmp: '', name: ''},
    meetingToOpen: {tmp: '', name: ''},
  });

  const {
    control,
    formState: {errors},
    setValue,
    getValues,
    trigger,
    handleSubmit,
  } = useForm();

  useEffect(() => {
    if (Object.keys(kybdata.docsInfo).length > 0) {
      setValue(FormConstants.companyCert, kybdata.docsInfo.companyCert.name);
      setValue(
        FormConstants.memoAndArticle,
        kybdata.docsInfo.memoAndArticle.name,
      );
      setValue(
        FormConstants.registerOfShareholders,
        kybdata.docsInfo.registerOfShareholders.name,
      );
      setValue(
        FormConstants.registerOfOfficer,
        kybdata.docsInfo.registerOfOfficer.name,
      );
      setValue(
        FormConstants.bankStatement,
        kybdata.docsInfo.bankStatement.name,
      );
      setValue(
        FormConstants.meetingToOpen,
        kybdata.docsInfo.meetingToOpen.name,
      );
      setDocsData(kybdata.docsInfo);
    }
  }, [kybdata.docsInfo]);

  const GoNext = async data => {
    const payload = {
      companyCert: docsData.companyCert,
      registerOfOfficer: docsData.registerOfOfficer,
      registerOfShareholders: docsData.registerOfShareholders,
      bankStatement: docsData.bankStatement,
      meetingToOpen: docsData.meetingToOpen,
      memoAndArticle: docsData.memoAndArticle,
      step: 1,
    };

    const validatePayload = {
      cert_incorporation_photo: docsData.companyCert.tmp,
      register_of_officers_photo: docsData.registerOfOfficer.tmp,
      register_of_shareholders_photo: docsData.registerOfShareholders.tmp,
      ubo_declaration_photo: docsData.bankStatement.tmp,
      signed_minutes_photo: docsData.meetingToOpen.tmp,
      memorandum_and_articles_photo: docsData.memoAndArticle.tmp,
    };

    dispatch(AppActions.updateLoading(Loader.KYB_VERIFICATION));

    const response = await makeRequestNew(
      MapperConstants.ApiTypes.POST,
      `${APIConstants.VALIDATE_KYB}/1`,
      {},
      validatePayload,
    );

    if (response.status === 200) {
      dispatch(KYBActions.KYBFormData(payload));
      dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
      navigation.push(Screen.LicenseInfoView);
    }
  };

  const handleDocs = (title, data) => {
    // console.log(title, data.file);
    setValue(title, data.file);
    trigger(title);

    const updateData = {[title]: {tmp: data.tmp, name: data.file}};
    setDocsData(prevData => ({
      ...prevData,
      ...updateData,
    }));
  };
  return (
    <SafeAreaView
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      <Header title={'Company Documents'} />

      <TabStep curStep={1} />

      <KeyboardAwareScrollView
        contentContainerStyle={[accountStyles.scrollView, {paddingBottom: 10}]}>
        <DismissKeyboardView>
          <DocsForm
            handleDocs={handleDocs}
            getValues={getValues}
            errors={errors}
            control={control}
            kybdata={kybdata.docsInfo}
          />
        </DismissKeyboardView>
      </KeyboardAwareScrollView>

      <View style={commonStyles.paddingHorizontalView}>
        <View style={commonStyles.rowView}>
          <View style={[commonStyles.halfWidth, {paddingEnd: 8}]}>
            <ThemeButton
              text={'Prev'}
              onClickHandler={() => {
                navigate(Screen.BusinessBasicInfoView, {});
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

export default BusinessCompanyDocuments;
