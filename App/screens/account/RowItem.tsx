import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {rtlStyles} from '../../globalstyles/styles';
import * as Images from '../../assets';
import {Cell, ImageContainer, Radio, ThemeText} from '../../components';
import {accountStyles as styles, securityStyles} from './styles';
import {strings} from '../../strings';
import {useDispatch, useSelector} from 'react-redux';
import * as BiometricService from '../../services/BiometricService';
import {MapperConstants} from '../../constants';
import Navigation from '../../utils/Navigation';
import {showToast} from '../../utils/GenericUtils';
import {BiometryType, Screen} from '../../enums';
import {ThemeFunctions} from '../../utils';
import {GlobalActions} from '../../store';
import {formStyles} from '../../components/forms/styles';
import {t} from 'react-native-tailwindcss';
import IconVector from '../../components/ui/IconVector';
import fonts from '../../theme/fonts';

const RowItem = (props: any) => {
  const {res, enableBiometry} = props;

  const {isRtlApproach, appTheme, isBioAuthConfigure, biometryType} =
    useSelector((state: any) => state.globalReducer);
  const [isAvailable, setIsAvailable] = useState(
    MapperConstants.StatusMapper.disable,
  );
  const dispatch = useDispatch();
  const isReverseView = () => {
    return isRtlApproach ? rtlStyles.reverseRow : {};
  };
  useEffect(() => {
    if (res.id === 1) {
      checkAvailibility();
    }
  }, []);

  const checkAvailibility = async () => {
    const resp = await BiometricService.checkBiometryAvailability();
    setIsAvailable(resp);
  };

  const handleRoute = async () => {
    switch (res.id) {
      case 1:
        const Available = await BiometricService.checkBiometryAvailability();
        if (!Available) {
          showToast(strings('enable_bioauth'), strings('bioauth_msg'), 'info');
        } else {
          if (isBioAuthConfigure) {
            // enableBiometry();
            dispatch(
              GlobalActions.setBiometry(MapperConstants.StatusMapper.disable),
            );
          } else {
            enableBiometry();
          }
        }
        break;
      default:
        Navigation.navigate(res.route, {
          fromScreen: Screen.Security,
        });
    }
  };
  const textColor = () => {
    return ThemeFunctions.customText(appTheme);
  };
  return (
    <Cell
      onPress={handleRoute}
      style={{justifyContent: 'space-between'}}
      key={res.id}>
      <View style={{flex: 1}}>
        <ThemeText style={{fontFamily: fonts.PoppinsBold, fontWeight: 'bold'}}>
          {res.id === 1
            ? strings(res.title, {
                key:
                  biometryType !== BiometryType.Unknown
                    ? BiometricService.bioAuthMapper(biometryType)
                    : strings('bio_auth'),
              })
            : strings(res.title)}
        </ThemeText>
        {res.desc && (
          <ThemeText
            style={[
              styles.titleDesc,
              {color: ThemeFunctions.customText(appTheme)},
            ]}>
            {strings(res.desc)}
          </ThemeText>
        )}
      </View>
      <View style={styles.rightIcon}>
        {res.id === 1 ? (
          <>{isBioAuthConfigure && <Radio active={true} />}</>
        ) : (
          <IconVector.Entypo
            name="chevron-thin-right"
            size={16}
            color={ThemeFunctions.customText(appTheme)}
          />
        )}
      </View>
    </Cell>
    // <>
    //   <TouchableOpacity
    //     activeOpacity={1}
    //     key={res.id}
    //     onPress={handleRoute}
    //     style={[securityStyles.item, isReverseView()]}>
    //     <View style={[styles.leftView, isReverseView()]}>
    //       {res.icon && (
    //         <ImageContainer imagePath={res.icon} imgStyle={styles.leftIcon} />
    //       )}
    //       <View>
    //         <Text
    //           style={[
    //             securityStyles.label,
    //             isRtlApproach
    //               ? {marginEnd: 10, color: textColor()}
    //               : {color: textColor()},
    //           ]}>
    //           {res.id === 1
    //             ? strings(res.title, {
    //                 key:
    //                   biometryType !== BiometryType.Unknown
    //                     ? BiometricService.bioAuthMapper(biometryType)
    //                     : strings('bio_auth'),
    //               })
    //             : strings(res.title)}
    //         </Text>
    //         {res.id === 1 && (
    //           <Text
    //             numberOfLines={2}
    //             style={[styles.bottomMsg, {color: textColor()}]}>
    //             {strings('enable_biometric')}
    //           </Text>
    //         )}
    //       </View>
    //     </View>
    //     {res.route && (
    //       <ImageContainer
    //         imagePath={Images.IcForwardArrow}
    //         imgStyle={[styles.rightIcon, ThemeFunctions.imgColor(appTheme)]}
    //       />
    //     )}
    //     {res.id === 1 && (
    //       <>
    //         {isBioAuthConfigure ? (
    //           <ImageContainer
    //             imagePath={Images.IcVerified}
    //             noTransform={true}
    //             imgStyle={formStyles.rightIcon}
    //           />
    //         ) : (
    //           <ImageContainer
    //             imagePath={Images.IcForwardArrow}
    //             imgStyle={[styles.rightIcon, ThemeFunctions.imgColor(appTheme)]}
    //           />
    //         )}
    //       </>
    //     )}
    //   </TouchableOpacity>
    //   <View
    //     style={[securityStyles.line, ThemeFunctions.borderLineColor(appTheme)]}
    //   />
    // </>
  );
};

export default RowItem;
