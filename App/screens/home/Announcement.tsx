import React, { useState} from 'react'
import {useSelector} from 'react-redux'
import {homeStyles as styles} from './styles'
import {Text, PixelRatio, View, Image} from 'react-native'
import {
  AppFunctions,
  SCREEN_HEIGHT,
  ThemeFunctions,
} from '../../utils'

import { MapperConstants} from '../../constants'

const Announcement = (props: any) => {
  const { appTheme, announcementMeta} = useSelector(
    (state: any) => state.globalReducer,
  )
  const {item} = props
  const [isImageNotFound, setIsImageNotFound] = useState(
    MapperConstants.StatusMapper.disable,
  )

  const getImgUrl = () => {
   return AppFunctions.getAssetUrl(item,announcementMeta)
  }

  return (
    <View style={styles.carouselCard}>
      {!getImgUrl()? (
        <View
          style={[
            styles.carouselImgView,
            {height: SCREEN_HEIGHT * 0.5},
            ThemeFunctions.tabBg(appTheme),
          ]}
        />
      ) : (
        <>
          <Image
            source={{uri: getImgUrl()}}
            onError={error => setIsImageNotFound(true)}
            style={[
              styles.carouselImg,
              {
                height: PixelRatio.getPixelSizeForLayoutSize(
                  SCREEN_HEIGHT * 0.18,
                ),
              },
            ]}
          />
          <View
            style={[
              styles.carouselImgView,
              {height: SCREEN_HEIGHT * 0.5},
              isImageNotFound
                ? {
                    ...ThemeFunctions.tabBg(appTheme),
                    position: 'absolute',
                  }
                : {position: 'absolute'},
            ]}></View>
        </>
      )}
      <View style={styles.bottomView}>
        <Text
          style={[
            ThemeFunctions.carouselTextHeading(appTheme),
            styles.carouselHeading,
          ]}>
          {item?.title}
        </Text>
        <Text
          style={[ThemeFunctions.carouselText(appTheme), styles.carouselText]}>
          {item.subTitle}
        </Text>
      </View>
    </View>
  )
}

export default Announcement
