import React, {useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {Header} from '../../components';
import {strings} from '../../strings';
import {commonStyles} from '../../globalstyles/styles';
import {useSelector} from 'react-redux';
import {ThemeFunctions} from '../../utils';
import styles from './styles';

import {TabBar, TabView} from 'react-native-tab-view';

import CheckoutScan from './CheckoutScan';
import CheckoutHistory from './CheckoutHistory';
import PosHistory from '../pos/PosHistory';

const CheckoutHome = (props: any) => {
  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer);

  const [index, setIndex] = useState(0);

  const [routes] = useState([
    {key: 'scan', title: strings('scan')},
    {key: 'pos', title: strings('pos')},
    {key: 'gateway', title: strings('gateway')},
  ]);

  const renderScene = ({route: {key}}) => {
    switch (key) {
      case 'pos':
        return <PosHistory />;
      case 'gateway':
        return <CheckoutHistory />;
    }
    return <CheckoutScan />;
  };

  const handleIndexChange = (index: number) => {
    setIndex(index);
  };

  return (
    <>
      <SafeAreaView
        style={[commonStyles.safeView, ThemeFunctions.setBackground(appTheme)]}>
        <Header title={'QR Pay'} />
        <View style={{flex: 1}}>
          <TabView
            lazy
            tabBarPosition="top"
            navigationState={{
              index,
              routes,
            }}
            renderScene={renderScene}
            onIndexChange={handleIndexChange}
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
                  {backgroundColor: ThemeFunctions.getTabBgColor(appTheme)},
                  styles.tabStyle,
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
      </SafeAreaView>
    </>
  );
};

export default CheckoutHome;
