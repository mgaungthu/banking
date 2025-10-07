import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Keyboard} from 'react-native';
import {useForm} from 'react-hook-form';
import {
  ImageContainer,
  CustomModal,
  ModalSearch,
  ThemeText,
  Input,
  ThemeButton,
} from '../../../components';

import {strings} from '../../../strings';
import {SCREEN_HEIGHT, ThemeFunctions} from '../../../utils';
import {Icon} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import Colors, {rapunzelTheme} from '../../../theme/Colors';
import {modalStyles as styles} from '../../gbex/styles';
import {commonStyles, rtlStyles} from '../../../globalstyles/styles';
import * as Images from '../../../assets';
import {APIConstants, AppConstants, MapperConstants} from '../../../constants';
import {isIOS} from '../../../utils/DeviceConfig';
import {FormConstants, Loader} from '../../../enums';
import {makeRequestNew} from '../../../services/ApiService';
import {AppActions} from '../../../store';
import {showToast} from '../../../utils/GenericUtils';
import fonts from '../../../theme/fonts';

const DeleteAccount = ({control, errors, userProfileData, ...props}: any) => {
  const {appTheme, isRtlApproach} = useSelector(
    (state: any) => state.globalReducer,
  );

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isloading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        setKeyboardHeight(e.endCoordinates.height);
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleOTP = async () => {
    setLoading(true);
    const response = await makeRequestNew(
      MapperConstants.ApiTypes.GET,
      APIConstants.ONE_TIME_PASSWORD,
    );

    if (response.status === 200) {
      setLoading(false);
      showToast('', 'Otp already sent, Please check your email', 'info');
    }
  };

  return (
    <View>
      <ThemeText style={{paddingTop: 10}}>
        Warning: This action will delete your account. All coins/tokens and all
        wallets in your account will be deleted.{'\n'}
        {'\n'}There is no way to revert this action.{'\n'}
        {'\n'}Are you sure to continue?
      </ThemeText>
      <View
        style={[InnerStyles.borderBottom, commonStyles.marginVerticalView]}
      />
      <ThemeText
        style={{
          color: ThemeFunctions.customText(appTheme),
          fontFamily: fonts.PoppinsBold,
          fontWeight: 'heavy',
        }}>
        {strings('2fa')}
      </ThemeText>
      <ThemeButton
        text={'Send Email Verification Code'}
        styleText={{textTransform: 'none'}}
        styleButton={{marginBottom: 0}}
        onClickHandler={handleOTP}
        loading={isloading}
      />
      <Input
        id={FormConstants.OTP}
        // label={strings('new_email')}
        placeholder={'One Time Password Sent to Your Email'}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={true}
      />
      {userProfileData.two_fa_enabled === 1 && (
        <Input
          id={FormConstants.TFA}
          label={`${strings('Two Factor Authentication Code')}`}
          placeholder={strings('Two Factor Authentication Code')}
          control={control}
          errors={errors}
          isFieldFilledBg={false}
          // errorMsg={err}
          isRequired={true}
        />
      )}
    </View>
  );
};

export default DeleteAccount;

export const InnerStyles = StyleSheet.create({
  borderBottom: {borderBottomColor: '#c4c4c4', borderBottomWidth: 1},
  marginTop: {marginTop: 20},
});
