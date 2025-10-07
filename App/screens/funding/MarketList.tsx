import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {marketListStyles as styles} from '../home/styles';
import {FlatList} from 'react-native';
import {ThemeFunctions} from '../../utils';

import {strings} from '../../strings';
import TickersRow from '../tickers/TickersRow';
import {ThemeText} from '../../components';
import {QuickBuyActions} from '../../store';
import Navigation from '../../utils/Navigation';
import {Screen} from '../../enums';
import {getStableCoinPairs} from '../../utils/trading/helpers';

export default React.memo((props: any) => {
  const {appTheme} = useSelector((state: any) => state.globalReducer);
  const quickBuyData = useSelector((state: any) => state.quickBuyReducer);
  const dispatch = useDispatch();

  // const quickBuyPairs = [
  //   ...quickBuyData?.pairs?.map(el => el?.pair),
  //   ...getStableCoinPairs(quickBuyData?.stableCoins),
  // ];

  // let {tickers} = useSelector((state: any) => state.tickerReducer);
  const [filteredTickers, setFilteredTickers] = useState([]);

  const symbol = props.symbol;

  // const _isStablePair = (first, second) => {
  //   let stableData = quickBuyData?.stableCoins || {};
  //   return (
  //     (stableData[first] || []).includes(second) ||
  //     (stableData[second] || []).includes(first)
  //   );

  // };

  useEffect(() => {
    if (symbol) {
      // const filtered = tickers?.filter((i: any) => {
      //   const [first, second] = i?.pairName?.split('-') || ['', ''];
      //   if (first === symbol || second === symbol) {
      //     return !_isStablePair(first, second);
      //   }
      // });

      const filteredSymbol = quickBuyData?.pairs.filter(
        item => item.symbol === symbol,
      );

      setFilteredTickers(filteredSymbol[0]?.pairs || []);
    }
  }, [quickBuyData]);

  useEffect(() => {
    // if (getStableCoinPairs(quickBuyData?.stableCoins).length === 0) {
    //   dispatch(QuickBuyActions.getStableCoin());
    // }
  }, []);

  const _navigateQuickSwap = (pairName: string) => {
    let [firstCurrency, secondCurrency] = pairName.split('-');

    Navigation.navigate(Screen.QuickSwapScreen, {
      fromScreen: true,
      firstCurrency: symbol,
      secondCurrency:
        secondCurrency === symbol ? firstCurrency : secondCurrency,
    });
  };

  return (
    <FlatList
      scrollEnabled={true}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      data={filteredTickers}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.list]}
      renderItem={({item}: any) => {
        return (
          <>
            <TickersRow
              data={item}
              checkboxSelected={null}
              updateList={[]}
              isQuickBuy={true}
              firstCurrency={symbol}
              navigate={() =>
                _navigateQuickSwap(`${symbol}-${item?.pair || null}`)
              }
            />

            {/* {item?.is_direct_transfer ? (
              <TickersRow
                data={item}
                isQuickBuy={true}
                navigate={() => _navigateQuickSwap(item?.name)}
              />
            ) : (
              <TickersRow data={item} />
            )} */}
          </>
        );
      }}
      keyExtractor={(item, key) => `item_${item.pairName}_${key}`}
      ListEmptyComponent={() => (
        <ThemeText
          style={{
            ...styles.placeholder,
            color: ThemeFunctions.customText(appTheme),
          }}>
          {strings('no_pairs_available')}
        </ThemeText>
      )}
    />
  );
});
