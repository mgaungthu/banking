import {StyleSheet} from 'react-native';
import Colors from '../../theme/Colors';
import fonts from '../../theme/fonts';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../utils';
import {t} from 'react-native-tailwindcss';
import {isIOS} from '../../utils/DeviceConfig';
import {commonStyles} from '../../globalstyles/styles';

export const headerStyles = StyleSheet.create({
  backBtn: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    top: 1,
  },
  selected: {
    height: 2,
    width: SCREEN_WIDTH / 6,
  },
  header: {
    // backgroundColor: colors.tabColor,
    height: 48,
    ...t.flex,
    ...t.flexRow,
    ...t.justifyBetween,
    ...t.itemsCenter,
    // borderBottomWidth:2
  },
  btn: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    width: SCREEN_WIDTH / 6,
  },
});

export const tickerStyles = StyleSheet.create({
  placeholder: {
    fontFamily: fonts.UrdwinCond_Demi,
    fontSize: 26,
    textAlign: 'center',
    paddingTop: '10%',
  },
  swipeButton: {
    width: 60,
    height: 60,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    ...commonStyles.shadow,
  },
  swipeContainer: {
    paddingRight: 10,
    paddingLeft: 5,
  },
  sort: {
    alignItems: 'center',
  },
  sortBtn: {
    height: 15,
  },
  icImg: {
    fontSize: 10,
    textAlign: 'center',
  },
  imgView: {
    height: 24,
    width: 24,
    borderRadius: 12,
    marginHorizontal: 12,
  },
  img: {
    height: 24,
    width: 24,
    borderRadius: 12,
    marginHorizontal: 12,
  },
  activeInner: {
    height: 10,
    width: 10,
    borderRadius: 6,
    bottom: 0.8,
    right: 0.4,
    backgroundColor: Colors.white,
  },
  activeCheckbox: {
    height: 16,
    width: 16,
    borderRadius: 10,
    borderWidth: 3.5,
    marginRight: 4,
  },
  chekboxText: {
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    ...t.capitalize,
    ...t.textXs,
    paddingTop: isIOS() ? 5 : 'auto',
  },
  checkbox: {
    height: 16,
    width: 16,
    borderRadius: 10,
    borderWidth: 2,
    marginRight: 4,
  },
  spotView: {
    marginTop: 10,
    marginBottom: 2,
  },
  limitBtn: {
    width: 80,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  spotBtn: {
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    borderTopRightRadius: 8,
    borderBottomEndRadius: 8,
  },
  spotText: {
    fontFamily: fonts.PoppinsMedium,
    ...t.uppercase,
    paddingTop: isIOS() ? 4 : 'auto',
    ...t.textWhite,
    fontSize: 17,
    fontWeight: '500',
  },
  rowCard: {
    ...t.flexRow,
    ...t.justifyBetween,
    ...t.mY2,
    ...t.pX4,
    // ...t.pY3,
    // ...t.itemsCenter,
    ...commonStyles.shadow,
  },
  rowCardItem: {
    ...t.pY3,
  },
  list: {
    paddingTop: 10,
    paddingBottom: SCREEN_HEIGHT / 2,
  },
  card: {
    ...t.flexRow,
    ...t.justifyBetween,
    ...t.mB2,
    ...t.pX4,
    ...t.pY4,
    ...t.itemsCenter,
    ...commonStyles.shadow,
    marginHorizontal: 1,
  },
  currency: {
    fontFamily: fonts.UrdwinDemi,
    ...t.textWhite,
    ...t.uppercase,
    ...t.textBase,
  },
  currencyImg: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    ...t.mR2,
  },
  rightText: {
    fontFamily: fonts.PoppinsMedium,
    ...t.textWhite,
    ...t.uppercase,
    ...t.textXs,
  },
  rightView: {
    width: SCREEN_WIDTH / 2 - 10,
  },
  label: {
    fontSize: 16,
    ...t.uppercase,
    marginLeft: 10,
  },
});

export const tickerRowStyles = StyleSheet.create({
  shimmer: {
    width: 90,
    height: 5,
    marginTop: 2,
  },
  secondcurrency: {
    fontFamily: fonts.PoppinsRegular,
    ...t.textWhite,
    ...t.uppercase,
    fontSize: 10,
  },
  currency: {
    fontFamily: fonts.UrdwinDemi,
    ...t.textWhite,
    ...t.uppercase,
    fontSize: 16,
  },
  spotCurrency: {
    fontFamily: fonts.UrdwinDemi,
    ...t.uppercase,
    fontSize: 16,
  },
  volume: {
    fontFamily: fonts.PoppinsRegular,
    ...t.textXs,
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
  },
  change: {
    width: '24%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  col1: {
    flex: 1,
  },
  col2: {
    flex: 1,
  },
  col4: {
    flex: 0,
  },
});
