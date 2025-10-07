import {strings} from '../strings';
import * as Images from '../assets';
import {AppColor, AppTheme, FormConstants, Screen} from '../enums';
import {themeColor} from '../theme/Colors';

export const genderArray = ['Male', 'Female'];
export const documentTypes = ['Driving License', 'Passport', 'National Id'];

export const idTypes = [
  {icon: Images.IcNationalCard, value: 'national_id'},
  {icon: Images.IcPassport, value: 'passport'},
  {icon: Images.IcLicense, value: 'driving_license'},
];

export const quickBuySettings = [
  {
    title: 'spot',
    icon: Images.IcSpot,
    route: Screen.QuickBuySpot,
    id: 1,
  },
  // {
  //   title: strings('limit'),
  //   icon: Images.IcLimit,
  //   route: '',
  //   id: 2,
  // },
];

export const languages = [
  {value: 'en', name: 'english'},
  // {value: 'ja', name: 'japanese'},
  // {value: 'ko', name: 'korean'},
  // {value: 'zh', name: 'chinese'},
  // {value: 'es', name: 'spanish'},
  // {value: 'ar', name: 'arabic'},
  // {value: 'ru', name: 'russian'},
  // {value: 'tr', name: 'turkish'},
  // {value: 'fr', name: 'french'},
  // {value: 'it', name: 'italian'},
  // {value: 'de', name: 'german'},
  // {value: 'pt', name: 'portuguese'},
];
export const languageArray = [
  {value: 'en', name: 'English'},
  {value: 'ja', name: '日本語'},
  {value: 'ko', name: '한국인'},
  {value: 'zh', name: '中國人'},
  {value: 'es', name: 'español'},
  {value: 'ar', name: 'عربي'},
  {value: 'ru', name: 'Pусский'},
  {value: 'tr', name: 'Türk'},
  {value: 'fr', name: 'français'},
  {value: 'it', name: 'italiano'},
  {value: 'de', name: 'german'},
  {value: 'pt', name: 'portuguese'},
];

export const accounts = [
  {
    title: 'account',
    id: Math.random(),
    data: [
      {
        title: 'profile',
        icon: Images.IcAccount,
        route: Screen.MyAccount,
        desc: 'desc_profile',
        id: 1,
      },
      // {
      //   title: 'change_password',
      //   icon: Images.IcLock,
      //   route: Screen.ChangePassword,
      //   iconDark: Images.IcLockDark,
      //   iconPink: Images.IcLockPink,
      //   id: 2,
      // },
      {
        title: 'business',
        icon: Images.IcBusiness,
        route: Screen.BusinessScreen,
        desc: 'Verification for your business',
        id: 2,
      },

      {
        title: 'Identity Verification',
        icon: Images.IcIdentity,
        route: Screen.IdentityVerificationScreen,
        desc: 'Update KYC and KYB',
        id: 3,
      },

      {
        title: 'proof_of_residence',
        icon: Images.IcResidence,
        route: Screen.PORScreen,
        desc: 'desc_por',
        id: 4,
      },

      {
        title: 'security',
        icon: Images.IcSecurity,
        route: Screen.Security,
        desc: 'desc_security_1',
        id: 5,
      },
      {
        title: 'language',
        icon: Images.IcLanguage,
        route: Screen.ChooseLanguage,
        desc: 'desc_language',
        id: 6,
      },
      {
        title: 'appearance',
        icon: Images.IcTheme,
        route: Screen.Theme,
        id: 7,
        desc: 'desc_appearance',
      },
      // {
      //   title: 'portfolio_currency',
      //   icon: Images.IcMainCurrency,
      //   route: Screen.MainCurrency,
      //   id: Math.random(),
      //   iconDark: Images.IcMainCurrencyDark,
      //   iconPink: Images.IcMainCurrencyPink,
      //   desc: 'desc_portfolio_currency',
      // },
      // {
      //   title: 'account_fee',
      //   icon: Images.ic_account_fee,
      //   route: Screen.AccountFee,
      //   id: Math.random(),
      //   iconDark: Images.ic_account_fee,
      //   iconPink: Images.ic_account_fee,
      //   desc: 'desc_account_fee',
      // },

      // {
      //   title: 'choose_region',
      //   icon: Images.ic_account_globe,
      //   route: Screen.ChooseRegion,
      //   id: Math.random(),
      //   iconDark: Images.ic_account_globe,
      //   iconPink: Images.ic_account_globe,
      //   desc: 'desc_choose_region',
      // },
      // {
      //   title: 'newsletter',
      //   icon: Images.ic_newsletter,
      //   route: Screen.Newsletter,
      //   id: Math.random(),
      //   iconDark: Images.ic_newsletter,
      //   iconPink: Images.ic_newsletter,
      //   desc: 'desc_newsletter',
      // },
      {
        title: 'close_my_account',
        icon: Images.ic_account_close,
        route: Screen.RaiseTicket,
        param: {defaultSubject: 'Close My Account'},
        id: Math.random(),
        iconDark: Images.ic_account_close,
        iconPink: Images.ic_account_close,
        desc: 'desc_close_my_account',
      },
    ],
  },
  {
    title: 'trade',
    id: Math.random(),
    data: [
      // {
      //   title: 'tickers',
      //   icon: Images.IcTicker,
      //   route: Screen.TickerScreen,
      //   id: Math.random(),
      //   desc: "desc_tickers",
      // },
      {
        title: 'quick_swap',
        icon: Images.IcQuickBuy,
        route: Screen.QuickSwapScreen,
        id: Math.random(),
        desc: 'desc_quickswap_2',
      },

      // {
      //   title: 'limit',
      //   icon: Images.IcTicker,
      //   route: Screen.Limit,
      //   id: Math.random(),
      //   iconDark: Images.IcTickerDark,
      //   iconPink: Images.IcTickerPink,
      // },
    ],
  },
  {
    title: 'wallet',
    id: Math.random(),
    data: [
      {
        title: 'wallet',
        icon: Images.IcWallet,
        route: Screen.WalletScreen,
        id: Math.random(),
        desc: 'desc_wallet',
      },
      {
        title: 'banking',
        icon: Images.IcBanking,
        route: Screen.Payment,
        id: Math.random(),
        desc: 'desc_banking',
      },
      // {
      //   title: 'deposit_credit',
      //   icon: Images.ic_deposit_pink,
      //   route: Screen.CreditCardList,
      //   id: Math.random(),
      //   desc: 'desc_deposit_card',
      // },
    ],
  },
  // {
  //   title: 'payment_services',
  //   id: Math.random(),
  //   data: [
  //     {
  //       title: 'qr_pay',
  //       icon: Images.ic_qr,
  //       route: Screen.CheckoutHome,
  //       id: Math.random(),
  //       desc: 'desc_qr',
  //     },
  //   ],
  // },
  // {
  //   title: 'merchant',
  //   id: Math.random(),
  //   data: [
  //     {
  //       title: 'globiance_pos',
  //       icon: Images.ic_pos,
  //       route: Screen.GlobiancePos,
  //       id: Math.random(),
  //       desc: 'desc_pos',
  //     },
  //   ],
  // },
  {
    title: 'support_title',
    id: Math.random(),
    data: [
      // {
      //   title: 'raise_ticket',
      //   icon: Images.ic_support,
      //   route: Screen.RaiseTicket,
      //   id: Math.random(),
      //   desc: 'desc_raise_ticket',
      // },
      {
        title: 'ratings_n_review',
        icon: Images.IcReview,
        route: 'rate',
        id: Math.random(),
        desc: 'desc_rate_and_review',
      },
    ],
  },
  {
    title: 'gbex_token',
    id: Math.random(),
    data: [
      // {
      //   title: 'gbex',
      //   icon: Images.IcGbex,
      //   route: Screen.GbexStatusScreen,
      //   id: Math.random(),
      //   desc: 'desc_gbex_2',
      // },
      // {
      //   title: 'gbex_history',
      //   icon: Images.IcGbex,
      //   route: Screen.GbexHistory,
      //   id: Math.random(),
      //   desc: "desc_gbex_history"
      // },
      {
        title: 'rewards',
        icon: Images.IcReward,
        route: Screen.Rewards,
        id: Math.random(),
        desc: 'desc_rewards_2',
      },
      {
        title: 'referrals',
        icon: Images.ic_referrals_pink,
        route: Screen.Referrals,
        id: Math.random(),
        desc: 'desc_referrals_2',
      },
      // {
      //   title: 'statistics',
      //   icon: Images.IcStatistics,
      //   route: Screen.Statistics,
      //   id: Math.random(),
      //   desc: "desc_statistics"
      // },

      {
        title: 'logout',
        icon: Images.IcLogout,
        route: 'logout',
        id: Math.random(),
        desc: 'desc_log_out_2',
      },
    ],
  },
];

export const securityOptions = [
  {
    title: 'enable',
    id: 1,
    icon: null,
    route: null,
    desc: 'enable_biometric',
  },
  {
    title: 'two_factor_authentication',
    icon: null,
    route: Screen.TwoFactorAuthentication,
    id: 4,
    desc: 'desc_2fa',
  },
  {
    title: 'change_passcode',
    id: 2,
    icon: null,
    route: Screen.CurrentPasscode,
  },
  // {
  //   title: 'change_password',
  //   icon: null,
  //   route: Screen.ChangePassword,
  //   id: 3,
  // },
];

export const apprearances = [
  {id: 1, title: AppTheme.light, code: themeColor.light},
  {id: 2, title: AppTheme.dark, code: themeColor.dark},
  // {id: 4, title: 'rapunzel', code: themeColor.rapunzel},
];

export const colour = [
  {id: 1, title: AppColor.pink},
  {id: 2, title: AppColor.green},
  {id: 3, title: AppColor.black},
];

export const gbexArray = [
  {id: 1, title: 'crypto_payment', route: Screen.CryptoPayment},
  // {id: 2, title: 'card_payment',  route: Screen.CurrentPasscode},
  {id: 3, title: 'coin_gate', route: Screen.Coingate},
  {id: 4, title: 'card_mercuryo', route: Screen.CardMercuryo},
];

export const paymentOptions = [
  {
    title: 'beneficiary',
    id: 1,
    icon: null,
    route: Screen.Beneficiary,
    image: Images.ic_beneficiary,
  },
  {
    title: 'internal_payments',
    id: 2,
    icon: null,
    route: Screen.InternalPayment,
    image: Images.ic_internal_payment,
  },
  {
    title: 'deposit_request',
    id: 3,
    icon: null,
    route: Screen.Deposit,
    image: Images.ic_deposit_request,
  },
  {
    title: 'Withdraw',
    id: 4,
    icon: null,
    route: Screen.Withdrawal,
    image: Images.ic_remittance,
  },
  {
    title: 'deposit_credit',
    id: 5,
    icon: null,
    route: Screen.CreditCardList,
    image: Images.ic_deposit_request,
  },
  // {
  //   title: 'IBANS',
  //   id: 1,
  //   icon: null,
  //   route: Screen.IBANS,
  //   image: Images.ic_beneficiary,
  // },
  // {
  //   title: 'PayID',
  //   id: 1,
  //   icon: null,
  //   route: Screen.PayID,
  //   image: Images.ic_deposit_request,
  // },
];

export const tickersHeaderArray = ['ALL', 'STAR', 'BTC', 'EURG', 'USDG', 'XDC'];
export const mainCurrency = ['BTC', 'USD', 'EUR'];
export const secondCurrency = ['BTC', 'ETH', 'USD'];

export const rewards = [
  {
    title: 'dashboard',
    id: 1,
    icon: null,
    route: Screen.Dashboard,
  },
  {
    title: 'history',
    id: 2,
    icon: null,
    route: Screen.RewardHistory,
  },
];

export const filterMechantHistoryArray = () => [
  {name: strings('this_day'), value: FormConstants.ThisDay},
  {name: strings('this_month'), value: FormConstants.ThisMonth},
  {name: strings('this_year'), value: FormConstants.ThisYear},
];

export const DEFAULT_REGION = 'eu';
