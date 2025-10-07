import React, {forwardRef, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {ThemeText, Space, LoadingSpinner} from '../../../components';
import {AppFunctions, ThemeFunctions} from '../../../utils';
import {strings} from '../../../strings';
import {tradeHistoryStyle as styles} from '../styles';
import Colors, {darkTheme, lightTheme} from '../../../theme/Colors';
import {APIConstants, MapperConstants} from '../../../constants';
import {showToast} from '../../../utils/GenericUtils';
import {useDispatch, useSelector} from 'react-redux';
import {makeRequest} from '../../../services/ApiService';
import {isDarkTheme} from '../../../utils/ThemeFunctions';
import moment from 'moment';
import {ActivityIndicator} from 'react-native-paper';
import Side from '../../../components/ui/Side';
import {useUserOrders} from '../../../utils/hooks/useUserOrders';
import {CurrentConfig} from '../../../../api_config';
import { fundsList } from '../../../store/action/quickbuy/QuickBuyAction';
import _ from "lodash"

const OpenOrder = forwardRef((props: any, ref) => {
  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer);

  const [isPress, setIsPress] = useState(false);

  const pair = props.pair || 'BTC-EUR';

  const {orders, isLoading, error} = props;

  const market = pair?.replace(/-/g, '');

  const {userProfileData} = useSelector((state: any) => state.appReducer);

  const {tickers} = useSelector((state: any) => state.tickerReducer);
  const dataPair = tickers?.find(i => i.pairName == pair);

  const dispatch = useDispatch();

  const cancelOrder = async data => {
    setIsPress(data.id);
    console.log({
      exchange_id: CurrentConfig.exchange_id,
      user_id: userProfileData.uniqueId,
      pair: market,
      pairId: dataPair.pairId,
      trade_order_id: data.id,
      stock: data.stock,
      money: data.money,
      side: data.side,
    })
    try {
      const response: any = await makeRequest(
        MapperConstants.ApiTypes.POST,
        APIConstants.CANCEL_ORDER,
        {},
        {
          exchange_id: CurrentConfig.exchange_id,
          user_id: userProfileData.uniqueId,
          pair: market,
          pairId: dataPair.pairId,
          trade_order_id: data.id,
          stock: data.stock,
          money: data.money,
          side: data.side,
        },
      );
      setIsPress(false);
      if (response.status === 200) {
        setIsPress(false);
        showToast(strings('trade'), response.message, 'success');
      } else {
        console.log(response);
        showToast(strings('trade'), response.message, 'error');
      }
    } catch (error) {
      showToast(strings('trade'), 'Error', 'error');
    } finally {
      dispatch(fundsList())
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      nestedScrollEnabled={true}>
      <Space height={10} />
      {isLoading ? (
        <LoadingSpinner
          color={ThemeFunctions.getColor(appColor)}
          size="small"
        />
      ) : (
        <>
          {error ? (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <ThemeText>{error}</ThemeText>
            </View>
          ) : (
            orders?.map((item, key) => (
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
                      {AppFunctions.standardDigitConversion(item?.filled_qty)}/
                      <Text
                        style={{color: ThemeFunctions.customText(appTheme)}}>
                        {AppFunctions.standardDigitConversion(item?.amount)}
                      </Text>
                    </ThemeText>
                    <TouchableOpacity
                      style={[
                        styles.cancelButton,
                        ThemeFunctions.setBackground(appTheme),
                      ]}
                      onPress={() => cancelOrder(item)}>
                      {isPress == item?.id ? (
                        <ActivityIndicator
                          color={ThemeFunctions.getCurrentTextColor(appTheme)}
                        />
                      ) : (
                        <ThemeText>Cancel</ThemeText>
                      )}
                    </TouchableOpacity>
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
                      {AppFunctions.standardDigitConversion(item?.price)}
                    </ThemeText>
                  </View>
                </View>
              </View>
            ))
          )}
        </>
      )}
    </ScrollView>
  );
});

export default React.memo(OpenOrder, (prevProps, nextProps) => {
  return (
    _.isEqual(prevProps.orders, nextProps.orders)&&
    _.isEqual(prevProps.error, nextProps.error)&&
    prevProps.isLoading === nextProps.isLoading
  );
});