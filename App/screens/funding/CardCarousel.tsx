import React, {useEffect, useState} from 'react';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import Carousel, {Pagination} from 'react-native-x2-carousel';
import {AppColor, Loader, Screen} from '../../enums';
import {useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {navigate, SCREEN_WIDTH, ThemeFunctions} from '../../utils';
import {homeStyles} from '../home/styles';
import {CurrentConfig} from '../../../api_config';
import {useDispatch} from 'react-redux';
import {PaymentActions} from '../../store';

const CardCarousel = () => {
  const dispatch = useDispatch<any>();

  const appData = useSelector((state: any) => state.appReducer);
  const {appColor} = useSelector((state: any) => state.globalReducer);

  const {activeCardList} = useSelector((state: any) => state.paymentReducer);

  useEffect(() => {
    if (activeCardList.length === 0) {
      dispatch(PaymentActions.getActiveCardList());
    }
  }, []);

  const RenderVal = (data: any) => {
    return (
      <View
        style={[
          homeStyles.carouselCard,
          homeStyles.custom,
          {width: SCREEN_WIDTH - 38, paddingBottom: 30, paddingHorizontal: 25},
        ]}
        key={data?.id}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigate(Screen.ActiveCardListScreen)}>
          <FastImage
            source={{
              uri: `${CurrentConfig.base_url}${data.card_type.image.signed_url}`,
              priority: FastImage.priority.normal,
            }}
            style={[
              homeStyles.carouselImg,
              {
                height: (SCREEN_WIDTH * 5) / 9,
                //   height: 150,
                //   aspectRatio: 8 / 10,
              },
            ]}
            resizeMode="stretch"
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{justifyContent: 'center'}}>
      {appData.loading === Loader.ACTIVE_CARD ? (
        <View
          style={[
            homeStyles.carouselCard,
            homeStyles.custom,
            {
              paddingVertical: 10,
              width: SCREEN_WIDTH - 38,
              paddingHorizontal: 25,
            },
          ]}>
          <ActivityIndicator
            color={ThemeFunctions.getColor(appColor)}
            style={{
              height: SCREEN_WIDTH / 9,
            }}
          />
        </View>
      ) : (
        <Carousel
          loop={true}
          autoplay={true}
          autoplayInterval={3000}
          pagination={Pagination}
          renderItem={RenderVal}
          data={activeCardList}
        />
      )}
    </View>
  );
};

export default CardCarousel;
