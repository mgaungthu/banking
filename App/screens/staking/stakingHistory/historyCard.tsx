import React, {useEffect, useState, useRef} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {ThemeButton, ThemeText} from '../../../components';
import {ONE_DAY_MS} from '../../../constants/AppConstants';
import {strings} from '../../../strings';
import {AppFunctions, ThemeFunctions} from '../../../utils';
import {FormatDateTime} from '../../../utils/AppFunctions';

import * as styles from './styles';

const HistoryCard = (props: any) => {
  const {item, handleWithdraw} = props;
  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer);
  console.log(item);

  const getGain = (amount, rate, term) => {
    let periodsPerYear;

    switch (term) {
      case 'term_daily':
        periodsPerYear = 365;
        break;
      case 'term_weekly':
        periodsPerYear = 52;
        break;
      case 'term_monthly':
        periodsPerYear = 12;
        break;
      case 'term_yearly':
        periodsPerYear = 1;
        break;
      default:
        console.error('Invalid term provided');
        return 0;
    }

    const periodicInterest = rate / 100 / periodsPerYear;
    return amount * periodicInterest;
  };

  return (
    <View
      style={[
        styles.stakingHistory.historyCard,
        ThemeFunctions.setIEOCardBG(appTheme),
      ]}>
      <View
        style={[
          styles.stakingHistory.historyCardRow,
          {
            borderColor: ThemeFunctions.customText(appTheme),
            borderBottomWidth: 1,
          },
        ]}>
        <View style={[styles.stakingHistory.historyCardRowLeft]}>
          <ThemeText>{strings('currency')}</ThemeText>
        </View>

        <View style={[styles.stakingHistory.historyCardRowRight]}>
          <ThemeText>{item.currency.name}</ThemeText>
        </View>
      </View>

      <View
        style={[
          styles.stakingHistory.historyCardRow,
          {
            borderColor: ThemeFunctions.customText(appTheme),
            borderBottomWidth: 1,
          },
        ]}>
        <View style={[styles.stakingHistory.historyCardRowLeft]}>
          <ThemeText>{strings('Stake Amount')}</ThemeText>
        </View>

        <View style={[styles.stakingHistory.historyCardRowRight]}>
          <ThemeText>
            {AppFunctions.standardDigitConversion(
              (item.amount * 1).toFixed(item?.currency?.decimals - 6),
            )}
          </ThemeText>
        </View>
      </View>

      <View
        style={[
          styles.stakingHistory.historyCardRow,
          {
            borderColor: ThemeFunctions.customText(appTheme),
            borderBottomWidth: 1,
          },
        ]}>
        <View style={[styles.stakingHistory.historyCardRowLeft]}>
          <ThemeText>{strings('Interest')}</ThemeText>
        </View>

        <View style={[styles.stakingHistory.historyCardRowRight]}>
          <ThemeText>
            {AppFunctions.standardDigitConversion(
              (item.interest * 1).toFixed(item?.currency?.decimals - 6),
            )}
          </ThemeText>
        </View>
      </View>

      <View
        style={[
          styles.stakingHistory.historyCardRow,
          {
            borderColor: ThemeFunctions.customText(appTheme),
            borderBottomWidth: 1,
          },
        ]}>
        <View style={[styles.stakingHistory.historyCardRowLeft]}>
          <ThemeText>{strings('Gain')}</ThemeText>
        </View>

        <View style={[styles.stakingHistory.historyCardRowRight]}>
          <ThemeText>
            {' '}
            +
            {AppFunctions.standardDigitConversion(
              getGain(item.amount, item.rate, item.term).toFixed(8),
            )}
          </ThemeText>
          {/* <ThemeText>{FormatDateTsTime(parseFloat(props.item.date))}</ThemeText> */}
        </View>
      </View>

      <View
        style={[
          styles.stakingHistory.historyCardRow,
          {
            borderColor: ThemeFunctions.customText(appTheme),
            borderBottomWidth: 1,
          },
        ]}>
        <View style={[styles.stakingHistory.historyCardRowLeft]}>
          <ThemeText>{strings('Rate')}</ThemeText>
        </View>

        <View style={[styles.stakingHistory.historyCardRowRight]}>
          <ThemeText>{parseFloat(item.rate)}% </ThemeText>
        </View>
      </View>

      <View
        style={[
          styles.stakingHistory.historyCardRow,
          {
            borderColor: ThemeFunctions.customText(appTheme),
            borderBottomWidth: 1,
          },
        ]}>
        <View style={[styles.stakingHistory.historyCardRowLeft]}>
          <ThemeText>{strings('Creation Date')}</ThemeText>
        </View>

        <View style={[styles.stakingHistory.historyCardRowRight]}>
          <ThemeText>{FormatDateTime(item.created_at)}</ThemeText>
        </View>
      </View>
      <View
        style={[
          styles.stakingHistory.historyCardRow,
          {
            borderColor: ThemeFunctions.customText(appTheme),
            borderBottomWidth: 1,
          },
        ]}>
        <View style={[styles.stakingHistory.historyCardRowLeft]}>
          <ThemeText>{strings('Next Interest Due')}</ThemeText>
        </View>

        <View style={[styles.stakingHistory.historyCardRowRight]}>
          {item.status != 'active' ? (
            <ThemeText>Stopped</ThemeText>
          ) : (
            <ThemeText>{FormatDateTime(item.next_interest_due)}</ThemeText>
          )}
        </View>
      </View>
      <View
        style={[
          styles.stakingHistory.historyCardRow,
          {
            borderColor: ThemeFunctions.customText(appTheme),
            borderBottomWidth: item.status === 'active' ? 1 : 0,
          },
        ]}>
        <View style={[styles.stakingHistory.historyCardRowLeft]}>
          <ThemeText>{strings('Status')}</ThemeText>
        </View>

        <View style={[styles.stakingHistory.historyCardRowRight]}>
          <ThemeText>{strings(item.status)}</ThemeText>
        </View>
      </View>

      {item.status === 'active' && (
        <View>
          <View>
            <ThemeButton
              text={'Withdraw'}
              onClickHandler={() => handleWithdraw(item.id)}
              styleText={{textTransform: 'uppercase'}}
              // loading={appData.loading === Loader.STAKE}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default HistoryCard;
