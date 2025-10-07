import React from 'react'
import { View } from "react-native"
import Colors from "../../theme/Colors"
import { percentBoxStyles } from "./styles"
import ThemeText from "./ThemeText"

export default (props) =>{
    return(
        <View style={[
            percentBoxStyles.percentBox,
            {backgroundColor: props?.percent >= 0 ? '#d7f5e1' : '#FBE0EA'}
        ]}>
            <ThemeText style={{
                color: props?.percent >= 0 ? Colors.currencyGreen : Colors.currencyRed,
                textAlign: 'center'
            }}>{props.percent}%</ThemeText>
        </View>
    )
}