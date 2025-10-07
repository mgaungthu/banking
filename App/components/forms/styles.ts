import colors from '../../theme/Colors';
import {StyleSheet} from 'react-native';
import {t} from 'react-native-tailwindcss';
import fonts from '../../theme/fonts';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {commonStyles} from '../../globalstyles/styles';

export const formStyles = StyleSheet.create({
  inputView: {
    height: 55,
    justifyContent: 'center',
    ...commonStyles.shadow,
  },
  container: {
    marginTop: 16,
    justifyContent: 'center',
    width: '100%',
  },
  inputBase: {
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  inputContainer: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  inputBox: {
    fontSize: 14,
    fontFamily: fonts.PoppinsRegular,
    flex: 1,
    marginBottom: -4,
    paddingHorizontal: 10,
  },
  inputBox2: {
    fontSize: 14,
    fontFamily: fonts.PoppinsRegular,
    flex: 1,

    paddingHorizontal: 10,
  },
  rightText: {
    fontSize: 14,
    fontFamily: fonts.PoppinsRegular,
    color: colors.white,
    marginTop: 12,
  },
  label: {
    alignSelf: 'flex-start',
    textTransform: 'capitalize',
    ...t.pY2,
  },
  heading: {
    fontFamily: fonts.PoppinsRegular,
    alignSelf: 'flex-start',
    marginBottom: -6,
    color: colors.white,
    textTransform: 'capitalize',
    ...t.textBase,
  },
  requiredFieldLabel: {
    color: colors.danger,
  },
  dropdown: {
    // position: 'absolute',
    // alignSelf: 'center',
    // alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    // width: 40,
    height: 40,
    // right: 0,
  },

  rightIcon: {
    height: 20,
    width: 20,
    zIndex: 999,
    alignSelf: 'center',
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.05)',
    height: 20,
    width: 20,
    borderRadius: 10,
    right: 2,
    borderColor: Colors.white,
  },
});
