import React, {useEffect, useRef, useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  SafeAreaView,
  Platform,
} from 'react-native';
import {formStyles as styles} from '../../account/styles';
import {formStyles} from '../../../components/forms/styles';
import {
  CustomModal,
  DropDown,
  Input,
  ThemeButton,
  ThemeText,
  UiHeader,
} from '../../../components';
import {FormConstants, Loader, Screen} from '../../../enums';
import {strings} from '../../../strings';
import {APIConstants, AppConstants, MapperConstants} from '../../../constants';
import {commonStyles} from '../../../globalstyles/styles';
import {creditCardStyles} from '../styles';
import {useDispatch, useSelector} from 'react-redux';
import {ThemeFunctions} from '../../../utils';
import Colors, {rapunzelTheme} from '../../../theme/Colors';
import {Icon} from 'react-native-elements';
import {IcQuickSwapLight, IcQuickSwapDark} from '../../../assets';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import {makeRequest} from '../../../services/ApiService';
import {AppActions, QuickBuyActions} from '../../../store';
import {useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {showToast} from '../../../utils/GenericUtils';
import {ApiCreditCard} from '../../../constants/AppConstants';
import Navigation from '../../../utils/Navigation';
import {CurrentConfig} from '../../../../api_config';

export default ({dataCreditCard}) => {
  const appData = useSelector((state: any) => state.appReducer);

  const {
    control,
    formState: {errors},
    setValue,
    getValues,
    handleSubmit,
    reset,
  } = useForm();

  const {appTheme} = useSelector((state: any) => state.globalReducer);
  const {userProfileData} = useSelector((state: any) => state.appReducer);

  const [address, setAddress] = useState<{address: string; tag?: string}>({
    address: '',
    tag: undefined,
  });

  const dispatch = useDispatch();

  const getAddressDetails = async (currency: string) => {
    try {
      const response = await makeRequest(
        MapperConstants.ApiTypes.POST,
        APIConstants.GET_ADDRESS,
        {},
        {
          exchangeId: CurrentConfig.exchange_id,
          tokenSymbol: currency,
          uniqueId: userProfileData.uniqueId,
        },
      );

      if (response.status != 200) {
        showToast(
          strings('deposit_credit'),
          'error while generating address',
          'error',
        );
      }

      const {address = '', destinationTag} = response.message.data;

      setAddress({address, tag: destinationTag});
    } catch (e) {
      console.log(e);

      showToast(
        strings('deposit_credit'),
        'error while generating address',
        'error',
      );
    }
  };

  const onSubmit = async data => {
    try {
      const selectedCurrency = data.currency;

      dispatch(AppActions.updateLoading(Loader.CREDIT_CARD));

      let cryptoWalletAddress = {
        address: address.address,
        currencyCode: selectedCurrency,
      };
      if (selectedCurrency === 'XRP') {
        cryptoWalletAddress['tag'] = address.tag;
      }
      const response = await makeRequest(
        MapperConstants.ApiTypes.POST,
        APIConstants.GLOBIANCE_WIDGET_REQUEST,
        {},
        {
          locale: 'en',
          passwordless: false,
          trustedKyc: true,
          partnerUserId: userProfileData.uniqueId,
          cryptoWalletAddress,
        },
      );
      dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
      if (response.status === 200) {
        Navigation.navigate(Screen.GlobianceDepositWidget, {
          data: response.data.requestId,
        });
      } else showToast(strings('deposit_credit'), response.message, 'error');
    } catch (error) {
      showToast(strings('deposit_credit'), 'Error', 'error');
    }
  };

  const RenderAddress = () => {
    if (!address.address) return <></>;

    return (
      <View style={[formStyles.container]}>
        <View
          style={{
            borderColor: ThemeFunctions.customText(appTheme),
            borderWidth: 0.5,
            marginBottom: 20,
          }}></View>

        <View
          style={[
            ThemeFunctions.getCardColor(appTheme),
            formStyles.inputView,
            {padding: 10},
          ]}>
          <ThemeText numberOfLines={4}>{strings('gb_widget_note_1')}</ThemeText>
        </View>

        <ThemeText style={formStyles.label}>{strings('address')}</ThemeText>

        <View
          style={[
            ThemeFunctions.getCardColor(appTheme),
            formStyles.inputView,
            {padding: 10},
          ]}>
          <ThemeText numberOfLines={2}>{address.address}</ThemeText>
        </View>

        {address.tag ? (
          <>
            <ThemeText style={formStyles.label}>
              {strings('destination_tag')}
            </ThemeText>

            <View
              style={[
                ThemeFunctions.getCardColor(appTheme),
                formStyles.inputView,
                {padding: 10},
              ]}>
              <ThemeText numberOfLines={2}>{address.tag}</ThemeText>
            </View>
          </>
        ) : (
          <></>
        )}
      </View>
    );
  };

  let buttonEnabled = false;

  if (getValues(FormConstants.Currency) && address.address) {
    buttonEnabled = true;
  }

  return (
    <View
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      <View style={commonStyles.flexDisplay}>
        <KeyboardAwareScrollView
          contentContainerStyle={commonStyles.scrollView}>
          <DropDown
            options={dataCreditCard?.supportedCurrencies || []}
            customHeight={120}
            customTextStyle={{textTransform: 'uppercase'}}
            updateValue={index => {
              setValue(
                FormConstants.Currency,
                dataCreditCard?.supportedCurrencies[index],
              );
              getAddressDetails(dataCreditCard?.supportedCurrencies[index]);
            }}>
            <Input
              id={FormConstants.Currency}
              label={strings('currency_label')}
              placeholder={`${strings('select')}`}
              control={control}
              errors={errors}
              isRequired={true}
              isFieldFilledBg={false}
              dropdown={true}
              showTick={false}
            />
          </DropDown>

          <RenderAddress />
        </KeyboardAwareScrollView>
        <View style={commonStyles.paddingHorizontalView}>
          <ThemeButton
            text={strings('submit')}
            disabled={!buttonEnabled}
            loading={appData.loading === Loader.CREDIT_CARD ? true : false}
            onClickHandler={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </View>
  );
};
