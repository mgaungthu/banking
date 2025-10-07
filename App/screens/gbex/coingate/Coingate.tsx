import React from 'react'
import { ScrollView, Text, View} from 'react-native'
import {Header, ThemeButton} from '../../../components'
import {strings} from '../../../strings'
import {commonStyles, textStyles, rtlStyles} from '../../../globalstyles/styles'
import {useSelector} from 'react-redux'
import {ThemeFunctions} from '../../../utils'
import { Screen} from '../../../enums'
import {APIConstants} from '../../../constants'
import Navigation from '../../../utils/Navigation'
import {historyStyles} from '../../quickbuy/styles'
import { isIOS } from '../../../utils/DeviceConfig'

const Coingate = (props: any) => {
  const {appTheme, isRtlApproach} = useSelector(
    (state: any) => state.globalReducer,
  )
  const handleNavigation = (url, title) => () => {
    Navigation.navigate(Screen.WebViewWrapper, {
      url,
      title,
    })
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
          {strings('coin_gate')}
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
            {strings('note')}
          </Text>
          <View style={commonStyles.topPadding}>
            <View
              style={[
                commonStyles.rowItem,
                {marginRight: 8},
                isRtlApproach ? rtlStyles.reverseRow : {},
              ]}>
              <View
                style={{
                  ...commonStyles.bullet1,
                  marginTop:isIOS()?1:7,
                  backgroundColor: ThemeFunctions.customText(appTheme),
                }}
              />
              <Text
                style={{
                  ...textStyles.notes,
                  color: ThemeFunctions.customText(appTheme),
                }}>
                {strings('coingate_note1')}
              </Text>
            </View>
            <View
              style={[
                commonStyles.rowItem,
                {marginRight: 8},
                isRtlApproach ? rtlStyles.reverseRow : {},
              ]}>
              <View
                style={{
                  ...commonStyles.bullet1,
                  marginTop:isIOS()?1:7,
                  backgroundColor: ThemeFunctions.customText(appTheme),
                }}
              />
              <Text
                style={{
                  ...textStyles.notes,
                  color: ThemeFunctions.customText(appTheme),
                }}>
                {strings('coingate_note2')}{' '}
                <Text
                  style={[textStyles.cyanText]}
                  onPress={handleNavigation(
                    APIConstants.SUPPORT_URL,
                    'support',
                  )}>
                  {strings('support')}
                </Text>
              </Text>
            </View>
          </View>
        </View>
        <ThemeButton
          text='pay_using_coingate'
          onClickHandler={handleNavigation(APIConstants.PAY_USING_COINGATE, '')}
        />
      </ScrollView>
    </>
  )
}

export default Coingate
