import React from 'react';
import {View, Text, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {
  ieoDetailsSelector,
  ieoRateSelector,
} from '../../../store/selectors/ieoSelector';
import {QuickBuyActions} from '../../../store';
import {roundNumber, RoundUptoSignificant} from '../../../utils/AppFunctions';
import {Icon} from 'react-native-elements';
import {isDarkTheme} from '../../../utils/ThemeFunctions';
import {ThemeFunctions} from '../../../utils';
import {strings} from '../../../strings';
import {rtlStyles} from '../../../globalstyles/styles';

const BreakDown = ({amount, secondCurrency, firstCurrency, imgUri}) => {
  const {rate, isLoading, isError} = useSelector(ieoRateSelector);
  const {appTheme, isRtlApproach} = useSelector(
    (state: any) => state.globalReducer,
  );

  const eurPrice =
    rate?.rates?.find(token => token.currencyname === 'EUR')?.tokenPrice || 0;
  const firstCurrencyPrice =
    rate?.rates?.find(token => token.currencyname === firstCurrency)
      ?.tokenPrice || 0;

  const roundedEurPrice = RoundUptoSignificant(eurPrice.toString());
  const roundedFirstCurrencyPrice = RoundUptoSignificant(
    firstCurrencyPrice.toString(),
  );

  const {assetMetadata} = useSelector((state: any) => state.globalReducer);

  const bonus = (rate.bonus / 100) * amount;
  const totalAmount = parseFloat(bonus as string) + parseFloat(amount);

  const getImageUrl = () => {
    const filteredData = assetMetadata?.find(
      res => res?.currency?.toLowerCase() === firstCurrency?.toLowerCase(),
    );

    if (filteredData && Object.keys(filteredData).length > 0) {
      return QuickBuyActions.getImgUrl(
        filteredData.currency,
        filteredData.version,
      );
    } else {
      return 'https://api.globiance.com/assets/wallet/default.png';
    }
  };

  return (
    <View style={{width: '100%', position: 'relative'}}>
      <View style={{alignItems: 'flex-end'}}>
        <Icon
          name="expand-less"
          type="material"
          size={22}
          color={isDarkTheme(appTheme) ? '#fff' : '#000'}
        />
      </View>
      <View
        style={[
          {
            borderBottomWidth: 1,
            borderBottomColor: isDarkTheme(appTheme) ? '#fff' : '#000',
            marginBottom: 10,
            paddingBottom: 10,
            paddingHorizontal: 10,
            width: '100%',
          },
        ]}>
        <Text
          style={[
            {fontSize: 16, fontWeight: '700', marginBottom: 10},
            ThemeFunctions.getTextColor(appTheme),
            isRtlApproach ? rtlStyles.textRight : {},
          ]}>
          {strings('price_breakdown')}
        </Text>
        <View style={[{width: '100%'}]}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={[
                  {fontSize: 16, fontWeight: '500'},
                  ThemeFunctions.getTextColor(appTheme),
                ]}>
                {'1' + ' ' + secondCurrency}
              </Text>
              <Image
                source={{uri: imgUri}}
                style={{width: 20, height: 20, marginLeft: 5}}
              />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={[
                  {fontSize: 16, fontWeight: '500'},
                  ThemeFunctions.getTextColor(appTheme),
                ]}>
                {roundedEurPrice} EUR
              </Text>
              <Image
                source={{
                  uri: 'https://api.globiance.com/api/assets/wallet/EUR.png',
                }}
                style={{width: 20, height: 20, marginLeft: 5}}
              />
            </View>
          </View>

          {firstCurrency ? (
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={[
                    {fontSize: 16, fontWeight: '500'},
                    ThemeFunctions.getTextColor(appTheme),
                  ]}>
                  {'1' + ' ' + secondCurrency}
                </Text>
                <Image
                  source={{uri: imgUri}}
                  style={{width: 20, height: 20, marginLeft: 5}}
                />
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={[
                    {fontSize: 16, fontWeight: '500'},
                    ThemeFunctions.getTextColor(appTheme),
                  ]}>
                  {roundedFirstCurrencyPrice} {firstCurrency}
                </Text>
                <Image
                  source={{uri: getImageUrl()}}
                  style={{width: 20, height: 20, marginLeft: 5}}
                />
              </View>
            </View>
          ) : null}
        </View>
      </View>
      <View style={{paddingHorizontal: 10}}>
        <Text
          style={[
            {fontSize: 16, fontWeight: '700', marginBottom: 10},
            ThemeFunctions.getTextColor(appTheme),
            isRtlApproach ? rtlStyles.textRight : {},
          ]}>
          {strings('amount_breakdown')}
        </Text>
        <View
          style={[
            {flexDirection: 'row', justifyContent: 'space-between'},
            isRtlApproach ? rtlStyles.reverseRow : {},
          ]}>
          <Text
            style={[
              {fontSize: 16, fontWeight: '500'},
              ThemeFunctions.getTextColor(appTheme),
            ]}>
            {strings('amount')}
          </Text>
          <Text
            style={[
              {fontSize: 16, fontWeight: '500'},
              ThemeFunctions.getTextColor(appTheme),
            ]}>
            {RoundUptoSignificant(amount.toString())}
          </Text>
        </View>

        <View
          style={[
            {flexDirection: 'row', justifyContent: 'space-between'},
            isRtlApproach ? rtlStyles.reverseRow : {},
          ]}>
          <Text
            style={[
              {fontSize: 16, fontWeight: '500'},
              ThemeFunctions.getTextColor(appTheme),
            ]}>
            {isRtlApproach
              ? strings('bonus') + '%' + rate.bonus
              : strings('bonus') + rate.bonus + '%'}
          </Text>
          <Text
            style={[
              {fontSize: 16, fontWeight: '500'},
              ThemeFunctions.getTextColor(appTheme),
            ]}>
            {RoundUptoSignificant(bonus.toString())}
          </Text>
        </View>

        <View style={[{flexDirection: 'row', justifyContent: 'space-between'}, isRtlApproach ? rtlStyles.reverseRow : {}]}>
          <Text
            style={[
              {fontSize: 16, fontWeight: '500'},
              ThemeFunctions.getTextColor(appTheme),
            ]}>
            {strings('total_amount')}
          </Text>
          <Text
            style={[
              {fontSize: 16, fontWeight: '500'},
              ThemeFunctions.getTextColor(appTheme),
            ]}>
            {RoundUptoSignificant(totalAmount.toString())}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BreakDown;
