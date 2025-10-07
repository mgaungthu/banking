import {StyleSheet} from 'react-native';
import Colors, {darkTheme} from '../../theme/Colors';
import fonts from '../../theme/fonts';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../utils';
import {t} from 'react-native-tailwindcss';
import {isIOS} from '../../utils/DeviceConfig';

export const rewardStyles = StyleSheet.create({
  bannerImg: {
    height: 180,
    resizeMode: 'cover',
    width: '100%',
    borderRadius: 6,
  },

  img: {
    height: 40,
    width: 34,
    resizeMode: 'contain',
    marginTop: isIOS() ? 0 : 2,
  },
  card: {
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 12,
    paddingVertical: 16,
  },
  rightView: {
    marginLeft: 4,
    marginTop: isIOS() ? 4 : 0,
  },
  title: {
    fontSize: 14,
    fontFamily: fonts.UrdwinDemi,
    ...t.textWhite,
    ...t.uppercase,
  },
  value: {
    fontSize: 26,
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    ...t.textWhite,
    ...t.uppercase,
  },
  hr: {
    width: '100%',
    height: 1,
    marginVertical: 15,
  },
  container: {
    paddingHorizontal: 15,
  },
  colCount: {
    flex: 1,
    flexDirection: 'row',
  },
  imageCount: {
    width: 40,
    height: 40,
  },
  countDetails: {
    marginLeft: 10,
    maxWidth: '70%',
  },
  yourGbex: {
    backgroundColor: 'red',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  reward: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  endReward: {
    padding: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardImg: {
    width: 35,
    height: 35,
    marginRight: 10,
  },
  goal: {
    height: 40,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  goalList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderWidth: 1,
  },

  goalListActive: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 5,
    paddingTop: 15,
  },

  progressBarWrapper: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },

  borderTopRadius: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  borderBottomRadius: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textComing: {
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 20,
  },
  checkCircle: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginLeft: 5,
  },
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 8,
  },
  comingSoon: {
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
    fontSize: 28,
  },
  blurContainerIos: {
    padding: 10,
  },
  blurContainerAndroid: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: darkTheme.headerText,
    opacity: 0.1,
  },
});
