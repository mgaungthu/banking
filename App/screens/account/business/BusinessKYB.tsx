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
import BusinessInfo from './BusinessInfo';
import {FormConstants, Screen} from '../../../enums';
import {navigate} from '../../../utils';
import {ThemeFunctions} from '../../../utils';
import {FormatDate} from '../../../utils/AppFunctions';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {showToast} from '../../../utils/GenericUtils';
import ConfirmModel from '../accountdetails/ConfirmModel';
import UpateContactDetail from './UpateContactDetail';
import UpdateLicenseInfo from './UpdateLicenseInfo';

const BusinessKYB = (props: any) => {
  const {
    control,
    formState: {errors},
    setValue,
    getValues,
  } = useForm();

  const [isModelShow, setModelShow] = useState(false);
  const [contactDetailShow, setContactDetailShow] = useState(false);
  const [licenseShow, setLicenseShow] = useState(false);

  const dispatch = useDispatch();
  const {userProfileData} = useSelector((state: any) => state.appReducer);
  const {appTheme} = useSelector((state: any) => state.globalReducer);
  useEffect(() => {
    dispatch(AppActions.getUserProfile());
  }, []);

  useEffect(() => {
    if (userProfileData) {
      if (userProfileData?.kyb_verified_at) {
        // setValue(
        //   FormConstants.FirstName,
        //   `${userProfileData.kyc_record.first_name}`,
        // );
        // setValue(
        //   FormConstants.LastName,
        //   `${userProfileData.kyc_record.last_name}`,
        // );
      }

      // setValue(FormConstants.Email, userProfileData.email);
      // setValue(FormConstants.RefCode, userProfileData.referralCode);
      // setValue(
      //   FormConstants.AccountType,
      //   strings(MapperConstants.AccountType.individual),
      // );

      // updateKycStatus();
      updateKybStatus();
      updateLicenseDetail();
      updateAddressDetail();
      updatePorStatus();
    }

    if (userProfileData.business_contact_details) {
      setValue(
        FormConstants.Phone1,
        `${userProfileData.business_contact_details.phone_1 || ''}`,
      );
      setValue(
        FormConstants.Phone2,
        `${userProfileData.business_contact_details.phone_2 || ''}`,
      );
      setValue(
        FormConstants.Email2,
        userProfileData.business_contact_details.email || '',
      );
    }
  }, [userProfileData]);

  const updateKybStatus = () => {
    switch (userProfileData?.kyb_verified_at) {
      case MapperConstants.KybStatus.verified:
        setValue(
          FormConstants.KYBStatus,
          strings(MapperConstants.KybStatusConstant.verified),
        );
        setValue(
          FormConstants.AccountType,
          `${strings(MapperConstants.AccountType.business)}-${
            userProfileData.companyName
          }`,
        );
        break;
      case MapperConstants.KybStatus.pending:
        setValue(
          FormConstants.KYBStatus,
          strings(MapperConstants.KybStatusConstant.pending),
        );
        break;
      default:
        setValue(
          FormConstants.KYBStatus,
          strings(MapperConstants.KybStatusConstant.not_submitted),
        );
        break;
    }

    if (userProfileData?.kyb_verified_at) {
      setValue(
        FormConstants.KYBStatus,
        strings(MapperConstants.KybStatusConstant.verified),
      );
    } else if (userProfileData?.kyb_submitted_at) {
      setValue(
        FormConstants.KYBStatus,
        strings(MapperConstants.KybStatusConstant.pending),
      );
    }
  };

  const updateLicenseDetail = () => {
    if (userProfileData?.business_license_information) {
      setValue(
        FormConstants.Licensed,
        userProfileData.business_license_information.licensed === 1
          ? 'YES'
          : 'NO',
      );
      setValue(
        FormConstants.LicenseType,
        userProfileData.business_license_information.license_type,
      );
      setValue(
        FormConstants.LicenseNumber,
        userProfileData.business_license_information.license_number,
      );
      setValue(
        FormConstants.LicenseComments,
        userProfileData.business_license_information.license_comments,
      );
    }
  };

  const updateAddressDetail = () => {
    if (userProfileData?.business_address_record) {
      setValue(
        FormConstants.StreetAddress,
        userProfileData?.business_address_record.street_address,
      );
      setValue(
        FormConstants.StreetAddress2,
        userProfileData?.business_address_record.street_address2,
      );
      setValue(
        FormConstants.City,
        userProfileData?.business_address_record.city,
      );
      setValue(
        FormConstants.State,
        userProfileData?.business_address_record.state,
      );
      setValue(
        FormConstants.PostalCode,
        userProfileData?.business_address_record.postal_code,
      );
      setValue(
        FormConstants.Country,
        userProfileData?.business_address_record.country_of_residence_name,
      );
    }
  };

  const updatePorStatus = () => {
    if (
      userProfileData?.porb_verified_at &&
      !userProfileData.porb_expires_soon
    ) {
      setValue(
        FormConstants.PORStatus,
        `${strings(MapperConstants.PorStatusValues.approved)}, ${strings(
          'validity',
        )}:  ${FormatDate(userProfileData?.por_expire_at)}`,
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

  const handleKYB = () => {
    if (userProfileData.kyb_submitted_at) {
      showToast('', 'KYB is verifying', 'info');
    } else {
      navigate(Screen.IdentityVerificationScreen, {});
    }
    // userProfileData.days_until_reverification_allowed
  };

  const handlePORB = () => {
    if (
      userProfileData?.kyc_record?.status !=
      MapperConstants.KycStatusConstant.approved
    ) {
      showToast('', strings('please_complete_kyc'), 'info');
    } else if (userProfileData?.por_submitted_at) {
      showToast('', strings('POR is verifiying'), 'info');
    } else if (
      userProfileData.porb_verified_at &&
      !userProfileData.porb_expires_soon
    ) {
      setModelShow(true);
    } else {
      navigate(Screen.PORScreen, {});
    }
  };

  const handleContactDetail = () => {
    setContactDetailShow(MapperConstants.StatusMapper.enable);
  };

  const handleLicense = () => {
    setLicenseShow(MapperConstants.StatusMapper.enable);
  };
  return (
    <SafeAreaView
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      <Header title={strings('Business')} />
      <KeyboardAwareScrollView
        contentContainerStyle={[styles.scrollView, {paddingBottom: 10}]}>
        <DismissKeyboardView>
          <BusinessInfo
            control={control}
            errors={errors}
            getValues={getValues}
            handleContactDetail={handleContactDetail}
            userProfileData={userProfileData}
            handleLicense={handleLicense}
          />

          {/* <UpdateEmail isVisible={updateShow} setIsVisible={setUpdateShow} /> */}
          <UpateContactDetail
            isVisible={contactDetailShow}
            setIsVisible={setContactDetailShow}
            userProfileData={userProfileData}
          />
          <UpdateLicenseInfo
            isVisible={licenseShow}
            setIsVisible={setLicenseShow}
            userProfileData={userProfileData}
          />
        </DismissKeyboardView>
      </KeyboardAwareScrollView>
      <View style={[commonStyles.rowView, commonStyles.paddingHorizontalView]}>
        <View style={[commonStyles.halfWidth, {paddingEnd: 8}]}>
          <View>
            <ThemeButton
              text={
                !userProfileData?.kyb_verified_at ||
                !userProfileData?.kyb_submitted_at
                  ? 'KYB'
                  : 'Update KYB'
              }
              styleText={{textTransform: 'none'}}
              onClickHandler={handleKYB}
            />
          </View>
        </View>
        <View style={[commonStyles.halfWidth, {paddingEnd: 8}]}>
          <ThemeButton
            text={!userProfileData?.porb_verified_at ? 'PORB' : 'Update PORB'}
            styleText={{textTransform: 'none'}}
            onClickHandler={handlePORB}
          />
        </View>
      </View>

      <ConfirmModel
        visible={isModelShow}
        setModelShow={setModelShow}
        text="This will reset your Business Proof of Residence (BPOR) status. Are you sure to continue?"
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

export default BusinessKYB;
