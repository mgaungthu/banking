import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  PixelRatio,
  Dimensions,
  Linking,
} from 'react-native';
import {
  navigate,
  ThemeFunctions,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  AppFunctions,
} from '../../../utils';
import Carousel, {Pagination} from 'react-native-x2-carousel';
import {homeStyles as styles} from '../../home/styles';
import FastImage from 'react-native-fast-image';
import {CurrentConfig} from '../../../../api_config';
import {commonStyles} from '../../../globalstyles/styles';

const IEODetialCarousel = ({detail}) => {
  //   console.log(detail?.slider);

  const RenderData = (data: any) => {
    // const keys = Object.keys(data);
    return (
      <View
        style={[{width: SCREEN_WIDTH * 1}, commonStyles.paddingHorizontalView]}
        key={data.id}>
        <FastImage
          source={{
            uri: `${CurrentConfig.base_url}${data.url}`,
            priority: FastImage.priority.normal,
          }}
          style={[
            styles.carouselImg,
            {
              height: (SCREEN_WIDTH * 10) / 21,
              borderRadius: 6,
              // aspectRatio: 8/10
            },
          ]}
          resizeMode="stretch"
        />
      </View>
    );
  };

  const objArr = detail?.slider.map((url, index) => {
    return {
      id: index + 1, // Adding 1 to start ids from 1 instead of 0
      url: url,
    };
  });

  return (
    <View>
      <Carousel
        loop={true}
        autoplay={true}
        autoplayInterval={3000}
        pagination={Pagination}
        renderItem={RenderData}
        data={objArr}
      />
    </View>
  );
};

export default IEODetialCarousel;
