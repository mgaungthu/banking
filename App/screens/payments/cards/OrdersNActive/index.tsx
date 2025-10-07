import React, {useState} from 'react';
import {Text, View, useWindowDimensions} from 'react-native';
import {commonStyles} from '../../../../globalstyles/styles';
import {Header} from '../../../../components';
import {strings} from '../../../../strings';
import {quickBuyStyles as styles} from '../../../quickbuy/styles';
import {rapunzelTheme} from '../../../../theme/Colors';

import {TabView, TabBar} from 'react-native-tab-view';
import {useSelector} from 'react-redux';
import {ThemeFunctions} from '../../../../utils';
import Listing from './Active/Listing';
import OrdersList from './Orders/OrdersList';
import {isDarkTheme} from '../../../../utils/ThemeFunctions';
// import BeneficiaryList from './BeneficiaryList';

const ActiveCardListLanding = (props: any) => {
  const {navigation} = props;
  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    {key: 'Active', title: strings('Active')},
    {key: 'Orders', title: strings('Orders')},
  ]);
  const [routesReverse] = React.useState([
    {key: 'Orders', title: strings('Orders')},
    {key: 'Active', title: strings('Active')},
  ]);
  const {isRtlApproach, appTheme, appColor} = useSelector(
    (state: any) => state.globalReducer,
  );

  const renderScene = ({route: {key}}) => {
    return (
      <>
        {key === 'Active' ? (
          <Listing activeIndex={index} />
        ) : (
          <OrdersList activeIndex={index} />
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
      <Header title={strings('My Cards')} isTab={true} />
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
              inactiveColor={ThemeFunctions.customText(appTheme)}
              activeColor={'#000'}
              tabStyle={{width: WIDTH / 2 - 15}}
              indicatorStyle={{
                backgroundColor: ThemeFunctions.getColor(appColor),
              }}
              contentContainerStyle={[
                styles.tabContainer,
                // { backgroundColor: ThemeFunctions.getTabBgColor(appTheme) }
              ]}
              style={[
                {backgroundColor: ThemeFunctions.getTabBgColor(appTheme)},
                styles.tabStyle,
              ]}
              onTabLongPress={({route: {key}}) => {
                props.jumpTo(key);
              }}
              pressColor="transparent"
              {...props}
            />
          )}
        />
      </View>
    </View>
  );
};

export default ActiveCardListLanding;
