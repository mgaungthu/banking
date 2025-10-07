import colors, {darkTheme, lightTheme} from '../../theme/Colors';
import {Platform, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {t} from 'react-native-tailwindcss';

import fonts from '../../theme/fonts';
import {StatusBarHeight, SCREEN_WIDTH, SCREEN_HEIGHT} from '../../utils';
import {isIOS} from '../../utils/DeviceConfig';
import {commonStyles} from '../../globalstyles/styles';
import Colors from '../../theme/Colors';
export const buttonStyles = StyleSheet.create({
  themeButtonContainer: {
    backgroundColor: colors.cyan,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    borderRadius: 6,
    ...t.pY3,
    ...t.mY6,
  },
  themeButton: {
    fontFamily: fonts.PoppinsMedium,
    ...t.textWhite,
    ...t.textBase,
    ...t.textCenter,
    ...t.capitalize,
    fontSize: 20,
    top: Platform.OS === 'ios' ? 2 : 0,
  },
  iconButton: {
    marginRight: 6,
  },
});
export const searchStyles = StyleSheet.create({
  searchInput: {
    fontFamily: fonts.PoppinsMedium,
    ...t.textWhite,
    ...t.textSm,
  },
  searchContainer: {
    backgroundColor: colors.borderBlue,
  },
});
export const noteStyles = StyleSheet.create({
  note: {
    fontFamily: fonts.PoppinsMedium,
    ...t.textWhite,
    ...t.textSm,
    ...t.capitalize,
  },
  noteView: {
    backgroundColor: colors.blue,
    ...t.p3,
    ...t.mB4,
    ...commonStyles.shadow,
    marginHorizontal: 20,
  },
  subtitle: {
    fontFamily: fonts.PoppinsRegular,
    ...t.textWhite,
    ...t.textXs,
  },
});
export const snackStyles = StyleSheet.create({
  msg: {
    color: colors.white,
    fontFamily: fonts.UrdwinDemi,
    fontSize: 15,
  },
  wrapper: {
    zIndex: 999,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: isIOS() ? StatusBarHeight : 0,
  },
  container: {backgroundColor: 'rgba(0,0,0,0.9)'},
});

export const customAlertStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginHorizontal: SCREEN_WIDTH * 0.05,
  },
  header: {
    ...t.flexRow,
    ...t.justifyBetween,
    ...t.itemsCenter,
    ...t.pL4,
  },
  warning: {
    fontFamily: fonts.PoppinsMedium,
    color: colors.gray,
    ...t.capitalize,
    ...t.textBase,
  },
  warningIc: {
    ...t.h6,
    ...t.w6,
  },
  logoutMsg: {
    ...t.itemsCenter,
    ...t.mX4,
    ...t.pY6,
    width: '85%',
  },
  logout: {
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    color: colors.black,
    fontSize: 18,
    ...t.mL1,
    ...t.mR2,
  },
  btn: {
    ...t.pX4,
  },
});

export const fallbackStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    ...commonStyles.paddingHorizontalView,
  },
  btn: {
    width: '100%',
  },
  error: {
    fontSize: 26,
    fontFamily: fonts.UrdwinCond_Demi,
  },
});

const cell: ViewStyle = {
  ...commonStyles.shadow,
  padding: 16,
  borderRadius: 8,
  marginVertical: 8,
  flexDirection: 'row',
  alignItems: 'center',
};

export const cellStyles = StyleSheet.create({
  container: {
    ...cell,
    backgroundColor: lightTheme.secondaryColor,
  },
  containerDark: {
    ...cell,
    backgroundColor: darkTheme.secondaryColor,
  },
});

const text: TextStyle = {
  fontSize: 16,
  fontWeight: '500',
  fontFamily: 'Poppins-Regular',
};

export const textStyles = StyleSheet.create({
  text: {
    ...text,
    color: lightTheme.text,
  },
  textDark: {
    ...text,
    color: darkTheme.text,
  },
});

const radio: ViewStyle = {
  height: 24,
  width: 24,
  borderRadius: 12,
};

export const radioStyles = StyleSheet.create({
  active: {
    ...radio,
    backgroundColor: Colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  default: {
    ...radio,
    borderWidth: 1.5,
    borderColor: Colors.borderGray,
  },
});

export const percentBoxStyles = StyleSheet.create({
  percentBox: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: 10,
  },
});

export const sideStyles = StyleSheet.create({
  side: {
    width: 22,
    height: 22,
    borderRadius: 4,
    backgroundColor: '#f51b4b',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    marginRight: 2,
  },
  textSide: {
    fontSize: 16,
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    color: 'white',
  },
});

export const screenOverlayStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    position: 'absolute',
    zIndex: 999,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    position: 'absolute',
    zIndex: 999,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
