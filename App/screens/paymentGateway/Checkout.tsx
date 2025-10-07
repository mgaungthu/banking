import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';

import Image from 'react-native-fast-image';
import {Icon} from 'react-native-elements';
import {Switch} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';

import {
  Header,
  ThemeButton,
  LoadingSpinner,
  ThemeText,
  Space,
} from '../../components';

import {strings} from '../../strings';

import {useDispatch, useSelector} from 'react-redux';
import {showToast} from '../../utils/GenericUtils';

import styles from './styles';

import {ThemeFunctions} from '../../utils';
import {axiosInstancePaymentGateway} from '../../services/AxiosOrder';
import {commonStyles} from '../../globalstyles/styles';
import {isDarkTheme, setPaymentDetailBg} from '../../utils/ThemeFunctions';
import {QuickBuyActions} from '../../store';
import {DEFAULT_COIN_LOGO} from '../../store/action/quickbuy/QuickBuyAction';
import {FormatNumber} from '../../utils/AppFunctions';
import {Timer} from '../../components/timer';
import {HandlePaymentGatewayError} from '../../components/common';

interface Quote {
  amount: number;
  currencyId: string;
  currencyName: string;
  currencyType: string;
  fee: number;
  feePercent: number;
  total: number;
}

interface CurrencyWallet {
  adjustment: number;
  assetUrl: string | null;
  balance: number;
  createdAt: string;
  currencyAddress: string;
  currencyId: string;
  currencyName: string;
  deletedAt: string;
  destinationTag: string | null;
  documentStatus: string;
  email: string;
  exchangeName: string;
  id: number;
  image: null;
  inTrade: number;
  name: string;
  staking_balance: number;
  locked_balance: number;
  status: boolean;
  symbol: string;
  tfaStatus: '0' | '1';
  uniqueId: string;
  updatedAt: string;
  userId: string;
  version: string | null;
  withdrawalStartIn: string | null;
}

interface CheckoutData {
  amountInUSD: number;
  checkoutId: string;
  checkoutTime: string;
  duration: number;
  expiryTime: string;
  note: string | null;
  quotes: Quote[];
  requestCurrency: string;
  requestCurrencyAmount: number;
  requestCurrencyPriceUsd: number;
  status: string;
  store: {
    apiKey: string;
    isActive: boolean;
    labelName: string;
    logo: string;
  };
}

const Checkout = props => {
  const {checkoutId, currencyId = ''} = props.route.params.data;

  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer);
  const quickBuyData = useSelector((state: any) => state.quickBuyReducer);

  const [isloading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hideSmallBalance, setHideSmallBalance] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<Quote | undefined>();
  const [checkoutData, setCheckoutData] = useState();
  const [isDetailExpanded, setIsDetailExpanded] = useState(false);

  const dispatch = useDispatch();

  const fundsList = quickBuyData?.fundsList;

  const getCheckoutDetails = (toLoad: boolean = true) => {
    toLoad && setIsLoading(true);

    axiosInstancePaymentGateway
      .post(
        '/merchant-dashboard-api-service/wallet-payment/get-checkout-details',
        {
          checkoutId,
        },
      )
      .then(resp => {
        setCheckoutData(resp.data.data);
      })
      .catch(e => {
        console.log(e);
        HandlePaymentGatewayError(e);
      })
      .finally(() => {
        setSelectedQuote(undefined);
        setIsDetailExpanded(false);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getCheckoutDetails();

    dispatch(QuickBuyActions.fundsList());
  }, []);

  const renderConfirmButton = (data: CheckoutData) => {
    const expiryTs = new Date(data.expiryTime).getTime();
    const nowTs = Date.now();

    if (data.status !== 'pending') {
      return (
        <View
          style={[
            styles.confirmContainer,
            {borderColor: ThemeFunctions.getBorderColorCard(appTheme)},
            setPaymentDetailBg(appTheme),
          ]}>
          <ThemeButton
            loading={isSubmitting}
            disabled={true}
            disabledColor="gray"
            styleButton={styles.confirmBtn}
            text={`Checkout ${data.status}`}
          />
        </View>
      );
    }

    if (expiryTs < nowTs) {
      return (
        <View
          style={[
            styles.confirmContainer,
            {borderColor: ThemeFunctions.getBorderColorCard(appTheme)},
            setPaymentDetailBg(appTheme),
          ]}>
          <ThemeButton
            loading={isSubmitting}
            disabled={true}
            disabledColor="gray"
            styleButton={styles.confirmBtn}
            text={strings("checkout_expired")}
          />
        </View>
      );
    }

    if (!selectedQuote || selectedQuote == undefined)
      return (
        <View
          style={[
            styles.confirmContainer,
            {borderColor: ThemeFunctions.getBorderColorCard(appTheme)},
            setPaymentDetailBg(appTheme),
          ]}>
          <ThemeButton
            loading={isSubmitting}
            disabled={true}
            disabledColor="gray"
            styleButton={styles.confirmBtn}
            text={strings("select_payment_cur")}
          />
        </View>
      );
    const currencyWallet: CurrencyWallet = fundsList.find(
      (wallet: CurrencyWallet) => wallet.symbol === selectedQuote.currencyName,
    );

    if (currencyWallet.balance >= selectedQuote.total) {
      return (
        <>
          <View
            style={[
              styles.confirmContainerExp,
              {borderColor: ThemeFunctions.getBorderColorCard(appTheme)},
              setPaymentDetailBg(appTheme),
            ]}>
            <View style={[styles.confirmPaymentDetail]}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedQuote(undefined);
                  setIsDetailExpanded(false);
                }}
                style={{
                  position: 'absolute',
                  right: 10,
                  top: -10,
                  width: 20,
                  height: 20,
                }}>
                <Icon color={'grey'} size={20} name="cancel" />
              </TouchableOpacity>
              <ThemeText>{strings("pay")}</ThemeText>

              <ThemeText>
                {FormatNumber(selectedQuote.total)} {selectedQuote.currencyName}
              </ThemeText>
            </View>

            <View style={[styles.paymentDetailMoreDetail]}>
              <View style={{alignItems: 'flex-end'}}>
                <TouchableOpacity
                  style={{paddingBottom: 10}}
                  onPress={() => setIsDetailExpanded(!isDetailExpanded)}>
                  <ThemeText
                    style={[
                      {
                        color: ThemeFunctions.customText(appTheme),
                        textDecorationLine: 'underline',
                      },
                    ]}>
                    {isDetailExpanded ? strings("show_less") : strings("show_more")}
                  </ThemeText>
                </TouchableOpacity>
              </View>

              {isDetailExpanded ? (
                <>
                  <View style={[styles.paymentDetailMoreDetailRow]}>
                    <View>
                      <ThemeText
                        style={[
                          {
                            color: ThemeFunctions.customText(appTheme),
                          },
                        ]}>
                        {strings("amount")}
                      </ThemeText>
                    </View>
                    <View>
                      <ThemeText
                        style={[
                          {
                            color: ThemeFunctions.customText(appTheme),
                          },
                        ]}>
                        {FormatNumber(selectedQuote.amount)}{' '}
                        {selectedQuote.currencyName}
                      </ThemeText>
                    </View>
                  </View>
                  <View style={[styles.paymentDetailMoreDetailRow]}>
                    <View>
                      <ThemeText
                        style={[
                          {
                            color: ThemeFunctions.customText(appTheme),
                          },
                        ]}>
                        {strings("fee")}
                      </ThemeText>
                    </View>
                    <View>
                      <ThemeText
                        style={[
                          {
                            color: ThemeFunctions.customText(appTheme),
                          },
                        ]}>
                        {FormatNumber(selectedQuote.fee)}{' '}
                        {selectedQuote.currencyName}
                      </ThemeText>
                    </View>
                  </View>
                  <View style={[styles.paymentDetailMoreDetailRow]}>
                    <View>
                      <ThemeText
                        style={[
                          {
                            color: ThemeFunctions.customText(appTheme),
                          },
                        ]}>
                        {strings("total")}
                      </ThemeText>
                    </View>
                    <View>
                      <ThemeText
                        style={[
                          {
                            color: ThemeFunctions.customText(appTheme),
                          },
                        ]}>
                        {FormatNumber(selectedQuote.total)}{' '}
                        {selectedQuote.currencyName}
                      </ThemeText>
                    </View>
                  </View>
                </>
              ) : (
                <></>
              )}
            </View>

            <ThemeButton
              disabled={isSubmitting}
              loading={isSubmitting}
              onClickHandler={() => makePayment()}
              styleButton={styles.confirmBtn}
              text={strings("confirm")}
            />
          </View>
        </>
      );
    } else {
      return (
        <>
          <View
            style={[
              styles.confirmContainerExp,
              {borderColor: ThemeFunctions.getBorderColorCard(appTheme)},
              setPaymentDetailBg(appTheme),
            ]}>
            <View style={[styles.confirmPaymentDetail]}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedQuote(undefined);
                  setIsDetailExpanded(false);
                }}
                style={{
                  position: 'absolute',
                  right: 10,
                  top: -10,
                  width: 20,
                  height: 20,
                }}>
                <Icon color={'grey'} size={20} name="cancel" />
              </TouchableOpacity>
              <ThemeText>{strings("pay")}</ThemeText>

              <ThemeText>
                {FormatNumber(selectedQuote.total)} {selectedQuote.currencyName}
              </ThemeText>
            </View>

            <ThemeButton
              loading={isSubmitting}
              disabled={true}
              disabledColor="gray"
              styleButton={styles.confirmBtn}
              text={strings("insufficient_funds")}
            />
          </View>
        </>
      );
    }
  };

  const RenderQuote = ({
    quote,
    fundsList,
  }: {
    quote: Quote;
    fundsList: CurrencyWallet[];
  }) => {
    const currencyWallet = fundsList.find(
      (wallet: CurrencyWallet) => wallet.symbol === quote.currencyName,
    );

    if (!currencyWallet || currencyWallet === undefined) return <></>;

    if (hideSmallBalance && currencyWallet.balance <= 0) return <></>;

    const styleData =
      selectedQuote && selectedQuote.currencyId === quote.currencyId
        ? {backgroundColor: '#7CB9E8'}
        : {};

    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedQuote(quote);
          setIsDetailExpanded(false);
        }}
        style={[
          ThemeFunctions.getCardColor(appTheme),
          styles.currencyContainer,
        ]}>
        <View style={[styles.currencyTag, styleData]}></View>
        <View style={styles.currencyContainerLeft}>
          <View style={styles.currencyLogoWrapper}>
            <Image
              resizeMode="contain"
              style={styles.currencyLogo}
              source={{uri: currencyWallet.assetUrl || DEFAULT_COIN_LOGO}}
            />
          </View>

          <View style={styles.currencyNameWrapper}>
            <ThemeText style={[ThemeFunctions.textColor(appTheme)]}>
              {quote.currencyName}
            </ThemeText>
            <ThemeText
              style={[
                {
                  color: ThemeFunctions.customText(appTheme),
                  fontSize: 11,
                },
              ]}>
              {currencyWallet.currencyName}
            </ThemeText>
          </View>
        </View>

        <View style={styles.currencyContainerRight}>
          <ThemeText>
            {FormatNumber(quote.total)} {quote.currencyName}
          </ThemeText>
          <ThemeText
            style={[
              {
                color: ThemeFunctions.customText(appTheme),
                fontSize: 11,
              },
            ]}>
            {strings("available")}: {FormatNumber(currencyWallet.balance)}{' '}
            {quote.currencyName}
          </ThemeText>
        </View>
      </TouchableOpacity>
    );
  };

  const renderCheckout = (data: CheckoutData, fundsList: CurrencyWallet[]) => {
    const walletCurrencies = data.quotes.filter(
      quote => quote.currencyType === 'wallet',
    );

    const expiryTs = new Date(data.expiryTime).getTime();
    const nowTs = Date.now();

    const timerMS = expiryTs - nowTs;

    return (
      <>
        <ScrollView
          style={[
            commonStyles.safeView,
            ThemeFunctions.setBackground(appTheme),
          ]}>
          <Header
            title={strings('Checkout')}
            showBack={true}
            right={
              <TouchableOpacity
                onPress={() => getCheckoutDetails()}
                style={
                  isDarkTheme(appTheme)
                    ? commonStyles.backBtnDark
                    : commonStyles.backBtn
                }>
                <Icon
                  type="material-community"
                  name="sync"
                  color={ThemeFunctions.getCurrentTextColor(appTheme)}></Icon>
              </TouchableOpacity>
            }
          />

          <View style={styles.storeDetailContainer}>
            <View style={[styles.storeDetailCheckoutContainer]}>
              <ThemeText
                style={[
                  {color: ThemeFunctions.customText(appTheme), fontSize: 12},
                ]}>
                # {data.checkoutId}
              </ThemeText>
            </View>

            <View style={styles.storeDetailInfoContainer}>
              <Image
                style={styles.storeDetailInfoLogo}
                resizeMode="cover"
                source={{
                  uri: data.store.logo,
                }}
              />

              <View style={styles.storeDetailInfoStoreNameContainer}>
                <ThemeText
                  style={[
                    styles.storeDetailInfoStoreNameText,
                    ThemeFunctions.textColor(appTheme),
                  ]}>
                  {data.store.labelName}
                </ThemeText>
              </View>
            </View>
          </View>

          <View style={styles.payAmountContainer}>
            <ThemeText style={styles.payAmountText}>
              {strings("pay")}: {FormatNumber(data.requestCurrencyAmount)}{' '}
              {data.requestCurrency}
            </ThemeText>
          </View>

          <View style={styles.expiresSection}>
            <View>
              <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
                {strings("expires_in")}
              </ThemeText>
            </View>

            <View style={{paddingLeft: 5}}>
              <ThemeText>
                {data.status === 'pending' ? (
                  <Timer ms={timerMS > 0 ? timerMS : 0} />
                ) : (
                  '-'
                )}
              </ThemeText>
            </View>
          </View>

          <View style={styles.selectContainer}>
            <View style={styles.sectionHeader}>
              <ThemeText
                style={{
                  color: ThemeFunctions.customText(appTheme),
                  fontSize: 15,
                }}>
                {strings("pay_using")}
              </ThemeText>
            </View>

            <TouchableOpacity
              onPress={() => setHideSmallBalance(!hideSmallBalance)}
              style={[styles.hideSmallSection]}>
              <View style={styles.hideSmallSectionLabel}>
                <ThemeText
                  style={{
                    color: ThemeFunctions.customText(appTheme),
                    fontSize: 12,
                  }}>
                  {strings("available")}
                </ThemeText>
              </View>

              <View style={styles.hideSmallSectionSwitch}>
                <Switch
                  value={hideSmallBalance}
                  onValueChange={setHideSmallBalance}
                  color={ThemeFunctions.toggleBg(appColor)}
                />
              </View>
            </TouchableOpacity>

            <ScrollView
              style={[
                styles.selectContainerWrapper,
                {borderColor: ThemeFunctions.getBorderColorCard(appTheme)},
              ]}>
              {walletCurrencies.map(quote => (
                <RenderQuote
                  key={quote.currencyId}
                  quote={quote}
                  fundsList={fundsList}
                />
              ))}

              <Space height={50} />
            </ScrollView>
          </View>
        </ScrollView>

        <View style={ThemeFunctions.setBackground(appTheme)}>
          {renderConfirmButton(data)}
        </View>
      </>
    );
  };

  const makePayment = () => {
    if (!selectedQuote) return;

    setIsSubmitting(true);
    axiosInstancePaymentGateway
      .post('/merchant-dashboard-api-service/wallet-payment/scan-and-pay', {
        checkoutId,
        currencyId: selectedQuote.currencyId,
      })
      .then(resp => {
        showToast('Success', resp.data.message, 'success');
        dispatch(QuickBuyActions.fundsList());
      })
      .catch(e => {
        HandlePaymentGatewayError(e);
      })
      .finally(() => {
        setIsSubmitting(false);
        getCheckoutDetails(false);
      });
  };

  return (
    <>
      {isloading || !checkoutData || !fundsList ? (
        <>
          <View
            style={[
              {flex: 1, justifyContent: 'center', alignItems: 'center'},
              ThemeFunctions.setBackground(appTheme),
            ]}>
            <LoadingSpinner
              color={ThemeFunctions.getColor(appColor)}
              size="large"
            />
          </View>
        </>
      ) : (
        renderCheckout(checkoutData, fundsList)
      )}
    </>
  );
};

export default Checkout;
