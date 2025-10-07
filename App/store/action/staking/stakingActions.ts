import {AppActions} from '../..';
import {APIConstants, MapperConstants} from '../../../constants';
import {Loader} from '../../../enums';
import {makeRequestNew} from '../../../services/ApiService';
import {makeGetRequest, makeRequest} from '../../../services/StakingApiService';
import {
  GET_CURRENT_EARNINGS_END,
  GET_CURRENT_EARNINGS_START,
  GET_CURRENT_EARNINGS_SUCCESS,
  GET_CURRENT_STAKED_END,
  GET_CURRENT_STAKED_START,
  GET_CURRENT_STAKED_SUCCESS,
  STAKE_DATA,
  STAKE_HISTROY_DATA,
  UPDATE_STAKE_STATE,
} from '../../constants/ReduxConstants';

export const GetCurrentStaked = () => {
  return dispatch => {
    dispatch({type: GET_CURRENT_STAKED_START});
    makeGetRequest(APIConstants.STAKING_STATS_CURRENT_STAKED)
      .then(resp => {
        if (resp.data) {
          const {
            currentStaked = '0',
            lockedStaking = '0',
            flexibleStaking = '0',
          } = resp.data;

          dispatch({
            payload: {
              currentStaked,
              lockedStaked: lockedStaking,
              flexibleStaked: flexibleStaking,
            },
            type: GET_CURRENT_STAKED_SUCCESS,
          });
        }
      })
      .catch(e => {})
      .finally(() => dispatch({type: GET_CURRENT_STAKED_END}));
  };
};

export const GetCurrentEarnings = () => {
  return dispatch => {
    dispatch({type: GET_CURRENT_EARNINGS_START});
    makeGetRequest(APIConstants.STAKING_STATS_CURRENT_EARNING)
      .then(resp => {
        if (resp.data) {
          const {
            flexibleEarning = '0',
            lockedEarning = '0',
            totalEarning = '0',
          } = resp.data;

          dispatch({
            payload: {totalEarning, flexibleEarning, lockedEarning},
            type: GET_CURRENT_EARNINGS_SUCCESS,
          });
        }
      })
      .catch(e => {})
      .finally(() => dispatch({type: GET_CURRENT_EARNINGS_END}));
  };
};

export const getStakeData = () => async (dispatch: any) => {
  dispatch(AppActions.updateLoading(Loader.STAKE));
  const response = await makeRequestNew(
    MapperConstants.ApiTypes.GET,
    APIConstants.STAKE,
  );

  const responseHistory = await makeRequestNew(
    MapperConstants.ApiTypes.GET,
    APIConstants.STAKE_HISTROY,
  );

  // console.log(responseHistory.data);

  if (response.status === 200) {
    dispatch(stakeSuccess(response.data.data));
    dispatch(stakeHistorySuccess(responseHistory.data.data));
    dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
  }
};

export const stakeSuccess = (payload: any) => (dispatch: any) => {
  dispatch({
    type: STAKE_DATA,
    payload,
  });
};

export const stakeHistorySuccess = (payload: any) => (dispatch: any) => {
  dispatch({
    type: STAKE_HISTROY_DATA,
    payload,
  });
};

export const UpdateStakeState = () => dispatch =>
  dispatch({type: UPDATE_STAKE_STATE});
