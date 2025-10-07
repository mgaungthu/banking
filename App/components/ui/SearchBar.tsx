import React from 'react';
import {searchStyles} from './styles';
import {Searchbar} from 'react-native-paper';
import {Icon} from 'react-native-elements';
import Colors, {darkTheme, lightTheme} from '../../theme/Colors';
import {useSelector} from 'react-redux';
import {ThemeFunctions} from '../../utils';
import {isDarkTheme} from '../../utils/ThemeFunctions';

const SearchBar = ({
  placeholder,
  onChangeText,
  onCancel,
  searchQuery,
  style,
}: any) => {
  const {appTheme} = useSelector((state: any) => state.globalReducer);
  const searchColor = () => {
    return isDarkTheme(appTheme) ? darkTheme.text : lightTheme.text;
  };
  return (
    <Searchbar
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={searchQuery}
      inputStyle={[searchStyles.searchInput, {color: searchColor()}]}
      style={[
        {
          elevation: 2,
          marginVertical: 10,
          borderWidth: 0.5,
          borderColor: ThemeFunctions.customText(appTheme),
          borderRadius: 8,
        },
        ThemeFunctions.setBackground(appTheme),
      ]}
      iconColor={searchColor()}
      selectionColor={Colors.caretColor}
      placeholderTextColor={ThemeFunctions.customText(appTheme)}
      multiline={false}
      numberOfLines={1}
      textAlign="left"
      clearIcon={() => (
        <Icon
          name="clear"
          type="material"
          size={20}
          color={searchColor()}
          onPress={onCancel}
        />
      )}
    />
  );
};

export default SearchBar;
