import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { getQueryStringParams, showNotificationBanner } from '../../utils/AppFunctions';
import { navigate } from '../../utils';
import { Screen } from '../../enums';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { showToast } from '../../utils/GenericUtils';

export default () => {
    const navigateNotification = (dataFCM: any) => {
        if (dataFCM) {
            try {
                const bodyData = dataFCM.data;                
                switch (bodyData?.type) {
                    case 'Payment_Pos':
                        const id = JSON.parse(bodyData.data).id;
                        navigate(Screen.PosHistoryDetail, { id })
                        break;

                    case 'Deposit':
                        let {tokenSymbol:tokenSymbolDeposit}=JSON.parse(bodyData.data);
                        if (tokenSymbolDeposit)
                            navigate(Screen.WalletScreen, {tokenSymbol:tokenSymbolDeposit})
                        else
                            navigate(Screen.WalletScreen, {})
                        break;

                    case 'Withdrawal':
                        let {tokenSymbol:tokenSymbolWithdrawal}=JSON.parse(bodyData.data);
                        if (tokenSymbolWithdrawal)
                            navigate(Screen.WalletScreen, {tokenSymbol:tokenSymbolWithdrawal})
                        else
                            navigate(Screen.WalletScreen, {})
                        break;    

                    case 'Launchpad':
                        navigate(Screen.IEO, {})
                        break;

                    case 'LaunchpadInfo':
                        const ieoId = JSON.parse(bodyData.data).id;
                        if (ieoId) {
                            navigate(Screen.IEOinfo, { id:ieoId })
                        }else {
                            navigate(Screen.IEO)
                        }
                        break;

                    case 'LaunchpadS':
                            navigate(Screen.IEOS, {})
                            break;
    
                    case 'LaunchpadSInfo':
                            const ieosId = JSON.parse(bodyData.data).id;
                            if (ieosId) {
                                navigate(Screen.IEOSinfo, { id:ieosId })
                            }else {
                                navigate(Screen.IEOS)
                            }
                            break;    

                    case 'QuickSwap':
                        navigate(Screen.QuickSwapScreen, {})
                        break;    
                        
                    case 'QuickSwap_Pair':
                        const {firstCurrency, secondCurrency} = JSON.parse(bodyData.data);
                        
                        if (firstCurrency && secondCurrency) {
                            navigate(Screen.QuickSwapScreen, {firstCurrency, secondCurrency})
                        } else if (firstCurrency) {
                            navigate(Screen.QuickSwapScreen, {firstCurrency})
                        }
                        else {
                            navigate(Screen.QuickSwapScreen, {})
                        }  
                        
                        break;   
                        
                    case 'Tickers':
                        const {initSearch} = JSON.parse(bodyData.data);
                        if (initSearch) {
                            navigate(Screen.TickerScreen, {initSearch})
                        } else {
                            navigate(Screen.TickerScreen, {})
                        }
                        break;

                    case "TickersPair": 
                        const {pair} = JSON.parse(bodyData.data);
                        navigate(Screen.TickerScreen, {pair});
                        break;
                        
                    case 'Staking': 
                        navigate(Screen.Staking, {});
                        break;

                    case 'StakingAsset': 
                        const {poolType, poolId} = JSON.parse(bodyData.data)                        
                        navigate(Screen.Staking, {poolType, poolId});
                        break;    

                    case 'CreditCardList': 
                        navigate(Screen.CreditCardList, {});
                        break;        
                }
            }
            catch (e) {
                console.log(e)
            }
        }
    }

    const readNotifcationOpenApp = async () => {
        let dataFCM: any = await messaging().getInitialNotification();
        navigateNotification(dataFCM);
    }

    const handleDynamicLink = link => {                
        if(link){
            try {
                if(link.url.includes("https://globiance.page.link/qr")){
                    const queryString = getQueryStringParams(link.url)
                    const id = Object.values(queryString)[0];
                    id && navigate(Screen.QrPay, {id})
                }

                else if (link.url.includes('https://globiance.page.link/referral') || link.url.includes('globiance.com/register')) {                    
                    showToast("Referral", "Cannot set referral after signup!", "info")
                }

            } catch (error) {
                console.log(error);
            }
        }
    };

    const readDynamicLinkOpenApp = async() => {
        try {
            const dataLink = await dynamicLinks().getInitialLink();
            handleDynamicLink(dataLink);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => { //dynamic link OpenApp
        readDynamicLinkOpenApp();
    }, []);

    useEffect(() => { //notification OpenApp
        readNotifcationOpenApp();
    }, []);

    useEffect(() => {//notification background
        const unsubscribeBackground = messaging().onNotificationOpenedApp((dataFCM: any) => {
            navigateNotification(dataFCM);
        });
        return unsubscribeBackground;
    }, []);

    useEffect(() => { //notification Foreground
        const unsubscribeForeground = messaging().onMessage((dataFCM: any) => {            
            showNotificationBanner({
                title: dataFCM.notification.title,
                content: dataFCM.notification.body
            }, () => navigateNotification(dataFCM))
        });
        return unsubscribeForeground;
    }, []);

    useEffect(() => {        
        const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
        return () => unsubscribe();
    }, []);

    return null;
}