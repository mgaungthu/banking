import React from 'react'
import {ImageContainer} from '../../../components'
import {depositStyles as styles} from '../styles'
import * as Images from '../../../assets'
import {Text, View} from 'react-native'
import {useSelector} from 'react-redux'
import {ThemeFunctions} from '../../../utils'

const DepositPlaceholder = (props: any) => {
  const {appTheme} = useSelector((state: any) => state.globalReducer)

  return (
    <View style={styles.placeholderView}>
      <ImageContainer
        imagePath={Images.IcWalletImg}
        imgStyle={styles.placeholderImg}
      />
      <Text
        style={[
          styles.placeholder,
          {color: ThemeFunctions.customText(appTheme)},
        ]}>
        {props.message}
      </Text>
    </View>
  )
}

export default DepositPlaceholder
