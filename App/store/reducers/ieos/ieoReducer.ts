const initState = {
  list: [],
  isLoading: false,
  isError: false,
}

export const ieosReducer = (state : any = initState, action : any) => {
  switch (action.type) {
    case 'se_loading': {
      return {
        list: [],
        isLoading: true,
        isError: false,
      }
    };
    case 'se_successful': {
      return {
        list: [...action?.payload?.data],
        isLoading: false,
        isError: false,
      }
    };
    case 'se_error': {
      return {
        list: [],
        isLoading: false,
        isError: true,
      }
    };
    default: return state;
  }
}

const detailsInitialState = {
  isLoading: false,
  isError: false,
  ticker: {}
}

export const ieosDetailsReducer = (state : any = detailsInitialState, action : any) => {
  switch (action.type) {
    case 'se_loadingD': {
      return {
        ...state,
        isError: false,
        isLoading: true,
      }
    };
    case 'se_errorD': {
      return {
        ...state,
        isError: true,
        isLoading: false,
      }
    };
    case 'se_successfulD': {
      return {
        isLoading: false,
        isError: false,
        ticker: action?.payload
      }
    };
    default: return state;
  }
}

const ratenitialState = {
  isLoading: false,
  isError: false,
  rate: {}
}

export const ieosRateReducer = (state : any = ratenitialState, action : any ) => {
  switch (action.type) {
    case 'se_rateLoading': {
      return {
        ...state,
        isError: false,
        isLoading: true
      }
    };
    case 'se_rateError': {
      return {
        ...state,
        isError: true,
        isLoading: false
      }
    };
    case 'se_rateSuccessful': {
      return {
        isError: false,
        isLoading: false,
        rate: {
          ...action.payload
        }
      }
    };
    default: return state;
  }
}

const historyInitialState = {
  isLoading: false,
  isError: false,
  history: []
}

export const ieosHistoryReducer = (state : any = historyInitialState, action : any) => {
  switch (action.type) {
    case 'se_historyLoading': {
      return {
        ...state,
        isError: false,
        isLoading: true
      }
    };
    case 'se_historyError': {
      return {
        ...state,
        isError: true,
        isLoading: false
      }
    };
    case 'se_historySuccessful': {
      return {
        isError: false,
        isLoading: false,
        history: [...action.payload],
      }
    };
    default: return state;
  }
}