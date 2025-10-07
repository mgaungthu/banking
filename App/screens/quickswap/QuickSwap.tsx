import React, {useState} from 'react';
import {SafeAreaView, Text, View, useWindowDimensions} from 'react-native';
import {commonStyles} from '../../globalstyles/styles';
import {Header} from '../../components';
import {strings} from '../../strings';
import {quickSwapStyles as styles} from './styles';
import Exchange from './spot/Exchange';
import {TabView, TabBar} from 'react-native-tab-view';
import {useSelector} from 'react-redux';
import {ThemeFunctions} from '../../utils';
import HistoryView from '../quickbuy/spot/HistoryView';
import {isDarkTheme} from '../../utils/ThemeFunctions';

const QuickSwap = (props: any) => {
  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    {key: 'exchange', title: strings('exchange')},
    {key: 'history', title: strings('history')},
  ]);
  const [routesReverse] = React.useState([
    {key: 'history', title: strings('history')},
    {key: 'exchange', title: strings('exchange')},
  ]);
  const {isRtlApproach, appTheme, appColor} = useSelector(
    (state: any) => state.globalReducer,
  );

  const isBackButton = () => {
    return props?.route?.params?.fromScreen ? true : false;
  };

  const {firstCurrency, secondCurrency} = props?.route?.params || {};

  const renderScene = ({route: {key}}) => {
    switch (key) {
      case 'exchange':
        return (
          <Exchange
            pairName={props?.route?.params?.pairName}
            firstCurrency={firstCurrency}
            secondCurrency={secondCurrency}
            isBack={isBackButton()}
          />
        );
      default:
        return <HistoryView activeIndex={index} isBack={isBackButton()} />;
    }
  };

  const handleIndexChange = (index: number) => {
    setIndex(index);
  };

  const {width: WIDTH} = useWindowDimensions();

  return (
    <SafeAreaView
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      <Header
        title={strings('quick_swap')}
        showBack={isBackButton()}
        isTab={true}
        textStyle={{
          marginLeft: isBackButton() ? 0 : 40,
          color: isDarkTheme(appTheme) ? '#fff' : '#000',
        }}
      />
      {/* <View style={styles.view}> */}
      <TabView
        tabBarPosition="top"
        navigationState={{
          index,
          routes: isRtlApproach ? routesReverse : routes,
        }}
        renderScene={renderScene}
        onIndexChange={index => handleIndexChange(index)}
        initialLayout={{width: WIDTH}}
        commonOptions={{
          label: ({route, labelText, focused, color}) => (
            <Text
              style={[
                {color: isDarkTheme(appTheme) && focused ? '#fff' : color},
                styles.textTab,
              ]}>
              {labelText ?? route.title}
            </Text>
          ),
        }}
        renderTabBar={props => (
          <TabBar
            bounces={true}
            activeColor={'#000'}
            inactiveColor={ThemeFunctions.customText(appTheme)}
            tabStyle={{width: WIDTH / 2 - 15}}
            scrollEnabled={true}
            style={[
              {backgroundColor: ThemeFunctions.getTabBgColor(appTheme)},
              styles.tabStyle,
            ]}
            indicatorStyle={{
              backgroundColor: ThemeFunctions.getColor(appColor),
            }}
            // contentContainerStyle={[styles.tabContainer]}
            onTabLongPress={({route: {key}}) => {
              props.jumpTo(key);
            }}
            {...props}
            pressColor="transparent"
          />
        )}
      />
      {/* </View> */}
    </SafeAreaView>
  );
};

export default QuickSwap;
