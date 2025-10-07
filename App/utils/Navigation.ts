import React from 'react';
import {
  StackActions,
  TabActions,
  CommonActions,
} from '@react-navigation/native';

export const navigationRef = React.createRef<any>();
export const isReadyRef = React.createRef<any>();

export function navigate(name: string, params?: any) {
  if (navigationRef.current) {
    navigationRef.current?.navigate(name, params);
  }
}

export function replace(name: string) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current?.dispatch(StackActions.replace(name));
  }
}

export function reset(name: string) {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: name}],
    }),
  );
}

export function goBack() {
  // navigationRef?.current?.dispatch(
  //   StackActions.pop()
  // );
  navigationRef?.current?.dispatch(CommonActions.goBack());
}
export function jumpToAct(routeName: any) {
  const jumpToAction = TabActions.jumpTo(routeName, {});
  navigationRef?.current?.dispatch(jumpToAction);
}

export default {
  navigate,
  replace,
  reset,
  goBack,
  jumpToAct,
};
