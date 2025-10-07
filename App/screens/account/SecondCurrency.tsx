import React, {useEffect, useState} from 'react'
import {
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  View,
} from 'react-native'
import {identityStyles as styles} from './styles'
import {Cell, Header, ImageContainer, Radio, ThemeButton, ThemeText} from '../../components'
import * as Images from '../../assets'
import {strings} from '../../strings'
import {commonStyles, rtlStyles} from '../../globalstyles/styles'
import {DefaultArray, MapperConstants} from '../../constants'
import {ThemeFunctions} from '../../utils'
import Navigation from '../../utils/Navigation'
import {useDispatch} from 'react-redux'
import {GlobalActions} from '../../store'
import {useSelector} from 'react-redux'

const SecondCurrency = (props: any) => {
  const [selectedCurrency, setSelectedCurrency] = useState('BTC')
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(MapperConstants.StatusMapper.disable)

  const {isRtlApproach, appTheme, secondCurrency} = useSelector(
    (state: any) => state.globalReducer,
  )
  useEffect(() => {
    setSelectedCurrency(secondCurrency)
  }, [secondCurrency])

  const updateSecondCurrency = () => {
    setLoading(MapperConstants.StatusMapper.enable)
    dispatch(
      GlobalActions.updateSecondaryCurrency({secondCurrency: selectedCurrency}),
    )
    setLoading(MapperConstants.StatusMapper.disable)
    Navigation.goBack()
  }

  return (
    <SafeAreaView
      style={[commonStyles.safeView, ThemeFunctions.setBackground(appTheme)]}>
      <Header title={`${strings('secondary_currency')}`} />
      <ScrollView contentContainerStyle={commonStyles.scrollView}>
        {DefaultArray.secondCurrency.map(res => {
          const selected = res === selectedCurrency
          return (
            <Cell
              onPress={() => setSelectedCurrency(res)}
              style={{ justifyContent: 'space-between' }}
              key={res}>
              <ThemeText>{res}</ThemeText>
              <Radio active={selected} />
            </Cell>
          )
        })}
      </ScrollView>
      <View style={commonStyles.paddingHorizontalView}>
        <ThemeButton
          text='done'
          onClickHandler={updateSecondCurrency}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  )
}

export default SecondCurrency
