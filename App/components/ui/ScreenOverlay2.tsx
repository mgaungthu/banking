import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {View, Text} from 'react-native';
import {screenOverlayStyles} from './styles';

import {ImageContainer, LoadingSpinner, ThemeText} from '..';
import {ThemeFunctions} from '../../utils';
import {makeGetRequest2, makeRequestNew} from '../../services/ApiService';
import {APIConstants, MapperConstants} from '../../constants';
import {updateServerReachability} from '../../store/action/global/GlobalAction';
import {
  AppActions,
  QuickBuyActions,
  TickersAction,
  WalletActions,
} from '../../store';

const INTERVAL_CHECK = 60000;

const ScreenOverlay = (props: any) => {
  const {appTheme, isServerReachable} = useSelector(
    (state: any) => state.globalReducer,
  );
  const [, setIsTimerUpdated] = useState(false);
  const timerRef = useRef(INTERVAL_CHECK);
  const dispatch = useDispatch();

  let interval: NodeJS.Timer;

  const checkServer = () => {
    makeRequestNew(MapperConstants.ApiTypes.GET, APIConstants.GET_WALLETS)
      .then(res => {
        if (res.status !== 200) {
          dispatch(updateServerReachability({isServerReachable: false}));
        } else {
          if (!isServerReachable) {
            dispatch(updateServerReachability({isServerReachable: true}));
            dispatch(AppActions.announcementList());
            dispatch(QuickBuyActions.fundsList());
            dispatch(TickersAction.getTickers());
            dispatch(WalletActions.getWalletList());
          }
        }
      })
      .catch(() => {
        dispatch(updateServerReachability({isServerReachable: false}));
      })
      .finally(() => {
        timerRef.current = INTERVAL_CHECK;
        setIsTimerUpdated(prevValue => !prevValue);
      });
  };

  useEffect(() => {
    if (interval) clearInterval(interval);
    interval = setInterval(() => {
      const newTimer = timerRef.current - 1000;
      if (newTimer <= 0) {
        timerRef.current = 0;
        checkServer();
      } else {
        timerRef.current = newTimer;
        setIsTimerUpdated(prevValue => !prevValue);
      }
    }, 1000);

    checkServer();

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* {!isServerReachable && (
        <View style={[screenOverlayStyles.container2]}>
          <View>
            <ThemeText style={{color: 'white'}}>
              Oops. We are sorry! We will be back in a blip!
            </ThemeText>
            <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
              Trying again in {timerRef.current / 1000} seconds
            </ThemeText>
          </View>
        </View>
      )} */}
    </>
  );
};

export default ScreenOverlay;
