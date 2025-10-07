import {StyleSheet, ViewStyle} from 'react-native';
import colors from '../theme/Colors';
import fonts from '../theme/fonts';
import {t} from 'react-native-tailwindcss';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../utils';
import Colors, {lightTheme, darkTheme} from '../theme/Colors';

const backBtn: ViewStyle = {
  height: 40,
  width: 40,
  justifyContent: 'center',
};

const shadow = {
  borderRadius: 8,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,

  elevation: 2,
};

export const commonStyles = StyleSheet.create({
  noBorder: {borderBottomWidth: 0},
  paddingView: {paddingHorizontal: 2},
  flexDisplay: {
    ...t.flex1,
  },
  wrapContent: {flexWrap: 'wrap'},
  topPadding: {
    ...t.pT2,
  },
  backBtn: {
    ...backBtn,
    backgroundColor: lightTheme.primaryColor,
    ...shadow,
  },
  backBtnDark: {
    ...backBtn,
    backgroundColor: darkTheme.secondaryColor,
    ...shadow,
  },
  copy: {
    color: colors.cyan,
    fontFamily: fonts.UrdwinDemi,
    ...t.textXs,
    ...t.capitalize,
    ...t.textCenter,
  },
  justifyCenter: {
    ...t.justifyCenter,
    ...t.itemsCenter,
  },
  alignCenter: {
    ...t.itemsCenter,
  },
  justifySpace: {
    ...t.justifyBetween,
  },
  rowItem: {
    ...t.flexRow,
  },
  safeView: {
    // backgroundColor: Colors.themeColor,
    ...t.flex1,
  },
  halfWidth: {
    width: '50%',
  },
  scrollView: {
    paddingBottom: 100,
    ...t.pT1,
    ...t.pX4,
  },
  marginHorizontalView: {
    ...t.mX4,
  },
  paddingHorizontalView: {
    ...t.pX4,
  },
  marginVerticalView: {
    ...t.mY4,
  },
  tabSafeView: {
    backgroundColor: Colors.themeColor,
    ...t.flex1,
  },
  bgView: {
    height: SCREEN_HEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  logo: {
    height: 100,
    width: '74%',
    alignSelf: 'center',
    ...t.mT6,
    ...t.mB2,
  },
  textColor: {
    color: colors.textColor,
  },
  textUpperCase: {
    textTransform: 'uppercase',
  },
  generalPadding: {
    padding: '5%',
  },
  rowView: {
    flexDirection: 'row',
  },
  textUnderline: {
    textDecorationLine: 'underline',
  },
  separator: {
    backgroundColor: colors.borderColor,
    height: 1,
    width: '100%',
  },
  modalStyles: {
    position: 'absolute',
    bottom: -18,
    backgroundColor: colors.themeColor,
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
  },
  header: {
    height: 60,
    ...t.flex,
    ...t.flexRow,
    ...t.itemsCenter,
    ...t.pX3,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 22,
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    ...t.textWhite,
    ...t.capitalize,
  },
  uiheader: {
    height: 60,
    ...t.flex,
    ...t.flexRow,
    ...t.justifyBetween,
    ...t.itemsCenter,
  },
  absoluteTopPosition: {
    position: 'absolute',
    top: 0,
  },

  chartStyles: {
    width: '100%',
    height: 300,
  },
  graphPadding: {
    left: 60,
    bottom: 26,
    right: 20,
    top: 22,
  },
  verticalGraphLabel: {
    color: colors.white,
    fontFamily: fonts.PoppinsMedium,
    marginTop: 5,
    fontSize: 8,
  },
  horizontalGraphLabel: {
    color: colors.white,
    fontFamily: fonts.PoppinsMedium,
    marginTop: 5,
  },
  graphFilterLabelDefault: {
    color: colors.white,
    fontFamily: fonts.PoppinsMedium,
    fontSize: 14,
    paddingTop: 6,
    paddingBottom: 6,
    paddingStart: 10,
    paddingEnd: 10,
    margin: 6,
  },
  graphFilterLabelSelected: {
    color: Colors.white,
    fontFamily: fonts.PoppinsMedium,
    fontSize: 14,
    paddingTop: 6,
    paddingBottom: 6,
    paddingStart: 10,
    paddingEnd: 10,
    backgroundColor: colors.graphLineColor,
    borderRadius: 10,
    margin: 6,
  },
  graphFilterContainer: {
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: colors.graphBackgroundColor,
  },
  bullet1: {
    height: 6,
    width: 6,
    backgroundColor: Colors.white,
    borderRadius: 3,
    ...t.mR1,
  },
  bullet: {
    height: 6,
    width: 6,
    backgroundColor: Colors.white,
    borderRadius: 3,
    ...t.mT2,
    ...t.mR1,
  },
  graphStyles: {
    width: '100%',
    height: 310,
    paddingLeft: 2,
    marginBottom: 16,
  },
  largeSize: {
    fontSize: 16,
  },
  shadow: {
    ...shadow,
  },
  pdTabbar: {
    paddingBottom: 120,
  },
  bg_image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    position: 'absolute',
    top: 0,
    right: -30,
  },
  placeHolderText: {
    ...t.pT20,
    ...t.textCenter,
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    ...t.textWhite,
    ...t.capitalize,
    ...t.text3xl,
  },
});

export const rtlStyles = StyleSheet.create({
  reverseRow: {
    flexDirection: 'row-reverse',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  alignSelfEnd: {
    alignSelf: 'flex-end',
    ...t.pX4,
  },
  alignSelfStart: {
    alignSelf: 'flex-start',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  textRight: {
    textAlign: 'right',
  },
});

export const textStyles = StyleSheet.create({
  noteStyle: {
    ...t.textWhite,
    ...t.capitalize,
    ...t.textBase,
    fontFamily: fonts.PoppinsMedium,
  },
  heading: {
    ...t.textWhite,
    ...t.uppercase,
    ...t.textBase,
    fontFamily: fonts.UrdwinDemi,
  },
  notes: {
    fontSize: 14,
    ...t.textWhite,
    fontFamily: fonts.PoppinsMedium,
  },
  cyanText: {color: Colors.cyan, textTransform: 'capitalize'},
});

export const maintenanceAlertStyles = StyleSheet.create({
  maintenanceToastWrapper: {
    bottom: 0,
    position: 'absolute',
    width: '100%',
    padding: 20,
    paddingBottom: 50,
    borderBottomWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  maintenanceToastTitle: {
    paddingBottom: 10,
    fontWeight: '500',
  },
  socialMediaLinkContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 10,
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
});
