import {StyleSheet} from 'react-native';
import fonts from '../../theme/fonts';
import {t} from 'react-native-tailwindcss';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../utils';
import Colors from '../../theme/Colors';

export const buyStyles = StyleSheet.create({
  ic: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
    marginEnd: 4,
    top: 1,
  },
  currencyIc: {
    height: 18,
    width: 18,
    marginRight: 4,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  title: {
    fontSize: 14,
    ...t.pY2,
    fontFamily: fonts.UrdwinDemi,
  },
  cardContainer: {
    paddingTop: SCREEN_HEIGHT * 0.02,
  },
  card: {
    paddingHorizontal: 5,
    borderRadius: 5,
    paddingVertical: 15,
  },
  rowItem: {
    ...t.justifyBetween,
    ...t.flexRow,
    ...t.itemsCenter,
  },
  dropdownText: {
    ...t.uppercase,
    fontFamily: fonts.PoppinsMedium,
  },
  secondCurrency: {
    ...t.flexRow,
    ...t.itemsCenter,
    borderRadius: 5,
    paddingLeft: 6,
  },
  balance: {
    fontSize: 13,
    ...t.pY2,
    fontFamily: fonts.UrdwinDemi,
  },
  img: {
    height: 14,
    width: 14,
    marginRight: 5,
    marginLeft: 4,
  },
  wallet: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 13,
    fontFamily: fonts.UrdwinDemi,
  },
  marginVer: {
    marginTop: 7,
  },
  gbexRow: {
    borderRadius: 5,
    height: 32,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gbex: {
    fontSize: 14,
    fontFamily: fonts.UrdwinDemi,
    // paddingHorizontal: 8,
    // paddingVertical: 5,
  },
  centerArrow: {
    alignItems: 'center',
    marginVertical: -10,
    zIndex: 999,
  },
  dropArrow: {
    height: 25,
    width: 25,
    borderWidth: 2,
    borderRadius: 4,
    justifyContent: 'center',
  },
});

export const modalStyles = StyleSheet.create({
  underline: {
    width: 30,
    height: 1,
    backgroundColor: Colors.cyan,
    alignSelf: 'center',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    left: 20,
  },
  typemodals: {
    backgroundColor: Colors.white,
    width: SCREEN_WIDTH,
    position: 'absolute',
    bottom: 0,
    height: SCREEN_HEIGHT * 0.3,
  },
  modals: {
    backgroundColor: Colors.white,
    width: SCREEN_WIDTH,
    position: 'absolute',
    bottom: 0,
    height: SCREEN_HEIGHT * 0.6,
    // height: SCREEN_HEIGHT* 0.96,
  },
  currencyIc: {
    height: 32,
    width: 32,
    marginRight: 7,
    resizeMode: 'contain',
    alignSelf: 'center',
    borderRadius: 16,
  },
  img: {
    height: 18,
    width: 18,
  },
  uncheck: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.disableGray,
    ...t.mR1,
  },
  check: {
    height: 20,
    width: 20,
    ...t.mR1,
  },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 2,
  },
  curr: {
    fontSize: 16,
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    marginLeft: 5,
  },
  alignCenter: {
    ...t.itemsCenter,
  },
  balance: {
    fontSize: 16,
    fontFamily: fonts.UrdwinDemi,
    ...t.mL2,
  },
  listItem: {
    ...t.capitalize,
    fontSize: 18,
  },
});
