import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { formStyles } from './styles'
import { Controller } from 'react-hook-form'
import * as Images from '../../assets'
import { strings } from '../../strings'
import { t } from 'react-native-tailwindcss'
import Colors, { darkTheme, rapunzelTheme } from '../../theme/Colors'
import { Icon } from 'react-native-elements'
import ImageContainer from '../ui/Logo'
import { ReturnKeyTypes } from '../../enums'
import { useSelector } from 'react-redux'
import { rtlStyles } from '../../globalstyles/styles'
import { ThemeFunctions } from '../../utils'
import ThemeText from '../ui/ThemeText'
import { isIOS } from '../../utils/DeviceConfig'
const InputPos = (props: any) => {
    const {
        id = '',
        control,
        required,
        label,
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
        rightComponent,
        inputStyle,
        customInputStyles,
        ...restProps
    } = props
    const [secureTextEntry, setSecureTextEntry] = useState(isSecured)
    const { isRtlApproach, appTheme } = useSelector(
        (state: any) => state.globalReducer,
    )

    const onSubmitEditing = () => {
        if (
            returnKeyType === ReturnKeyTypes.Next ||
            returnKeyType === ReturnKeyTypes.Done
        ) {
            focusTo?.current.focus()
        }
    }

    const alignEnd = () => {
        return isRtlApproach
            ? [rtlStyles.alignSelfEnd, pinkColor()]
            : textTransform
                ? {
                    color: ThemeFunctions.customText(appTheme),
                    textTransform: textTransform,
                }
                : pinkColor()
    }
    const pinkColor = () => {
        return { color: ThemeFunctions.customText(appTheme) }
    }
    const reverseDirection = () => {
        return isRtlApproach ? rtlStyles.reverseRow : {}
    }
    return (
        <View style={[formStyles.container, showMargin ? {} : { marginTop: 0 }]}>
            <View
                style={[formStyles.inputView, ThemeFunctions.getCardColor(appTheme), customStyles]}>
                <Controller
                    control={control}
                    name={id}
                    rules={{
                        required: {
                            value: isRequired,
                            message: `${strings('err_required_field', { key: strings(id) })}`,
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
                                ? `${strings('password_validation_msg', { key: strings(id) })}`
                                : `${strings('invalid_msg', { key: strings(id) })}`,
                        },
                        minLength: {
                            value: minLength,
                            message: `${strings('min_length_msg', {
                                key: strings(id),
                                minLength,
                            })}`,
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={[{ flexDirection: 'row' }, reverseDirection()]} pointerEvents={dropdown ? 'none' : 'auto'}>
                            {label && (
                                <ThemeText
                                    style={[
                                        formStyles.label, labelStyles, customLabelColor ? customLabelColor : pinkColor(),
                                        { alignSelf: 'center', marginRight: 40, marginLeft: 10 }
                                    ]}>
                                    {label}
                                </ThemeText>
                            )}
                            <TextInput
                                ref={reference}
                                defaultValue={defaultValue}
                                selectionColor={Colors.caretColor}
                                style={[
                                    formStyles.inputBox,
                                    isRtlApproach ? { textAlign: 'right', marginEnd: 10 } : {}, ,
                                    {
                                        color: disabledColor ? disabledColor : undefined,
                                        fontSize: fontSize ? fontSize : 14,
                                    },
                                    ThemeFunctions.textColor(appTheme),
                                    {textAlign: 'right', alignSelf: 'center'},
                                    customInputStyles
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
                                autoCapitalize='none'
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
                                            { color: ThemeFunctions.customText(appTheme) },
                                        ]}>
                                        {rightText}
                                    </Text>
                                </View>
                            )}
                            {dropdown && showDropDown && (
                                <View style={formStyles.dropdown}>
                                    <Icon
                                        name='keyboard-arrow-down'
                                        type='material'
                                        color={ThemeFunctions.customText(appTheme)}
                                        size={25}
                                        style={{bottom: isIOS() ? 0 : 5}}
                                    />
                                </View>
                            )}
                            {isSecured ? (
                                <TouchableOpacity
                                    style={formStyles.dropdown}
                                    onPress={() => setSecureTextEntry(!secureTextEntry)}>
                                    <Icon
                                        name={secureTextEntry ? 'eye' : 'eye-slash'}
                                        type='font-awesome'
                                        color={
                                            ThemeFunctions.isRapunzelTheme(appTheme)
                                                ? rapunzelTheme.magenta
                                                : darkTheme.inputColor
                                        }
                                        size={20}
                                    />
                                </TouchableOpacity>
                            ) : (
                                <View style={formStyles.dropdown}>
                                    {value !== '' && !errors &&
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
            {props?.errorMsg ? (
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
    )
}

export default InputPos
