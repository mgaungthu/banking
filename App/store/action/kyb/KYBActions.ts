import {KYB_DATA, RESET_INITIAL} from '../../constants/ReduxConstants';

export const KYBFormData = (payload: any) => (dispatch: any) => {
  dispatch({
    type: KYB_DATA,
    payload,
  });
};

export const resetToInitial = () => (dispatch: any) => {
  dispatch({
    type: RESET_INITIAL,
  });
};
