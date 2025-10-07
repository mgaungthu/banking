import colors from '../../theme/Colors';
import {StyleSheet} from 'react-native';
import {t} from 'react-native-tailwindcss';

import fonts from '../../theme/fonts';
import {StatusBarHeight, SCREEN_WIDTH} from '../../utils';

export const appStyles = StyleSheet.create({
  popup: {
    backgroundColor: colors.white,
    ...t.pX4,
    ...t.pY5,
    ...t.itemsCenter,
    ...t.mX4,
    alignSelf: 'center',
    borderRadius: 5,
  },
  msg: {
    fontFamily: fonts.UrdwinDemi,
    fontSize: 15,
    ...t.textCenter,
    ...t.pB2,
  },
  title: {
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    fontSize: 20,
    ...t.mB4,
    ...t.capitalize,
  },
  btn: {
    width: SCREEN_WIDTH - 80,
    justifyContent: 'center',
  },
  btnStyle: {
    width: (SCREEN_WIDTH - 90) / 2,
  },
});
