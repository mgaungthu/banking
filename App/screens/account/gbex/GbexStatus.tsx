import React, {useEffect} from 'react'
import { SafeAreaView, ScrollView, View} from 'react-native'
import { Header, ThemeButton } from '../../../components'
import {strings} from '../../../strings'
import {commonStyles} from '../../../globalstyles/styles'
import {useDispatch, useSelector} from 'react-redux'
import {ThemeFunctions} from '../../../utils'
import GbexHeader from './GbexHeader'
import GbexMiddleView from './GbexMiddleView'
import { GbexActions } from '../../../store'
import { Loader } from '../../../enums'

const GbexStatus = (props: any) => {
  const {appTheme} = useSelector((state: any) => state.globalReducer)
  const {gbexStatusData} = useSelector((state: any) => state.gbexReducer)

  const appData = useSelector((state: any) => state.appReducer)

  const dispatch = useDispatch()

  return (
    <SafeAreaView
      style={[commonStyles.safeView, ThemeFunctions.setBackground(appTheme)]}>
      <Header title={strings('gbex')} isNormalText={true} />
      <ScrollView
        contentContainerStyle={{paddingBottom: 100}}>
        <GbexHeader />
        <GbexMiddleView gbexStatusData={gbexStatusData}/>
      </ScrollView>
      {/* <View style={commonStyles.paddingHorizontalView}>
        <ThemeButton
          text='redeem_now'
          onClickHandler={() => dispatch(GbexActions.redeemRewards())}
          loading={appData.loading === Loader.REDEEM_REWARDS ? true : false}
        />
      </View> */}
    </SafeAreaView>
  )
}

export default GbexStatus
