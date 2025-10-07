import React, {useRef, useEffect} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';

import {formStyles as styles} from '../styles';
import {Input, ThemeText} from '../../../components';
import {FormConstants, ReturnKeyTypes} from '../../../enums';
import {strings} from '../../../strings';
import {useSelector, useDispatch} from 'react-redux';
import {commonStyles} from '../../../globalstyles/styles';
import {AppActions} from '../../../store';
import {isIOS} from '../../../utils/DeviceConfig';
import {useTranslation} from 'react-i18next';
import {ThemeFunctions} from '../../../utils';
import UploadWebView from './UploadWebView';
import {t} from 'react-native-tailwindcss';

const PORForm = (props: any) => {
  const {
    control,
    errors,
    handlePicker,
    setDocuments,
    docError,
    setDocError,
    documentType,
  } = props;

  const streetAddressRef = useRef(null);
  const streetAddressRef2 = useRef(null);
  const cityRef = useRef(null);
  const postalCodeRef = useRef(null);
  const stateRef = useRef(null);
  const {appTheme} = useSelector((state: any) => state.globalReducer);

  // const countries = appData?.countries?.map(el => el.name).sort()
  // const countryCodes = appData?.countries
  //   ?.map(el => `+${el.phoneCode} (${el.name})`)
  //   .sort()

  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(AppActions.getUserProfile());
  }, [dispatch]);

  return (
    <View style={styles.formView}>
      <Input
        id={FormConstants.StreetAddress}
        label={strings('street_address')}
        placeholder={strings('street_address')}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={true}
        reference={streetAddressRef}
        focusTo={streetAddressRef2}
        returnKeyType={ReturnKeyTypes.Next}
      />

      <Input
        id={FormConstants.StreetAddress2}
        label={strings('Street Address 2 (optional)')}
        placeholder={strings('Street Address 2')}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={false}
        reference={streetAddressRef2}
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

      <View style={{marginTop: 20}}>
        <ThemeText>
          {documentType === 'individual' ? 'Residential' : 'Business'} Address
          Document photo
        </ThemeText>
        <Text
          style={{fontSize: 12, color: ThemeFunctions.customText(appTheme)}}>
          Upload a photo of a utility bill, government issued document or
          bank/card statement, which is registered on your residential address
          and shows the full address. (You can also upload PDF files.) The proof
          of residence cannot be older than 3 months
        </Text>
      </View>

      <UploadWebView setDocuments={setDocuments} setDocError={setDocError} />

      {docError && (
        <Text style={[t.textRed700, t.textXs, t.p1]}>Document is required</Text>
      )}

      <Input
        id={FormConstants.Comment}
        label={strings('comment')}
        placeholder={strings('comment')}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={false}
        reference={stateRef}
        returnKeyType={ReturnKeyTypes.Next}
      />
    </View>
  );
};

export default PORForm;
