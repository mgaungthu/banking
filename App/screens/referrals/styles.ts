import {StyleSheet} from 'react-native';
import Colors from '../../theme/Colors';
import fonts from '../../theme/fonts';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../utils';
import {t} from 'react-native-tailwindcss';
import {isIOS} from '../../utils/DeviceConfig';
import {commonStyles} from '../../globalstyles/styles';

export const rewardStyles = StyleSheet.create({
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
  textBold: {
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
  },
  textLink: {
    flexGrow: 1,
    textDecorationLine: 'underline',
  },
  copyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  bgCopy: {
    padding: 15,
    ...commonStyles.shadow,
  },

  refCopyButton: {
    width: 40,
    borderColor: Colors.borderColor,
    borderLeftWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    marginRight: 10,
  },

  qrScanButton: {
    width: 40,
    borderColor: Colors.borderColor,
    borderLeftWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
  },

  qrModal: {
    ...t.itemsCenter,
    ...t.mX4,
    alignSelf: 'center',
    borderRadius: 5,
  },
  profileBtn: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    ...commonStyles.shadow,
  },
});
