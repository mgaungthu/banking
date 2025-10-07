import React from 'react';
import {searchStyles} from './styles';
import {Searchbar} from 'react-native-paper';
import {Icon} from 'react-native-elements';
import Colors, {rapunzelTheme} from '../../theme/Colors';
import {useSelector} from 'react-redux';
import {ThemeFunctions} from '../../utils';

const SearchBar = ({placeholder, onChangeText, onCancel, searchQuery}: any) => {
  const {appTheme} = useSelector((state: any) => state.globalReducer);
  const searchColor = () => {
    return ThemeFunctions.getCurrentTextColor(appTheme);
  };

  return (
    <Searchbar
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={searchQuery}
      inputStyle={[searchStyles.searchInput, {color: searchColor()}]}
      style={[
        {
          marginHorizontal: 16,
          elevation: 2,
          marginVertical: 10,
          borderWidth: 0.5,
          borderColor: ThemeFunctions.customText(appTheme),
        },
        ThemeFunctions.setBackground(appTheme),
      ]}
      iconColor={searchColor()}
      selectionColor={Colors.caretColor}
      placeholderTextColor={searchColor()}
      multiline={false}
      numberOfLines={1}
      textAlign="auto"
      clearIcon={() => {
        {
          searchQuery && (
            <Icon
              name="clear"
              type="material"
              size={20}
              color={searchColor()}
              onPress={onCancel}
            />
          );
        }
      }}
    />
  );
};

export default SearchBar;
