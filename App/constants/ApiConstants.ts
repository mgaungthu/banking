export const VERIFY_LOGIN_ACTIVITY = 'user/verifyNewLoginActivity';
export const RESEND_OTP = 'user/resendVerifyLoginToken';

export const GET_KYC_DATA = 'user/get_kyc_data';
export const GET_KYB_DATA = 'user/get_kyb_data';
export const GET_SHUFTI_TOKEN_KYB = 'user/shuftiProKYB';
export const FORGOT_PASSWORD = 'user/forgotpassword';

//NEW
export const LOGIN_USER = '/user/login';
export const LOGOUT_USER = '/user/logout';
export const GC_CHECK = '/user/lcs';
export const GET_USER_PROFILE = '/user';
export const GET_REGIONS = '/regions';
export const GET_WALLETS = '/wallets';
export const GENERATE_ADDRESS = '/deposit/crypto/generate';
export const GET_BOTH_WALLETS = '/both-wallets';
export const GET_COUNTRIES = '/countries';
export const GET_INDUSTRIES = '/industries';
export const GET_MARKETS = '/markets';
export const GET_PAIRS = '/swap/pairs';
export const SWAP_BUY = '/swap';
export const SWAP_BUY_HISTORY = '/orders';
export const VALIDATE_WITHDRAW = '/withdraw/validate/crypto';
export const WITHDRAW_COMPLETE = '/withdraw/crypto';
export const BENEFICIARY = '/user/beneficiaries';
export const GET_BANKS = '/banks/currency';
export const DEPOSIT_FIAT = '/deposit/fiat';
export const DEPOSIT_CRYPTO = '/deposit/crypto/history';
export const INTERNAL_TRANFER = '/internal-transfers';
export const CREATE_REMITTANCE = '/withdraw/fiat';
export const LAUNCH_PAD = '/launchpad';
export const LAUNCH_PAD_SETTING = '/launchpad-page-settings';
export const LAUNCH_PAD_HISTORY = '/launchpad-histories';
export const GET_SUMSUB_TOKEN = '/get-sumsub-token';
export const RESET_KYRC = '/user/reset-kyc';
export const ONE_TIME_PASSWORD = '/email_verify/request';
export const DELETE_ACCOUNT = '/user/deleteaccount';
export const CHANGEG_EMAIL = '/user/changeemail';
export const CONTACT_DETAILS_UPDATE = '/user/updatecontactdetails';
export const BUSINESS_LICENSE_INFORMATION =
  '/user/updatebusinesslicenseinformation';
export const BUSINESS_CONTACT_DETAILS_UPDATE =
  '/user/updatebusinesscontactdetails';
export const FILE_UPLOAD = '/file/upload';
export const POR_DOCUMENTS = '/poriddocuments';
export const VALIDATE_KYB = '/user/validate-kyb-step';
export const KYB_SUBMIT = '/businessiddocuments';
export const STAKE = '/stake/crypto';
export const STAKE_HISTROY = 'stake/histories';
export const IBANS_TYPES = '/ibans/types';
export const IBANS_REQUEST = '/ibans/requests';
export const IBANS_ACTIVE = '/ibans';
export const IBANS_TRANSACTIONS = '/ibans/transactions';
export const IBANS_TRANSFER = '/ibans/transfer';
export const CARDS_LIST = '/cards/types';
export const DELIVERY_LIST = '/cards/delivery-providers';
export const CARDS_TYPE_REQUEST = '/cards/requests';
export const ACTIVE_CARDS = '/cards';
export const TOP_UP_CARDS = '/cards/topup';
export const CARD_TRANSACTIONS = 'cards/transactions';
export const DEPOSIT_PAYID = '/deposit/payid';
//NEW

export const SAVE_KYC_DATA = 'user/save_kyc_data';
export const SAVE_KYB_DATA = 'user/save_kyb_data';
export const ADD_KYB = 'user/add_kyb';

export const GET_SHUFTI_TOKEN = 'user/get_shufti_token';
export const GET_LATEST_PRICE = 'qbt/get-latest-price';

export const GET_WALLET_BALANCE_DETAILS = 'api/wallet/generateaddress';
export const GET_ADDRESS = 'user/get_address';
export const GET_ALL_LATEST_PRICE = 'qbt/get-all-latest-price';

export const GET_PAIR_DETAILS = 'pair_price';
export const QUICK_BUY = 'qbt/qbt-add';
export const QUICK_BUY_HISTORY = 'qbt/trade-history';
export const TRADE_HISTORY = 'trade/all_pair_user_order';
export const WALLET_HISTORY = 'transaction/history';
export const WALLET_HISTORY_BY_CURRENCY = 'transaction/history-by-currency';
export const UPDATE_USER_PROFILE = 'user/update_user';

export const CHANGE_PASSWORD = 'user/change_password';
export const REGISTER_USER = 'user/register';
export const APP_UPDATE = 'user/app-metadata';
export const STATISTICS = 'user/gbex-chart-price';
export const GET_ALL_SECONDARY_PRICE = 'user/ieo/get-rate/gbex';
export const GET_CRYPTO_IEO = 'user/ieo';
export const GET_LIVE_PRICE = 'api/live_price';
export const BUY_GBEX = 'user/ieo/trade';
export const GBEX_HISTORY = 'user/ieo/trade-history';

export const PAY_USING_COINGATE = 'https://pay.coingate.com/pay/GBEX';
export const SUPPORT_URL = 'https://eu.globiance.com/support';
export const PRIVACY_POLICY =
  'https://eu.globiance.com/static/media/EU-Privacy-Policy.6b2db8b6.pdf';
export const PRIVACY_TERMS =
  'https://globiance.com/dl/SV-globiance-terms-and-conditions.pdf';
export const PAY_USING_MERCURYO =
  'https://exchange.mercuryo.io/?widget_id=a851636d-1997-4ed8-b7df-f898fb9bd693&fiat_amount=100&fiat_currency=EUR';

export const GET_USER_REMITTANCE = 'remittance/settlement/getUserRemittance';
export const GET_USER_BENEFICIARY = 'remittance/settlement/getUserBeneficiary';
export const GET_USER_DEPOSIT = 'remittance/depositRequest/getUserDeposit';
// export const GET_BANKS = 'user/bank/getBank';
export const MAKE_DEPOSIT_REQUEST = 'remittance/depositRequest/generateTxId';
export const GET_USER_SETTLEMENTS =
  'internal-settlement/settlement/getUserSettlement';
export const GET_SETTLEMENT_FEE =
  'internal-settlement/settlement/getAllInternalSettlementFee';
export const CANCEL_SETTLEMENT =
  'internal-settlement/settlement/cancelSettlement';
export const CANCEL_DEPOSIT_REQUEST =
  'remittance/depositRequest/cancelDespositRequest';
export const DOWNLOAD_DEPOSIT_REQUEST =
  'remittance/depositRequest/downloadReport';
export const ADD_BENEFICIARY = 'remittance/settlement/addBeneficiary';

export const CREATE_SETTLEMENT =
  'internal-settlement/settlement/createSettlement';
export const GET_USER_INFORMATION = 'user/get_user_information';
export const MAKE_CREDIT_CARD_DEPOSIT = 'user/powercash-deposit/get-hosted-url';
export const CREDIT_CARD_LIST = 'user/powercash-deposit/get-history';
export const GET_CURRENCY_STATUS = 'get_currency_stats';
export const CREATE_DEPOSIT_REQUEST =
  'remittance/depositRequest/createDepositRequest';
export const CANCEL_WITHDRAWAL_REQUEST =
  'remittance/settlement/cancelRemittance';
export const DOWNLOAD_WITHDRAWAL_REQUEST =
  'remittance/settlement/downloadReport';
export const REQUEST_OTP_FOR_WITHDRAWAL = 'user/generate_withdrawal_otp';
export const REQUEST_WITHDRAWAL = 'user/withdraw_request';
export const GET_ASSETMETADATA = 'api/assetMetadata';
export const GET_ASSET_URL = 'https://api.globiance.com/api/assets/wallet/';
export const GET_ANNOUNCEMENT_URL =
  'https://api.globiance.com/assets/announcement/';
export const GET_ANNOUNCEMENTS = '/announcements';
// export const GET_PAIRS = 'user/get_all_quick_buy_pair';
export const GET_GBEX_STATUS = 'api/gbex_stats';
export const GET_GBEX_REWARDS = 'user/passive-rewards/get-user-rewards';
export const REDEEM_REWARDS = 'user/passive-rewards/redeem-rewards';
export const GET_DRIP_LOGS = 'user/passive-rewards/get-user-history';
export const GET_REWARDS_HISTORY =
  'user/passive-rewards/get-user-redeem-history';

export const TWO_FA_VERIFY = '/twofa/verify';
export const GENERATE_EMAIL_OTP_FOR_TFA = '/twofa/setup/ga';
export const VERIFY_EMAIL_OTP_FOR_TFA = '/twofa/setupcomplete';
export const CANCEL_TFA = '/twofa/cancel';
export const TFA = 'user/tfa';

export const GET_LASTEST_MERCHANT_REQUEST = 'api/merchant/get-last-request';
export const CREATE_MERCHANT_REQUEST = 'api/merchant/create-merchant-request';

export const QR_PAYMENT = 'user/qr_payment';
export const SAVE_PAYMENT_CONFIG = 'user/qr_payment/payment_config';
export const GET_CONFIG_PAYMENT = 'user/qr_payment/config';
export const GET_HISTORY_PAYMENT_MERCHANT = '/user/qr_payment/merchant_history';
export const GET_HISTORY_PAYMENT_PAY = '/user/qr_payment/pay_history';
export const GET_HISTORY_PAYMENT_DETAILS = '/user/qr_payment/payment_details';
export const ADD_DATA_PAYMENT = '/user/data_payment_pos';
export const GET_DATA_PAYMENT = '/user/get_data_payment_pos';
export const EXPORT_HISTORY = '/user/pay_history_pdf';

export const ADD_DEVICE_FCM = '/user/add_device';
export const DELETE_DEVICE_FCM = '/user/delete_device';

export const CLOSE_USER_MOBILE_SESSION = '/user/close_user_mobile_session';

export const LIST_STABLE_COIN = 'list_stable_coin';
export const NEW_ORDER_SWAP_PAIR = 'trade/new_order_swap_pair';

export const CARD_INTEGRATION_STATUS = 'cardintegrationstatus';

export const UPDATE_PREFERREDFEE = 'user/update_preferredFee';

export const GET_ALL_PAIR_USER_ORDER = 'trade/all_pair_user_order';
export const NEW_ORDER = 'trade/new_order';
export const OPEN_ORDER = 'trade/open_order';
export const CANCEL_ORDER = 'trade/cancel_order';

export const MIN_DEPOSIT_URL =
  'https://api.globiance.com/transaction/transaction_amount';

export const STAKING_STATS_CURRENT_EARNING = 'pool/statistical-current-earning';
export const STAKING_STATS_CURRENT_STAKED = 'pool/statistical-current-staked';
export const STAKING_STATS_AVAL_BAL = 'pool/statistical-available-balance';
export const STAKING_STATS_TOT_STAKED = 'pool/statistical-stake-on-globiance';
export const STAKING_STATS_TOT_REWARDS = 'pool/statistical-distribute-reward';
export const STAKING_POOL_LOCKED = 'pool/locked';
export const STAKING_POOL_FLEXIBLE = 'pool/flexible';
export const STAKING_POOL_DETAILS = 'pool/details';
export const STAKING_POOL_STAKE = 'pool/stake';
export const STAKING_HISTORY_LOCKED = 'pool/history/locked';
export const STAKING_HISTORY_FLEXIBLE = 'pool/history/flexible';
export const STAKING_ACCOUNT_LOCKED = 'pool/account/locked';
export const STAKING_ACCOUNT_FLEXIBLE = 'pool/account/flexible';
export const STAKING_ACCOUNT_UNSTAKE = 'pool/un-stake';
export const STAKING_ACCOUNT_REDEEM_DRIP = 'pool/redeemdrip-reward';
export const STAKING_ACCOUNT_REDEEM = 'pool/redeem-reward';

export const GET_ALL_REGION = 'user/get_all_region';

export const RAISE_TICKET = 'common/contact';

export const STAKING_TERMS =
  'https://exchange.globiance.com/static/media/BVI-T&C.44973eba.pdf';

export const UPDATE_NEWSLETTER_SUBSCRIPTION = 'user/update_subscription';

export const APPROVE_REGION = 'user/approved-region';

export const GLOBIANCE_WIDGET_REQUEST = 'user/globiancepay/request';
export const GLOBIANCE_WIDGET_TXN = 'user/globiancepay/transactions';
