import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Screen} from '../enums';
import {
  KYCProcess,
  VerifyKyc,
  MyAccount,
  Statistics,
  QuickBuyScreen,
  QuickBuySpot,
  Wallets,
  Tickers,
  EditProfile,
  ChangePassword,
  ChooseLanguage,
  Security,
  VerifyPasscode,
  SetupPasscode,
  Theme,
  VerifyModal,
  Gbex,
  Coingate,
  WebViewWrapper,
  CardMercuryo,
  CryptoPayment,
  Payments,
  Beneficiary,
  InternalPayment,
  Deposit,
  Withdrawal,
  CreditCardDeposit,
  GbexHistory,
  MainCurrency,
  SecondCurrency,
  GbexStatus,
  Rewards,
  Dashboard,
  History,
  Limit,
  GlobiancePos,
  QrPay,
  PosConfig,
  Merchant,
  PosHistoryDetail,
  EventApp,
  PosHistoryExport,
  QuickSwap,
  CreditCard,
  CreditCardWebview,
  CreditCardList,
  Trading,
  TradingBuySell,
  WalletDetails,
  DepositAddress,
  WithdrawalAddress,
  Referrals,
  AccountFee,
  GlobianceDeposit,
  GlobianceDepositHistory,
  GlobianceDepositWidget,
} from './index';
import TabNavigator from './TabNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {ThemeFunctions} from '../utils';
import TwoFactorAuthentication from '../screens/account/profile/TwoFactorAuthentication';

import IEOinfo from '../screens/IEO/Info/IEOinfo';
import IEO from '../screens/IEO/Main/IEO';
import IEObuy from '../screens/IEO/Buy/IEObuy';

import IEOSinfo from '../screens/IEOS/Info/IEOinfo';
import IEOS from '../screens/IEOS/Main/IEO';
import IEOSbuy from '../screens/IEOS/Buy/IEObuy';

import UserTransactionDetail from '../screens/funding/UserTransactionDetail';
import ReferralHistory from '../screens/referrals/history/History';
import Staking from '../screens/staking/staking';
import StakingScreen from '../screens/staking/stakingScreen';
import StakingHistory from '../screens/staking/stakingHistory';
import StakingAccount from '../screens/staking/account';
import StakingUnstake from '../screens/staking/account/unstake';
import StakingRedeem from '../screens/staking/account/redeem';
import SetRegion from '../screens/account/SetRegion';
import RaiseTicket from '../screens/support/raiseTicket/raiseTicket';
import PDFViewerScreen from '../components/ui/PDFViewerScreen';
import Newsletter from '../screens/account/Newsletter';

import {AppActions, PaymentActions} from '../store';
import Checkout from '../screens/paymentGateway/Checkout';
import CheckoutHome from '../screens/paymentGateway/CheckoutHome';
import IEOinfoDetail from '../screens/IEO/Info/IEOinfoDetail';
import ProofOfResidence from '../screens/account/POR/ProofOfResidence';
import BusinessKYB from '../screens/account/business/BusinessKYB';
import VerifyStatus from '../screens/account/identityverification/VerifyStatus';
import BusinessCompanyDocuments from '../screens/account/kyb/CompanyDocs/BusinessCompanyDocuments';
import BusinessBasicInfoView from '../screens/account/kyb/BasicInfo/BusinessBasicInfoView';
import LicenseView from '../screens/account/kyb/LicenseInfo/LicenseView';
import ContactDetailView from '../screens/account/kyb/ContactDetail/ContactDetailView';
import ConfirmView from '../screens/account/kyb/Confirmation/ConfirmView';
import StakingForm from '../screens/staking/stakingForm';
import IbansLanding from '../screens/payments/ibans';
import IbanTypeOrder from '../screens/payments/ibans/IbanTypeOrder';
import OrderNActive from '../screens/payments/ibans/OrdersNActive';
import IBANSPayment from '../screens/payments/ibans/payment/IBANSPayment';
import CardsLanding from '../screens/payments/cards';
import StepOneView from '../screens/payments/cards/cardTypOrder/StepOne/StepOneView';
import StepTwoView from '../screens/payments/cards/cardTypOrder/StepTwo/StepTwoView';
import StepThreeView from '../screens/payments/cards/cardTypOrder/StepThree/StepThreeView';
import ActiveCardListLanding from '../screens/payments/cards/OrdersNActive';
import CardPayment from '../screens/payments/cards/payment/CardPayment';
import PayID from '../screens/payments/PayID';

const Stack = createStackNavigator();

const App = () => {
  const {appTheme} = useSelector((state: any) => state.globalReducer);
  const dispatch = useDispatch<any>();

  const options = () => {
    const navigatorOptions = {
      headerShown: false,
      cardStyle: {backgroundColor: ThemeFunctions.setBackgroundColor(appTheme)},
    };
    return navigatorOptions;
  };

  useEffect(() => {
    dispatch(AppActions.announcementList());
    dispatch(AppActions.getCountries());
    dispatch(AppActions.getIndustries());
    dispatch(PaymentActions.getActiveCardList());
  }, []);

  return (
    <>
      <EventApp />
      <Stack.Navigator screenOptions={options()} initialRouteName={Screen.Home}>
        <Stack.Screen name={Screen.Home} component={TabNavigator} />
        <Stack.Screen name={Screen.KycProcess} component={KYCProcess} />
        <Stack.Screen name={Screen.VerifyKyc} component={VerifyKyc} />
        <Stack.Screen name={Screen.MyAccount} component={MyAccount} />
        <Stack.Screen name={Screen.QuickBuyScreen} component={QuickBuyScreen} />
        <Stack.Screen name={Screen.QuickBuySpot} component={QuickBuySpot} />
        <Stack.Screen name={Screen.WalletScreen} component={Wallets} />
        <Stack.Screen name={Screen.TickerScreen} component={Tickers} />
        <Stack.Screen name={Screen.EditProfile} component={EditProfile} />
        <Stack.Screen name={Screen.BusinessScreen} component={BusinessKYB} />
        <Stack.Screen
          name={Screen.IdentityVerificationScreen}
          component={VerifyStatus}
        />

        <Stack.Screen name={Screen.PORScreen} component={ProofOfResidence} />
        <Stack.Screen name={Screen.ChangePassword} component={ChangePassword} />
        <Stack.Screen name={Screen.Statistics} component={Statistics} />
        <Stack.Screen name={Screen.ChooseLanguage} component={ChooseLanguage} />
        <Stack.Screen name={Screen.Security} component={Security} />
        <Stack.Screen
          name={Screen.CurrentPasscode}
          component={VerifyPasscode}
        />
        <Stack.Screen name={Screen.ChangePasscode} component={SetupPasscode} />
        <Stack.Screen name={Screen.Theme} component={Theme} />
        <Stack.Screen name={Screen.VerifyModal} component={VerifyModal} />
        <Stack.Screen name={Screen.Gbex} component={Gbex} />
        <Stack.Screen name={Screen.Coingate} component={Coingate} />
        <Stack.Screen name={Screen.WebViewWrapper} component={WebViewWrapper} />
        <Stack.Screen name={Screen.CardMercuryo} component={CardMercuryo} />
        <Stack.Screen name={Screen.CryptoPayment} component={CryptoPayment} />
        <Stack.Screen name={Screen.Payment} component={Payments} />
        <Stack.Screen name={Screen.Beneficiary} component={Beneficiary} />
        <Stack.Screen name={Screen.IBANS} component={IbansLanding} />
        <Stack.Screen name={Screen.PayID} component={PayID} />
        <Stack.Screen
          name={Screen.IBansTypeFormScreen}
          component={IbanTypeOrder}
        />
        <Stack.Screen
          name={Screen.OrderNActiveScreen}
          component={OrderNActive}
        />
        <Stack.Screen
          name={Screen.IBansPaymentScreen}
          component={IBANSPayment}
        />
        <Stack.Screen
          name={Screen.InternalPayment}
          component={InternalPayment}
        />
        <Stack.Screen
          name={Screen.CardsLandingScreen}
          component={CardsLanding}
        />
        <Stack.Screen
          name={Screen.StepOneCardsTypeOrderScreen}
          component={StepOneView}
        />
        <Stack.Screen
          name={Screen.StepTwoCardsTypeOrderScreen}
          component={StepTwoView}
        />
        <Stack.Screen
          name={Screen.StepThreeCardsTypeOrderScreen}
          component={StepThreeView}
        />
        <Stack.Screen
          name={Screen.ActiveCardListScreen}
          component={ActiveCardListLanding}
        />
        <Stack.Screen name={Screen.Deposit} component={Deposit} />
        <Stack.Screen name={Screen.Withdrawal} component={Withdrawal} />
        <Stack.Screen
          name={Screen.CreditCardDeposit}
          component={CreditCardDeposit}
        />
        <Stack.Screen name={Screen.CardPaymentScreen} component={CardPayment} />
        <Stack.Screen name={Screen.GbexHistory} component={GbexHistory} />
        <Stack.Screen name={Screen.MainCurrency} component={MainCurrency} />
        <Stack.Screen name={Screen.SecondCurrency} component={SecondCurrency} />
        <Stack.Screen name={Screen.GbexStatusScreen} component={GbexStatus} />
        <Stack.Screen name={Screen.Rewards} component={Rewards} />
        <Stack.Screen name={Screen.Dashboard} component={Dashboard} />
        <Stack.Screen name={Screen.RewardHistory} component={History} />
        <Stack.Screen name={Screen.Limit} component={Limit} />
        <Stack.Screen
          name={Screen.TwoFactorAuthentication}
          component={TwoFactorAuthentication}
        />
        <Stack.Screen name={Screen.GlobiancePos} component={GlobiancePos} />
        <Stack.Screen name={Screen.QrPay} component={QrPay} />
        <Stack.Screen name={Screen.Checkout} component={Checkout} />
        <Stack.Screen name={Screen.CheckoutHome} component={CheckoutHome} />
        <Stack.Screen name={Screen.PosConfig} component={PosConfig} />
        <Stack.Screen name={Screen.Merchant} component={Merchant} />
        <Stack.Screen
          name={Screen.PosHistoryDetail}
          component={PosHistoryDetail}
        />
        <Stack.Screen
          name={Screen.PosHistoryExport}
          component={PosHistoryExport}
        />
        <Stack.Screen name={Screen.QuickSwapScreen} component={QuickSwap} />
        <Stack.Screen name={Screen.CreditCard} component={CreditCard} />
        <Stack.Screen
          name={Screen.CreditCardWebview}
          component={CreditCardWebview}
        />
        <Stack.Screen name={Screen.CreditCardList} component={CreditCardList} />
        <Stack.Screen name={Screen.Trading} component={Trading} />
        <Stack.Screen name={Screen.TradingBuySell} component={TradingBuySell} />
        <Stack.Screen name={Screen.WalletDetails} component={WalletDetails} />
        <Stack.Screen name={Screen.DepositAddress} component={DepositAddress} />
        <Stack.Screen
          name={Screen.WithdrawalAddress}
          component={WithdrawalAddress}
        />
        <Stack.Screen name={Screen.Referrals} component={Referrals} />
        <Stack.Screen name={Screen.AccountFee} component={AccountFee} />
        <Stack.Screen name={Screen.IEO} component={IEO} />
        <Stack.Screen name={Screen.IEOinfoDetail} component={IEOinfoDetail} />
        <Stack.Screen name={Screen.IEOinfo} component={IEOinfo} />
        <Stack.Screen name={Screen.IEObuy} component={IEObuy} />
        <Stack.Screen name={Screen.IEOS} component={IEOS} />
        <Stack.Screen name={Screen.IEOSinfo} component={IEOSinfo} />
        <Stack.Screen name={Screen.IEOSbuy} component={IEOSbuy} />
        <Stack.Screen
          name={Screen.UserTransactionDetail}
          component={UserTransactionDetail}
        />
        <Stack.Screen
          name={Screen.ReferralHistory}
          component={ReferralHistory}
        />
        <Stack.Screen name={Screen.Staking} component={Staking} />
        <Stack.Screen name={Screen.StakingFormScreen} component={StakingForm} />
        <Stack.Screen name={Screen.StakingScreen} component={StakingScreen} />
        <Stack.Screen name={Screen.StakingHistory} component={StakingHistory} />
        <Stack.Screen name={Screen.StakingAccount} component={StakingAccount} />
        <Stack.Screen name={Screen.StakingUnstake} component={StakingUnstake} />
        <Stack.Screen name={Screen.StakingRedeem} component={StakingRedeem} />
        <Stack.Screen name={Screen.ChooseRegion} component={SetRegion} />
        <Stack.Screen name={Screen.RaiseTicket} component={RaiseTicket} />
        <Stack.Screen
          name={Screen.PDFViewerScreen}
          component={PDFViewerScreen}
        />
        <Stack.Screen name={Screen.Newsletter} component={Newsletter} />

        <Stack.Screen
          name={Screen.GlobianceDeposit}
          component={GlobianceDeposit}
        />
        <Stack.Screen
          name={Screen.GlobianceDepositHistory}
          component={GlobianceDepositHistory}
        />
        <Stack.Screen
          name={Screen.GlobianceDepositWidget}
          component={GlobianceDepositWidget}
        />
        <Stack.Screen
          name={Screen.BusinessBasicInfoView}
          component={BusinessBasicInfoView}
        />
        <Stack.Screen
          name={Screen.BusinessCompanyDocuments}
          component={BusinessCompanyDocuments}
        />
        <Stack.Screen name={Screen.LicenseInfoView} component={LicenseView} />
        <Stack.Screen
          name={Screen.ContactDetailView}
          component={ContactDetailView}
        />
        <Stack.Screen name={Screen.ConfirmView} component={ConfirmView} />
      </Stack.Navigator>
    </>
  );
};

export default App;
