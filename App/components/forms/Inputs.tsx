import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Platform} from 'react-native';
import {formStyles} from './styles';
import {Controller} from 'react-hook-form';
import * as Images from '../../assets';
import {strings} from '../../strings';
import {t} from 'react-native-tailwindcss';
import Colors, {darkTheme, lightTheme, rapunzelTheme} from '../../theme/Colors';
import {Icon} from 'react-native-elements';
import ImageContainer from '../ui/Logo';
import {ReturnKeyTypes} from '../../enums';
import {useSelector} from 'react-redux';
import {commonStyles, rtlStyles} from '../../globalstyles/styles';
import {ThemeFunctions} from '../../utils';
import ThemeText from '../ui/ThemeText';
import {buttonStyles} from '../ui/styles';
const Input = (props: any) => {
  const {
    id = '',
    control,
    required,
    label,
    update,
    dropdown = false,
    defaultValue = '',
    errors,
    multiline,
    maxLength,
    isRequired = false,
    pattern,
    minLength,
    isSecured = false,
    isFieldFilledBg = true,
    keyboardType,
    returnKeyType = 'next',
    reference,
    focusTo,
    placeholder,
    showTick = true,
    customStyles,
    showDropDown = true,
    disableInput = false,
    isVerifiedIcon = false,
    rightText = null,
    labelStyles = {},
    onChangeVal,
    fontSize,
    autoFocus = false,
    isModal = false,
    textTransform = '',
    patternCustomMsg = false,
    customLabelColor = {},
    showMargin = true,
    disabledColor,
    leftComponent,
    rightComponent,
    customInputStyles,
    star = false,
    ...restProps
  } = props;
  const [secureTextEntry, setSecureTextEntry] = useState(isSecured);
  const {isRtlApproach, appTheme, appColor} = useSelector(
    (state: any) => state.globalReducer,
  );

  const onSubmitEditing = () => {
    if (
      returnKeyType === ReturnKeyTypes.Next ||
      returnKeyType === ReturnKeyTypes.Done
    ) {
      focusTo?.current.focus();
    }
  };

  const alignEnd = () => {
    return isRtlApproach
      ? [rtlStyles.alignSelfEnd, pinkColor()]
      : textTransform
      ? {
          color: ThemeFunctions.customText(appTheme),
          textTransform: textTransform,
        }
      : pinkColor();
  };
  const pinkColor = () => {
    return {color: ThemeFunctions.customText(appTheme)};
  };
  const reverseDirection = () => {
    return isRtlApproach ? rtlStyles.reverseRow : {};
  };

  return (
    <View style={[formStyles.container, showMargin ? {} : {marginTop: 0}]}>
      {label && update ? (
        <View style={[commonStyles.rowView, commonStyles.justifySpace]}>
          <ThemeText style={formStyles.label}>
            {label}
            {star && <Text style={{color: 'red'}}> *</Text>}
          </ThemeText>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={update}
            style={[
              ThemeFunctions.themeBtnColor(appColor),
              {
                backgroundColor: Colors.SolMain,
                // height: 28,
                paddingHorizontal: 10,
                marginBottom: 8,
                borderRadius: 6,
                justifyContent: 'center',
              },
            ]}>
            <Text
              style={[
                buttonStyles.themeButton,
                ThemeFunctions.themeBtnText(appTheme),
                {fontSize: 16},
              ]}>
              UPDATE
            </Text>
          </TouchableOpacity>
        </View>
      ) : label ? (
        <ThemeText style={formStyles.label}>
          {label}
          {star && <Text style={{color: 'red'}}> *</Text>}
        </ThemeText>
      ) : (
        <></>
      )}
      <View
        style={[
          ThemeFunctions.getCardColor(appTheme),
          formStyles.inputView,
          customStyles,
        ]}>
        <Controller
          control={control}
          name={id}
          rules={{
            required: {
              value: isRequired,
              message: `${strings('err_required_field', {key: strings(id)})}`,
            },
            maxLength: {
              value: maxLength,
              message: `${strings('max_length_msg', {
                key: strings(id),
                maxLength,
              })}`,
            },
            pattern: {
              value: pattern,
              message: patternCustomMsg
                ? `${strings('password_validation_msg', {key: strings(id)})}`
                : `${strings('invalid_msg', {key: strings(id)})}`,
            },
            minLength: {
              value: minLength,
              message: `${strings('min_length_msg', {
                key: strings(id),
                minLength,
              })}`,
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <View
              style={[
                {flexDirection: 'row', alignItems: 'center'},
                reverseDirection(),
              ]}
              pointerEvents={dropdown && !rightComponent ? 'none' : 'auto'}>
              {leftComponent}
              <TextInput
                ref={reference}
                defaultValue={defaultValue}
                selectionColor={Colors.caretColor}
                style={[
                  formStyles.inputBox,
                  isRtlApproach ? {textAlign: 'right', marginEnd: 10} : {},
                  ,
                  {
                    color: disabledColor ? disabledColor : undefined,
                    fontSize: fontSize ? fontSize : 14,
                  },
                  ThemeFunctions.textColor(appTheme),
                  customInputStyles,
                ]}
                numberOfLines={2}
                placeholder={placeholder}
                placeholderTextColor={
                  !isFieldFilledBg && !ThemeFunctions.isRapunzelTheme(appTheme)
                    ? Colors.gray
                    : ThemeFunctions.isRapunzelTheme(appTheme) && !isModal
                    ? rapunzelTheme.secondaryColor
                    : Colors.textColor
                }
                // value={value?.trimStart()}
                value={value}
                adjustsFontSizeToFit={true}
                editable={!dropdown}
                onChangeText={onChangeVal ? onChangeVal : onChange}
                multiline={multiline}
                maxLength={maxLength}
                keyboardType={keyboardType}
                autoCapitalize="none"
                returnKeyType={returnKeyType}
                onSubmitEditing={onSubmitEditing}
                secureTextEntry={secureTextEntry}
                autoFocus={autoFocus}
                {...restProps}
              />
              {rightComponent}
              {rightText && (
                <View>
                  <Text
                    style={[
                      formStyles.rightText,
                      {color: ThemeFunctions.customText(appTheme)},
                    ]}>
                    {rightText}
                  </Text>
                </View>
              )}
              {dropdown && showDropDown && (
                <View style={formStyles.dropdown}>
                  <Icon
                    name="keyboard-arrow-down"
                    type="material"
                    color={ThemeFunctions.customText(appTheme)}
                    size={25}
                    style={{bottom: Platform.OS === 'android' ? 5 : 0}}
                  />
                </View>
              )}
              {isSecured ? (
                <TouchableOpacity
                  style={[formStyles.dropdown, {marginRight: 15}]}
                  onPress={() => setSecureTextEntry(!secureTextEntry)}>
                  <Icon
                    name={secureTextEntry ? 'eye' : 'eye-slash'}
                    type="font-awesome"
                    color={ThemeFunctions.getCurrentTextColor(appTheme)}
                    size={20}
                  />
                </TouchableOpacity>
              ) : (
                <View style={formStyles.dropdown}>
                  {value !== '' &&
                    !errors &&
                    !errors[id] &&
                    showTick &&
                    !props.errorMsg && (
                      <ImageContainer
                        imagePath={
                          isVerifiedIcon
                            ? Images.IcVerified
                            : ThemeFunctions.isRapunzelTheme(appTheme)
                            ? Images.IcCheckPink
                            : Images.IcCheck
                        }
                        noTransform={true}
                        imgStyle={formStyles.rightIcon}
                      />
                    )}
                </View>
              )}
            </View>
          )}
        />
      </View>
      {props?.errorMsg && errors[id] ? (
        <Text style={[t.textRed700, t.textXs, t.p1]}>{props.errorMsg}</Text>
      ) : (
        <>
          {errors[id] && (
            <Text style={[t.textRed700, t.textXs, t.p1]}>
              {errors[id].message}
            </Text>
          )}
        </>
      )}
    </View>
  );
};

export default Input;
