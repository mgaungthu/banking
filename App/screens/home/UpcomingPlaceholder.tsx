import React from 'react'
import {useSelector} from 'react-redux'
import {homeStyles as styles} from './styles'
import {View, Text} from 'react-native'
import {ThemeFunctions} from '../../utils'
import * as Images from '../../assets'
import {ImageContainer} from '../../components'
import {strings} from '../../strings'

const UpcomingPlaceholder = (props: any) => {
  const {isRtlApproach, appTheme} = useSelector(
    (state: any) => state.globalReducer,
  )

  return (
    <>
      <View
        style={[
          styles.carouselCard1,
          ThemeFunctions.tabBg(appTheme),
          styles.upcomingPlaceholder,
        ]}>
        <ImageContainer
          imagePath={Images.icLogo}
          imgStyle={{...styles.logo, height: 50}}
        />
        <Text
          style={[
            styles.textError,
            {color: ThemeFunctions.customText(appTheme)},
          ]}>
          {strings('no_announcement_available')}
        </Text>
      </View>
    </>
  )
}

export default UpcomingPlaceholder
