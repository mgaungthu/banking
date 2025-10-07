import React from 'react'
import { View, Text, TouchableOpacity, Image, ViewStyle } from 'react-native'
import { commonStyles, rtlStyles } from '../../globalstyles/styles'
import { Icon } from 'react-native-elements'
import { goBack, ThemeFunctions } from '../../utils'
import { useSelector } from 'react-redux'
import { darkTheme, lightTheme, rapunzelTheme } from '../../theme/Colors'
import { isIOS } from '../../utils/DeviceConfig'
import { isDarkTheme } from '../../utils/ThemeFunctions'
import { cellStyles } from './styles'

const Cell = ({
    children, style, onPress
} : {children: any, style?: ViewStyle | Array<any>, onPress?: any}) =>{
    const { isRtlApproach, appTheme, appColor } = useSelector(
        (state: any) => state.globalReducer,
    )

    return (
        <TouchableOpacity style={[
            isDarkTheme(appTheme) ? cellStyles.containerDark : cellStyles.container,
            style
        ]}
        onPress={onPress}
        >
            {children}
        </TouchableOpacity>
    )
}

export default Cell