import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {commonStyles, rtlStyles} from '../../../globalstyles/styles';
import * as Images from '../../../assets';
import CustomModal from '../../../components/hoc/CustomModal';
import ThemeButton from '../../../components/ui/ThemeButton';
import ImageContainer from '../../../components/ui/Logo';

import {strings} from '../../../strings';
import {Icon} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';

import {customAlertStyles as styles} from '../../../components/ui/styles';
import Colors from '../../../theme/Colors';
import {MapperConstants} from '../../../constants';
import {AppActions, GlobalActions, AuthActions} from '../../../store';
import Navigation from '../../../utils/Navigation';
import {Screen} from '../../../enums';
import {setItem} from '../../../utils';

const ConfirmModel = (props: any) => {
  const {isRtlApproach} = useSelector((state: any) => state.globalReducer);
  const {visible, setModelShow, text, navigate, handleForm} = props;

  const onClose = () => {
    setModelShow(false);
  };

  const handleUpdate = async () => {
    if (!handleForm) {
      navigate(Screen.PORScreen, {verify: 'business'});
    } else {
      handleForm();
    }
    setModelShow(false);
  };
  return (
    <CustomModal visibility={visible} animationType={'fade'}>
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
            style={[
              styles.logout,
              isRtlApproach ? {marginHorizontal: 6, fontWeight: '100'} : {},
            ]}
            numberOfLines={3}
            adjustsFontSizeToFit={true}>
            {text}
          </Text>
        </View>
        <View
          style={[commonStyles.rowView, commonStyles.paddingHorizontalView]}>
          <View style={[commonStyles.halfWidth, {paddingEnd: 8}]}>
            <ThemeButton
              text="Continue"
              onClickHandler={handleUpdate}
              loading={false}
              isModal={MapperConstants.StatusMapper.enable}
            />
          </View>
          <View style={[commonStyles.halfWidth, {paddingEnd: 8}]}>
            <ThemeButton
              text="cancel"
              onClickHandler={onClose}
              loading={false}
              isModal={MapperConstants.StatusMapper.enable}
              styleButton={{backgroundColor: '#ccc'}}
            />
          </View>
        </View>
      </View>
    </CustomModal>
  );
};

export default ConfirmModel;
