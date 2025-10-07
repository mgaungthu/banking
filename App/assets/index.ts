import Cross from './icons/cross.svg';
import DropDown from './icons/ic_dropdown.svg';

import {OS} from '../utils';
import {PixelRatio} from 'react-native';
import {PlatformType} from '../enums';

let deviceDensity = PixelRatio.get();
let mdpiLoc = './background/drawable/drawable-mdpi/';
let hdpiLoc = './background/drawable/drawable-hdpi/';
let xhdpiLoc = './background/drawable/drawable-xhdpi/';
let xxhdpiLoc = './background/drawable/drawable-xxhdpi/';
let xxxhdpiLoc = './background/drawable/drawable-xxxhdpi/';
let backgroundLoc = './background/';

const BgLogin =
  OS === PlatformType.Android
    ? deviceDensity === 1
      ? require(mdpiLoc + 'ic_bg.png')
      : deviceDensity === 1.5
      ? require(hdpiLoc + 'ic_bg.png')
      : deviceDensity === 2
      ? require(xhdpiLoc + 'ic_bg.png')
      : deviceDensity === 3
      ? require(xxhdpiLoc + 'ic_bg.png')
      : deviceDensity === 3.5
      ? require(xxxhdpiLoc + 'ic_bg.png')
      : require(backgroundLoc + 'ic_bg.png')
    : require(backgroundLoc + 'ic_bg.png');
const Logo = require('./icons/ic_logo.png');
const IcCheck = require('./icons/ic_tick.png');
export const IcCheckPink = require('./icons/ic_tick_pink.png');
export const LogoPink = require('./icons/ic_logo_pink.png');

const TradingInactive = require('./icons/tabs/ic_trading.png');
const TradingActive = require('./icons/tabs/ic_trading_selected.png');
export const TradingInactiveDark = require('./icons/tabs/ic_trading_dark.png');
export const TradingInactivePink = require('./icons/tabs/ic_trading_pink.png');
export const TradingPinkGray = require('./icons/tabs/ic_trading_pink_inactive.png');
export const TradingWhite = require('./icons/tabs/ic_trading_white.png');

const DerivativesInactive = require('./icons/tabs/ic_derivatives.png');
const DerivativesActive = require('./icons/tabs/ic_derivatives_selected.png');

const FundingInactive = require('./icons/tabs/ic_funding.png');
const FundingActive = require('./icons/tabs/ic_funding_selected.png');
export const FundingInactiveDark = require('./icons/tabs/ic_funding_dark.png');
export const FundingInctivePink = require('./icons/tabs/ic_funding_pink.png');
export const FundingPinkGray = require('./icons/tabs/ic_funding_pink_inactive.png');
export const FundingWhite = require('./icons/tabs/ic_funding_white.png');

const WalletInactive = require('./icons/tabs/ic_wallet.png');
const WalletActive = require('./icons/tabs/ic_wallet_selected.png');
export const WalletInactiveDark = require('./icons/tabs/ic_wallet_dark.png');
export const WalletInctivePink = require('./icons/tabs/ic_wallet_pink.png');
export const WalletPinkGray = require('./icons/tabs/ic_wallet_pink_inactive.png');
export const BankActive = require('./icons/tabs/ic_bank.png');

export const WalletWhite = require('./icons/tabs/ic_wallet_white.png');

const AccountInactive = require('./icons/tabs/ic_account.png');
const AccountActive = require('./icons/tabs/ic_account_selected.png');

export const GbexInactive = require('./icons/tabs/ic_gbex.png');
export const GbexActive = require('./icons/tabs/ic_gbex_selected.png');
export const GbexInactiveDark = require('./icons/tabs/ic_gbex_dark.png');
export const GbexInctivePink = require('./icons/tabs/ic_gbex_pink.png');
export const GbexPinkGray = require('./icons/tabs/ic_gbex_pink_inactive.png');
export const GbexWhite = require('./icons/tabs/ic_gbex_white.png');

export const HomeInactive = require('./icons/tabs/ic_home.png');
export const HomeActive = require('./icons/tabs/ic_home_selected.png');
export const HomeInactiveDark = require('./icons/tabs/ic_home_dark.png');
export const HomeInctivePink = require('./icons/tabs/ic_home_pink.png');
export const HomePinkGray = require('./icons/tabs/ic_home_pink_inactive.png');
// export const HomeWhite = require("./icons/tabs/ic_home_white.png")

export const MoreInactive = require('./icons/tabs/ic_more.png');
export const MoreActive = require('./icons/tabs/ic_more_active.png');
export const MoreInactiveDark = require('./icons/tabs/ic_more_dark.png');
export const MoreInctivePink = require('./icons/tabs/ic_more_pink.png');
export const MorePinkGray = require('./icons/tabs/ic_more_pink_inactive.png');
export const MoreWhite = require('./icons/tabs/ic_more_white.png');

export const IcTicker = require('./icons/account/ic_ticker.png');
export const IcTickerDark = require('./icons/account/ic_ticker_dark.png');
export const IcTickerPink = require('./icons/account/ic_ticker_pink.png');

export const IcAccount = require('./icons/account/ic_account.png');
export const IcBusiness = require('./icons/account/ic_business.png');
export const IcIdentity = require('./icons/account/ic_identity.png');
export const IcResidence = require('./icons/account/ic_passport.png');
export const IcAccountDark = require('./icons/account/ic_account_dark.png');
export const IcAccountPink = require('./icons/account/ic_account_pink.png');

export const IcLock = require('./icons/account/ic_change_password.png');
export const IcLockDark = require('./icons/account/ic_change_password_dark.png');
export const IcLockPink = require('./icons/account/ic_change_password_pink.png');

export const IcEdit = require('./icons/account/ic_edit_profile.png');
export const IcEditDark = require('./icons/account/ic_edit_profile_dark.png');
export const IcEditPink = require('./icons/account/ic_edit_profile_pink.png');

export const IcSecurity = require('./icons/account/ic_security.png');
export const IcSecurityDark = require('./icons/account/ic_security_dark.png');
export const IcSecurityPink = require('./icons/account/ic_security_pink.png');

export const IcForwardArrow = require('./icons/ic_rightarrow.png');
export const IcDocumentVerification = require('./icons/ic_document.png');
export const IcFaceVerification = require('./icons/ic_face_verification.png');
export const IcLicense = require('./icons/ic_dl.png');
export const IcPassport = require('./icons/ic_passport.png');
export const IcNationalCard = require('./icons/ic_national_card.png');
export const IcCamera = require('./icons/ic_camera.png');
export const IcUpload = require('./icons/ic_upload.png');
export const IcLoading = require('./json/loader.json');
export const IcLoading1 = require('./json/loader1.json');
export const IcVerified = require('./icons/ic_verified.png');
export const IcError = require('./icons/ic_error.png');
export const IcSpot = require('./icons/quickbuy/ic_spot.png');
export const IcLimit = require('./icons/quickbuy/ic_limit.png');
export const IcLogout = require('./icons/account/ic_logou.png');
export const IcLogoutDark = require('./icons/account/ic_logou_dark.png');
export const IcLogoutPink = require('./icons/account/ic_logou_pink.png');

export const IcWallet = require('./icons/account/ic_wallet.png');
export const IcWalletDark = require('./icons/account/ic_wallet_dark.png');
export const IcWalletPink = require('./icons/account/ic_wallet_pink.png');

export const IcQuickBuy = require('./icons/account/ic_quickbuy.png');
export const IcQuickBuyDark = require('./icons/account/ic_quickbuy_dark.png');
export const IcQuickBuyPink = require('./icons/account/ic_quickbuy_pink.png');

export const IcStatistics = require('./icons/account/ic_statistics.png');
export const IcStatisticsDark = require('./icons/account/ic_statistics_dark.png');
export const IcStatisticsPink = require('./icons/account/ic_statistics_pink.png');

export const IcReview = require('./icons/account/ic_rating.png');
export const IcReviewDark = require('./icons/account/ic_rating_dark.png');
export const IcReviewPink = require('./icons/account/ic_rating_pink.png');

export const IcWalletImg = require('./icons/ic_wallet.png');
export const IcComingSoon = require('./background/ic_coming_soon.png');
export const IC_BASIC_TICK = require('../assets/icons/ic_basic_tick.png');
export const IcWarning = require('./icons/account/warning.png');
export const IcLanguage = require('./icons/account/ic_language.png');
export const IcLanguageDark = require('./icons/account/ic_language_dark.png');
export const IcLanguagePink = require('./icons/account/ic_language_pink.png');

export const IcTheme = require('./icons/account/theme.png');
export const IcThemeDark = require('./icons/account/theme_dark.png');
export const IcThemePink = require('./icons/account/theme_pink.png');

export const IcGbex = require('./icons/account/ic_gbex.png');
export const IcGbexDark = require('./icons/account/ic_gbex_dark.png');
export const IcGbexPink = require('./icons/account/ic_gbex_pink.png');

export const IcMainCurrency = require('./icons/account/mainCurrency.png');
export const IcMainCurrencyDark = require('./icons/account/mainCurrency_dark.png');
export const IcMainCurrencyPink = require('./icons/account/mainCurrency_pink.png');

export const IcBanking = require('./icons/account/ic_banking.png');
export const IcBankingDark = require('./icons/account/ic_banking_dark.png');
export const IcBankingPink = require('./icons/account/ic_banking_pink.png');

export const IcReward = require('./icons/account/ic_rewards.png');
export const IcRewardDark = require('./icons/account/ic_rewards_dark.png');
export const IcRewardPink = require('./icons/account/ic_rewards_pink.png');

export const IcSecondCurrency = require('./icons/account/ic_secondcurrency.png');
export const IcSecondCurrencyDark = require('./icons/account/ic_dark_secondcurrency.png');
export const IcSecondCurrencyPink = require('./icons/account/ic_pink_secondcurrency.png');

export const IcQr = require('./icons/tabs/ic_qr.png');

export const IcQuickSwapDark = require('./icons/quickswap/icon_quickswap_dark.png');
export const IcQuickSwapLight = require('./icons/quickswap/icon_quickswap_light.png');
export const IcQuickSwapPink = require('./icons/quickswap/icon_quickswap_pink.png');
export const IcQuickSwapGreen = require('./icons/quickswap/icon_quickswap_green.png');

export {
  Cross,
  DropDown,
  BgLogin,
  Logo,
  IcCheck,
  TradingInactive,
  DerivativesInactive,
  FundingInactive,
  WalletInactive,
  AccountActive,
  AccountInactive,
  WalletActive,
  FundingActive,
  DerivativesActive,
  TradingActive,
};

export const currency = {
  IcBchabc: require('./icons/wallet/BCHABC.png'),
  IcBchsv: require('./icons/wallet/BCHSV.png'),
  IcBtc: require('./icons/wallet/BTC.png'),
  IcBtg: require('./icons/wallet/btg.png'),
  IcEth: require('./icons/wallet/ETH.png'),
  IcEur: require('./icons/wallet/EUR.png'),
  IcGbex: require('./icons/wallet/GBEX.png'),
  IcPli: require('./icons/wallet/PLI.png'),
  IcLgcy: require('./icons/wallet/LGCY.png'),
  IcInr: require('./icons/wallet/inr.png'),
  IcIota: require('./icons/wallet/iota.png'),
  IcJpy: require('./icons/wallet/jpy.png'),
  IcNgn: require('./icons/wallet/ngn.png'),
  IcUsd: require('./icons/wallet/usd.png'),
  IcUsdc: require('./icons/wallet/USDC.png'),
  IcUsdt: require('./icons/wallet/USDT.png'),
  IcVnd: require('./icons/wallet/vnd.png'),
  IcXdc: require('./icons/wallet/XDC.png'),
  IcXdce: require('./icons/wallet/XDCE.png'),
  IcXem: require('./icons/wallet/xem.png'),
  IcXmr: require('./icons/wallet/xmr.png'),
  IcXrp: require('./icons/wallet/XRP.png'),
  IcXrp1: require('./icons/wallet/XRP1.png'),
};

export const IcFace = require('./icons/bioauth/faceid.png');
export const IcTouch = require('./icons/bioauth/touchid.png');
export const IcBiometry = require('./icons/bioauth/biometry.png');
export const IcFaceActive = require('./icons/bioauth/faceidActive.png');
export const IcTouchActive = require('./icons/bioauth/touchidActive.png');
export const IcBiometryActive = require('./icons/bioauth/biometryActive.png');
export const Lock = require('./icons/bioauth/lock.png');
export const IcFacePink = require('./icons/bioauth/faceidPink.png');
export const IcTouchPink = require('./icons/bioauth/touchidPink.png');
export const IcBiometryPink = require('./icons/bioauth/biometryPink.png');
export const IcCancel = require('./icons/ic_cancel.png');
export const IcDownload = require('./icons/ic_download.png');
export const IcProfile = require('./icons/tabs/ic_profile.png');
export const IcDemo = require('./demo.png');
export const IcQuickSwap = require('./icons/tabs/ic_quickswap.png');

export const icLogo = require('./icons/ic_splash_logo.png');

export const icLogoPlain = require('./icons/ic_logo_plain.png');

export const icGb = require('./gbex/gb.png');
export const icGbPink = require('./gbex/gb_pink.png');
export const icBurnCount = require('./gbex/icBurncount.png');
export const icGbex1 = require('./gbex/icGbex1.png');
export const icGbex2 = require('./gbex/icGbex2.png');
export const icGbex3 = require('./gbex/icGbex3.png');
export const icHoldercount = require('./gbex/icHoldercount.png');
export const icRewardcount = require('./gbex/icRewardcount.png');
export const icTransfercount = require('./gbex/icTransfercount.png');
export const icRewards = require('./icons/icRewards.png');
export const icReload = require('./icons/reload.png');

export const icGoogleAuthenticator = require('./icons/ic_google_authenticator.png');

// --newUI

//tabbar
export const ic_tab_quick_swap_pd = require('./icons/tabbar/quick_swap_pd.png');
export const ic_tab_quick_swap_pl = require('./icons/tabbar/quick_swap_pl.png');
export const ic_tab_quick_swap_md = require('./icons/tabbar/quick_swap_md.png');
export const ic_tab_quick_swap_bl = require('./icons/tabbar/quick_swap_bl.png');
export const ic_tab_quick_swap_ml = require('./icons/tabbar/quick_swap_ml.png');

export const ic_tab_home_mint = require('./icons/tabbar/home_mint.png');
export const ic_tab_home_black = require('./icons/tabbar/home_black.png');
export const ic_tab_home_pink = require('./icons/tabbar/home_pink.png');
export const ic_tab_home_dark = require('./icons/tabbar/home_dark.png');
export const ic_tab_home_gray = require('./icons/tabbar/home_gray.png');

export const ic_tab_ticker_mint = require('./icons/tabbar/ticker_mint.png');
export const ic_tab_ticker_black = require('./icons/tabbar/ticker_black.png');
export const ic_tab_ticker_pink = require('./icons/tabbar/ticker_pink.png');
export const ic_tab_ticker_dark = require('./icons/tabbar/ticker_dark.png');
export const ic_tab_ticker_gray = require('./icons/tabbar/ticker_gray.png');

export const ic_tab_wallet_mint = require('./icons/tabbar/wallet_mint.png');
export const ic_tab_wallet_black = require('./icons/tabbar/wallet_black.png');
export const ic_tab_wallet_pink = require('./icons/tabbar/wallet_pink.png');
export const ic_tab_wallet_dark = require('./icons/tabbar/wallet_dark.png');
export const ic_tab_wallet_gray = require('./icons/tabbar/wallet_gray.png');

export const ic_tab_more_mint = require('./icons/tabbar/more_mint.png');
export const ic_tab_more_black = require('./icons/tabbar/more_black.png');
export const ic_tab_more_pink = require('./icons/tabbar/more_pink.png');
export const ic_tab_more_dark = require('./icons/tabbar/more_dark.png');
export const ic_tab_more_gray = require('./icons/tabbar/more_gray.png');

//account
export const ic_pos = require('./icons/account/ic_pos.png');
export const ic_qr = require('./icons/account/ic_qr.png');

//bg
export const bg_pink = require('./background/bg_pink.png');
export const bg_dark = require('./background/bg_dark.png');
export const bg_green = require('./background/bg_green.png');

export const wallet_currency_white = require('./icons/wallet/wallet_currency_white.png');
export const wallet_currency_dark = require('./icons/wallet/wallet_currency_dark.png');
export const wallet_send_white = require('./icons/wallet/wallet_send_white.png');
export const wallet_send_dark = require('./icons/wallet/wallet_send_dark.png');

export const wallet_card_pw = require('./icons/wallet/wallet_card_pw.png');
export const wallet_card_pd = require('./icons/wallet/wallet_card_pd.png');
export const wallet_card_gw = require('./icons/wallet/wallet_card_gw.png');
export const wallet_card_gd = require('./icons/wallet/wallet_card_gd.png');
export const wallet_card_d = require('./icons/wallet/wallet_card_d.png');

export const ic_chart_white = require('./icons/ic_chart_white.png');
export const ic_chart_dark = require('./icons/ic_chart_dark.png');

export const ic_beneficiary = require('./icons/wallet/beneficiary.png');
export const ic_credit_card = require('./icons/wallet/credit_card.png');
export const ic_deposit_request = require('./icons/wallet/deposit_request.png');
export const ic_internal_payment = require('./icons/wallet/internal_payment.png');
export const ic_remittance = require('./icons/wallet/remittance.png');

export const logo_pink = require('./icons/logo/logo.png');
export const logo_green = require('./icons/logo/logo_green.png');
export const logo_black = require('./icons/logo/logo_black.png');

export const gb_s_pink = require('./gbex/gb_s_pink.png');
export const gb_s_green = require('./gbex/gb_s_green.png');
export const gb_s_black = require('./gbex/gb_s_black.png');

export const ic_app_green = require('./gbex/ic_app_green.png');
export const ic_app_black = require('./gbex/ic_app_black.png');
export const ic_app_pink = require('./gbex/ic_app_pink.png');

export const gb_pink = require('./gbex/gb_pink.png');
export const gb_black = require('./gbex/gb_black.png');
export const gb_green = require('./gbex/gb_green.png');

export const ic_burn_dark = require('./gbex/ic_burn_dark.png');
export const ic_burn_light = require('./gbex/ic_burn_light.png');
export const ic_holder_dark = require('./gbex/ic_holder_dark.png');
export const ic_holder_light = require('./gbex/ic_holder_light.png');
export const ic_reward_dark = require('./gbex/ic_reward_dark.png');
export const ic_reward_light = require('./gbex/ic_reward_light.png');
export const ic_transfer_dark = require('./gbex/ic_transfer_dark.png');
export const ic_transfer_light = require('./gbex/ic_transfer_light.png');
export const ic_burn_red = require('./gbex/ic_burn_red.png');
export const ic_supply = require('./gbex/ic_supply.png');

export const reward_pink = require('./gbex/reward_pink.png');
export const reward_green = require('./gbex/reward_green.png');
export const reward_black = require('./gbex/reward_black.png');

export const ic_stake_pink = require('./icons/home/ic_stake_pink.png');
export const ic_bank_pink = require('./icons/home/ic_bank_pink.png');
export const ic_reward_pink = require('./icons/home/ic_reward_pink.png');
export const ic_nft_pink = require('./icons/home/ic_nft_pink.png');
export const ic_stake_green = require('./icons/home/ic_stake_green.png');
export const ic_bank_green = require('./icons/home/ic_bank_green.png');
export const ic_reward_green = require('./icons/home/ic_reward_green.png');
export const ic_nft_green = require('./icons/home/ic_nft_green.png');
export const ic_stake_black = require('./icons/home/ic_stake_black.png');
export const ic_bank_black = require('./icons/home/ic_bank_black.png');
export const ic_reward_black = require('./icons/home/ic_reward_black.png');
export const ic_nft_black = require('./icons/home/ic_nft_black.png');
export const ic_qr_green = require('./icons/home/ic_qr_green.png');
export const ic_qr_pink = require('./icons/home/ic_qr_pink.png');
export const ic_qr_black = require('./icons/home/ic_qr_black.png');

export const ic_placeholder_green = require('./icons/home/ic_placeholder_green.png');
export const ic_placeholder_pink = require('./icons/home/ic_placeholder_pink.png');
export const ic_placeholder_black = require('./icons/home/ic_placeholder_black.png');

export const ic_launchpad_green = require('./icons/home/ic_launchpad_green.png');
export const ic_launchpad_black = require('./icons/home/ic_launchpad_black.png');
export const ic_launchpad_pink = require('./icons/home/ic_launchpad_pink.png');

export const ic_referrals = require('./icons/account/ic_referrals.png');

export const ic_trading_black = require('./icons/home/ic_trading_black.png');
export const ic_trading_green = require('./icons/home/ic_trading_green.png');
export const ic_trading_pink = require('./icons/home/ic_trading_pink.png');
export const ic_deposit_black = require('./icons/home/ic_deposit_black.png');
export const ic_deposit_green = require('./icons/home/ic_deposit_green.png');
export const ic_deposit_pink = require('./icons/home/ic_deposit_pink.png');
export const ic_referrals_pink = require('./icons/home/ic_referrals_pink.png');
export const ic_referrals_green = require('./icons/home/ic_referrals_green.png');
export const ic_referrals_black = require('./icons/home/ic_referrals_black.png');

export const banner_gbex_rewards = require('./banners/banner_gbex_rewards.png');

export const ic_box_empty = require('./icons/ic_box_empty.png');

export const ic_more_info_w = require('./icons/ic_more_info_w.png');
export const ic_more_info = require('./icons/ic_more_info.png');

export const ic_fingerprint = require('./icons/ic_fingerprint.png');

export const ic_diamond = require('./icons/ic_diamond.png');

export const ic_account_fee = require('./icons/account/ic_account_fee.png');
export const ic_account_globe = require('./icons/account/ic_account_globe.png');

export const ic_support = require('./icons/account/ic_support.png');
export const ic_newsletter = require('./icons/account/ic_newsletter.png');

export const ic_account_close = require('./icons/account/ic_account_close.png');

export const ic_launchpads_green = require('./icons/home/ic_launchpads_green.png');
export const ic_launchpads_black = require('./icons/home/ic_launchpads_black.png');
export const ic_launchpads_pink = require('./icons/home/ic_launchpads_pink.png');
