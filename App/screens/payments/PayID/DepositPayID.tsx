import React, {useEffect, useState} from 'react';
import {Keyboard, View} from 'react-native';
import {commonStyles} from '../../../globalstyles/styles';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import _ from 'lodash';
import {ThemeFunctions} from '../../../utils';

import {
  DismissKeyboardView,
  Space,
  ThemeButton,
  ThemeText,
} from '../../../components';
import {FormConstants, Loader} from '../../../enums';
import {PaymentActions} from '../../../store';
import {APIConstants, MapperConstants} from '../../../constants';
import DepositForm from './DepositForm';
import {makeRequestNew} from '../../../services/ApiService';
import {t} from 'react-native-tailwindcss';

const DepositPayID = (props: any) => {
  const [payIDdata, setPayIDdata] = useState(null);
  const dispatch = useDispatch<any>();
  const {appTheme} = useSelector((state: any) => state.globalReducer);
  const appData = useSelector((state: any) => state.appReducer);
  const {userProfileData} = useSelector((state: any) => state.appReducer);

  const {
    control,
    formState: {errors},
    setValue,
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    fetchPAYID();
  }, [props.activeIndex]);

  useEffect(() => {
    setValue(FormConstants.AccountNumber, payIDdata?.account_number);
    setValue(FormConstants.BSB, payIDdata?.bsb);
    setValue(FormConstants.PayIDName, payIDdata?.pay_id_name);
    setValue(FormConstants.PayID, payIDdata?.pay_id);
    setValue(FormConstants.Status, payIDdata?.status);
    fetchPAYID();
  }, [payIDdata]);

  const fetchPAYID = async () => {
    const resp = await makeRequestNew(
      MapperConstants.ApiTypes.GET,
      APIConstants.DEPOSIT_PAYID,
    );
    setPayIDdata(
      resp.data
        ? Object.keys(resp.data).length === 0
          ? null
          : resp.data
        : null,
    );
  };

  const onSubmit = async (data: any) => {
    const resp = await makeRequestNew(
      MapperConstants.ApiTypes.POST,
      APIConstants.DEPOSIT_PAYID,
    );

    console.log(resp);
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
          {payIDdata?.account_number ? (
            <>
              <ThemeText style={{...t.mT3}}>
                You can deposit funds to your account using PayID.
              </ThemeText>
              <DepositForm
                control={control}
                errors={errors}
                payId={payIDdata?.pay_id || null}
                userProfileData={userProfileData}
              />
            </>
          ) : (
            <>
              <ThemeText style={{...t.mT3}}>
                You need to register your PayID before you can use it for
                deposits.
              </ThemeText>
              <ThemeButton
                text="Register"
                onClickHandler={handleSubmit(onSubmit)}
                loading={
                  appData.loading === Loader.ADDING_BENEFICIARY ? true : false
                }
              />
            </>
          )}

          <Space height={50} />
        </DismissKeyboardView>
      </KeyboardAwareScrollView>
      {/* <View style={commonStyles.paddingHorizontalView}>
        <ThemeButton
          text="submit"
          onClickHandler={handleSubmit(onSubmit)}
          loading={appData.loading === Loader.ADDING_BENEFICIARY ? true : false}
        />
      </View> */}
    </View>
  );
};

export default DepositPayID;
