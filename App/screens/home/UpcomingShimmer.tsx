import React from 'react'
import { useSelector} from 'react-redux'
import {homeStyles as styles} from './styles'
import {View} from 'react-native'
import {SCREEN_WIDTH, ThemeFunctions} from '../../utils'
// import Carousel from 'react-native-snap-carousel'
import Carousel, {Pagination} from 'react-native-x2-carousel'

const UpcomingShimmer = (props: any) => {
  const {isRtlApproach, appTheme} = useSelector(
    (state: any) => state.globalReducer,
  )
  const Upcoming = (props: any) => {
    return (
      <View style={[styles.carouselCard1, styles.custom]} key={Math.random()}>
        <View style={[styles.carouselImg1, ThemeFunctions.tabBg(appTheme)]} />
        <View style={{...styles.bottomView1}}>
          <View
            style={{
              backgroundColor: ThemeFunctions.tabBorderTopColor(appTheme),
              ...styles.text,
            }}
          />
          <View
            style={{
              backgroundColor: ThemeFunctions.tabBorderTopColor(appTheme),
              ...styles.text,
            }}
          />
        </View>
      </View>
    )
  }

  return (
    <>
     <Carousel
        pagination={Pagination}
        renderItem={Upcoming}
        data={[1, 2, 3, 4]}
      />
      {/* <Carousel
        layoutCardOffset={9}
        firstItem={1}
        layout='stack'
        data={[1, 2]}
        keyExtractor={(item: any) => Math.random()?.toString()}
        renderItem={({item, index}) => <Upcoming item={item} />}
        sliderWidth={SCREEN_WIDTH - 10}
        itemWidth={SCREEN_WIDTH * 0.87}
        containerCustomStyle={
          isRtlApproach
            ? {paddingTop: 10, marginRight: -8}
            : {paddingTop: 10, marginLeft: -8}
        }
      /> */}
    </>
  )
}

export default UpcomingShimmer
