import {StyleSheet} from 'react-native';
import Colors from '../../theme/Colors';
import fonts from '../../theme/fonts';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../utils';
import {t} from 'react-native-tailwindcss';
import {commonStyles} from '../../globalstyles/styles';

export const quickSwapStyles = StyleSheet.create({
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
    marginLeft: 2,
  },
  buttonChange: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: 130,
    flexDirection: 'row',
    alignItems: 'center',
    ...commonStyles.shadow,
    borderRadius: 8,
    justifyContent: 'space-between',
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
    resizeMode: 'contain',
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
  tabContainer: {
    width: '100%',
    borderRadius: 8,
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
    width: SCREEN_WIDTH / 2,
    alignItems: 'center',
  },
  line: {
    width: SCREEN_WIDTH / 2 - 25,
    height: 2,
    top: 8,
  },
  tabInactive: {
    // borderBottomColor:Colors.borderBlue,
    borderBottomWidth: 2,
  },
  tabStyle: {
    marginHorizontal: 15,
    marginTop: 2,
    ...commonStyles.shadow,
  },
  textTab: {
    fontSize: 16,
    fontWeight: '500',
    ...t.capitalize,
  },
  modal: {
    height: SCREEN_HEIGHT * 0.6,
    position: 'absolute',
    bottom: 0,
    width: SCREEN_WIDTH,
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
