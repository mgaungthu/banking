import React, {useRef, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {useForm} from 'react-hook-form';
import {
  DismissKeyboardView,
  Input,
  ThemeButton,
  ThemeText,
} from '../../../components';
import {strings} from '../../../strings';
import {useSelector, useDispatch} from 'react-redux';
import {commonStyles} from '../../../globalstyles/styles';
import {AppActions} from '../../../store';
import {isIOS} from '../../../utils/DeviceConfig';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormView from './FormView';
import Header from '../Header';
import {AppFunctions, navigate, ThemeFunctions} from '../../../utils';
import {homeStyles} from '../../home/styles';
import IconVector from '../../../components/ui/IconVector';
import {FormConstants, Loader, Screen} from '../../../enums';
import SelectStake from './SelectStake';
import {APIConstants, MapperConstants} from '../../../constants';
import SelectWallet from './SelectWallet';
import {makeRequestNew} from '../../../services/ApiService';
import {showToast} from '../../../utils/GenericUtils';

const StakingForm = (props: any) => {
  const {
    control,
    formState: {errors},
    setValue,
    reset,
    getValues,
    handleSubmit,
  } = useForm();

  const [isStakeModelOpen, setStakeModelOpen] = useState(
    MapperConstants.StatusMapper.disable,
  );
  const [stake, setStake] = useState<any>('');
  const [currencyId, setCurrencyId] = useState(null);
  const [stakeID, setStakeID] = useState(null);

  const [walletId, setWalletId] = useState(null);
  const [available, setAvailable] = useState();

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

  const data = params.data;

  // console.log(data);
  const quickBuyData = useSelector((state: any) => state.quickBuyReducer);

  useEffect(() => {
    setValue(
      FormConstants.Stake,
      `${data.currency.symbol} - ${strings(data.term)}: ${data.rate}%`,
    );

    const filteredData = quickBuyData?.fundsList?.find(e => {
      return e.symbol === data.currency.symbol;
    });

    setValue(
      FormConstants.Wallet,
      `${data.currency.symbol} (${AppFunctions.standardDigitConversion(
        filteredData?.available,
      )})`,
    );
    setStake(data.currency.symbol);
    setStakeID(data.id);
    setCurrencyId(data.currency.id);
    setWalletId(filteredData.id);
    setAvailable(filteredData?.available);
  }, [params.data]);

  const earnNow = async data => {
    const payload = {
      currency_id: '',
      stake_id: stakeID,
      wallet_id: walletId,
      amount: data.amount.replace(/,/g, ''),
    };

    dispatch(AppActions.updateLoading(Loader.STAKE));
    const response = await makeRequestNew(
      MapperConstants.ApiTypes.POST,
      APIConstants.STAKE,
      {},
      payload,
    );

    console.log(response.data);

    if (response.data.message === 'investment.stake.required_card_missing') {
      // alert('here');
      showToast(
        'Stake',
        'This stake requires card ownership to invest',
        'error',
      );
    } else if (
      response.data.message === 'investment.stake.intended_amount_low'
    ) {
      showToast(
        'Stake',
        'Amount is below the minimum allowed stake investment',
        'error',
      );
    } else if (
      response.data.message === 'currency-settings.validation_failed'
    ) {
      showToast('Stake', 'The Amount must be greater than 0.', 'error');
    } else if (
      response.data?.error?.code === 403 &&
      response.data?.error?.message === 'por_required'
    ) {
      showToast(
        strings('Stake'),
        strings('You need to be POR verified to do this action'),
        'error',
      );
    } else if (
      response.data.error?.code === 403 &&
      response.data.error?.message === 'kyc_and_por_required_general'
    ) {
      showToast(
        strings('Stake'),
        strings('You need to be KYC verified to do this action'),
        'error',
      );
    }
    if (response.status === 200) {
      showToast('Stake', 'Stake Investment successfully', 'success');
      navigate(Screen.StakingHistory, {});
      reset();
    } else {
      if (response.data.message === 'investment.stake.intended_amount_high') {
        showToast('', 'Amount is exceeds allowed stake investment', 'error');
      }
    }

    dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
  };

  return (
    <>
      <Header
        title={strings('staking')}
        right={
          <View style={[{flexDirection: 'row'}]}>
            <TouchableOpacity
              onPress={() => navigate(Screen.StakingHistory)}
              style={[
                homeStyles.profileBtn,
                ThemeFunctions.setIEOCardBG(appTheme),
              ]}>
              <IconVector.FontAwesome5
                name="history"
                color={ThemeFunctions.getCurrentTextColor(appTheme)}
                size={22}
              />
            </TouchableOpacity>
          </View>
        }
      />
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
            selectedStake={stakeID}
            available={available}
          />
        </DismissKeyboardView>
      </KeyboardAwareScrollView>

      <View style={commonStyles.paddingHorizontalView}>
        <ThemeButton
          text={'Earn Now'}
          onClickHandler={handleSubmit(earnNow)}
          styleText={{textTransform: 'uppercase'}}
          loading={appData.loading === Loader.STAKE}
        />
      </View>
    </>
  );
};

export default StakingForm;
