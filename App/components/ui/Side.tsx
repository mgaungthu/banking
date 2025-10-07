import { Text, View } from "react-native"
import React from 'react'
import {sideStyles as styles} from './styles'
import Colors from "../../theme/Colors"

const Side = ({type}) =>{
    return(
        <View style={[styles.side, {backgroundColor: type == 'buy' ? Colors.currencyGreen : Colors.currencyRed}]}>
            <Text style={styles.textSide}>{type == 'buy' ? 'B' : 'S'}</Text>
        </View>
    )
}

export default Side