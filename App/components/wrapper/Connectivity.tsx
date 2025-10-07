import React, {useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';

import {useDispatch} from 'react-redux';
import {updateConnectivity} from '../../store';

const Connectivity = () => {
  const dispatch = useDispatch();

  useEffect(
    () =>
      NetInfo.addEventListener(state => {
        dispatch(
          updateConnectivity({
            internetAvailable: state.isConnected,
            isInternetReachable: state.isInternetReachable,
          }),
        );
      }),
    [dispatch],
  );

  return <></>;
};

export default Connectivity;
