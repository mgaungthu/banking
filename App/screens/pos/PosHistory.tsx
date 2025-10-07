import React, { useEffect, useState } from 'react'
import { FlatList, View, Text, TouchableOpacity, RefreshControl, Alert } from 'react-native'
import { DropDown, LoadingSpinner, ThemeText } from '../../components'
import { strings } from '../../strings'
import { commonStyles } from '../../globalstyles/styles'
import { APIConstants, MapperConstants } from '../../constants'
import { useSelector } from 'react-redux'
import { navigate, ThemeFunctions } from '../../utils'
import { FormConstants, Screen } from '../../enums'
import styles from './styles';
import { filterMechantHistoryArray, } from '../../constants/DefaultArray'
import Space from '../../components/ui/Space'
import Colors, { rapunzelTheme } from '../../theme/Colors'
import { Icon } from 'react-native-elements'
import { makeGetRequest, makeRequest } from '../../services/ApiService'
import { showToast } from '../../utils/GenericUtils'
import { defaultPageLimit } from '../../constants/AppConstants'
import { convertToUsdPrice, parseJson } from '../../utils/AppFunctions'
import moment from 'moment'
import Title from '../../components/ui/pos/Title'
import IconVector from '../../components/ui/IconVector'
import { isIOS } from '../../utils/DeviceConfig'

const PosHistory = ({isQrPay = false}) => {
    const { appTheme, appColor } = useSelector((state: any) => state.globalReducer)

    const [filterValue, setFilterValue] = useState(FormConstants.ThisDay);
    const [filterName, setFilterName] = useState(strings('this_day'))

    const [isLoading, setIsLoading] = useState(true);
    const [historyData, setHistoryData] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [endList, setEndList] = useState(false);

    const TextHistoryTitle = ({ children }) => (
        <ThemeText style={[
            styles.textHistoryTitle,
        ]}>
            {children}
        </ThemeText>
    )

    const TextHistoryDetail = ({ children, style }: any) => (
        <Text style={[
            styles.textHistoryDetail,
            { color: ThemeFunctions.customText(appTheme) },
            style
        ]}>
            {children}
        </Text>
    )

    const TextHistoryDesc = ({ children, style }:any) => (
        <ThemeText style={[
            styles.textHistoryDesc,
            style
        ]}>
            {children}
        </ThemeText>
    )

    const navigateHistoryDetail = (historyDay) =>{
        navigate(Screen.PosHistoryDetail, {historyDay})
    }

    const getDateFromTo = () =>{
        switch (filterValue) {
            case FormConstants.ThisMonth:
                var date = new Date();
                const lastDay = new Date(date.getFullYear(), date.getMonth() +1, 0).getDate();
                return {
                    from: moment().format("MM01YYYY"),
                    to: moment().format(`MM${lastDay}YYYY`)
                }
            case FormConstants.ThisYear:
                return {
                    from: moment().format("0101YYYY"),
                    to: moment().add(1, 'years').format("0101YYYY")
                }
        }
        return {
            from: moment().format("MMDDYYYY"),
            to: moment().format("MMDDYYYY")
        }
    }
    

    const getListHistoryMerchant = async() =>{
        try {
            const response = await makeRequest(
                MapperConstants.ApiTypes.POST,
                isQrPay ? APIConstants.GET_HISTORY_PAYMENT_PAY : APIConstants.GET_HISTORY_PAYMENT_MERCHANT, {},
                {
                    page: pageNumber,
                    size: defaultPageLimit,
                    ...getDateFromTo()
                }
            )
            setIsLoading(false)
            if (response.status === 200) {
                const dataResponse = response?.data?.dataResponse;
                if(dataResponse){
                    let historyList = pageNumber == 1 ? [] : historyData;
                    for (var key in dataResponse) {
                        const isExistDay = historyData.some(el => el.date == key);
                        if(pageNumber > 1 && isExistDay){ // check duplicate date in server
                            historyList = historyData.map((item) =>{
                                if(item.date == key){
                                    return {
                                        ...item,
                                        data: [
                                            ...item.data,
                                            ...dataResponse[key]
                                        ]
                                    }
                                }
                                return item
                            })
                        }
                        else historyList = [
                            ...historyList,
                            {
                                date: key,
                                data: dataResponse[key]
                            }
                        ]
                    }
                    setHistoryData(historyList);
                    setEndList(response.data.totalPages === pageNumber || Object.keys(dataResponse).length == 0)
                }
            }
            else {
                showToast(strings('globiance_pos'), response.message, 'error')
            }
        } catch (error) {
            showToast(strings('globiance_pos'), 'Error server', 'error');
            setIsLoading(false)
            console.log(error);
        }
    }

    const loadMoreData = () =>{
        if(!endList){
            setPageNumber(pageNumber + 1)
        }
    }

    useEffect(() =>{
        getListHistoryMerchant();
    }, [pageNumber, filterValue])

    return (
        <>
            <View style={[
                styles.filterHistoryContainer,
                ThemeFunctions.setBackground(appTheme)
            ]}>
                <Title>{strings('date_time')}</Title>
                <DropDown
                    options={filterMechantHistoryArray().map(el => el.name)}
                    customHeight={120}
                    customTextStyle={{ textTransform: 'uppercase' }}
                    updateValue={index => {
                        setFilterValue(filterMechantHistoryArray()[index].value)
                        setFilterName(filterMechantHistoryArray()[index].name)
                        setPageNumber(1);
                    }}>
                        <View style={[
                            styles.filterNameContainer,
                            {borderColor: ThemeFunctions.customText(appTheme)}
                        ]}>
                            <Title>{filterName}</Title> 
                            <IconVector.Entypo
                                name='chevron-down'
                                size={20}
                                color={ThemeFunctions.customText(appTheme)}
                                style={{bottom: isIOS() ? 2 : 0}}
                            />
                        </View>
                </DropDown>
            </View>
            <View style={[
                styles.titleHistoryContainer,
                commonStyles.justifySpace,
                ThemeFunctions.getCardColor(appTheme)
            ]}>
                <TextHistoryTitle>{strings('reference').toUpperCase()}</TextHistoryTitle>
                <TextHistoryTitle>{strings('amount').toUpperCase()}</TextHistoryTitle>
            </View>
            <FlatList
                ListFooterComponent={!endList &&
                    <>
                        <Space height={20} />
                        <LoadingSpinner color={Colors.white} size='small' />
                    </>
                }
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={() => setPageNumber(1)}
                        tintColor={ThemeFunctions.getColor(appColor)}
                        colors={[ThemeFunctions.getColor(appColor)]}
                    />
                }
                data={historyData}
                keyExtractor={(_, key) => `${key}`}
                renderItem={({item}) =>
                    <View>
                        <View style={[
                            styles.titleHistoryContainer,
                            {backgroundColor: ThemeFunctions.getColor(appColor)}
                        ]}>
                            <TextHistoryTitle>{moment(item.date, 'MM-DD-YYYY').format('dddd, YYYY MMM DD')}</TextHistoryTitle>
                        </View>
                        {item.data.map((historyDay, key) =>
                            <TouchableOpacity
                                style={styles.contentHistoryContainer}
                                onPress={() => navigateHistoryDetail(historyDay)}
                                key={key}
                            >
                                <View style={styles.rowContentHistory}>
                                    <TextHistoryDetail style={{flex: 1, maxWidth: '70%'}}>
                                        {isQrPay ? historyDay.reference : historyDay?.UserFrom?.email}
                                    </TextHistoryDetail>
                                    <TextHistoryDetail>{historyDay.amountPay} {historyDay.Currency.name}</TextHistoryDetail>
                                </View>
                                <View style={styles.rowContentHistory}>
                                    <TextHistoryDesc style={{flex: 1, maxWidth: '70%'}}>
                                        {isQrPay ? parseJson(historyDay.PaymentConfig).merchantAddress : historyDay.reference}
                                    </TextHistoryDesc>
                                    <TextHistoryDesc>{convertToUsdPrice(historyDay.Currency.name, historyDay.amountPay)} USD</TextHistoryDesc>
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
                }
                onEndReached={loadMoreData}
            />
        </>
    )
}

export default PosHistory
