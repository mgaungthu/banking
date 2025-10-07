import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Text, View, Image} from 'react-native';
import {commonStyles, rtlStyles} from '../../../globalstyles/styles';
import {Cell, ImageContainer, ThemeText} from '../../../components';
import {styles} from './styles';
import {strings} from '../../../strings';
import {useDispatch, useSelector} from 'react-redux';
import {navigate, ThemeFunctions} from '../../../utils';
import {Screen} from '../../../enums';
import {AppActions} from '../../../store';

const RowItem = (props: any) => {
  const {title, value} = props;

  const {isRtlApproach, appTheme} = useSelector(
    (state: any) => state.globalReducer,
  );

  const dispatch = useDispatch();
  const isReverseView = () => {
    return isRtlApproach ? rtlStyles.reverseRow : {};
  };

  const handleRoute = async () => {
    if (res.route) {
      if (res.route === Screen.Deposit) {
        dispatch(AppActions.getCountries());
      }
      navigate(res.route, {});
    }
  };

  const textColor = () => {
    return ThemeFunctions.customText(appTheme);
  };

  return (
    <View style={[styles.box, ThemeFunctions.setIEOCardBG(appTheme)]}>
      {/* <Image source={res.image} style={styles.image} /> */}
      <ThemeText style={styles.title}>{strings(title)}</ThemeText>
      <ThemeText style={styles.title}>{strings(value)}</ThemeText>
    </View>
  );

  // return (
  //   <>
  //     <Cell
  //       key={res.id}
  //       onPress={handleRoute}
  //       style={[securityStyles.item, isReverseView()]}>
  //       <View style={[styles.leftView, isReverseView()]}>
  //         {res.icon && (
  //           <ImageContainer imagePath={res.icon} imgStyle={styles.leftIcon} />
  //         )}
  //         <View>
  //           <ThemeText
  //             style={[
  //               securityStyles.label,
  //               isRtlApproach
  //                 ? { marginEnd: 10 }
  //                 : { },
  //             ]}>
  //             {strings(res.title)}
  //           </ThemeText>
  //         </View>
  //       </View>
  //       <IconVector.Ant
  //         name='arrowright'
  //         size={22}
  //         style={styles.rightIcon}
  //         color={ThemeFunctions.getCurrentTextColor(appTheme)}
  //       />
  //     </Cell>
  //   </>
  // )
};

export default RowItem;
