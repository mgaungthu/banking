import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {marketListStyles as styles} from './styles';
import {Text, View, useWindowDimensions} from 'react-native';
import {ThemeFunctions} from '../../utils';

import {TabView, TabBar} from 'react-native-tab-view';
import {strings} from '../../strings';
import TickersRow from '../tickers/TickersRow';
import {getStableCoinPairs} from '../../utils/trading/helpers';
import {QuickBuyActions} from '../../store';

import _ from 'lodash';

const MarketList = React.memo(() => {
  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer);
  const [index, setIndex] = useState(0);

  const quickBuyData = useSelector((state: any) => state.quickBuyReducer);
  const [filteredTickers, setFilteredTickers] = useState([]);
  let {tickers} = useSelector((state: any) => state.tickerReducer);

  const [routes] = useState([
    {key: 'rising_market', title: strings('rising_market')},
    {key: 'decline_market', title: strings('decline_market')},
  ]);

  const dispatch = useDispatch();

  const _isStablePair = (first, second) => {
    let stableData = quickBuyData?.stableCoins || {};
    return (
      (stableData[first] || []).includes(second) ||
      (stableData[second] || []).includes(first)
    );
  };

  useEffect(() => {
    // console.log(tickers);
    if (tickers?.length > 0) {
      const filtered = [...tickers]
        ?.sort((a, b) => {
          if (a?.pairName < b?.pairName) return -1;
          else if (a?.pairName > b?.pairName) return 1;
          return 0;
        })
        .filter((i: any) => {
          const [first, second] = i?.pairName?.split('-') || ['', ''];
          return !_isStablePair(first, second);
        });

      setFilteredTickers([...filtered]);
    }
  }, [tickers, quickBuyData]);

  useEffect(() => {
    // if (
    //   getStableCoinPairs(quickBuyData?.currency.is_stable_coin).length === 0
    // ) {
    //   dispatch(QuickBuyActions.getStableCoin());
    // }
  }, []);

  const getLimitAsc = () => {
    return [...filteredTickers]
      ?.sort((a, b) => {
        return parseFloat(a.percentChange) - parseFloat(b.percentChange);
      })
      .slice(0, 5);
  };
  const getLimitDesc = () => {
    return [...filteredTickers]
      ?.sort((a, b) => {
        return a.percentChange > b.percentChange ? -1 : 1;
      })
      .slice(0, 5);
  };

  const ListTickerComponent = ({list}) => {
    return (
      <View style={[styles.list]}>
        {list?.map(item => (
          <TickersRow key={item.pairName} data={item} />
        ))}
      </View>
    );
  };

  const renderScene = ({route: {key}}) => {
    switch (key) {
      case 'rising_market':
        return <ListTickerComponent key={key} list={getLimitDesc()} />;
    }
    return <ListTickerComponent key={key} list={getLimitAsc()} />;
  };

  const handleIndexChange = (index: number) => {
    setIndex(index);
  };

  return (
    <View style={{height: 500}}>
      <TabView
        swipeEnabled={true}
        lazy
        tabBarPosition="top"
        navigationState={{
          index,
          routes,
        }}
        renderScene={renderScene}
        onIndexChange={index => handleIndexChange(index)}
        initialLayout={{width: useWindowDimensions().width}}
        renderTabBar={props => (
          <TabBar
            bounces={true}
            scrollEnabled={true}
            indicatorStyle={{backgroundColor: 'transparent'}}
            contentContainerStyle={[styles.tabContainer]}
            onTabLongPress={({route: {key}}) => {
              props.jumpTo(key);
            }}
            {...props}
            style={[
              styles.tabStyle,
              {backgroundColor: ThemeFunctions.getTabBgColor(appTheme)},
            ]}
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
  );
}, _.isEqual);

// MarketList.whyDidYouRender=true;

export default MarketList;
