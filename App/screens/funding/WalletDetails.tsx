import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Image,
  View,
  ScrollView,
  Text,
  useWindowDimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {commonStyles, rtlStyles} from '../../globalstyles/styles';
import {strings} from '../../strings';
import {
  Cell,
  Header,
  LoadingSpinner,
  ThemeButton,
  ThemeText,
} from '../../components';
import {useSelector} from 'react-redux';
import {AppFunctions, ThemeFunctions} from '../../utils';
import Colors from '../../theme/Colors';
import {APIConstants, AppConstants, MapperConstants} from '../../constants';
import {Screen} from '../../enums';
import {showToast} from '../../utils/GenericUtils';
import Navigation from '../../utils/Navigation';
import {
  walletDetailStyles as styles,
  transactionListStyles,
  balanceStyles,
} from './styles';
import {TabBar, TabView} from 'react-native-tab-view';
import MarketList from './MarketList';
import {FormatDateTime, SanitizeNumber} from '../../utils/AppFunctions';
import {makeRequest, makeRequestNew} from '../../services/ApiService';
import {StatusColor} from './common';
import IconVector from '../../components/ui/IconVector';
import {isDarkTheme} from '../../utils/ThemeFunctions';

const TransactionList = ({currency}: {currency: string}) => {
  const [userTx, setUserTx] = useState();
  const [loading, setLoading] = useState(true);

  const {isRtlApproach, appTheme, appColor} = useSelector(
    (state: any) => state.globalReducer,
  );

  const quickBuyData = useSelector((state: any) => state.quickBuyReducer);

  useEffect(() => {
    setLoading(true);
    fetchTx();
    checkFiat();
  }, []);

  const checkFiat = () => {
    const res = quickBuyData?.fundsList.find(item => item.name === currency);
    return res?.type === 'fiat' ? true : false;
  };

  const fetchTx = async () => {
    const response = await makeRequestNew(
      MapperConstants.ApiTypes.GET,
      checkFiat()
        ? APIConstants.CREATE_REMITTANCE
        : APIConstants.WITHDRAW_COMPLETE,
    );

    const depositResponse = await makeRequestNew(
      MapperConstants.ApiTypes.GET,
      checkFiat() ? APIConstants.DEPOSIT_FIAT : APIConstants.DEPOSIT_CRYPTO,
    );

    if (response.status === 200) {
      // console.log(resp.data.data);

      const result = response.data.data.filter(
        item => item.currency === currency,
      );

      const result2 = depositResponse.data.data.filter(item =>
        checkFiat()
          ? item?.fiat_currency.symbol === currency
          : item.currency === currency,
      );

      const mergedData = [
        ...result.map(item => ({
          ...item,
          type: 'withdraw',
          date: item.created_at, // Ensure uniform date field
        })),
        ...result2.map(item => ({
          ...item,
          type: 'deposit',
          date: checkFiat() ? item?.created_at : item?.date,
        })),
      ];

      setUserTx(mergedData);
    } else {
      showToast('Transaction History', response.data.message, 'error');
    }

    setLoading(false);
  };

  const reverseDirection = () => {
    return [
      balanceStyles.rowItem,
      {paddingHorizontal: 20},
      ThemeFunctions.cardInputBorderColor(appTheme),
      isRtlApproach ? rtlStyles.reverseRow : {},
    ];
  };

  const rightAlignView = () => {
    return [
      balanceStyles.rightView,
      isRtlApproach ? rtlStyles.alignStart : rtlStyles.alignEnd,
    ];
  };

  return (
    <View style={{marginTop: 10}}>
      {loading ? (
        <LoadingSpinner
          color={ThemeFunctions.getColor(appColor)}
          size="small"
        />
      ) : (
        <FlatList
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps="never"
          data={userTx}
          refreshing={loading}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          onRefresh={() => fetchTx()}
          contentContainerStyle={[balanceStyles.list]}
          ListEmptyComponent={
            <ThemeText
              style={{
                ...transactionListStyles.placeholder,
                color: ThemeFunctions.customText(appTheme),
              }}>
              Empty
            </ThemeText>
          }
          renderItem={({item}) => {
            return (
              <View
                // onPress={() =>
                //   Navigation.navigate(Screen.UserTransactionDetail, {...item})
                // }
                style={[
                  ThemeFunctions.getCardColor(appTheme),
                  balanceStyles.balanceCard,
                ]}>
                <View style={reverseDirection()}>
                  <View
                    style={[
                      commonStyles.rowItem,
                      commonStyles.alignCenter,
                      balanceStyles.leftView,
                      isRtlApproach ? rtlStyles.reverseRow : {},
                    ]}>
                    <View>
                      <Text
                        style={[
                          balanceStyles.leftLabel,
                          {color: ThemeFunctions.getCurrentTextColor(appTheme)},
                        ]}
                        adjustsFontSizeToFit={true}>
                        {item.type}
                      </Text>
                    </View>
                  </View>
                  <View style={rightAlignView()}>
                    <Text
                      style={[
                        balanceStyles.rightLabel,
                        {color: ThemeFunctions.getCurrentTextColor(appTheme)},
                        {paddingTop: 2},
                      ]}
                      adjustsFontSizeToFit={true}
                      numberOfLines={4}>
                      {AppFunctions.standardDigitConversion(
                        parseFloat(item.amount),
                      )}{' '}
                      {item.currency}
                    </Text>
                  </View>
                </View>
                {(item.address || item.txid) && (
                  <View style={reverseDirection()}>
                    <View
                      style={[
                        commonStyles.rowItem,
                        commonStyles.alignCenter,
                        // balanceStyles.leftView,
                        isRtlApproach ? rtlStyles.reverseRow : {},
                      ]}>
                      <View>
                        <Text
                          style={[
                            balanceStyles.leftLabel,
                            {
                              color:
                                ThemeFunctions.getCurrentTextColor(appTheme),
                            },
                          ]}
                          adjustsFontSizeToFit={true}>
                          {item.address || item.txid}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}

                <View style={[reverseDirection(), commonStyles.noBorder]}>
                  <View style={balanceStyles.leftView}>
                    <Text
                      style={[
                        balanceStyles.rightLabel,
                        balanceStyles.smallText,
                        {color: ThemeFunctions.customText(appTheme)},
                      ]}
                      adjustsFontSizeToFit={true}
                      numberOfLines={4}>
                      {FormatDateTime(item.created_at || item.date)}
                    </Text>
                  </View>
                  <View style={rightAlignView()}>
                    <Text
                      style={[
                        {
                          textTransform: 'uppercase',
                          color: StatusColor(item.status),
                        },
                      ]}>
                      {item.status}{' '}
                      {/* <View style={{backgroundColor: 'red'}}>
                        <Text>({item.type})</Text>
                      </View> */}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

const WalletDetails = (props: any) => {
  const [index, setIndex] = useState(props?.route?.params?.tabIndex || 0);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const [routes] = useState([
    {key: 'markets', title: strings('markets')},
    {key: 'transactions', title: strings('transactions')},
  ]);

  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer);

  const renderScene = ({route: {key}}) => {
    switch (key) {
      case 'markets':
        return <MarketList symbol={data.symbol} />;
      case 'transactions':
        return <TransactionList currency={data.symbol} />;
      default:
        return <MarketList symbol={data.symbol} />;
    }
  };

  const handleIndexChange = (index: number) => {
    setIndex(index);
  };

  const quickBuyData = useSelector((state: any) => state.quickBuyReducer);

  const livePrices = useSelector(
    (state: any) => state.gbexReducer?.liveCurrencyPrices,
  );

  const {data, isEnabledDeposit, isEndableWithdrawal} = props.route.params;

  const {width: WIDTH} = useWindowDimensions();

  const currencyDecimal =
    data.decimals || AppConstants.CurrencyDecimal[data.symbol];

  const getTotalBalance = () => {
    const _total = parseFloat(data?.available);

    return AppFunctions.standardDigitConversion(
      parseFloat(_total?.toFixed(currencyDecimal)),
    );
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

  const _navigateDeposit = () => {
    if (isEnabledDeposit) {
      if (isNonFiatCurrency(data?.symbol))
        Navigation.navigate(Screen.DepositAddress, {data});
      else Navigation.navigate(Screen.Payment, {});
    } else
      showToast(
        strings('balance_deposit'),
        strings('deposit_not_enabled'),
        'info',
      );
  };

  const _navigateWithdraw = () => {
    if (isEndableWithdrawal) {
      if (isNonFiatCurrency(data?.symbol))
        Navigation.navigate(Screen.WithdrawalAddress, {data});
      else Navigation.navigate(Screen.Payment, {});
    } else
      showToast(
        strings('balance_withdrawal'),
        strings('withdrawal_not_enabled'),
        'info',
      );
  };

  const _networkPill = () => {
    if (!data.network) return <View style={[{width: 70}]}></View>;

    return (
      <View style={[styles.network, ThemeFunctions.getCardColor(appTheme)]}>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit={true}
          style={[styles.networkText, ThemeFunctions.getTextColor(appTheme)]}>
          {data.network}
        </Text>
      </View>
    );
  };

  const tokenImg = data?.assetUrl ? data.assetUrl : null;

  return (
    <>
      <SafeAreaView
        style={[
          commonStyles.tabSafeView,
          ThemeFunctions.setBackground(appTheme),
        ]}>
        <Header
          currencyComponent={
            <View style={[{marginLeft: 30}]}>
              <Text
                style={[
                  {...commonStyles.headerText, textTransform: 'uppercase'},
                  ThemeFunctions.setHeaderTextColor(appTheme),
                ]}>
                {data?.symbol} Wallet
              </Text>
            </View>
          }
          currency={true}
          right={_networkPill()}
        />
        <View style={styles.balanceContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <ThemeText style={styles.balanceTitle}>
              {getTotalBalance()} {data.symbol}
            </ThemeText>
            <Image
              source={{uri: tokenImg}}
              resizeMode="contain"
              style={[styles.img]}
            />
          </View>
          {/* <ThemeText style={styles.balanceSmallTitle}>
            ${getUsdPrice()}
          </ThemeText> */}
        </View>
        {showBreakdown ? (
          <View style={styles.detailContainer}>
            <Cell style={styles.cell}>
              <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
                Available
              </ThemeText>
              <ThemeText style={styles.balanceSmallTitle}>
                {AppFunctions.standardDigitConversion(
                  parseFloat((data?.available * 1).toFixed(currencyDecimal)),
                )}{' '}
                {data.symbol}
              </ThemeText>
            </Cell>
            <Cell style={styles.cell}>
              <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
                Pending In Orders
              </ThemeText>
              <ThemeText style={styles.balanceSmallTitle}>
                {AppFunctions.standardDigitConversion(
                  parseFloat((data?.pending * 1).toFixed(currencyDecimal)),
                )}{' '}
                {data.symbol}
              </ThemeText>
            </Cell>

            <Cell style={styles.cell}>
              <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
                Pending In Withdraw
              </ThemeText>
              <ThemeText style={styles.balanceSmallTitle}>
                {AppFunctions.standardDigitConversion(
                  parseFloat(
                    SanitizeNumber(data?.withdraw_pending * 1).toFixed(
                      currencyDecimal,
                    ),
                  ),
                )}{' '}
                {data.symbol}
              </ThemeText>
            </Cell>

            <Cell style={styles.cell}>
              <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
                Staked Balance
              </ThemeText>
              <ThemeText style={styles.balanceSmallTitle}>
                {AppFunctions.standardDigitConversion(
                  parseFloat(
                    SanitizeNumber(data?.staking_balance * 1).toFixed(
                      currencyDecimal,
                    ),
                  ),
                )}{' '}
                {data.symbol}
              </ThemeText>
            </Cell>
          </View>
        ) : (
          <></>
        )}

        <View style={styles.breakdownBarContainer}>
          <TouchableOpacity
            style={[styles.breakdownBar]}
            onPress={() => setShowBreakdown(!showBreakdown)}>
            <ThemeText
              style={[
                {
                  color: ThemeFunctions.customText(appTheme),
                  marginRight: 5,
                },
              ]}>
              {showBreakdown ? strings('show_less') : strings('show_more')}
            </ThemeText>
            {showBreakdown ? (
              <IconVector.FontAwesome5
                color={ThemeFunctions.customText(appTheme)}
                name="angle-double-up"
              />
            ) : (
              <IconVector.FontAwesome5
                color={ThemeFunctions.customText(appTheme)}
                name="angle-double-down"
              />
            )}
          </TouchableOpacity>
        </View>
        {/* <View style={{ flex: 1 }}> */}
        <TabView
          lazy
          tabBarPosition="top"
          navigationState={{
            index,
            routes,
          }}
          renderScene={renderScene}
          onIndexChange={index => handleIndexChange(index)}
          initialLayout={{width: WIDTH}}
          commonOptions={{
            label: ({route, labelText, focused, color}) => (
              <Text
                style={[
                  {color: isDarkTheme(appTheme) && focused ? '#fff' : color},
                  styles.textTab,
                ]}>
                {labelText ?? route.title}
              </Text>
            ),
          }}
          renderTabBar={props => (
            <TabBar
              bounces={true}
              activeColor={'#000'}
              inactiveColor={ThemeFunctions.customText(appTheme)}
              tabStyle={{width: WIDTH / 2}}
              scrollEnabled={true}
              style={[
                {backgroundColor: ThemeFunctions.getTabBgColor(appTheme)},
                // styles.tabStyle,
              ]}
              indicatorStyle={{
                backgroundColor: ThemeFunctions.getColor(appColor),
              }}
              // contentContainerStyle={[styles.tabContainer]}
              onTabLongPress={({route: {key}}) => {
                props.jumpTo(key);
              }}
              {...props}
              pressColor="transparent"
            />
          )}
        />
        {/* </View> */}
      </SafeAreaView>
      <View
        style={[
          styles.buttonBottomContainer,
          ThemeFunctions.setBackground(appTheme),
        ]}>
        <ThemeButton
          styleButton={[styles.buttonBottom]}
          text="deposit"
          onClickHandler={_navigateDeposit}
        />
        <ThemeButton
          styleButton={[
            styles.buttonBottom,
            {backgroundColor: Colors.currencyRed},
          ]}
          text="withdraw"
          onClickHandler={_navigateWithdraw}
        />
      </View>
    </>
  );
};

export default WalletDetails;
