import {createReducer} from '../../ReducerUtil';
import {
  ADD_BENEFICIARY,
  GET_INTERNAL_PAYMENTS,
  GET_USER_BENEFICIARY,
  CREATE_INTERNAL_PAYMENTS,
  CANCEL_INTERNAL_PAYMENT,
  DOWNLOAD_DEPOSIT_PAYMENT,
  GET_USER_INFORMATION,
  GET_BANKS,
  MAKE_CREDIT_CARD_PAYMENT,
  GET_CREDIT_CARD_PAYMENTS,
  GET_WITHDRAWAL_LISTING,
  GET_DEPOSIT_LISTING,
  CANCEL_DEPOSIT_REQUEST,
  CANCEL_WITHDRAWAL_REQUEST,
  DOWNLOAD_WITHDRAWAL_PAYMENT,
  GET_IBANS_TYPE_DATA,
  GET_IBANS_ACTIVE_DATA,
  GET_IBANS_REQUEST_DATA,
  GET_IBANS_TRANSACTIONS,
  GET_NEW_CARDS_LIST,
  CARD_TYPE_REQUEST_DATA,
  RESET_CARD_TYPE_REQUEST_DATA,
  GET_DELIVERY_LIST,
  GET_ACTIVE_CARD_LIST,
  GET_CARD_REQUESTED_LIST,
  GET_CARD_TRANSACTIONS_LIST,
} from '../../constants/ReduxConstants';

const initialState = {
  beneficiaryList: [],
  internalPaymentList: [],
  userInfo: {},
  banks: [],
  powerCashListing: [],
  depositListing: [],
  withdrawalListing: [],
  IbansType: [],
  IbansActive: [],
  IbansRequest: [],
  IbansTransaction: [],
  cardList: [],
  deliveryList: [],
  cardRequestList: {
    stepone: {},
    steptwo: {},
    stepthree: {},
  },
  activeCardList: [],
  cardRequestedList: [],
  cardTransactinList: [],
  step: 0,
};

export const updateObjectFunction = (state: any, payload: any) => {
  return {
    ...state,
  };
};
export const updateObject = (state: any, payload: any) => {
  return {
    ...state,
    ...payload,
  };
};

export const updateIBANSType = (state: any, payload: any) => {
  return {
    ...state,
    IbansType: [...payload],
  };
};

export const updateIBANSActive = (state: any, payload: any) => {
  return {
    ...state,
    IbansActive: [...payload],
  };
};

export const updateIBANSRequestList = (state: any, payload: any) => {
  return {
    ...state,
    IbansRequest: [...payload],
  };
};

export const updateIBANSTransactionsList = (state: any, payload: any) => {
  return {
    ...state,
    IbansTransaction: [...payload],
  };
};

export const updateNewCardList = (state: any, payload: any) => {
  return {
    ...state,
    cardList: [...payload],
  };
};

export const updateCardRequestList = (state: any, payload: any) => {
  let data = {};
  if (payload.step === 0) {
    data = {stepone: {...payload}};
  } else if (payload.step === 1) {
    data = {steptwo: {...payload}};
  } else {
    data = {stepthree: {...payload}};
  }
  return {
    ...state,
    cardRequestList: {...state.cardRequestList, ...data},
    step: payload.step === state.step ? state.step + 1 : state.step,
  };
};

export const resetToInitial = (state: any) => {
  return {
    ...state,
    cardRequestList: {},
    step: 0,
  };
};

export const updateDeliveryList = (state: any, payload: any) => {
  return {
    ...state,
    deliveryList: [...payload],
  };
};

export const updateActiveCardList = (state: any, payload: any) => {
  return {
    ...state,
    activeCardList: [...payload],
  };
};

export const updateCardRequestedList = (state: any, payload: any) => {
  return {
    ...state,
    cardRequestedList: [...payload],
  };
};

export const updateCardTransactionList = (state: any, payload: any) => {
  return {
    ...state,
    cardTransactinList: [...payload],
  };
};
export default createReducer(initialState, {
  [ADD_BENEFICIARY]: updateObjectFunction,
  [CREATE_INTERNAL_PAYMENTS]: updateObjectFunction,
  [CANCEL_INTERNAL_PAYMENT]: updateObjectFunction,
  [DOWNLOAD_DEPOSIT_PAYMENT]: updateObjectFunction,
  [GET_USER_BENEFICIARY]: updateObject,
  [GET_INTERNAL_PAYMENTS]: updateObject,
  [GET_USER_INFORMATION]: updateObject,
  [GET_BANKS]: updateObject,
  [MAKE_CREDIT_CARD_PAYMENT]: updateObject,
  [GET_CREDIT_CARD_PAYMENTS]: updateObject,
  [GET_DEPOSIT_LISTING]: updateObject,
  [GET_WITHDRAWAL_LISTING]: updateObject,
  [CANCEL_DEPOSIT_REQUEST]: updateObject,
  [CANCEL_WITHDRAWAL_REQUEST]: updateObject,
  [DOWNLOAD_WITHDRAWAL_PAYMENT]: updateObject,
  [GET_IBANS_TYPE_DATA]: updateIBANSType,
  [GET_IBANS_ACTIVE_DATA]: updateIBANSActive,
  [GET_IBANS_REQUEST_DATA]: updateIBANSRequestList,
  [GET_IBANS_TRANSACTIONS]: updateIBANSTransactionsList,
  [GET_NEW_CARDS_LIST]: updateNewCardList,
  [CARD_TYPE_REQUEST_DATA]: updateCardRequestList,
  [GET_DELIVERY_LIST]: updateDeliveryList,
  [RESET_CARD_TYPE_REQUEST_DATA]: resetToInitial,
  [GET_ACTIVE_CARD_LIST]: updateActiveCardList,
  [GET_CARD_REQUESTED_LIST]: updateCardRequestedList,
  [GET_CARD_TRANSACTIONS_LIST]: updateCardTransactionList,
});
