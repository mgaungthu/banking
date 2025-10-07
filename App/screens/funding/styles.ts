import {StyleSheet} from 'react-native';
import Colors, {darkTheme, lightTheme} from '../../theme/Colors';
import fonts from '../../theme/fonts';
import {SCREEN_WIDTH} from '../../utils';
import {t} from 'react-native-tailwindcss';
import {isIOS} from '../../utils/DeviceConfig';
import {commonStyles} from '../../globalstyles/styles';

export const walletStyles = StyleSheet.create({
  showEye: {
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  secondaryBalance: {
    textAlign: 'center',
    fontSize: 18,
  },
  reloadBtn: {
    height: 40,
    width: 80,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    ...t.mT4,
    flexDirection: 'row',
  },
  reload: {
    height: 25,
    width: 35,
  },
  // viewBtn: {
  //   height: 25,
  //   width: 35,
  //   alignItems: 'flex-end',
  //   top: -4,
  // },
  // noted: {
  //   paddingVertical: 20,
  //   borderRadius: 6,
  //   ...t.mB4,
  //   ...t.pX2,
  // },
  // btc: {
  //   width: SCREEN_WIDTH * 0.4,
  //   ...t.mT1,
  // },
  // portfolio: {
  //   ...t.textXs,
  //   ...t.textWhite,
  //   fontFamily: fonts.PoppinsMedium,
  // },
  // largeSize: {
  //   ...t.textXl,
  //   ...t.textWhite,
  //   fontFamily: fonts.PoppinsBold,
  fontWeight: 'heavy',
  // },
  // tabView: {
  //   width: (SCREEN_WIDTH / 3) * 0.9,
  //   alignItems: 'center',
  // },
  // upperCase: {
  //   ...t.uppercase,
  // },
  // tabLabelActive: {
  //   fontFamily: fonts.PoppinsMedium,
  //   textTransform: 'capitalize',
  //   ...t.textWhite,
  //   ...t.textXs,
  // },
  // line: {
  //   width: (SCREEN_WIDTH / 3) * 1.1,
  //   height: 2,
  //   backgroundColor: Colors.cyan,
  //   top: 15,
  // },
  // balanceView: {
  //   backgroundColor: Colors.themeColor,
  //   flex: 1,
  //   // ...t.pX4,
  //   ...t.pT4,
  // },
  hideBalanceRow: {
    ...t.flexRow,
    ...t.mY4,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  hideBalance: {
    ...t.capitalize,
    fontSize: 18,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  buttonHeader: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    ...commonStyles.shadow,
  },
  buttonHeaderIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  balanceContainer: {
    paddingTop: 20,
    paddingBottom: 30,
    marginHorizontal: 20,
    ...commonStyles.shadow,
    borderRadius: 20,
  },
  textHeader: {
    fontSize: 24,
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    ...t.capitalize,
  },
  textTitleBalance: {
    textAlign: 'center',
  },
  textBalance: {
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    fontSize: 28,
    textAlign: 'center',
    marginTop: 10,
  },
  contentContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 15,
    bottom: 15,
  },
  card: {
    width: 294 * 1.1,
    height: 168 * 1.1,
    alignSelf: 'center',
  },
  buttonDwContainer: {
    flexDirection: 'row',
  },
  buttonDw: {
    width: 94,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textDw: {
    ...t.capitalize,
    marginTop: 10,
    textAlign: 'center',
  },
  dwRow: {
    flex: 1,
    marginTop: 10,
  },
});
export const balanceStyles = StyleSheet.create({
  placeholderView: {
    height: '80%',
  },
  placeholderText: {
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    ...t.text3xl,
    ...t.textWhite,
    ...t.textCenter,
  },
  retry: {
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    fontSize: 14,
    ...t.textWhite,
    ...t.textCenter,
    ...t.capitalize,
  },
  list: {
    ...t.pB20,
  },
  rewardlist: {
    ...t.pB10,
    ...t.pT5,
  },
  balanceCard: {
    // borderRadius: 5,
    ...t.pY2,
    ...t.mB4,
    ...commonStyles.shadow,
    borderRadius: 16,
    marginHorizontal: 15,
  },
  paddingView: {
    ...t.pY3,
    paddingTop: 20,
  },

  rowItem: {
    ...t.flexRow,
    ...t.justifyBetween,
    borderBottomWidth: 0.2,
    borderBottomColor: darkTheme.headerText,
    ...t.pY2,
  },
  availableBal: {
    color: Colors.dimWhite,
    ...t.uppercase,
    ...t.textXs,
    fontFamily: fonts.PoppinsRegular,
  },
  leftLabel: {
    ...t.uppercase,
    fontSize: 17,
    fontFamily: fonts.PoppinsMedium,
    fontWeight: '500',
  },
  rightLabel: {
    ...t.uppercase,
    fontSize: 16,
    fontFamily: fonts.PoppinsRegular,
  },
  priceText: {
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
  },
  smallText: {
    fontSize: 13,
    fontFamily: fonts.PoppinsRegular,
  },
  img: {
    resizeMode: 'contain',
    height: 32,
    width: 32,
    borderRadius: 16,
    ...t.mR2,
  },
  rightView: {
    alignItems: 'flex-end',
    // width:SCREEN_WIDTH*(51/100),
  },
  leftView: {
    // width:SCREEN_WIDTH*(30/100),
    width: '50%',
  },
  deposit: {
    borderWidth: 1,
    // borderColor: Colors.cyan,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    paddingTop: isIOS() ? 10 : 4,
  },
  withdraw: {
    borderColor: Colors.grayBlue,
  },
  completed: {
    color: Colors.seagreen,
  },
  pending: {
    color: Colors.danger,
  },
});

export const depositModalStyles = StyleSheet.create({
  withdrawCalc: {
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    fontSize: 18,
    textAlign: 'center',
    color: Colors.black,
  },
  amt: {
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    ...t.textSm,
    ...t.mT1,
  },
  timer: {
    fontFamily: fonts.PoppinsRegular,
    ...t.textXs,
    ...t.mL1,
    ...t.mT1,
  },
  otpBtn: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginLeft: '4%',
    height: 46,
  },
  btnText: {
    ...t.textWhite,
    fontFamily: fonts.PoppinsRegular,
  },
  error: {
    color: Colors.danger,
    ...t.textXs,
    ...t.pT1,
    fontFamily: fonts.PoppinsRegular,
  },
  popupView: {
    backgroundColor: Colors.white,
    width: SCREEN_WIDTH,
    position: 'absolute',
    bottom: 0,
    ...t.pY2,
    ...t.pX4,
  },
  textTag: {
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    ...t.textBase,
  },
  underline: {
    width: 30,
    height: 1,
    backgroundColor: Colors.cyan,
    alignSelf: 'center',
  },
  paddingView: {
    paddingVertical: 4,
  },
  qrCodeView: {
    ...t.pY4,
  },
  address: {
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    ...t.textSm,
    ...t.textCenter,
  },
  tipsView: {
    ...t.pY2,
  },
  bullet: {
    height: 8,
    width: 8,
    backgroundColor: Colors.black,
    borderRadius: 4,
    marginTop: isIOS() ? 0 : 6,
    ...t.mR1,
  },
  tipRow: {
    width: SCREEN_WIDTH - 45,
    marginRight: 10,
    ...t.mB1,
  },
  tips: {
    fontFamily: fonts.UrdwinDemi,
    ...t.textXs,
  },
});

export const depositStyles = StyleSheet.create({
  placeholderImg: {
    height: 85,
    width: 85,
  },
  placeholder: {
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    ...t.text3xl,
    ...t.textWhite,
    ...t.mT1,
  },
  placeholderView: {
    justifyContent: 'center',
    alignItems: 'center',

    ...t.pT10,
  },
});
export const withdrawStyles = StyleSheet.create({
  comingSoon: {
    height: 400,
    width: 250,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  placeholder: {
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    ...t.text3xl,
    ...t.textWhite,
    alignSelf: 'center',
    position: 'absolute',
    top: 280,
  },
});

export const walletDetailStyles = StyleSheet.create({
  network: {
    padding: 10,
    borderRadius: 10,
    width: 70,
    ...commonStyles.shadow,
  },
  networkText: {
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  balanceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  img: {
    resizeMode: 'contain',
    height: 26,
    width: 26,
    borderRadius: 13,
    ...t.mL2,
  },
  textComingSoon: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 20,
  },
  balanceTitle: {
    textAlign: 'center',
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    fontSize: 28,
  },
  balanceSmallTitle: {
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    fontSize: 16,
  },
  detailContainer: {
    paddingHorizontal: 15,
  },
  cell: {
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  buttonBottomContainer: {
    flexDirection: 'row',
    ...commonStyles.paddingHorizontalView,
  },
  buttonBottom: {
    marginHorizontal: 5,
    flex: 1,
    borderRadius: 8,
  },
  tabContainer: {
    width: '100%',
    borderRadius: 8,
    marginTop: 10,
  },
  textTab: {
    fontSize: 16,
    fontWeight: '500',
    ...t.uppercase,
  },
  tabLabelActive: {
    fontFamily: fonts.PoppinsMedium,
    textTransform: 'capitalize',
    ...t.textWhite,
    ...t.textBase,
  },
  tabLabelInactive: {
    fontFamily: fonts.PoppinsRegular,
    color: Colors.grayBlue,
    ...t.textSm,
  },
  tabView: {
    width: SCREEN_WIDTH / 2,
    alignItems: 'center',
  },
  line: {
    width: SCREEN_WIDTH / 2 - 25,
    height: 2,
    top: 8,
  },
  tabStyle: {
    marginHorizontal: 15,
    marginTop: 2,
    ...commonStyles.shadow,
  },
  breakdownBarContainer: {
    alignItems: 'center',
    paddingTop: 2,
  },
  breakdownBar: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 2,
  },
});

export const depositAddressStyles = StyleSheet.create({
  qrContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  wrapQr: {
    padding: 10,
    backgroundColor: Colors.white,
    ...commonStyles.shadow,
    borderRadius: 15,
  },
  shareContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  textShare: {
    fontSize: 20,
    marginRight: 10,
  },
  infoContainer: {
    paddingVertical: 30,
  },
  container: {
    paddingHorizontal: 15,
  },
  addressContainer: {
    height: 50,
    marginVertical: 10,
    paddingHorizontal: 14,
    flex: 1,
    justifyContent: 'center',
    ...commonStyles.shadow,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  copyButton: {
    height: 52,
    width: 52,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipRow: {
    marginTop: 5,
    marginRight: 10,
    ...t.mB1,
    alignItems: 'center',
  },
  tips: {
    fontSize: 14,
  },
  bullet: {
    height: 8,
    width: 8,
    backgroundColor: Colors.gray,
    borderRadius: 4,
    marginTop: isIOS() ? 3 : 6,
    ...t.mR1,
  },
});

export const withdrawAddressStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  addressContainer: {
    height: 50,
    marginVertical: 10,
    paddingHorizontal: 14,
    flex: 1,
    justifyContent: 'center',
    ...commonStyles.shadow,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  scanButton: {
    height: 52,
    width: 52,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
  maxButton: {
    width: 45,
    borderColor: Colors.borderColor,
    borderLeftWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    marginRight: 10,
  },
  withdrawCalc: {
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    fontSize: 18,
    textAlign: 'center',
    color: Colors.black,
  },
  amt: {
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    ...t.textSm,
    ...t.mT1,
  },
  timer: {
    fontFamily: fonts.PoppinsRegular,
    ...t.textXs,
    ...t.mL1,
    ...t.mT1,
  },
  otpBtn: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginLeft: 10,
    height: 46,
    marginTop: 5,
  },
  btnText: {
    ...t.textWhite,
    fontFamily: fonts.PoppinsRegular,
  },
  tipRow: {
    marginTop: 5,
    marginRight: 10,
    ...t.mB1,
  },
  tips: {
    fontSize: 14,
  },
  bullet: {
    height: 8,
    width: 8,
    backgroundColor: Colors.gray,
    borderRadius: 4,
    marginTop: isIOS() ? 3 : 6,
    ...t.mR1,
  },
});

export const transactionListStyles = StyleSheet.create({
  itemList: {
    ...t.mB4,
    ...commonStyles.shadow,
    borderRadius: 16,
    marginHorizontal: 15,
  },
  placeholder: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: 26,
    textAlign: 'center',
    paddingTop: '10%',
  },
});

export const transactionDetailsStyles = StyleSheet.create({
  transactionCard: {
    // borderRadius: 5,
    ...t.pY2,
    ...t.mB4,
    ...commonStyles.shadow,
    borderRadius: 16,
    marginHorizontal: 15,
    padding: 20,
    paddingBottom: 20,
  },

  transactionCardItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
});

export const statusPill = StyleSheet.create({
  successPill: {
    padding: 5,
    borderRadius: 10,
    width: 100,
    display: 'flex',
    justifyContent: 'center',

    backgroundColor: 'rgb(34, 139, 34)',
  },
  cancelledPill: {
    padding: 5,
    borderRadius: 10,
    width: 100,
    display: 'flex',
    justifyContent: 'center',

    backgroundColor: 'rgb(128,128,128)',
  },
  pendingPill: {
    padding: 5,
    borderRadius: 10,
    width: 100,
    display: 'flex',
    justifyContent: 'center',

    backgroundColor: 'rgb(255,193,7)',
  },
  text: {
    ...t.uppercase,
    alignSelf: 'center',
    color: 'white',
  },
});
