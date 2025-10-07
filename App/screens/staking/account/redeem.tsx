import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view'
import {useDispatch, useSelector} from 'react-redux';

import {redeemScreen as styles} from './styles';
import {commonStyles} from '../../../globalstyles/styles';
import {Header, ThemeButton, ThemeText} from '../../../components';
import {strings} from '../../../strings';
import {ThemeFunctions} from '../../../utils';
import Image from 'react-native-fast-image';
import * as Images from '../../../assets';
import Colors from '../../../theme/Colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {FormatDateTsTime, FormatNumber} from '../../../utils/AppFunctions';
import {ONE_DAY_MS} from '../../../constants/AppConstants';
import {makeRequest} from '../../../services/StakingApiService';
import {APIConstants} from '../../../constants';
import {showToast} from '../../../utils/GenericUtils';
import {QuickBuyActions, StakingActions} from '../../../store';

const RedeemDrip = (props: any) => {
  const detail = props.detail;

  const [isRedeeming, setIsRedeeming] = useState(false);
  const dispatch = useDispatch();

  const {isRtlApproach, appTheme, appColor} = useSelector(
    (state: any) => state.globalReducer,
  );

  let resultObj =
    detail?.lock_rewards?.reduce((acc, cur) => {
      if (!acc[cur.milestone]) acc[cur.milestone] = {reward: 0, consumable: 0, milestone:cur.milestone};

      acc[cur.milestone].reward += parseFloat(cur.reward);
      acc[cur.milestone].consumable += parseFloat(cur.consumable);
      return acc;
    }, {}) || {};

  let resultArr = Object.keys(resultObj)
    .map(x => resultObj[x])
    .sort((a, b) => parseFloat(a.milestone) - parseFloat(b.milestone));

  const {coin, drip_reward} = detail;

  const {consumable, frequency, reward: est_reward} = detail.estimate_drip;

  let lockedRewardsDetails = <></>;

  if (resultArr.length > 0) {
    lockedRewardsDetails = (
      <View style={[styles.releaseBreakdownContainer]}>
        <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
          {strings('locked_release_breakdown')}
        </ThemeText>

        {resultArr.map((x, i) => (
          <View
            key={i}
            style={[
              styles.infoCardContainer,
              ThemeFunctions.setIEOCardBG(appTheme),
            ]}>
            <View style={[styles.infoCardContainerRow]}>
              <View style={styles.infoCardContainerRowImageContainer}>
                <Image
                  resizeMode={'contain'}
                  style={styles.infoCardContainerRowImage}
                  source={Images.ic_diamond}
                  tintColor={Colors.orange}
                />
              </View>

              <View style={styles.infoCardContainerRowTextContainer}>
                <ThemeText style={styles.infoCardContainerRowTextLeft}>
                  {FormatDateTsTime(parseFloat(x.milestone))}{' '}
                </ThemeText>
                <ThemeText>{x.consumable} %</ThemeText>
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  }

  const redeemRewards = () => {
    setIsRedeeming(true);
    makeRequest(
      'POST',
      APIConstants.STAKING_ACCOUNT_REDEEM_DRIP,
      {},
      {stake_id: detail.stake_id},
    )
      .then(res => {
        const {status, message} = res;

        let type = 'error';

        if (status == 200) {
          type = 'success';
        }

        showToast('Staking', message, type);
        dispatch(StakingActions.GetCurrentEarnings());
        dispatch(StakingActions.GetCurrentStaked());
        dispatch(QuickBuyActions.fundsList());
      })
      .catch(e => {
        showToast('Staking', 'error while redeeming rewards', 'error');
      })
      .finally(() => setIsRedeeming(false));
  };

  let redeemBtnProps: any = {
    text: strings('redeem'),
  };

  if (isRedeeming) {
    redeemBtnProps = {
      ...redeemBtnProps,
      disabled: true,
      disabledColor: Colors.gray,
    };
  }

  if (parseFloat(drip_reward) <= 0) {
    redeemBtnProps = {
      ...redeemBtnProps,
      disabled: true,
      disabledColor: Colors.gray,
      text: strings('no_redeemable_rewards'),
    };
  }

  return (
    <View style={[styles.tabBody]}>
      <ScrollView>
        <View>
          <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
            {strings('accrued_rewards')}
          </ThemeText>

          <View
            style={[
              styles.infoCardContainer,
              ThemeFunctions.setIEOCardBG(appTheme),
            ]}>
            <View style={[styles.infoCardContainerRow]}>
              <View style={styles.infoCardContainerRowImageContainer}>
                <Image
                  resizeMode={'contain'}
                  style={styles.infoCardContainerRowImage}
                  source={Images.ic_diamond}
                  tintColor={Colors.orange}
                />
              </View>

              <View style={styles.infoCardContainerRowTextContainer}>
                <View style={styles.infoCardContainerRowTextLeft}>
                  <ThemeText>{strings('accrued_days')}</ThemeText>
                </View>

                <View style={[styles.infoCardContainerRowTextRight]}>
                  <ThemeText style={{textAlign: 'right'}}>
                    {detail.accure_days} Days{' '}
                  </ThemeText>
                </View>
              </View>
            </View>
          </View>

          <View
            style={[
              styles.infoCardContainer,
              ThemeFunctions.setIEOCardBG(appTheme),
            ]}>
            <View style={[styles.infoCardContainerRow]}>
              <View style={styles.infoCardContainerRowImageContainer}>
                <Image
                  resizeMode={'contain'}
                  style={styles.infoCardContainerRowImage}
                  source={Images.ic_diamond}
                  tintColor={Colors.orange}
                />
              </View>

              <View style={styles.infoCardContainerRowTextContainer}>
                <View style={styles.infoCardContainerRowTextLeft}>
                  <ThemeText>{strings('accrued_rewards')}</ThemeText>
                </View>

                <View style={[styles.infoCardContainerRowTextRight]}>
                  <ThemeText style={{textAlign: 'right'}}>
                    {FormatNumber(est_reward)} {detail.coin}
                  </ThemeText>
                </View>
              </View>
            </View>
          </View>

          <ThemeText
            style={{color: ThemeFunctions.customText(appTheme), marginTop: 20}}>
            {strings('reward_release_details')}
          </ThemeText>

          <View
            style={[
              styles.infoCardContainer,
              ThemeFunctions.setIEOCardBG(appTheme),
            ]}>
            <View style={[styles.infoCardContainerRow]}>
              <View style={styles.infoCardContainerRowImageContainer}>
                <Image
                  resizeMode={'contain'}
                  style={styles.infoCardContainerRowImage}
                  source={Images.ic_diamond}
                  tintColor={Colors.orange}
                />
              </View>

              <View style={styles.infoCardContainerRowTextContainer}>
                <ThemeText style={styles.infoCardContainerRowTextLeft}>
                  {strings('reward_interval')}
                </ThemeText>
                <ThemeText>{parseFloat(frequency) / ONE_DAY_MS} Days</ThemeText>
              </View>
            </View>
          </View>

          <ThemeText
            style={{color: ThemeFunctions.customText(appTheme), marginTop: 20}}>
            {strings('redeemable_rewards_details')}
          </ThemeText>

          <View
            style={[
              styles.infoCardContainer,
              ThemeFunctions.setIEOCardBG(appTheme),
            ]}>
            <View style={[styles.infoCardContainerRow]}>
              <View style={styles.infoCardContainerRowImageContainer}>
                <Image
                  resizeMode={'contain'}
                  style={styles.infoCardContainerRowImage}
                  source={Images.ic_diamond}
                  tintColor={Colors.orange}
                />
              </View>

              <View style={styles.infoCardContainerRowTextContainer}>
                <ThemeText style={styles.infoCardContainerRowTextLeft}>
                  {strings('consumable_percentage')}
                </ThemeText>
                <ThemeText>{consumable} %</ThemeText>
              </View>
            </View>
          </View>

          <View
            style={[
              styles.infoCardContainer,
              ThemeFunctions.setIEOCardBG(appTheme),
            ]}>
            <View style={[styles.infoCardContainerRow]}>
              <View style={styles.infoCardContainerRowImageContainer}>
                <Image
                  resizeMode={'contain'}
                  style={styles.infoCardContainerRowImage}
                  source={Images.ic_diamond}
                  tintColor={Colors.orange}
                />
              </View>

              <View style={styles.infoCardContainerRowTextContainer}>
                <View style={styles.infoCardContainerRowTextLeft}>
                  <ThemeText>{strings('redeemable_rewards')}</ThemeText>
                </View>

                <View style={[styles.infoCardContainerRowTextRight]}>
                  <ThemeText style={{textAlign: 'right'}}>
                    {drip_reward} {coin}
                  </ThemeText>
                </View>
              </View>
            </View>
          </View>

          {lockedRewardsDetails}
        </View>
      </ScrollView>

      <View>
        <ThemeButton onClickHandler={redeemRewards} {...redeemBtnProps} />
      </View>
    </View>
  );
};

const RedeemLocked = (props: any) => {
  const detail = props.detail;
  const [isRedeeming, setIsRedeeming] = useState(false);
  const dispatch = useDispatch();

  const {isRtlApproach, appTheme, appColor} = useSelector(
    (state: any) => state.globalReducer,
  );

  const redeemRewards = () => {
    setIsRedeeming(true);
    makeRequest(
      'POST',
      APIConstants.STAKING_ACCOUNT_REDEEM,
      {},
      {stake_id: detail.stake_id},
    )
      .then(res => {
        const {status, message} = res;

        let type = 'error';

        if (status == 200) {
          type = 'success';
        }

        showToast('Staking', message, type);
        dispatch(StakingActions.GetCurrentEarnings());
        dispatch(StakingActions.GetCurrentStaked());
        dispatch(QuickBuyActions.fundsList());
      })
      .catch(e => {
        showToast('Staking', 'error while redeeming rewards', 'error');
      })
      .finally(() => setIsRedeeming(false));
  };

  let resultObj =
    detail?.lock_rewards?.reduce((acc, cur) => {
      if (!acc[cur.milestone]) acc[cur.milestone] = {reward: 0, consumable: 0, milestone:cur.milestone};

      acc[cur.milestone].reward += parseFloat(cur.reward);
      acc[cur.milestone].consumable += parseFloat(cur.consumable);
      return acc;
    }, {}) || {};

  let resultArr = Object.keys(resultObj)
    .map(x => resultObj[x])
    .sort((a, b) => parseFloat(a.milestone) - parseFloat(b.milestone));

  let redeemBtnProps: any = {
    text: strings('redeem'),
  };

  if (isRedeeming) {
    redeemBtnProps = {
      ...redeemBtnProps,
      disabled: true,
      disabledColor: Colors.gray,
    };
  }

  if (resultArr.every(x => parseFloat(x.reward) <= 0)) {
    redeemBtnProps = {
      ...redeemBtnProps,
      disabled: true,
      disabledColor: Colors.gray,
      text: strings('no_redeemable_rewards'),
    };
  }

  let lockedRewardsDetails = (
    <View style={[styles.releaseBreakdownContainer]}>
      <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
        {strings('locked_release_breakdown')}
      </ThemeText>

      <View
        style={[
          styles.infoCardContainer,
          ThemeFunctions.setIEOCardBG(appTheme),
          {padding: 20},
        ]}>
        <ThemeText>{strings('no_locked_rewards_1')}</ThemeText>
        <ThemeText>{strings('no_locked_rewards_2')}</ThemeText>
      </View>
    </View>
  );

  if (resultArr.length > 0) {
    lockedRewardsDetails = (
      <View style={[styles.releaseBreakdownContainer, {marginTop: 10}]}>
        <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
          {strings('locked_release_breakdown')}
        </ThemeText>

        {resultArr.map((x, i) => (
          <View
            key={i}
            style={[
              styles.infoCardContainer,
              ThemeFunctions.setIEOCardBG(appTheme),
            ]}>
            <View style={[styles.infoCardContainerRow]}>
              <View style={styles.infoCardContainerRowImageContainer}>
                <Image
                  resizeMode={'contain'}
                  style={styles.infoCardContainerRowImage}
                  source={Images.ic_diamond}
                  tintColor={
                    parseFloat(x.reward) > 0 ? Colors.orange : Colors.gray
                  }
                />
              </View>

              <View style={styles.infoCardContainerRowTextContainer}>
                <ThemeText style={styles.infoCardContainerRowTextLeft}>
                  {FormatDateTsTime(parseFloat(x.milestone))}{' '}
                </ThemeText>

                <View style={{flex: 1}}>
                  <ThemeText style={{textAlign: 'right'}}>
                    {FormatNumber(x.reward)} {detail.coin}
                  </ThemeText>
                  <ThemeText
                    style={{
                      fontSize: 12,
                      color: ThemeFunctions.customText(appTheme),
                      textAlign: 'right',
                    }}>
                    {x.consumable} %
                  </ThemeText>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  }

  return (
    <View style={[styles.tabBody]}>
      <ScrollView>{lockedRewardsDetails}</ScrollView>

      <View>
        <ThemeButton onClickHandler={redeemRewards} {...redeemBtnProps} />
      </View>
    </View>
  );
};

const RedeemRewards = (props: any) => {
  const [index, setIndex] = useState(0);

  const {detail = {}} = props?.route?.params;

  const [routes] = React.useState([
    {key: 'drip', title: strings('drip')},
    {key: 'locked', title: strings('locked')},
  ]);

  const {isRtlApproach, appTheme, appColor} = useSelector(
    (state: any) => state.globalReducer,
  );

  const renderScene = ({route: {key}}) => {
    if (key === 'drip') return <RedeemDrip detail={detail} />;
    else return <RedeemLocked detail={detail} />;
  };

  return (
    <SafeAreaView
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      <Header title={strings('staking_redeem')} showBack={true} isTab={true} />

      <View style={styles.mainContainer}>
        <TabView
          tabBarPosition="top"
          navigationState={{
            index,
            routes: routes,
          }}
          renderScene={renderScene}
          onIndexChange={index => setIndex(index)}
          initialLayout={{width: useWindowDimensions().width}}
          renderTabBar={props => (
            <TabBar
              bounces={true}
              scrollEnabled={true}
              style={[ThemeFunctions.setBackground(appTheme), styles.tabStyle]}
              indicatorStyle={ThemeFunctions.setBackground(appTheme)}
              contentContainerStyle={[
                styles.tabContainer,
                {backgroundColor: ThemeFunctions.getTabBgColor(appTheme)},
              ]}
              onTabLongPress={({route: {key}}) => {
                props.jumpTo(key);
              }}
              {...props}
              pressColor="transparent"
              renderLabel={({route, focused, color}) => (
                <View style={styles.tabView}>
                  <Text
                    adjustsFontSizeToFit={true}
                    style={[
                      styles.textTab,
                      focused
                        ? ThemeFunctions.textColor(appTheme)
                        : {color: ThemeFunctions.customText(appTheme)},
                    ]}>
                    {route?.title}
                  </Text>
                  <View
                    style={
                      focused && [
                        styles.line,
                        {backgroundColor: ThemeFunctions.getColor(appColor)},
                      ]
                    }
                  />
                </View>
              )}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default RedeemRewards;
