import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  Linking,
  ScrollView,
  PixelRatio,
  Dimensions,
  Platform,
  FlatList,
  Animated,
  Keyboard,
  RefreshControl,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {CheckBox} from 'react-native-elements';

import {commonStyles} from '../../../globalstyles/styles';
import * as styles from './styles';
import * as ThemeFunctions from '../../../utils/ThemeFunctions';
import {
  FormatDate,
  FormatDateTsTime,
  FormatNumber,
  FormatToAbbreviateNumber,
  GetDaysFromTs,
  replaceCost,
} from '../../../utils/AppFunctions';
import Header from '../Header';
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
  Space,
} from '../../../components';
import Colors from '../../../theme/Colors';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

import Image from 'react-native-fast-image';
import {DEFAULT_COIN_LOGO} from '../../../store/action/quickbuy/QuickBuyAction';

import * as Images from '../../../assets';
import {
  GetPoolSubTypeText,
  GetPoolTypeText,
  GetStatusText,
  MergeData,
  PoolStatus,
  PoolType,
  StakingPool,
} from '../common';
import {QuickBuyActions, StakingActions} from '../../../store';
import {makeRequest, makeGetRequest} from '../../../services/StakingApiService';
import {APIConstants} from '../../../constants';
import {showToast} from '../../../utils/GenericUtils';
import {ProgressBar} from 'react-native-paper';

const StakingScreen = (props: any) => {
  const {selectedPool}: {selectedPool: StakingPool} = props?.route?.params;

  const [available, setAvailable] = useState(false);
  const [activePool, setActivePool] = useState<StakingPool>(selectedPool);
  const [stakeAmount, setStakeAmount] = useState(0);
  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer);
  const [isPoolLoading, setIsPoolLoading] = useState(false);
  const [isStakeLoading, setIsStakeLoading] = useState(false);
  const [allPools, setAllPools] = useState<StakingPool[]>([]);
  const [checked, setChecked] = useState(false);

  const [didMount, setDidMount] = useState(false);

  const disptach = useDispatch();
  const quickBuyData = useSelector((state: any) => state.quickBuyReducer);

  const scrollX = useRef();

  useEffect(() => {
    setDidMount(true);
    disptach(QuickBuyActions.fundsList());
    fetchPools();
  }, []);

  const getScrollDist = (pools: StakingPool[], active: StakingPool) => {
    for (let i = 0; i < pools.length; i++) {
      if (active.pool_id === pools[i].pool_id) return Math.max((i - 3) * 58, 0);
    }

    return 0;
  };

  const stakeFunds = () => {
    setIsStakeLoading(true);
    makeRequest(
      'POST',
      APIConstants.STAKING_POOL_STAKE,
      {},
      {
        pool_id: activePool?.pool_id,
        stake_amount: stakeAmount,
      },
    )
      .then(res => {
        const {status, message} = res;

        let type = 'error';

        if (status == 200) {
          type = 'success';
        }

        showToast('Staking', message, type);
        fetchPools(false);
        disptach(StakingActions.GetCurrentEarnings());
        disptach(StakingActions.GetCurrentStaked());
      })
      .catch(e => {
        showToast('Staking', 'error while staking funds', 'error');
      })
      .finally(() => {
        setIsStakeLoading(false);
        disptach(QuickBuyActions.fundsList());
      });
  };

  const fetchPools = (load = true) => {
    const {asset, pool_type} = activePool;

    let url =
      pool_type === PoolType.Locked
        ? APIConstants.STAKING_POOL_LOCKED
        : APIConstants.STAKING_ACCOUNT_FLEXIBLE;

    const params = {
      asset,
      page: 1,
    };

    load && setIsPoolLoading(true);
    makeGetRequest(url, params)
      .then(res => {
        if (res.data) {
          setAllPools(res.data);
          setStakeAmount(0);
        }
      })
      .catch(e => {
        showToast('Staking', 'Error while fetching pools', 'error');
      })
      .finally(() => load && setIsPoolLoading(false));
  };

  useEffect(() => {
    const filtered = allPools.filter(x => {
      if (available) {
        return (!x.sub_type && x.pool_status === PoolStatus.Pledge) || (x.sub_type && parseFloat(x.max_stake_date+"")>Date.now());
      }
      return true;
    });

    if (filtered.length <= 0) return;

    let active, found=false;

    for (let i=0;i<filtered.length;i++) {
      if (filtered[i].pool_id===activePool.pool_id) {
        found=true;
        active=filtered[i]
      }
    }

    if (!found) {
      active = filtered[0];
    }

    if (didMount) setActivePool(active);

    // scrollX?.current?.scrollTo({x: 0, y: 0, animated: true});
  }, [available, allPools]);

  const filtertedData = allPools.filter(x => {
    if (available) {      
      return (!x.sub_type && x.pool_status === PoolStatus.Pledge) || (x.sub_type && parseFloat(x.max_stake_date+"")>Date.now());
    }
    return true;
  });

  const scrollDist = getScrollDist(filtertedData, activePool);

  scrollX?.current?.scrollTo({
    x: scrollDist,
    y: 0,
    animated: true,
  });

  const getStatusColor = (status: PoolStatus) => {
    let color = ThemeFunctions.customText(appTheme);

    if (status === PoolStatus.Pledge) {
      color = Colors.orange;
    }

    if (status === PoolStatus.Live) {
      color = Colors.currencyGreen;
    }

    return color;
  };

  const getTextColor = (active, status: PoolStatus) => {
    if (active) return 'white';

    return getStatusColor(status);
  };

  const durationStyleContainer = (active, status: PoolStatus) => {
    let color = ThemeFunctions.customText(appTheme);

    if (status === PoolStatus.Pledge) {
      color = Colors.orange;
    }

    if (status === PoolStatus.Live) {
      color = Colors.currencyGreen;
    }

    if (active) {
      return {
        backgroundColor: color,
        borderColor: color,
      };
    } else {
      return {borderColor: color};
    }
  };

  let balance = '-';

  if (quickBuyData && quickBuyData.fundsList) {
    const assetBalance = quickBuyData.fundsList.filter(
      x => x.currencyName === activePool?.asset,
    );

    if (assetBalance && assetBalance.length > 0) {
      balance = assetBalance[0].balance;
    }
  }

  let stakeButton = (
    <ThemeButton
      onClickHandler={() => stakeFunds()}
      styleButton={styles.infoCardStyle.stakeButton}
      text={strings('stake')}
      styleText={{textTransform: 'uppercase'}}
    />
  );

  let stakeButtonNote = '';

  const bypassMet =
    parseFloat(activePool?.cap) - parseFloat(activePool?.reach_cap) <
    parseFloat(activePool?.min_stake_amount);

  if (stakeAmount <= 0) {
    stakeButton = (
      <ThemeButton
        onClickHandler={() => stakeFunds()}
        disabled={true}
        disabledColor={Colors.gray}
        styleButton={styles.infoCardStyle.stakeButton}
        text={strings('enter_amount')}
        styleText={{textTransform: 'uppercase'}}
      />
    );
  } else if (
    !bypassMet &&
    stakeAmount < parseFloat(activePool?.min_stake_amount)
  ) {
    stakeButtonNote = `${strings('min_amount_not_met')} : ${FormatNumber(
      activePool?.min_stake_amount,
    )} ${activePool?.asset}`;

    stakeButton = (
      <ThemeButton
        disabled={true}
        disabledColor={Colors.gray}
        styleButton={styles.infoCardStyle.stakeButton}
        text={strings('invalid_amount')}
        styleText={{textTransform: 'uppercase'}}
      />
    );
  }

  if (stakeAmount > parseFloat(activePool?.max_stake_amount)) {
    stakeButtonNote = `${strings('max_amount_not_met')} : ${FormatNumber(
      activePool?.max_stake_amount,
    )} ${activePool?.asset}`;

    stakeButton = (
      <ThemeButton
        disabled={true}
        disabledColor={Colors.gray}
        styleButton={styles.infoCardStyle.stakeButton}
        text={strings('invalid_amount')}
        styleText={{textTransform: 'uppercase'}}
      />
    );
  }

  if (stakeAmount > parseFloat(balance)) {
    stakeButton = (
      <ThemeButton
        disabled={true}
        disabledColor={Colors.gray}
        styleButton={styles.infoCardStyle.stakeButton}
        text={strings('insufficient_funds')}
        styleText={{textTransform: 'uppercase'}}
      />
    );
  }

  if (
    !checked ||
    isStakeLoading ||
    !activePool?.sub_type && activePool?.pool_status !== PoolStatus.Pledge ||
    activePool?.sub_type && parseFloat(activePool?.max_stake_date+"") < Date.now()
  ) {
    stakeButton = (
      <ThemeButton
        disabled={true}
        disabledColor={Colors.gray}
        styleButton={styles.infoCardStyle.stakeButton}
        text={strings('stake')}
        styleText={{textTransform: 'uppercase'}}
      />
    );
  }

  if (filtertedData.length === 0) {
    stakeButton = (
      <ThemeButton
        disabled={true}
        disabledColor={Colors.gray}
        styleButton={styles.infoCardStyle.stakeButton}
        text={strings('select_pool')}
        styleText={{textTransform: 'uppercase'}}
      />
    );
  }

  const stakeProgressPercent =
    PoolStatus.Pledge === activePool?.pool_status || activePool?.sub_type
      ? parseFloat(activePool?.reach_cap) / parseFloat(activePool?.cap)
      : 1;

  const stakeProgressColor =
    PoolStatus.Pledge === activePool?.pool_status
      ? 'orange'
      : Colors.currencyGreen;

  const renderScene = () => {
    if (isPoolLoading) {
      return (
        <>
          <Header
            title={strings(`Staking - ${activePool?.asset}`)}
            right={
              <View style={[{flexDirection: 'row'}]}>
                <TouchableOpacity
                  onPress={() => Navigation.navigate(Screen.StakingAccount)}
                  style={[
                    homeStyles.profileBtn,
                    ThemeFunctions.setIEOCardBG(appTheme),
                    {marginRight: 10},
                  ]}>
                  <IconVector.FontAwesome5
                    name="dollar-sign"
                    color={ThemeFunctions.getCurrentTextColor(appTheme)}
                    size={22}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => Navigation.navigate(Screen.StakingHistory)}
                  style={[
                    homeStyles.profileBtn,
                    ThemeFunctions.setIEOCardBG(appTheme),
                  ]}>
                  <IconVector.FontAwesome5
                    name="history"
                    color={ThemeFunctions.getCurrentTextColor(appTheme)}
                    size={22}
                  />
                </TouchableOpacity>
              </View>
            }
          />

          <LoadingSpinner color={ThemeFunctions.getColor(appColor)} size={22} />
        </>
      );
    }

    if (!activePool || allPools.length === 0) {
      return (
        <>
          <Header
            title={strings(`Staking`)}
            right={
              <View style={[{flexDirection: 'row'}]}>
                <TouchableOpacity
                  onPress={() => Navigation.navigate(Screen.StakingAccount)}
                  style={[
                    homeStyles.profileBtn,
                    ThemeFunctions.setIEOCardBG(appTheme),
                    {marginRight: 10},
                  ]}>
                  <IconVector.FontAwesome5
                    name="dollar-sign"
                    color={ThemeFunctions.getCurrentTextColor(appTheme)}
                    size={22}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => Navigation.navigate(Screen.StakingHistory)}
                  style={[
                    homeStyles.profileBtn,
                    ThemeFunctions.setIEOCardBG(appTheme),
                  ]}>
                  <IconVector.FontAwesome5
                    name="history"
                    color={ThemeFunctions.getCurrentTextColor(appTheme)}
                    size={22}
                  />
                </TouchableOpacity>
              </View>
            }
          />

          <ScrollView style={styles.scrollContainer.scrollView}>
            <ThemeText style={{textAlign: 'center'}}>
              {strings('pool_not_found')}
            </ThemeText>
          </ScrollView>
        </>
      );
    }

    let preStakeCondition = <></>;

    if (activePool?.pre_stake_asset) {
      preStakeCondition = (
        <>
          <View style={styles.infoCardStyle.statusCardLabel}>
            <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
              {strings('pre_stake_condition')}
            </ThemeText>
          </View>
          <View
            style={[
              styles.infoCardStyle.infoCardContainer,
              ThemeFunctions.setIEOCardBG(appTheme),
            ]}>
            <View style={[styles.infoCardStyle.infoCardContainerRow]}>
              <View
                style={styles.infoCardStyle.infoCardContainerRowImageContainer}>
                <Image
                  resizeMode={'contain'}
                  style={styles.infoCardStyle.infoCardContainerRowImage}
                  source={Images.ic_diamond}
                  tintColor={Colors.orange}
                />
              </View>

              <View
                style={styles.infoCardStyle.infoCardContainerRowTextContainer}>
                <ThemeText>{strings('pre_stake_asset')}</ThemeText>
                <ThemeText>{activePool?.pre_stake_asset}</ThemeText>
              </View>
            </View>


            <View style={[styles.infoCardStyle.infoCardContainerRow]}>
              <View
                style={styles.infoCardStyle.infoCardContainerRowImageContainer}>
                <Image
                  resizeMode={'contain'}
                  style={styles.infoCardStyle.infoCardContainerRowImage}
                  source={Images.ic_diamond}
                  tintColor={Colors.orange}
                />
              </View>

              <View
                style={styles.infoCardStyle.infoCardContainerRowTextContainer}>
                <ThemeText>{strings('pre_stake_amount')}</ThemeText>
                <ThemeText>{FormatNumber(activePool?.pre_stake_amount)} {activePool?.pre_stake_asset}</ThemeText>
              </View>
            </View>


            <View style={[styles.infoCardStyle.infoCardContainerRow]}>
              <View
                style={styles.infoCardStyle.infoCardContainerRowImageContainer}>
                <Image
                  resizeMode={'contain'}
                  style={styles.infoCardStyle.infoCardContainerRowImage}
                  source={Images.ic_diamond}
                  tintColor={Colors.orange}
                />
              </View>

              <View
                style={styles.infoCardStyle.infoCardContainerRowTextContainer}>
                <ThemeText>{strings('pre_stake_lock_duration')}</ThemeText>
                <ThemeText>{GetDaysFromTs(activePool?.pre_stake_duration)}</ThemeText>
              </View>
            </View>
          </View>
        </>
      );
    }

    return (
      <>
        <Header
          title={strings(`Staking - ${activePool?.asset}`)}
          right={
            <View style={[{flexDirection: 'row'}]}>
              <TouchableOpacity
                onPress={() => Navigation.navigate(Screen.StakingAccount)}
                style={[
                  homeStyles.profileBtn,
                  ThemeFunctions.setIEOCardBG(appTheme),
                  {marginRight: 10},
                ]}>
                <IconVector.FontAwesome5
                  name="dollar-sign"
                  color={ThemeFunctions.getCurrentTextColor(appTheme)}
                  size={22}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Navigation.navigate(Screen.StakingHistory)}
                style={[
                  homeStyles.profileBtn,
                  ThemeFunctions.setIEOCardBG(appTheme),
                ]}>
                <IconVector.FontAwesome5
                  name="history"
                  color={ThemeFunctions.getCurrentTextColor(appTheme)}
                  size={22}
                />
              </TouchableOpacity>
            </View>
          }
        />

        <ScrollView
          refreshControl={
            <RefreshControl
              colors={[ThemeFunctions.getColor(appColor)]}
              tintColor={ThemeFunctions.getColor(appColor)}
              refreshing={isPoolLoading}
              onRefresh={fetchPools}
            />
          }
          style={styles.scrollContainer.scrollView}>
          <Text style={{color: ThemeFunctions.customText(appTheme)}}>
            {strings('staking_type')}
          </Text>
          {/* <View
            style={[
              styles.infoCardStyle.statusCard,
              ThemeFunctions.setIEOCardBG(appTheme),
            ]}>
            <ThemeText style={{textTransform: 'uppercase'}}>
              {GetPoolTypeText(activePool?.pool_type)}
            </ThemeText>
          </View> */}

          <View
            style={[
              styles.infoCardStyle.statusCardContainer,
              ThemeFunctions.setIEOCardBG(appTheme),
            ]}>

            <View
            style={[
              styles.infoCardStyle.statusCardLeft,
              {borderRightColor: ThemeFunctions.customText(appTheme)}
            ]}>
              <ThemeText style={{textTransform: 'uppercase'}}>
              {GetPoolTypeText(activePool?.pool_type)}
            </ThemeText>
            </View>

            <View
            style={[
              styles.infoCardStyle.statusCardRight,
            ]}>
              <ThemeText style={{textTransform: 'uppercase'}}>
              {GetPoolSubTypeText(activePool?.sub_type)}
            </ThemeText>
            </View>
            
          </View>

          <Text style={{color: ThemeFunctions.customText(appTheme)}}>
            {strings('staking_status')}
          </Text>
          <View
            style={[
              styles.infoCardStyle.statusCard,
              ThemeFunctions.setIEOCardBG(appTheme),
            ]}>
            <ThemeText style={{textTransform: 'uppercase'}}>
              {GetStatusText(activePool?.pool_status)}
            </ThemeText>
          </View>

          <View style={[styles.infoCardStyle.durationRow]}>
            <View style={[styles.infoCardStyle.selectorLeft]}>
              <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
                {strings('durations')}
              </ThemeText>
            </View>

            <TouchableOpacity
              onPress={() => {
                setAvailable(!available);
              }}
              style={[styles.infoCardStyle.selectorRight]}>
              <View style={{justifyContent: 'center'}}>
                <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
                  {strings('available')}
                </ThemeText>
              </View>

              <CheckBox
                containerStyle={styles.infoCardStyle.checkboxContainer}
                checkedColor={ThemeFunctions.getColor(appColor)}
                uncheckedColor={ThemeFunctions.customText(appTheme)}
                checked={available}
                onPress={() => {
                  setAvailable(!available);
                }}
              />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={{width: '100%'}}
            showsHorizontalScrollIndicator={false}
            ref={scrollX}
            horizontal={true}>
            <View style={styles.infoCardStyle.stakeCardDurationContainer}>
              {filtertedData.map(x => (
                <TouchableOpacity
                  key={x.pool_id}
                  onPress={() => setActivePool(x)}
                  style={[
                    styles.infoCardStyle.stakeCardDuration,
                    durationStyleContainer(
                      x.pool_id === activePool?.pool_id,
                      x.pool_status,
                    ),
                  ]}>
                  <Text
                    style={{
                      color: getTextColor(
                        x.pool_id === activePool?.pool_id,
                        x.pool_status,
                      ),
                    }}>
                    {x.day_duration / 86400000}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {activePool && (
            <View style={{marginVertical: 5, marginHorizontal: 5}}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginBottom: 10,
                }}>
                <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
                  {strings('stake_progress')}
                </ThemeText>

                <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
                  {(stakeProgressPercent * 100).toFixed(2)} %
                </ThemeText>
              </View>

              <View>
                <ProgressBar
                  style={{backgroundColor: 'gray', height: 10, borderRadius: 3}}
                  color={stakeProgressColor}
                  progress={stakeProgressPercent}
                />
              </View>
            </View>
          )}

          <View style={styles.infoCardStyle.balanceContainer}>
            <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
              {strings('balance')}:{' '}
            </ThemeText>
            <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
              {FormatNumber(balance)} {activePool?.asset}
            </ThemeText>
          </View>

          <View
            style={[
              styles.infoCardStyle.stakeAmountContainer,
              ThemeFunctions.setIEOCardBG(appTheme),
            ]}>
            <View
              style={[
                styles.infoCardStyle.stakeAmountInput,
                {borderRightColor: ThemeFunctions.customText(appTheme)},
              ]}>
              <TextInput
                value={FormatNumber(stakeAmount)}
                placeholder={`stake amount`}
                placeholderTextColor={ThemeFunctions.customText(appTheme)}
                style={[ThemeFunctions.textColor(appTheme), {flex: 1}]}
                onChangeText={e => setStakeAmount(replaceCost(e))}
                keyboardType="numeric"
              />

              <View style={{marginRight: 5}}>
                <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
                  {activePool?.asset}
                </ThemeText>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                if (!isNaN(parseFloat(balance))) {
                  const maxBal = Math.min(
                    parseFloat(balance),
                    parseFloat(activePool?.cap) -
                      parseFloat(activePool?.reach_cap),
                    parseFloat(activePool?.max_stake_amount),
                  );

                  setStakeAmount(maxBal);
                }
              }}
              style={[styles.infoCardStyle.stakeAmountAction]}>
              <ThemeText style={{color: ThemeFunctions.getColor(appColor)}}>
                MAX
              </ThemeText>
            </TouchableOpacity>
          </View>

          <ThemeText
            style={{
              color: ThemeFunctions.customText(appTheme),
              textAlign: 'right',
              fontSize: 14,
            }}>
            {stakeButtonNote}
          </ThemeText>

          <TouchableOpacity
            onPress={() => setChecked(!checked)}
            style={[styles.infoCardStyle.stakingAgreementContainer]}>
            <CheckBox
              containerStyle={styles.infoCardStyle.stakingAgreementCheck}
              checkedColor={ThemeFunctions.getColor(appColor)}
              uncheckedColor={ThemeFunctions.customText(appTheme)}
              checked={checked}
              onPress={() => {
                setChecked(!checked);
              }}
            />

            <ThemeText
              style={[
                styles.infoCardStyle.stakingAgreementText,
                {color: ThemeFunctions.customText(appTheme)},
              ]}>
              I have read and I agree to{' '}
              <Text
                onPress={() =>
                  Navigation.navigate(Screen.PDFViewerScreen, {
                    url: APIConstants.STAKING_TERMS,
                    title: strings('staking_terms_title'),
                  })
                }
                style={[
                  styles.infoCardStyle.linkText,
                  commonStyles.textUnderline,
                  {color: ThemeFunctions.getColor(appColor)},
                ]}>
                Globiance Staking Service Agreement
              </Text>
            </ThemeText>
          </TouchableOpacity>

          {stakeButton}

          {activePool ? (
            <>
              <View style={[styles.infoCardStyle.poolInformationTitle]}>
                <ThemeText
                  style={{
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    // color: ThemeFunctions.customText(appTheme),
                  }}>
                  {strings('pool_information')}
                </ThemeText>
              </View>


              {preStakeCondition}

              <View style={styles.infoCardStyle.statusCardLabel}>
                <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
                  {strings('pool_rewards_configuration')}
                </ThemeText>
              </View>
              <View
                style={[
                  styles.infoCardStyle.infoCardContainer,
                  ThemeFunctions.setIEOCardBG(appTheme),
                ]}>
                <View style={[styles.infoCardStyle.infoCardContainerRow]}>
                  <View
                    style={
                      styles.infoCardStyle.infoCardContainerRowImageContainer
                    }>
                    <Image
                      resizeMode={'contain'}
                      style={styles.infoCardStyle.infoCardContainerRowImage}
                      source={Images.ic_diamond}
                      tintColor={Colors.orange}
                    />
                  </View>

                  <View
                    style={
                      styles.infoCardStyle.infoCardContainerRowTextContainer
                    }>
                    <ThemeText>{strings('estimate_apr')}</ThemeText>
                    <ThemeText>{activePool?.apy_shown} %</ThemeText>
                  </View>
                </View>

                <View style={[styles.infoCardStyle.infoCardContainerRow]}>
                  <View
                    style={
                      styles.infoCardStyle.infoCardContainerRowImageContainer
                    }>
                    <Image
                      resizeMode={'contain'}
                      style={styles.infoCardStyle.infoCardContainerRowImage}
                      source={Images.ic_diamond}
                      tintColor={Colors.orange}
                    />
                  </View>

                  <View
                    style={
                      styles.infoCardStyle.infoCardContainerRowTextContainer
                    }>
                    <ThemeText>{strings('estimate_rewards')}</ThemeText>

                    {stakeAmount != 0 ? (
                      <ThemeText
                        numberOfLines={1}
                        style={{flex: 1, textAlign: 'right'}}>
                        ≈{' '}
                        {FormatNumber(
                          (stakeAmount * parseFloat(activePool?.apy_shown)) /
                            100,
                          2,
                          0,
                        )}{' '}
                        {activePool?.asset}
                      </ThemeText>
                    ) : (
                      <ThemeText>-</ThemeText>
                    )}
                  </View>
                </View>

                <View style={[styles.infoCardStyle.infoCardContainerRow]}>
                  <View
                    style={
                      styles.infoCardStyle.infoCardContainerRowImageContainer
                    }>
                    <Image
                      resizeMode={'contain'}
                      style={styles.infoCardStyle.infoCardContainerRowImage}
                      source={Images.ic_diamond}
                      tintColor={Colors.orange}
                    />
                  </View>

                  <View
                    style={
                      styles.infoCardStyle.infoCardContainerRowTextContainer
                    }>
                    <ThemeText>{strings('estimate_drip_interval')}</ThemeText>
                    <ThemeText>
                      {parseFloat(activePool?.estimate_drip_interval) /
                        86400000}{' '}
                      {strings('days')}
                    </ThemeText>
                  </View>
                </View>

                <View style={[styles.infoCardStyle.infoCardContainerRow]}>
                  <View
                    style={
                      styles.infoCardStyle.infoCardContainerRowImageContainer
                    }>
                    <Image
                      resizeMode={'contain'}
                      style={styles.infoCardStyle.infoCardContainerRowImage}
                      source={Images.ic_diamond}
                      tintColor={Colors.orange}
                    />
                  </View>

                  <View
                    style={
                      styles.infoCardStyle.infoCardContainerRowTextContainer
                    }>
                    <ThemeText>{strings('redeemable_rewards')}</ThemeText>
                    <ThemeText>{activePool?.reward_consumable} %</ThemeText>
                  </View>
                </View>

                <View style={[styles.infoCardStyle.infoCardContainerRow]}>
                  <View
                    style={
                      styles.infoCardStyle.infoCardContainerRowImageContainer
                    }>
                    <Image
                      resizeMode={'contain'}
                      style={styles.infoCardStyle.infoCardContainerRowImage}
                      source={Images.ic_diamond}
                      tintColor={Colors.orange}
                    />
                  </View>

                  <View
                    style={
                      styles.infoCardStyle.infoCardContainerRowTextContainer
                    }>
                    <ThemeText>{strings('cooldown_period')}</ThemeText>
                    <ThemeText>
                      {activePool?.cooldown_period / 86400000} {strings('days')}
                    </ThemeText>
                  </View>
                </View>
              </View>

              <View style={styles.infoCardStyle.statusCardLabel}>
                <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
                  {strings('lock_amount_limitation')}
                </ThemeText>
              </View>
              <View
                style={[
                  styles.infoCardStyle.infoCardContainer,
                  ThemeFunctions.setIEOCardBG(appTheme),
                ]}>
                <View style={[styles.infoCardStyle.infoCardContainerRow]}>
                  <View
                    style={
                      styles.infoCardStyle.infoCardContainerRowImageContainer
                    }>
                    <Image
                      resizeMode={'contain'}
                      style={styles.infoCardStyle.infoCardContainerRowImage}
                      source={Images.ic_diamond}
                      tintColor={Colors.orange}
                    />
                  </View>

                  <View
                    style={
                      styles.infoCardStyle.infoCardContainerRowTextContainer
                    }>
                    <ThemeText>{strings('min_stake_amount')}</ThemeText>
                    <ThemeText>
                      {FormatToAbbreviateNumber(activePool?.min_stake_amount)}{' '}
                      {activePool?.asset}
                    </ThemeText>
                  </View>
                </View>

                <View style={[styles.infoCardStyle.infoCardContainerRow]}>
                  <View
                    style={
                      styles.infoCardStyle.infoCardContainerRowImageContainer
                    }>
                    <Image
                      resizeMode={'contain'}
                      style={styles.infoCardStyle.infoCardContainerRowImage}
                      source={Images.ic_diamond}
                      tintColor={Colors.orange}
                    />
                  </View>

                  <View
                    style={
                      styles.infoCardStyle.infoCardContainerRowTextContainer
                    }>
                    <ThemeText>{strings('max_stake_amount')}</ThemeText>
                    <ThemeText>
                      {FormatToAbbreviateNumber(activePool?.max_stake_amount)}{' '}
                      {activePool?.asset}
                    </ThemeText>
                  </View>
                </View>
              </View>

              <View style={styles.infoCardStyle.statusCardLabel}>
                <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
                  {strings('pool_configuration')}
                </ThemeText>
              </View>
              <View
                style={[
                  styles.infoCardStyle.infoCardContainer,
                  ThemeFunctions.setIEOCardBG(appTheme),
                ]}>
                <View style={[styles.infoCardStyle.infoCardContainerRow]}>
                  <View
                    style={
                      styles.infoCardStyle.infoCardContainerRowImageContainer
                    }>
                    <Image
                      resizeMode={'contain'}
                      style={styles.infoCardStyle.infoCardContainerRowImage}
                      source={Images.ic_diamond}
                      tintColor={Colors.orange}
                    />
                  </View>

                  <View
                    style={
                      styles.infoCardStyle.infoCardContainerRowTextContainer
                    }>
                    <ThemeText>{strings('tot_staked')}</ThemeText>
                    <ThemeText>
                      {FormatNumber(activePool?.reach_cap, 0, 0)}{' '}
                      {activePool?.asset}
                    </ThemeText>
                  </View>
                </View>

                <View style={[styles.infoCardStyle.infoCardContainerRow]}>
                  <View
                    style={
                      styles.infoCardStyle.infoCardContainerRowImageContainer
                    }>
                    <Image
                      resizeMode={'contain'}
                      style={styles.infoCardStyle.infoCardContainerRowImage}
                      source={Images.ic_diamond}
                      tintColor={Colors.orange}
                    />
                  </View>

                  <View
                    style={
                      styles.infoCardStyle.infoCardContainerRowTextContainer
                    }>
                    <ThemeText>{strings('pool_cap')}</ThemeText>
                    <ThemeText>
                      {FormatNumber(activePool?.cap, 0, 0)} {activePool?.asset}
                    </ThemeText>
                  </View>
                </View>
              </View>

              <View style={styles.infoCardStyle.statusCardLabel}>
                <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
                  {strings('pool_progress')}
                </ThemeText>
              </View>
              <View
                style={[
                  styles.infoCardStyle.infoCardContainer,
                  ThemeFunctions.setIEOCardBG(appTheme),
                ]}>
                {
                    !activePool?.sub_type ?

                    <>
                      <View style={[styles.infoCardStyle.infoCardContainerRow]}>
                        <View
                          style={
                            styles.infoCardStyle.infoCardContainerRowImageContainer
                          }>
                          <Image
                            resizeMode={'contain'}
                            style={styles.infoCardStyle.infoCardContainerRowImage}
                            source={Images.ic_diamond}
                            tintColor={Colors.orange}
                          />
                        </View>

                          <View
                            style={
                              styles.infoCardStyle.infoCardContainerRowTextContainer
                            }>
                            <ThemeText>{strings('pool_initiated')}</ThemeText>
                            <ThemeText>
                              {FormatDateTsTime(parseFloat(activePool?.pledge_date))}
                            </ThemeText>
                          </View>
                      </View>

                      <View style={[styles.infoCardStyle.infoCardContainerRow]}>
                        <View
                          style={
                            styles.infoCardStyle.infoCardContainerRowImageContainer
                          }>
                          <Image
                            resizeMode={'contain'}
                            style={styles.infoCardStyle.infoCardContainerRowImage}
                            source={Images.ic_diamond}
                            tintColor={
                              activePool?.reach_cap_date ? Colors.orange : Colors.gray
                            }
                          />
                        </View>

                        <View
                          style={
                            styles.infoCardStyle.infoCardContainerRowTextContainer
                          }>
                          <ThemeText>{strings('pool_reach_cap')}</ThemeText>
                          <ThemeText>
                            {activePool?.reach_cap_date
                              ? FormatDateTsTime(
                                  parseFloat(activePool?.reach_cap_date),
                                )
                              : '-'}
                          </ThemeText>
                        </View>
                      </View>
                      </>
                :
                <></>
                }

                <View style={[styles.infoCardStyle.infoCardContainerRow]}>
                  <View
                    style={
                      styles.infoCardStyle.infoCardContainerRowImageContainer
                    }>
                    <Image
                      resizeMode={'contain'}
                      style={styles.infoCardStyle.infoCardContainerRowImage}
                      source={Images.ic_diamond}
                      tintColor={
                        activePool?.active_date ? Colors.orange : Colors.gray
                      }
                    />
                  </View>

                  <View
                    style={
                      styles.infoCardStyle.infoCardContainerRowTextContainer
                    }>
                    <ThemeText>{strings('pool_activated')}</ThemeText>
                    <ThemeText>
                      {activePool?.active_date
                        ? FormatDateTsTime(parseFloat(activePool?.active_date))
                        : '-'}
                    </ThemeText>
                  </View>
                </View>

                {
                    !activePool?.sub_type ?

                    <View style={[styles.infoCardStyle.infoCardContainerRow]}>
                      <View
                        style={
                          styles.infoCardStyle.infoCardContainerRowImageContainer
                        }>
                        <Image
                          resizeMode={'contain'}
                          style={styles.infoCardStyle.infoCardContainerRowImage}
                          source={Images.ic_diamond}
                          tintColor={
                            activePool?.interest_end_date
                              ? Colors.orange
                              : Colors.gray
                          }
                        />
                      </View>

                      <View
                        style={
                          styles.infoCardStyle.infoCardContainerRowTextContainer
                        }>
                        <ThemeText>{strings('pool_end')}</ThemeText>
                        <ThemeText>
                          {activePool?.interest_end_date
                            ? FormatDateTsTime(
                                parseFloat(activePool?.interest_end_date),
                              )
                            : '-'}
                        </ThemeText>
                      </View>
                    </View>

              : 
                    <View style={[styles.infoCardStyle.infoCardContainerRow]}>
                      <View
                        style={
                          styles.infoCardStyle.infoCardContainerRowImageContainer
                        }>
                        <Image
                          resizeMode={'contain'}
                          style={styles.infoCardStyle.infoCardContainerRowImage}
                          source={Images.ic_diamond}
                          tintColor={
                            parseFloat(activePool?.max_stake_date+"")<Date.now()
                              ? Colors.orange
                              : Colors.gray
                          }
                        />
                      </View>

                      <View
                        style={
                          styles.infoCardStyle.infoCardContainerRowTextContainer
                        }>
                        <ThemeText>{strings('pool_max_stake_date')}</ThemeText>
                        <ThemeText>
                          {activePool?.max_stake_date
                            ? FormatDateTsTime(
                                parseFloat(activePool?.max_stake_date),
                              )
                            : '-'}
                        </ThemeText>
                      </View>
                    </View>
              
              }
              </View>
            </>
          ) : (
            <></>
          )}

          <Space height={100} />
        </ScrollView>
      </>
    );
  };

  return (
    <SafeAreaView
      onStartShouldSetResponder={() => {
        Keyboard.dismiss();
      }}
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      {renderScene()}
    </SafeAreaView>
  );
};

export default StakingScreen;
