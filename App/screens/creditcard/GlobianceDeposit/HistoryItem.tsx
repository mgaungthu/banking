import React, { useState } from 'react'
import { Text, View, Image } from 'react-native'
import { strings } from '../../../strings'
import { rtlStyles } from '../../../globalstyles/styles'
import { useSelector } from 'react-redux'
import { AppFunctions, ThemeFunctions } from '../../../utils'
import { historyStyles as styles } from '../../quickbuy/styles'
import { ImageContainer, ThemeText } from '../../../components'
import * as Images from '../../../assets'
import { AppConstants, MapperConstants } from '../../../constants'
import * as Flags from '../../../assets/flags'
import { QuickBuyActions } from '../../../store'
import Colors from '../../../theme/Colors'
import { t } from 'react-native-tailwindcss'

const HistoryItem = (props: any) => {
    const { isRtlApproach, appTheme, assetMetadata, appColor } = useSelector(
        (state: any) => state.globalReducer,
    )
    const { trade } = props

    const reverseDirection = () => {
        return [
            styles.rowItem,
            { borderBottomColor: Colors.gray },
            isRtlApproach ? rtlStyles.reverseRow : {},
        ]
    }

    const leftAlignView = () => {
        return [
            styles.leftItemView,
            isRtlApproach ? rtlStyles.alignEnd : rtlStyles.alignStart,
        ]
    }
    const rightAlignView = () => {
        return [
            styles.rightView,

            isRtlApproach ? rtlStyles.alignStart : rtlStyles.alignEnd,
        ]
    }

    const leftTextColor = () => {
        return ThemeFunctions.customInputText(appTheme)
    }
    
    const [isImageNotFound, setIsImageNotFound] = useState(
        MapperConstants.StatusMapper.disable,
    )
    const getImageUrl = (currencyName) => {
        const filteredData = assetMetadata.find(
            res => res.currency.toLowerCase() === currencyName.toLowerCase(),
        )
        if (filteredData && Object.keys(filteredData).length > 0) {
            return QuickBuyActions.getImgUrl(filteredData.currency)
        } else {
            return null
        }
    }
    
    return (
        <View style={[styles.historyCard, ThemeFunctions.getListColor(appColor, appTheme)]}>
            <View style={reverseDirection()}>
                <View style={leftAlignView()}>
                    <ThemeText
                        style={[styles.leftLabel, leftTextColor()]}
                        adjustsFontSizeToFit={true}
                        numberOfLines={2}>
                        {strings('date')}
                    </ThemeText>
                </View>
                <View style={rightAlignView()}>
                    <ThemeText
                        style={[styles.rightLabel, leftTextColor()]}
                        adjustsFontSizeToFit={true}
                        numberOfLines={2}>
                        {AppFunctions.FormatDateTime(trade.createdAt)}
                    </ThemeText>
                </View>
            </View>
            <View style={reverseDirection()}>
                <View style={leftAlignView()}>
                    <ThemeText
                        style={[styles.leftLabel, leftTextColor()]}
                        adjustsFontSizeToFit={true}>
                        {strings("from_cur")}
                    </ThemeText>
                </View>
                <View
                    style={[
                        rightAlignView(),
                        {
                            flexDirection: 'row',
                            justifyContent: isRtlApproach ? 'flex-start' : 'flex-end',
                            alignItems: 'center'
                        },
                    ]}>
                    <>
                        <Image
                            source={{ uri: getImageUrl(trade.fromCurrencyId) }}
                            onError={error => setIsImageNotFound(true)}
                            resizeMode='contain'
                            style={[styles.ic]}
                        />
                        <View
                            style={[
                                isImageNotFound || !getImageUrl(trade.fromCurrencyId)
                                    ? {
                                        ...ThemeFunctions.bgImgColor(appTheme),
                                        position: 'absolute',
                                    }
                                    : { position: 'absolute' },
                                styles.img,
                            ]}
                        />
                    </>
                    <ThemeText
                        style={[styles.rightLabel, { color: ThemeFunctions.getColor(appColor), ...t.uppercase }]}
                        adjustsFontSizeToFit={true}
                        numberOfLines={2}>
                        {trade.fromCurrencyId}
                    </ThemeText>
                </View>
            </View>

            <View style={reverseDirection()}>
                <View style={leftAlignView()}>
                    <ThemeText
                        style={[styles.leftLabel, leftTextColor()]}
                        adjustsFontSizeToFit={true}>
                            {strings("from_cur_amount")}
                    </ThemeText>
                </View>
                <View
                    style={[
                        rightAlignView(),
                        {
                            flexDirection: 'row',
                            justifyContent: isRtlApproach ? 'flex-start' : 'flex-end',
                            alignItems: 'center'
                        },
                    ]}>
                    <>
                        <Image
                            source={{ uri: getImageUrl(trade.fromCurrencyId) }}
                            onError={error => setIsImageNotFound(true)}
                            resizeMode='contain'
                            style={[styles.ic]}
                        />
                        <View
                            style={[
                                isImageNotFound || !getImageUrl(trade.fromCurrencyId)
                                    ? {
                                        ...ThemeFunctions.bgImgColor(appTheme),
                                        position: 'absolute',
                                    }
                                    : { position: 'absolute' },
                                styles.img,
                            ]}
                        />
                    </>
                    <ThemeText
                        style={[styles.rightLabel, { color: ThemeFunctions.getColor(appColor), ...t.uppercase }]}
                        adjustsFontSizeToFit={true}
                        numberOfLines={2}>
                        {trade.amountFrom}
                    </ThemeText>
                </View>
            </View>

            <View style={reverseDirection()}>
                <View style={leftAlignView()}>
                    <ThemeText
                        style={[styles.leftLabel, leftTextColor()]}
                        adjustsFontSizeToFit={true}>
                        {strings("from_cur_fees")}
                    </ThemeText>
                </View>
                <View
                    style={[
                        rightAlignView(),
                        {
                            flexDirection: 'row',
                            justifyContent: isRtlApproach ? 'flex-start' : 'flex-end',
                            alignItems: 'center'
                        },
                    ]}>
                    <>
                        <Image
                            source={{ uri: getImageUrl(trade.fromCurrencyId) }}
                            onError={error => setIsImageNotFound(true)}
                            resizeMode='contain'
                            style={[styles.ic]}
                        />
                        <View
                            style={[
                                isImageNotFound || !getImageUrl(trade.fromCurrencyId)
                                    ? {
                                        ...ThemeFunctions.bgImgColor(appTheme),
                                        position: 'absolute',
                                    }
                                    : { position: 'absolute' },
                                styles.img,
                            ]}
                        />
                    </>
                    <ThemeText
                        style={[styles.rightLabel, { color: ThemeFunctions.getColor(appColor), ...t.uppercase }]}
                        adjustsFontSizeToFit={true}
                        numberOfLines={2}>
                        {trade.totalFees}
                    </ThemeText>
                </View>
            </View>

            <View style={reverseDirection()}>
                <View style={leftAlignView()}>
                    <ThemeText
                        style={[styles.leftLabel, leftTextColor()]}
                        adjustsFontSizeToFit={true}>
                        {strings("to_cur_amount")}
                    </ThemeText>
                </View>
                <View
                    style={[
                        rightAlignView(),
                        {
                            flexDirection: 'row',
                            justifyContent: isRtlApproach ? 'flex-start' : 'flex-end',
                            alignItems: 'center'
                        },
                    ]}>
                    <>
                        <Image
                            source={{ uri: getImageUrl(trade.toCurrencyId) }}
                            onError={error => setIsImageNotFound(true)}
                            resizeMode='contain'
                            style={[styles.ic]}
                        />
                        <View
                            style={[
                                isImageNotFound || !getImageUrl(trade.toCurrencyId)
                                    ? {
                                        ...ThemeFunctions.bgImgColor(appTheme),
                                        position: 'absolute',
                                    }
                                    : { position: 'absolute' },
                                styles.img,
                            ]}
                        />
                    </>
                    <ThemeText
                        style={[styles.rightLabel, { color: ThemeFunctions.getColor(appColor), ...t.uppercase }]}
                        adjustsFontSizeToFit={true}
                        numberOfLines={2}>
                        {trade.amountTo}
                    </ThemeText>
                </View>
            </View>
            
            <View style={[reverseDirection(), { borderBottomWidth: 0 }]}>
                <View style={leftAlignView()}>
                    <ThemeText
                        style={[styles.leftLabel, leftTextColor()]}
                        adjustsFontSizeToFit={true}
                        numberOfLines={2}>
                        {strings('status')}
                    </ThemeText>
                </View>
                <View style={rightAlignView()}>
                    <ThemeText
                        style={[styles.rightLabel, leftTextColor()]}
                        adjustsFontSizeToFit={true}
                        numberOfLines={2}>
                        {trade.transactionStatus}
                    </ThemeText>
                </View>
            </View>
        </View>
    )
}

export default HistoryItem
