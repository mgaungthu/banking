import React from "react";
import { View, Image } from "react-native";
import { useSelector } from "react-redux";
import { Header } from "../../../components";
import { QuickBuyActions } from "../../../store";
import { ieoDetailsSelector } from "../../../store/selectors/ieoSelector";
import QuickSwap from "./QuickSwap";

const IEObuy = (props: any) => {

    const { ticker } = useSelector(ieoDetailsSelector);
    const { assetMetadata } = useSelector((state : any) => state.globalReducer);

    const getImageUrl = () => {
        const filteredData = assetMetadata?.find(
            res => res?.currency?.toLowerCase() === ticker?.ticker?.toLowerCase(),
        )

        if (filteredData && Object.keys(filteredData).length > 0) {
            return QuickBuyActions.getImgUrl(filteredData.currency, filteredData.version)
        } else {
            return 'https://api.globiance.com/assets/wallet/default.png'
        }
    }

    return (
        <View style={{ height: '100%' }}>
            <Header 
                title={`BUY: ${ticker.ticker}`} 
                isNormalText={true} 
                right={<Image style={{ width: 30, height: 30 }} source={{ uri: getImageUrl() }} />} 
            />
            <View style={{ flex: 1 }}>
                <QuickSwap isIEOscreen={true} route={props.route} />
            </View>
        </View>
    )
}

export default IEObuy;