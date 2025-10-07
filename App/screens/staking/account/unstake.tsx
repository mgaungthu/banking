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
  TextInput,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {CheckBox} from 'react-native-elements';

import {commonStyles} from '../../../globalstyles/styles';
import * as styles from './styles';
import * as ThemeFunctions from '../../../utils/ThemeFunctions';
import {
  FormatDateTsTime,
  FormatNumber,
  FormatToAbbreviateNumber,
  replaceCost,
} from '../../../utils/AppFunctions';
import Header from '../../../components/ui/Header';
import {homeStyles} from '../../home/styles';
import {strings} from '../../../strings';
import Navigation from '../../../utils/Navigation';
import {AppColor, Loader, Screen} from '../../../enums';
import IconVector from '../../../components/ui/IconVector';
import {
  ThemeText,
  SearchBar,
  LoadingSpinner,
  DismissKeyboardView,
  ThemeButton,
} from '../../../components';
import Colors from '../../../theme/Colors';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

import Image from 'react-native-fast-image';
import {DEFAULT_COIN_LOGO} from '../../../store/action/quickbuy/QuickBuyAction';
import PoolCard from './poolCard';
import {makeGetRequest} from '../../../services/StakingApiService';
import {APIConstants} from '../../../constants';
import {showToast} from '../../../utils/GenericUtils';
import {QuickBuyActions, StakingActions} from '../../../store';
import {makeRequest} from '../../../services/StakingApiService';

import * as Images from '../../../assets';
import {ONE_DAY_MS} from '../../../constants/AppConstants';
import {UNSTAKE_STATUS} from '../common';

const Unstake = (props: any) => {
  const {detail = {}} = props?.route?.params;
  const [check, setCheck] = useState(false);
  const [isLoadingUnstake, setIsloadingUnstake] = useState(false);
  const [unstakeAmount, setUnstakeAmount] = useState(0);
  const dispatch = useDispatch();

  const quickBuyData = useSelector((state: any) => state.quickBuyReducer);
  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer);

  useEffect(() => {
    dispatch(QuickBuyActions.fundsList());
  }, []);

  const unstakeFunds = () => {
    setIsloadingUnstake(true);
    makeRequest(
      'POST',
      APIConstants.STAKING_ACCOUNT_UNSTAKE,
      {},
      {
        amount: unstakeAmount,
        stake_id: detail.stake_id,
      },
    )
      .then(res => {
        const {status, message} = res;

        let type = 'error';

        if (status == 200) {
          type = 'success';
        }

        showToast('Staking', message, type);
        dispatch(QuickBuyActions.fundsList());
        dispatch(StakingActions.GetCurrentEarnings());
        dispatch(StakingActions.GetCurrentStaked());
      })
      .catch(e => {
        console.log(e);
        showToast('Unstake', 'error while unstaking', 'error');
      })
      .finally(() => {
        setIsloadingUnstake(false);
      });
  };

  let balance = '0';

  if (quickBuyData && quickBuyData.fundsList) {
    const assetBalance = quickBuyData.fundsList.filter(
      x => x.currencyName === detail.coin,
    );

    if (assetBalance && assetBalance.length > 0) {
      balance = assetBalance[0].balance;
    }
  }

  let total = detail.total_amount;

  let unstakeNote,
    unstakeButton = (
      <ThemeButton
        onClickHandler={() => unstakeFunds()}
        styleButton={styles.unstakeScreen.unstakeButton}
        text={strings('unstake')}
        styleText={{textTransform: 'uppercase'}}
      />
    );

  if (unstakeAmount > parseFloat(total)) {
    unstakeButton = (
      <ThemeButton
        disabled={true}
        disabledColor={'gray'}
        styleButton={styles.unstakeScreen.unstakeButton}
        text={strings('insufficient_funds')}
        styleText={{textTransform: 'uppercase'}}
      />
    );
  }

  if (unstakeAmount <= 0) {
    unstakeButton = (
      <ThemeButton
        disabled={true}
        disabledColor={'gray'}
        styleButton={styles.unstakeScreen.unstakeButton}
        text={strings('enter_amount')}
        styleText={{textTransform: 'uppercase'}}
      />
    );
  }

  if (detail.unstake_status !== UNSTAKE_STATUS.UNSTAKE || isLoadingUnstake) {
    unstakeButton = (
      <ThemeButton
        disabled={true}
        disabledColor={'gray'}
        styleButton={styles.unstakeScreen.unstakeButton}
        text={strings('unstake')}
        styleText={{textTransform: 'uppercase'}}
      />
    );
  }

  if (detail.active_reward_date) {
    unstakeNote = (
      <View
        style={[
          styles.unstakeScreen.infoCardContainer,
          ThemeFunctions.setIEOCardBG(appTheme),
        ]}>
        <View style={[styles.unstakeScreen.infoCardContainerRow]}>
          <View style={styles.unstakeScreen.infoCardContainerRowImageContainer}>
            <Image
              resizeMode={'contain'}
              style={styles.unstakeScreen.infoCardContainerRowImage}
              source={Images.ic_diamond}
              tintColor={Colors.orange}
            />
          </View>

          <View style={styles.unstakeScreen.infoCardContainerRowTextContainer}>
            <ThemeText>
              The principal will return to your wallet on{' '}
              {FormatDateTsTime(Date.now() + Number(detail.cooldown_period))}{' '}
              after {parseFloat(detail.cooldown_period) / ONE_DAY_MS} days
            </ThemeText>
          </View>
        </View>

        <View style={[styles.unstakeScreen.infoCardContainerRow]}>
          <View style={styles.unstakeScreen.infoCardContainerRowImageContainer}>
            <Image
              resizeMode={'contain'}
              style={styles.unstakeScreen.infoCardContainerRowImage}
              source={Images.ic_diamond}
              tintColor={Colors.orange}
            />
          </View>

          <View style={styles.unstakeScreen.infoCardContainerRowTextContainer}>
            <ThemeText>
              You will only be eligible for rewards distributed from{' '}
              {FormatDateTsTime(parseFloat(detail.active_reward_date))} -{' '}
              {FormatDateTsTime(Date.now() - ONE_DAY_MS)}
            </ThemeText>
          </View>
        </View>

        <View style={[styles.unstakeScreen.infoCardContainerRow]}>
          <View style={styles.unstakeScreen.infoCardContainerRowImageContainer}>
            <Image
              resizeMode={'contain'}
              style={styles.unstakeScreen.infoCardContainerRowImage}
              source={Images.ic_diamond}
              tintColor={Colors.orange}
            />
          </View>

          <View style={styles.unstakeScreen.infoCardContainerRowTextContainer}>
            <ThemeText>
              The unstaked amount will return to your wallet within
              approximately 10 minutes
            </ThemeText>
          </View>
        </View>
      </View>
    );
  } else {
    unstakeNote = (
      <View
        style={[
          styles.unstakeScreen.infoCardContainer,
          ThemeFunctions.setIEOCardBG(appTheme),
        ]}>
        <View style={[styles.unstakeScreen.infoCardContainerRow]}>
          <View style={styles.unstakeScreen.infoCardContainerRowImageContainer}>
            <Image
              resizeMode={'contain'}
              style={styles.unstakeScreen.infoCardContainerRowImage}
              source={Images.ic_diamond}
              tintColor={Colors.orange}
            />
          </View>

          <View style={styles.unstakeScreen.infoCardContainerRowTextContainer}>
            <ThemeText>
              The unstaked amount will return to your wallet within
              approximately 10 minutes
            </ThemeText>
          </View>
        </View>
      </View>
    );
  }

  let prevReceivables = <></>;

  if (detail.unstake_waiting && detail.unstake_waiting.length>0) {
    let maps = detail.unstake_waiting.map(item => {
      return (
        <View
          key={item.claim_at}
          style={[styles.unstakeScreen.infoCardContainerRow]}>
          <View style={styles.unstakeScreen.infoCardContainerRowImageContainer}>
            <Image
              resizeMode={'contain'}
              style={styles.unstakeScreen.infoCardContainerRowImage}
              source={Images.ic_diamond}
              tintColor={Colors.orange}
            />
          </View>

          <View style={styles.unstakeScreen.infoCardContainerRowTextContainer}>
            <ThemeText>{FormatDateTsTime(item.claim_at)}</ThemeText>

            <ThemeText>
              {FormatNumber(item.amount)} {detail.coin}
            </ThemeText>
          </View>
        </View>
      );
    });

    prevReceivables = (
      <>
        <ThemeText
            style={{color: ThemeFunctions.customText(appTheme), marginTop: 20}}>
            {strings('current_receivables')}
          </ThemeText>        
        <View
          style={[
            styles.unstakeScreen.infoCardContainer,
            ThemeFunctions.setIEOCardBG(appTheme),
          ]}>
          {maps}
        </View>
      </>
    );
  }

  return (
    <SafeAreaView
      onStartShouldSetResponder={() => {
        Keyboard.dismiss();
      }}
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      <Header title={strings('staking_unstake')} />

      <View style={[styles.containerStyle.container, {padding: 10}]}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          scrollEventThrottle={16}>
          <View style={{alignItems: 'flex-end'}}>
            <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
              {strings('total_staked')}: {FormatNumber(total)}
            </ThemeText>
          </View>

          <View
            style={[
              styles.unstakeScreen.stakeAmountContainer,
              ThemeFunctions.setIEOCardBG(appTheme),
            ]}>
            <View
              style={[
                styles.unstakeScreen.stakeAmountInput,
                {borderRightColor: ThemeFunctions.customText(appTheme)},
              ]}>
              <TextInput
                value={FormatNumber(unstakeAmount)}
                placeholder={`stake amount`}
                placeholderTextColor={ThemeFunctions.customText(appTheme)}
                style={[ThemeFunctions.textColor(appTheme), {flex: 1}]}
                onChangeText={e => setUnstakeAmount(replaceCost(e))}
                keyboardType="numeric"
              />

              <View style={{marginRight: 5}}>
                <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
                  {detail.coin}
                </ThemeText>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                if (!isNaN(parseFloat(total))) {
                  setUnstakeAmount(parseFloat(total));
                }
              }}
              style={[styles.unstakeScreen.stakeAmountAction]}>
              <ThemeText style={{color: ThemeFunctions.getColor(appColor)}}>
                MAX
              </ThemeText>
            </TouchableOpacity>
          </View>

          {unstakeButton}

          {prevReceivables}

          <ThemeText
            style={{color: ThemeFunctions.customText(appTheme), marginTop: 20}}>
            {strings('unstake_note')}
          </ThemeText>
          {unstakeNote}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Unstake;
