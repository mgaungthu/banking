import React, { useEffect, useRef, useState } from 'react'
import { FlatList, SafeAreaView, View, ScrollView, Text, TouchableOpacity } from 'react-native'
import { Header, BiometricWrapper, ImageContainer, Input, DropDown, ThemeButton, LoadingSpinner, ThemeText } from '../../components'
import { strings } from '../../strings'
import { commonStyles } from '../../globalstyles/styles'
import { APIConstants, DefaultArray, MapperConstants } from '../../constants'
import { useSelector } from 'react-redux'
import { getItem, ThemeFunctions } from '../../utils'
import * as Images from '../../assets'
import { FormConstants } from '../../enums'
import { useForm } from 'react-hook-form'
import styles from './styles';
import { mainCurrency } from '../../constants/DefaultArray'
import QRCode from 'react-native-qrcode-svg'
import Space from '../../components/ui/Space'
import { CheckBox } from 'react-native-elements'
import { makeRequest } from '../../services/ApiService'
import Colors from '../../theme/Colors'
import Title from '../../components/ui/pos/Title'

const Merchant = ({ navigation }) => {
    const {
        control,
        formState: { errors },
        setValue,
        handleSubmit,
        reset,
        setError
    } = useForm();

    const [checkBoxValue, setCheckBoxValue] = useState('B2B');

    const { userProfileData } = useSelector((state: any) => state.appReducer)
    const { appTheme, appColor } = useSelector((state: any) => state.globalReducer)

    const [isLoading, setIsLoading] = useState(true);
    const [isPress, setIsPress] = useState(false);
    const [isWaitingRequest, setIsWaitingRequest] = useState(false);

    const CheckBoxItem = ({ onPress, title }) => {
        const changeValue = (value) => setCheckBoxValue(value)
        return (
            <TouchableOpacity style={styles.checkboxWrap} onPress={() => changeValue(title)}>
                <CheckBox
                    center
                    checked={title == checkBoxValue}
                    containerStyle={styles.checkbox}
                    onPress={() => changeValue(title)}
                    checkedColor={ThemeFunctions.getColor(appColor)}
                />
                <Title>{title}</Title>
            </TouchableOpacity>
        )
    }

    const isEligible = userProfileData?.tfaStatus === 'enable' && userProfileData?.documentStatus === MapperConstants.KycStatusConstant.approved;

    const getLastestRequest = async () => {
        if (isEligible) {
            try {
                const response = await makeRequest(
                    MapperConstants.ApiTypes.POST,
                    APIConstants.GET_LASTEST_MERCHANT_REQUEST,
                    {},
                )
                if (response.status === 200) {
                    setIsLoading(false)
                    setIsWaitingRequest(response.data.status === 'pending');
                }
                else {

                }
            } catch (error) {

            }
        }
    }

    useEffect(() => {
        getLastestRequest();
    }, []);

    const onSubmit = async (data) => {
        try {
            setIsPress(true);
            const response = await makeRequest(
                MapperConstants.ApiTypes.POST,
                APIConstants.CREATE_MERCHANT_REQUEST,
                {},
                {
                    industry: data.industry,
                    client: checkBoxValue,
                    requestMessage: data.merchantDesc
                }
            )
            if (response.status === 200) {
                getLastestRequest();
            }
            else {
                setIsPress(false);
            }
        } catch (error) {

        }
    }

    return (
        <SafeAreaView
            style={[commonStyles.safeView, ThemeFunctions.setBackground(appTheme)]}>
            <Header
                title={strings('merchant_services')}
            />
            {isEligible ?
                <>
                    <ScrollView>
                        <View style={styles.formView}>
                            {isLoading ? <LoadingSpinner color={Colors.cyanBlue} size='small' /> :
                                <>
                                    {isWaitingRequest ?
                                        <ThemeButton
                                            text='waiting_for_review'
                                            color='#B79E46'
                                            disabledColor={true}
                                            onPress={null}
                                            onClickHandler={() => null}
                                        />
                                        :
                                        <>
                                            <Title>Merchant services are available to all sole traders and businesses</Title>
                                            <Title>Services available after registration:</Title>
                                            <ThemeText style={[
                                                styles.titleSmall
                                            ]}>● GlobiancePOS</ThemeText>
                                            <ThemeText style={[
                                                styles.titleSmall
                                            ]}>● Globiance Crypto Gateway</ThemeText>
                                            <Space height={20} />
                                            <Input
                                                id={FormConstants.Industry}
                                                label={strings('industry')}
                                                placeholder={strings('industry_placeholder')}
                                                control={control}
                                                errors={errors}
                                                isFieldFilledBg={false}
                                                isRequired={true}
                                                showDropDown={false}
                                                showTick={false}
                                            />
                                            <Space height={10} />
                                            <Title>Which clients do you serve:</Title>
                                            <View style={styles.checkboxViewContainer}>
                                                <CheckBoxItem
                                                    title='B2B'
                                                    onPress={null}
                                                />
                                                <CheckBoxItem
                                                    title='B2C'
                                                    onPress={null}
                                                />
                                                <CheckBoxItem
                                                    title='B2B & B2C'
                                                    onPress={null}
                                                />
                                            </View>
                                            <Space height={5} />
                                            <Input
                                                id={FormConstants.MerchantDesc}
                                                label={strings('describe_your_business')}
                                                placeholder={strings('what_you_sell_clients')}
                                                control={control}
                                                errors={errors}
                                                isFieldFilledBg={false}
                                                isRequired={true}
                                                customStyles={[
                                                    styles.inputMultiline
                                                ]}
                                                multiline={true}
                                                showDropDown={false}
                                                showTick={false}
                                            />
                                            <Space height={20} />
                                        </>
                                    }
                                </>
                            }
                        </View>
                    </ScrollView>
                    <View style={commonStyles.paddingHorizontalView}>
                        <ThemeButton
                            text='apply_for_merchant_services'
                            onClickHandler={handleSubmit(onSubmit)}
                            loading={isPress}
                        />
                    </View>
                </>
                :
                <View style={styles.itemCenter}>
                    {(userProfileData?.documentStatus !== MapperConstants.KycStatusConstant) &&
                        <Text style={styles.errorVerified}>{strings('please_complete_kyc')}</Text>
                    }
                    {userProfileData.tfaStatus !== 'enable' &&
                        <Text style={styles.errorVerified}>{strings('please_enable_tfa')}</Text>
                    }
                </View>
            }
        </SafeAreaView>
    )
}

export default Merchant