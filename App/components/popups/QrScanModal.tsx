import React from 'react';
import { View, StyleSheet, SafeAreaView } from "react-native"
import { CustomModal, UiHeader } from ".."
import Colors from "../../theme/Colors"
import QRCodeScanner from 'react-native-qrcode-scanner';
import { strings } from '../../strings';

export default ({
    visibility,
    onClose,
    onSuccess,
    title=strings('scan_qr')
}) =>{
    return(
        <CustomModal
            visibility={visibility}
            onBackdropPress={onClose}
            justify={true}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.headerContainer}>
                    <UiHeader
                        title={title}
                        iconColor={Colors.dimGray}
                        showBack={false}
                        handleBack={onClose}
                    />
                </View>
                <QRCodeScanner
                    onRead={onSuccess}
                    cameraStyle={{ height: "100%" }}
                />
            </SafeAreaView>
        </CustomModal>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff',
        height: '100%'
    },
    headerContainer:{
        marginRight: 20
    }
})