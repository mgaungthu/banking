import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  navigate,
  ThemeFunctions,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  AppFunctions,
} from '../../utils';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  PixelRatio,
  Dimensions,
  Linking,
} from 'react-native';
import AnnouncementShimmer from './AnnouncementShimmer';
import AnnouncementPlaceholder from './AnnouncementPlaceholder';
import {AppColor, Loader, Screen} from '../../enums';
import Carousel, {Pagination} from 'react-native-x2-carousel';
import {homeStyles as styles} from './styles';
import {ImageContainer, ThemeText} from '../../components';
import FastImage from 'react-native-fast-image';
import * as Images from '../../assets';
import {CurrentConfig} from '../../../api_config';

const AnnouncementCarousel = ({
  appTheme,
  announcementMeta,
  appColor,
  announcements,
}) => {
  const announcementArr = () => {
    return announcements;
  };

  const getImgUrl = data => {
    return `${CurrentConfig.base_url}${data.image.signed_url}`;
  };

  const MoreInfo = ({link}: {link?: string}) => {
    if (!link) return <></>;

    return (
      <TouchableOpacity
        style={styles.moreInfoContainer}
        onPress={() => Linking.openURL(link)}>
        <ImageContainer
          imagePath={Images.ic_more_info_w}
          imgStyle={[
            styles.moreInfo,
            {tintColor: ThemeFunctions.get3WayColor(appColor)},
          ]}
        />
      </TouchableOpacity>
    );
  };

  const Announcement = (data: any) => {
    const imgUrl = getImgUrl(data);

    const {width} = Dimensions.get('window');
    const aspectRatio = 1025 / 550; // Maintaining 1025x550 ratio
    const height = width / aspectRatio; // Calculate height dynamically

    return (
      <View style={[styles.carouselCard, styles.custom]} key={data?.id}>
        {!imgUrl ? (
          <View
            style={[
              styles.carouselImgView,
              {height: SCREEN_HEIGHT * 0.5},
              // {height: 150},
              ThemeFunctions.tabBg(appTheme),
            ]}
          />
        ) : (
          <View style={[{height}, {borderRadius: 6}]}>
            <FastImage
              source={{
                uri: imgUrl,
                priority: FastImage.priority.normal,
              }}
              style={[
                styles.carouselImg,
                {
                  height: (SCREEN_WIDTH * 4.85) / 9,
                  // height: 150,
                  // aspectRatio: 8/10
                },
              ]}
              resizeMode="stretch"
            />
          </View>
        )}
        <View style={styles.bottomView}>
          <Text
            adjustsFontSizeToFit={true}
            style={[
              ThemeFunctions.carouselTextHeading(appTheme),
              styles.carouselHeading,
            ]}>
            {data?.title}
          </Text>
        </View>
      </View>
    );
  };

  let announcementArrObj = announcementArr();
  let announcementElement = <AnnouncementShimmer />;

  if (announcementArrObj?.length > 0) {
    announcementElement = (
      <Carousel
        loop={true}
        autoplay={true}
        autoplayInterval={3000}
        pagination={Pagination}
        renderItem={Announcement}
        data={announcementArrObj}
      />
    );
  } else {
    announcementElement = <AnnouncementPlaceholder />;
  }

  return announcementElement;
};

export default React.memo(AnnouncementCarousel);
