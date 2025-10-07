import React from "react";
import { Text, View, StyleSheet } from 'react-native';
import { commonStyles } from "../../globalstyles/styles";

const StatusView = ({ status }) => {

    const background = styles[status.toLowerCase()] || styles.middle;

    return (
        <View style={[ styles.statusContainer, background, commonStyles.shadow ]}>
            <Text style={[ styles.statusText ]}>{ status }</Text>
        </View>
    )
}

export default StatusView;

const styles = StyleSheet.create({
    statusContainer: {
        width: 75,
        height: 20,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 64,
    },
    statusText: {
        color: '#fff',
        textTransform: "uppercase",
        fontSize: 9,
        fontWeight: '400',
    },
    upcoming: {
        backgroundColor: '#FFA500'
    },
    available: {
        backgroundColor: '#52AA5E'
    },
    completed: {
        backgroundColor: '#FF0000'
    },
    middle: {
        backgroundColor: '#c4c4c4',
    }
})