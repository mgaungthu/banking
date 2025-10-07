import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';

import {commonStyles} from '../../../globalstyles/styles';
import {
  Cell,
  DismissKeyboardView,
  Header,
  ThemeButton,
  ThemeText,
} from '../../../components';
import {strings} from '../../../strings';
import {useForm} from 'react-hook-form';
import PORForm from './PORForm';
import {useDispatch, useSelector} from 'react-redux';
import {AppActions} from '../../../store';
import {FormConstants, Loader, Screen} from '../../../enums';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SelectCountry} from '../../payments/common';
import {APIConstants, MapperConstants} from '../../../constants';
import {makeRequestNew} from '../../../services/ApiService';
import {showToast} from '../../../utils/GenericUtils';
import Navigation from '../../../utils/Navigation';

const VerifyPOR = (props: any) => {
  const {
    control,
    formState: {errors},
    setValue,
    getValues,
    handleSubmit,
  } = useForm();
  const dispatch = useDispatch<any>();
  const {documentType, setShowPorForm} = props;
  // const [countryCodeData, setCountryCodeData] = useState('')
  const appData = useSelector((state: any) => state.appReducer);
  //   const {appTheme} = useSelector((state: any) => state.globalReducer);
  const {countries} = useSelector((state: any) => state.appReducer);
  //   const {userProfileData} = useSelector((state: any) => state.appReducer);

  // for country
  const [isCountryPicker, setIsCountryPicker] = useState(
    MapperConstants.StatusMapper.disable,
  );
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [countryScrollingIndex, setCountryScrollingIndex] = useState(0);
  const [documents, setDocuments] = useState();
  const [docError, setDocError] = useState(false);

  // for country
  const handleCountry = (item, index) => () => {
    setSelectedCountry(item.calling_code);
    setCountryScrollingIndex(index);
    setValue(FormConstants.Country, item.name);
    setIsCountryPicker(MapperConstants.StatusMapper.disable);
  };

  const onSaveClicked = async data => {
    const country = findCountryByName(data.country);
    let code = '';

    if (country) {
      const [countryCode, countryData] = country;

      code = countryCode;
      // console.log(`Country Code: ${countryCode}`);
      // console.log('Country Data:', countryData);
    }

    if (!documents) {
      setDocError(true);
      return false;
    }

    const payload = {
      street_address: data.street_address,
      street_address2: data.street_address2,
      country_of_residence: code,
      address_photo: documents,
      document_type: documentType,
      comment: data.Comment,
      state: data.state,
      postal_code: data.postal_code,
      city: data.city,
    };

    dispatch(AppActions.updateLoading(Loader.PROOF_OF_RESIDENCE));

    const response = await makeRequestNew(
      MapperConstants.ApiTypes.POST,
      APIConstants.POR_DOCUMENTS,
      {},
      payload,
    );

    console.log(response.data);

    if (response.status === 200) {
      showToast(
        '',
        `${
          documentType === 'business' ? 'Business' : ''
        } Proof Of Residence is succesfully submitted`,
        'success',
      );

      dispatch(AppActions.getUserProfile());
      setShowPorForm(false);
    } else if (response.data?.error.message === 'id_not_verified') {
      showToast(
        '',
        'Please complete your KYC verification before proceeding.',
        'error',
      );
    } else {
      showToast('', 'Something went wrong', 'error');
    }
    dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
  };

  function findCountryByName(searchName) {
    return Object.entries(countries?.countries).find(
      ([key, country]) => country.name === searchName,
    );
  }

  const handlePicker = (value: any) => () => {
    switch (value) {
      case 1:
        setIsCountryPicker(MapperConstants.StatusMapper.enable);
        break;
      case 2:
        // setIsCodePicker(MapperConstants.StatusMapper.enable);
        break;
    }
  };

  return (
    <>
      <KeyboardAwareScrollView
        contentContainerStyle={[
          commonStyles.paddingHorizontalView,
          {paddingBottom: 20},
        ]}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={34}>
        <DismissKeyboardView>
          <PORForm
            control={control}
            setValue={setValue}
            handlePicker={handlePicker}
            errors={errors}
            docError={docError}
            setDocError={setDocError}
            getValues={getValues}
            setDocuments={setDocuments}
            documentType={documentType}
          />
          <SelectCountry
            isVisible={isCountryPicker}
            setIsVisible={setIsCountryPicker}
            selectedCountry={selectedCountry}
            scrollingIndex={countryScrollingIndex}
            setScrollingIndex={setCountryScrollingIndex}
            handleCountry={handleCountry}
          />
        </DismissKeyboardView>
      </KeyboardAwareScrollView>
      <View style={commonStyles.paddingHorizontalView}>
        <ThemeButton
          text="Submit"
          onClickHandler={handleSubmit(onSaveClicked)}
          loading={appData.loading === Loader.PROOF_OF_RESIDENCE ? true : false}
        />
      </View>
    </>
  );
};

export default VerifyPOR;
