import {StyleSheet} from 'react-native';
import Colors from '../../theme/Colors';
import fonts from '../../theme/fonts';
export const dropdownStyles = StyleSheet.create({
  dropdownContainer: {
    borderColor: Colors.borderColor,
    borderWidth: 1,
  },
  dropdownTextStyle: {
    fontSize: 14,
    fontFamily: fonts.PoppinsRegular,
    textTransform: 'capitalize',
  },
});
