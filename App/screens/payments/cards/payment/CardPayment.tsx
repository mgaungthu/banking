import React, {useEffect, useState} from 'react';
import {Text, View, useWindowDimensions} from 'react-native';
import {commonStyles} from '../../../../globalstyles/styles';
import {Header} from '../../../../components';
import {strings} from '../../../../strings';
import {quickBuyStyles as styles} from '../../../quickbuy/styles';
import {rapunzelTheme} from '../../../../theme/Colors';

import {TabView, TabBar} from 'react-native-tab-view';
import {useSelector} from 'react-redux';
import {ThemeFunctions} from '../../../../utils';
import Listing from './Listing';
import CardTopup from './CardTopup';
import {isDarkTheme} from '../../../../utils/ThemeFunctions';

const CardPayment = (props: any) => {
  const {navigation} = props;
  const [index, setIndex] = useState(0);

  const {
    route: {params},
  } = props;

  const [routes] = React.useState([
    {key: 'topup', title: strings('Topup')},
    {key: 'transactions', title: strings('Transactions')},
  ]);
  const [routesReverse] = React.useState([
    {key: 'transactions', title: strings('Transactions')},
    {key: 'topup', title: strings('Topup')},
  ]);
  const {isRtlApproach, appTheme, appColor} = useSelector(
    (state: any) => state.globalReducer,
  );

  const renderScene = ({route: {key}}) => {
    return (
      <>
        {key === 'topup' ? (
          <CardTopup
            activeIndex={index}
            setIndex={setIndex}
            params={params}
            navigation={navigation}
          />
        ) : (
          <Listing activeIndex={index} />
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
      <Header title={strings('Top-Up')} isTab={true} />
      <View style={styles.view}>
        <TabView
          tabBarPosition="top"
          navigationState={{
            index,
            routes: isRtlApproach ? routesReverse : routes,
          }}
          renderScene={renderScene}
          onIndexChange={index => handleIndexChange(index)}
          initialLayout={{width: useWindowDimensions().width}}
          commonOptions={{
            label: ({route, labelText, focused, color}) => (
              <Text
                style={[
                  {color: isDarkTheme(appTheme) && focused ? '#fff' : color},
                  ,
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
              tabStyle={{width: WIDTH / 2 - 15}}
              inactiveColor={ThemeFunctions.customText(appTheme)}
              activeColor={'#000'}
              indicatorStyle={{
                backgroundColor: ThemeFunctions.getColor(appColor),
              }}
              contentContainerStyle={[styles.tabContainer]}
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

export default CardPayment;
