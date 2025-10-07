import React from 'react'
import {View, ActivityIndicator} from 'react-native'
import {useSelector} from 'react-redux'
import { Space } from '../../../components'
import {ThemeFunctions} from '../../../utils'

const HistoryShimmer = (props: any) => {
  const {appColor} = useSelector((state: any) => state.globalReducer)

  return (
    <>
      <Space height={20} />
      <ActivityIndicator color={ThemeFunctions.getColor(appColor)}  />
    </>
  )
}

export default HistoryShimmer
