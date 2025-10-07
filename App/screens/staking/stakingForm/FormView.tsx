import React, {useRef, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';

import {formStyles as styles} from '../../account/styles';
import {Input, ThemeText} from '../../../components';
import {FormConstants, ReturnKeyTypes} from '../../../enums';
import {strings} from '../../../strings';
import {useSelector, useDispatch} from 'react-redux';
import {commonStyles, rtlStyles} from '../../../globalstyles/styles';
import {AppActions} from '../../../store';
import {isIOS} from '../../../utils/DeviceConfig';
import {useTranslation} from 'react-i18next';
import {AppFunctions, ThemeFunctions} from '../../../utils';
import {historyStyles} from '../../quickbuy/styles';
import {withdrawalStyles} from '../../payments/styles';
import {withdrawAddressStyles} from '../../funding/styles';
import fonts from '../../../theme/fonts';

const FormView = (props: any) => {
  const {control, errors, selectedStake, setValue, available} = props;

  const stateRef = useRef(null);
  const {appTheme, isRtlApproach, appColor} = useSelector(
    (state: any) => state.globalReducer,
  );

  const [amount, setAmount] = useState(0);
  const [fee, setFee] = useState(0);
  const [totalStake, setTotalStake] = useState(0);

  const {stake} = useSelector((state: any) => state.stakingReducer);

  // const countries = appData?.countries?.map(el => el.name).sort()
  // const countryCodes = appData?.countries
  //   ?.map(el => `+${el.phoneCode} (${el.name})`)
  //   .sort()

  const filterStake = stake.find(item => {
    return item.id === selectedStake;
  });

  const maximumStakeAmount = () => {
    if (!filterStake || filterStake.reward_pool_size <= 0) {
      return 0;
    }

    const remainingReward =
      filterStake.reward_pool_size - filterStake.rewarded_size;

    if (remainingReward <= 0) {
      return 0;
    }

    let periods = 1;
    switch (filterStake.term) {
      case 'term_daily':
        periods = 365;
        break;
      case 'term_weekly':
        periods = 52;
        break;
      case 'term_monthly':
        periods = 12;
        break;
      case 'term_yearly':
        periods = 1;
        break;
    }

    const periodicRate = filterStake.rate / 100 / periods;

    const maxBasedOnReward = remainingReward / periodicRate;

    const maxAllowed = filterStake.max_value || Infinity;

    return Math.min(maxBasedOnReward, maxAllowed);
  };

  const max_value = maximumStakeAmount();

  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(AppActions.getUserProfile());
  }, [dispatch]);

  const reverseDirection = () => {
    return [
      historyStyles.rowItem,
      {
        borderBottomWidth: 0,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 0,
        paddingRight: 0,
      },
      isRtlApproach ? rtlStyles.reverseRow : {},
    ];
  };

  const leftAlignView = () => {
    return [
      withdrawalStyles.leftItemView,
      isRtlApproach ? rtlStyles.alignEnd : rtlStyles.alignStart,
    ];
  };

  const rightAlignView = () => {
    return [
      withdrawalStyles.rightView,

      isRtlApproach ? rtlStyles.alignStart : rtlStyles.alignEnd,
    ];
  };

  const leftTextColor = () => {
    return {color: ThemeFunctions.customText(appTheme)};
  };

  const formatNumber = num => {
    // Remove non-numeric characters except decimal
    let cleanedNum = num.replace(/[^0-9.]/g, '');

    // Split into integer and decimal parts
    let [integer, decimal] = cleanedNum.split('.');

    // Format integer part with commas
    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Return formatted number
    return decimal !== undefined ? `${integer}.${decimal}` : integer;
  };

  const handleAmount = val => {
    const decimal = Number(val.replace(/,/g, '')).toFixed(8);
    setAmount(decimal);
    setValue(FormConstants.Amount, `${formatNumber(val)}`);
    const totalFee = val.replace(/,/g, '') * filterStake.commission;
    const stakeVal = val.replace(/,/g, '') - (totalFee * 0.01).toFixed(8);
    setTotalStake(stakeVal);
    setFee(totalFee);
  };

  const setMaxAmount = () => {
    setValue(FormConstants.Amount, `${available}`);
    handleAmount(available);
  };

  return (
    <View style={styles.formView}>
      {/* <TouchableOpacity onPress={handlePicker(1)}> */}
      <Input
        id={FormConstants.Stake}
        label={strings('stake')}
        placeholder={`${strings('select')} ${strings('stake')}`}
        control={control}
        errors={errors}
        isRequired={true}
        isFieldFilledBg={false}
        showDropDown={false}
        dropdown={true}
        showTick={false}
        disableInput={true}
      />
      {/* </TouchableOpacity> */}

      {/* <TouchableOpacity onPress={handlePicker(2)}> */}
      <Input
        id={FormConstants.Wallet}
        label={strings('wallet')}
        placeholder={`${strings('select')} ${strings('wallet')}`}
        control={control}
        errors={errors}
        isRequired={true}
        isFieldFilledBg={false}
        showDropDown={false}
        dropdown={true}
        showTick={false}
        disableInput={true}
      />
      {/* </TouchableOpacity> */}

      <Input
        id={FormConstants.Amount}
        label={strings('amount')}
        placeholder={strings('amount')}
        onChangeVal={handleAmount}
        keyboardType="numeric"
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={true}
        rightComponent={
          <TouchableOpacity
            style={withdrawAddressStyles.maxButton}
            onPress={setMaxAmount}>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              style={{color: ThemeFunctions.getColor(appColor)}}>
              MAX
            </Text>
          </TouchableOpacity>
        }
      />

      <View style={[{marginTop: 10, padding: 0}]}>
        <View style={[{flexDirection: 'row', justifyContent: 'flex-end'}]}>
          <Text style={[withdrawalStyles.rightLabel, leftTextColor()]}>
            Min:{' '}
            {AppFunctions.smartRound(
              (filterStake?.min_value * 1).toFixed(8),
              filterStake?.currency?.decimals,
            )}{' '}
            {filterStake?.currency?.symbol}
          </Text>
        </View>
      </View>
      <View style={[{marginTop: 10, padding: 0}]}>
        <View style={[{flexDirection: 'row', justifyContent: 'flex-end'}]}>
          <Text style={[withdrawalStyles.rightLabel, leftTextColor()]}>
            Max:{' '}
            {AppFunctions.smartRound(
              (max_value * 1).toFixed(8),
              filterStake?.currency?.decimals,
            )}{' '}
            {filterStake?.currency?.symbol}
          </Text>
        </View>
      </View>
      <View style={[{padding: 0, marginTop: 10, margin: 0}]}>
        <View style={[{flexDirection: 'row', justifyContent: 'flex-end'}]}>
          <Text style={[withdrawalStyles.rightLabel, leftTextColor()]}>
            Rate: {filterStake?.rate} %
          </Text>
        </View>
      </View>

      {amount > 0 && (
        <View style={{borderTopWidth: 1, marginTop: 20}}>
          <View style={[reverseDirection(), {marginTop: 10}]}>
            <View style={leftAlignView()}>
              <Text style={[withdrawalStyles.leftLabel, leftTextColor()]}>
                Total Stake Value:
              </Text>
            </View>
            <View />
            <View
              style={[
                rightAlignView(),
                {flexDirection: 'row', justifyContent: 'flex-end'},
              ]}>
              <Text style={[withdrawalStyles.rightLabel, leftTextColor()]}>
                {AppFunctions.smartRound(
                  (totalStake * 1).toFixed(8),
                  filterStake?.currency?.decimals,
                )}{' '}
                {filterStake?.currency?.symbol}
              </Text>
            </View>
          </View>
          <View style={reverseDirection()}>
            <View style={leftAlignView()}>
              <Text style={[withdrawalStyles.leftLabel, leftTextColor()]}>
                Fee:
              </Text>
            </View>
            <View />
            <View
              style={[
                rightAlignView(),
                {flexDirection: 'row', justifyContent: 'flex-end'},
              ]}>
              <Text style={[withdrawalStyles.rightLabel, leftTextColor()]}>
                {AppFunctions.smartRound(
                  (fee * 0.01).toFixed(8),
                  filterStake?.currency?.decimals,
                )}{' '}
                {filterStake?.currency?.symbol}
              </Text>
            </View>
          </View>
          <View style={reverseDirection()}>
            <View style={leftAlignView()}>
              <Text style={[withdrawalStyles.leftLabel, leftTextColor()]}>
                Stake Amount:
              </Text>
            </View>
            <View />
            <View
              style={[
                rightAlignView(),
                {flexDirection: 'row', justifyContent: 'flex-end'},
              ]}>
              <Text style={[withdrawalStyles.rightLabel, leftTextColor()]}>
                {AppFunctions.smartRound(
                  (amount * 1).toFixed(8),
                  filterStake?.currency?.decimals,
                )}{' '}
                {filterStake?.currency?.symbol}
              </Text>
            </View>
          </View>
        </View>
      )}
      <View>
        {filterStake?.description && (
          <>
            <ThemeText
              style={{fontFamily: fonts.PoppinsBold, fontWeight: 'bold'}}>
              About this stake
            </ThemeText>
            <ThemeText>{filterStake?.description}</ThemeText>
          </>
        )}
      </View>
    </View>
  );
};

export default FormView;
