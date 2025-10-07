import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {homeStyles as styles} from './styles';
import {ScrollView, TouchableOpacity, View, Dimensions} from 'react-native';
import Image from 'react-native-fast-image';
import {navigate, ThemeFunctions, AppFunctions} from '../../utils';
import {ImageContainer, ThemeText} from '../../components';
import * as Images from '../../assets';
import {strings} from '../../strings';
import {AppColor, Screen} from '../../enums';
import {
  AppActions,
  GlobalActions,
  MarketAction,
  QuickBuyActions,
  TickersAction,
} from '../../store';
import {commonStyles, rtlStyles} from '../../globalstyles/styles';
import {MapperConstants} from '../../constants';
import IconVector from '../../components/ui/IconVector';
import MarketList from './MarketList';
import {showToast} from '../../utils/GenericUtils';
import {t} from 'react-native-tailwindcss';
import _ from 'lodash';
import {SanitizeNumber} from '../../utils/AppFunctions';
import AnnouncementCarousel from './AnnouncementCarousel';
import CurrentBalance from './CurrentBalance';
import {Text} from 'react-native-elements';
import Colors from '../../theme/Colors';

const HomeView = () => {
  const {
    isRtlApproach,
    appTheme,
    announcementMeta,
    appColor,
    mainCurrency,
    isBalanceHidden,
    userdata,
  } = useSelector((state: any) => state.globalReducer);
  const {userProfileData} = useSelector((state: any) => state.appReducer);
  const {isInternetReachable} = useSelector((state: any) => state.gbexReducer);
  const {announcements} = useSelector((state: any) => state.appReducer);
  const [activePage, setActivePage] = useState(0);
  const {width} = Dimensions.get('window');

  const itemsPerPage = 8;
  const items = 10;

  const scrollViewRef = useRef(null);

  // Total number of pages (based on the number of items and the items per page)
  const totalPages = Math.ceil(items / itemsPerPage);

  // Scroll handler to track the horizontal scroll position
  const handleScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x + 130;
    const currentPage = Math.round(offsetX / width); // Calculate the current page
    setActivePage(currentPage);
  };

  const scrollToPage = pageIndex => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: pageIndex * width,
        animated: true,
      });
      setActivePage(pageIndex); // Update active page to the clicked dot
    }
  };

  const calculateFontSize = baseFontSize => {
    const scaleFactor = width / 375; // 375 is a reference width (e.g., iPhone 6/7/8 width)
    return Math.round(baseFontSize * scaleFactor);
  };

  const fontSize = calculateFontSize(13);

  const dispatch = useDispatch<any>();

  const handleNavigation = (screen: string) => () => {
    navigate(screen, {fromScreen: screen});
  };

  const showComingSoon = () => {
    showToast('', strings('coming_soon'), 'info');
  };

  useEffect(() => {
    dispatch(AppActions.announcementList());
    dispatch(QuickBuyActions.fundsList());
    dispatch(MarketAction.getMarketList());

    // dispatch(TickersAction.getTickers());
  }, []);

  const getImageIcon = () => {
    switch (appColor) {
      case AppColor.green:
        return {
          bank: Images.ic_bank_green,
          stake: Images.ic_stake_green,
          nft: Images.ic_nft_green,
          reward: Images.ic_reward_green,
          qr: Images.ic_qr_green,
          trading: Images.ic_trading_green,
          deposit: Images.ic_deposit_green,
          referrals: Images.ic_referrals_green,
          placeholder: Images.ic_placeholder_green,
          launchpad: Images.ic_launchpad_green,
          launchpads: Images.ic_launchpads_green,
        };
      case AppColor.pink:
        return {
          bank: Images.ic_bank_pink,
          stake: Images.ic_stake_pink,
          nft: Images.ic_nft_pink,
          reward: Images.ic_reward_pink,
          qr: Images.ic_qr_pink,
          trading: Images.ic_trading_pink,
          deposit: Images.ic_deposit_pink,
          referrals: Images.ic_referrals_pink,
          placeholder: Images.ic_placeholder_pink,
          launchpad: Images.ic_launchpad_pink,
          launchpads: Images.ic_launchpads_pink,
        };
    }
    return {
      bank: Images.ic_bank_black,
      stake: Images.ic_stake_black,
      nft: Images.ic_nft_black,
      reward: Images.ic_reward_black,
      qr: Images.ic_qr_black,
      trading: Images.ic_trading_black,
      deposit: Images.ic_deposit_black,
      referrals: Images.ic_referrals_black,
      placeholder: Images.ic_placeholder_black,
      launchpad: Images.ic_launchpad_black,
      launchpads: Images.ic_launchpads_black,
    };
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
          style={[styles.profileBtn, ThemeFunctions.getCardColor(appTheme)]}
          onPress={handleNavigation(Screen.QuickSwapScreen)}>
          <ImageContainer
            imagePath={Images.IcQuickSwap}
            imgStyle={[styles.profile, ThemeFunctions.imgColor(appTheme)]}
          />
        </TouchableOpacity>
        <ThemeText style={[styles.textHeader]}>{strings('home')}</ThemeText>
        <TouchableOpacity
          style={[styles.profileBtn, ThemeFunctions.getCardColor(appTheme)]}
          // onPress={handleNavigation(Screen.Rewards)}
          onPress={() => showComingSoon()}>
          <ImageContainer
            imagePath={Images.icRewards}
            imgStyle={[styles.profile, ThemeFunctions.imgColor(appTheme)]}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={commonStyles.pdTabbar}>
        <View style={[styles.card, ThemeFunctions.setBackground(appTheme)]}>
          <AnnouncementCarousel
            announcements={announcements}
            appTheme={appTheme}
            announcementMeta={announcementMeta}
            appColor={appColor}
          />
        </View>
        <CurrentBalance />
        <View
          style={[commonStyles.flexDisplay, commonStyles.marginVerticalView]}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            ref={scrollViewRef}
            // pagingEnabled
            nestedScrollEnabled={true}>
            <View>
              <View style={commonStyles.rowItem}>
                <TouchableOpacity
                  style={[styles.iconImageContainer]}
                  onPress={handleNavigation(Screen.Staking)}>
                  <Image
                    source={getImageIcon().stake}
                    style={styles.iconImage}
                  />
                  <ThemeText style={[styles.textIcon, {fontSize}]}>
                    {strings('stake')}
                  </ThemeText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.iconImageContainer]}
                  onPress={handleNavigation('IEO')}>
                  <Image
                    source={getImageIcon().launchpad}
                    style={styles.iconImage}
                  />
                  <ThemeText style={[styles.textIcon, {fontSize}]}>
                    {strings('launchpad')}
                  </ThemeText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.iconImageContainer]}
                  onPress={handleNavigation(Screen.CardsLandingScreen)}>
                  <Image
                    source={getImageIcon().deposit}
                    style={styles.iconImage}
                  />
                  <ThemeText
                    style={[styles.textIcon, t.capitalize, {fontSize}]}>
                    {strings('Cards')}
                  </ThemeText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.iconImageContainer]}
                  onPress={handleNavigation(Screen.Payment)}>
                  <Image
                    source={getImageIcon().bank}
                    style={styles.iconImage}
                  />
                  <ThemeText style={[styles.textIcon, {fontSize}]}>
                    {strings('bank')}
                  </ThemeText>
                </TouchableOpacity>
              </View>
              <View style={commonStyles.rowItem}>
                <TouchableOpacity
                  style={[styles.iconImageContainer]}
                  onPress={handleNavigation(Screen.Referrals)}>
                  <Image
                    source={getImageIcon().referrals}
                    style={styles.iconImage}
                  />
                  <ThemeText
                    style={[styles.textIcon, t.capitalize, {fontSize}]}>
                    {strings('referrals')}
                  </ThemeText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.iconImageContainer]}
                  // onPress={handleNavigation(Screen.CheckoutHome)}
                  onPress={() => showComingSoon()}>
                  <Image source={getImageIcon().qr} style={styles.iconImage} />
                  <ThemeText style={[styles.textIcon, {fontSize}]}>
                    {strings('qr_pay')}
                  </ThemeText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.iconImageContainer]}
                  // onPress={handleNavigation(Screen.Rewards)}
                  onPress={() => showComingSoon()}>
                  <Image
                    source={getImageIcon().reward}
                    style={styles.iconImage}
                  />
                  <ThemeText style={[styles.textIcon, {fontSize}]}>
                    {strings('rewards')}
                  </ThemeText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.iconImageContainer]}
                  // onPress={handleNavigation(Screen.CreditCardList)}
                  onPress={() => showComingSoon()}>
                  <Image
                    source={getImageIcon().deposit}
                    style={styles.iconImage}
                  />
                  <ThemeText
                    style={[styles.textIcon, t.capitalize, {fontSize}]}>
                    {strings('cc_deposit')}
                  </ThemeText>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          {/* <View style={styles.pagination}>
            {Array.from({length: totalPages}).map((_, index) => (
              <TouchableOpacity key={index} onPress={() => scrollToPage(index)}>
                <View
                  style={[
                    styles.dot,
                    {
                      backgroundColor:
                        index === activePage
                          ? ThemeFunctions.getColor(appColor)
                          : '#ddd',
                    },
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View> */}
        </View>
        {/* <View style={{paddingTop: 20, paddingHorizontal: 10}}>
          {
            tickers?.slice(0, 10)?.map(item => <TickersRow data={item} />)
          }
        </View> */}
        {/* <MarketList /> */}
      </ScrollView>
    </>
  );
};

export default HomeView;
