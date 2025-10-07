import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {buttonStyles as styles} from './styles';
import {strings} from '../../strings';
import LoadingSpinner from './Loader';
import Colors, {rapunzelTheme} from '../../theme/Colors';
import {useSelector} from 'react-redux';
import {ThemeFunctions} from '../../utils';
import {Icon} from 'react-native-elements';

const ThemeButton = (props: any) => {
  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer);
  const {
    isLocalised = false,
    errorColor = false,
    styleButton,
    styleText,
    marginStyle,
  } = props;
  return (
    <TouchableOpacity
      style={[
        [
          styles.themeButtonContainer,
          ThemeFunctions.themeBtnColor(appColor),
          styleButton,
        ],
        props.color
          ? {backgroundColor: props.color}
          : props.disabledColor
          ? {backgroundColor: props.disabledColor}
          : errorColor
          ? {backgroundColor: Colors.contentRed}
          : {},
        marginStyle,
      ]}
      activeOpacity={0.8}
      disabled={props.disabled}
      onPress={() => props.onClickHandler()}>
      {props.loading ? (
        <LoadingSpinner color={Colors.white} size="small" />
      ) : (
        <>
          {props.iconName && (
            <Icon
              name={props.iconName}
              type={props.iconType}
              size={24}
              color={Colors.white}
              style={styles.iconButton}
            />
          )}
          <Text
            adjustsFontSizeToFit={true}
            style={[
              [
                styles.themeButton,
                ThemeFunctions.themeBtnText(appTheme),
                {textTransform: errorColor ? 'none' : 'capitalize'},
                styleText,
              ],
              props.color && !props.disabledColor
                ? {color: Colors.grayBlue}
                : {},
            ]}>
            {isLocalised ? props.text : strings(props.text)}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default ThemeButton;
