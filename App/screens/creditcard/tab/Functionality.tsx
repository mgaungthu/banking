import React, { useEffect, useRef, useState } from 'react'
import { TouchableOpacity, View, Text, Image, ScrollView, TextInput, SafeAreaView, Platform } from 'react-native'
import { formStyles as styles } from '../../account/styles'
import { CustomModal, DropDown, Input, ThemeButton, UiHeader } from '../../../components'
import { FormConstants, Loader, Screen } from '../../../enums'
import { strings } from '../../../strings'
import { APIConstants, AppConstants, MapperConstants } from '../../../constants'
import { commonStyles } from '../../../globalstyles/styles'
import { creditCardStyles } from '../styles'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeFunctions } from '../../../utils'
import Colors, { rapunzelTheme } from '../../../theme/Colors'
import { Icon } from 'react-native-elements'
import { IcQuickSwapLight, IcQuickSwapDark } from '../../../assets'
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { makeRequest } from '../../../services/ApiService'
import { AppActions, QuickBuyActions } from '../../../store'
import { useForm } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { showToast } from '../../../utils/GenericUtils'
import { ApiCreditCard } from '../../../constants/AppConstants'
import Navigation from '../../../utils/Navigation'

export default ({ dataCreditCard }) => {
    const quickBuyData = useSelector((state: any) => state.quickBuyReducer)
    const appData = useSelector((state: any) => state.appReducer)

    const { appTheme } = useSelector((state: any) => state.globalReducer)

    const [feeAmount, setFeeAmount] = useState<any>('');
    const dispatch = useDispatch()

    const {
        control,
        formState: { errors },
        setValue,
        getValues,
        handleSubmit,
        reset,
    } = useForm()

    const onChangeVal = e => {
        setValue(FormConstants.Amount, e === Infinity ? '0' : '' + e)
        setFeeAmount((e / 100 * 4.99).toString())
    }

    const onSubmit = async (data) => {
        try {
            if (data.amount < 15) {
                return showToast(strings('deposit_credit'), `Amount must be greater than 15 ${data.currency}`, 'error')
            }
            const apiSubmit = ApiCreditCard[dataCreditCard.cardName]?.submit;
            dispatch(AppActions.updateLoading(Loader.CREDIT_CARD))
            const response = await makeRequest(
                MapperConstants.ApiTypes.POST,
                apiSubmit,
                {},
                {
                    amount: data.amount,
                    currencyName: data.currency
                },
            )
            dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable))
            if (response.status === 200) {
                if(dataCreditCard.cardName === 'axcessms'){
                    Navigation.navigate(Screen.CreditCardWebview, {data: response.data, cardName: dataCreditCard.cardName})
                }
            }
            else showToast(strings('deposit_credit'), response.message, 'error')
        } catch (error) {
            showToast(strings('deposit_credit'), 'Error', 'error')
        }
    }

    return (
        <View
            style={[
                commonStyles.tabSafeView,
                ThemeFunctions.setBackground(appTheme),
            ]}>
            <View style={commonStyles.flexDisplay}>
                <KeyboardAwareScrollView contentContainerStyle={commonStyles.scrollView}>
                    <DropDown
                        options={dataCreditCard?.supportedCurrencies || []}
                        customHeight={120}
                        customTextStyle={{ textTransform: 'uppercase' }}
                        updateValue={index => {
                            setValue(FormConstants.Currency, dataCreditCard?.supportedCurrencies[index])
                        }}>
                        <Input
                            id={FormConstants.Currency}
                            label={strings('currency_label')}
                            placeholder={`${strings('select')}`}
                            control={control}
                            errors={errors}
                            isRequired={true}
                            isFieldFilledBg={false}
                            dropdown={true}
                            showTick={false}
                        />
                    </DropDown>
                    <Input
                        id={FormConstants.Fee}
                        label={strings('fee')}
                        errors={errors}
                        isFieldFilledBg={false}
                        showTick={false}
                        value='4.99'
                        control={control}
                        editable={false}
                    />
                    <Input
                        id={FormConstants.Amount}
                        label={strings('amount')}
                        placeholder={'0'}
                        control={control}
                        errors={errors}
                        isFieldFilledBg={false}
                        isRequired={true}
                        showTick={false}
                        onChangeVal={onChangeVal}
                        keyboardType='decimal-pad'
                    />
                    <Input
                        id={FormConstants.FeeAmount}
                        label={strings('fee_amount')}
                        placeholder={'0'}
                        control={control}
                        errors={errors}
                        isFieldFilledBg={false}
                        showTick={false}
                        keyboardType='decimal-pad'
                        editable={false}
                        value={feeAmount}
                    />
                </KeyboardAwareScrollView>
                <View style={commonStyles.paddingHorizontalView}>
                    <ThemeButton
                        text={strings('submit')}
                        loading={appData.loading === Loader.CREDIT_CARD ? true : false}
                        onClickHandler={handleSubmit(onSubmit)}
                    />
                </View>
            </View>
        </View>
    )
}
