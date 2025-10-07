import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Text,
  RefreshControl,
} from 'react-native';
import {commonStyles, rtlStyles} from '../../globalstyles/styles';
import * as Images from '../../assets';
import {strings} from '../../strings';
import {useDispatch} from 'react-redux';
import {AppColor, Screen} from '../../enums';
import {useSelector} from 'react-redux';
import {SCREEN_HEIGHT, SCREEN_WIDTH, ThemeFunctions} from '../../utils';
import {
  CustomModal,
  Header,
  LoadingSpinner,
  Space,
  ThemeButton,
  ThemeText,
} from '../../components';
import {rewardStyles as styles} from './styles';
import {isDarkTheme} from '../../utils/ThemeFunctions';
import IconVector from '../../components/ui/IconVector';
import Navigation from '../../utils/Navigation';
import Clipboard from '@react-native-clipboard/clipboard';
import {showToast} from '../../utils/GenericUtils';
import {referralSelector} from '../../store/selectors/referralSelector';
import {getReferralDetails} from '../../store/action/referrals/ReferralsActions';
import {Icon} from 'react-native-elements';
import {FormatNumber} from '../../utils/AppFunctions';
import QRCode from 'react-native-qrcode-svg';
import {makeRequest} from '../../services/ApiService';
import {MapperConstants} from '../../constants';
import Share from 'react-native-share';
import {CurrentConfig} from '../../../api_config';

const TruncateString = (str: string, first = 20, last = 10): string => {
  if (str.length <= 11) return str;
  return str.substr(0, first) + '...' + str.substr(str.length - last, last);
};

const Referrals = (props: any) => {
  const dispatch = useDispatch();

  const [showModalQrScan, setShowModalQrScan] = useState(false);

  const {appTheme, appColor, userdata, isRtlApproach} = useSelector(
    (state: any) => state.globalReducer,
  );

  const {referralCode, isLoading, error, details} =
    useSelector(referralSelector);
  const [submitSpinnerShown, setSubmitSpinnerShown] = useState(false);

  const referralLink = `${CurrentConfig.base_url}register?ref=${referralCode}`;

  const dyanmicLink =
    referralCode &&
    `https://globiance.page.link/?link=https://globiance.page.link/referral/?referralCode=${referralCode}&apn=com.solheaven.android&isi=1584923932&ibi=com.solheaven.iosapp&ofl=1`;

  useEffect(() => {
    dispatch(getReferralDetails());
  }, []);

  const toogleModalQrScan = () => {
    setShowModalQrScan(state => !state);
  };

  const appData = useSelector((state: any) => state.appReducer);

  const _navigateHistory = () => {
    Navigation.navigate(Screen.ReferralHistory);
  };

  const _getBackgroundYourGbex = () => {
    switch (appColor) {
      case AppColor.green:
        return {backgroundColor: isDarkTheme(appTheme) ? '#21323C' : '#CBF0EB'};
      case AppColor.pink:
        return {backgroundColor: isDarkTheme(appTheme) ? '#3A273A' : '#FEDFEB'};
    }
    return {backgroundColor: '#C9C9CD'};
  };

  const _getBackgroundReward = () => {
    switch (appColor) {
      case AppColor.green:
        return {backgroundColor: isDarkTheme(appTheme) ? '#1F2935' : '#E8F0E8'};
      case AppColor.pink:
        return {backgroundColor: isDarkTheme(appTheme) ? '#331F33' : '#F0E8ED'};
    }
    return {backgroundColor: '#F6F6F6'};
  };

  const _getImageReward = () => {
    switch (appColor) {
      case AppColor.green:
        return Images.reward_green;
      case AppColor.pink:
        return Images.reward_pink;
    }
    return Images.reward_black;
  };

  const copyLink = () => {
    Clipboard.setString(referralLink);
    showToast(strings('referrals'), strings('Copied to clipboard'), 'success');
  };

  const copyContent = (content: string) => {
    Clipboard.setString(content);
    showToast(strings('referrals'), strings('Copied to clipboard'), 'success');
  };

  // const onRedeem = () => {
  //   setSubmitSpinnerShown(true);
  //   makeRequest(
  //     MapperConstants.ApiTypes.POST,
  //     'user/redeem_referral',
  //     {},
  //     {
  //       amount: details?.referralBalance,
  //       currencyName: details?.currencyName,
  //     },
  //   )
  //     .then(resp => {
  //       if (resp.status === 200) {
  //         showToast(strings('referrals'), resp.message, 'success');
  //       } else {
  //         let msg = resp.message || strings('error_boundary_msg');
  //         showToast(strings('referrals'), msg, 'error');
  //       }

  // dispatch(getReferralDetails());
  //     })
  //     .catch(e => {
  //       console.log(e);
  //       showToast(strings('referrals'), strings('error_boundary_msg'), 'error');
  //     })
  //     .finally(() => {
  //       setSubmitSpinnerShown(false);
  //     });
  // };

  const shareDynamicLink = () => {
    dyanmicLink &&
      Share.open({
        title: 'Globiance Invite',
        message:
          'Install the Globiance Exchange app using my referral and trade tokens like BTC, ETH, GBEX, XDC, XRP, and XLM instantly!',
        url: dyanmicLink,
      });
  };

  const shareWebsiteLink = () => {
    referralLink &&
      Share.open({
        title: 'SolHeaven Invite',
        message:
          'Signup on the SolHeaven using my referral link for experience the first bank on solana.',
        url: referralLink,
      });
  };

  return (
    <SafeAreaView
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      <Header
        title={strings('referrals')}
        right={
          <TouchableOpacity
            style={[styles.profileBtn, ThemeFunctions.getCardColor(appTheme)]}
            onPress={_navigateHistory}>
            <IconVector.FontAwesome5
              name="history"
              color={ThemeFunctions.getCurrentTextColor(appTheme)}
              size={22}
            />
          </TouchableOpacity>
        }
      />

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => dispatch(getReferralDetails())}
            tintColor={ThemeFunctions.getColor(appColor)}
            colors={[ThemeFunctions.getColor(appColor)]}
          />
        }
        contentContainerStyle={{paddingBottom: 60}}>
        <View style={styles.container}>
          <View
            style={[
              styles.yourGbex,
              _getBackgroundYourGbex(),
              isRtlApproach ? rtlStyles.reverseRow : {},
            ]}>
            <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
              {strings('my_referral')}
            </ThemeText>
          </View>
          {/* <View
            style={[
              styles.reward,
              _getBackgroundReward(),
              isRtlApproach ? rtlStyles.reverseRow : {},
            ]}>
            <Image
              source={_getImageReward()}
              style={[
                styles.rewardImg,
                isRtlApproach ? {marginLeft: 10} : {marginRight: 10},
              ]}
            />
            <View>
              <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
                {strings('referral_count')}
              </ThemeText>
              <ThemeText>{FormatNumber(details?.referralCount)}</ThemeText>
            </View>
          </View>
          <View
            style={[
              styles.reward,
              _getBackgroundReward(),
              isRtlApproach ? rtlStyles.reverseRow : {},
            ]}>
            <Image
              source={_getImageReward()}
              style={[
                styles.rewardImg,
                isRtlApproach ? {marginLeft: 10} : {marginRight: 10},
              ]}
            />
            <View>
              <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
                {strings('current_referals_balance')}
              </ThemeText>
              <ThemeText>{FormatNumber(details?.referralBalance)}</ThemeText>
            </View>
          </View> */}
          <View
            style={[
              styles.reward,
              _getBackgroundReward(),
              isRtlApproach ? rtlStyles.reverseRow : {},
            ]}>
            <Image
              source={_getImageReward()}
              style={[
                styles.rewardImg,
                isRtlApproach ? {marginLeft: 10} : {marginRight: 10},
              ]}
            />
            <View>
              <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
                {strings('total_referrals_rewards')}
              </ThemeText>
              <ThemeText>{FormatNumber(details?.referrals)}</ThemeText>
            </View>
          </View>
          <View
            style={[
              styles.endReward,
              _getBackgroundReward(),
              isRtlApproach ? rtlStyles.reverseRow : {},
            ]}>
            <Image
              source={_getImageReward()}
              style={[
                styles.rewardImg,
                isRtlApproach ? {marginLeft: 10} : {marginRight: 10},
              ]}
            />
            <View>
              <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
                {strings('commission_rate')}
              </ThemeText>
              <ThemeText>
                {FormatNumber(details?.earning_percentage)} %
              </ThemeText>
            </View>
          </View>
          <Space height={10} />

          <View>
            <ThemeText
              style={{
                color: ThemeFunctions.customText(appTheme),
                marginBottom: 5,
              }}>
              {strings('your_referral_code')}
            </ThemeText>
            <View
              style={[
                styles.bgCopy,
                ThemeFunctions.getTickerHeaderColor(appTheme),
                {
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                },
              ]}>
              <ThemeText>{referralCode}</ThemeText>

              <View style={[{display: 'flex', flexDirection: 'row'}]}>
                <TouchableOpacity
                  style={styles.refCopyButton}
                  onPress={() => copyContent(referralCode)}>
                  <IconVector.FontAwesome5
                    name="copy"
                    {...ThemeFunctions.getTextColor(appTheme)}
                    size={20}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.qrScanButton}
                  onPress={() => setShowModalQrScan(true)}>
                  <Icon
                    name="qr-code-2"
                    type="material"
                    {...ThemeFunctions.getTextColor(appTheme)}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <Space height={20} />

          <ThemeText
            style={[styles.textBold, isRtlApproach ? rtlStyles.textRight : {}]}>
            {strings('share_your_link_and_earn_more')}
          </ThemeText>

          <Space height={10} />

          {/* <View>
            <ThemeText
              style={{
                color: ThemeFunctions.customText(appTheme),
                marginBottom: 5,
              }}>
              {strings('app_invitation_link')}
            </ThemeText>
            <View
              style={[
                styles.bgCopy,
                ThemeFunctions.getTickerHeaderColor(appTheme),
                {
                  display: 'flex',
                  flexDirection: 'row',
                },
              ]}>
              <ThemeText style={styles.textLink}>
                {TruncateString(dyanmicLink)}
              </ThemeText>

              <TouchableOpacity
                style={styles.refCopyButton}
                onPress={shareDynamicLink}>
                <IconVector.FontAwesome5
                  name="share"
                  {...ThemeFunctions.getTextColor(appTheme)}
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Space height={10} /> */}

          <View>
            <ThemeText
              style={{
                color: ThemeFunctions.customText(appTheme),
                marginBottom: 5,
              }}>
              {strings('website_referral_link')}
            </ThemeText>
            <View
              style={[
                styles.bgCopy,
                ThemeFunctions.getTickerHeaderColor(appTheme),
                {
                  display: 'flex',
                  flexDirection: 'row',
                },
              ]}>
              <ThemeText style={styles.textLink}>
                {TruncateString(referralLink, 15, 13)}
              </ThemeText>

              <TouchableOpacity
                style={styles.refCopyButton}
                onPress={shareWebsiteLink}>
                <IconVector.FontAwesome5
                  name="share"
                  {...ThemeFunctions.getTextColor(appTheme)}
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Space height={10} />
        </View>
      </ScrollView>
      {/* <View style={commonStyles.paddingHorizontalView}>
        <ThemeButton
          text="redeem_now"
          // onClickHandler={onRedeem}
          loading={submitSpinnerShown}
        />
      </View> */}

      <CustomModal
        visibility={showModalQrScan}
        onBackdropPress={() => setShowModalQrScan(false)}>
        <View
          style={[
            styles.qrModal,
            ThemeFunctions.setIEOCardBG(appTheme),
            {height: 400, paddingHorizontal: 20},
          ]}>
          <View style={[{margin: 20}]}>
            <ThemeText
              style={{
                fontSize: 24,
              }}>
              {strings('your_referral_code')}
            </ThemeText>
          </View>

          <QRCode
            color={ThemeFunctions.getColor(appColor)}
            backgroundColor={
              ThemeFunctions.getCardColor(appTheme).backgroundColor
            }
            size={300}
            value={referralCode}
          />
        </View>
      </CustomModal>
    </SafeAreaView>
  );
};

export default Referrals;
