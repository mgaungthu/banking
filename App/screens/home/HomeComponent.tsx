import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {homeStyles as styles} from './styles';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {navigate, SCREEN_WIDTH, ThemeFunctions} from '../../utils';
import {ImageContainer, LoadingSpinner} from '../../components';
import * as Images from '../../assets';
import {strings} from '../../strings';
import Carousel from 'react-native-snap-carousel';
import {Loader, Screen} from '../../enums';
import {rapunzelTheme} from '../../theme/Colors';
import Upcoming from './UpcomingItem';
import Announcement from './Announcement';
import {AppActions} from '../../store';
import {rtlStyles} from '../../globalstyles/styles';
import AnnouncementShimmer from './AnnouncementShimmer';
import UpcomingShimmer from './UpcomingShimmer';
import AnnouncementPlaceholder from './AnnouncementPlaceholder';
import UpcomingPlaceholder from './UpcomingPlaceholder';

const HomeComponent = (props: any) => {
  const dispatch = useDispatch();
  const {isRtlApproach, appTheme} = useSelector(
    (state: any) => state.globalReducer,
  );
  const appData = useSelector((state: any) => state.appReducer);

  const {announcements} = useSelector((state: any) => state.appReducer);

  const handleNavigation = (screen: string) => () => {
    if (screen === Screen.MyAccount) {
      dispatch(AppActions.getUserProfile());
    }
    switch (screen) {
      case Screen.TickerScreen:
        navigate(screen, {fromScreen: screen});
        break;
      default:
        navigate(screen, {});
      case Screen.WalletScreen:
        navigate(screen, {fromScreen: screen});
        break;
    }
  };

  const announcementArr = () => {
    return announcements?.filter(res => res.type === 'announcement');
  };

  const upcomingArr = () => {
    return announcements?.filter(res => res.type === 'upcoming');
  };

  return (
    <>
      <View
        style={[
          styles.header,
          ThemeFunctions.setBackground(appTheme),
          isRtlApproach ? rtlStyles.reverseRow : {},
        ]}>
        <TouchableOpacity
          style={styles.profileBtn}
          onPress={handleNavigation(Screen.MyAccount)}>
          <ImageContainer
            imagePath={Images.IcProfile}
            imgStyle={[styles.profile, ThemeFunctions.imgColor(appTheme)]}
          />
        </TouchableOpacity>
        <ImageContainer
          imagePath={
            ThemeFunctions.isRapunzelTheme(appTheme)
              ? Images.LogoPink
              : Images.Logo
          }
          imgStyle={styles.logo}
        />
        <TouchableOpacity
          style={styles.profileBtn}
          onPress={handleNavigation(Screen.Rewards)}>
          <ImageContainer
            imagePath={Images.icRewards}
            imgStyle={[styles.profile, ThemeFunctions.imgColor(appTheme)]}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={[styles.card, ThemeFunctions.setBackground(appTheme)]}>
          <Text
            style={[
              styles.announcement,
              isRtlApproach ? {textAlign: 'right', marginRight: 8} : {},
              ThemeFunctions.homeText(appTheme),
            ]}>
            {strings('announcements')}
          </Text>
          {appData.loading === Loader.GET_ANNOUNCEMENTS &&
          announcements?.length === 0 ? (
            <AnnouncementShimmer />
          ) : (
            <Carousel
              layoutCardOffset={9}
              data={announcementArr()}
              keyExtractor={(item: any) => item?.id?.toString()}
              renderItem={({item, index}) => <Announcement item={item} />}
              sliderWidth={SCREEN_WIDTH - 10}
              ListEmptyComponent={() => (
                <>
                  <AnnouncementPlaceholder />
                </>
              )}
              itemWidth={SCREEN_WIDTH * 0.87}
              containerCustomStyle={
                isRtlApproach
                  ? {paddingTop: 10, marginRight: -20}
                  : {paddingTop: 10, marginLeft: -20}
              }
            />
          )}
        </View>
        <View style={[styles.tabCard, ThemeFunctions.setBackground(appTheme)]}>
          <TouchableOpacity
            onPress={handleNavigation(Screen.TickerScreen)}
            style={[styles.tab, ThemeFunctions.tabBg(appTheme)]}>
            <ImageContainer
              imagePath={
                ThemeFunctions.isRapunzelTheme(appTheme)
                  ? Images.TradingInactivePink
                  : Images.TradingActive
              }
              imgStyle={styles.tabIcon}
            />
            <Text
              style={[
                styles.tabText,
                ThemeFunctions.setHeaderTextColor(appTheme),
              ]}>
              {strings('trade')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleNavigation(Screen.WalletScreen)}
            style={[styles.tab, ThemeFunctions.tabBg(appTheme)]}>
            <ImageContainer
              imagePath={
                ThemeFunctions.isRapunzelTheme(appTheme)
                  ? Images.WalletInctivePink
                  : Images.WalletActive
              }
              imgStyle={styles.tabIcon}
            />
            <Text
              style={[
                styles.tabText,
                ThemeFunctions.setHeaderTextColor(appTheme),
              ]}>
              {strings('wallet')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleNavigation(Screen.Payment)}
            style={[styles.tab, ThemeFunctions.tabBg(appTheme)]}>
            <ImageContainer
              imagePath={Images.BankActive}
              imgStyle={[
                styles.tabIcon,
                ThemeFunctions.isRapunzelTheme(appTheme)
                  ? {tintColor: rapunzelTheme.magenta}
                  : {},
              ]}
            />
            <Text
              style={[
                styles.tabText,
                ThemeFunctions.setHeaderTextColor(appTheme),
              ]}>
              {strings('banking')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.card, ThemeFunctions.setBackground(appTheme)]}>
          <Text
            style={[
              styles.announcement,
              isRtlApproach ? {textAlign: 'right', marginRight: 8} : {},
              ThemeFunctions.homeText(appTheme),
            ]}>
            {strings('upcoming')}
          </Text>
          {appData.loading === Loader.GET_ANNOUNCEMENTS &&
          announcements?.length === 0 ? (
            <UpcomingShimmer />
          ) : (
            <Carousel
              layoutCardOffset={9}
              data={upcomingArr()}
              keyExtractor={index => Math.random()?.toString()}
              renderItem={({item, index}) => <Upcoming item={item} />}
              sliderWidth={SCREEN_WIDTH}
              itemWidth={SCREEN_WIDTH * 0.9}
              containerCustomStyle={{paddingTop: 10, marginLeft: -12}}
              ListEmptyComponent={() => (
                <>
                  <UpcomingPlaceholder />
                </>
              )}
            />
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default HomeComponent;
