import {Dimensions, StyleSheet} from 'react-native';
import fonts from '../../theme/fonts';
import {t} from 'react-native-tailwindcss';
import Colors from '../../theme/Colors';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../utils';

export const loginStyles = StyleSheet.create({
  formView: {
    ...t.p2,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 5,
  },
});
export const verificationStyles = StyleSheet.create({
  popupViewFull: {
    backgroundColor: Colors.white,
    width: SCREEN_WIDTH,
    position: 'absolute',
    bottom: 0,
    ...t.pT6,
    ...t.pX4,
    height: SCREEN_HEIGHT,
    ...t.pB1,
  },
  paddingHorizontalView: {
    ...t.pX4,
  },
  modals: {
    backgroundColor: Colors.white,
    width: SCREEN_WIDTH,
    position: 'absolute',
    bottom: 0,
    ...t.pY4,
    ...t.pX4,
  },
  focusedModals: {
    backgroundColor: Colors.white,
    width: SCREEN_WIDTH,
    position: 'absolute',
    ...t.pY4,
    ...t.pX4,
  },
  popupView1: {
    backgroundColor: Colors.white,
    width: SCREEN_WIDTH,
    position: 'absolute',
    ...t.pY6,
    ...t.pX4,
  },
  popupView: {
    backgroundColor: Colors.white,
    width: SCREEN_WIDTH,
    position: 'absolute',
    bottom: 0,
    ...t.pY6,
    ...t.pX4,
  },
  inputContainer: {
    ...t.pX2,
  },
  heading: {
    fontSize: 17,
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    ...t.textBlack,
    ...t.mB2,
  },
  closeBtn: {
    alignSelf: 'flex-end',
    ...t.justifyCenter,
    ...t.h8,
    ...t.w10,
  },
  closeBtn1: {
    alignSelf: 'flex-start',
    ...t.justifyCenter,
    ...t.h8,
    ...t.w10,
  },
  resendView1: {
    alignSelf: 'flex-start',
    ...t.mR4,
    ...t.mT4,
    ...t.flexRow,
  },
  resendView: {
    alignSelf: 'flex-end',
    ...t.mR4,
    ...t.mT4,
    ...t.flexRow,
  },
  timer: {
    color: Colors.cyan,
    fontFamily: fonts.UrdwinDemi,
    ...t.textBase,
    ...t.mR2,
  },
  resendText: {
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    fontSize: 15,
  },
  resendBtn: {
    borderBottomColor: Colors.darkBlue,
    borderBottomWidth: 2,
  },
  txtInfo: {
    fontSize: 16,
    fontFamily: fonts.UrdwinDemi,
    ...t.textBlack,
    ...t.mB2,
  },
});

export const authStyles = StyleSheet.create({
  smallText: {
    fontSize: 16,
    color: Colors.white,
    fontFamily: fonts.PoppinsRegular,
  },
  linkText: {
    fontSize: 16,
    color: Colors.txtBlue,
    fontFamily: fonts.PoppinsRegular,
  },
  languagePicker: {
    alignSelf: 'flex-end',
    ...t.flexRow,
    ...t.itemsCenter,
    ...t.pX4,
    ...t.pY2,
  },
  language: {
    fontSize: 15,
    color: Colors.white,
    fontFamily: fonts.PoppinsRegular,
    marginEnd: 5,
    textTransform: 'capitalize',
  },
  forgotPasswordContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  textReg: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: fonts.PoppinsRegular,
  },
});
