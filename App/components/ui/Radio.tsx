import React from 'react'
import { View, Text, TouchableOpacity, Image, ViewStyle } from 'react-native'
import { commonStyles, rtlStyles } from '../../globalstyles/styles'
import { Icon } from 'react-native-elements'
import { goBack, ThemeFunctions } from '../../utils'
import { useSelector } from 'react-redux'
import { darkTheme, lightTheme, rapunzelTheme } from '../../theme/Colors'
import { isIOS } from '../../utils/DeviceConfig'
import { isDarkTheme } from '../../utils/ThemeFunctions'
import { cellStyles, radioStyles } from './styles'
import IconVector from './IconVector'

const Radio = ({ active, style }: { active: boolean, style?: ViewStyle }) => {
    const { appTheme, appColor } = useSelector(
        (state: any) => state.globalReducer,
    )

    return (
        <>
            {active ?
                <View style={radioStyles.active}>
                    <IconVector.Entypo
                        name='check'
                        color={lightTheme.primaryColor}
                        style={{ alignItems: 'center' }}
                        size={16}
                    />
                </View>
                :
                <View style={radioStyles.default} />
            }
        </>

    )
}

export default Radio