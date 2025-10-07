import React, {useEffect, useState} from 'react';
import {Keyboard, View} from 'react-native';
import {commonStyles} from '../../../../globalstyles/styles';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import _ from 'lodash';
import {ThemeFunctions, AppFunctions} from '../../../../utils';
import BankTransferForm from './BankTransferForm';
import {DismissKeyboardView, Space, ThemeButton} from '../../../../components';
import {FormConstants, Loader} from '../../../../enums';
import SelectFrom from './SelectFrom';
import {APIConstants, MapperConstants} from '../../../../constants';
import {AppActions, PaymentActions} from '../../../../store';

import {SelectBeneficiary} from '../../common';

import SelectChannel from './SelectChannel';
import {makeRequestNew} from '../../../../services/ApiService';
import {showToast} from '../../../../utils/GenericUtils';

const BankTransfer = (props: any) => {
  const dispatch = useDispatch<any>();
  const {appTheme} = useSelector((state: any) => state.globalReducer);
  const appData = useSelector((state: any) => state.appReducer);
  const {activeIndex, params} = props;

  // for currency
  const [fromModalShow, setFromModalShow] = useState(
    MapperConstants.StatusMapper.disable,
  );
  const [currency, setCurrency] = useState<any>('');
  const [scrollingIndex, setScrollingIndex] = useState(0);
  const [IBanId, setIBanId] = useState(null);

  // for Benficiary
  const [isBenficiaryModal, setIsBenficiaryModal] = useState<Boolean>(
    MapperConstants.StatusMapper.disable,
  );
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<any>(null);
  const [beneficiaryScrollingIndex, setBeneficiaryScrollingIndex] = useState(0);

  // for type
  const [isChannelModal, setIsChannelModal] = useState(
    MapperConstants.StatusMapper.disable,
  );
  const [selectedChannel, setSelectedChannel] = useState<any>(null);
  const [selectedChannelFullValue, setSelectedChannelFullValue] =
    useState<any>(null);

  const resetToIntialValues = () => {
    reset();
    setScrollingIndex(0);
    setIBanId(null);
    setCurrency('');
    setSelectedChannelFullValue(null);
    setSelectedBeneficiary(null);
    // setTransfer();
  };

  // const {
  //   route: {params},
  // } = props;

  const {
    control,
    formState: {errors},
    setValue,
    getValues,
    handleSubmit,
    trigger,
    reset,
  } = useForm();

  useEffect(() => {
    if (params?.data) {
      handleDefaultValue();
    }
  }, [params?.data]);

  const handleDefaultValue = () => {
    const item = params.data;
    console.log(item?.iban_type?.fiat_currency?.symbol);
    setCurrency(item?.iban_type?.fiat_currency?.symbol);
    setIBanId(item.id);
    // setScrollingIndex(index);
    setValue(
      FormConstants.From,
      `${item?.iban} - ${item?.iban_type?.fiat_currency?.name} (${item?.available_balance})`,
    );
    trigger(FormConstants.From);
  };

  useEffect(() => {
    // if (activeIndex === 0) resetToIntialValues();
    dispatch(PaymentActions.getIBANSActiveList());
  }, [activeIndex]);

  const handleFrom = (item, index) => () => {
    setCurrency(item?.iban_type?.fiat_currency?.symbol);
    setFromModalShow(MapperConstants.StatusMapper.disable);
    setIBanId(item.id);
    setScrollingIndex(index);
    setValue(
      FormConstants.From,
      `${item?.iban} - ${item?.iban_type?.fiat_currency?.name} (${item?.available_balance})`,
    );
    trigger(FormConstants.From);

    setValue(FormConstants.Beneficiary, '');
    setBeneficiaryScrollingIndex('');
    setSelectedBeneficiary('');
    setSelectedChannel('');
    setValue(FormConstants.Channel, '');
  };

  const handleBeneficiary = (item, index) => () => {
    setSelectedBeneficiary(item.id);
    setIsBenficiaryModal(MapperConstants.StatusMapper.disable);
    setBeneficiaryScrollingIndex(index);
    setValue(
      FormConstants.Beneficiary,
      `${item?.name} - ${item?.bank_name} - ${item?.iban}`,
    );
    trigger(FormConstants.Beneficiary);
  };

  const handleChannel = (item, index) => {
    // console.log(item);
    setSelectedChannelFullValue(item.item);
    setSelectedChannel(item.value);
    setValue(FormConstants.Channel, item.value);
    setIsChannelModal(MapperConstants.StatusMapper.disable);
    trigger(FormConstants.Channel);
  };

  const handlePicker = (value: any) => () => {
    switch (value) {
      case 1:
        setFromModalShow(MapperConstants.StatusMapper.enable);
        break;
      case 2:
        setIsBenficiaryModal(MapperConstants.StatusMapper.enable);
        break;
      case 3:
        setIsChannelModal(MapperConstants.StatusMapper.enable);
        break;
    }
  };

  const onSubmit = async (data: any) => {
    const channel = selectedChannelFullValue;
    const payload = {
      channel: channel,
      amount: getValues(FormConstants.Amount),
      beneficiary_id: selectedBeneficiary,
      iban_id: IBanId,
      reference: getValues(FormConstants.Reference),
    };
    dispatch(AppActions.updateLoading(Loader.IBANS_TRANSFER));
    const response = await makeRequestNew(
      MapperConstants.ApiTypes.POST,
      APIConstants.IBANS_TRANSFER,
      {},
      payload,
    );

    if (response.status === 200) {
      showToast('', 'IBAN Transfer Succesfully', 'success');
      resetToIntialValues();
    }

    dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));

    Keyboard.dismiss();
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
          <BankTransferForm
            control={control}
            errors={errors}
            handlePicker={handlePicker}
            setValue={setValue}
            currency={currency}
            selectedChannelFullValue={selectedChannelFullValue}
          />
          <SelectFrom
            currency={currency}
            isVisible={fromModalShow}
            setIsVisible={setFromModalShow}
            setCurrency={setCurrency}
            updateFrom={handleFrom}
            setScrollingIndex={setScrollingIndex}
            scrollingIndex={scrollingIndex}
          />
          <SelectBeneficiary
            currencySymbol={currency}
            isVisible={isBenficiaryModal}
            setIsVisible={setIsBenficiaryModal}
            selectedBeneficiary={selectedBeneficiary}
            scrollingIndex={beneficiaryScrollingIndex}
            setScrollingIndex={setBeneficiaryScrollingIndex}
            handleBeneficiary={handleBeneficiary}
          />

          <SelectChannel
            isVisible={isChannelModal}
            currencySymbol={currency}
            setIsVisible={setIsChannelModal}
            selectedChannel={selectedChannel}
            handleChannel={handleChannel}
          />

          <Space height={50} />
        </DismissKeyboardView>
      </KeyboardAwareScrollView>
      <View style={commonStyles.paddingHorizontalView}>
        <ThemeButton
          text="Transfer"
          onClickHandler={handleSubmit(onSubmit)}
          loading={appData.loading === Loader.IBANS_TRANSFER ? true : false}
        />
      </View>
    </View>
  );
};

export default BankTransfer;
