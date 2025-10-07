import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {formStyles as styles} from '../styles';
import {Input, LoadingSpinner, ThemeText} from '../../../components';
import {FormConstants} from '../../../enums';
import {strings} from '../../../strings';
import {APIConstants, MapperConstants} from '../../../constants';
import {RegexExpression, ThemeFunctions} from '../../../utils';
import {useSelector} from 'react-redux';
import {commonStyles} from '../../../globalstyles/styles';
import Colors from '../../../theme/Colors';
import {buttonStyles} from '../../../components/ui/styles';
import {makeRequestNew} from '../../../services/ApiService';
import {showToast} from '../../../utils/GenericUtils';
import fonts from '../../../theme/fonts';
import {t} from 'react-native-tailwindcss';

const AccountView = ({
  control,
  errors,
  getValues,
  userProfileData,
  handleUpdate,
  handleContactDetail,
}: any) => {
  const isKycApproved = () => {
    return userProfileData?.kyc_record?.status ? true : false;
  };
  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer);

  const isKybApproved = () => {
    return getValues(FormConstants.KYBStatus) ===
      MapperConstants.KybStatusConstant.verified
      ? true
      : false;
  };
  const [isLoading, setLoading] = useState(false);
  const [err, serErr] = useState();

  return (
    <View style={styles.formView}>
      {/* <Input
        id={FormConstants.Name}
        label={strings('name')}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={false}
        showDropDown={false}
        dropdown={true}
        showTick={false}
      /> */}

      <Input
        id={FormConstants.Email}
        label={strings('email')}
        update={handleUpdate}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={false}
        showDropDown={false}
        dropdown={true}
        showTick={false}
      />

      <Input
        id={FormConstants.AccountType}
        label={strings('account_type')}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={false}
        showDropDown={false}
        dropdown={true}
        showTick={false}
      />
      {userProfileData?.two_fa_enabled === 1 && (
        <Input
          id={FormConstants.TFA}
          label={strings('Two Factor Authentication')}
          control={control}
          errors={errors}
          isFieldFilledBg={false}
          isRequired={true}
          showDropDown={false}
          dropdown={true}
          showTick={false}
          value={'Google Authenticator'}
        />
      )}

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
      {userProfileData?.kyc_record?.status ? (
        <>
          <View style={commonStyles.rowView}>
            <View style={[commonStyles.halfWidth, {paddingEnd: 8}]}>
              <Input
                id={FormConstants.FirstName}
                label={strings('first_name')}
                placeholder={strings('first_name')}
                control={control}
                errors={errors}
                isFieldFilledBg={false}
                isRequired={true}
                showDropDown={false}
                dropdown={true}
                showTick={false}

                // pattern={RegexExpression.NAME_REGEX}
              />
            </View>
            <View style={commonStyles.halfWidth}>
              <Input
                id={FormConstants.LastName}
                label={strings('last_name')}
                placeholder={strings('last_name')}
                control={control}
                errors={errors}
                isFieldFilledBg={false}
                isRequired={true}
                showDropDown={false}
                dropdown={true}
                showTick={false}

                // pattern={RegexExpression.NAME_REGEX}
              />
            </View>
          </View>
          <Input
            id={FormConstants.Passport}
            label={strings('passport')}
            placeholder={strings('passport')}
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

      {userProfileData?.por_verified_at && !userProfileData.por_expires_soon ? (
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
          disabled={isLoading}
          onPress={handleContactDetail}
          style={[
            ThemeFunctions.themeBtnColor(appColor),
            {
              backgroundColor: Colors.SolMain,
              // height: 28,
              paddingHorizontal: 10,
              marginBottom: 8,
              borderRadius: 6,
              justifyContent: 'center',
              ...t.pY1,
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

      <Input
        id={FormConstants.Phone1}
        label={strings('mobile_no_1')}
        placeholder={strings('mobile_no_1')}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={false}
        showDropDown={false}
        dropdown={true}
      />

      <Input
        id={FormConstants.Phone2}
        label={`${strings('mobile_no_2')} (Optional)`}
        placeholder={strings('mobile_no_2')}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={false}
        showDropDown={false}
        dropdown={true}
      />

      <Input
        id={FormConstants.Email2}
        label={`${strings('email2')}`}
        placeholder={strings('email2')}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        errorMsg={err}
        isRequired={false}
        showDropDown={false}
        dropdown={true}
      />

      <View style={[InnerStyles.borderBottom, InnerStyles.marginTop]} />

      <Input
        id={FormConstants.KYCStatus}
        label={strings('kyc_status')}
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
        label={strings('por_status')}
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

export default AccountView;

export const InnerStyles = StyleSheet.create({
  borderBottom: {borderBottomColor: '#c4c4c4', borderBottomWidth: 1},
  marginTop: {marginTop: 20},
});
