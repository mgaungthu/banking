import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  FlatList,
  useWindowDimensions,
  Text,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';

import {
  Header,
  ImageContainer,
  LoadingSpinner,
  SearchBar,
  ThemeText,
} from '../../../components';
import {commonStyles} from '../../../globalstyles/styles';
import {styles} from './IEO_style';
import {ThemeFunctions} from '../../../utils';
import {LaunchPadActions} from '../../../store';
import {strings} from '../../../strings';
import {ic_box_empty} from '../../../assets';
import IEOinfoLanding from '../Info/IEOinfoLanding';
import Setting from '../Info/Setting';
import {Loader} from '../../../enums';
import HistoryItem from '../Info/HistoryItem';
import {historyStyles} from '../Info/styles';
import {isDarkTheme} from '../../../utils/ThemeFunctions';

const IEO = (props: any) => {
  // const {isLoading} = useSelector(ieoSelector);
  const [filteredList, setFilteredList] = useState();
  // const [loading, setLoading] = useState(false);
  const {appColor, isRtlApproach} = useSelector(
    (state: any) => state.globalReducer,
  );
  const appData = useSelector((state: any) => state.appReducer);

  const isLoading =
    appData.loading === Loader.LAUNCH_PAD ||
    appData.loading === Loader.LAUNCH_PAD_HISTORY ||
    appData.loading === Loader.LAUNCH_PAD_SETTING;

  const {launchpad, setting, history} = useSelector(
    (state: any) => state.launchPadReducer,
  );

  const [index, setIndex] = useState(0);

  const dispatch = useDispatch<any>();
  const {navigation} = props;

  const [routes] = useState([
    {key: 'all', title: strings('All')},
    {key: 'active', title: strings('Active')},
    {key: 'upcoming', title: strings('Upcoming')},
    {key: 'finished', title: strings('Finished')},
    {key: 'history', title: strings('History')},
  ]);

  const {width: WIDTH} = useWindowDimensions();

  // useEffect(() => {
  //   if (launchpad.length === 0) {
  //   }
  // }, [launchpad, setting]);

  const social = {
    twitter_link: 'https://twitter.com/BattleRiseGame',
    instagram_link: null,
    telegram_link: null,
  };
  useEffect(() => {
    dispatch(LaunchPadActions.getLaunchPadSetting());
    if (launchpad.length === 0 || history.length === 0) {
      // updateLaunchPad();
    } else {
      setFilteredList(launchpad);
    }
  }, [launchpad, history]);

  const updateLaunchPad = () => {
    dispatch(LaunchPadActions.getLaunchPadList());
    dispatch(LaunchPadActions.getLaunchPadHistory());
  };

  const {appTheme} = useSelector((state: any) => state.globalReducer);

  const handleBack = () => {
    navigation.goBack();
  };

  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearchQuery = (text: string) => {
    const searchResult = text
      ? launchpad.filter((data: any) =>
          data.title.toLowerCase().includes(text.toLowerCase()),
        )
      : launchpad;
    setFilteredList(searchResult);
    setSearchQuery(text);
  };

  const onSearchBarReset = () => setSearchQuery('');

  const navigateToInfo = (launch: any) => {
    navigation.push('IEOinfoDetail', {id: launch?.id});
  };

  const handleIndexChange = (index: number) => {
    setIndex(index);
  };

  const updateHistory = () => {};

  const HistoryList = (
    <FlatList
      data={history}
      initialNumToRender={3}
      maxToRenderPerBatch={5}
      contentContainerStyle={historyStyles.list}
      renderItem={({item}) => (
        <HistoryItem
          data={item}
          appTheme={appTheme}
          appColor={appColor}
          isRtlApproach={isRtlApproach}
        />
      )}
      keyExtractor={item => item.id.toString()}
      refreshControl={
        <RefreshControl
          colors={[ThemeFunctions.getColor(appColor)]}
          tintColor={ThemeFunctions.getColor(appColor)}
          refreshing={isLoading}
          onRefresh={() => updateHistory()}
        />
      }
      ListEmptyComponent={
        <Text
          style={{
            ...historyStyles.placeHolderText,
            color: ThemeFunctions.customText(appTheme),
          }}>
          {strings('no_history')}
        </Text>
      }
    />
  );

  const activeList = (
    <FlatList
      data={filteredList}
      style={[styles.list, ThemeFunctions.setBackground(appTheme)]}
      // ListEmptyComponent={EmptyComponent}
      keyExtractor={(item, key) => `${item.ticker}_${key}`}
      refreshControl={
        <RefreshControl
          colors={[ThemeFunctions.getColor(appColor)]}
          tintColor={ThemeFunctions.getColor(appColor)}
          refreshing={isLoading}
          onRefresh={() => updateLaunchPad()}
        />
      }
      renderItem={({item}) => (
        <IEOinfoLanding
          key={item.id}
          startDate={item.tokenRaise.startDate}
          endDate={item.tokenRaise.endDate}
          logo={item.ico_logo}
          image={item.slider}
          allowedCurrencies={item.tokenRaise.allowedCurrencies}
          title={item.title}
          description={item.shortDesc}
          socials={social}
          progress={item.percentage_raised}
          fundraiseGoal={item.tokenRaise.fundraise_goal}
          softCap={item.tokenRaise.soft_cap}
          onPress={() => navigateToInfo(item)}
        />
      )}
      ListEmptyComponent={
        <Text
          style={{
            ...historyStyles.placeHolderText,
            color: ThemeFunctions.customText(appTheme),
          }}>
          {strings('No data Available')}
        </Text>
      }
    />
  );

  const renderScene = ({route: {key}}) => {
    switch (key) {
      case 'all':
        activeList;
      case 'active':
        return activeList;
      case 'upcoming':
        return NoTokenComponent;
      case 'finished':
        return NoTokenComponent;
      case 'history':
        return HistoryList;
      default:
        return NoTokenComponent;
    }
  };

  const NoTokenComponent = (
    <>
      <View
        style={[
          {height: '20%', paddingVertical: 10},
          ThemeFunctions.setBackground(appTheme),
        ]}>
        <View
          style={[
            styles.noTokenComponent,
            ThemeFunctions.setIEOCardBG(appTheme),
          ]}>
          <ImageContainer
            imagePath={ic_box_empty}
            imgStyle={[styles.noTokenIcon, ThemeFunctions.imgColor(appTheme)]}
          />
          <ThemeText style={styles.noTokenText}>
            stay tuned for update!
          </ThemeText>
        </View>
      </View>
    </>
  );

  // const EmptyComponent = (
  //   <View style={[{height: '100%'}, ThemeFunctions.setBackground(appTheme)]}>
  //     <View
  //       style={[styles.emptyComponent, ThemeFunctions.setIEOCardBG(appTheme)]}>
  //       <ThemeText style={{textAlign: 'center'}}>Not Found</ThemeText>
  //     </View>
  //   </View>
  // );

  return (
    <SafeAreaView
      style={[commonStyles.safeView, ThemeFunctions.setBackground(appTheme)]}>
      <Header
        title={strings('SolHeaven Launchpad')}
        isNormalText={true}
        handleBack={handleBack}
      />

      <Setting data={setting} />
      <View
        style={[
          styles.searchBarContainer,
          ThemeFunctions.setBackground(appTheme),
        ]}>
        <SearchBar
          placeholder={strings('search_token')}
          style={[styles.searchBar, commonStyles.shadow]}
          onCancel={onSearchBarReset}
          onChangeText={onChangeSearchQuery}
          searchQuery={searchQuery}
        />
      </View>

      <TabView
        lazy
        tabBarPosition="top"
        navigationState={{
          index,
          routes,
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
            scrollEnabled={true}
            tabStyle={{width: WIDTH / 4}}
            indicatorStyle={{
              backgroundColor: ThemeFunctions.getColor(appColor),
            }}
            onTabLongPress={({route: {key}}) => {
              props.jumpTo(key);
            }}
            {...props}
            style={[{backgroundColor: ThemeFunctions.getTabBgColor(appTheme)}]}
            renderLabel={({route, focused}) => (
              <View>
                <Text
                  adjustsFontSizeToFit={true}
                  style={[
                    focused
                      ? ThemeFunctions.textColor(appTheme)
                      : {color: ThemeFunctions.customText(appTheme)},
                  ]}>
                  {route?.title?.toUpperCase()}
                </Text>
              </View>
            )}
          />
        )}
      />

      {/* {isLoading ? (
        <View
          style={[{height: '100%'}, ThemeFunctions.setBackground(appTheme)]}>
          <LoadingSpinner
            color={ThemeFunctions.getColor(appColor)}
            size="large"
          />
        </View>
      ) : list.length === 0 ? (
        NoTokenComponent
      ) : (
        <FlatList
          data={filteredList}
          style={[styles.list, ThemeFunctions.setBackground(appTheme)]}
          ListEmptyComponent={EmptyComponent}
          keyExtractor={(item, key) => `${item.ticker}_${key}`}
          renderItem={({item}) => (
            <IEOitem
              startDate={item.startDate}
              endDate={item.endDate}
              key={item.id}
              projectName={item.name}
              currencyName={item.ticker}
              status={item.status}
              onPress={() => navigateToInfo(item)}
            />
          )}
        />
      )} */}
    </SafeAreaView>
  );
};

export default IEO;
