import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  Linking,
  ScrollView,
  PixelRatio,
  Dimensions,
  Platform,
  FlatList,
  Animated,
  Keyboard,
} from 'react-native';
import {useSelector} from 'react-redux';
import {ThemeText} from '../../../components';
import {ONE_DAY_MS} from '../../../constants/AppConstants';
import {strings} from '../../../strings';
import {ThemeFunctions} from '../../../utils';
import {FormatDateTsTime, FormatNumber} from '../../../utils/AppFunctions';
import _ from 'lodash';

import * as styles from './styles';
import Colors from '../../../theme/Colors';
import * as Images from '../../../assets';

import Image from 'react-native-fast-image';
import {REDEEM_STATUS, UNSTAKE_STATUS} from '../common';
import Navigation from '../../../utils/Navigation';
import {Screen} from '../../../enums';

const PoolCard = (props: any) => {
  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer);

  const item = props.item;

  let receivables = '--';

  if (!_.isEmpty(item.unstake_waiting)) {
    const amount = item.unstake_waiting.reduce(
      (total, item) => (total += Number(item.amount)),
      0,
    );

    receivables = `${FormatNumber(amount)} ${item.coin}`;
  }

  let interest_end_date = '--',
    expandedDate,
    unstakeButton,
    redeemButton;

  if (item.interest_end_date) {
    interest_end_date = FormatDateTsTime(parseFloat(item.interest_end_date));

    expandedDate = (
      <View>
        <View style={[styles.poolCard.infoCardContainerRow]}>
          <View style={[styles.poolCard.infoCardContainerRowImageContainer]}>
            <Image
              resizeMode={'contain'}
              style={styles.poolCard.infoCardContainerRowImage}
              source={Images.ic_diamond}
              tintColor={Colors.orange}
            />
          </View>

          <View style={[styles.poolCard.infoCardContainerRowTextContainer]}>
            <ThemeText>{strings('pledge_date')}</ThemeText>
            <ThemeText>
              {FormatDateTsTime(parseFloat(item.user_pledge_date))}
            </ThemeText>
          </View>
        </View>

        <View style={[styles.poolCard.infoCardContainerRow]}>
          <View style={[styles.poolCard.infoCardContainerRowImageContainer]}>
            <Image
              resizeMode={'contain'}
              style={styles.poolCard.infoCardContainerRowImage}
              source={Images.ic_diamond}
              tintColor={Colors.orange}
            />
          </View>

          <View style={[styles.poolCard.infoCardContainerRowTextContainer]}>
            <ThemeText>{strings('activation_date')}</ThemeText>
            <ThemeText>
              {FormatDateTsTime(parseFloat(item.active_reward_date))}
            </ThemeText>
          </View>
        </View>

        <View style={[styles.poolCard.infoCardContainerRow]}>
          <View style={[styles.poolCard.infoCardContainerRowImageContainer]}>
            <Image
              resizeMode={'contain'}
              style={styles.poolCard.infoCardContainerRowImage}
              source={Images.ic_diamond}
              tintColor={Colors.orange}
            />
          </View>

          <View style={[styles.poolCard.infoCardContainerRowTextContainer]}>
            <ThemeText>{strings('end_date')}</ThemeText>
            <ThemeText>
              {FormatDateTsTime(parseFloat(item.interest_end_date))}
            </ThemeText>
          </View>
        </View>
      </View>
    );
  }

  if (item.unstake_status === UNSTAKE_STATUS.UNSTAKE) {
    unstakeButton = (
      <TouchableOpacity
        style={[
          styles.poolCard.unstakeButtonContainer,
          {backgroundColor: ThemeFunctions.getColor(appColor)},
        ]}
        onPress={() =>
          Navigation.navigate(Screen.StakingUnstake, {detail: item})
        }>
        <ThemeText style={styles.poolCard.buttonText}>
          {strings('unstake')}
        </ThemeText>
      </TouchableOpacity>
    );
  } else {
    unstakeButton = (
      <TouchableOpacity
        disabled={true}
        style={[
          styles.poolCard.unstakeButtonContainer,
          {backgroundColor: Colors.gray},
        ]}>
        <ThemeText style={styles.poolCard.buttonText}>
          {strings('unstake')}
        </ThemeText>
      </TouchableOpacity>
    );
  }

  if (item.redeem_status === REDEEM_STATUS.REDEEM) {
    redeemButton = (
      <TouchableOpacity
        style={[
          styles.poolCard.redeeemButtonContainer,
          {backgroundColor: ThemeFunctions.getColor(appColor)},
        ]}
        onPress={() =>
          Navigation.navigate(Screen.StakingRedeem, {detail: item})
        }>
        <ThemeText style={styles.poolCard.buttonText}>
          {strings('redeem')}
        </ThemeText>
      </TouchableOpacity>
    );
  } else {
    redeemButton = (
      <View
        style={[
          styles.poolCard.redeeemButtonContainer,
          {backgroundColor: Colors.gray},
        ]}>
        <TouchableOpacity disabled={true}>
          <ThemeText style={styles.poolCard.buttonText}>
            {strings('redeem')}
          </ThemeText>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.poolCard.container,
        ThemeFunctions.setIEOCardBG(appTheme),
      ]}>
      <View
        style={[
          styles.poolCard.row,
          {
            borderColor: ThemeFunctions.customText(appTheme),
            borderBottomWidth: 1,
          },
        ]}>
        <View style={[styles.poolCard.left]}>
          <ThemeText style={{textTransform: 'capitalize'}}>
            {strings('asset')}
          </ThemeText>
        </View>

        <View style={[styles.poolCard.right]}>
          <ThemeText>{props.item.coin}</ThemeText>
        </View>
      </View>

      <View
        style={[
          styles.poolCard.row,
          {
            borderColor: ThemeFunctions.customText(appTheme),
            borderBottomWidth: 1,
          },
        ]}>
        <View style={[styles.poolCard.left]}>
          <ThemeText style={{textTransform: 'capitalize'}}>
            {strings('reward_asset')}
          </ThemeText>
        </View>

        <View style={[styles.poolCard.right]}>
          <ThemeText>{props.item.asset_reward}</ThemeText>
        </View>
      </View>

      <View
        style={[
          styles.poolCard.row,
          {
            borderColor: ThemeFunctions.customText(appTheme),
            borderBottomWidth: 1,
          },
        ]}>
        <View style={[styles.poolCard.left]}>
          <ThemeText style={{textTransform: 'capitalize'}}>
            {strings('amount')}
          </ThemeText>
        </View>

        <View style={[styles.poolCard.right]}>
          <ThemeText>{FormatNumber(props.item.total_amount)}</ThemeText>
        </View>
      </View>

      <View
        style={[
          styles.poolCard.row,
          {
            borderColor: ThemeFunctions.customText(appTheme),
            borderBottomWidth: 1,
          },
        ]}>
        <View style={[styles.poolCard.left]}>
          <ThemeText style={{textTransform: 'capitalize'}}>
            {strings('end_date')}
          </ThemeText>
        </View>

        <View style={[styles.poolCard.right]}>
          <ThemeText>{interest_end_date}</ThemeText>
        </View>
      </View>

      <View
        style={[
          styles.poolCard.row,
          {
            borderColor: ThemeFunctions.customText(appTheme),
            borderBottomWidth: 1,
          },
        ]}>
        <View style={[styles.poolCard.left]}>
          <ThemeText style={{textTransform: 'uppercase'}}>
            APR
          </ThemeText>
        </View>

        <View style={[styles.poolCard.right]}>
          <ThemeText>{props.item.apy_shown} %</ThemeText>
        </View>
      </View>

      <View
        style={[
          styles.poolCard.row,
          {
            borderColor: ThemeFunctions.customText(appTheme),
            borderBottomWidth: 1,
          },
        ]}>
        <View style={[styles.poolCard.left]}>
          <ThemeText style={{textTransform: 'capitalize'}}>
            {strings('duration')}
          </ThemeText>
        </View>

        <View style={[styles.poolCard.right]}>
          <ThemeText>
            {parseFloat(props.item.day_duration) / ONE_DAY_MS} {strings('days')}
          </ThemeText>
        </View>
      </View>

      <View
        style={[
          styles.poolCard.row,
          {
            borderColor: ThemeFunctions.customText(appTheme),
            borderBottomWidth: 1,
          },
        ]}>
        <View style={[styles.poolCard.left]}>
          <ThemeText style={{textTransform: 'capitalize'}}>
            {strings('accrue_days')}
          </ThemeText>
        </View>

        <View style={[styles.poolCard.right]}>
          <ThemeText>
            {FormatNumber(props.item.accure_days)} {strings('days')}
          </ThemeText>
        </View>
      </View>

      <View
        style={[
          styles.poolCard.row,
          {
            borderColor: ThemeFunctions.customText(appTheme),
            borderBottomWidth: 1,
          },
        ]}>
        <View style={[styles.poolCard.left]}>
          <ThemeText style={{textTransform: 'capitalize'}}>
            {strings('receivables')}
          </ThemeText>
        </View>

        <View style={[styles.poolCard.right]}>
          <ThemeText>{receivables}</ThemeText>
        </View>
      </View>

      <View
        style={[
          styles.poolCard.row,
          {
            borderColor: ThemeFunctions.customText(appTheme),
            borderBottomWidth: 1,
          },
        ]}>
        <View style={[styles.poolCard.left]}>
          <ThemeText style={{textTransform: 'capitalize'}}>
            {strings('est_accrued_rewards')}
          </ThemeText>
        </View>

        <View style={[styles.poolCard.right]}>
          <ThemeText adjustsFontSizeToFit={true}>
            {FormatNumber(props.item.estimate_reward)} {props.item.asset_reward}
          </ThemeText>
        </View>
      </View>


      <View
        style={[
          styles.poolCard.row,
          {
            borderColor: ThemeFunctions.customText(appTheme),
            borderBottomWidth: 1,
          },
        ]}>
        <View style={[styles.poolCard.left]}>
          <ThemeText style={{textTransform: 'capitalize'}}>
            {strings('redeemable_rewards')}
          </ThemeText>
        </View>

        <View style={[styles.poolCard.right]}>
          <ThemeText adjustsFontSizeToFit={true}>
            {FormatNumber(props.item.drip_reward)} {props.item.asset_reward}
          </ThemeText>
        </View>
      </View>

      <View style={[styles.poolCard.row]}>
        {unstakeButton}
        {redeemButton}
      </View>
    </View>
  );
};

export default PoolCard;
