import {Platform, StyleSheet} from 'react-native';
import fonts from '../../theme/fonts';
import {t} from 'react-native-tailwindcss';
import Colors from '../../theme/Colors';
import {SCREEN_HEIGHT} from '../../utils';

export const otpStyles = StyleSheet.create({
  label: {
    fontFamily: fonts.PoppinsMedium,
    ...t.text2xl,
    ...t.textWhite,
    ...t.textCenter,
  },
  container: {
    paddingTop: SCREEN_HEIGHT * 0.05,
    alignItems: 'center',
  },
  container1: {
    paddingTop: SCREEN_HEIGHT * 0.09,
    alignItems: 'center',
  },
  underlineStyleBaseInvalid: {
    width: 45,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 2.8,
    borderBottomColor: Colors.danger,
    fontSize: 22,
    fontFamily: fonts.UrdwinDemi,
  },
  underlineStyleBase: {
    width: 45,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 2.8,
    borderBottomColor: Colors.grayBlue,
    fontSize: 22,
    fontFamily: fonts.UrdwinDemi,
  },
  borderStylesInvalid: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: Colors.danger,
    fontSize: 22,
    fontFamily: fonts.UrdwinDemi,
    borderRadius: 6,
    backgroundColor: Colors.otpInputColor,
  },

  borderStyles: {
    width: 45,
    height: 45,
    borderWidth: 0.5,
    borderColor: Colors.grayBlue,
    fontSize: 22,
    fontFamily: fonts.UrdwinDemi,
    borderRadius: 6,
    backgroundColor: Colors.otpInputColor,
  },

  underlineStyleHighLighted: {
    borderColor: Colors.white,
  },
  otpInput: {width: '70%', height: 90, ...t.pL3},
  marginView: {
    ...t.mT8,
  },
});

export const bioAuthStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: SCREEN_HEIGHT,
  },
  img: {
    height: 100,
    width: 100,
  },
  authMsg: {
    fontFamily: fonts.UrdwinDemi,
    ...t.textWhite,
    ...t.textBase,
    ...t.textCenter,
    ...t.pX5,
    ...t.pY2,
  },
  bioAuth: {
    fontFamily: fonts.UrdwinDemi,
    ...t.textWhite,
    ...t.textXl,
    ...t.textCenter,
    ...t.uppercase,
    ...t.pT4,
  },
  btnContainer: {
    width: '100%',
  },
  skip: {...t.pY3, borderRadius: 6, marginTop: -10},
  lock: {
    height: 40,
    width: 40,
    alignSelf: 'center',
  },
  locked: {
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    ...t.textWhite,
    ...t.textXl,
    ...t.textCenter,
    ...t.uppercase,
    ...t.pY4,
  },
});

export const confirmationStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    ...t.pT6,
  },
  faceIcon: {
    height: 38,
    width: 38,
    ...t.mB4,
  },
  btn: {width: '100%', ...t.pX4},
});

export const verifyPasscodeStyles = StyleSheet.create({
  header: {
    // alignItems:'flex-end',
    ...t.pY2,
  },
  close: {
    height: 30,
    width: 50,
  },
  lock: {
    height: 45,
    width: 40,
    alignSelf: 'center',
  },
  label: {
    fontFamily: fonts.PoppinsMedium,
    ...t.textBase,
    ...t.textWhite,
    ...t.pT6,
    ...t.pB2,
    fontSize: 24,
  },
  container: {
    paddingTop: SCREEN_HEIGHT * 0.1,
  },
  forgotText: {
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    fontSize: 15,
    color: Colors.grayBlue,
  },
  btnContainer: {
    width: '100%',
    ...t.pX4,
    ...t.pY6,
  },
  text: {
    width: '86%',
    alignItems: 'center',
  },
  passcodeMsg: {
    fontFamily: fonts.UrdwinDemi,
    color: Colors.black,
    fontSize: 12,
    ...t.pY2,
  },
  reset: {
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    color: Colors.black,
    fontSize: 20,
  },
});
