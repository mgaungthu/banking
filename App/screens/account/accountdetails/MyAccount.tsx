import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, TextInput, View} from 'react-native';
import {commonStyles} from '../../../globalstyles/styles';
import {DismissKeyboardView, Header, ThemeButton} from '../../../components';
import {accountStyles as styles} from '../styles';
import {strings} from '../../../strings';
import {useForm} from 'react-hook-form';
import {AppActions} from '../../../store';
import {useDispatch, useSelector} from 'react-redux';
import {MapperConstants} from '../../../constants';
import AccountView from './AccountView';
import {FormConstants, Screen} from '../../../enums';
import {navigate} from '../../../utils';
import {ThemeFunctions} from '../../../utils';
import {FormatDate} from '../../../utils/AppFunctions';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {showToast} from '../../../utils/GenericUtils';
import UpdateEmail from './UpdateEmail';
import ConfirmModel from './ConfirmModel';
import UpateContactDetail from './UpateContactDetail';

const MyAccount = (props: any) => {
  const {
    control,
    formState: {errors},
    setValue,
    getValues,
  } = useForm();

  const [updateShow, setUpdateShow] = useState(false);
  const [contactDetailShow, setContactDetailShow] = useState(false);
  const [isModelShow, setModelShow] = useState(false);

  const dispatch = useDispatch<any>();
  const {userProfileData} = useSelector((state: any) => state.appReducer);
  const {appTheme} = useSelector((state: any) => state.globalReducer);
  useEffect(() => {
    dispatch(AppActions.getUserProfile());
  }, []);

  useEffect(() => {
    if (userProfileData) {
      if (userProfileData?.kyc_record) {
        setValue(
          FormConstants.FirstName,
          `${userProfileData.kyc_record.first_name}`,
        );
        setValue(
          FormConstants.LastName,
          `${userProfileData.kyc_record.last_name}`,
        );
      }

      setValue(FormConstants.Email, userProfileData.email);
      setValue(FormConstants.RefCode, userProfileData.referralCode);
      setValue(
        FormConstants.AccountType,
        strings(MapperConstants.AccountType.individual),
      );

      setValue(FormConstants.Phone1, `${userProfileData.phone_1 || ''}`);
      setValue(FormConstants.Phone2, `${userProfileData.phone_2 || ''}`);
      setValue(FormConstants.Email2, userProfileData.alternate_email || '');

      updateKycStatus();
      updatePorStatus();
    }
  }, [userProfileData]);

  const updateKycStatus = () => {
    switch (userProfileData?.kyc_record?.status) {
      case MapperConstants.KycStatusConstant.pending ||
        MapperConstants.Status.inactive:
        setValue(
          FormConstants.KYCStatus,
          strings(MapperConstants.KycStatusValues.pending),
        );
        break;
      case MapperConstants.KycStatusConstant.submitted ||
        MapperConstants.Status.active:
        setValue(
          FormConstants.KYCStatus,
          strings(MapperConstants.KycStatusValues.submitted),
        );
        break;
      case MapperConstants.KycStatusConstant.approved ||
        MapperConstants.Status.approved:
        setValue(
          FormConstants.KYCStatus,
          `${strings(MapperConstants.KycStatusValues.approved)}, ${strings(
            'validity',
          )}:  ${FormatDate(userProfileData?.id_expires_at)}`,
        );
        setValue(
          FormConstants.Passport,
          userProfileData?.kyc_record?.document_number,
        );
        break;
      case MapperConstants.KycStatusConstant.rejected ||
        MapperConstants.Status.rejected:
        setValue(
          FormConstants.KYCStatus,
          strings(MapperConstants.KycStatusValues.rejected),
        );
        break;
      default:
        setValue(
          FormConstants.KYCStatus,
          strings(MapperConstants.KybStatusConstant.not_submitted),
        );
        break;
    }
  };

  const updatePorStatus = () => {
    if (userProfileData?.por_verified_at && !userProfileData.por_expires_soon) {
      setValue(
        FormConstants.PORStatus,
        `${strings(MapperConstants.PorStatusValues.approved)}, ${strings(
          'validity',
        )}:  ${FormatDate(userProfileData?.por_expire_at)}`,
      );
      setValue(
        FormConstants.StreetAddress,
        userProfileData?.address_record?.street_address,
      );
      setValue(
        FormConstants.StreetAddress2,
        userProfileData?.address_record?.street_address2,
      );
      setValue(FormConstants.City, userProfileData?.address_record?.city);
      setValue(FormConstants.State, userProfileData?.address_record?.state);
      setValue(
        FormConstants.PostalCode,
        userProfileData?.address_record?.postal_code,
      );
      setValue(
        FormConstants.Country,
        userProfileData?.address_record?.country_of_residence_name,
      );
    } else if (userProfileData?.por_submitted_at) {
      setValue(
        FormConstants.PORStatus,
        strings(MapperConstants.PorStatusValues.pending),
      );
    } else {
      setValue(
        FormConstants.PORStatus,
        strings(MapperConstants.PorStatusValues.not_submitted),
      );
    }
  };

  const handleKYC = () => {
    // userProfileData.days_until_reverification_allowed
    if (userProfileData?.verification_too_recent) {
      showToast(
        '',
        `Please wait ${userProfileData.days_until_reverification_allowed} more days before re-verifying.`,
        'info',
      );
    } else {
      navigate(Screen.KycProcess, {});
    }
  };

  const handlePOR = () => {
    if (
      userProfileData?.kyc_record?.status !=
      MapperConstants.KycStatusConstant.approved
    ) {
      showToast('', strings('KYC Verification Required'), 'info');
    } else if (userProfileData?.por_submitted_at) {
      showToast('', strings('POR is verifiying'), 'info');
    } else if (
      userProfileData.por_verified_at &&
      !userProfileData.por_expires_soon
    ) {
      setModelShow(true);
    } else {
      navigate(Screen.PORScreen, {});
    }
  };

  const handleUpdate = () => {
    setUpdateShow(MapperConstants.StatusMapper.enable);
  };

  const handleContactDetail = () => {
    setContactDetailShow(MapperConstants.StatusMapper.enable);
  };
  return (
    <SafeAreaView
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      <Header title={strings('profile')} />
      <KeyboardAwareScrollView
        contentContainerStyle={[styles.scrollView, {paddingBottom: 10}]}>
        <DismissKeyboardView>
          <AccountView
            control={control}
            errors={errors}
            getValues={getValues}
            handleUpdate={handleUpdate}
            handleContactDetail={handleContactDetail}
            userProfileData={userProfileData}
          />

          <UpdateEmail
            isVisible={updateShow}
            setIsVisible={setUpdateShow}
            userData={userProfileData}
          />
          <UpateContactDetail
            isVisible={contactDetailShow}
            setIsVisible={setContactDetailShow}
            userProfileData={userProfileData}
          />
        </DismissKeyboardView>
      </KeyboardAwareScrollView>
      <View style={[commonStyles.rowView, commonStyles.paddingHorizontalView]}>
        <View style={[commonStyles.halfWidth, {paddingEnd: 8}]}>
          <View>
            <ThemeButton
              text={
                userProfileData?.kyc_record?.status !== 'approved'
                  ? 'kyc'
                  : 'Update KYC'
              }
              styleText={{textTransform: 'none'}}
              onClickHandler={handleKYC}
            />
          </View>
        </View>
        <View style={[commonStyles.halfWidth, {paddingEnd: 8}]}>
          <ThemeButton
            text={!userProfileData?.por_verified_at ? 'POR' : 'Update POR'}
            styleText={{textTransform: 'none'}}
            onClickHandler={handlePOR}
          />
        </View>
      </View>

      <ConfirmModel
        visible={isModelShow}
        setModelShow={setModelShow}
        text="This will reset your Proof of Residence (POR) status. Are you sure to continue?"
        navigate={navigate}
      />
      {/* {(
            userProfileData?.kybStatus !==
              MapperConstants.KybStatusConstant.verified) && (
            <ThemeButton  
              text='kyb'
              onClickHandler={() => {
                dispatch(AppActions.getKybDetails())
                // navigate(Screen.KycProcess, {})
              }}
            />
          )} */}
    </SafeAreaView>
  );
};

export default MyAccount;
