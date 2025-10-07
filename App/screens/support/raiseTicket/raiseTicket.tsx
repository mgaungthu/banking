import React from 'react';
import {SafeAreaView, View} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {commonStyles} from '../../../globalstyles/styles';
import {
  DismissKeyboardView,
  Header,
  ThemeButton,
  ThemeText,
} from '../../../components';
import {strings} from '../../../strings';
import {useSelector} from 'react-redux';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ThemeFunctions} from '../../../utils';

import {APIConstants, MapperConstants} from '../../../constants';

import {CurrentConfig} from '../../../../api_config';
import {formStyles} from '../../../components/forms/styles';
import {
  CommonDropdownItem,
  DropdownBottomModal,
} from '../../../components/modal/DropdownBottomModal';
import _ from 'lodash';
import {makeRequest, makeRequestNew} from '../../../services/ApiService';
import {showToast} from '../../../utils/GenericUtils';
import DeleteAccount from './DeleteAccount';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {AuthActions, GlobalActions} from '../../../store';

// const subjects = [
//   {label: 'OTP Issue', value: 'OTP Issue'},
//   {label: 'Crypto Deposit', value: 'Crypto Deposit'},
//   {label: 'Crypto Withdrawal', value: 'Crypto Withdrawal'},
//   {label: 'Token Swaping', value: 'Token Swaping'},
//   {label: 'Wallet Queries', value: 'Wallet Queries'},
//   {label: 'Trade Issues', value: 'Trade Issues'},
//   {label: 'Close My Account', value: 'Close My Account'},
//   {label: 'Other Query', value: 'Other Query'},
// ];

const RaiseTicket = (props: any) => {
  // let defaultSubject;
  // let paramSubject = props?.route?.params?.defaultSubject;

  // if (paramSubject && subjects.map(x => x.label).includes(paramSubject)) {
  //   defaultSubject = {value: paramSubject, label: paramSubject};
  // }
  const appData = useSelector((state: any) => state.appReducer);
  const {appTheme} = useSelector((state: any) => state.globalReducer);
  const {userProfileData} = useSelector((state: any) => state.appReducer);
  const token = useSelector(
    (state: any) => state.globalReducer?.userdata?.token,
  );

  const dispatch = useDispatch<any>();

  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm();

  const submit = async data => {
    const requestObject = {
      otp_email: data.otp,
      otp: data.tfa,
      email_verification_code: '',
    };
    const response = await makeRequestNew(
      MapperConstants.ApiTypes.PUT,
      APIConstants.DELETE_ACCOUNT,
      {},
      requestObject,
    );

    console.log(response.data);

    if (response.status === 200) {
      // setLoading(false);
      showToast('', 'Your account have succesfully Deleted', 'sucess');
      handleLogout();
    } else if (response.data.message === 'two_fa_incorrect_code') {
      showToast('', 'Two Factor Authentication Code is incorrect', 'error');
    }
  };

  const deleteTokenFCM = async () => {
    try {
      const tokenFCM = await messaging().getToken();
      await makeRequest(
        MapperConstants.ApiTypes.DELETE,
        APIConstants.DELETE_DEVICE_FCM,
        {},
        {tokenDevice: tokenFCM},
      );
      makeRequest(
        MapperConstants.ApiTypes.POST,
        APIConstants.CLOSE_USER_MOBILE_SESSION,
        {},
        {
          tokenId: token,
          status: false,
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    deleteTokenFCM();

    dispatch(GlobalActions.updateFavouriteSuccess([]));
    dispatch(GlobalActions.updateMainCurrency({mainCurrency: 'USD'}));
    dispatch(GlobalActions.updateSecondaryCurrency({secondCurrency: 'BTC'}));
    dispatch(AuthActions.clearSession({token}));
    dispatch(GlobalActions.hideSmallBalances());
  };

  // let queryNote = <></>;

  // if (subject && subject.value === 'Close My Account') {
  //   queryNote = (
  //     <View style={{flex: 1}}>
  //       <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
  //         {strings('close_account_note')}
  //       </ThemeText>
  //     </View>
  //   );
  // }

  return (
    <SafeAreaView
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      {/* <Background imagePath={Images.BgLogin} /> */}
      <Header title={strings('Close Account')} />
      <KeyboardAwareScrollView
        contentContainerStyle={[
          commonStyles.paddingHorizontalView,
          {paddingBottom: 20},
        ]}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={34}>
        <DismissKeyboardView>
          <DeleteAccount
            control={control}
            errors={errors}
            userProfileData={userProfileData}
          />
        </DismissKeyboardView>
      </KeyboardAwareScrollView>
      <View style={commonStyles.paddingHorizontalView}>
        <ThemeButton
          text="Close Account"
          onClickHandler={handleSubmit(submit)}
        />
      </View>
    </SafeAreaView>
  );
};

export default RaiseTicket;
