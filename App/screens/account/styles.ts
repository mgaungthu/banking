import {StyleSheet} from 'react-native';
import Colors, {rapunzelTheme} from '../../theme/Colors';
import fonts from '../../theme/fonts';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../utils';
import {t} from 'react-native-tailwindcss';
import {isIOS} from '../../utils/DeviceConfig';
import {commonStyles} from '../../globalstyles/styles';

export const accountStyles = StyleSheet.create({
  version: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: 12,
    ...t.textWhite,
    ...t.pX5,
    ...t.pY2,
  },
  gbexDesc: {
    fontFamily: fonts.UrdwinDemi,
    fontSize: 16,
    lineHeight: 21,
    ...t.textWhite,
  },
  scrollList: {
    ...t.pB20,
  },
  line: {
    height: 2,
    backgroundColor: Colors.borderBlue,
  },
  bg1View: {
    height: SCREEN_HEIGHT,
  },
  bgView: {
    height: SCREEN_HEIGHT - 70,
  },
  leftIcon: {
    width: 24,
    height: 24,
  },
  rightIcon: {
    width: 40,
    alignItems: 'flex-end',
  },
  bottomMsg: {
    fontFamily: fonts.PoppinsMedium,
    ...t.textWhite,
    ...t.textXs,
    ...t.mT2,
  },
  languageLabel: {
    fontFamily: fonts.PoppinsMedium,
    ...t.textWhite,
    ...t.textSm,
    ...t.mL10,
    ...t.mT2,
    ...t.capitalize,
  },
  label: {
    fontFamily: fonts.PoppinsMedium,
    ...t.textBase,
    ...t.mL4,
    ...t.capitalize,
    fontSize: 18,
  },
  item: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginHorizontal: 2,
  },
  leftView: {
    ...t.flexRow,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  heading: {
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    ...t.textWhite,
    ...t.text2xl,
    ...t.capitalize,
    ...t.pY4,
    ...t.mT1,
  },
  cardView: {
    backgroundColor: Colors.tabBarColor,
    width: SCREEN_WIDTH - 30,
    alignSelf: 'center',
    borderRadius: 8,
    ...t.pY4,
  },
  personal: {
    fontFamily: fonts.PoppinsMedium,
    ...t.textWhite,
    ...t.textLg,
    ...t.mL4,
    ...t.mB2,
  },
  desc: {
    fontFamily: fonts.PoppinsRegular,
    ...t.textWhite,
    ...t.textSm,
    ...t.mL4,
  },
  scrollView: {
    paddingBottom: 100,
    ...t.pT1,
    ...t.pX4,
  },
  btnContainer: {
    width: '100%',
    ...t.flex,
    ...t.flexRow,
    ...t.pX4,
  },
  btnContainer1: {
    width: SCREEN_WIDTH,
    ...t.flex,
    ...t.flexRow,
  },
  btn1: {
    width: '42%',
  },
  btn: {
    width: '50%',
  },
  box: {
    backgroundColor: 'red',
    width: SCREEN_WIDTH / 2 - 40,
    height: 150,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    ...commonStyles.shadow,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  image: {
    width: 48,
    height: 48,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    textAlign: 'center',
    fontSize: 16,
  },
  titleDesc: {
    fontSize: 12,
  },
});

export const formStyles = StyleSheet.create({
  formView: {
    flex: 1,
  },
  input: {
    borderBottomWidth: 2,
  },
  inputIos: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.borderBlue,
    height: 120,
  },

  label: {
    fontFamily: fonts.PoppinsRegular,
    alignSelf: 'flex-start',
    color: Colors.white,
    textTransform: 'capitalize',
    ...t.textBase,
    ...t.pY2,
  },
  balance: {
    textTransform: 'capitalize',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.white,
    fontFamily: fonts.PoppinsRegular,
    marginStart: 8,
  },
  minorAccountView: {
    alignItems: 'center',
    marginBottom: 10,
  },
  tickIcon: {
    width: '80%',
    height: '80%',
    tintColor: Colors.white,
  },
  image: {
    width: 48,
    height: 48,
  },
  qrScanButton: {
    width: 40,
    borderColor: Colors.borderColor,
    borderLeftWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    marginRight: 15,
  },
});

export const identityStyles = StyleSheet.create({
  line: {
    height: 1,
    backgroundColor: Colors.borderBlue,
  },
  languageView: {},
  languageItem: {
    ...t.pY4,
  },
  languageName: {
    fontFamily: fonts.PoppinsMedium,
    ...t.pL1,
    ...t.capitalize,
    ...t.textGray400,
    ...t.textXs,
  },
  language: {
    fontFamily: fonts.PoppinsMedium,
    ...t.pL1,
    ...t.capitalize,
    ...t.textWhite,
    ...t.textBase,
  },
  uncheck: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.grayBlue,
    ...t.mR1,
  },
  img: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    ...t.mR1,
  },
});

export const confirmationStyles = StyleSheet.create({
  modalView: {
    ...t.pT6,
    backgroundColor: Colors.white,
    ...t.flex,
    ...t.justifyCenter,
    ...t.absolute,
    ...t.bottom0,
    ...t.wFull,
    ...t.itemsCenter,
  },
  title: {
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    color: Colors.black,
    ...t.textXl,
    ...t.pX5,
    textAlign: 'center',
  },
});
export const logoutStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    marginHorizontal: SCREEN_WIDTH * 0.05,
    borderRadius: 10,
  },
  header: {
    ...t.flexRow,
    ...t.justifyBetween,
    ...t.itemsCenter,
    ...t.pL4,
  },
  warning: {
    fontFamily: fonts.PoppinsMedium,
    color: Colors.gray,
    ...t.capitalize,
    ...t.textBase,
  },
  warningIc: {
    ...t.h6,
    ...t.w6,
  },
  logoutMsg: {
    ...t.itemsEnd,
    ...t.mX4,
    ...t.pY6,
    width: '85%',
  },
  logout: {
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    fontSize: 18,
    ...t.mL1,
    ...t.mR2,
  },
  btn: {
    ...t.pX4,
  },
});

export const securityStyles = StyleSheet.create({
  line: {
    height: 2,
    backgroundColor: Colors.borderBlue,
  },
  item: {
    ...t.flex,
    ...t.flexRow,
    ...t.justifyBetween,
    ...t.itemsCenter,
    ...t.pY4,
  },
  label: {
    fontFamily: fonts.PoppinsMedium,
    ...t.textBase,
    ...t.capitalize,
  },
  list: {
    ...t.pX5,
    paddingBottom: 100,
  },
});

export const themeStyles = StyleSheet.create({
  container: {
    ...t.pY2,
  },
  label: {
    fontFamily: fonts.UrdwinDemi,
    fontSize: 16,
    ...t.textWhite,
    ...t.capitalize,
  },
  card: {
    backgroundColor: Colors.blue,
    ...t.p3,
    ...t.pT4,
    borderRadius: 5,
    ...t.flexRow,
    ...t.mT2,
  },
  colorView: {
    // width:SCREEN_WIDTH*0.26,
    width: SCREEN_WIDTH / 3 - 25,
    height: SCREEN_HEIGHT * 0.15,
    borderRadius: 5,
  },
  colorText: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: 14,
    ...t.textWhite,
    ...t.capitalize,
    ...t.pT1,
  },
  themeView: {
    ...t.itemsCenter,
  },
  activeBorder: {
    borderWidth: 1,
    borderColor: Colors.white,
  },
  titleContainer: {
    ...commonStyles.rowView,
    ...commonStyles.justifySpace,
    marginVertical: 10,
  },
  circleColor: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 15,
  },
});

export const gbexStyles = StyleSheet.create({
  topMargin: {
    marginTop: 10,
  },
  columnItem1: {
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 8,
    paddingHorizontal: 4,
  },
  columnItem: {
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 130,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: 10,
  },
  leftCol: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderLeftWidth: 1,
  },
  rightCol: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderRightWidth: 1,
  },
  headerIcon: {
    height: 60,
    width: 75,
  },
  bottomlable: {
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    fontSize: 14,
  },
  headerLable: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: '500',
  },
  middleRow: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
  },
  imgView: {},
  textView: {},
  label: {},
  labelValue: {
    marginRight: 50,
    fontWeight: '600',
  },
  leftLogo: {
    height: 40,
    width: 40,
    marginRight: 15,
  },
  bottomIcon: {
    height: 60,
    width: 60,
  },
  bg: {
    backgroundColor: rapunzelTheme.secondaryColor,
  },
  card1: {
    backgroundColor: Colors.orange,
  },
  card2: {
    backgroundColor: Colors.indigo,
  },
  card3: {
    backgroundColor: Colors.cyanBlue,
  },
  card4: {
    backgroundColor: Colors.pink,
  },
  paddingView: {
    paddingHorizontal: 15,
  },
  whiteColor: {
    ...t.textWhite,
  },
  textHeader: {
    marginVertical: 15,
    textAlign: 'center',
    fontSize: 24,
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
  },
  hr: {
    width: '100%',
    height: 1,
    marginVertical: 10,
  },
  textDetail: {
    marginVertical: 6,
  },
});

export const accountFeeStyles = StyleSheet.create({
  checkboxViewContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  checkboxWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    margin: 0,
    padding: 0,
  },
  itemCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    bottom: 30,
  },
});
