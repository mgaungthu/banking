import React, { useEffect, useRef, useState } from 'react'
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { Header, BiometricWrapper, ImageContainer, LoadingSpinner, Note, Cell, ThemeText } from '../../components'
import { strings } from '../../strings'
import { commonStyles } from '../../globalstyles/styles'
import { APIConstants, DefaultArray, MapperConstants } from '../../constants'
import { useSelector } from 'react-redux'
import { ThemeFunctions } from '../../utils'
import RowItem from '../account/RowItem'
import { securityStyles } from '../account/styles'
import { listStyles } from './styles';
import { makeGetRequest, makeRequest } from '../../services/ApiService'
import { showToast } from '../../utils/GenericUtils'
import * as Images from '../../assets'
import Colors from '../../theme/Colors'
import { ucFirst } from '../../utils/AppFunctions'
import Navigation from '../../utils/Navigation'
import { Screen } from '../../enums'

const CreditCardList = (props: any) => {
    const { appTheme, isRtlApproach } = useSelector((state: any) => state.globalReducer)

    const [listCard, setListCard] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const textColor = () => {
        return ThemeFunctions.customText(appTheme)
    }

    const _getList = async () => {
        try {
            const response = await makeGetRequest(
                APIConstants.CARD_INTEGRATION_STATUS,
            )
            if (response.status === 200) {
                // setListCard(response.data)
                setListCard([
                    {"cardName": "globiance deposit", "status": "enable", "supportedCurrencies": ["BTC", "XRP", "ETH", "USDT"]},
                    ...response.data
                ])
                setIsLoading(false)
            }
            else showToast(strings('deposit_credit'), response.message, 'error')
        } catch (error) {
            showToast(strings('deposit_credit'), 'Error', 'error')
        }
    }

    const _chooseCard = (item) => {
        try {
            if (item.status === 'disabled') {
                showToast(strings('deposit_credit'), `${ucFirst(item.cardName)} is temporary disabled`, 'error')
                return;
            }

            if (item.cardName==="globiance deposit") {
                Navigation.navigate(Screen.GlobianceDeposit, { data: item });
                return;
            }

            Navigation.navigate(Screen.CreditCard, { data: item })
        } catch (error) {
            showToast(strings('deposit_credit'), 'Error', 'error')
        }
    }

    useEffect(() => {
        _getList();
    }, [])

    return (
        <SafeAreaView
            style={[commonStyles.safeView, ThemeFunctions.setBackground(appTheme)]}>
            <Header title={strings('deposit_credit')} />
            <Note
                subtitle={"FIAT will be auto converted to stablecoins eg.You will get EURG for EUR card deposit"}
                appTheme={appTheme}
            />
            {isLoading ?
                <LoadingSpinner color={Colors.white} size='small' />
                :
                <FlatList
                    data={listCard}
                    contentContainerStyle={listStyles.list}
                    renderItem={({ item }) => (
                        <>
                            <Cell
                                onPress={() => _chooseCard(item)}
                                style={[listStyles.item]}
                            >
                                <View style={[listStyles.leftView]}>
                                    <View>
                                        <ThemeText
                                            style={[
                                                listStyles.label,
                                                isRtlApproach
                                                    ? { marginEnd: 10 }
                                                    : {},
                                            ]}>
                                            {item.cardName}
                                        </ThemeText>
                                    </View>
                                </View>
                                <ImageContainer
                                    imagePath={Images.IcForwardArrow}
                                    imgStyle={[listStyles.rightIcon, ThemeFunctions.imgColor(appTheme)]}
                                />
                            </Cell>
                        </>
                    )}
                    keyExtractor={(_, key) => `${key}`}
                />
            }
        </SafeAreaView>
    )
}

export default CreditCardList
