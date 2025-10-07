import { ieoHistoryReducer } from './../reducers/ieo/ieoReducer';
export const ieoSelector = (state : any) => {
  return state.ieoReducer;
}

export const ieoDetailsSelector = (state : any) => {
  return state.ieoDetailsReducer;
}

export const ieoRateSelector = (state : any) => {
  return state.ieoRateReducer;
}

export const ieoHistorySelector = (state: any) => {
  return state.ieoHistoryReducer;
}