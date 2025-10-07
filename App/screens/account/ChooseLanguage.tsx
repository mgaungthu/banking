import React, {useEffect, useState} from 'react'
import {
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  View,
} from 'react-native'
import {identityStyles as styles} from './styles'
import {Background, Cell, Header, ImageContainer, Radio, ThemeButton, ThemeText} from '../../components'
import * as Images from '../../assets'
import {strings} from '../../strings'
import {commonStyles, rtlStyles} from '../../globalstyles/styles'
import {DefaultArray, MapperConstants} from '../../constants'
import {setItem, ThemeFunctions} from '../../utils'
import Navigation from '../../utils/Navigation'
import {Screen} from '../../enums'
import {useTranslation} from 'react-i18next'
import {useDispatch} from 'react-redux'
import {GlobalActions} from '../../store'
import {useSelector} from 'react-redux'
import {rapunzelTheme} from '../../theme/Colors'
import { t } from 'react-native-tailwindcss'

const ChooseLanguage = (props: any) => {
  const [selectedLanguage, setSelectedLanguage] = useState(
    DefaultArray.languages[0],
  )
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(MapperConstants.StatusMapper.disable)
  const {isRtlApproach, appTheme} = useSelector(
    (state: any) => state.globalReducer,
  )

  const {i18n} = useTranslation()
  const selectedLngCode = i18n.language

  useEffect(() => {
    const filteredLanguage = DefaultArray.languages.find(
      res => res.value === selectedLngCode,
    )
    setSelectedLanguage(filteredLanguage)
  }, [])

  const handleLanguageUpdate = async () => {
    setLoading(MapperConstants.StatusMapper.enable)
    await setItem('appLanguage', selectedLanguage.value)
    if (selectedLanguage.value === 'ar') {
      dispatch(
        GlobalActions.updateAppApproach(MapperConstants.StatusMapper.enable),
      )
    } else {
      dispatch(
        GlobalActions.updateAppApproach(MapperConstants.StatusMapper.disable),
      )
    }
    i18n.changeLanguage(selectedLanguage.value)
    setLoading(MapperConstants.StatusMapper.disable)
    props?.route?.params?.fromScreen
      ? Navigation.reset(Screen.Auth)
      : Navigation.reset(Screen.App)
  }

  return (
    <SafeAreaView
      style={[commonStyles.safeView, ThemeFunctions.setBackground(appTheme)]}>
      <Header
        title={`${strings('select')} ${strings('language')}`}
        showClose={MapperConstants.StatusMapper.enable}
      />
      <ScrollView contentContainerStyle={commonStyles.scrollView}>
        {DefaultArray.languages.map(res => {
          const selected = res.value === selectedLanguage.value
          return (
            <Cell
              onPress={() => setSelectedLanguage(res)}
              style={{ justifyContent: 'space-between' }}
              key={res.value}>
              <ThemeText style={t.capitalize}>{strings(res.name)} ( {res.name} )</ThemeText>
              <Radio active={selected} />
            </Cell>
          )
        })}
      </ScrollView>
      <View style={commonStyles.paddingHorizontalView}>
        <ThemeButton
          text='done'
          onClickHandler={handleLanguageUpdate}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  )
}

export default ChooseLanguage
