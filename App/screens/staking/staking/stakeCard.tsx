import React, {useEffect, useState, useRef} from 'react';
import {Dimensions, Text, View} from 'react-native';
import * as styles from './styles';
import * as ThemeFunctions from '../../../utils/ThemeFunctions';
import {strings} from '../../../strings';
import {ThemeText, ThemeButton} from '../../../components';
import Colors from '../../../theme/Colors';

import _ from 'lodash';

import Image from 'react-native-fast-image';
import {DEFAULT_COIN_LOGO} from '../../../store/action/quickbuy/QuickBuyAction';
import {getImageFromURL} from '../../../utils/AppFunctions';
import {AppFunctions, navigate} from '../../../utils';
import {Screen} from '../../../enums';
import {ProgressBar, MD3Colors} from 'react-native-paper';

const StakeCard = ({data, appTheme}) => {
  const getImageUrl = (resp: any) => {
    return getImageFromURL(resp) || DEFAULT_COIN_LOGO;
  };

  const {width} = Dimensions.get('window');

  const getResponsiveFontSize = baseFontSize => {
    const screenWidth = width;
    const scaleFactor = screenWidth / 375; // 375 is a common base width (iPhone 6/7/8)
    return baseFontSize * scaleFactor;
  };

  const dynamicFontSize = getResponsiveFontSize(13); // Use base font size 16 as reference

  return (
    <View
      style={[
        styles.stakeCardStyle.stakeCardContainer,
        ThemeFunctions.setIEOCardBG(appTheme),
      ]}>
      {/* TITLE */}
      <View style={[styles.stakeCardStyle.stakeCardTitle]}>
        <View style={[styles.stakeCardStyle.stakeCardTitleTicker]}>
          <Image
            style={styles.stakeCardStyle.stakeCardTitleImage}
            source={{uri: getImageUrl(data.currency.symbol)}}
          />
          <ThemeText
            style={[
              styles.stakeCardStyle.stakeCardTitleText,
              {fontSize: dynamicFontSize},
            ]}>
            {data.currency.name} ({data.currency.symbol})
          </ThemeText>
        </View>

        {/* <View style={styles.stakeCardStyle.stakeCardPillCont}>
          <View
            style={[
              styles.stakeCardStyle.stakeCardTitleStatus,
              {
                backgroundColor: Colors.SolMain,
              },
            ]}>
            <Text style={[{textTransform: 'uppercase', color: 'white'}]}>
              Crypto
            </Text>
          </View>
        </View> */}
      </View>
      {/* DETAILS */}
      <View style={styles.stakeCardStyle.stakeCardDetails}>
        <View style={styles.stakeCardStyle.stakeCardDetailsApy}>
          <Text style={{color: Colors.currencyGreen, fontSize: 20}}>
            +{data.rate}%
          </Text>
          <Text
            style={{
              color: ThemeFunctions.customText(appTheme),
            }}>
            {strings(data.term)}
          </Text>
        </View>

        <View style={styles.stakeCardStyle.stakeCardDetailsReward}></View>
      </View>
      <Text
        style={{
          color: ThemeFunctions.customText(appTheme),
          fontSize: 18,
          fontWeight: '500',
        }}>
        Reward Pool:{' '}
        {AppFunctions.standardDigitConversion(data.reward_pool_size)}{' '}
        {data.currency.symbol}
      </Text>
      <View style={{width: '100%', height: 20, marginTop: 10}}>
        <ProgressBar
          progress={data.rewarded_percentage / 100}
          color={Colors.green}
          style={{backgroundColor: '#ddd', height: 10, borderRadius: 3}}
        />
      </View>

      <Text
        style={{
          color: ThemeFunctions.customText(appTheme),
          textAlign: 'center',
        }}>
        % {data.rewarded_percentage} Rewarded
      </Text>
      {/* STAKE BUTTON */}
      <View style={styles.stakeCardStyle.stakeCardBtnContainer}>
        <ThemeButton
          onClickHandler={() =>
            navigate(Screen.StakingFormScreen, {
              data,
            })
          }
          styleButton={styles.stakeCardStyle.stakeCardBtn}
          styleText={{textTransform: 'uppercase'}}
          text="Stake"
        />
      </View>
    </View>
  );
};

export default React.memo(StakeCard, _.isEqual);
