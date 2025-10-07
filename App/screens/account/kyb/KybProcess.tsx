import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {commonStyles, rtlStyles} from '../../../globalstyles/styles';
import * as Images from '../../../assets';
import {
  Background,
  DatePickerView,
  DismissKeyboardView,
  Header,
  ThemeButton,
} from '../../../components';
import {accountStyles as styles} from '../styles';
import {strings} from '../../../strings';
import KYCForm from './KybForm';
import {useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {AppActions} from '../../../store';
import {useDispatch, useSelector} from 'react-redux';
import {MapperConstants, AppConstants} from '../../../constants';
import {Loader, FormConstants} from '../../../enums';
import moment from 'moment';
import {ThemeFunctions} from '../../../utils';
import {SelectCountry} from '../../payments/common';
let option = {
  maximumDate: new Date(),
};
let option1 = {
  minimumDate: new Date(),
};

const KYBProcess = (props: any) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    getValues,
  } = useForm();
  // for country
  const [isCountryPicker, setIsCountryPicker] = useState(
    MapperConstants.StatusMapper.disable,
  );
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [countryScrollingIndex, setCountryScrollingIndex] = useState(0);

  const dispatch = useDispatch();
  const {userKycData, countries, loading} = useSelector(
    (state: any) => state.appReducer,
  );

  const globalData = useSelector((state: any) => state.globalReducer);

  const [type, setType] = useState<any>('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDate = selectedDate => {
    // if (event.type === 'set') {
    if (type === FormConstants.DOB) {
      setValue(
        FormConstants.DOB,
        moment(selectedDate).format(AppConstants.dateFormat),
      );
    }
    if (type === FormConstants.IssueDate) {
      setValue(
        FormConstants.IssueDate,
        moment(selectedDate).format(AppConstants.dateFormat),
      );
    }
    if (type === FormConstants.ExpiryDate) {
      setValue(
        FormConstants.ExpiryDate,
        moment(selectedDate).format(AppConstants.dateFormat),
      );
    }
    // }
    setShowDatePicker(false);
  };

  const createDate = () => {
    var date = new Date();
    date.setDate(date.getDate());
    date.setMonth(date.getMonth());
    if (type === FormConstants.DOB) {
      date.setFullYear(date.getFullYear() - 20);
    }
    if (type === FormConstants.IssueDate) {
      date.setFullYear(date.getFullYear() - 5);
    }
    if (type === FormConstants.ExpiryDate) {
      date.setFullYear(date.getFullYear() + 5);
    }
    return date;
  };
  const dobOption = () => {
    var date = new Date();
    date.setDate(date.getDate() - 1);

    let option = {
      maximumDate: date,
    };
    return option;
  };

  useEffect(() => {
    dispatch(AppActions.submitKycSuccess({}));
  }, []);
  useEffect(() => {
    dispatch(AppActions.getKycDetails());
  }, [dispatch]);
  useEffect(() => {
    if (userKycData) {
      AppActions.setKycDetails(userKycData, setValue, countries);
    }
  }, [userKycData]);

  const isExpirySame = () => {
    return moment(getValues(FormConstants.IssueDate)).isSame(
      getValues(FormConstants.ExpiryDate),
    );
  };
  const onSave = async (data: any) => {
    let payload = transformPayload(data);

    if (!isExpirySame()) {
      dispatch(AppActions.saveKycDetails(payload));
    }
  };
  const transformPayload = (data: any) => {
    let requestData = data;
    requestData.gender = MapperConstants.GenderMapper[data.gender];
    requestData.user_id = globalData.userdata.uniqueId;
    requestData.country_id = countries.find(
      res => res.name === data.country,
    ).shortName;
    requestData.country_code = requestData.country_id;
    delete requestData.country;
    return requestData;
  };

  const onSubmit = async (data: any) => {
    let payload = transformPayload(data);
    delete payload.country_code;

    if (!isExpirySame()) {
      dispatch(AppActions.submitKycDetails(payload));
    }
  };
  // for country
  const handleCountry = (item, index) => () => {
    setSelectedCountry(item.uniqueId);
    setCountryScrollingIndex(index);
    setValue(FormConstants.Country, item.name);
    setIsCountryPicker(MapperConstants.StatusMapper.disable);
  };

  return (
    <SafeAreaView
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(globalData.appTheme),
      ]}>
      <Header title={strings('kyc')} />
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollView}>
        <DismissKeyboardView>
          <View
            style={[
              styles.cardView,
              ThemeFunctions.getCardColor(globalData.appTheme),
              globalData.isRtlApproach ? {paddingEnd: 10} : {},
            ]}>
            <Text
              style={[
                styles.personal,
                {color: ThemeFunctions.customText(globalData.appTheme)},
              ]}>
              {strings('personal_details')}
            </Text>
            <Text
              style={[
                styles.desc,
                {color: ThemeFunctions.customText(globalData.appTheme)},
              ]}>
              {strings('kyc_screen_title')}
            </Text>
          </View>
          <DatePickerView
            isDatePickerVisible={showDatePicker}
            date={createDate()}
            options={
              type === FormConstants.DOB
                ? dobOption()
                : type === FormConstants.ExpiryDate
                ? option1
                : option
            }
            onChange={handleDate}
            hideDatePicker={() => setShowDatePicker(false)}
          />

          <KYCForm
            control={control}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
            isExpirySame={isExpirySame}
            setType={setType}
            setShowDatePicker={setShowDatePicker}
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
      <View
        style={[
          styles.btnContainer,
          globalData.isRtlApproach ? rtlStyles.reverseRow : {},
        ]}>
        <View style={styles.btn}>
          <ThemeButton
            text="save"
            onClickHandler={handleSubmit(onSave)}
            loading={loading === Loader.SAVE_KYC_DATA ? true : false}
          />
        </View>
        <View style={{width: 5}} />
        <View style={styles.btn}>
          <ThemeButton
            text="submit"
            onClickHandler={handleSubmit(onSubmit)}
            loading={loading === Loader.SUBMIT_KYC_DATA ? true : false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default KYBProcess;
