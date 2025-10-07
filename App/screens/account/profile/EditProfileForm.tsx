import React, {useRef, useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {formStyles as styles} from '../styles';
import {Input} from '../../../components';
import {FormConstants, ReturnKeyTypes} from '../../../enums';
import {strings} from '../../../strings';
import {useSelector, useDispatch} from 'react-redux';
import {commonStyles} from '../../../globalstyles/styles';
import {AppActions} from '../../../store';
import {isIOS} from '../../../utils/DeviceConfig';
import {useTranslation} from 'react-i18next';
import {ThemeFunctions} from '../../../utils';

const EditProfileForm = (props: any) => {
  const {
    control,
    errors,
    setValue,
    isMinorAccount,
    setMinorAccount,
    // setCountryCodeData,
    setSelectedCountry,
    setCountryScrollingIndex,
    setCodeScrollingIndex,
    setSelectedCode,
    handlePicker,
  } = props;
  const {userProfileData} = useSelector((state: any) => state.appReducer);
  const appData = useSelector((state: any) => state.appReducer);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const streetAddressRef = useRef(null);
  const cityRef = useRef(null);
  const postalCodeRef = useRef(null);
  const stateRef = useRef(null);
  const parentRef2 = useRef(null);
  const {i18n} = useTranslation();
  const selectedLngCode = i18n.language;
  const {appTheme} = useSelector((state: any) => state.globalReducer);

  // const countries = appData?.countries?.map(el => el.name).sort()
  // const countryCodes = appData?.countries
  //   ?.map(el => `+${el.phoneCode} (${el.name})`)
  //   .sort()

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AppActions.getUserProfile());
  }, [dispatch]);

  const getCountryId = (userProfileData: any) => {
    return appData.countries.find(
      res => res.name === userProfileData.countryName,
    )?.uniqueId;
  };
  useEffect(() => {
    if (userProfileData) {
      AppActions.setUserProfileData(
        userProfileData,
        setValue,
        appData.countries,
      );
      const countryId = getCountryId(userProfileData);
      if (!countryId) return;
      setSelectedCountry(countryId);
      const filteredData = appData.countries.sort((a, b) =>
        a.name.localeCompare(b.name),
      );
      filteredData.map((res, index) => {
        if (res.name === userProfileData?.countryName) {
          setCountryScrollingIndex(index);
        }
      });
      if (userProfileData.mobileISD) {
        filteredData.map((res, index) => {
          if (res.phoneCode === userProfileData.mobileISD) {
            setCodeScrollingIndex(index);
            setSelectedCode(res.uniqueId);
          }
        });
      }
    }
  }, [userProfileData, appData.countries]);

  const setMargin = () => {
    return selectedLngCode !== 'en' && isIOS() ? {marginTop: 6} : {};
  };

  return (
    <View style={styles.formView}>
      <Input
        id={FormConstants.Name}
        label={strings('name')}
        placeholder={strings('name')}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={true}
        reference={nameRef}
        focusTo={emailRef}
        showDropDown={false}
        dropdown={true}
        returnKeyType={ReturnKeyTypes.Next}
      />
      <Input
        id={FormConstants.Email}
        label={strings('email')}
        placeholder={strings('email')}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={true}
        reference={emailRef}
        focusTo={firstNameRef}
        returnKeyType={ReturnKeyTypes.Next}
        keyboardType="email-address"
        showDropDown={false}
        dropdown={true}
      />
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
            reference={firstNameRef}
            focusTo={lastNameRef}
            returnKeyType={ReturnKeyTypes.Next}
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
            reference={lastNameRef}
            focusTo={streetAddressRef}
            returnKeyType={ReturnKeyTypes.Next}
            // pattern={RegexExpression.NAME_REGEX}
          />
        </View>
      </View>

      <View style={commonStyles.rowView}>
        <View style={[commonStyles.halfWidth, {paddingEnd: 8}]}>
          {/* <DropDown
            options={countryCodes}
            updateValue={index => {
              var countryCode = String(countryCodes[index])
              countryCode = countryCode.substring(0, countryCode.indexOf('('))
              setValue(FormConstants.CountryCode, countryCode)
              setCountryCodeData(countryCodes[index].match(/\((.*?)\)/)[1])
            }}> */}
          <TouchableOpacity onPress={handlePicker(2)}>
            <Input
              id={FormConstants.CountryCode}
              label={strings('phone_number')}
              placeholder="Select"
              control={control}
              errors={errors}
              isFieldFilledBg={false}
              isRequired={true}
              dropdown={true}
              reference={firstNameRef}
              focusTo={lastNameRef}
              showTick={false}
              returnKeyType={ReturnKeyTypes.Next}
            />
          </TouchableOpacity>
          {/* </DropDown> */}
        </View>
        <View style={[commonStyles.halfWidth, setMargin()]}>
          <Input
            id={FormConstants.PhoneNumber}
            label="  "
            placeholder={strings('phone_number')}
            control={control}
            errors={errors}
            isFieldFilledBg={false}
            isRequired={true}
            reference={lastNameRef}
            focusTo={streetAddressRef}
            keyboardType="phone-pad"
            returnKeyType={isIOS() ? ReturnKeyTypes.Done : ReturnKeyTypes.Next}
          />
        </View>
      </View>
      <Input
        id={FormConstants.StreetAddress}
        label={strings('street_address')}
        placeholder={strings('street_address')}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={true}
        reference={streetAddressRef}
        focusTo={cityRef}
        returnKeyType={ReturnKeyTypes.Next}
      />

      <View style={commonStyles.rowView}>
        <View style={commonStyles.halfWidth}>
          <Input
            id={FormConstants.City}
            label={strings('city')}
            placeholder={strings('city')}
            control={control}
            errors={errors}
            isFieldFilledBg={false}
            isRequired={true}
            reference={cityRef}
            focusTo={postalCodeRef}
            returnKeyType={ReturnKeyTypes.Next}
          />
        </View>
        <View
          style={[commonStyles.halfWidth, {marginStart: 10, paddingEnd: 10}]}>
          <Input
            id={FormConstants.PostalCode}
            label={strings('postal_code')}
            placeholder={strings('postal_code')}
            control={control}
            errors={errors}
            isFieldFilledBg={false}
            isRequired={true}
            reference={postalCodeRef}
            focusTo={stateRef}
            returnKeyType={isIOS() ? ReturnKeyTypes.Done : ReturnKeyTypes.Next}
            // keyboardType='phone-pad'
          />
        </View>
      </View>

      <Input
        id={FormConstants.State}
        label={strings('state')}
        placeholder={strings('state')}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={true}
        reference={stateRef}
        returnKeyType={ReturnKeyTypes.Next}
      />

      {/* <DropDown
        options={countries}
        updateValue={index =>
          setValue(FormConstants.Country, countries[index])
        }> */}
      <TouchableOpacity onPress={handlePicker(1)}>
        <Input
          id={FormConstants.Country}
          label={strings('country')}
          placeholder={`${strings('select')} ${strings('country')}`}
          control={control}
          errors={errors}
          isRequired={true}
          isFieldFilledBg={false}
          dropdown={true}
          showTick={false}
        />
      </TouchableOpacity>
      {/* </DropDown> */}

      {/* <TouchableWithoutFeedback
        onPress={() => setMinorAccount(!isMinorAccount)}>
        <View style={[commonStyles.rowView, styles.minorAccountView]}>
          <View style={styles.checkbox}>
            {isMinorAccount ? (
              <Image source={IC_BASIC_TICK} style={styles.tickIcon} />
            ) : null}
          </View>

          <Text style={styles.text}>{strings('this_is_minor_account')}</Text>
        </View>
      </TouchableWithoutFeedback>
      {isMinorAccount && (
        <View>
          <Input
            id={FormConstants.Parent1}
            label={strings('parent1')}
            placeholder={strings('email1')}
            control={control}
            errors={errors}
            isFieldFilledBg={false}
            isRequired={false}
            focusTo={parentRef2}
            returnKeyType={ReturnKeyTypes.Next}
            customStyles={styles.input}
            keyboardType='email-address'
          />

          <Input
            id={FormConstants.Parent2}
            label={strings('parent2')}
            placeholder={strings('email2')}
            control={control}
            errors={errors}
            isFieldFilledBg={false}
            isRequired={false}
            reference={parentRef2}
            returnKeyType={ReturnKeyTypes.Next}
            customStyles={styles.input}
            keyboardType='email-address'
          />
        </View>
      )} */}
    </View>
  );
};

export default EditProfileForm;
