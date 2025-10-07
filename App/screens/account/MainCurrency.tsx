import React, { useEffect, useState } from 'react'
import {
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  View,
} from 'react-native'
import { identityStyles as styles } from './styles'
import { Cell, Header, ImageContainer, Radio, Space, ThemeButton, ThemeText } from '../../components'
import * as Images from '../../assets'
import { strings } from '../../strings'
import { commonStyles, rtlStyles } from '../../globalstyles/styles'
import { DefaultArray, MapperConstants } from '../../constants'
import { ThemeFunctions } from '../../utils'
import Navigation from '../../utils/Navigation'
import { useDispatch } from 'react-redux'
import { GlobalActions } from '../../store'
import { useSelector } from 'react-redux'

const MainCurrency = (props: any) => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD')
  const [selectedSecondCurrency, setSelectedSecondCurrency] = useState('BTC')
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(MapperConstants.StatusMapper.disable)

  const { isRtlApproach, appTheme, mainCurrency, secondCurrency } = useSelector(
    (state: any) => state.globalReducer,
  )
  useEffect(() => {
    setSelectedCurrency(mainCurrency)
  }, [mainCurrency])

  useEffect(() => {
    setSelectedSecondCurrency(secondCurrency)
  }, [secondCurrency])

  const updateMainCurrency = (res) => {
    setLoading(MapperConstants.StatusMapper.enable)
    dispatch(GlobalActions.updateMainCurrency({ mainCurrency: res }))
    setLoading(MapperConstants.StatusMapper.disable)
  }

  const updateSecondCurrency = (res) => {
    setLoading(MapperConstants.StatusMapper.enable)
    dispatch(
      GlobalActions.updateSecondaryCurrency({secondCurrency: res}),
    )
    setLoading(MapperConstants.StatusMapper.disable)
  }

  return (
    <SafeAreaView
      style={[commonStyles.safeView, ThemeFunctions.setBackground(appTheme)]}>
      <Header title={`Portfolio Currency  `} />
      <ScrollView contentContainerStyle={commonStyles.scrollView}>
        <ThemeText style={{
          color: ThemeFunctions.customText(appTheme)
        }}>{strings('main_currency')}</ThemeText>
        {DefaultArray.mainCurrency.map(res => {
          const selected = res === selectedCurrency
          return (
            <Cell
              onPress={() => updateMainCurrency(res)}
              style={{ justifyContent: 'space-between' }}
              key={res}>
              <ThemeText>{res}</ThemeText>
              <Radio active={selected} />
            </Cell>
          )
        })}
        <Space height={10} />
        <ThemeText style={{
          color: ThemeFunctions.customText(appTheme)
        }}>{strings('secondary_currency')}</ThemeText>
        {DefaultArray.secondCurrency.map(res => {
          const selected = res === selectedSecondCurrency
          return (
            <Cell
              onPress={() => updateSecondCurrency(res)}
              style={{ justifyContent: 'space-between' }}
              key={res}>
              <ThemeText>{res}</ThemeText>
              <Radio active={selected} />
            </Cell>
          )
        })}
      </ScrollView>
    </SafeAreaView>
  )
}

export default MainCurrency
