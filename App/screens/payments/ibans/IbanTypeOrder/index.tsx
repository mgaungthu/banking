import React, {useRef, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {useForm} from 'react-hook-form';
import {
  DismissKeyboardView,
  Input,
  ThemeButton,
  ThemeText,
  Header,
} from '../../../../components';
import {strings} from '../../../../strings';
import {useSelector, useDispatch} from 'react-redux';
import {commonStyles} from '../../../../globalstyles/styles';
import {AppActions} from '../../../../store';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormView from './FormView';

import {FormConstants, Loader, Screen} from '../../../../enums';
import SelectOrderAs from './SelectOrderAs';
import {APIConstants, MapperConstants} from '../../../../constants';
import SelectWallet from './SelectWallet';
import {makeRequestNew} from '../../../../services/ApiService';
import {showToast} from '../../../../utils/GenericUtils';
import {navigate} from '../../../../utils';

const IbanTypeOrder = (props: any) => {
  const {
    control,
    formState: {errors},
    setValue,
    getValues,
    handleSubmit,
    trigger,
  } = useForm();

  const [isStakeModelOpen, setStakeModelOpen] = useState(
    MapperConstants.StatusMapper.disable,
  );
  // const [stake, setStake] = useState<any>('');
  const [scrollingIndex, setScrollingIndex] = useState(0);
  // const [currencyId, setCurrencyId] = useState(null);
  // const [stakeID, setStakeID] = useState(null);

  const [isWalletModelOpen, setWalletModelOpen] = useState(
    MapperConstants.StatusMapper.disable,
  );
  const [wallet, setWallet] = useState<any>('');
  const [walletType, setWalletType] = useState();
  const [walletAmount, setWalletAmount] = useState(0);
  const [walletScrollingIndex, setWalletScrollingIndex] = useState(0);
  const [walletId, setWalletId] = useState(null);
  const [totalSetupFee, setTotalSetupFee] = useState(0);
  const [orderAS, setOrderAS] = useState();

  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(AppActions.getUserProfile());
  }, [dispatch]);

  const {appTheme, appColor, assetMetadata} = useSelector(
    (state: any) => state.globalReducer,
  );

  const appData = useSelector((state: any) => state.appReducer);

  const {
    route: {params},
  } = props;

  const ParamData = params.item;

  const {fundsList} = useSelector((state: any) => state.quickBuyReducer);
  const {userProfileData} = useSelector((state: any) => state.appReducer);

  useEffect(() => {
    if (wallet) {
      const res = fundsList.find(item => item.symbol === wallet);
      const usdValueSelectedCurrency = shiftDecimalPlaces(
        res.currency.usd_value,
        12,
      );
      const total = ParamData.setup_fee / usdValueSelectedCurrency;
      setTotalSetupFee(total);
    }
  }, [wallet]);

  const shiftDecimalPlaces = (value, decimals = 12) => {
    let numStr = value.toString();

    numStr = numStr.replace('.', '');

    let newDecimalPosition = numStr.length - 12;

    if (newDecimalPosition < 0) {
      numStr = '0'.repeat(Math.abs(newDecimalPosition)) + numStr;
      newDecimalPosition = 0;
    }

    const result =
      numStr.slice(0, newDecimalPosition) +
      '.' +
      numStr.slice(newDecimalPosition);

    return parseFloat(result);
  };

  const handleWallet = (item, index) => () => {
    setWallet(item.symbol);
    setWalletId(item.id);
    setWalletType(item.type);
    setWalletAmount(item.available);
    setWalletModelOpen(MapperConstants.StatusMapper.disable);
    setWalletScrollingIndex(index);
    setValue(FormConstants.Wallet, `${item.symbol} (${item.available})`);
    trigger(FormConstants.Wallet);
  };

  // const resetWalletValue = () => {
  //   setWallet('');
  //   setWalletId(null);
  //   setWalletScrollingIndex(0);
  //   setValue(FormConstants.Wallet, ``);
  // };

  const handlePicker = item => () => {
    if (item === 1) {
      setStakeModelOpen(MapperConstants.StatusMapper.enable);
    } else {
      setWalletModelOpen(MapperConstants.StatusMapper.enable);
    }
  };

  let orderAs = [{name: ''}];

  const fullName = `${userProfileData?.kyc_record.first_name} ${
    userProfileData?.kyc_record.middle_name || ''
  } ${userProfileData?.kyc_record.last_name || ''}`.trim();
  if (userProfileData?.kyc_record) {
    orderAs = [{name: fullName}];
  } else if (
    userProfileData?.kyc_record &&
    userProfileData?.is_business_account
  ) {
    orderAs = [
      {name: fullName},
      {name: userProfileData.business_basic_information?.name},
    ];
  }

  const updateOrder = item => {
    setOrderAS(item.name);
    setStakeModelOpen(false);
    setValue(FormConstants.OrderAS, item.name);
    trigger(FormConstants.OrderAS);
  };

  const orderNow = async data => {
    const payload = {
      order_as: userProfileData?.is_business_account ? 'BUSINESS' : 'RETAIL',
      iban_type_id: ParamData.id,
      pay_with: {
        type: walletType,
        id: walletId,
      },
      setup_fee: 100,
      voucher: data.Voucher,
    };

    if (walletAmount < totalSetupFee) {
      showToast('', 'Your currency have Insufficient Balance', 'error');
      return false;
    }

    dispatch(AppActions.updateLoading(Loader.IBANS_TYPES));
    const response = await makeRequestNew(
      MapperConstants.ApiTypes.POST,
      APIConstants.IBANS_REQUEST,
      {},
      payload,
    );

    if (response.status === 200) {
      showToast('IBANS', 'IBANS has been ordered successfully', 'success');
      navigate(Screen.IBANS, {});
    } else if (response.data.message === 'validation_failed') {
      showToast('IBANS', 'Invalid voucher code', 'error');
    }
    dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
  };

  return (
    <>
      <Header title={strings('IBANS')} />
      <KeyboardAwareScrollView
        contentContainerStyle={[
          commonStyles.paddingHorizontalView,
          {paddingBottom: 20},
        ]}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={34}>
        <DismissKeyboardView>
          <FormView
            control={control}
            setValue={setValue}
            errors={errors}
            data={ParamData}
            wallet={wallet}
            totalSetupFee={totalSetupFee}
            handlePicker={handlePicker}
          />
          <SelectOrderAs
            data={orderAs}
            isVisible={isStakeModelOpen}
            setIsVisible={setStakeModelOpen}
            updateOrderAS={updateOrder}
            setScrollingIndex={setScrollingIndex}
            scrollingIndex={scrollingIndex}
          />
          <SelectWallet
            currency={wallet}
            isVisible={isWalletModelOpen}
            setIsVisible={setWalletModelOpen}
            setCurrency={setWallet}
            updateToken={handleWallet}
            setScrollingIndex={setWalletScrollingIndex}
            scrollingIndex={walletScrollingIndex}
          />
        </DismissKeyboardView>
      </KeyboardAwareScrollView>
      <View style={commonStyles.paddingHorizontalView}>
        <ThemeButton
          text={'Order Now'}
          onClickHandler={handleSubmit(orderNow)}
          styleText={{textTransform: 'uppercase'}}
          loading={appData.loading === Loader.IBANS_TYPES}
        />
      </View>
    </>
  );
};

export default IbanTypeOrder;
