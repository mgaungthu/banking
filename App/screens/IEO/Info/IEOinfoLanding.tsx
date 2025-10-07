import React, {useEffect, useState} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import RenderHtml from 'react-native-render-html';

import {
  Header,
  LoadingSpinner,
  Space,
  ThemeButton,
  ThemeText,
} from '../../../components';
import OpenURLButton from '../../../components/ui/OpenUrlButton';
import StatusView from '../../../components/ui/StatusButton';

import {ieoDetailsSelector} from '../../../store/selectors/ieoSelector';
import {SCREEN_WIDTH, ThemeFunctions} from '../../../utils';
import {styles} from './IEOinfo_styles';
import {QuickBuyActions} from '../../../store';
import Link from '../../../components/hoc/Link';

import {strings} from '../../../strings';
import Colors from '../../../theme/Colors';
import {commonStyles, rtlStyles} from '../../../globalstyles/styles';
import {DeriveStatus} from '../common';
import {getImageUrlFromAsset} from '../../../utils/AppFunctions';
import {DEFAULT_COIN_LOGO} from '../../../store/action/quickbuy/QuickBuyAction';
import {CurrentConfig} from '../../../../api_config';
import ProgressBar from './ProgressBar';

const IEOinfo = (props: any) => {
  // const {id} = props.route.params;
  const {
    description,
    image,
    title,
    startDate,
    endDate,
    socials,
    allowedCurrencies,
    fundraiseGoal,
    softCap,
    progress,
    onPress,
  } = props;

  const {appTheme, assetMetadata, appColor, isRtlApproach} = useSelector(
    (state: any) => state.globalReducer,
  );

  const isLoading = false;

  // const dispatch = useDispatch();

  // const navToBuy = () => {
  //   navigation.navigate('IEObuy');
  // };

  // const handleBack = () => {
  //   navigation.goBack();
  // };

  const formatDate = dateString => {
    // Split the date string by '/'
    const [day, month, year] = dateString.split('/');

    // Rearrange into YYYY-MM-DD format
    return `${year}-${month}-${day}`;
  };

  const getImageUrl = (resp: any) => {
    return getImageUrlFromAsset(resp) || DEFAULT_COIN_LOGO;
  };

  const getMainIndex = img => {
    const lastIndex = img.length - 1;

    return lastIndex;
  };

  const rightAlignView = () => {
    return [
      {alignItems: 'flex-end'},
      isRtlApproach ? rtlStyles.alignStart : rtlStyles.alignEnd,
    ];
  };

  const reverseDirection = () => {
    return [
      ThemeFunctions.cardInputBorderColor(appTheme),
      isRtlApproach ? rtlStyles.reverseRow : {},
      {paddingBottom: 10},
    ];
  };

  return (
    <View>
      <Space height={10} />
      {isLoading ? (
        <View
          style={[{height: '100%'}, ThemeFunctions.setBackground(appTheme)]}>
          <LoadingSpinner
            color={ThemeFunctions.getColor(appColor)}
            size="large"
          />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[
            styles.listContainer,
            ThemeFunctions.setBackground(appTheme),
          ]}>
          <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={[styles.block, ThemeFunctions.setIEOCardBG(appTheme)]}>
            <View
              style={[
                styles.titleContainer,
                isRtlApproach ? rtlStyles.reverseRow : {},
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                },
              ]}>
              <Text
                style={[styles.title, ThemeFunctions.getTextColor(appTheme)]}>
                {title}
              </Text>
              <Image
                style={styles.iconImage}
                source={{
                  uri: getImageUrl(allowedCurrencies[0].name),
                }}
              />
            </View>
            <View style={styles.textContainer}>
              <View
                style={[
                  commonStyles.rowItem,
                  commonStyles.alignCenter,
                  commonStyles.justifySpace,
                ]}>
                <View
                  style={[
                    styles.listItem,
                    isRtlApproach ? rtlStyles.reverseRow : {},
                  ]}>
                  <Text
                    style={[
                      styles.dateText,
                      ThemeFunctions.getTextColor(appTheme),
                    ]}>
                    {strings('start_date')}:
                  </Text>
                  <Text
                    style={[
                      styles.dateText,
                      ThemeFunctions.getTextColor(appTheme),
                    ]}>
                    {formatDate(startDate)}
                  </Text>
                </View>
                <View
                  style={[
                    styles.listItem,
                    isRtlApproach ? rtlStyles.reverseRow : {},
                  ]}>
                  <Text
                    style={[
                      styles.dateText,
                      ThemeFunctions.getTextColor(appTheme),
                    ]}>
                    {strings('end_date')}:
                  </Text>
                  <Text
                    style={[
                      styles.dateText,
                      ThemeFunctions.getTextColor(appTheme),
                    ]}>
                    {formatDate(endDate)}
                  </Text>
                </View>
              </View>

              <Image
                style={{width: '100%', height: 180}}
                source={{
                  uri: CurrentConfig.base_url + image[getMainIndex(image)],
                }}
              />

              <View
                style={[
                  styles.listItem,
                  isRtlApproach ? rtlStyles.reverseRow : {},
                  {marginTop: 10},
                ]}>
                <Text
                  style={[styles.text, ThemeFunctions.getTextColor(appTheme)]}>
                  {description}
                </Text>
              </View>

              <ProgressBar
                // color="gray"
                progress={progress}
                // style={{borderRadius: 10, height: 30}}
              />

              <View
                style={[
                  reverseDirection(),
                  styles.titleContainer,
                  isRtlApproach ? rtlStyles.reverseRow : {},
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                  },
                ]}>
                <View>
                  <Text
                    style={[
                      {fontSize: 14},
                      ThemeFunctions.getTextColor(appTheme),
                    ]}>
                    Fundraise Goal
                  </Text>
                  <Text
                    style={[
                      {fontSize: 14},
                      ThemeFunctions.getTextColor(appTheme),
                    ]}>
                    {fundraiseGoal}
                  </Text>
                </View>
                <View style={rightAlignView()}>
                  <Text
                    style={[
                      {fontSize: 14},
                      ThemeFunctions.getTextColor(appTheme),
                    ]}>
                    Soft Cap
                  </Text>
                  <Text
                    style={[
                      {fontSize: 14},
                      ThemeFunctions.getTextColor(appTheme),
                    ]}>
                    {softCap}
                  </Text>
                </View>
              </View>

              <View
                style={[
                  styles.socialNetworks,
                  commonStyles.rowItem,
                  commonStyles.alignCenter,
                  {justifyContent: 'flex-end', gap: 100},
                ]}>
                <View style={{marginRight: 5}}>
                  <Link url={socials.twitter_link}>
                    {socialIcons.find(item => item.name === 'twitter')?.image}
                  </Link>
                </View>
                <View style={{marginRight: 5}}>
                  <Link url={socials.facebook}>
                    {socialIcons.find(item => item.name === 'facebook')?.image}
                  </Link>
                </View>
                <View style={{marginRight: 5}}>
                  <Link url={socials.telegram}>
                    {socialIcons.find(item => item.name === 'telegram')?.image}
                  </Link>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

export default IEOinfo;

const socialIcons = [
  {
    name: 'facebook',
    image: (
      <Image
        style={styles.socialIcon}
        source={require('../../../assets/icons/social/facebook.png')}
      />
    ),
  },
  {
    name: 'twitter',
    image: (
      <Image
        style={styles.socialIcon}
        source={require('../../../assets/icons/social/twitter.png')}
      />
    ),
  },
  {
    name: 'telegram',
    image: (
      <Image
        style={styles.socialIcon}
        source={require('../../../assets/icons/social/telegram.png')}
      />
    ),
  },
  {
    name: 'medium',
    image: (
      <Image
        style={styles.socialIcon}
        source={require('../../../assets/icons/social/medium.png')}
      />
    ),
  },
  {
    name: 'reddit',
    image: (
      <Image
        style={styles.socialIcon}
        source={require('../../../assets/icons/social/reddit.png')}
      />
    ),
  },
];
