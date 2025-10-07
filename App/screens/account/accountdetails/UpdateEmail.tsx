import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, Keyboard} from 'react-native';
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
import {InnerStyles} from './AccountView';
import {makeRequestNew} from '../../../services/ApiService';
import {AppActions} from '../../../store';
import {showToast} from '../../../utils/GenericUtils';
import fonts from '../../../theme/fonts';

const UpdateEmail = ({isVisible, setIsVisible, userData}: any) => {
  const {appTheme, isRtlApproach} = useSelector(
    (state: any) => state.globalReducer,
  );
  const appData = useSelector((state: any) => state.appReducer);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isloading, setLoading] = useState(false);
  const dispatch = useDispatch<any>();

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

  const changeEmail = async () => {
    // alert('here');
    // setLoading(true);

    const data = {
      new_email_address: getValues(FormConstants.NewEmail),
      otp_email: getValues(FormConstants.OTP),
      otp: getValues(FormConstants.TFA),
      email_verification_code: '',
    };
    dispatch(AppActions.updateLoading(Loader.CHANGE_EMAIL));
    const response = await makeRequestNew(
      MapperConstants.ApiTypes.PUT,
      APIConstants.CHANGEG_EMAIL,
      {},
      data,
    );

    console.log(response.data);
    if (response.status === 200) {
      // setLoading(false);
      showToast('', 'Your email have succesfully updated', 'sucess');

      setIsVisible(false);
    } else if (response.data.message === 'two_fa_incorrect_code') {
      showToast('', 'Two Factor Authentication Code is incorrect', 'error');
    } else {
      showToast(
        '',
        'Please try again later or get in touch with our support',
        'error',
      );
    }
    dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
  };

  const handleOTP = async () => {
    setLoading(true);
    const response = await makeRequestNew(
      MapperConstants.ApiTypes.GET,
      APIConstants.ONE_TIME_PASSWORD,
    );

    if (response.status === 200) {
      setLoading(false);
    }
  };

  const {
    control,
    formState: {errors},
    setValue,
    getValues,
    reset,
    handleSubmit,
  } = useForm();

  return (
    <CustomModal
      visibility={isVisible}
      style={[
        isKeyboardVisible && isIOS()
          ? [styles.modals, {bottom: keyboardHeight - 10}]
          : styles.modals,
        ThemeFunctions.setBackground(appTheme),
        userData.two_fa_enabled && {height: SCREEN_HEIGHT * 0.68},
      ]}>
      <View>
        <View
          style={[styles.header, isRtlApproach ? rtlStyles.reverseRow : {}]}>
          <View style={{width: 10}} />
          <ThemeText
            style={[
              styles.headerText,
              {color: ThemeFunctions.customText(appTheme)},
            ]}
            adjustsFontSizeToFit={true}>
            {strings('update_email')}
          </ThemeText>
          <TouchableOpacity
            onPress={() => {
              setIsVisible(MapperConstants.StatusMapper.disable);
              reset();
            }}
            style={[
              commonStyles.backBtn,
              ThemeFunctions.setBackground(appTheme),
              {marginRight: 8},
            ]}>
            <Icon
              name="close"
              iconStyle={{transform: [{scaleX: isRtlApproach ? -1 : 1}]}}
              type="material"
              size={22}
              color={
                ThemeFunctions.isRapunzelTheme(appTheme)
                  ? rapunzelTheme.magenta
                  : Colors.gray
              }
            />
          </TouchableOpacity>
        </View>
        <View style={commonStyles.paddingHorizontalView}>
          <Input
            id={FormConstants.NewEmail}
            label={strings('New Email')}
            placeholder={`${strings('New Email')} Address`}
            control={control}
            errors={errors}
            isFieldFilledBg={false}
            isRequired={true}
          />

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
          {userData.two_fa_enabled === 1 && (
            <Input
              id={FormConstants.TFA}
              label={strings('Two Factor Authentication Code')}
              placeholder={`${strings('Two Factor Authentication Code')}`}
              control={control}
              errors={errors}
              isFieldFilledBg={false}
              isRequired={true}
            />
          )}

          <View
            style={[commonStyles.rowView, commonStyles.paddingHorizontalView]}>
            <View style={[commonStyles.halfWidth, {paddingEnd: 8}]}>
              <View>
                <ThemeButton
                  text={'Cancel'}
                  styleText={{textTransform: 'none'}}
                  styleButton={{backgroundColor: '#ccc'}}
                  onClickHandler={() => {
                    setIsVisible(MapperConstants.StatusMapper.disable);
                    reset();
                  }}
                />
              </View>
            </View>
            <View style={[commonStyles.halfWidth, {paddingEnd: 8}]}>
              <ThemeButton
                text={'Change'}
                styleText={{textTransform: 'none'}}
                onClickHandler={handleSubmit(changeEmail)}
                loading={appData.loading === Loader.CHANGE_EMAIL ? true : false}
              />
            </View>
          </View>
        </View>
      </View>
    </CustomModal>
  );
};

export default UpdateEmail;
