import React from 'react';
import {useSelector} from 'react-redux';
import {homeStyles as styles} from './styles';
import {View} from 'react-native';
import {ThemeFunctions, SCREEN_HEIGHT, SCREEN_WIDTH} from '../../utils';
import * as Images from '../../assets';
import {Image} from 'react-native';
// import Carousel from 'react-native-snap-carousel'
import Carousel, {Pagination} from 'react-native-x2-carousel';

const AnnouncementShimmer = (props: any) => {
  const {isRtlApproach, appTheme, appColor} = useSelector(
    (state: any) => state.globalReducer,
  );
  const Announcement = (data: any) => {
    return (
      <View style={[styles.carouselCard, styles.custom]} key={Math.random()}>
        <View
          style={[
            styles.carouselImgView,
            {height: (SCREEN_WIDTH * 10) / 9},
            ThemeFunctions.setBackground(appTheme),
            {display: 'flex'},
          ]}>
          <Image
            style={{
              width: 100,
              height: 100,
              resizeMode: 'contain',
              alignSelf: 'center',
              marginVertical: '50%',
              tintColor: ThemeFunctions.getColor(appColor),
            }}
            source={Images.icLogoPlain}
          />
        </View>
        <View style={styles.bottomView}>
          <View
            style={{
              backgroundColor: ThemeFunctions.getColor(appColor),
              ...styles.text,
            }}
          />
          <View
            style={{
              backgroundColor: ThemeFunctions.getColor(appColor),
              ...styles.text,
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <>
      <Carousel pagination={Pagination} renderItem={Announcement} data={[{}]} />
      {/* <Carousel
        layoutCardOffset={9}
        firstItem={3}
        layout='stack'
        data={[1, 2, 3, 4]}
        keyExtractor={(item: any) => Math.random()?.toString()}
        renderItem={({item, index}) => <Announcement item={item} />}
        sliderWidth={SCREEN_WIDTH - 10}
        itemWidth={SCREEN_WIDTH * 0.87}
        containerCustomStyle={
          isRtlApproach
            ? {paddingTop: 10, marginRight: -8}
            : {paddingTop: 10, marginLeft: -8}
        }
      /> */}
    </>
  );
};

export default AnnouncementShimmer;
