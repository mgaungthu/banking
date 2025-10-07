const initialState = {
  isLoading: false,
  error: '',
  details: {
    referrals: 0,
    earning_percentage: 0,
    // totalReferral: 0,
    // commissionRate: 0,
    // currencyName: '',
  },
  referralCode: '',
};

export const referralReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case 'referralLoading': {
      return {
        ...state,
        error: '',
        isLoading: true,
      };
    }
    case 'referralError': {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    case 'referralDetails': {
      return {
        ...state,
        isLoading: false,
        error: '',
        details: {...action.payload},
      };
    }
    case 'referralCode': {
      return {
        ...state,
        isLoading: false,
        error: '',
        referralCode: action.payload.refCode,
      };
    }
    default:
      return state;
  }
};

const initialRedemptionLogsState = {
  isLoading: false,
  error: '',
  redemptionLogs: [],
};

export const referralRedemptionReducer = (
  state: any = initialRedemptionLogsState,
  action: any,
) => {
  switch (action.type) {
    case 'redemptionLoogsLoading': {
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    }
    case 'redemptionLoogsError': {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    case 'redemptionLoogs': {
      return {
        ...state,
        isLoading: false,
        error: '',
        redemptionLogs: [...action.payload],
      };
    }
    default:
      return state;
  }
};
