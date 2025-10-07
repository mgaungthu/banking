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

const UpateContactDetail = ({
  isVisible,
  setIsVisible,
  userProfileData,
  ...props
}: any) => {
  const {appTheme, isRtlApproach} = useSelector(
    (state: any) => state.globalReducer,
  );

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

  const {
    control,
    formState: {errors},
    setValue,
    getValues,
    reset,
    handleSubmit,
  } = useForm();

  useEffect(() => {
    setValue(FormConstants.Phone1, `${userProfileData?.phone_1 || ''}`);
    setValue(FormConstants.Phone2, `${userProfileData?.phone_2 || ''}`);
    setValue(FormConstants.Email2, userProfileData?.alternate_email || '');
  }, [userProfileData]);

  const updateContactDetails = async () => {
    setLoading(true);
    const data = {
      alternate_email: getValues(FormConstants.Email2),
      phone_1: getValues(FormConstants.Phone1),
      phone_2: getValues(FormConstants.Phone2),
      otp: getValues(FormConstants.TFA),
    };

    const response = await makeRequestNew(
      MapperConstants.ApiTypes.PATCH,
      APIConstants.CONTACT_DETAILS_UPDATE,
      {},
      data,
    );

    if (response.status === 200) {
      setIsVisible(MapperConstants.StatusMapper.disable);
      showToast('', 'Update Contact Detail Successfully', 'info');
      dispatch(AppActions.getUserProfile());
      reset();
    }
    setLoading(false);
  };

  return (
    <CustomModal
      visibility={isVisible}
      style={[
        isKeyboardVisible && isIOS()
          ? [styles.modals, {bottom: keyboardHeight - 10}]
          : styles.modals,
        ThemeFunctions.setBackground(appTheme),
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
            {strings('Update Contact Details')}
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

        <View
          style={[commonStyles.rowView, commonStyles.paddingHorizontalView]}>
          <View style={[commonStyles.halfWidth, {paddingEnd: 8}]}>
            <Input
              id={FormConstants.Phone1}
              label={strings('mobile_no_1')}
              placeholder={strings('mobile_no_1')}
              control={control}
              errors={errors}
              isFieldFilledBg={false}
              isRequired={true}
            />
          </View>
          <View style={[commonStyles.halfWidth]}>
            <Input
              id={FormConstants.Phone2}
              label={`${strings('mobile_no_2')} (Optional)`}
              placeholder={strings('mobile_no_2')}
              control={control}
              errors={errors}
              isFieldFilledBg={false}
              isRequired={false}
            />
          </View>
        </View>
        <View style={commonStyles.paddingHorizontalView}>
          <Input
            id={FormConstants.Email2}
            label={`${strings('email2')}`}
            placeholder={strings('email2')}
            control={control}
            errors={errors}
            isFieldFilledBg={false}
            // errorMsg={err}
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

          <View
            style={[
              commonStyles.rowView,
              commonStyles.paddingHorizontalView,
              {marginTop: 20},
            ]}>
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
                onClickHandler={handleSubmit(updateContactDetails)}
                loading={isloading}
              />
            </View>
          </View>
        </View>
      </View>
    </CustomModal>
  );
};

export default UpateContactDetail;
