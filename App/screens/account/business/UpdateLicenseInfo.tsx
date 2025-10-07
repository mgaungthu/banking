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
  Cell,
} from '../../../components';

import {strings} from '../../../strings';
import {SCREEN_HEIGHT, ThemeFunctions} from '../../../utils';
import {CheckBox, Icon} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import Colors, {rapunzelTheme} from '../../../theme/Colors';
import {modalStyles as styles} from '../../gbex/styles';
import {commonStyles, rtlStyles} from '../../../globalstyles/styles';
import * as Images from '../../../assets';
import {APIConstants, AppConstants, MapperConstants} from '../../../constants';
import {isIOS} from '../../../utils/DeviceConfig';
import {FormConstants, Loader} from '../../../enums';
// import {InnerStyles} from './AccountView';
import {makeRequestNew} from '../../../services/ApiService';
import {AppActions} from '../../../store';
import {showToast} from '../../../utils/GenericUtils';
import {accountFeeStyles} from '../styles';

const UpdateLicenseInfo = ({
  isVisible,
  setIsVisible,
  userProfileData,
  ...props
}: any) => {
  const {appTheme, isRtlApproach, appColor} = useSelector(
    (state: any) => state.globalReducer,
  );

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isloading, setLoading] = useState(false);
  const [checkBoxValue, setCheckBoxValue] = useState(false);
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

  const {
    control,
    formState: {errors},
    setValue,
    getValues,
    reset,
    handleSubmit,
  } = useForm();

  useEffect(() => {
    if (userProfileData.business_license_information) {
      setCheckBoxValue(
        userProfileData.business_license_information.licensed ? true : false,
      );

      setValue(
        FormConstants.LicenseType,
        userProfileData.business_license_information.license_type,
      );
      setValue(
        FormConstants.LicenseNumber,
        userProfileData.business_license_information.license_number,
      );
      setValue(
        FormConstants.LicenseComments,
        userProfileData.business_license_information.license_comments,
      );
    }
  }, [userProfileData]);

  const updateContactDetails = async () => {
    // setLoading(true);
    const data = {
      licensed: checkBoxValue,
      license_type: getValues(FormConstants.LicenseType),
      license_number: getValues(FormConstants.LicenseNumber),
      license_comments: getValues(FormConstants.LicenseComments),
    };

    console.log(data);

    const response = await makeRequestNew(
      MapperConstants.ApiTypes.PATCH,
      APIConstants.BUSINESS_LICENSE_INFORMATION,
      {},
      data,
    );

    // console.log(response.data);
    if (response.status === 200) {
      setLoading(false);
      setIsVisible(MapperConstants.StatusMapper.disable);
      showToast('', 'Update License Information Successfully', 'success');
      dispatch(AppActions.getUserProfile());
      reset();
    } else if (response.data.errors.alternate_email) {
      // serErr(response.data.errors.alternate_email[0]);
      showToast('', 'Something went wrong', 'error');
      setLoading(MapperConstants.StatusMapper.disable);
    }
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
            {strings('Update License Information')}
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
          <Cell
            style={{flexWrap: 'wrap'}}
            onPress={() => setCheckBoxValue(!checkBoxValue)}>
            <CheckBox
              center
              checked={checkBoxValue}
              containerStyle={accountFeeStyles.checkbox}
              checkedColor={ThemeFunctions.getColor(appColor)}
              onPress={() => setCheckBoxValue(!checkBoxValue)}
            />
            <ThemeText>{strings('Licensed')}</ThemeText>
          </Cell>

          <View style={commonStyles.rowView}>
            <View style={[commonStyles.halfWidth, {paddingEnd: 8}]}>
              <Input
                id={FormConstants.LicenseType}
                label={strings('License Type')}
                placeholder={strings('License Type')}
                control={control}
                errors={errors}
                isFieldFilledBg={false}
              />
            </View>
            <View style={[commonStyles.halfWidth]}>
              <Input
                id={FormConstants.LicenseNumber}
                label={strings('License Number')}
                placeholder={strings('License Number')}
                control={control}
                errors={errors}
                isFieldFilledBg={false}
              />
            </View>
          </View>

          <Input
            id={FormConstants.LicenseComments}
            label={strings('License Comments')}
            placeholder={strings('License Type')}
            control={control}
            errors={errors}
            isFieldFilledBg={false}
          />
        </View>

        <View style={commonStyles.paddingHorizontalView}>
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

export default UpdateLicenseInfo;
