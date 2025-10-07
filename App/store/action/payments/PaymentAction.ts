import {MapperConstants, APIConstants} from '../../../constants';
import {Loader} from '../../../enums';
import {
  makeGetRequest,
  makeRequest,
  makeDownloadRequest,
  makeRequestNew,
} from '../../../services/ApiService';
import {showToast} from '../../../utils/GenericUtils';
import {
  ADD_BENEFICIARY,
  GET_USER_BENEFICIARY,
  GET_INTERNAL_PAYMENTS,
  CREATE_INTERNAL_PAYMENTS,
  CANCEL_INTERNAL_PAYMENT,
  DOWNLOAD_DEPOSIT_PAYMENT,
  GET_USER_INFORMATION,
  GET_BANKS,
  MAKE_CREDIT_CARD_PAYMENT,
  GET_CREDIT_CARD_PAYMENTS,
  GET_WITHDRAWAL_LISTING,
  GET_DEPOSIT_LISTING,
  CREATE_WITHDRAWAL_REQUEST,
  CREATE_DEPOSIT_REQUEST,
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
import {strings} from '../../../strings';
import {AppActions, QuickBuyActions} from '../..';
import {Linking} from 'react-native';

export const addBeneficiarySuccess =
  (payload: any) => async (dispatch: any) => {
    dispatch({
      type: ADD_BENEFICIARY,
      payload,
    });
  };

export const addBeneficiary =
  (payload: any, resetToIntialValues: any) => async (dispatch: any) => {
    dispatch(AppActions.updateLoading(Loader.ADDING_BENEFICIARY));

    const BeneficiaryDetails = {
      address: payload.address,
      bank_address: payload.bank_address,
      bank_branch_code: payload.beneficiaryBankBranch,
      bank_code: payload.beneficiaryAddress,
      bank_name: payload.bank_name,
      currency_id: payload.curId,
      iban: payload.ibn_account,
      id: '',
      name: payload.beneficiaryName,
      otp: payload.otp,
      swift: payload.swift_bic_code,
    };

    const response = await makeRequestNew(
      MapperConstants.ApiTypes.POST,
      APIConstants.BENEFICIARY,
      {},
      BeneficiaryDetails,
    );

    dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
    if (response.status === 200) {
      dispatch(beneficiaryList());
      dispatch(addBeneficiarySuccess(BeneficiaryDetails));
      resetToIntialValues();
      showToast(
        strings('beneficiary'),
        'Beneficiary Added Successfully',
        'success',
      );
    } else {
      showToast(strings('beneficiary'), response.message, 'error');
    }
  };

export const beneficiarySuccess = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: GET_USER_BENEFICIARY,
    payload,
  });
};

export const beneficiaryList = () => async (dispatch: any) => {
  dispatch(AppActions.updateLoading(Loader.GET_BENEFICIARY_LIST));
  const response = await makeRequestNew(
    MapperConstants.ApiTypes.GET,
    APIConstants.BENEFICIARY,
    {},
  );

  dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
  if (response.status === 200) {
    dispatch(beneficiarySuccess({beneficiaryList: response.data.data}));
  }
};

export const createInternalPaymentSuccess =
  (payload: any) => async (dispatch: any) => {
    dispatch({
      type: CREATE_INTERNAL_PAYMENTS,
      payload,
    });
  };

export const createInternalPayment =
  (payload: any, resetToIntialValues: any) => async (dispatch: any) => {
    dispatch(AppActions.updateLoading(Loader.CREATE_INTERNAL_PAYMENT));
    const response = await makeRequest(
      MapperConstants.ApiTypes.POST,
      APIConstants.INTERNAL_TRANFER,
      {},
      payload,
    );
    console.log(response.data);
    dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
    if (response.status === 200) {
      await dispatch(QuickBuyActions.fundsList());
      dispatch(internalPaymentList());
      dispatch(createInternalPaymentSuccess(response.data.data));
      resetToIntialValues();
      showToast(
        strings('internal_payments'),
        'Internal Payment Successfully',
        'success',
      );
    } else if (
      response.data?.error?.message === 'kyc_and_por_required_general'
    ) {
      showToast(strings('internal_payments'), strings('kyc_msg'), 'error');
    } else if (response.data.message === 'two_fa_incorrect_code') {
      showToast(
        strings('internal_payments'),
        'Your two factour authenication code is incorrect.',
        'error',
      );
    } else {
      showToast(strings('internal_payments'), 'Something went wrong', 'error');
    }
  };

export const internalPaymentListSuccess =
  (payload: any) => async (dispatch: any) => {
    dispatch({
      type: GET_INTERNAL_PAYMENTS,
      payload,
    });
  };

export const internalPaymentList = () => async (dispatch: any) => {
  dispatch(AppActions.updateLoading(Loader.GET_INTERNAL_PAYMENTS));
  const response = await makeRequestNew(
    MapperConstants.ApiTypes.GET,
    `${APIConstants.INTERNAL_TRANFER}`,
  );

  console.log(response.data);

  dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
  if (response.status === 200) {
    dispatch(
      internalPaymentListSuccess({internalPaymentList: response.data.data}),
    );
  }
};

export const cancelInternalPaymentSuccess =
  (payload: any) => async (dispatch: any) => {
    dispatch({
      type: CANCEL_INTERNAL_PAYMENT,
      payload,
    });
  };

export const cancelInternalPayment =
  (payload: any) => async (dispatch: any) => {
    dispatch(AppActions.updateLoading(Loader.CANCEL_INTERNAL_PAYMENT));
    const response = await makeRequest(
      MapperConstants.ApiTypes.POST,
      APIConstants.CANCEL_SETTLEMENT,
      {},
      payload,
    );
    dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
    if (response.status === 200) {
      dispatch(internalPaymentList());
      dispatch(cancelInternalPaymentSuccess(response.data));
      showToast(strings('internal_payments'), response.message, 'success');
    } else {
      showToast(strings('internal_payments'), response.message, 'error');
    }
  };

export const downloadDepositPaymentSuccess =
  (payload: any) => async (dispatch: any) => {
    dispatch({
      type: DOWNLOAD_DEPOSIT_PAYMENT,
      payload,
    });
  };

export const downloadDepositPayment =
  (payload: any) => async (dispatch: any) => {
    dispatch(AppActions.updateLoading(Loader.DOWNLOAD_DEPOSIT_PAYMENT));
    const response = await makeDownloadRequest(
      MapperConstants.ApiTypes.POST,
      APIConstants.DOWNLOAD_DEPOSIT_REQUEST,
      {},
      payload,
    );
    dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
    if (response.status === 200) {
      dispatch(downloadDepositPaymentSuccess(response.data));
      showToast(strings('deposit_request'), response.message, 'success');
    } else {
      showToast(strings('deposit_request'), response.message, 'error');
    }
  };

export const getTransferId = async (id: any) => {
  const response = await makeRequest(
    MapperConstants.ApiTypes.POST,
    APIConstants.MAKE_DEPOSIT_REQUEST,
    {},
    {clientId: id},
  );
  return response;
};

export const getUserInfoSuccess = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: GET_USER_INFORMATION,
    payload,
  });
};

export const getUserInfo = () => async (dispatch: any) => {
  dispatch(AppActions.updateLoading(Loader.GET_USER_INFO));
  const response = await makeGetRequest(APIConstants.GET_USER_INFORMATION, {});

  dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
  if (response.status === 200) {
    const data: any = response?.data;
    dispatch(getUserInfoSuccess({userInfo: data?.data}));
  }
};

export const getBanksSuccess = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: GET_BANKS,
    payload,
  });
};

export const getBankListing = () => async (dispatch: any) => {
  const response = await makeRequest(
    MapperConstants.ApiTypes.POST,
    APIConstants.GET_BANKS,
    {},
    {},
  );
  if (response.status === 200) {
    const data: any = response?.data;
    dispatch(getBanksSuccess({banks: data}));
  }
};

export const creditCardPaymentSuccess =
  (payload: any) => async (dispatch: any) => {
    dispatch({
      type: MAKE_CREDIT_CARD_PAYMENT,
      payload,
    });
  };

export const creditCardPayment =
  (payload: any, resetToIntialValues: any) => async (dispatch: any) => {
    dispatch(AppActions.updateLoading(Loader.MAKE_CREDIT_CARD_PAYMENT));
    const response = await makeRequest(
      MapperConstants.ApiTypes.POST,
      APIConstants.MAKE_CREDIT_CARD_DEPOSIT,
      {},
      payload,
    );
    dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
    if (response.status === 200) {
      const data: any = response?.data;
      Linking.openURL(data.url);
      dispatch(creditCardPaymentSuccess(response.data));
      resetToIntialValues();
    } else {
      showToast(strings('credit_card_deposit'), response.message, 'error');
    }
  };

export const creditCardPaymentListSuccess =
  (payload: any) => async (dispatch: any) => {
    dispatch({
      type: GET_CREDIT_CARD_PAYMENTS,
      payload,
    });
  };

export const creditCardPaymentList = () => async (dispatch: any) => {
  dispatch(AppActions.updateLoading(Loader.CREDIT_CARD_LIST));
  const response = await makeGetRequest(APIConstants.CREDIT_CARD_LIST, {});
  dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
  if (response.status === 200) {
    const data: any = response.data;
    dispatch(creditCardPaymentListSuccess({powerCashListing: data.data}));
  }
};

export const depositListSuccess = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: GET_DEPOSIT_LISTING,
    payload,
  });
};

export const depositList = () => async (dispatch: any) => {
  dispatch(AppActions.updateLoading(Loader.GET_DEPOSIT_LISTING));
  const response = await makeRequestNew(
    MapperConstants.ApiTypes.GET,
    APIConstants.DEPOSIT_FIAT,
  );

  dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
  if (response.status === 200 && response.data) {
    const receivedData: any = response.data;
    dispatch(depositListSuccess({depositListing: receivedData.data}));
  }
};

export const withdrawalListSuccess =
  (payload: any) => async (dispatch: any) => {
    dispatch({
      type: GET_WITHDRAWAL_LISTING,
      payload,
    });
  };

export const createDepositRequestSuccess =
  (payload: any) => async (dispatch: any) => {
    dispatch({
      type: CREATE_DEPOSIT_REQUEST,
      payload,
    });
  };

export const createDepositRequest =
  (payload: any, resetToIntialValues: any) => async (dispatch: any) => {
    dispatch(AppActions.updateLoading(Loader.CREATE_DEPOSIT_REQUEST));
    const response = await makeRequestNew(
      MapperConstants.ApiTypes.POST,
      APIConstants.DEPOSIT_FIAT,
      {},
      payload,
    );

    dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
    if (response.status === 200) {
      showToast(
        strings('deposit_request'),
        'Deposit Requested Successfully',
        'success',
      );
      await dispatch(depositList());
      dispatch(createDepositRequestSuccess(response.data));
      resetToIntialValues();
    } else {
      showToast(strings('deposit_request'), 'Something went wrong', 'error');
    }
  };

export const createWithdrawalRequestSuccess =
  (payload: any) => async (dispatch: any) => {
    dispatch({
      type: CREATE_WITHDRAWAL_REQUEST,
      payload,
    });
  };

export const createWithdrawalRequest =
  (payload: any, resetToIntialValues: any) => async (dispatch: any) => {
    dispatch(AppActions.updateLoading(Loader.CREATE_WITHDRAWAL_REQUEST));
    const response = await makeRequestNew(
      MapperConstants.ApiTypes.POST,
      APIConstants.CREATE_REMITTANCE,
      {},
      payload,
    );
    dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));

    if (response.status === 200) {
      await dispatch(withdrawalList());
      dispatch(createWithdrawalRequestSuccess(response.data));
      resetToIntialValues();
      showToast(strings('remittance'), 'Withdraw Successfully', 'success');
    } else {
      showToast(strings('remittance'), 'Something went wrong', 'error');
    }
  };

export const cancelDepositRequestSuccess =
  (payload: any) => async (dispatch: any) => {
    dispatch({
      type: CANCEL_DEPOSIT_REQUEST,
      payload,
    });
  };

export const withdrawalList = () => async (dispatch: any) => {
  dispatch(AppActions.updateLoading(Loader.WITHDRAWAL_LISTING));
  const response = await makeRequestNew(
    MapperConstants.ApiTypes.GET,
    APIConstants.CREATE_REMITTANCE,
  );

  dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
  if (response.status === 200 && response.data.data) {
    const receivedData: any = response.data.data;
    dispatch(withdrawalListSuccess({withdrawalListing: receivedData}));
  }
};

export const cancelDepositRequest = (payload: any) => async (dispatch: any) => {
  dispatch(AppActions.updateLoading(Loader.CANCEL_DEPOSIT_REQUEST));
  const response = await makeRequest(
    MapperConstants.ApiTypes.POST,
    APIConstants.CANCEL_DEPOSIT_REQUEST,
    {},
    payload,
  );
  dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
  if (response.status === 200) {
    dispatch(depositList());
    dispatch(cancelDepositRequestSuccess(response.data));
    showToast(strings('deposit_request'), response.message, 'success');
  } else {
    showToast(strings('deposit_request'), response.message, 'error');
  }
};

export const cancelWithdrawalRequestSuccess =
  (payload: any) => async (dispatch: any) => {
    dispatch({
      type: CANCEL_WITHDRAWAL_REQUEST,
      payload,
    });
  };

export const cancelWithdrawalRequest =
  (payload: any) => async (dispatch: any) => {
    dispatch(AppActions.updateLoading(Loader.CANCEL_WITHDRAWAL_REQUEST));
    const response = await makeRequest(
      MapperConstants.ApiTypes.POST,
      APIConstants.CANCEL_WITHDRAWAL_REQUEST,
      {},
      payload,
    );
    dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
    if (response.status === 200) {
      dispatch(withdrawalList());
      dispatch(cancelWithdrawalRequestSuccess(response.data));
      showToast(strings('remittance'), response.message, 'success');
    } else {
      showToast(strings('remittance'), response.message, 'error');
    }
  };

export const downloadWithdrawalSuccess =
  (payload: any) => async (dispatch: any) => {
    dispatch({
      type: DOWNLOAD_WITHDRAWAL_PAYMENT,
      payload,
    });
  };

export const downloadWithdrawal = (payload: any) => async (dispatch: any) => {
  dispatch(AppActions.updateLoading(Loader.DOWNLOAD_WITHDRAWAL_REQUEST));
  const response = await makeDownloadRequest(
    MapperConstants.ApiTypes.POST,
    APIConstants.DOWNLOAD_WITHDRAWAL_REQUEST,
    {},
    payload,
  );
  dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
  if (response.status === 200) {
    dispatch(downloadWithdrawalSuccess(response.data));
    showToast(strings('remittance'), response.message, 'success');
  } else {
    showToast(strings('remittance'), response.message, 'error');
  }
};

export const getIBANSList = () => async (dispatch: any) => {
  dispatch(AppActions.updateLoading(Loader.IBANS_TYPES));

  const response = await makeRequestNew(
    MapperConstants.ApiTypes.GET,
    APIConstants.IBANS_TYPES,
  );

  dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
  if (response.status === 200) {
    dispatch(getIBANSLISTSuccess(response.data.data));
  }
};

export const getIBANSLISTSuccess = (payload: any) => async (dispatch: any) => {
  dispatch({
    type: GET_IBANS_TYPE_DATA,
    payload,
  });
};

export const getIBANSActiveList = () => async (dispatch: any) => {
  dispatch(AppActions.updateLoading(Loader.IBANS_TYPES));

  const response = await makeRequestNew(
    MapperConstants.ApiTypes.GET,
    APIConstants.IBANS_ACTIVE,
  );

  dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
  if (response.status === 200) {
    dispatch(getIBANSActiveListSuccess(response.data.data));
  }
};

export const getIBANSActiveListSuccess =
  (payload: any) => async (dispatch: any) => {
    dispatch({
      type: GET_IBANS_ACTIVE_DATA,
      payload,
    });
  };

export const getIBANSRequest = () => async (dispatch: any) => {
  dispatch(AppActions.updateLoading(Loader.IBANS_REQUEST));

  const response = await makeRequestNew(
    MapperConstants.ApiTypes.GET,
    APIConstants.IBANS_REQUEST,
  );

  dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
  if (response.status === 200) {
    dispatch(getIBANSRequestSuccess(response.data.data));
  }
};

export const getIBANSRequestSuccess =
  (payload: any) => async (dispatch: any) => {
    dispatch({
      type: GET_IBANS_REQUEST_DATA,
      payload,
    });
  };

export const getIBANSTransactions = () => async (dispatch: any) => {
  dispatch(AppActions.updateLoading(Loader.IBANS_TRANSACTIONS));
  const response = await makeRequestNew(
    MapperConstants.ApiTypes.GET,
    APIConstants.IBANS_TRANSACTIONS,
  );
  dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
  if (response.status === 200) {
    dispatch(getIBANSTransactionsSuccess(response.data.data));
  }
};

export const getIBANSTransactionsSuccess =
  (payload: any) => async (dispatch: any) => {
    dispatch({
      type: GET_IBANS_TRANSACTIONS,
      payload,
    });
  };

export const getNewCardsList = () => async (dispatch: any) => {
  dispatch(AppActions.updateLoading(Loader.CARDS_TYPES));
  const response = await makeRequestNew(
    MapperConstants.ApiTypes.GET,
    APIConstants.CARDS_LIST,
  );

  // console.log(response.data.data);

  if (response.status === 200) {
    dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
    dispatch(getNewCardsListSuccess(response.data.data));
  }
};

export const getNewCardsListSuccess =
  (payload: any) => async (dispatch: any) => {
    dispatch({
      type: GET_NEW_CARDS_LIST,
      payload,
    });
  };

export const cardTypeRequestData = (payload: any) => (dispatch: any) => {
  dispatch({
    type: CARD_TYPE_REQUEST_DATA,
    payload,
  });
};

export const resetToInitial = () => (dispatch: any) => {
  dispatch({
    type: RESET_CARD_TYPE_REQUEST_DATA,
  });
};

export const getDeliveryList = () => async (dispatch: any) => {
  const response = await makeRequestNew(
    MapperConstants.ApiTypes.GET,
    APIConstants.DELIVERY_LIST,
  );

  if (response.status === 200) {
    dispatch(getDeliveryListSuccess(response.data.data));
  }
};

export const getDeliveryListSuccess =
  (payload: any) => async (dispatch: any) => {
    dispatch({
      type: GET_DELIVERY_LIST,
      payload,
    });
  };

export const getActiveCardList = () => async (dispatch: any) => {
  dispatch(AppActions.updateLoading(Loader.ACTIVE_CARD));
  const response = await makeRequestNew(
    MapperConstants.ApiTypes.GET,
    APIConstants.ACTIVE_CARDS,
  );

  dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
  if (response.status === 200) {
    dispatch(getActiveCardListSuccess(response.data.data));
  }
};

export const getActiveCardListSuccess =
  (payload: any) => async (dispatch: any) => {
    dispatch({
      type: GET_ACTIVE_CARD_LIST,
      payload,
    });
  };

export const getCardRequestedList = () => async (dispatch: any) => {
  const response = await makeRequestNew(
    MapperConstants.ApiTypes.GET,
    APIConstants.CARDS_TYPE_REQUEST,
  );

  if (response.status === 200) {
    dispatch(getCardRequestedListSuccess(response.data.data));
  }
};

export const getCardRequestedListSuccess =
  (payload: any) => async (dispatch: any) => {
    dispatch({
      type: GET_CARD_REQUESTED_LIST,
      payload,
    });
  };

export const getCardtransactionList = () => async (dispatch: any) => {
  dispatch(AppActions.updateLoading(Loader.CARDS_REQUEST));
  const response = await makeRequestNew(
    MapperConstants.ApiTypes.GET,
    APIConstants.CARD_TRANSACTIONS,
  );

  dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
  if (response.status === 200) {
    dispatch(getCardtransactionListSuccess(response.data.data));
  }
};

export const getCardtransactionListSuccess =
  (payload: any) => async (dispatch: any) => {
    dispatch({
      type: GET_CARD_TRANSACTIONS_LIST,
      payload,
    });
  };
