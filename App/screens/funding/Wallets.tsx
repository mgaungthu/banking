import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, Platform} from 'react-native';
import {commonStyles, rtlStyles} from '../../globalstyles/styles';
import {strings} from '../../strings';
import {
  Header,
  ImageContainer,
  SearchBar,
  Space,
  ThemeText,
} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {AppFunctions, ThemeFunctions} from '../../utils';
import {
  IcQuickSwap,
  wallet_card_d,
  wallet_card_gd,
  wallet_card_gw,
  wallet_card_pd,
  wallet_card_pw,
  wallet_currency_dark,
  wallet_currency_white,
  wallet_send_dark,
  wallet_send_white,
} from '../../assets';
import {walletStyles as styles} from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {isDarkTheme} from '../../utils/ThemeFunctions';
import IconVector from '../../components/ui/IconVector';
import {AppConstants, MapperConstants} from '../../constants';
import _ from 'lodash';
import {
  GbexActions,
  GlobalActions,
  PaymentActions,
  QuickBuyActions,
  WalletActions,
} from '../../store';
import {Switch} from 'react-native-paper';
import HistoryShimmer from './withdrawals/ListShimmer';
import {AppColor, Loader, Screen} from '../../enums';
import BalanceList from './balances/BalanceList';
import {showToast} from '../../utils/GenericUtils';
import Navigation from '../../utils/Navigation';
import SelectToken from '../payments/deposit/SelectToken';
import {SanitizeNumber} from '../../utils/AppFunctions';
import {ApproximatelyEqual} from '../../constants/Symbols';
import Image from 'react-native-fast-image';
import ScreenOverlay from '../../components/ui/ScreenOverlay';
import CardCarousel from './CardCarousel';

const Wallets = (props: any) => {
  const [searchQuery, setSearchQuery] = useState<any>('');
  const [searchedData, setSearchedData] = useState([]);
  const [estimatedTotal, setEstimatedTotal] = useState(0);
  const [scrollingIndex, setScrollingIndex] = useState(0);
  const [isDeposit, setIsDeposit] = useState(false);

  const [isSelectCurrency, setIsSelectCurrency] = useState(false);
  const [opened, setOpened] = useState(false);

  const {userProfileData} = useSelector((state: any) => state.appReducer);

  const appData = useSelector((state: any) => state.appReducer);

  const {
    isRtlApproach,
    appTheme,
    appColor,
    isSmallBalanceHidden,
    isBalanceHidden,
    mainCurrency,
    secondCurrency,
  } = useSelector((state: any) => state.globalReducer);

  const quickBuyData = useSelector((state: any) => state.quickBuyReducer);
  const market = useSelector((state: any) => state.marketReducer);

  const isHeader = () => {
    if (props?.route?.params?.tokenSymbol) return true;
    return props?.route?.params?.fromScreen ? true : false;
  };

  // console.log('data:', quickBuyData);

  const {liveCurrencyPrices} = useSelector((state: any) => state.gbexReducer);

  const tokenSymbol = props?.route?.params?.tokenSymbol;

  const showOverlay = tokenSymbol && !opened;

  const getEstimateValue = () => {
    // const totalSum = quickBuyData?.fundsList.reduce(
    //   (acc, curr) => acc + parseFloat(curr.available),
    //   0,
    // );
    let total = 0;
    quickBuyData?.fundsList.forEach((item, index) => {
      if (item.symbol !== 'USDG') {
        if (item.total > 0 && item.currency.is_stable_coin === 0) {
          const name = `${item.symbol}-USDG`;
          const mainQuoteMarket = getMarketByName(name);
          if (mainQuoteMarket) {
            if (mainQuoteMarket.bid > 0) {
              // console.log(mainQuoteMarket.name);
              total = total + item.total * mainQuoteMarket.bid;
            }
          }
        }
      } else {
        total = total + item.total * 1;
      }
    });

    const rounded = roundWithFilter(total, 2);
    setEstimatedTotal(rounded);
  };

  const getMarketByName = name => {
    // console.log(name);
    const val = market?.markets.find(item => item.name === name);
    return val;
  };

  const roundWithFilter = (value, decimals) => {
    // Check if value is a valid numeric value
    if (isNaN(parseFloat(value)) || !isFinite(value)) {
      return value;
    }

    if (!value) {
      value = 0;
    }

    // if (!decimals) {
    //   decimals = 0;
    // }

    // // Set max 12 decimal size
    // if (decimals > 12) {
    //   decimals = 12;
    // }

    value = parseFloat(value)
      .toFixed(6)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,');

    return value;
  };

  const dispatch = useDispatch<any>();

  useEffect(() => {
    if (!quickBuyData?.fundsList || quickBuyData?.fundsList?.length === 0)
      dispatch(QuickBuyActions.fundsList());
  }, [props.activeIndex, quickBuyData?.fundsList?.length]);

  useEffect(() => {
    if (quickBuyData?.fundsList?.length > 0) {
      getEstimateValue();
    }
  }, [quickBuyData?.fundsList, liveCurrencyPrices]);

  useEffect(() => {
    dispatch(GbexActions.getLivePrice());
    if (!quickBuyData?.fundsList || quickBuyData?.fundsList?.length === 0) {
      dispatch(QuickBuyActions.fundsList());
    }
  }, [dispatch]);

  useEffect(() => {
    updateList();
  }, [quickBuyData?.fundsList]);

  const searchText = e => {
    let text = e.toLowerCase().trim();
    setSearchQuery(e);
    updateList(text);
  };

  const updateList = (text = null) => {
    if (!text) {
      text = searchQuery || '';
    }

    text = text.toLowerCase().trim();

    if (quickBuyData?.fundsList?.length > 0) {
      let balanceList = quickBuyData?.fundsList;
      let filteredData = balanceList.filter(item => {
        return (
          item.name.toLowerCase().match(text) ||
          item.symbol.toLowerCase().match(text)
        );
      });
      if (filteredData && Array.isArray(filteredData)) {
        setSearchedData(filteredData);
      } else {
        setSearchedData([]);
      }
    }
  };

  const onSearchCancel = () => {
    setSearchQuery('');
    setSearchedData([]);
  };

  const onToggleSwitch = () => {
    dispatch(GlobalActions.hideSmallBalances());
  };

  const handleChooseCurrency =
    (data: any, isEnabledDeposit: boolean, isEndableWithdrawal: boolean) =>
    () => {
      let tabIndex = 0;

      if (tokenSymbol && !opened) {
        setOpened(true);
        tabIndex = 1;
      }

      if (userProfileData?.kyc_record === null) {
        showToast(strings('balance_deposit'), strings('kyc_msg'), 'error');
      } else {
        Navigation.navigate(Screen.WalletDetails, {
          data,
          isEnabledDeposit,
          isEndableWithdrawal,
          tabIndex,
        });
      }
    };

  const _chooseCurrency = deposit => {
    setIsSelectCurrency(true);
    setIsDeposit(deposit);
  };

  const isNonFiatCurrency = (currencyName: string) => {
    const filteredData = quickBuyData?.fundsList.find(
      res => res?.symbol === currencyName,
    );

    if (filteredData && Object.keys(filteredData).length > 0) {
      return filteredData.type === 'crypto';
    } else {
      return MapperConstants.StatusMapper.disable;
    }
  };

  const _selectCurrency = (item, index) => () => {
    setIsSelectCurrency(false);

    if (!isNonFiatCurrency(item?.symbol)) {
      return Navigation.navigate(Screen.Payment, {});
    }

    if (!userProfileData?.kyc_record || !userProfileData?.por_verified_at) {
      Navigation.navigate(Screen.MyAccount);
      return;
    }
    const data = item;

    if (isDeposit) {
      data.currency.deposit_enabled
        ? Navigation.navigate(Screen.DepositAddress, {data})
        : showToast(
            strings('balance_deposit'),
            strings('deposit_not_enabled'),
            'info',
          );
    } else {
      data.currency.withdraw_enabled
        ? Navigation.navigate(Screen.WithdrawalAddress, {data})
        : showToast(
            strings('balance_withdrawal'),
            strings('withdrawal_not_enabled'),
            'info',
          );
    }
  };

  const hideSmallMargin = Platform.OS === 'ios' ? {marginRight: 8} : {};

  const ListHeaderComponent = React.useMemo(() => {
    return (
      <>
        <View
          style={[
            styles.balanceContainer,
            ThemeFunctions.setBackground(appTheme),
          ]}>
          <IconVector.Entypo
            name={isBalanceHidden ? 'eye-with-line' : 'eye'}
            color={ThemeFunctions.customText(appTheme)}
            size={24}
            onPress={() => dispatch(GlobalActions.updateBalanceVisibility())}
            style={[styles.showEye]}
          />
          <Text
            style={[
              {color: ThemeFunctions.customText(appTheme)},
              styles.textTitleBalance,
            ]}>
            Balance
          </Text>
          <ThemeText style={styles.textBalance}>
            {isBalanceHidden ? '****' : estimatedTotal} {'USDG'}
          </ThemeText>
        </View>
        <View
          style={[
            styles.contentContainer,
            ThemeFunctions.setBackground(appTheme),
            {marginTop: 30},
          ]}>
          {/* <Image
            source={_cardTheme()}
            style={styles.card}
            resizeMode="contain"
          /> */}
          <CardCarousel />
          <View style={styles.buttonDwContainer}>
            <View style={styles.dwRow}>
              <TouchableOpacity
                style={[
                  styles.buttonDw,
                  {backgroundColor: ThemeFunctions.getColor(appColor)},
                ]}
                onPress={() => _chooseCurrency(true)}>
                <IconVector.Entypo name="plus" color={'white'} size={22} />
              </TouchableOpacity>
              <ThemeText style={styles.textDw}>{strings('deposit')}</ThemeText>
            </View>
            <View style={styles.dwRow}>
              <TouchableOpacity
                style={[
                  styles.buttonDw,
                  {backgroundColor: ThemeFunctions.getColor(appColor)},
                ]}
                onPress={() => _chooseCurrency(false)}>
                <IconVector.MaterialCommunity
                  name="arrow-bottom-left"
                  color={'white'}
                  size={22}
                />
              </TouchableOpacity>
              <ThemeText style={styles.textDw}>
                {strings('withdrawals')}
              </ThemeText>
            </View>
          </View>

          <Space height={20} />
          <SearchBar
            placeholder={`${strings('search')}`}
            onChangeText={searchText}
            searchQuery={searchQuery}
            onCancel={onSearchCancel}
          />
          <View
            style={[
              styles.hideBalanceRow,
              isRtlApproach ? rtlStyles.reverseRow : {},
            ]}>
            <ThemeText style={[styles.hideBalance, hideSmallMargin]}>
              {strings('hide_small_balances')}
            </ThemeText>
            <Switch
              value={isSmallBalanceHidden}
              onValueChange={onToggleSwitch}
              color={ThemeFunctions.toggleBg(appColor)}
              style={{transform: [{scaleX: isRtlApproach ? -1 : 1}]}}
            />
          </View>
          {appData.loading === Loader.GET_FUND_BALANCE ||
          !quickBuyData?.fundsList ? (
            <HistoryShimmer />
          ) : null}
        </View>
      </>
    );
  }, [searchText]);

  const _navigateMainCurrency = () => {
    Navigation.navigate(Screen.MainCurrency);
  };

  const _navigateQuickSwap = () => {
    Navigation.navigate(Screen.QuickSwapScreen, {fromScreen: true});
  };

  return (
    <>
      <SafeAreaView
        style={[
          commonStyles.tabSafeView,
          ThemeFunctions.setBackground(appTheme),
        ]}>
        {showOverlay && <ScreenOverlay />}

        <Image
          source={ThemeFunctions.getBgImage(appColor)}
          style={commonStyles.bg_image}
          resizeMode="contain"
        />
        {isHeader() ? (
          <Header title={strings('wallet')} />
        ) : (
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={[
                styles.buttonHeader,
                ThemeFunctions.getCardColor(appTheme),
              ]}
              onPress={_navigateQuickSwap}>
              <ImageContainer
                imagePath={IcQuickSwap}
                imgStyle={[
                  styles.buttonHeaderIcon,
                  ThemeFunctions.imgColor(appTheme),
                ]}
              />
            </TouchableOpacity>
            <ThemeText style={styles.textHeader}>{strings('wallet')}</ThemeText>
            <View
              style={[{width: 40, height: 40}]}
              // onPress={_navigateMainCurrency}
            >
              {/* <Image
                source={
                  isDarkTheme(appTheme)
                    ? wallet_currency_white
                    : wallet_currency_dark
                }
                style={styles.buttonHeaderIcon}
              /> */}
            </View>
          </View>
        )}
        <BalanceList
          appColor={appColor}
          handleChooseCurrency={handleChooseCurrency}
          searchedData={searchedData}
          setSearchedData={setSearchedData}
          isSwitchOn={isSmallBalanceHidden}
          searchQuery={searchQuery}
          ListHeaderComponent={ListHeaderComponent}
          tokenSymbol={tokenSymbol}
          opened={opened}
        />
      </SafeAreaView>
      <SelectToken
        isSmallBalanceHidden={isSmallBalanceHidden}
        isVisible={isSelectCurrency}
        isFull={true}
        setIsVisible={setIsSelectCurrency}
        updateToken={_selectCurrency}
        setScrollingIndex={setScrollingIndex}
        scrollingIndex={scrollingIndex}
      />
    </>
  );
};

export default Wallets;
