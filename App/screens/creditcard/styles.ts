import {StyleSheet} from 'react-native';
import Colors from '../../theme/Colors';
import fonts from '../../theme/fonts';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../utils';
import {t} from 'react-native-tailwindcss';

export const creditCardStyles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    ...t.pX4,
    borderRadius: 26,
    marginHorizontal: 10,
  },
  tabLabelActive: {
    fontFamily: fonts.PoppinsMedium,
    textTransform: 'capitalize',
    ...t.textWhite,
    ...t.textBase,
  },
  tabLabelInactive: {
    fontFamily: fonts.UrdwinDemi,
    color: Colors.grayBlue,
    ...t.textSm,
  },
  tabView: {
    width: (SCREEN_WIDTH / 3) * 1.3,
    alignItems: 'center',
  },
  line: {
    width: (SCREEN_WIDTH / 3) * 1.4,
    height: 2,
    backgroundColor: Colors.cyan,
    top: 8,
  },
  tabInactive: {
    // borderBottomColor:Colors.borderBlue,
    borderBottomWidth: 2,
  },

  tabBarStyle: {
    backgroundColor: Colors.tabColor,
    elevation: 0,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 10}, // change this for more shadow
    // shadowOpacity: 0.4,
  },
  view: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 15,
    paddingVertical: 30,
  },
  buttonSwap: {
    flexDirection: 'row',
    borderRadius: 10,
  },
  buttonChange: {
    padding: 15,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewBalance: {
    flex: 3,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  textCurrencyName: {
    fontSize: 16,
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    minWidth: 60,
  },
  textCurrency: {
    fontSize: 17,
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
  },
  hr: {
    width: '100%',
    height: 1,
    backgroundColor: '#545161',
    marginBottom: 40,
    marginTop: 50,
    position: 'relative',
  },
  icQuickSwap: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    position: 'absolute',
    left: SCREEN_WIDTH / 2 - 30,
    bottom: -16,
  },
  segmentControl: {
    marginTop: 40,
  },
  modalContainer: {
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 50,
    height: '100%',
  },
  currencyChoose: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  imageCurrency: {
    width: 26,
    height: 26,
    marginRight: 10,
  },
  currencyChooseText: {
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    fontSize: 18,
  },
  textHint: {
    fontSize: 14,
    marginBottom: 5,
  },
  inputAmount: {
    width: '100%',
    textAlign: 'right',
    paddingVertical: 0,
  },
  feeText: {
    textAlign: 'center',
    fontSize: 14,
  },
  modalSafeArea: {},
  textTab: {
    fontSize: 16,
    fontWeight: '500',
    ...t.capitalize,
  },
});

export const listStyles = StyleSheet.create({
  list: {
    ...t.pX5,
    paddingBottom: 100,
  },
  item: {
    ...t.flex,
    ...t.flexRow,
    ...t.justifyBetween,
    ...t.itemsCenter,
    ...t.pY4,
  },
  leftView: {
    ...t.flexRow,
    ...t.itemsCenter,
  },
  label: {
    fontFamily: fonts.PoppinsMedium,
    ...t.textBase,
    ...t.capitalize,
  },
  rightIcon: {
    ...t.w4,
  },
  line: {
    height: 2,
    backgroundColor: Colors.borderBlue,
  },
});

export const historyStyles = StyleSheet.create({
  pending: {
    color: Colors.danger,
  },
  icBtn: {
    width: 28,
    justifyContent: 'center',
    alignItems: 'center',
    height: 24,
  },
  ic: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
    marginEnd: 4,
    top: 1,
  },
  img: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  leftItemView: {
    width: SCREEN_WIDTH * 0.32,
    alignItems: 'flex-start',
  },
  rightView: {
    paddingRight: 2,
    width: SCREEN_WIDTH * 0.52,
    alignItems: 'flex-end',
  },
  historyCard: {
    backgroundColor: Colors.bgBlue,
    padding: 10,
    // borderRadius:5,
    ...t.mB4,
  },
  whiteText: {
    ...t.textWhite,
  },
  list: {
    // ...t.mX4,
    ...t.pY6,
  },
  leftLabel: {
    fontFamily: fonts.PoppinsMedium,
    ...t.textWhite,
    ...t.textXs,
    ...t.uppercase,
  },
  rowItem: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderBlue,
    ...t.flexRow,
    ...t.justifyBetween,
    ...t.itemsCenter,
    ...t.pY2,
  },
  rightLabel: {
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    color: Colors.cyan,
    ...t.uppercase,
    ...t.textXs,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  completed: {
    color: Colors.seagreen,
    borderWidth: 1,
    borderColor: Colors.seagreen,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  marginVerticalView: {
    ...t.mT4,
    ...t.pB6,
  },
  shimmerRow: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderBlue,
    ...t.flexRow,
    ...t.justifyBetween,
    ...t.itemsCenter,
    ...t.pY4,
  },
  leftView: {
    width: 100,
    backgroundColor: Colors.borderBlue,
    height: 10,
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
