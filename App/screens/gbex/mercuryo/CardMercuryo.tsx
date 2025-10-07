import React from 'react'
import {Platform, ScrollView, Text, View} from 'react-native'
import {Header, ThemeButton} from '../../../components'
import {strings} from '../../../strings'
import {commonStyles, textStyles, rtlStyles} from '../../../globalstyles/styles'
import {useSelector} from 'react-redux'
import {ThemeFunctions} from '../../../utils'
import {PlatformType, Screen} from '../../../enums'
import {APIConstants} from '../../../constants'
import Navigation from '../../../utils/Navigation'
import {historyStyles} from '../../quickbuy/styles'
import { isIOS } from '../../../utils/DeviceConfig'

const CardMercuryo = (props: any) => {
  const {appTheme, isRtlApproach} = useSelector(
    (state: any) => state.globalReducer,
  )
  const handleNavigation = (url, title) => () => {
    Navigation.navigate(Screen.WebViewWrapper, {
      url,
      title,
    })
  }

  const goToWallet = () => {
    Navigation.navigate(Screen.WalletScreen, {fromScreen: Screen.WalletScreen})
  }
  const bullet = () => {
    return (
      <View
        style={{
          ...commonStyles.bullet1,
          marginTop:isIOS()?1:7,
          backgroundColor: ThemeFunctions.customText(appTheme),
        }}
      />
    )
  }
  return (
    <>
      <Header title={strings('buy_gbex')} />
      <ScrollView
        style={[
          commonStyles.safeView,
          commonStyles.paddingHorizontalView,
          ThemeFunctions.setBackground(appTheme),
        ]}>
        <Text
          style={{
            ...textStyles.heading,
            color: ThemeFunctions.customText(appTheme),
          }}>
          {strings('card_mercuryo')}
        </Text>
        <View
          style={[
            historyStyles.historyCard,
            ThemeFunctions.getCardColor(appTheme),
            {marginTop: 12, paddingBottom: 14},
          ]}>
          <Text
            style={{
              ...textStyles.noteStyle,
              color: ThemeFunctions.customText(appTheme),
            }}>
            {strings('steps')}:
          </Text>
          <View style={commonStyles.topPadding}>
            <View
              style={[
                commonStyles.rowItem,
                commonStyles.wrapContent,
                {marginRight: 8},
                isRtlApproach ? rtlStyles.reverseRow : {},
              ]}>
              {bullet()}
              <View
                style={[
                  commonStyles.rowItem,
                  isRtlApproach ? rtlStyles.reverseRow : {},
                ]}>
                <Text
                  style={{
                    ...textStyles.notes,
                    color: ThemeFunctions.customText(appTheme),
                  }}>
                  {strings('go_to_wallet')}
                </Text>
                <Text
                  style={[textStyles.notes, textStyles.cyanText]}
                  onPress={goToWallet}>
                  {' '}
                  {strings('wallet')}{'.'}
                </Text>
              </View>
            </View>
            <View
              style={[
                commonStyles.rowItem,
                commonStyles.wrapContent,
                {marginRight: 8},
                isRtlApproach ? rtlStyles.reverseRow : {},
              ]}>
              {bullet()}
              <View
                style={[
                  commonStyles.rowItem,
                  isRtlApproach ? rtlStyles.reverseRow : {},
                ]}>
                <Text
                  style={{
                    ...textStyles.notes,
                    color: ThemeFunctions.customText(appTheme),
                  }}>
                  {strings('press')}
                </Text>
                <Text
                  style={[textStyles.notes, textStyles.cyanText]}
                  onPress={handleNavigation(
                    APIConstants.PAY_USING_MERCURYO,
                    '',
                  )}>
                  {' '}
                  {strings('here')}{' '}
                </Text>
              </View>
              <Text
                style={[
                  textStyles.notes,
                  {marginLeft: 6, color: ThemeFunctions.customText(appTheme)},
                ]}
                numberOfLines={4}>
                {strings('insert_deposit')}{' '}
              </Text>
            </View>
            <View
              style={[
                commonStyles.rowItem,
                {marginRight: 8},
                isRtlApproach ? rtlStyles.reverseRow : {},
              ]}>
              {bullet()}
              <Text
                style={[
                  textStyles.notes,
                  {color: ThemeFunctions.customText(appTheme)},
                ]}
                numberOfLines={4}>
                {strings('mercuryo_step3')}{' '}
              </Text>
            </View>
            <View
              style={[
                commonStyles.rowItem,
                {marginRight: 8},
                isRtlApproach ? rtlStyles.reverseRow : {},
              ]}>
              {bullet()}
              <Text
                style={[
                  textStyles.notes,
                  {color: ThemeFunctions.customText(appTheme)},
                ]}
                numberOfLines={4}>
                {strings('mercuryo_step4')}{' '}
              </Text>
            </View>
          </View>
        </View>

        <ThemeButton
          text='pay_using_mercuryo'
          onClickHandler={handleNavigation(APIConstants.PAY_USING_MERCURYO, '')}
        />
      </ScrollView>
    </>
  )
}

export default CardMercuryo
