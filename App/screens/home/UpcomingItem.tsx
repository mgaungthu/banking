import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {homeStyles as styles} from './styles'
import {Text, View, Image} from 'react-native'
import {ThemeFunctions,AppFunctions} from '../../utils'
import {MapperConstants} from '../../constants'

const Upcoming = (props: any) => {
  const {announcementMeta, appTheme} = useSelector(
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
    <View style={styles.carouselCard1}>
      {!getImgUrl()? (
        <View style={[styles.carouselImg1, ThemeFunctions.tabBg(appTheme)]} />
      ) : (
        <>
          <Image
            source={{uri: getImgUrl()}}
            onError={error => setIsImageNotFound(true)}
            style={[styles.carouselImg]}
          />
          <View
            style={[
              styles.carouselImgView,
              isImageNotFound
                ? {
                    ...ThemeFunctions.tabBg(appTheme),
                    position: 'absolute',
                  }
                : {position: 'absolute'},
            ]}>
          </View>
        </>
      )}
      <View style={{...styles.bottomView1}}>
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

export default Upcoming
