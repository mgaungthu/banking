import React, {useEffect} from 'react'
import {SafeAreaView, Text, View, ScrollView} from 'react-native'
import {commonStyles, rtlStyles} from '../../globalstyles/styles'
import * as Images from '../../assets'
import {strings} from '../../strings'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import {ThemeFunctions, AppFunctions} from '../../utils'
import {Header, ImageContainer, ThemeButton} from '../../components'
import {rewardStyles} from './styles'
import Colors,{rapunzelTheme} from '../../theme/Colors'
import {GbexActions} from '../../store'
import {Loader} from '../../enums'

const Dashboard = (props: any) => {
  const dispatch = useDispatch()
  const {
    navigation: {navigate},
  } = props
  const appData = useSelector((state: any) => state.appReducer)

  const {isRtlApproach, appTheme} = useSelector(
    (state: any) => state.globalReducer,
  )
  const {gbexRewardsData} = useSelector((state: any) => state.gbexReducer)

  useEffect(() => {
    dispatch(GbexActions.getGbexReward())
  }, [])

  const renderItem = (title: string, color: string, value: any) => {
    return (
      <View
        style={[
          commonStyles.rowItem,
          rewardStyles.card,
          {backgroundColor: color},
          isRtlApproach ? rtlStyles.alignEnd : rtlStyles.alignStart,
        ]}>
        <ImageContainer
          imagePath={Images.icRewards}
          imgStyle={rewardStyles.img}
          noTransform={true}
        />
        <View style={rewardStyles.rightView}>
          <Text style={[rewardStyles.title]}>{strings(title)}</Text>
          <Text style={[rewardStyles.value]}>
            {value && value > 0
              ? AppFunctions.standardDigitConversion(value.toFixed(2))
              : 0}
          </Text>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      <Header title={strings('dashboard')} />
      <ScrollView style={commonStyles.paddingHorizontalView}>
        {renderItem(
          'total_rewards',
          ThemeFunctions.isRapunzelTheme(appTheme)?Colors.pink:Colors.orange,
          gbexRewardsData?.totalRewards,
        )}
        {renderItem(
          'rewards_redeemed',
          ThemeFunctions.isRapunzelTheme(appTheme)?Colors.pink: Colors.indigo,
          gbexRewardsData?.totalRedeemed,
        )}
        {renderItem(
          'current_rewards',
          Colors.pink,
          gbexRewardsData?.currentRewards,
        )}
      </ScrollView>
      <View style={commonStyles.paddingHorizontalView}>
        <ThemeButton
          text='redeem_now'
          onClickHandler={() => dispatch(GbexActions.redeemRewards())}
          loading={appData.loading === Loader.REDEEM_REWARDS ? true : false}
        />
      </View>
    </SafeAreaView>
  )
}

export default Dashboard
