import {StyleSheet} from 'react-native';
import {t} from 'react-native-tailwindcss';
import Colors from '../theme/Colors';
import fonts from '../theme/fonts';
import {SCREEN_WIDTH} from '../utils';

export const tabStyles = StyleSheet.create({
  text: {
    fontFamily: fonts.UrdwinSemiCond_Demi,
    color: Colors.tabTextColor,
    fontSize: 15,
    lineHeight: 18,
    paddingTop: 2,
    textTransform: 'capitalize',
    ...t.textSm,
  },
  activeText: {
    color: Colors.white,
  },
  activeIcon: {
    height: 25,
    width: 25,
  },
  InactiveIcon: {
    height: 25,
    width: 25,
  },
  quickSwapIcon: {
    width: 56,
    height: 56,
  },
  buttonQuickSwap: {
    bottom: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconTab: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  selectedTabLine: {
    height: 2,
    width: 18,
    position: 'absolute',
    borderRadius: 20,
    bottom: -8,
    backgroundColor: 'red',
  },
  textQuickSwap: {
    fontSize: 13,
    fontFamily: fonts.PoppinsMedium,
    fontWeight: '400',
    marginTop: 2,
  },
  kycAlert: {
    flex: 1,
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 50,
    zIndex: 0,
    width: SCREEN_WIDTH,
    borderTopWidth: 0.5,
    paddingBottom: 30,
  },
  kycAlertBtn: {
    padding: 5,
    backgroundColor: 'orange',
    borderRadius: 5,
    paddingHorizontal: 20,
    marginLeft: 5,
  },
  kycAlertRow: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
});
