import {StyleSheet} from 'react-native';
import fonts from '../../theme/fonts';
import {t} from 'react-native-tailwindcss';
import Colors, {darkTheme} from '../../theme/Colors';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../utils';
import colors from '../../theme/Colors';

export const withdrawalStyles = StyleSheet.create({
  referenceId: {
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    ...t.textXl,
  },
  note: {
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    ...t.textSm,
    ...t.capitalize,
  },
  paymentNote: {
    fontFamily: fonts.PoppinsMedium,
    ...t.textSm,
  },
  leftLabel: {
    fontFamily: fonts.UrdwinDemi,
    ...t.textWhite,
    ...t.textXs,
  },

  rightLabel: {
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    color: Colors.cyan,
    ...t.textXs,
  },
  leftItemView: {
    width: SCREEN_WIDTH * 0.4,
    alignItems: 'flex-start',
  },
  rightView: {
    paddingRight: 2,
    width: SCREEN_WIDTH * 0.5,
    alignItems: 'flex-end',
  },
  lableValue: {
    fontSize: 15,
    fontFamily: fonts.PoppinsMedium,
  },
  lable: {
    fontSize: 12,
    fontFamily: fonts.UrdwinDemi,
    textTransform: 'capitalize',
    marginTop: 16,
    marginBottom: 10,
  },
  picker: {
    fontSize: 12,
    fontFamily: fonts.UrdwinDemi,
  },

  beneficiaryBtn: {
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginTop: 14,
    width: '100%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
  },
  beneficiaryBtnText: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: 16,
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
  internalNote: {
    fontFamily: fonts.UrdwinDemi,
    fontSize: 14,
    ...t.mT5,
  },
  modals: {
    backgroundColor: Colors.white,
    width: SCREEN_WIDTH,
    ...t.pY4,
    ...t.pX4,
    bottom: -80,
  },
  availableBalance: {
    color: darkTheme.inputColor,
    textTransform: 'capitalize',
    fontFamily: fonts.PoppinsMedium,
    fontSize: 12,
  },
  withdrawModals: {
    // backgroundColor: Colors.white,
    width: SCREEN_WIDTH,
    ...t.pX4,
    // bottom: -80,
  },
  qrScanButton: {
    width: 40,
    borderColor: colors.borderColor,
    borderLeftWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
  },
});
