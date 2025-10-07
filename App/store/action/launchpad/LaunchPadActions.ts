import {AppActions} from '../..';
import {MapperConstants, APIConstants} from '../../../constants';
import {Loader} from '../../../enums';
import {makeRequestNew} from '../../../services/ApiService';
import {showToast} from '../../../utils/GenericUtils';
import {
  GET_LAUNCHPAD_LIST,
  GET_LAUNCHPAD_SETTING,
  GET_LAUNCHPAD_HISTORY,
} from '../../constants/ReduxConstants';

export const getLaunchPadList = () => async (dispatch: any) => {
  try {
    dispatch(AppActions.updateLoading(Loader.LAUNCH_PAD));
    const response = await makeRequestNew(
      MapperConstants.ApiTypes.GET,
      APIConstants.LAUNCH_PAD,
    );
    if (response.data.success) {
      dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
      dispatch(getLaunchPadListSuccess(response.data.data));
    }
  } catch (error) {}
};

export const getLaunchPadListSuccess =
  (payload: any) => async (dispatch: any) => {
    dispatch({
      type: GET_LAUNCHPAD_LIST,
      payload,
    });
  };

export const getLaunchPadSetting = () => async (dispatch: any) => {
  try {
    dispatch(AppActions.updateLoading(Loader.LAUNCH_PAD_SETTING));
    const response = await makeRequestNew(
      MapperConstants.ApiTypes.GET,
      APIConstants.LAUNCH_PAD_SETTING,
    );

    if (response.status === 200) {
      dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
      dispatch(getLaunchPadSettingSuccess(response.data));
    }
  } catch (error) {}
};

export const getLaunchPadSettingSuccess =
  (payload: any) => async (dispatch: any) => {
    dispatch({
      type: GET_LAUNCHPAD_SETTING,
      payload,
    });
  };

export const getLaunchPadHistory = () => async (dispatch: any) => {
  try {
    dispatch(AppActions.updateLoading(Loader.LAUNCH_PAD_HISTORY));
    const response = await makeRequestNew(
      MapperConstants.ApiTypes.GET,
      APIConstants.LAUNCH_PAD_HISTORY,
    );
    // console.log(response.data);
    if (response.status === 200) {
      dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
      dispatch(getLaunchPadHistorySuccess(response.data.data));
    }
  } catch (error) {}
};

export const getLaunchPadHistorySuccess =
  (payload: any) => async (dispatch: any) => {
    dispatch({
      type: GET_LAUNCHPAD_HISTORY,
      payload,
    });
  };

export const LaunchPadBuy =
  (payload: any, resetAllValue: any) => async (dispatch: any) => {
    try {
      dispatch(AppActions.updateLoading(Loader.LAUNCH_PAD_BUY));
      const response = await makeRequestNew(
        MapperConstants.ApiTypes.POST,
        APIConstants.LAUNCH_PAD,
        {},
        payload,
      );
      if (response.status === 200) {
        dispatch(
          AppActions.updateLoading(MapperConstants.StatusMapper.disable),
        );
        console.log(response.data);
        dispatch(LaunchPadBuySuccess(response.data));
        resetAllValue();
        showToast('LaunchPad', 'LaunchPad Buy Successfully ', 'success');
      } else {
        dispatch(
          AppActions.updateLoading(MapperConstants.StatusMapper.disable),
        );
        showToast('LaunchPad', 'Something went wrong', 'error');
      }
    } catch (error) {}
  };

export const LaunchPadBuySuccess = (payload: any) => async (dispatch: any) => {
  dispatch(getLaunchPadHistory());
};
