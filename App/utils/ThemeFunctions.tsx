import {bg_dark, bg_green, bg_pink} from '../assets';
import {AppColor, AppTheme} from '../enums';
import Colors, {
  themeColor,
  darkTheme,
  borderColors,
  rapunzelTheme,
  lightTheme,
} from '../theme/Colors';

export const isDarkTheme = (theme: string) => {
  return theme === AppTheme.dark;
};
export const isLightTheme = (theme: string) => {
  return theme === AppTheme.light;
};
export const isRapunzelTheme = (theme: string) => {
  return theme === AppTheme.rapunzel;
};
export const setGraphBackground = (theme: string) => {
  if (isDarkTheme(theme)) {
    return darkTheme.borderLine;
  }
  if (isLightTheme(theme)) {
    return themeColor.light;
  }
  if (isRapunzelTheme(theme)) {
    return rapunzelTheme.pinkBorder;
  }
};

export const getBgImage = (color: string) => {
  switch (color) {
    case AppColor.green:
      return bg_green;
    case AppColor.black:
      return bg_dark;
  }
  return bg_pink;
};

export const getTextColor = (theme: string) => {
  if (isDarkTheme(theme)) {
    return {color: darkTheme.text};
  }
  return {color: lightTheme.text};
};

export const setBackgroundColor = (theme: string) => {
  if (isDarkTheme(theme)) {
    return themeColor.dark;
  }
  if (isLightTheme(theme)) {
    return themeColor.light;
  }
  if (isRapunzelTheme(theme)) {
    return themeColor.rapunzel;
  }
};

export const otpInputColor = (theme: string, type: string) => {
  if (isDarkTheme(theme)) {
    return type === 'underline'
      ? {borderBottomColor: darkTheme.headerText}
      : {backgroundColor: darkTheme.headerText};
  }
  return type === 'underline'
    ? {borderBottomColor: lightTheme.headerText}
    : {backgroundColor: lightTheme.headerText};
};

export const otpBorderColor = (theme: string) => {
  if (isDarkTheme(theme) || isLightTheme(theme)) {
    return {borderColor: Colors.grayBlue};
  }
  if (isRapunzelTheme(theme)) {
    return {borderColor: rapunzelTheme.secondaryColor};
  }
};

export const currencyTextColor = (theme: string) => {
  if (isDarkTheme(theme)) {
    return {color: darkTheme.inputColor};
  }
  if (isLightTheme(theme)) {
    return {color: Colors.grayBlue};
  }
  if (isRapunzelTheme(theme)) {
    return {color: Colors.black};
  }
};

export const headerCurrencyColor = (theme: string) => {
  if (isDarkTheme(theme)) {
    return darkTheme.text;
  }
  return lightTheme.text;
};

export const getCurrentTextColor = (theme: string) => {
  if (isDarkTheme(theme)) {
    return darkTheme.text;
  }
  return lightTheme.text;
};

export const textColor = (theme: string) => {
  if (isDarkTheme(theme)) {
    return {color: darkTheme.text};
  }
  return {color: lightTheme.text};
};

export const getTabShadowColor = (theme: string) => {
  if (isDarkTheme(theme)) {
    return {color: '#000'};
  }
  return {color: '#bdbdbd'};
};

export const getColor = (appColor: string) => {
  switch (appColor) {
    case AppColor.green:
      return Colors.green;
    case AppColor.black:
      return Colors.black;
  }
  return Colors.SolMain;
};

export const getBorderColorShadow = (appColor: string) => {
  switch (appColor) {
    case AppColor.green:
      return '#30C3B11E';
    case AppColor.black:
      return '#2528361E';
  }
  return '#FE036A1E';
};

export const get3WayColor = (appColor: string) => {
  switch (appColor) {
    case AppColor.green:
      return Colors.green;
    case AppColor.black:
      return Colors.orange;
  }
  return Colors.pink;
};

export const getTickerHeader = (theme: string) => {
  if (isDarkTheme(theme)) {
    return {color: darkTheme.text};
  }
  return {color: lightTheme.text};
};

export const withdrawColor = (theme: string) => {
  if (isDarkTheme(theme)) {
    return {color: Colors.disableGray};
  }
  if (isLightTheme(theme)) {
    return {color: Colors.grayBlue};
  }
  if (isRapunzelTheme(theme)) {
    return {color: rapunzelTheme.magenta};
  }
};

export const setHeaderTextColor = (theme: string) => {
  if (isDarkTheme(theme)) {
    return {color: darkTheme.text};
  }
  return {color: lightTheme.text};
};

export const setHeaderBackground = (theme: string, isTab: Boolean) => {
  if (isDarkTheme(theme)) {
    return {backgroundColor: themeColor.dark};
  }
  if (isLightTheme(theme)) {
    return {backgroundColor: isTab ? Colors.tabColor : themeColor.light};
  }
  if (isRapunzelTheme(theme)) {
    return {backgroundColor: themeColor.rapunzel};
  }
};
export const setBgColor = (theme: string) => {
  if (isDarkTheme(theme)) {
    return darkTheme.primaryColor;
  }
  return lightTheme.primaryColor;
};
export const setBackground = (theme: string) => {
  if (isDarkTheme(theme)) {
    return {backgroundColor: darkTheme.primaryColor};
  }
  return {backgroundColor: lightTheme.primaryColor};
};
export const searchBarColor = (theme: string) => {
  if (isDarkTheme(theme)) {
    return {backgroundColor: darkTheme.secondaryColor};
  }
  return {backgroundColor: lightTheme.secondaryColor};
};
export const getTickerHeaderColor = (theme: string) => {
  if (isDarkTheme(theme)) {
    return {backgroundColor: darkTheme.secondaryColor};
  }
  return {backgroundColor: lightTheme.secondaryColor};
};
export const getTickerStripColor = (theme: string, type: string) => {
  if (isDarkTheme(theme)) {
    return {
      backgroundColor: darkTheme.secondaryColor,
    };
  }
  return {backgroundColor: lightTheme.secondaryColor};
};
export const getgrapgBgColor = (theme: string) => {
  if (isDarkTheme(theme)) {
    return {backgroundColor: darkTheme.secondaryColor};
  }
  if (isLightTheme(theme)) {
    return {backgroundColor: Colors.bgBlue};
  }
  if (isRapunzelTheme(theme)) {
    return {backgroundColor: rapunzelTheme.graphBg};
  }
};

export const getCardColor = (theme: string) => {
  if (isDarkTheme(theme)) {
    return {backgroundColor: darkTheme.secondaryColor};
  }
  return {backgroundColor: lightTheme.secondaryColor};
};

export const getListColor = (color: string, theme: string) => {
  let backgroundColor;
  switch (color) {
    case AppColor.green:
      backgroundColor = isDarkTheme(theme)
        ? Colors.listGreenBlack
        : Colors.listGreenLight;
      break;
    case AppColor.black:
      backgroundColor = Colors.listBlack;
      break;
    default:
      backgroundColor = isDarkTheme(theme)
        ? Colors.listPinkDark
        : Colors.listPinkLight;
      break;
  }
  return {backgroundColor};
};

export const tabIcon = (theme: string, res: any) => {
  if (isDarkTheme(theme)) {
    return res.InactiveIconDark;
    // return res.InactiveIconLight
  }
  if (isLightTheme(theme)) {
    return res.InactiveIcon;
  }
  if (isRapunzelTheme(theme)) {
    return res.InactiveIconPink;
  }
};

export const getTabTextColor = (theme: string) => {
  if (isDarkTheme(theme)) {
    return {color: darkTheme.inputColor};
  }
  if (isLightTheme(theme)) {
    return {color: Colors.tabTextColor};
  }
  if (isRapunzelTheme(theme)) {
    return {color: rapunzelTheme.bottomTabColor};
  }
};

export const getTabBgColor = (theme: string) => {
  if (isDarkTheme(theme)) {
    return darkTheme.secondaryColor;
  }
  return lightTheme.secondaryColor;
};

export const inputBorderColor = (theme: string) => {
  if (isDarkTheme(theme) || isLightTheme(theme)) {
    return {borderColor: darkTheme.inputColor};
  }

  if (isRapunzelTheme(theme)) {
    return {borderColor: rapunzelTheme.pinkBorder};
  }
};
export const customBtnBorderColor = (theme: string) => {
  if (isLightTheme(theme)) {
    return {borderColor: Colors.grayBlue};
  }
  if (isDarkTheme(theme)) {
    return {borderColor: Colors.disableGray};
  }

  if (isRapunzelTheme(theme)) {
    return {borderColor: rapunzelTheme.magenta};
  }
};

export const topTabBorderColor = (theme: string) => {
  if (isLightTheme(theme) || isDarkTheme(theme)) {
    return {backgroundColor: Colors.cyan};
  }

  if (isRapunzelTheme(theme)) {
    return {backgroundColor: rapunzelTheme.magenta};
  }
};
export const customInputBordeColor = (theme: string) => {
  if (isLightTheme(theme)) {
    return {borderTopColor: Colors.borderBlue};
  }
  if (isDarkTheme(theme)) {
    return {borderTopColor: darkTheme.inputColor};
  }

  if (isRapunzelTheme(theme)) {
    return {borderTopColor: rapunzelTheme.pinkBorder};
  }
};
export const customInputBorderColor = (theme: string) => {
  if (isLightTheme(theme)) {
    return {borderBottomColor: Colors.borderBlue};
  }
  if (isDarkTheme(theme)) {
    return {borderBottomColor: darkTheme.inputColor};
  }

  if (isRapunzelTheme(theme)) {
    return {borderBottomColor: rapunzelTheme.pinkBorder};
  }
};
export const toggleBg = (color: string) => {
  switch (color) {
    case AppColor.black:
      return Colors.black;
    case AppColor.green:
      return Colors.green;
  }
  return Colors.SolMain;
};
export const borderLineColor = (theme: string) => {
  if (isLightTheme(theme)) {
    return {backgroundColor: Colors.borderBlue};
  }
  if (isDarkTheme(theme)) {
    return {backgroundColor: darkTheme.borderLine};
  }

  if (isRapunzelTheme(theme)) {
    return {backgroundColor: rapunzelTheme.borderLine};
  }
};

export const checkBoxColor = (color: string) => {
  let borderColor;
  switch (color) {
    case AppColor.black:
      borderColor = Colors.black;
      break;
    case AppColor.green:
      borderColor = Colors.green;
      break;
    default:
      borderColor = Colors.pink;
      break;
  }
  return {borderColor};
};
export const getTopTabColor = (theme: string) => {
  if (isLightTheme(theme)) {
    return {backgroundColor: Colors.tabColor};
  }
  if (isDarkTheme(theme)) {
    return {backgroundColor: themeColor.dark};
  }

  if (isRapunzelTheme(theme)) {
    return {backgroundColor: rapunzelTheme.primaryColor};
  }
};

export const tabBorderTopColor = (theme: string) => {
  if (isLightTheme(theme)) {
    return borderColors.borderBlue;
  }
  if (isDarkTheme(theme)) {
    return borderColors.grayColor;
  }

  if (isRapunzelTheme(theme)) {
    return rapunzelTheme.primaryColor;
  }
};

export const themeBtnColor = (color: string) => {
  let backgroundColor;
  switch (color) {
    case AppColor.black:
      backgroundColor = Colors.black;
      break;
    case AppColor.green:
      backgroundColor = Colors.green;
      break;
    default:
      backgroundColor = Colors.SolMain;
  }
  return {backgroundColor};
};

export const themeBtnText = (theme: string) => {
  return {color: Colors.white};
};

export const completeTextColor = (theme: string) => {
  if (isLightTheme(theme) || isDarkTheme(theme)) {
    return {color: Colors.seagreen, borderColor: Colors.seagreen};
  }

  if (isRapunzelTheme(theme)) {
    // return  {color:Colors.black,borderColor:Colors.black}

    return {color: rapunzelTheme.seagreen, borderColor: rapunzelTheme.seagreen};
  }
};

export const completeColor = (theme: string) => {
  if (isLightTheme(theme) || isDarkTheme(theme)) {
    return Colors.seagreen;
  }

  if (isRapunzelTheme(theme)) {
    return rapunzelTheme.seagreen;
  }
};

export const chipColor = (theme: string) => {
  if (isLightTheme(theme)) {
    return Colors.grayBlue;
  }
  if (isDarkTheme(theme)) {
    return darkTheme.borderLine;
  }

  if (isRapunzelTheme(theme)) {
    return Colors.white;
  }
};

export const customTabBorderColor = (theme: string) => {
  if (isLightTheme(theme)) {
    return {borderBottomColor: Colors.borderBlue};
  }
  if (isDarkTheme(theme)) {
    return {borderBottomColor: darkTheme.inputColor};
  }

  if (isRapunzelTheme(theme)) {
    return {borderBottomColor: rapunzelTheme.secondaryColor};
  }
};

export const tabTextColor = (theme: string) => {
  if (isDarkTheme(theme)) {
    return {color: darkTheme.inputColor};
  }
  if (isLightTheme(theme)) {
    return {color: Colors.grayBlue};
  }
  if (isRapunzelTheme(theme)) {
    return {color: rapunzelTheme.secondaryColor};
  }
};

export const customText = (theme: string) => {
  if (isDarkTheme(theme)) {
    return darkTheme.headerText;
  }
  return lightTheme.headerText;
};

export const customInputText = (theme: string) => {
  if (isDarkTheme(theme)) {
    return {color: darkTheme.text};
  }
  return lightTheme.text;
};
export const linkText = (theme: string) => {
  if (isDarkTheme(theme) || isLightTheme(theme)) {
    return Colors.txtBlue;
  }
  if (isRapunzelTheme(theme)) {
    return rapunzelTheme.magenta;
  }
};

export const imgColor = (theme: string) => {
  return {tintColor: isDarkTheme(theme) ? Colors.white : Colors.black};
};

export const imgColorTint = (theme: string) => {
  return isRapunzelTheme(theme) ? {tintColor: Colors.black} : {};
};

export const graphStrokeColor = (theme: string) => {
  if (isDarkTheme(theme) || isLightTheme(theme)) {
    return Colors.graphLineColor;
  }
  if (isRapunzelTheme(theme)) {
    return rapunzelTheme.magenta;
  }
};

export const graphToolTipBgColor = (theme: string) => {
  if (isDarkTheme(theme) || isLightTheme(theme)) {
    return Colors.graphToolTipBackgroundColor;
  }
  if (isRapunzelTheme(theme)) {
    return rapunzelTheme.magenta;
  }
};

export const cardInputBorderColor = (theme: string) => {
  if (isLightTheme(theme)) {
    return {borderBottomColor: Colors.borderBlue};
  }
  if (isDarkTheme(theme)) {
    return {borderBottomColor: darkTheme.inputColor};
  }

  if (isRapunzelTheme(theme)) {
    return {borderBottomColor: rapunzelTheme.border};
  }
};

export const labelText = (theme: string) => {
  if (isDarkTheme(theme) || isLightTheme(theme)) {
    return {color: Colors.cyan};
  }
  if (isRapunzelTheme(theme)) {
    return {color: rapunzelTheme.magenta};
  }
};
export const indicatorColor = (theme: string) => {
  if (isDarkTheme(theme)) {
    return darkTheme.headerText;
  }
  return lightTheme.headerText;
};

export const getBuyCardColor = (theme: string) => {
  if (isDarkTheme(theme)) {
    return {backgroundColor: darkTheme.tertiaryColor};
  }
  if (isLightTheme(theme)) {
    return {backgroundColor: Colors.grayBlue};
  }
  if (isRapunzelTheme(theme)) {
    return {backgroundColor: Colors.white};
  }
};

export const getGbexColor = (theme: string) => {
  if (isDarkTheme(theme)) {
    return {backgroundColor: darkTheme.secondaryColor};
  }
  if (isLightTheme(theme)) {
    return {backgroundColor: themeColor.light};
  }
  if (isRapunzelTheme(theme)) {
    return {backgroundColor: rapunzelTheme.tickerBg};
  }
};
export const dropDownColor = (theme: string) => {
  if (isDarkTheme(theme) || isLightTheme(theme)) {
    return Colors.cyan;
  }
  if (isRapunzelTheme(theme)) {
    return rapunzelTheme.magenta;
  }
};

export const selectedDropdownColor = (theme: string) => {
  if (isDarkTheme(theme)) {
    return {backgroundColor: darkTheme.secondaryColor};
  }
  if (isLightTheme(theme)) {
    return {backgroundColor: Colors.bgBlue};
  }
  if (isRapunzelTheme(theme)) {
    return {backgroundColor: rapunzelTheme.tickerBg};
  }
};

export const gbexPlaceholder = (theme: string) => {
  if (isDarkTheme(theme)) {
    return Colors.gray;
  }
  if (isLightTheme(theme)) {
    return Colors.gray;
  }
  if (isRapunzelTheme(theme)) {
    return Colors.gray;
  }
};

export const disableBtnColor = (theme: string) => {
  if (isDarkTheme(theme) || isLightTheme(theme)) {
    return Colors.disableBtn;
  }
  if (isRapunzelTheme(theme)) {
    return rapunzelTheme.secondaryColor;
  }
};
export const activeText = (theme: string) => {
  if (isDarkTheme(theme) || isLightTheme(theme)) {
    return Colors.cyan;
  }
  if (isRapunzelTheme(theme)) {
    return rapunzelTheme.magenta;
  }
};

export const activeColor = (theme: string) => {
  if (isDarkTheme(theme) || isLightTheme(theme)) {
    return Colors.cyan;
  }
  if (isRapunzelTheme(theme)) {
    return rapunzelTheme.secondaryColor;
  }
};

export const InactiveColor = (theme: string) => {
  if (isLightTheme(theme)) {
    return Colors.dimGray;
  }
  if (isDarkTheme(theme) || isLightTheme(theme)) {
    return darkTheme.inputColor;
  }
  if (isRapunzelTheme(theme)) {
    return rapunzelTheme.secondaryColor;
  }
};

export const otpColor = (theme: string) => {
  if (isDarkTheme(theme)) {
    return {backgroundColor: Colors.white};
  }
  return {backgroundColor: Colors.black};
};

export const otpTextColor = (theme: string) => {
  if (isDarkTheme(theme)) {
    return {color: Colors.black};
  }
  return {color: Colors.white};
};

export const bgImgColor = (theme: string) => {
  if (isDarkTheme(theme)) {
    return {backgroundColor: darkTheme.inputColor};
  }
  if (isLightTheme(theme)) {
    return {backgroundColor: Colors.grayBlue};
  }
  if (isRapunzelTheme(theme)) {
    return {backgroundColor: rapunzelTheme.magenta};
  }
};

export const setHomeBackground = (theme: string) => {
  if (isDarkTheme(theme)) {
    return {backgroundColor: Colors.grayBlack};
  }
  if (isLightTheme(theme)) {
    return {backgroundColor: Colors.bluebg};
  }
  if (isRapunzelTheme(theme)) {
    return {backgroundColor: rapunzelTheme.homePink};
  }
};

export const homeText = (theme: string) => {
  if (isDarkTheme(theme)) {
    return {color: Colors.saffron};
  }
  if (isLightTheme(theme)) {
    return {color: Colors.saffron};
  }
  if (isRapunzelTheme(theme)) {
    return {color: Colors.saffron};
  }
};

export const carouselTextHeading = (theme: string) => {
  if (isDarkTheme(theme)) {
    return {color: Colors.black};
  }
  if (isLightTheme(theme)) {
    return {color: Colors.darkBlue};
  }
  if (isRapunzelTheme(theme)) {
    return {color: Colors.darkBlue};
  }
};
export const carouselText = (theme: string) => {
  if (isDarkTheme(theme)) {
    return {color: Colors.black};
  }
  if (isLightTheme(theme)) {
    return {color: Colors.black};
  }
  if (isRapunzelTheme(theme)) {
    return {color: darkTheme.gray};
  }
};
export const tabBg = (theme: string) => {
  if (isDarkTheme(theme)) {
    return {backgroundColor: darkTheme.secondaryColor};
  }
  if (isLightTheme(theme)) {
    return {backgroundColor: Colors.tabBlue};
  }
  if (isRapunzelTheme(theme)) {
    return {backgroundColor: Colors.white};
  }
};

export const checkboxBg = (theme: string) => {
  if (isDarkTheme(theme)) {
    return {backgroundColor: Colors.white};
  }
  if (isLightTheme(theme)) {
    return {backgroundColor: Colors.white};
  }
  if (isRapunzelTheme(theme)) {
    return {backgroundColor: rapunzelTheme.secondaryColor};
  }
};
export const sortColor = (theme: string) => {
  if (isDarkTheme(theme)) {
    return darkTheme.inputColor;
  }
  if (isLightTheme(theme)) {
    return Colors.grayBlue;
  }
  if (isRapunzelTheme(theme)) {
    return rapunzelTheme.magenta;
  }
};

export const labelColor = (theme: string) => {
  if (isDarkTheme(theme) || isLightTheme(theme)) {
    return {color: darkTheme.inputColor};
  }
  if (isRapunzelTheme(theme)) {
    return {color: rapunzelTheme.magenta};
  }
};
export const getTabColor = (theme: string) => {
  if (isDarkTheme(theme)) {
    return {backgroundColor: darkTheme.headerText};
  }
  return {backgroundColor: lightTheme.headerText};
};

export const spotLimitBtnColor = (theme: string) => {
  if (isDarkTheme(theme)) {
    return {backgroundColor: darkTheme.secondaryColor};
  }
  if (isLightTheme(theme)) {
    return {backgroundColor: Colors.grayBlue};
  }

  if (isRapunzelTheme(theme)) {
    return {backgroundColor: rapunzelTheme.activePink};
  }
};

export const colorCurrencyStatus = (isDown: boolean) => {
  return {color: isDown ? Colors.currencyRed : Colors.currencyGreen};
};

export const colorCurrencyStatus2 = (statusColor: string, appTheme: string) => {
  if (statusColor === 'red') {
    return {color: Colors.currencyRed};
  }

  if (statusColor === 'green') {
    return {color: Colors.currencyGreen};
  }

  return {color: getCurrentTextColor(appTheme)};
};

export const setIEOCardBG = (theme: string) => {
  if (isDarkTheme(theme)) {
    return {
      backgroundColor: darkTheme.secondaryColor,
    };
  }

  if (isLightTheme(theme)) {
    return {
      backgroundColor: lightTheme.secondaryColor,
    };
  }
};

export const setBackgroundNetworkPill = (theme: string) => {
  if (isDarkTheme(theme)) {
    return {
      backgroundColor: darkTheme.secondaryColor,
      shadowColor: 'black',
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.1,
    };
  }
  return {
    backgroundColor: lightTheme.secondaryColor,
    shadowColor: 'lightgrey',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 1,
  };
};

export const setDisabledColor = (theme: string) => {
  if (isDarkTheme(theme)) {
    return {
      backgroundColor: darkTheme.headerText,
    };
  } else {
    return {
      backgroundColor: '#E5E4E2',
    };
  }
};

export const setPaymentDetailBg = (theme: string) => {
  if (isDarkTheme(theme)) {
    return {
      backgroundColor: darkTheme.secondaryColor,
    };
  } else {
    return {
      backgroundColor: '#F0F0F0',
    };
  }
};

export const getBorderColorCard = (theme: string) => {
  if (isDarkTheme(theme)) {
    return 'black';
  }

  return 'lightgrey';
};

export const getBorderColorCardDarker = (theme: string) => {
  if (isDarkTheme(theme)) {
    return 'black';
  }

  return 'whitesmoke';
};
