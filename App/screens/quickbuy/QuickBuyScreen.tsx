import React, {useEffect, useState, useRef} from 'react'
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import {commonStyles} from '../../globalstyles/styles'
import * as Images from '../../assets'
import {Background, Header, ImageContainer} from '../../components'
import {strings} from '../../strings'
import {accountStyles as styles} from '../account/styles'
import {DefaultArray} from '../../constants'

const QuickBuyScreen = (props: any) => {
  const {
    navigation: {navigate},
  } = props
  const handleNavigation = (res: any) => () => {
    navigate(res.route)
  }

  return (
    <SafeAreaView style={commonStyles.tabSafeView}>
      <Background imagePath={Images.BgLogin} />
      <Header title={strings('quick_buy')} />
      <ScrollView>
        {DefaultArray.quickBuySettings.map(res => {
          return (
            <TouchableOpacity
              activeOpacity={1}
              key={res.id}
              style={styles.item}
              onPress={handleNavigation(res)}>
              <View style={styles.leftView}>
                <ImageContainer
                  imagePath={res.icon}
                  imgStyle={styles.leftIcon}
                />
                <Text style={styles.label}>{strings(res.title)}</Text>
              </View>
              <ImageContainer
                imagePath={Images.IcForwardArrow}
                imgStyle={styles.rightIcon}
              />
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </SafeAreaView>
  )
}

export default QuickBuyScreen
