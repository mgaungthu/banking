import {makeRequest, makeRequestNew} from '../../../services/ApiService';

export const getReferralDetails = () => {
  return async (dispatch: any) => {
    dispatch({type: 'referralLoading'});
    makeRequestNew('GET', '/refcode', {'Content-Type': 'application/json'})
      .then((res: any) => {
        const refCode = res.data;
        dispatch({
          type: 'referralCode',
          payload: {
            refCode,
          },
        });
      })
      .catch(err => {
        dispatch({type: 'referralError', payload: err});
      });
    makeRequestNew('GET', '/referrals', {'Content-Type': 'application/json'})
      .then((res: any) => {
        const {referrals, earning_percentage} = res.data;
        dispatch({
          type: 'referralDetails',
          payload: {
            referrals,
            earning_percentage,
          },
        });
      })
      .catch(err => {
        dispatch({type: 'referralError', payload: err});
      });
  };
};

export const getReferralRedemptionLogs = () => {
  return async (dispatch: any) => {
    dispatch({type: 'redemptionLoogsLoading'});
    makeRequest(
      'GET',
      'https://api.globiance.com/user/get_referral_redemption_logs',
      {'Content-Type': 'application/json'},
    )
      .then((res: any) => {
        dispatch({type: 'redemptionLoogs', payload: res.data});
      })
      .catch(err => {
        dispatch({type: 'redemptionLoogsError', payload: err});
      });
  };
};
