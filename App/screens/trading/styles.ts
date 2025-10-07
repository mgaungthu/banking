import {Platform, StyleSheet} from 'react-native';
import fonts from '../../theme/fonts';
import {t} from 'react-native-tailwindcss';
import Colors from '../../theme/Colors';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../utils';
import {commonStyles} from '../../globalstyles/styles';
import {isIOS} from '../../utils/DeviceConfig';

export const trdingStyles = StyleSheet.create({
  headerTextContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 30,
  },
  headerText: {
    marginLeft: 10,
    fontSize: 22,
    ...t.uppercase,
  },
  starContainer: {
    position: 'absolute',
    right: 20,
  },
  currencyInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  currencyValueContainer: {
    flex: 1,
  },
  textValueHeader: {
    color: Colors.currencyRed,
    fontSize: 24,
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
  },
  textPercent: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '500',
  },
  currencyVolContainer: {
    flex: 1,
  },
  colVolContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
    flexWrap: 'wrap',
  },
  textVolHeader: {
    fontSize: 12,
  },
  buttonBottomContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1.41,

    elevation: 2,
    width: '100%',
    height: 80,
    alignItems: 'center',
  },
  buttonBottom: {
    marginHorizontal: 3,
    flex: 1,
  },
  // tabContainer:{

  // },
  upperCase: {
    ...t.uppercase,
  },
  tabContainer: {
    width: '100%',
    ...t.pX4,
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
    width: SCREEN_WIDTH / 3 - 15,
    height: 2,
    top: 8,
  },
  tabInactive: {
    // borderBottomColor:Colors.borderBlue,
    borderBottomWidth: 2,
  },

  tabBarStyle: {
    elevation: 1,
  },
  textTab: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export const orderStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 15,
  },
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerItem: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  textItem: {
    fontSize: 15,
    fontWeight: '500',
    width: '50%',
  },
  textRecent: {
    fontSize: 15,
    fontWeight: '500',
    width: '33%',
  },
  textTitle: {
    width: '33%',
  },
  textGreen: {
    color: Colors.currencyGreen,
  },
  textRed: {
    color: Colors.currencyRed,
  },
  rowList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  line: {
    height: '100%',
    width: 1,
  },
  buySide: {
    flex: 1,
    borderRightWidth: 1,
  },
  sellSide: {
    flex: 1,
  },
});

export const tradeHistoryStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  containerItem: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginBottom: 10,
    flexDirection: 'row',
    ...commonStyles.shadow,
  },
  textItem: {},
  rowItem: {
    flexDirection: 'row',
  },
  item1: {
    width: '33%',
    fontSize: 14,
    margin: 2,
  },
  cancelButton: {
    margin: 5,
    paddingVertical: 4,
    paddingHorizontal: 16,
    ...commonStyles.shadow,
  },
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

export const selectCoinStyles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
  },
  input: {
    flex: 1,
  },
  inputContainer: {
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 6,
    height: 46,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabCurrency: {},
  tabCurrencyContainer: {
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  currencyChooseContainer: {
    paddingHorizontal: 10,
  },
  line: {
    height: 2,
    width: 30,
    marginTop: 5,
  },
  cellInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  currencyListContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  currencyInfoContainer: {
    alignItems: 'flex-end',
  },
  currencyNameContainer: {
    flexDirection: 'row',
    paddingTop: 5,
  },
  currencyNamePair: {
    fontSize: 16,
    fontWeight: '600',
  },
  textPercent: {
    fontSize: 14,
  },
});

const orderSide = StyleSheet.create({
  common: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export const buySellStyles = StyleSheet.create({
  headerTextContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 30,
    marginVertical: 5,
  },
  listPairCurrency: {
    flexDirection: 'column-reverse',
    height: 240,
  },
  headerText: {
    marginLeft: 10,
    fontSize: 22,
    ...t.uppercase,
  },
  percentBox: {
    backgroundColor: '#FBE0EA',
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginLeft: 10,
    borderRadius: 4,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconOption: {
    marginHorizontal: 8,
  },
  icChart: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
  containerBuySell: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  buttonBuySell: {
    flex: 1,
    height: 40,
    marginVertical: 5,
    paddingVertical: 0,
  },
  textBold: {
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    ...commonStyles.shadow,
  },
  input: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    paddingVertical: Platform.OS === 'ios' ? 10 : 5,
    height: 34,
  },
  buttonPercent: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 2,
    ...commonStyles.shadow,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginHorizontal: 1,
  },
  textPercent: {
    fontSize: 13,
  },
  textExchange: {
    fontSize: 12,
  },
  valueExchangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  titleSmall: {
    fontSize: 13,
  },
  valueCurrencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginVertical: 2,
  },
  amountContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingVertical: 2,
  },
  bgRed: {
    backgroundColor: 'rgba(252, 114, 166, 0.25)',
  },
  textRed: {
    color: Colors.currencyRed,
  },
  textPrice: {
    fontSize: 14,
  },
  textAmount: {
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    fontSize: 14,
    textAlign: 'right',
    marginLeft: 5,
  },
  progress: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  bgGreen: {
    backgroundColor: 'rgba(48, 195, 177, 0.25)',
  },
  textGreen: {
    color: Colors.currencyGreen,
  },
  buttonBuyBTC: {
    // width: '50%',
    // marginHorizontal: 10,
    backgroundColor: Colors.green,
  },
  line: {
    height: 2,
    width: '100%',
    marginTop: 5,
  },
  iconTabBar: {
    position: 'absolute',
    right: 15,
    top: 10,
  },
  scroll: {
    ...commonStyles.shadow,
  },
  chooseTrade: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    ...commonStyles.shadow,
  },
  modals: {
    backgroundColor: Colors.white,
    width: SCREEN_WIDTH,
    position: 'absolute',
    bottom: 0,
    height: SCREEN_HEIGHT * 0.6,
    // height: SCREEN_HEIGHT* 0.96,
  },
  headerModal: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTextModal: {
    fontSize: 22,
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    left: 20,
  },
  buySideBook: {
    ...orderSide.common,
    height: 200,
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  sellSideBook: {
    ...orderSide.common,
    flexDirection: 'column-reverse',
    justifyContent: 'flex-start',
    height: 200,
    overflow: 'hidden',
  },
});
