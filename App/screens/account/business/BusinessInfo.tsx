import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {accountFeeStyles, formStyles as styles} from '../styles';
import {Cell, Input, LoadingSpinner, ThemeText} from '../../../components';
import {FormConstants, Loader} from '../../../enums';
import {strings} from '../../../strings';
import {APIConstants, MapperConstants} from '../../../constants';
import {ThemeFunctions} from '../../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {commonStyles} from '../../../globalstyles/styles';
import Colors from '../../../theme/Colors';
import {buttonStyles} from '../../../components/ui/styles';
import {makeRequestNew} from '../../../services/ApiService';
import {showToast} from '../../../utils/GenericUtils';
import {ScrollView} from 'react-native-gesture-handler';
import {CheckBox} from 'react-native-elements';
import {AppActions} from '../../../store';
import fonts from '../../../theme/fonts';

const BusinessInfo = ({
  control,
  errors,
  getValues,
  userProfileData,
  handleContactDetail,
  handleLicense,
}: any) => {
  const isKycApproved = () => {
    return userProfileData?.kyc_record?.status ? true : false;
  };
  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer);
  const appData = useSelector((state: any) => state.appReducer);

  const dispatch = useDispatch();

  const isKybApproved = () => {
    return getValues(FormConstants.KYBStatus) ===
      MapperConstants.KybStatusConstant.verified
      ? true
      : false;
  };
  const [isLoading, setLoading] = useState(false);
  const [err, serErr] = useState();

  // const updateContactDetails = async () => {
  //   dispatch(AppActions.updateLoading(Loader.CONTACT_DETAIL));
  //   const data = {
  //     email: getValues(FormConstants.Email2),
  //     phone_1: getValues(FormConstants.Phone1),
  //     phone_2: getValues(FormConstants.Phone2),
  //   };
  //   const response = await makeRequestNew(
  //     MapperConstants.ApiTypes.PATCH,
  //     APIConstants.BUSINESS_CONTACT_DETAILS_UPDATE,
  //     {},
  //     data,
  //   );
  //   if (response.status === 200) {
  //     dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
  //     showToast('', 'Update Contact Detail Successfully', 'info');
  //   } else if (response.data.errors.email) {
  //     serErr(response.data.errors.email[0]);
  //     dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
  //   }
  // };

  const [checkBoxValue, setCheckBoxValue] = useState(false);

  useEffect(() => {
    setCheckBoxValue(
      userProfileData.business_license_information?.licensed ? true : false,
    );
  }, [userProfileData.business_license_information?.licensed]);

  const updateLicenseInformation = () => {};
  return (
    <View style={styles.formView}>
      <View style={{marginTop: 20}}>
        <ThemeText
          style={{
            color: ThemeFunctions.customText(appTheme),
            fontFamily: fonts.PoppinsBold,
            fontWeight: 'heavy',
          }}>
          {strings('basic_information')}:
        </ThemeText>
      </View>
      {userProfileData?.kyb_verified_at ? (
        <>
          <View style={commonStyles.rowView}>
            <View style={[commonStyles.halfWidth, {paddingEnd: 8}]}>
              <Input
                id={FormConstants.IndividualBusinessROle}
                label={strings('Role')}
                placeholder={strings('role')}
                control={control}
                errors={errors}
                isFieldFilledBg={false}
                isRequired={true}
                showDropDown={false}
                dropdown={true}
                showTick={false}
              />
            </View>
            <View style={commonStyles.halfWidth}>
              <Input
                id={FormConstants.Name}
                label={strings('name')}
                placeholder={strings('name')}
                control={control}
                errors={errors}
                isFieldFilledBg={false}
                isRequired={true}
                showDropDown={false}
                dropdown={true}
                showTick={false}
              />
            </View>
          </View>

          <View style={commonStyles.rowView}>
            <View style={[commonStyles.halfWidth, {paddingEnd: 8}]}>
              <Input
                id={FormConstants.RegisterationNo}
                label={strings('registration number')}
                placeholder={strings('registration number')}
                control={control}
                errors={errors}
                isFieldFilledBg={false}
                isRequired={true}
                showDropDown={false}
                dropdown={true}
                showTick={false}
              />
            </View>
            <View style={commonStyles.halfWidth}>
              <Input
                id={FormConstants.Country}
                label={strings('Country of Registration')}
                placeholder={strings('Country of Registration')}
                control={control}
                errors={errors}
                isFieldFilledBg={false}
                isRequired={true}
                showDropDown={false}
                dropdown={true}
                showTick={false}
              />
            </View>
          </View>

          <Input
            id={FormConstants.RegisterationDate}
            label={strings('Date of Registration')}
            placeholder={strings('Date of Registration')}
            control={control}
            errors={errors}
            isFieldFilledBg={false}
            isRequired={true}
            showDropDown={false}
            dropdown={true}
            showTick={false}
          />

          <Input
            id={FormConstants.BusinessType}
            label={strings('Type of Business')}
            placeholder={strings('Type of Business')}
            control={control}
            errors={errors}
            isFieldFilledBg={false}
            isRequired={true}
            showDropDown={false}
            dropdown={true}
            showTick={false}
          />

          <Input
            id={FormConstants.CountryUBO}
            label={strings('Country of Residence of Major UBO')}
            placeholder={strings('Country of Residence of Major UBO')}
            control={control}
            errors={errors}
            isFieldFilledBg={false}
            isRequired={true}
            showDropDown={false}
            dropdown={true}
            showTick={false}
          />
        </>
      ) : (
        <View
          style={{padding: 10, justifyContent: 'center', alignItems: 'center'}}>
          <ThemeText
            style={{
              fontFamily: fonts.PoppinsBold,
              fontWeight: 'heavy',
              color: ThemeFunctions.customText(appTheme),
            }}>
            N/A
          </ThemeText>
        </View>
      )}

      <View style={[InnerStyles.borderBottom, InnerStyles.marginTop]} />

      <View
        style={[
          commonStyles.rowView,
          commonStyles.justifySpace,
          {marginTop: 20},
        ]}>
        <ThemeText
          style={{
            color: ThemeFunctions.customText(appTheme),
            fontFamily: fonts.PoppinsBold,
            fontWeight: 'heavy',
          }}>
          License Information:
        </ThemeText>

        <TouchableOpacity
          activeOpacity={0.8}
          // disabled={
          //   appData.loading === Loader.LICENSE_INFORMATION ? true : false
          // }
          onPress={handleLicense}
          style={[
            ThemeFunctions.themeBtnColor(appColor),
            {
              backgroundColor: Colors.SolMain,
              height: 29,
              paddingHorizontal: 10,
              borderRadius: 6,
              justifyContent: 'center',
            },
          ]}>
          <Text
            style={[
              buttonStyles.themeButton,
              ThemeFunctions.themeBtnText(appTheme),
              {fontSize: 16},
            ]}>
            UPDATE
          </Text>
        </TouchableOpacity>
      </View>

      {userProfileData?.business_license_information ? (
        <>
          <Cell style={{flexWrap: 'wrap'}} onPress={() => {}}>
            {/* <CheckBox
              center
              checked={checkBoxValue}
              containerStyle={accountFeeStyles.checkbox}
              checkedColor={ThemeFunctions.getColor(appColor)}
              // onPress={() => setCheckBoxValue(!checkBoxValue)}
              // disabled={true}
            /> */}
            <ThemeText>
              {strings('Licensed')} :{' '}
              {userProfileData?.business_license_information?.licensed
                ? 'YES'
                : 'NO'}
            </ThemeText>
          </Cell>

          <View style={commonStyles.rowView}>
            <View style={[commonStyles.halfWidth, {paddingEnd: 8}]}>
              <Input
                id={FormConstants.LicenseType}
                label={strings('License Type')}
                placeholder={strings('License Type')}
                control={control}
                errors={errors}
                isFieldFilledBg={false}
                isRequired={true}
                showDropDown={false}
                dropdown={true}
                showTick={false}
              />
            </View>
            <View style={[commonStyles.halfWidth]}>
              <Input
                id={FormConstants.LicenseNumber}
                label={strings('License Number')}
                placeholder={strings('License Number')}
                control={control}
                errors={errors}
                isFieldFilledBg={false}
                isRequired={true}
                showDropDown={false}
                dropdown={true}
                showTick={false}
              />
            </View>
          </View>

          <Input
            id={FormConstants.LicenseComments}
            label={strings('License Comments')}
            placeholder={strings('License Comments')}
            control={control}
            errors={errors}
            isFieldFilledBg={false}
            isRequired={true}
            showDropDown={false}
            dropdown={true}
            showTick={false}
          />
        </>
      ) : (
        <View
          style={{padding: 10, justifyContent: 'center', alignItems: 'center'}}>
          <ThemeText
            style={{
              fontFamily: fonts.PoppinsBold,
              fontWeight: 'heavy',
              color: ThemeFunctions.customText(appTheme),
            }}>
            N/A
          </ThemeText>
        </View>
      )}

      <View style={[InnerStyles.borderBottom, InnerStyles.marginTop]} />

      <View style={{marginTop: 20}}>
        <ThemeText
          style={{
            color: ThemeFunctions.customText(appTheme),
            fontFamily: fonts.PoppinsBold,
            fontWeight: 'heavy',
          }}>
          Address Details:
        </ThemeText>
      </View>

      {userProfileData?.business_address_record ? (
        <>
          <Input
            id={FormConstants.StreetAddress}
            label={strings('street_address')}
            placeholder={strings('street_address')}
            control={control}
            errors={errors}
            isFieldFilledBg={false}
            isRequired={true}
            showDropDown={false}
            dropdown={true}
            showTick={false}
          />

          <Input
            id={FormConstants.StreetAddress2}
            label={strings('street_address2') + ' (optional)'}
            placeholder={strings('street_address2')}
            control={control}
            errors={errors}
            isFieldFilledBg={false}
            isRequired={true}
            showDropDown={false}
            dropdown={true}
            showTick={false}
          />

          <View style={commonStyles.rowView}>
            <View style={[commonStyles.halfWidth, {paddingEnd: 8}]}>
              <Input
                id={FormConstants.City}
                label={strings('city')}
                control={control}
                errors={errors}
                isFieldFilledBg={false}
                isRequired={false}
                showDropDown={false}
                dropdown={true}
                showTick={false}
              />
            </View>
            <View style={[commonStyles.halfWidth]}>
              <Input
                id={FormConstants.State}
                label={strings('state')}
                control={control}
                errors={errors}
                isFieldFilledBg={false}
                isRequired={false}
                showDropDown={false}
                dropdown={true}
                showTick={false}
              />
            </View>
          </View>

          <View style={commonStyles.rowView}>
            <View style={[commonStyles.halfWidth, {paddingEnd: 8}]}>
              <Input
                id={FormConstants.PostalCode}
                label={strings('postal_code')}
                control={control}
                errors={errors}
                isFieldFilledBg={false}
                isRequired={false}
                showDropDown={false}
                dropdown={true}
                showTick={false}
              />
            </View>
            <View style={[commonStyles.halfWidth]}>
              <Input
                id={FormConstants.Country}
                label={strings('country')}
                control={control}
                errors={errors}
                isFieldFilledBg={false}
                isRequired={false}
                showDropDown={false}
                dropdown={true}
                showTick={false}
              />
            </View>
          </View>
        </>
      ) : (
        <View
          style={{padding: 10, justifyContent: 'center', alignItems: 'center'}}>
          <ThemeText
            style={{
              fontFamily: fonts.PoppinsBold,
              fontWeight: 'heavy',
              color: ThemeFunctions.customText(appTheme),
            }}>
            N/A
          </ThemeText>
        </View>
      )}

      <View style={[InnerStyles.borderBottom, InnerStyles.marginTop]} />

      <View
        style={[
          commonStyles.rowView,
          commonStyles.justifySpace,
          {marginTop: 20},
        ]}>
        <ThemeText
          style={{
            color: ThemeFunctions.customText(appTheme),
            fontFamily: fonts.PoppinsBold,
            fontWeight: 'heavy',
          }}>
          Contact Details:
        </ThemeText>

        <TouchableOpacity
          activeOpacity={0.8}
          disabled={appData.loading === Loader.CONTACT_DETAIL ? true : false}
          onPress={handleContactDetail}
          style={[
            ThemeFunctions.themeBtnColor(appColor),
            {
              backgroundColor: Colors.SolMain,
              height: 29,
              paddingHorizontal: 10,
              borderRadius: 6,
              justifyContent: 'center',
            },
          ]}>
          <Text
            style={[
              buttonStyles.themeButton,
              ThemeFunctions.themeBtnText(appTheme),
              {fontSize: 16},
            ]}>
            UPDATE
          </Text>
        </TouchableOpacity>
      </View>

      {userProfileData.business_contact_details ? (
        <>
          <Input
            id={FormConstants.Phone1}
            label={strings('mobile_no_1')}
            placeholder={strings('mobile_no_1')}
            control={control}
            errors={errors}
            isFieldFilledBg={false}
            showDropDown={false}
            dropdown={true}
            // onChangeVal={v => setPhone1(v)}
          />

          <Input
            id={FormConstants.Phone2}
            label={`${strings('mobile_no_2')} (Optional)`}
            placeholder={strings('mobile_no_2')}
            control={control}
            errors={errors}
            isFieldFilledBg={false}
            showDropDown={false}
            dropdown={true}
            // onChangeVal={v => setPhone2(v)}
          />

          <Input
            id={FormConstants.Email2}
            label={`${strings('email2')}`}
            placeholder={strings('email2')}
            control={control}
            errors={errors}
            isFieldFilledBg={false}
            // onChangeVal={v => setEmail2(v)}
            showDropDown={false}
            dropdown={true}
            errorMsg={err}
          />
        </>
      ) : (
        <View
          style={{padding: 10, justifyContent: 'center', alignItems: 'center'}}>
          <ThemeText
            style={{
              fontFamily: fonts.PoppinsBold,
              fontWeight: 'heavy',
              color: ThemeFunctions.customText(appTheme),
            }}>
            N/A
          </ThemeText>
        </View>
      )}

      <View style={[InnerStyles.borderBottom, InnerStyles.marginTop]} />

      <Input
        id={FormConstants.KYBStatus}
        label={strings('kyb_status')}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={false}
        showDropDown={false}
        dropdown={true}
        showTick={isKycApproved()}
        isVerifiedIcon={true}
      />
      <Input
        id={FormConstants.PORStatus}
        label={strings('porb_status')}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={false}
        showDropDown={false}
        dropdown={true}
        showTick={isKybApproved()}
        isVerifiedIcon={true}
      />
    </View>
  );
};

export default BusinessInfo;

export const InnerStyles = StyleSheet.create({
  borderBottom: {borderBottomColor: '#c4c4c4', borderBottomWidth: 1},
  marginTop: {marginTop: 20},
});
