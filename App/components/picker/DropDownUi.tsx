import React from 'react';
import {useSelector} from 'react-redux';
import {ThemeFunctions} from '../../utils';
import RNPickerSelect from 'react-native-picker-select';
import {Icon} from 'react-native-elements';
import fonts from '../../theme/fonts';
import {strings} from '../../strings';

export const DropDownUi = ({options, onChangeVal, placeholderText}) => {
  const {appTheme} = useSelector((state: any) => state.globalReducer);
  const placeholder = {
    label: placeholderText,
    value: null,
    color: '#9EA0A4',
  };
  return (
    <RNPickerSelect
      onValueChange={onChangeVal}
      useNativeAndroidPickerStyle={false}
      placeholder={placeholder}
      style={{
        inputAndroid: {
          fontSize: 14,
          fontWeight: '600',
          marginBottom: 0,
          fontFamily: fonts.PoppinsRegular,
          color: ThemeFunctions.customText(appTheme),
        },

        inputIOS: {
          fontSize: 14,
          fontWeight: '600',
          marginBottom: 0,
          fontFamily: fonts.PoppinsRegular,
          color: ThemeFunctions.customText(appTheme),
        },
      }}
      Icon={() => (
        <Icon
          name="keyboard-arrow-down"
          type="material"
          color={ThemeFunctions.customText(appTheme)}
          size={25}
          iconStyle={{marginTop: 15}}
        />
      )}
      items={options}
    />
  );
};
