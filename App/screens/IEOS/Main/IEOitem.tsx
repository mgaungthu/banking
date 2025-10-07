import React from "react";
import { useSelector } from "react-redux";
import { View, Text, Image } from "react-native";
import { Cell, ThemeText } from "../../../components";
import { tickerStyles } from "../../tickers/styles";
import { styles } from "./IEOitem_style";
import { ThemeFunctions } from "../../../utils";
import { QuickBuyActions } from "../../../store";
import StatusView from "../../../components/ui/StatusButton";
import { rtlStyles } from "../../../globalstyles/styles";
import { DeriveStatus } from "../common";
import { Timer } from "../../../components/timer";

const IEOitem = (props : any) => {

    const { currencyName, status, onPress, projectName, startDate, endDate } = props;

    const { appTheme, assetMetadata, isRtlApproach } = useSelector(
        (state: any) => state.globalReducer,
    )

    const textColor = () => {
        return ThemeFunctions.getTextColor(appTheme)
      }


    const getImageUrl = () => {
        const filteredData = assetMetadata?.find(
            res => res?.currency?.toLowerCase() === currencyName?.toLowerCase(),
        )

        if (filteredData && Object.keys(filteredData).length > 0) {
            return QuickBuyActions.getImgUrl(filteredData.currency, filteredData.version)
        } else {
            return 'https://api.globiance.com/assets/wallet/default.png'
        }
    }

    const statusNew = DeriveStatus({startDate, endDate, status})

    let timer = <></>
    let timerText = ""

    if (statusNew==="Upcoming" && startDate ) {
        timer = <Timer style={{fontSize:12}} ms={new Date(startDate).getTime() - Date.now()} />
        timerText = "Starts In:"
    } else if (statusNew==="Available" && endDate) {
        timer = <Timer style={{fontSize:12}} ms={new Date(endDate).getTime() - Date.now()} />
        timerText = "Ends In:"
    }

    return (
        <Cell style={[ styles.container, isRtlApproach ? rtlStyles.reverseRow : {} ]} onPress={onPress}>
            <View style={styles.currencyLogo}>
                <Image
                        source={{ uri: getImageUrl() }}
                        resizeMode='contain'
                        style={[tickerStyles.img, {marginLeft: isRtlApproach ? 12 : 0}]}
                    />
            </View>
            
            <View style={[ styles.currencyInfoContainer, isRtlApproach ? rtlStyles.reverseRow : {} ]}>
                
                <View>
                <Text style={[ styles.title, textColor() ]}>
                    {currencyName}
                </Text>
                <Text style={[ styles.subTitle, {color:ThemeFunctions.customText(appTheme)} ]} numberOfLines={2}>
                    {projectName}
                </Text>
            </View>
                
            </View>
            <View style={[{justifyContent:"flex-end", alignItems:"flex-end"}]}>
                <StatusView status={statusNew} />
                <View style={{flexDirection:"row"}}>
                    <ThemeText style={{fontSize:12, marginRight:2}}>
                        {timerText}
                    </ThemeText>
                         {timer}
                </View>
                
            </View>
        </Cell>
    )
}

export default IEOitem;