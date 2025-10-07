import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {ThemeText, Space, LoadingSpinner} from '../../../components';
import {AppFunctions, ThemeFunctions} from '../../../utils';
import {tradeHistoryStyle as styles} from '../styles';
import Colors, {darkTheme, lightTheme} from '../../../theme/Colors';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {isDarkTheme} from '../../../utils/ThemeFunctions';
import Side from '../../../components/ui/Side';

const TradeHistory = (props: any) => {
  const {orders, isLoading, error, appTheme, appColor} = props;

  const splitOrders = orders?.slice(0, 10);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      nestedScrollEnabled={true}>
      <Space height={10} />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
          ( Last 10 orders )
        </ThemeText>
      </View>
      <Space height={10} />
      {isLoading ? (
        <LoadingSpinner
          color={ThemeFunctions.getColor(appColor)}
          size="small"
        />
      ) : error ? (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <ThemeText>{error}</ThemeText>
        </View>
      ) : (
        splitOrders?.map((item, key) => (
          <View
            style={[
              styles.containerItem,
              {
                backgroundColor: isDarkTheme(appTheme)
                  ? darkTheme.secondaryColor
                  : lightTheme.secondaryColor,
              },
            ]}
            key={key}>
            <Side type={item.side} />
            <View>
              <View style={styles.rowItem}>
                <ThemeText
                  style={[
                    styles.item1,
                    {
                      color:
                        item.side == 'buy'
                          ? Colors.currencyGreen
                          : Colors.currencyRed,
                    },
                  ]}>
                  {item.type == 'limit' ? 'Limit Order' : 'Market'}
                </ThemeText>
                <ThemeText style={styles.item1}>
                  {item?.stock}/{item.money}
                </ThemeText>
                <ThemeText
                  style={[
                    styles.item1,
                    {color: ThemeFunctions.customText(appTheme)},
                  ]}>
                  {moment(item?.create_time).format('DD-MM-YYYY HH:mm:ss')}
                </ThemeText>
              </View>
              <View style={styles.rowItem}>
                <ThemeText
                  style={[
                    styles.item1,
                    {color: ThemeFunctions.customText(appTheme)},
                  ]}>
                  Amount
                </ThemeText>
                <ThemeText style={styles.item1}>
                  {AppFunctions.standardDigitConversion(item.filled_qty)}/
                  <Text style={{color: ThemeFunctions.customText(appTheme)}}>
                    {AppFunctions.standardDigitConversion(item.amount)}
                  </Text>
                </ThemeText>

                <View style={styles.item1}>
                  <ThemeText>{item.status}</ThemeText>
                </View>
              </View>
              <View style={styles.rowItem}>
                <ThemeText
                  style={[
                    styles.item1,
                    {color: ThemeFunctions.customText(appTheme)},
                  ]}>
                  Price
                </ThemeText>
                <ThemeText style={styles.item1}>
                  {AppFunctions.standardDigitConversion(item.price)}
                </ThemeText>
              </View>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default React.memo(TradeHistory);
