import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import {tabStyles as styles} from '../styles';
import {CurvedBottomBar} from 'react-native-curved-bottom-bar';
import {useSelector} from 'react-redux';
import {Home, Tickers, Wallets, Account, QuickSwap, Payments} from '../index';
import {isDarkTheme, setPaymentDetailBg} from '../../utils/ThemeFunctions';
import {darkTheme, lightTheme} from '../../theme/Colors';
import {imageQuickSwap} from './helpers';
import {RenderIcon} from './RenderIcon';
import {SCREEN_WIDTH, ThemeFunctions} from '../../utils';
import {Icon} from 'react-native-elements';

import Svg, {Path} from 'react-native-svg';
import * as shape from 'd3-shape';

import Navigation from '../../utils/Navigation';
import Androw from 'react-native-androw';
import {ThemeText} from '../../components';
import {Screen} from '../../enums';
import {strings} from '../../strings';
import ScreenOverlay from '../../components/ui/ScreenOverlay2';
import {commonStyles} from '../../globalstyles/styles';
import {showToast} from '../../utils/GenericUtils';
import Staking from '../../screens/staking/staking';

export const TabNavigator = () => {
  const {userProfileData} = useSelector((state: any) => state.appReducer);
  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer);
  const [selectedTab, setSelectedTab] = useState('home');
  const [hideKycAlert, setHideKycAlert] = useState(false);

  const pathUp = (width: number, height: number, circleWidth: number = 55) => {
    const lineLeft = shape
      .line()
      .x(d => d.x)
      .y(d => d.y)([
      {x: width / 2 - circleWidth - 20, y: 30},
      {x: 0, y: 30},
    ]);

    const lineRight = shape
      .line()
      .x(d => d.x)
      .y(d => d.y)([
      {x: width / 2 + circleWidth + 20, y: 30},
      {x: width, y: 30},
    ]);

    const curved = shape
      .line()
      .x(d => d.x)
      .y(d => d.y)
      .curve(shape.curveBasis)([
      {x: width / 2 - (circleWidth + 20), y: 30},
      {x: width / 2 - circleWidth / 1.3, y: 30},
      {x: width / 2 - circleWidth / 2, y: 10},
      {x: width / 2, y: 0},
      {x: width / 2 + circleWidth / 2, y: 10},
      {x: width / 2 + circleWidth / 1.3, y: 30},
      {x: width / 2 + circleWidth + 20, y: 30},
    ]);

    const path = `${lineLeft} ${lineRight} ${curved}`;

    return path;
  };

  const renderSvg = () => {
    const d = pathUp(SCREEN_WIDTH, 55, 55);

    return (
      <Svg width={SCREEN_WIDTH} height={85}>
        <Path stroke={'#fff'} strokeWidth={4} {...{d}} />
      </Svg>
    );
  };

  const renderTabBar = ({routeName, selectedTab, navigate}: any) => {
    return (
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
        onPress={() => {
          navigate(routeName);
          setSelectedTab(routeName);
        }}>
        <RenderIcon routeName={routeName} selectedTab={selectedTab} />
      </TouchableOpacity>
    );
  };

  const renderKycAlert = () => {
    if (
      // true
      !hideKycAlert &&
      userProfileData &&
      userProfileData?.kyc_record?.status !== 'approved'
    ) {
      return (
        <View
          style={[
            styles.kycAlert,
            setPaymentDetailBg(appTheme),
            {borderColor: ThemeFunctions.getTabShadowColor(appTheme).color},
          ]}>
          <TouchableOpacity
            onPress={() => setHideKycAlert(true)}
            style={{
              position: 'absolute',
              left: 10,
              top: -10,
              width: 20,
              height: 20,
            }}>
            <Icon color={'grey'} size={20} name="cancel" />
          </TouchableOpacity>

          <View style={styles.kycAlertRow}>
            <ThemeText
              style={{color: ThemeFunctions.customText(appTheme), flex: 1}}>
              {strings('kyc_prompt')}
            </ThemeText>

            <TouchableOpacity
              onPress={() => Navigation.navigate(Screen.MyAccount)}
              style={[styles.kycAlertBtn]}>
              <ThemeText style={{color: 'white'}}>KYC</ThemeText>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (
      !hideKycAlert &&
      userProfileData &&
      !userProfileData?.por_verified_at &&
      !userProfileData?.por_submitted_at
    ) {
      return (
        <View
          style={[
            styles.kycAlert,
            setPaymentDetailBg(appTheme),
            {borderColor: ThemeFunctions.getTabShadowColor(appTheme).color},
          ]}>
          <TouchableOpacity
            onPress={() => setHideKycAlert(true)}
            style={{
              position: 'absolute',
              left: 10,
              top: -10,
              width: 20,
              height: 20,
            }}>
            <Icon color={'grey'} size={20} name="cancel" />
          </TouchableOpacity>

          <View style={styles.kycAlertRow}>
            <ThemeText
              style={{color: ThemeFunctions.customText(appTheme), flex: 1}}>
              {strings('por_prompt')}
            </ThemeText>

            <TouchableOpacity
              onPress={() => Navigation.navigate(Screen.PORScreen)}
              style={[styles.kycAlertBtn]}>
              <ThemeText style={{color: 'white'}}>POR</ThemeText>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (
      !hideKycAlert &&
      userProfileData?.por_expires_soon &&
      !userProfileData?.por_submitted_at
    ) {
      return (
        <View
          style={[
            styles.kycAlert,
            setPaymentDetailBg(appTheme),
            {borderColor: ThemeFunctions.getTabShadowColor(appTheme).color},
          ]}>
          <TouchableOpacity
            onPress={() => setHideKycAlert(true)}
            style={{
              position: 'absolute',
              left: 10,
              top: -10,
              width: 20,
              height: 20,
            }}>
            <Icon color={'grey'} size={20} name="cancel" />
          </TouchableOpacity>

          <View style={styles.kycAlertRow}>
            <ThemeText
              style={{color: ThemeFunctions.customText(appTheme), flex: 1}}>
              {strings('Your Proof Of Residence (POR) expires soon.')}
            </ThemeText>

            <TouchableOpacity
              onPress={() => Navigation.navigate(Screen.PORScreen)}
              style={[styles.kycAlertBtn]}>
              <ThemeText style={{color: 'white'}}>POR</ThemeText>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return <></>;
  };

  return (
    <>
      <ScreenOverlay />
      <View style={{height: '100%'}}>{<Router tab={selectedTab} />}</View>

      {renderKycAlert()}

      <View
        style={{
          flex: 1,
          width: SCREEN_WIDTH,
          alignSelf: 'center',
          position: 'absolute',
          bottom: 0,
          zIndex: 0,
        }}>
        <Androw
          style={{
            shadowColor: ThemeFunctions.getTabShadowColor(appTheme).color,
            shadowOffset: {
              width: 0,
              height: -2,
            },
            shadowOpacity: 0.4,
            shadowRadius: 2,

            elevation: 5,
          }}>
          {renderSvg()}
        </Androw>
      </View>

      <CurvedBottomBar.Navigator
        type="UP"
        height={55}
        circleWidth={55}
        bgColor={isDarkTheme(appTheme) ? '#252836' : '#fff'}
        initialRouteName="home"
        renderCircle={({navigate}) => {
          return (
            <TouchableOpacity
              style={styles.buttonQuickSwap}
              onPress={() => {
                setSelectedTab('quick_swap');
                navigate('quick_swap');
              }}>
              <Image
                source={imageQuickSwap(appColor, appTheme)}
                style={styles.quickSwapIcon}
              />
              <Text
                style={[
                  styles.textQuickSwap,
                  {
                    color: isDarkTheme(appTheme)
                      ? darkTheme.dark03
                      : lightTheme.light03,
                  },
                ]}>
                Quick Swap
              </Text>
            </TouchableOpacity>
          );
        }}
        tabBar={renderTabBar}>
        <CurvedBottomBar.Screen
          name="home"
          position="LEFT"
          component={() => <Stub />}
        />
        <CurvedBottomBar.Screen
          name="ticker"
          component={() => <Stub />}
          position="LEFT"
        />
        <CurvedBottomBar.Screen
          name="quick_swap"
          component={() => <Stub />}
          position="CENTER"
        />
        <CurvedBottomBar.Screen
          name="wallet"
          component={() => <Stub />}
          position="RIGHT"
        />
        <CurvedBottomBar.Screen
          name="more"
          component={() => <Stub />}
          position="RIGHT"
        />
      </CurvedBottomBar.Navigator>
    </>
  );
};

const Stub = () => {
  return <></>;
};

export const ComingSoon = () => {
  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer);
  useEffect(() => {
    showToast('', strings('coming_soon'), 'info');
  }, []);
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        // flex: 1,
      }}>
      <Text
        style={{
          ...commonStyles.placeHolderText,
          color: ThemeFunctions.customText(appTheme),
        }}>
        Coming soon..!
      </Text>
    </View>
  );
};

const Router = ({tab}) => {
  switch (tab) {
    case 'home':
      return <Home />;
    case 'ticker':
      return <Staking />;
    // return <Tickers route={false} />;
    case 'wallet':
      return <Wallets />;
    case 'more':
      return <Account />;
    case 'quick_swap':
      return <QuickSwap />;
    default:
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}>
          <Text>Page Not Found</Text>
        </View>
      );
  }
};
