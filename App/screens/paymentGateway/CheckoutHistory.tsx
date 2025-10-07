import React, {useState, useEffect} from 'react';
import {RefreshControl, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import Clipboard from '@react-native-clipboard/clipboard';

import {Space, ThemeText} from '../../components';
import {HandlePaymentGatewayError} from '../../components/common';
import IconVector from '../../components/ui/IconVector';
import {axiosInstancePaymentGateway} from '../../services/AxiosOrder';
import {ThemeFunctions} from '../../utils';
import {FormatDateTime, FormatNumber} from '../../utils/AppFunctions';
import {showToast} from '../../utils/GenericUtils';
import {isDarkTheme} from '../../utils/ThemeFunctions';
import {TruncateString} from '../funding/common';

import styles from './styles';
import {strings} from '../../strings';
import Colors from '../../theme/Colors';

const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 0;

const CheckoutHistory = () => {
  const {appColor, appTheme} = useSelector((state: any) => state.globalReducer);

  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [currentLimit] = useState(DEFAULT_LIMIT);
  const [total, setTotalCount] = useState(0);

  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [partialLoading, setPartialLoading] = useState(false);

  const copyToClipboard = (text: string, copyText = strings('copied')) => {
    Clipboard.setString(text);
    showToast('', copyText, 'info');
  };

  const getCheckoutHistory = ({
    loading = true,
    loadNext = false,
  }: {
    loading?: boolean;
    loadNext?: boolean;
  }) => {
    loading && setIsLoading(true);
    if (!loadNext) {
      setCurrentPage(DEFAULT_PAGE)
      axiosInstancePaymentGateway
        .post(
          '/merchant-dashboard-api-service/wallet-payment/get-payment-history',
          {
            page: DEFAULT_PAGE,
            limit: DEFAULT_LIMIT,
          },
        )
        .then(resp => {
          setTotalCount(resp.data.data.count);
          setHistory(resp.data.data.rows);
        })
        .catch(e => {
          HandlePaymentGatewayError(e);
        })
        .finally(() => {
          setIsLoading(false);
          setPartialLoading(false);
        });
    } else {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      axiosInstancePaymentGateway
        .post(
          '/merchant-dashboard-api-service/wallet-payment/get-payment-history',
          {
            page: nextPage,
            limit: currentLimit,
          },
        )
        .then(resp => {
          const data: any = [...history, ...resp.data.data.rows];
          setHistory(data);
        })
        .catch(e => {
          HandlePaymentGatewayError(e);
        })
        .finally(() => {
          setIsLoading(false);
          setPartialLoading(false);
        });
    }
  };

  useEffect(() => {
    getCheckoutHistory({});
  }, []);

  const getRowStyle = () => {
    return {
      borderBottomColor: isDarkTheme(appTheme) ? '#1F1D2B' : '#d3d4db',
      borderBottomWidth: 1,
    };
  };

  const HistoryCard = ({data, srNo}) => {
    return (
      <View
        style={[
          styles.historyItemCard,
          ThemeFunctions.getListColor(appColor, appTheme),
        ]}>
        <View style={[styles.historyItemCardRow, getRowStyle()]}>
          <ThemeText>{strings("sr_no")}</ThemeText>
          <View>
            <ThemeText>{srNo}</ThemeText>
          </View>
        </View>
        <View style={[styles.historyItemCardRow, getRowStyle()]}>
          <ThemeText>{strings("checkout_id")}</ThemeText>

          <View style={{flexDirection: 'row'}}>
            <ThemeText>{TruncateString(data.checkoutId)}</ThemeText>

            <TouchableOpacity
              onPress={() => copyToClipboard(data.checkoutId)}
              style={[
                styles.copyBtn,
                {
                  borderColor: isDarkTheme(appTheme)
                    ? Colors.borderColor
                    : '#000',
                },
              ]}>
              <IconVector.FontAwesome5
                name="copy"
                color={ThemeFunctions.getColor(appColor)}
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.historyItemCardRow, getRowStyle()]}>
          <ThemeText>{strings("payment_id")}</ThemeText>
          <View style={{flexDirection: 'row'}}>
            <ThemeText>{TruncateString(data.paymentId)}</ThemeText>

            <TouchableOpacity
              onPress={() => copyToClipboard(data.paymentId)}
              style={[
                styles.copyBtn,
                {
                  borderColor: isDarkTheme(appTheme)
                    ? Colors.borderColor
                    : '#000',
                },
              ]}>
              <IconVector.FontAwesome5
                name="copy"
                color={ThemeFunctions.getColor(appColor)}
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.historyItemCardRow, getRowStyle()]}>
          <ThemeText>{strings("amount")}</ThemeText>
          <View>
            <ThemeText>
              {FormatNumber(data.amount)} {data.currencyName}
            </ThemeText>
          </View>
        </View>

        <View style={[styles.historyItemCardRow, getRowStyle()]}>
          <ThemeText>{strings("payment_date")}</ThemeText>
          <ThemeText>{FormatDateTime(data.createdAt)}</ThemeText>
        </View>
      </View>
    );
  };

  const showLoadMore = total > (currentPage + 1) * currentLimit;

  return (
    <ScrollView
      style={styles.historyWrapper}
      refreshControl={
        <RefreshControl
          onRefresh={() => getCheckoutHistory({})}
          colors={[ThemeFunctions.getColor(appColor)]}
          tintColor={ThemeFunctions.getColor(appColor)}
          refreshing={isLoading || partialLoading}
        />
      }>
      {isLoading ? (
        <></>
      ) : (
        <>
          {history.map((data: any, srNo) => (
            <HistoryCard srNo={srNo + 1} key={data.paymentId} data={data} />
          ))}
          {showLoadMore && (
            <TouchableOpacity
              onPress={() => {
                setPartialLoading(true);
                getCheckoutHistory({loadNext: true, loading: false});
              }}
              style={[styles.loadMoreContainer]}>
              <ThemeText
                style={[
                  {color: ThemeFunctions.customText(appTheme)},
                  styles.loadMoreText,
                ]}>
                {strings('load_more')}
              </ThemeText>
            </TouchableOpacity>
          )}
        </>
      )}

      <Space height={50} />
    </ScrollView>
  );
};

export default CheckoutHistory;
