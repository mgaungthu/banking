import React, {useEffect, useState} from 'react';
import {Keyboard, View} from 'react-native';
import {commonStyles} from '../../../globalstyles/styles';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import _ from 'lodash';
import {ThemeFunctions} from '../../../utils';
import AddBeneficiaryForm from './AddBeneficiaryForm';
import {DismissKeyboardView, Space, ThemeButton} from '../../../components';
import {FormConstants, Loader} from '../../../enums';
import {PaymentActions} from '../../../store';
import {MapperConstants} from '../../../constants';
import SelectToken from '../deposit/SelectToken';

const AddBeneficiary = (props: any) => {
  const dispatch = useDispatch();
  const {appTheme} = useSelector((state: any) => state.globalReducer);
  const appData = useSelector((state: any) => state.appReducer);
  const {userProfileData} = useSelector((state: any) => state.appReducer);

  const [isModal, setIsModal] = useState(MapperConstants.StatusMapper.disable);
  const [currency, setCurrency] = useState<any>('');
  const [scrollingIndex, setScrollingIndex] = useState(0);
  const [currencyId, setCurrencyId] = useState(null);

  const {
    control,
    formState: {errors},
    setValue,
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    if (props.activeIndex === 0) resetToIntialValues();
  }, [props.activeIndex]);

  useEffect(() => {
    setValue(FormConstants.Currency_Label, currency);
  }, [currency]);

  const resetToIntialValues = () => {};

  const onSubmit = async (data: any) => {
    let payload = {
      ...data,
      curId: currencyId,
      type: 'global',
    };

    if (userProfileData?.two_fa_enabled === 1) {
      payload.otp = data.tfa;
    }

    dispatch(PaymentActions.addBeneficiary(payload, reset));
    Keyboard.dismiss();
  };

  const handlePicker = () => () => {
    setIsModal(MapperConstants.StatusMapper.enable);
  };

  const handleCurrency = (item, index) => () => {
    setCurrency(item.symbol);
    setCurrencyId(item.currency.id);
    setIsModal(MapperConstants.StatusMapper.disable);
    setScrollingIndex(index);
  };

  return (
    <View
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      <KeyboardAwareScrollView
        contentContainerStyle={[
          commonStyles.paddingHorizontalView,
          {paddingBottom: 20},
        ]}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={34}>
        <DismissKeyboardView>
          <AddBeneficiaryForm
            control={control}
            errors={errors}
            handlePicker={handlePicker}
            userProfileData={userProfileData}
          />
          <SelectToken
            currency={currency}
            isVisible={isModal}
            setIsVisible={setIsModal}
            setCurrency={setCurrency}
            updateToken={handleCurrency}
            setScrollingIndex={setScrollingIndex}
            scrollingIndex={scrollingIndex}
          />
          <Space height={50} />
        </DismissKeyboardView>
      </KeyboardAwareScrollView>
      <View style={commonStyles.paddingHorizontalView}>
        <ThemeButton
          text="submit"
          onClickHandler={handleSubmit(onSubmit)}
          loading={appData.loading === Loader.ADDING_BENEFICIARY ? true : false}
        />
      </View>
    </View>
  );
};

export default AddBeneficiary;
