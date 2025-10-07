import React from 'react';
import {View, Text, TouchableOpacity, Image, TextStyle} from 'react-native';
import {useSelector} from 'react-redux';
import {isDarkTheme} from '../../utils/ThemeFunctions';
import {cellStyles, textStyles} from './styles';

const ThemeText = ({
  children,
  style,
  adjustsFontSizeToFit = true,
  numberOfLines,
}: {
  children: any;
  style?: TextStyle | Array<any>;
  adjustsFontSizeToFit?: boolean;
  numberOfLines?: number;
}) => {
  const {appTheme} = useSelector((state: any) => state.globalReducer);

  return (
    <Text
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      numberOfLines={numberOfLines}
      style={[
        isDarkTheme(appTheme) ? textStyles.textDark : textStyles.text,
        style,
      ]}>
      {children}
    </Text>
  );
};

export default ThemeText;
