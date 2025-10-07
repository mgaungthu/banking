import React from 'react';
import {useSelector} from 'react-redux';
import {homeStyles as styles} from './styles';
import {View, Text, Image} from 'react-native';
import {ThemeFunctions, SCREEN_WIDTH} from '../../utils';
import {strings} from '../../strings';
import * as Images from '../../assets';
import {ImageContainer, ThemeText} from '../../components';
import {AppColor} from '../../enums';

const AnnouncementShimmer = (props: any) => {
  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer);

  const _getLogo = () => {
    switch (appColor) {
      case AppColor.pink:
        return Images.ic_app_pink;
      case AppColor.green:
        return Images.ic_app_green;
    }
    return Images.ic_app_black;
  };

  return (
    <>
      <View
        style={[
          styles.carouselCard,
          styles.custom,
          ThemeFunctions.setIEOCardBG(appTheme),
        ]}>
        <View
          style={[
            {
              height: (SCREEN_WIDTH * 10) / 28,
              // height: 150,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            },
            // ThemeFunctions.setIEOCardBG(appTheme),
          ]}>
          {/* <ImageContainer
            imagePath={_getLogo()}
            imgStyle={{...styles.logo, height: 50, marginBottom: 20}}
          /> */}
          <ThemeText
            style={[
              styles.textError,
              {color: ThemeFunctions.customText(appTheme)},
            ]}>
            {strings('no_announcement_available')}
          </ThemeText>
        </View>

        <View style={[styles.bottomView]}>
          <Text
            adjustsFontSizeToFit={true}
            style={[
              ThemeFunctions.carouselTextHeading(appTheme),
              styles.carouselHeading,
            ]}></Text>

          <Text
            adjustsFontSizeToFit={true}
            style={[
              ThemeFunctions.carouselText(appTheme),
              styles.carouselText,
            ]}></Text>
        </View>
      </View>

      {/* <Image
        source={require('./totest.jpg')}
        style={{
          borderRadius: 6,
          width: '100%',
          height: (SCREEN_WIDTH * 10) / 20,
          resizeMode: 'stretch',
        }}
      /> */}
    </>
  );
};

export default AnnouncementShimmer;
