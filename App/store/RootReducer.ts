import {
  referralReducer,
  referralRedemptionReducer,
} from './reducers/referrals/ReferralReducer';

import {
  ieosReducer,
  ieosDetailsReducer,
  ieosRateReducer,
  ieosHistoryReducer,
} from './reducers/ieos/ieoReducer';
import {combineReducers} from 'redux';
import globalReducer from './reducers/global/GlobalReducer';
import authReducer from './reducers/auth/AuthReducer';
import appReducer from './reducers/app/AppReducer';
import quickBuyReducer from './reducers/quickbuy/QuickBuyReducer';
import walletReducer from './reducers/wallets/WalletReducer';
import marketReducer from './reducers/market/MarketReducer';
import launchPadReducer from './reducers/launchpad/LaunchPadReducer';

import tickerReducer from './reducers/tickers/TickerReducer';
import tickersReducer from './reducers/tickers/TickersReducer';
import gbexReducer from './reducers/gbex/GbexReducer';
import paymentReducer from './reducers/payments/PaymentReducer';
import stakingReducer from './reducers/staking/stakingReducer';
import kybReducer from './reducers/kyb/KYBReducer';

const rootReducer = combineReducers({
  globalReducer,
  authReducer,
  appReducer,
  quickBuyReducer,
  walletReducer,

  marketReducer,
  launchPadReducer,

  tickerReducer,
  tickersReducer,
  gbexReducer,
  paymentReducer,

  ieosReducer,
  ieosDetailsReducer,
  ieosRateReducer,
  ieosHistoryReducer,

  referralReducer,
  referralRedemptionReducer,
  stakingReducer,
  kybReducer,
});

export default rootReducer;
