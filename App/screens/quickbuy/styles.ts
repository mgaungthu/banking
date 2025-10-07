import {StyleSheet} from 'react-native';
import Colors from '../../theme/Colors';
import fonts from '../../theme/fonts';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../utils';
import {t} from 'react-native-tailwindcss';
import {commonStyles} from '../../globalstyles/styles';

export const quickBuyStyles = StyleSheet.create({
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
  tabStyle: {
    marginHorizontal: 15,
    marginTop: 2,
    ...commonStyles.shadow,
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
    height: 2,
    width: SCREEN_WIDTH / 2 - 25,
    top: 8,
  },
  tabInactive: {
    // borderBottomColor:Colors.borderBlue,
    borderBottomWidth: 2,
  },

  tabBarStyle: {
    elevation: 0,
    flex: 1,
    width: 120,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 10}, // change this for more shadow
    // shadowOpacity: 0.4,
  },
  view: {
    flex: 1,
  },
  container: {
    backgroundColor: Colors.tabColor,
    flex: 1,
  },
  bgView: {
    height: SCREEN_HEIGHT - 120,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  badgeView: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // ...t.justifyBetween,
    ...t.mT4,
  },
  badge: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.cyan,
    borderRadius: 5,
    marginRight: 4,
    ...t.h8,
    ...t.pX1,
    ...t.justifyCenter,
    ...t.itemsBaseline,
    ...t.mB1,
  },
  chipText: {
    color: Colors.cyan,
    ...t.textXs,
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
  },
  textTab: {
    fontSize: 16,
    fontFamily: fonts.PoppinsMedium,
    // fontWeight: '500',
    ...t.capitalize,
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
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginEnd: 4,
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
    marginHorizontal: 15,
    borderRadius: 16,
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
    ...t.capitalize,
  },
  rowItem: {
    borderBottomWidth: 1,
    ...t.flexRow,
    ...t.justifyBetween,
    ...t.itemsCenter,
    padding: 16,
  },
  rightLabel: {
    ...t.uppercase,
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
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
