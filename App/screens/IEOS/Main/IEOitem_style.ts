import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        marginHorizontal:2
    },
    currencyLogo: {},
    currencyInfoContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        flex: 4,
    },
    img: {
        height: 24,
        width: 24,
        borderRadius: 12,
        marginHorizontal: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
    },
    subTitle: {
        fontSize:12,
        fontWeight: '400',
    },
    status :{
        flex:3,
    }
})