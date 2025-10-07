import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  Image,
  Linking,
  ScrollView,
  PixelRatio,
  Dimensions,
  Platform,
} from 'react-native'
import { commonStyles, rtlStyles } from '../../globalstyles/styles'
import * as Images from '../../assets'
import { accountStyles, securityStyles } from '../account/styles'
import { homeStyles } from '../home/styles'
import { APIConstants, AppConstants, DefaultArray, MapperConstants } from '../../constants'
import { strings } from '../../strings'
import { useDispatch } from 'react-redux'
import { AppColor, Loader, Screen } from '../../enums'
import { useSelector } from 'react-redux'
import { AppFunctions, SCREEN_HEIGHT, ThemeFunctions } from '../../utils'
import { Header, ImageContainer, Space, ThemeButton, ThemeText } from '../../components'
import UpcomingPlaceholder from '../home/UpcomingPlaceholder'
import AnnouncementShimmer from '../home/AnnouncementShimmer'
import AnnouncementPlaceholder from '../home/AnnouncementPlaceholder'
import Carousel, { Pagination } from 'react-native-x2-carousel'
import UpcomingShimmer from '../home/UpcomingShimmer'
import { rewardStyles as styles } from './styles'
import { t } from 'react-native-tailwindcss'
import { isDarkTheme } from '../../utils/ThemeFunctions'
import { GbexActions } from '../../store'
import { makeRequest } from '../../services/ApiService'
import { FormatNumber, SanitizeNumber, toRealNumber } from '../../utils/AppFunctions'
import IconVector from '../../components/ui/IconVector'
import Navigation from '../../utils/Navigation'
import Colors from '../../theme/Colors'
import { BlurView } from "@react-native-community/blur";
import { isIOS } from '../../utils/DeviceConfig'
import { mainCurrencySymbol } from '../../constants/Constants'
import { ProgressBar } from 'react-native-paper'
import _ from "lodash"
const heightDevice = Dimensions.get('window').height


const GoalItem = React.memo(({ current, gbex, isStart, isEnd, active=false, priceGBEX }) => {
  
  const { appTheme,  appColor } = useSelector(
    (state: any) => state.globalReducer,
  )
  

  if (!active) {
    return (
      <View style={[
        styles.goalList,
        { borderColor: ThemeFunctions.getColor(appColor) },
        isStart && styles.borderTopRadius,
        isEnd && styles.borderBottomRadius
      ]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ThemeText>{mainCurrencySymbol["USD"]} {gbex}</ThemeText>
          {gbex <=  priceGBEX &&
            <View style={[
              styles.checkCircle,
              { backgroundColor: ThemeFunctions.getColor(appColor) }
            ]}>
              <IconVector.Entypo
                name='check'
                size={12}
                color={Colors.white}
              />
            </View>
          }
        </View>
        <ThemeText>{mainCurrencySymbol["USD"]} {current}</ThemeText>
      </View>
    )
  }


  let progress=0;

  if (gbex) {
    progress=priceGBEX/gbex
  }

  return (
    <View style={[
      
      { borderColor: ThemeFunctions.getColor(appColor), borderWidth:1 },
      isStart && styles.borderTopRadius,
      isEnd && styles.borderBottomRadius
    ]}>


      <View style={styles.goalListActive}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ThemeText>{mainCurrencySymbol["USD"]} {gbex}</ThemeText>
          {gbex <=  priceGBEX &&
            <View style={[
              styles.checkCircle,
              { backgroundColor: ThemeFunctions.getColor(appColor) }
            ]}>
              <IconVector.Entypo
                name='check'
                size={12}
                color={Colors.white}
              />
            </View>
          }
        </View>
        <ThemeText>{mainCurrencySymbol["USD"]} {current}</ThemeText>
      </View>


      <View style={styles.progressBarWrapper}>
        <View style={{height:1, width:"100%", backgroundColor:"gray", marginBottom:5}} />

          <View style={{marginBottom:4, flexDirection:"row", justifyContent:"space-between"}}>
            <ThemeText style={{fontSize:14,color:ThemeFunctions.customText(appTheme)}}>{strings("price_progress")}</ThemeText>
            <ThemeText style={{fontSize:14,color:ThemeFunctions.customText(appTheme)}}>{FormatNumber(priceGBEX)}</ThemeText>
          </View>

        
        <ProgressBar                   
            style={{backgroundColor: 'gray', height: 5, borderRadius: 3}}
            color={ThemeFunctions.getColor(appColor)}
            progress={progress}
          />
      </View>
      
    </View>
  )
},_.isEqual)

const Rewards = (props: any) => {
  const dispatch = useDispatch()
  const {
    navigation: { navigate },
  } = props

  const { isRtlApproach, appTheme, announcementMeta, appColor } = useSelector(
    (state: any) => state.globalReducer,
  )

  const quickBuyData = useSelector((state: any) => state.quickBuyReducer)

  const { gbexStatusData, gbexRewardsData, liveCurrencyPrices } = useSelector((state: any) => state.gbexReducer)

  const appData = useSelector((state: any) => state.appReducer)
  const { announcements } = useSelector((state: any) => state.appReducer)


  const gbexCur = quickBuyData.fundsList?.find(item => item.symbol == 'GBEX')

  const gbexBalance = (parseFloat(gbexCur?.balance)+parseFloat(gbexCur?.inTrade)+parseFloat(SanitizeNumber(gbexCur?.staking_balance)));

  const getCurrentGbex = (value) => {
    return FormatNumber(
      parseFloat(AppFunctions.convertToDecimal(gbexBalance * value)),
    )
  }

  const getImgUrl = data => {
    return AppFunctions.getAssetUrl(data, announcementMeta)
  }

  const upcomingArr = () => {
    return announcements?.filter(res => res.type === 'upcoming')
  }  

  const Upcoming = (data: any) => (
    <View style={[homeStyles.carouselCard1, homeStyles.custom]} key={data?.id}>
      {!getImgUrl(data) ? (
        <View style={[homeStyles.carouselImg1, ThemeFunctions.tabBg(appTheme)]} />
      ) : (
        <>
          <Image
            source={{ uri: getImgUrl(data) }}
            style={[homeStyles.carouselImg]}
          />

        </>
      )}
      <View style={{ ...homeStyles.bottomView1 }}>
        <Text
          style={[
            ThemeFunctions.carouselTextHeading(appTheme),
            homeStyles.carouselHeading,
          ]}>
          {data?.title}
        </Text>
        <Text
          style={[ThemeFunctions.carouselText(appTheme), homeStyles.carouselText]}>
          {data.subTitle}
        </Text>
      </View>
    </View>
  )

  const _getImage = () => {
    if (isDarkTheme(appTheme)) {
      return {
        holder: Images.ic_holder_dark,
        transfer: Images.ic_transfer_dark,
        reward: Images.ic_reward_dark,
        burn: Images.ic_burn_dark,
        burnRed: Images.ic_burn_red,
        supply: Images.ic_supply,
      }
    }
    return {
      holder: Images.ic_holder_light,
      transfer: Images.ic_transfer_light,
      reward: Images.ic_reward_light,
      burn: Images.ic_burn_light,
      burnRed: Images.ic_burn_red,
      supply: Images.ic_supply,
    }
  }

  const _getBackgroundYourGbex = () => {
    switch (appColor) {
      case AppColor.green:
        return { backgroundColor: isDarkTheme(appTheme) ? '#21323C' : '#CBF0EB' }
      case AppColor.pink:
        return { backgroundColor: isDarkTheme(appTheme) ? '#3A273A' : '#FEDFEB' }
    }
    return { backgroundColor: '#C9C9CD' }
  }

  const _getBackgroundReward = () => {
    switch (appColor) {
      case AppColor.green:
        return { backgroundColor: isDarkTheme(appTheme) ? '#1F2935' : '#E8F0E8' }
      case AppColor.pink:
        return { backgroundColor: isDarkTheme(appTheme) ? '#331F33' : '#F0E8ED' }
    }
    return { backgroundColor: '#F6F6F6' }
  }

  const _getImageReward = () => {
    switch (appColor) {
      case AppColor.green:
        return Images.reward_green
      case AppColor.pink:
        return Images.reward_pink
    }
    return Images.reward_black
  }

  const priceGBEX = liveCurrencyPrices.filter((x => x.currencyName==="GBEX"))[0]?.usdPrice    

  const listGoal = [
    { gbex: 0.000000001.toFixed(9), current: getCurrentGbex(0.000000001) },
    { gbex: 0.00000001.toFixed(8), current: getCurrentGbex(0.00000001) },
    { gbex: 0.0000001.toFixed(7), current: getCurrentGbex(0.0000001) },
    { gbex: 0.000001, current: getCurrentGbex(0.000001) },
    { gbex: 0.00001, current: getCurrentGbex(0.00001) },
    { gbex: 0.0001, current: getCurrentGbex(0.0001) },
    { gbex: 0.001, current: getCurrentGbex(0.001) },
    { gbex: 0.01, current: getCurrentGbex(0.01) },
  ]

  const _navigateHistory = () => {
    Navigation.navigate(Screen.RewardHistory)
  }

  useEffect(() => {
    dispatch(GbexActions.getGbexStatus())
    dispatch(GbexActions.getGbexReward())
  }, [])

  const renderGoals = () => {
    let met=false;
    const elems=[]

    for (let i=0;i<listGoal.length;i++) {
      let key = i;
      let goal = listGoal[i];
      if (!met && goal.gbex>priceGBEX) {  
        met=true;
        elems.push(<GoalItem priceGBEX={priceGBEX} key={key} current={goal.current} gbex={goal.gbex} isStart={key == 0} isEnd={listGoal.length == key + 1} active={true} />)
      } else {
        elems.push(<GoalItem priceGBEX={priceGBEX} key={key} current={goal.current} gbex={goal.gbex} isStart={key == 0} isEnd={listGoal.length == key + 1} active={false} />)
      }
    }
    return elems;
  }

  return (
    <SafeAreaView
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      <Header
        title={strings('rewards')}
        right={
          <TouchableOpacity style={[homeStyles.profileBtn,ThemeFunctions.setIEOCardBG(appTheme)]} onPress={_navigateHistory}>
            <IconVector.FontAwesome5
              name='history'
              color={ThemeFunctions.getCurrentTextColor(appTheme)}
              size={22}
            />
          </TouchableOpacity>
        }
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>

        {/* {DefaultArray.rewards.map(res => {
          return (
            <View
              key={Math.random()}
              style={commonStyles.paddingHorizontalView}>
              <Item res={res} key={Math.random()} />
            </View>
          )
        })} */}
        <View style={[homeStyles.card, ThemeFunctions.setBackground(appTheme), { paddingVertical: 0 }]}>
          <Image source={Images.banner_gbex_rewards} style={[styles.bannerImg]} />
        </View>
        <View style={[
          styles.hr,
          { backgroundColor: ThemeFunctions.customText(appTheme) }
        ]} />
        <View style={styles.container}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.colCount}>
              <Image
                style={styles.imageCount}
                source={_getImage().holder}
              />
              <View style={styles.countDetails}>
                <ThemeText style={{ color: ThemeFunctions.customText(appTheme) }}>{strings('holder_account')}</ThemeText>
                <ThemeText
                  style={t.fontBold}
                  numberOfLines={1}
                >{`${FormatNumber(
                  parseFloat(AppFunctions.convertToDecimal(
                    gbexStatusData?.holderCount
                  )) || '---'
                )}`}</ThemeText>
              </View>
            </View>
            <View style={styles.colCount}>
              <Image
                style={styles.imageCount}
                source={_getImage().transfer}
              />
              <View style={styles.countDetails}>
                <ThemeText style={{ color: ThemeFunctions.customText(appTheme) }}>{strings('transfer_count')}</ThemeText>
                <ThemeText style={t.fontBold}>{`${FormatNumber(
                  parseFloat(AppFunctions.convertToDecimal(
                    gbexStatusData?.txCount
                  )) || '---'
                )}`}</ThemeText>
              </View>
            </View>
          </View>
          <Space height={20} />
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.colCount}>
              <Image
                style={styles.imageCount}
                source={_getImage().burn}
              />
              <View style={styles.countDetails}>
                <ThemeText style={{ color: ThemeFunctions.customText(appTheme) }}>{strings('tax_burn_count')}</ThemeText>
                <ThemeText
                  style={[t.fontBold]}
                  numberOfLines={1}
                  adjustsFontSizeToFit={true}
                >{FormatNumber(
                  parseFloat(AppFunctions.convertToDecimal(gbexStatusData?.totalBurnFees)) || '---'
                )}</ThemeText>
              </View>
            </View>
            <View style={styles.colCount}>
              <Image
                style={styles.imageCount}
                source={_getImage().reward}
              />
              <View style={styles.countDetails}>
                <ThemeText style={{ color: ThemeFunctions.customText(appTheme) }}>{strings('reward_count')}</ThemeText>
                <ThemeText
                  style={t.fontBold}
                  numberOfLines={1}
                  adjustsFontSizeToFit={true}
                >{AppFunctions.standardDigitConversion(
                  parseFloat(AppFunctions.convertToDecimal(gbexStatusData?.totalRewardFees)) || '---'
                )}</ThemeText>
              </View>
            </View>
          </View>
          <Space height={20} />
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.colCount}>
              <Image
                style={styles.imageCount}
                source={_getImage().burnRed}
              />
              <View style={styles.countDetails}>
                <ThemeText style={{ color: ThemeFunctions.customText(appTheme) }}>{strings('total_burn_count')}</ThemeText>
                <ThemeText
                  style={[t.fontBold]}
                  numberOfLines={1}
                  adjustsFontSizeToFit={true}
                >{FormatNumber(
                  parseFloat(AppFunctions.convertToDecimal(gbexStatusData?.burnBalance)) || '---'
                )}</ThemeText>
              </View>
            </View>
          </View>
          <Space height={20} />
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.colCount}>
              <Image
                style={styles.imageCount}
                source={_getImage().supply}
              />
              <View style={styles.countDetails}>
                <ThemeText style={{ color: ThemeFunctions.customText(appTheme) }}>{strings('remaining_supply')}</ThemeText>
                <ThemeText
                  style={[t.fontBold]}
                  numberOfLines={1}
                  adjustsFontSizeToFit={true}
                >{FormatNumber(
                  parseFloat(AppFunctions.convertToDecimal(gbexStatusData?.remainingSupply)) || '---'
                )}</ThemeText>
              </View>
            </View>
          </View>
        </View>
        <View style={[
          styles.hr,
          { backgroundColor: ThemeFunctions.customText(appTheme) }
        ]} />
        <Space height={10} />
        <View style={styles.container}>
          <View style={[
            styles.yourGbex,
            _getBackgroundYourGbex()
          ]}>
            <ThemeText style={{ color: ThemeFunctions.customText(appTheme) }}>Your GBEX Balance</ThemeText>
            <ThemeText>{FormatNumber(gbexBalance)}</ThemeText>
          </View>
          <View style={[
            styles.reward,
            _getBackgroundReward()
          ]}>
            <Image
              source={_getImageReward()}
              style={styles.rewardImg}
            />
            <View>
              <ThemeText style={{ color: ThemeFunctions.customText(appTheme) }}>{strings('total_rewards')}</ThemeText>
              <ThemeText>{FormatNumber(parseFloat(gbexRewardsData?.totalRewards?.toFixed(0))) || '---'}</ThemeText>
            </View>
          </View>
          <View style={[
            styles.reward,
            _getBackgroundReward()
          ]}>
            <Image
              source={_getImageReward()}
              style={styles.rewardImg}
            />
            <View>
              <ThemeText style={{ color: ThemeFunctions.customText(appTheme) }}>{strings('rewards_redeemed')}</ThemeText>
              <ThemeText>{FormatNumber(parseFloat(gbexRewardsData?.totalRedeemed?.toFixed(0))) || '---'}</ThemeText>
            </View>
          </View>
          <View style={[
            styles.endReward,
            _getBackgroundReward()
          ]}>
            <Image
              source={_getImageReward()}
              style={styles.rewardImg}
            />
            <View>
              <ThemeText style={{ color: ThemeFunctions.customText(appTheme) }}>{strings('current_rewards')}</ThemeText>
              <ThemeText>{FormatNumber(parseFloat(gbexRewardsData?.currentRewards?.toFixed(0))) || '---'}</ThemeText>
            </View>
          </View>
        </View>
        <Space height={25} />
        <View style={styles.container}>
          <View style={styles.rowBetween}>
            <ThemeText>Your GBEX will be worth:</ThemeText>
            <View style={[
              styles.goal,
              { backgroundColor: ThemeFunctions.getColor(appColor) }
            ]}>
              <ThemeText style={{ color: Colors.white }}>Goal</ThemeText>
            </View>
          </View>
          <Space height={20} />
          {renderGoals()}
          <Space height={15} />
          <View style={styles.rowBetween}>
            <ThemeText>Your GBEX Levels:</ThemeText>
            <View style={[
              styles.goal,
              { backgroundColor: ThemeFunctions.getColor(appColor) }
            ]}>
              <ThemeText style={{ color: Colors.white }}>Levels</ThemeText>
            </View>
          </View>
          <Space height={20} />
          <View>
            <View style={isIOS() ? styles.blurContainerIos : styles.blurContainerAndroid}>
              {listGoal.map((item, key) =>
                <GoalItem priceGBEX={priceGBEX} key={key} current={"Coming soon"} gbex={`Level ${key + 1}`} isStart={key == 0} isEnd={listGoal.length == key + 1} />
              )}
              {isIOS() &&
                <>
                  <BlurView
                    style={styles.blur}
                    blurType='light'
                    blurAmount={6}
                  />
                  <ThemeText style={[
                    styles.comingSoon,
                    { color: ThemeFunctions.getColor(appColor) }
                  ]}>{strings("coming_soon")}</ThemeText>
                </>
              }
            </View>
            {!isIOS() &&
              <ThemeText style={[
                styles.comingSoon,
                { color: ThemeFunctions.getColor(appColor) }
              ]}>{strings("coming_soon")}</ThemeText>
            }
          </View>
        </View>
      </ScrollView>
      <View style={commonStyles.paddingHorizontalView}>
        <ThemeButton
          text='redeem_now'
          onClickHandler={() => {
            dispatch(GbexActions.redeemRewards());
            setTimeout(() => {
              dispatch(GbexActions.getGbexStatus())
              dispatch(GbexActions.getGbexReward())
            }, 2000)
            
          }}
          loading={appData.loading === Loader.REDEEM_REWARDS ? true : false}
        />
      </View>
    </SafeAreaView>
  )
}

export default Rewards
