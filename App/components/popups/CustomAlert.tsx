import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {commonStyles, rtlStyles} from '../../globalstyles/styles';
import * as Images from '../../assets';
import CustomModal from '../hoc/CustomModal';
import ThemeButton from '../ui/ThemeButton';
import ImageContainer from '../ui/Logo';

import {strings} from '../../strings';
import {Icon} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';

import {customAlertStyles as styles} from '../ui/styles';
import Colors from '../../theme/Colors';
import {MapperConstants} from '../../constants';
import {AppActions, GlobalActions, AuthActions} from '../../store';
import Navigation from '../../utils/Navigation';
import {Screen} from '../../enums';
import {setItem} from '../../utils';

const CustomAlert = (props: any) => {
  const dispatch = useDispatch<any>();
  const {isRtlApproach} = useSelector((state: any) => state.globalReducer);
  const {isCustomAlert, alertData} = useSelector(
    (state: any) => state.appReducer,
  );

  const onClose = () => {
    let payload = {
      isCustomAlert: MapperConstants.StatusMapper.disable,
      alertData: {
        message: '',
        title: '',
        isConfirmation: true,
        type: '',
      },
    };
    dispatch(AppActions.updateAlertData(payload));
  };

  const handleUpdate = async () => {
    const {type} = alertData;
    let payload = {
      isCustomAlert: MapperConstants.StatusMapper.disable,
      alertData: {
        message: '',
        title: '',
        isConfirmation: true,
        type: '',
      },
    };
    if (type === 'logout') {
      await dispatch(GlobalActions.updateUserdata(null));
      await dispatch(AuthActions.updateLoginResponse({}));
      setItem('tfa_status', null);
      dispatch(AppActions.updateAlertData(payload));
      Navigation.navigate(Screen.Auth, {});
    }
  };
  return (
    <CustomModal visibility={isCustomAlert} animationType={'fade'}>
      <View style={styles.container}>
        <View
          style={[styles.header, isRtlApproach ? rtlStyles.reverseRow : {}]}>
          <Text style={styles.warning}>{strings('warning')}</Text>
          <TouchableOpacity style={commonStyles.backBtn} onPress={onClose}>
            <Icon name="close" type="material" size={22} color={Colors.gray} />
          </TouchableOpacity>
        </View>
        <View
          style={[
            commonStyles.rowItem,
            styles.logoutMsg,
            isRtlApproach ? rtlStyles.reverseRow : {},
          ]}>
          <ImageContainer
            imagePath={Images.IcWarning}
            imgStyle={styles.warningIc}
          />
          <Text
            style={[styles.logout, isRtlApproach ? {marginHorizontal: 6} : {}]}
            numberOfLines={3}
            adjustsFontSizeToFit={true}>
            {strings('logout_alert')}
          </Text>
        </View>
        <View style={styles.btn}>
          <ThemeButton
            text="ok"
            onClickHandler={handleUpdate}
            loading={false}
            isModal={MapperConstants.StatusMapper.enable}
          />
          <ThemeButton
            text="cancel"
            onClickHandler={onClose}
            loading={false}
            isModal={MapperConstants.StatusMapper.enable}
          />
        </View>
      </View>
    </CustomModal>
  );
};

export default CustomAlert;
