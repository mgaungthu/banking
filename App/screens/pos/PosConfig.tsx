import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView, View, ScrollView, Switch, Text, Platform, Image } from 'react-native'
import { Header, Input, DropDown, ThemeButton, ThemeText } from '../../components'
import { strings } from '../../strings'
import { commonStyles } from '../../globalstyles/styles'
import { APIConstants, MapperConstants } from '../../constants'
import { useSelector } from 'react-redux'
import { RegexExpression, ThemeFunctions } from '../../utils'
import { FormConstants } from '../../enums'
import { useForm } from 'react-hook-form'
import styles from './styles';
import Colors from '../../theme/Colors'
import { showToast } from '../../utils/GenericUtils'
import { navigationRef } from '../../utils/Navigation'
import { makeRequest } from '../../services/ApiService'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Title from '../../components/ui/pos/Title'
import Space from '../../components/ui/Space'
import InputPos from '../../components/forms/InputPos'
import { FundingActive } from '../../assets'

const PosConfig = (props: any) => {
    const { userProfileData } = useSelector((state: any) => state.appReducer)
    const { appTheme, appColor } = useSelector((state: any) => state.globalReducer)
    const currencys = useSelector((state: any) => state.quickBuyReducer?.fundsList);
    const currencyInit = currencys?.map(el => el.name) || []

    const [isEnableVat, setIsEnableVat] = useState(true);

    const [isPress, setIsPress] = useState(false)

    const [currencysArr, setCurrencyArr] = useState(currencyInit)

    const referenceRef = useRef(null);

    const {
        control,
        formState: { errors },
        setValue,
        handleSubmit,
        reset,
        setError
    } = useForm()

    const onSubmit = async (data) => {
        if (!isPress) {
            try {
                setIsPress(true)
                const dataCurrency = currencys?.find(el => el.name === data.standard_currency);
                const formData = {
                    merchantAddress: isEnableVat ? data.merchantAddress : "",
                    reference: isEnableVat ? data.reference : "",
                    currencyName: data.standard_currency,
                    vatPercent: isEnableVat ? parseFloat(data.vatPercent) : 0,
                    vatText: isEnableVat ? data.vatText : null,
                    isVat: isEnableVat ? 1 : 0,
                    currencyId: dataCurrency?.currencyId,
                    uniqueId: dataCurrency?.uniqueId,
                }
                const response = await makeRequest(
                    MapperConstants.ApiTypes.POST,
                    APIConstants.SAVE_PAYMENT_CONFIG,
                    {},
                    formData
                )
                if (response.status === 200) {
                    setIsPress(false)
                    showToast(strings('globiance_pos'), response.message, 'success')
                    navigationRef.current.goBack();
                    props.route.params.onSave(formData);
                }
                else {
                    showToast(strings('globiance_pos'), response.message, 'error')
                    setIsPress(false);
                }
            } catch (error) {
                showToast(strings('globiance_pos'), 'Error save config', 'error');
                setIsPress(false);
                console.log(error);
            }
        }
    }

    const getItemConfig = async () => {
        const configData = props.route.params?.configData;
        if (configData) {
            const currencyName = currencys?.find(el => el.currencyId === configData.currencyId)?.name;
            if (currencyName) {
                setValue(FormConstants.StandardCurrency, currencyName);
            }
            setValue(FormConstants.Reference, configData.reference);
            setIsEnableVat(configData.isVat == 1);
            setValue(FormConstants.VatPercent, configData.vatPercent > 0 ? configData.vatPercent.toString() : "");
            setValue(FormConstants.VatText, configData.vatText);
            setValue(FormConstants.MerchantAddress, configData.merchantAddress);
        }
    }

    const changeVatPercent = (value) => {
        value = value.replace(',', '.');
        if (value < 10 && value.length == 5) return;
        setValue(FormConstants.VatPercent, value);
    }

    const _changeTextSearch = (text) => {
        setCurrencyArr(currencyInit.filter(item => item.includes(text.toUpperCase())))
    }

    useEffect(() => {
        getItemConfig();
    }, [])

    return (
        <SafeAreaView
            style={[commonStyles.safeView, ThemeFunctions.setBackground(appTheme)]}>
            <Header
                title={strings('payment_config')}
            />
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                <View style={styles.formView}>
                    <DropDown
                        options={currencysArr}
                        customHeight={180}
                        customTextStyle={{ textTransform: 'uppercase' }}
                        showSearch={true}
                        onChangeTextSearch={_changeTextSearch}
                        onHide={() => setCurrencyArr(currencyInit)}
                        renderSeparator={Platform.OS === 'ios' ?
                            () => <View style={{ backgroundColor: '#d6d6d6', height: 1, bottom: 15 }}></View> : undefined
                        }
                        renderRowText={e => {
                            const imageCurrency = currencys?.find(el => el.name == e)?.assetUrl;
                            return (
                                <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
                                    <Image
                                        style={{ height: 20, width: 20, borderRadius: 10, marginRight: 10 }}
                                        source={imageCurrency ? { uri: imageCurrency } : FundingActive}
                                    />
                                    <Text>{e}</Text>
                                </View>
                            )
                        }}
                        updateValue={index => {
                            setValue(FormConstants.StandardCurrency, currencysArr[index])
                            setCurrencyArr(currencyInit)
                        }}>
                        <InputPos
                            id={FormConstants.StandardCurrency}
                            label={strings('standard_currency')}
                            control={control}
                            errors={errors}
                            placeholder={`${strings('select')}`}
                            isFieldFilledBg={false}
                            isRequired={true}
                            dropdown={true}
                            showTick={false}
                        />
                    </DropDown>
                    <View style={[
                        styles.enableVatContainer,
                        ThemeFunctions.getCardColor(appTheme)
                    ]}>
                        <ThemeText style={[
                            styles.titleDefault,
                            { alignSelf: 'center', marginTop: 2 }
                        ]}>{strings('vat')}</ThemeText>
                        <Switch
                            trackColor={{ false: Colors.gray, true: ThemeFunctions.getColor(appColor) }}
                            thumbColor={'white'}
                            ios_backgroundColor={isEnableVat ? Colors.cyan : Colors.gray}
                            onValueChange={setIsEnableVat}
                            value={isEnableVat}
                            style={styles.switch}
                        />
                    </View>
                    {isEnableVat &&
                        <>
                            <InputPos
                                id={FormConstants.VatPercent}
                                label={strings('vat') + ' %'}
                                pattern={RegexExpression.DECIMAL_REGEX}
                                maxLength={5}
                                keyboardType='decimal-pad'
                                placeholder={`0.0`}
                                control={control}
                                errors={errors}
                                isFieldFilledBg={false}
                                isRequired={true}
                                showDropDown={false}
                                showTick={false}
                                onChangeVal={changeVatPercent}
                            />
                            <InputPos
                                id={FormConstants.VatText}
                                label={strings('vat_text')}
                                placeholder={`This receipt contains 12% VAT`}
                                control={control}
                                errors={errors}
                                isFieldFilledBg={false}
                                isRequired={true}
                                showDropDown={false}
                                showTick={false}
                                autoCapitalize='sentences'
                            />
                            <Input
                                id={FormConstants.MerchantAddress}
                                label={strings('merchant_address')}
                                reference={referenceRef}
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
                                autoCapitalize='sentences'
                                placeholder='Input merchant address'
                            />
                            <Space height={20} />
                            <Title>Standard</Title>
                            <InputPos
                                id={FormConstants.Reference}
                                label={strings('reference')}
                                control={control}
                                errors={errors}
                                isFieldFilledBg={false}
                                isRequired={true}
                                customStyles={[
                                    styles.inputMultiline
                                ]}
                                inputStyle={{ alignSelf: 'center' }}
                                multiline={true}
                                showDropDown={false}
                                showTick={false}
                                autoCapitalize='sentences'
                                placeholder='Input reference'
                                showMargin={false}
                            />
                        </>
                    }
                </View>
                {Platform.OS === 'ios' && <KeyboardSpacer />}
            </ScrollView>
            <ThemeButton
                text='save'
                onClickHandler={handleSubmit(onSubmit)}
                loading={isPress}
                styleButton={{ marginHorizontal: 10 }}
            />
        </SafeAreaView>
    )
}

export default PosConfig