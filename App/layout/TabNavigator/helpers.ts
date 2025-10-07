import {
    ic_tab_quick_swap_bl,
    ic_tab_quick_swap_md,
    ic_tab_quick_swap_ml,
    ic_tab_quick_swap_pd,
    ic_tab_quick_swap_pl
} from '../../assets'
import { AppColor } from '../../enums';
import { isDarkTheme } from '../../utils/ThemeFunctions'

export const imageQuickSwap = (appColor, appTheme) => {
    switch (appColor) {
        case AppColor.green:
            return isDarkTheme(appTheme) ? ic_tab_quick_swap_md : ic_tab_quick_swap_ml;
        case AppColor.pink:
            return isDarkTheme(appTheme) ? ic_tab_quick_swap_pd : ic_tab_quick_swap_pl;
        case AppColor.black:
            return ic_tab_quick_swap_bl;
    }
}