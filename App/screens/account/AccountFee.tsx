import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, ScrollView } from 'react-native'
import { Header, ThemeButton, Cell, ThemeText } from '../../components'
import { strings } from '../../strings'
import { commonStyles } from '../../globalstyles/styles'
import { APIConstants, DefaultArray, MapperConstants } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import { getItem, ThemeFunctions } from '../../utils'
import * as Images from '../../assets'
import { FormConstants } from '../../enums'
import { useForm } from 'react-hook-form'
import { accountFeeStyles as styles } from './styles';
import { CheckBox } from 'react-native-elements'
import { makeRequest } from '../../services/ApiService'
import Title from '../../components/ui/pos/Title'
import { showToast } from '../../utils/GenericUtils'
import { AppActions } from '../../store'

const AccountFee = () => {
    const [isPress, setIsPress] = useState(false);
    const dispatch = useDispatch();

    const { appTheme, appColor } = useSelector((state: any) => state.globalReducer);
    const { userProfileData } = useSelector((state: any) => state.appReducer);
    const currencys = useSelector((state: any) => state.quickBuyReducer.fundsList);

    const [checkBoxValue, setCheckBoxValue] = useState(false);

    useEffect(() => {
        const gbexCurency = currencys.find(el => el.symbol === 'GBEX')?.currencyId;
        if (!gbexCurency) return;
        const { preferredFeeCurrencyId } = userProfileData
        setCheckBoxValue(preferredFeeCurrencyId && gbexCurency === preferredFeeCurrencyId);
    }, [userProfileData]);

    const handleSubmit = async () => {
        if (!isPress) {
            setIsPress(true);
            const gbexCurency = currencys.find(el => el.symbol === 'GBEX').currencyId;
            try {
                const response = await makeRequest(
                    MapperConstants.ApiTypes.POST,
                    APIConstants.UPDATE_PREFERREDFEE,
                    {},
                    { currencyId: checkBoxValue ? gbexCurency : "" }
                )
                setIsPress(false)
                dispatch(AppActions.getUserProfile());
                if (response.status === 200) {
                    showToast("", "Saved", 'success')
                }
                else {
                    showToast("", "Error", 'error')
                }
            } catch (error) {
                setIsPress(false)
                showToast("", "Error", 'error')
            }
            finally  {
                dispatch(AppActions.getUserProfile())
            }
        }
    }

    return (
        <SafeAreaView
            style={[commonStyles.safeView, ThemeFunctions.setBackground(appTheme)]}>
            <Header
                title={strings('account_fee')}
            />
            <ScrollView contentContainerStyle={{ padding: 10 }}>
                <Cell style={{flexWrap:"wrap"}} onPress={() => setCheckBoxValue(!checkBoxValue)}>
                    <CheckBox
                        center
                        checked={checkBoxValue}
                        containerStyle={styles.checkbox}
                        checkedColor={ThemeFunctions.getColor(appColor)}
                        onPress={() => setCheckBoxValue(!checkBoxValue)}
                    />
                    <ThemeText>{strings('use_gbex_account_fee')}</ThemeText>
                </Cell>
            </ScrollView>

            <View style={[{paddingHorizontal:10}]}>
                <ThemeText style={[{textAlign:"center", color:ThemeFunctions.customText(appTheme)}]}>
                    {strings("gbex_fees_discount")}
                </ThemeText>
            </View>

            <View style={commonStyles.paddingHorizontalView}>
                <ThemeButton
                    text='save'
                    onClickHandler={handleSubmit}
                    loading={isPress}
                />
            </View>
        </SafeAreaView >
    )
}

export default AccountFee