import React from 'react'
import {View, Text} from 'react-native'
import {noteStyles as styles} from './styles'

import {strings} from '../../strings'
import {ThemeFunctions} from '../../utils'

const Note = ({subtitle, appTheme, isRadius = true}: any) => {
  return (
    <View
      style={[
        styles.noteView,
        ThemeFunctions.getCardColor(appTheme),
        isRadius ? {borderRadius: 5} : {},
      ]}>
      <Text style={[styles.note, {color: ThemeFunctions.customText(appTheme)}]}>
        {strings('note')}
      </Text>
      <Text
        style={[styles.subtitle, {color: ThemeFunctions.customText(appTheme)}]}>
        {subtitle}
      </Text>
    </View>
  )
}

export default Note
