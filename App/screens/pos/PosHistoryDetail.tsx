import React, { useEffect, useRef, useState } from 'react'
import { FlatList, SafeAreaView, View, ScrollView, useWindowDimensions, Text, TouchableOpacity, Image } from 'react-native'
import { Header, BiometricWrapper, ImageContainer, Input, DropDown, ThemeButton, LoadingSpinner, ThemeText } from '../../components'
import { strings } from '../../strings'
import { commonStyles } from '../../globalstyles/styles'
import { APIConstants, DefaultArray, MapperConstants } from '../../constants'
import { useSelector } from 'react-redux'
import { navigate, ThemeFunctions } from '../../utils'
import * as Images from '../../assets'
import { FormConstants, Screen } from '../../enums'
import { useForm } from 'react-hook-form'
import styles from './styles';
import { mainCurrency } from '../../constants/DefaultArray'
import QRCode from 'react-native-qrcode-svg'
import { TabView, TabBar } from 'react-native-tab-view'
import Pos from './Pos'
import PosHistory from './PosHistory'
import { rapunzelTheme } from '../../theme/Colors'
import PosConfig from './PosConfig'
import { Icon } from 'react-native-elements'
import Colors from '../../theme/Colors'
import Clipboard from '@react-native-clipboard/clipboard';
import { showToast } from '../../utils/GenericUtils'
import moment from 'moment'
import { convertToUsdPrice, roundFloatNumber } from '../../utils/AppFunctions'
import Title from '../../components/ui/pos/Title'
import { makeRequest } from '../../services/ApiService'

const PosHistoryDetail = (props: any) => {
    const { appTheme, appColor } = useSelector((state: any) => state.globalReducer)

    const { historyDay, id } = props.route?.params;
    const [isLoading, setIsLoading] = useState(id ? true : false);
    const [historyData, setHistoryData] = useState(historyDay || {});

    const styleResultContainer = [
        styles.resultContainer,
        { borderBottomColor: ThemeFunctions.getCurrentTextColor(appTheme) }
    ]

    const TextSmall = ({ children, style }: any) => (
        <ThemeText style={[
            styles.textHistorySmall, style
        ]}>
            {children}
        </ThemeText>
    )

    const paymentConfig = JSON.parse(historyData?.PaymentConfig || '{}')

    const vatCacl = paymentConfig.isVat ? roundFloatNumber((historyData?.amountPay - historyData?.amount - historyData?.tip).toFixed(12), 12) : 0

    const currencys = useSelector((state: any) => state.quickBuyReducer.fundsList);
    const currentCurrency = currencys?.find(el => el?.name == paymentConfig?.currencyName);

    const copyTransactionId = (uniqueId) => {
        Clipboard.setString(uniqueId);
        showToast(strings('order_detail'), 'Copied to clipboard', 'success')
    }

    const getDetailHistory = async() =>{
        try {
            const response = await makeRequest(
                MapperConstants.ApiTypes.POST,
                APIConstants.GET_HISTORY_PAYMENT_DETAILS, {},
                {id}
            )
            setIsLoading(false)
            if (response.status === 200) {
                setHistoryData(response.data)
            }
            else showToast(strings('globiance_pos'), response.message, 'error')
        } catch (error) {
            showToast(strings('globiance_pos'), 'Error server', 'error');
            setIsLoading(false)
            console.log(error);
        }
    }

    useEffect(() =>{
        if(id) getDetailHistory();
    }, [])

    return (
        <SafeAreaView
            style={[commonStyles.safeView, ThemeFunctions.setBackground(appTheme)]}>
            <Header title={strings('order_detail')} />
            {isLoading ?
                <LoadingSpinner color={Colors.white} size='small' />
                :
                <ScrollView>
                    <View style={styles.formView}>
                        <View style={styleResultContainer}>
                            <Title>{strings('reference')}</Title>
                            <Title styleExtend={styles.textReferenceDetail}>{historyData?.reference}</Title>
                        </View>
                        <View style={styleResultContainer}>
                            <Title>{historyData?.UserFrom?.email ? 'Sender' : 'Merchant'}</Title>
                            <Title>{historyData?.UserFrom?.email || historyData?.UserTo?.email}</Title>
                        </View>
                        <View style={styleResultContainer}>
                            <Title>{strings('currency_label')}</Title>
                            <View style={styles.currencyNameContainer}>
                                <Image
                                    source={{ uri: currentCurrency?.assetUrl }}
                                    style={styles.imageCurrency}
                                />
                                <Title>{historyData?.Currency?.name}</Title>
                            </View>
                        </View>
                        <View style={styleResultContainer}>
                            <Title>{strings('amount')}</Title>
                            <View>
                                <Title styleExtend={{alignSelf: 'flex-end'}}>{historyData?.amount} {historyData?.Currency?.name}</Title>
                                <Text style={styles.textDollar}>{convertToUsdPrice(historyData?.Currency?.name, historyData?.amount)} USD</Text>
                            </View>
                        </View>
                        <View style={styleResultContainer}>
                            <Title>{strings('vat')} ({paymentConfig.vatPercent || 0}%)</Title>
                            <View>
                                <Title styleExtend={{alignSelf: 'flex-end'}}>{vatCacl} {historyData?.Currency?.name}</Title>
                                <Text style={styles.textDollar}>{convertToUsdPrice(historyData?.Currency?.name, vatCacl)} USD</Text>
                            </View>
                        </View>
                        <View style={styleResultContainer}>
                            <Title>Tips</Title>
                            <View>
                                <Title styleExtend={{alignSelf: 'flex-end'}}>{historyData?.tip} {historyData?.Currency?.name}</Title>
                                <Text style={styles.textDollar}>{convertToUsdPrice(historyData?.Currency?.name, historyData?.tip)} USD</Text>
                            </View>
                        </View>
                        <View style={styleResultContainer}>
                            <Title>{strings('total')}</Title>
                            <View>
                                <Title styleExtend={{alignSelf: 'flex-end'}}>{historyData?.amountPay} {historyData?.Currency?.name}</Title>
                                <Text style={styles.textDollar}>{convertToUsdPrice(historyData?.Currency?.name, historyData?.amountPay)} USD</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[
                        styles.hrHistory,
                        {backgroundColor: ThemeFunctions.getColor(appColor)}
                    ]} />
                    <View style={styles.formView}>
                        <View style={styleResultContainer}>
                            <Title>Transaction id</Title>
                            <View style={styles.transactionContainer}>
                                <TouchableOpacity onPress={() => copyTransactionId(historyData?.uniqueId)}>
                                    <Icon
                                        name='content-copy'
                                        type='material'
                                        color={ThemeFunctions.isRapunzelTheme(appTheme) ? Colors.pink : Colors.white}
                                        size={14}
                                    />
                                </TouchableOpacity>
                                <TextSmall>{historyData?.uniqueId}</TextSmall>
                            </View>
                        </View>
                        <View style={styleResultContainer}>
                            <Title>Date / Time</Title>
                            <View>
                                <TextSmall>{moment(historyData.createdAt).format('dddd, YYYY MMM DD')}</TextSmall>
                                <TextSmall style={{ paddingTop: 0 }}>
                                    {moment(historyData.createdAt).format('h:mm:ss a')}
                                </TextSmall>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            }
        </SafeAreaView>
    )
}

export default PosHistoryDetail
