import React from 'react'
import {View, Text, TouchableOpacity, TextBase} from 'react-native'
import {commonStyles} from '../../globalstyles/styles'
import {Icon} from 'react-native-elements'
import {goBack} from '../../utils'
import {t} from 'react-native-tailwindcss'

const UiHeader = ({
  title,
  handleBack,
  showClose = true,
  showBack = true,
  iconColor = '#000',
  titleStyle = {}
}: any) => {
  const handleGoBack = () => {
    handleBack ? handleBack() : goBack()
  }
  return (
    <View style={commonStyles.uiheader}>
      {showBack ? (
        <TouchableOpacity onPress={handleGoBack}>
          <Icon name='arrow-back' type='material' size={22} color={iconColor} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity />
      )}
      <Text
        adjustsFontSizeToFit={true}
        style={[commonStyles.headerText, {...t.textBase, ...t.textBlack}, titleStyle]}>
        {title}
      </Text>
      {showClose ? (
        <TouchableOpacity onPress={handleGoBack}>
          <Icon name='close' type='material' size={25} color={iconColor} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity />
      )}
    </View>
  )
}

export default UiHeader
