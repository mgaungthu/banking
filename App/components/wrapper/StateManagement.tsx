import React, {useEffect, useRef, useState} from 'react'
import {AppState, AppStateStatus} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {AppStates, Screen} from '../../enums'
import { GlobalActions } from '../../store'

const StateManagement = ({routeName}: any) => {
  const appState = useRef(AppState.currentState)
  const globalData = useSelector((state: any) => state.globalReducer)
  const dispatch = useDispatch()
 

  // useEffect(() => {
  //   AppState.addEventListener('change', _handleAppStateChange)
  //   return () => {
  //     AppState.removeEventListener('change', _handleAppStateChange)
  //   }
  // }, [globalData?.mainCurrency,globalData?.secondCurrency])

  const _handleAppStateChange = async (nextAppState: AppStateStatus) => {
    let isAppChangingFromBgToFg = () =>
      (appState.current === AppStates.Inactive ||
        appState.current === AppStates.Background) &&
      nextAppState === AppStates.Active

    if (isAppChangingFromBgToFg()) {
      dispatch(
        GlobalActions.updateMainCurrency({
          mainCurrency: globalData?.mainCurrency
            ? globalData?.mainCurrency
            : 'USD',
        }),
      )
      dispatch(
        GlobalActions.updateSecondaryCurrency({
          secondCurrency: globalData?.secondCurrency
            ? globalData?.secondCurrency
            : 'BTC',
        }),
      )
    }
    appState.current = nextAppState
  }

  return (
    <>
      
    </>
  )
}

export default StateManagement
