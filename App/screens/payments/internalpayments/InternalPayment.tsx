import React, {useState} from 'react';
import {Text, View, useWindowDimensions} from 'react-native';
import {commonStyles} from '../../../globalstyles/styles';
import {Header} from '../../../components';
import {strings} from '../../../strings';
import {quickBuyStyles as styles} from '../../quickbuy/styles';
import {rapunzelTheme} from '../../../theme/Colors';

import {TabView, TabBar} from 'react-native-tab-view';
import {useSelector} from 'react-redux';
import {ThemeFunctions} from '../../../utils';
import History from './History';
import AddPayment from './AddPayment';
import {isDarkTheme} from '../../../utils/ThemeFunctions';

const InternalPayment = (props: any) => {
  const {navigation} = props;
  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    {key: 'payment', title: strings('payments')},
    {key: 'history', title: strings('history')},
  ]);
  const [routesReverse] = React.useState([
    {key: 'history', title: strings('history')},
    {key: 'payment', title: strings('payments')},
  ]);
  const {isRtlApproach, appTheme, appColor} = useSelector(
    (state: any) => state.globalReducer,
  );

  const renderScene = ({route: {key}}) => {
    return (
      <>
        {key === 'payment' ? (
          <AddPayment
            activeIndex={index}
            setIndex={setIndex}
            navigation={navigation}
          />
        ) : (
          <History activeIndex={index} />
        )}
      </>
    );
  };

  const handleIndexChange = (index: number) => {
    setIndex(index);
  };

  const {width: WIDTH} = useWindowDimensions();

  return (
    <View
      style={[commonStyles.safeView, ThemeFunctions.setBackground(appTheme)]}>
      <Header title={strings('internal_payments')} isTab={true} />
      <View style={styles.view}>
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
              scrollEnabled={true}
              activeColor={'#000'}
              inactiveColor={ThemeFunctions.customText(appTheme)}
              indicatorStyle={{
                backgroundColor: ThemeFunctions.getColor(appColor),
              }}
              contentContainerStyle={[styles.tabContainer]}
              tabStyle={{width: WIDTH / 2 - 15}}
              style={[
                {backgroundColor: ThemeFunctions.getTabBgColor(appTheme)},
                styles.tabStyle,
              ]}
              onTabLongPress={({route: {key}}) => {
                props.jumpTo(key);
              }}
              {...props}
            />
          )}
        />
      </View>
    </View>
  );
};

export default InternalPayment;
