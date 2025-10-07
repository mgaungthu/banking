import React from 'react';
import {
    ic_tab_home_black,
    ic_tab_home_mint,
    ic_tab_home_pink,
    ic_tab_ticker_mint,
    ic_tab_wallet_mint,
    ic_tab_more_mint,
    ic_tab_home_gray,
    ic_tab_ticker_gray,
    ic_tab_wallet_gray,
    ic_tab_more_gray,
    ic_tab_ticker_pink,
    ic_tab_wallet_pink,
    ic_tab_more_pink,
    ic_tab_ticker_black,
    ic_tab_wallet_black,
    ic_tab_more_black
} from '../../assets'
import { AppColor } from '../../enums';
import { useSelector } from 'react-redux';
import { View, Image } from 'react-native';
import { tabStyles as styles } from '../styles';

const iconNotSelected = {
    home: ic_tab_home_gray,
    ticker: ic_tab_ticker_gray,
    wallet: ic_tab_wallet_gray,
    more: ic_tab_more_gray
}


export const RenderIcon = ({ routeName, selectedTab }) => {

    const { appColor } = useSelector((state: any) => state.globalReducer);

    let image = {};
    let colorSelected = '#30C3B1'
    const isSelected = selectedTab == routeName;
    switch (appColor) {
        case AppColor.pink:
            switch (routeName) {
                case 'home':
                    image = ic_tab_home_pink; break;
                case 'ticker':
                    image = ic_tab_ticker_pink; break;
                case 'wallet':
                    image = ic_tab_wallet_pink; break;
                case 'more':
                    image = ic_tab_more_pink; break;
            }
            colorSelected = '#FE036A'
            break;
        case AppColor.green:
            switch (routeName) {
                case 'home':
                    image = ic_tab_home_mint; break;
                case 'ticker':
                    image = ic_tab_ticker_mint; break;
                case 'wallet':
                    image = ic_tab_wallet_mint; break;
                case 'more':
                    image = ic_tab_more_mint; break;
            }
            colorSelected = '#30C3B1'
            break;
        case AppColor.black:
            switch (routeName) {
                case 'home':
                    image = ic_tab_home_black; break;
                case 'ticker':
                    image = ic_tab_ticker_black; break;
                case 'wallet':
                    image = ic_tab_wallet_black; break;
                case 'more':
                    image = ic_tab_more_black; break;
            }
            colorSelected = '#252836'
            break;
    }

    return <>
        <Image
            source={isSelected ? image : iconNotSelected[routeName]}
            style={styles.iconTab}
        />
        {selectedTab == routeName &&
            <View style={[styles.selectedTabLine, { backgroundColor: colorSelected }]} />
        }
    </>
};