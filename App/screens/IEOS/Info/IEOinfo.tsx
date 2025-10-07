import React, {useEffect, useState} from 'react';
import {Text, View, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import RenderHtml from 'react-native-render-html';

import {Header, LoadingSpinner, Space, ThemeButton, ThemeText} from '../../../components';
import OpenURLButton from '../../../components/ui/OpenUrlButton';
import StatusView from '../../../components/ui/StatusButton';
import {AppActions, IeosActions} from '../../../store';
import {ieoDetailsSelector} from '../../../store/selectors/ieosSelector';
import {SCREEN_WIDTH, ThemeFunctions} from '../../../utils';
import {styles} from './IEOinfo_styles';
import {QuickBuyActions} from '../../../store';
import Link from '../../../components/hoc/Link';
import {FormatDateTime, toRealNumber} from '../../../utils/AppFunctions';
import {strings} from '../../../strings';
import Colors from '../../../theme/Colors';
import { rtlStyles } from '../../../globalstyles/styles';
import IEOAccessCheck from '../Main/IEOAccessCheck';
import { DeriveStatus } from '../common';

const CODE = 'SE';

const IEOinfo = (props: any) => {
  const {id} = props.route.params;
  const {navigation} = props;

  const {appTheme, assetMetadata, appColor, isRtlApproach} = useSelector(
    (state: any) => state.globalReducer,
  );
  const {userProfileData, allowedRegion} = useSelector(
    (state: any) => state.appReducer,
  );

  const {ticker, isLoading} = useSelector(ieoDetailsSelector);

  const dispatch = useDispatch();

  const Right = () => (
    <StatusView
      status={DeriveStatus({status:ticker?.status, startDate: ticker?.startDate, endDate:ticker?.endDate})}
    />
  );

  const navToBuy = () => {
    navigation.navigate('IEOSbuy');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const hasAccess = () => {
    if (!userProfileData) return true;
    return (
      (userProfileData.region || '').toUpperCase() === CODE ||
      allowedRegion.some(({region}) => region.toUpperCase() === CODE)
    );
  };

  const projectLinks = Object.entries(JSON.parse(ticker?.projectLinks || '[]'));
  const projectLinksCount = projectLinks.reduce(
    (prev, [key, value]) => (value ? prev + 1 : prev),
    0,
  );

  let projectText = ticker?.projectText;

  const socialMediaLinks = Object.entries(
    JSON.parse(ticker?.socialMediaLinks || '[]'),
  );
  const socialMediaLinksCount = socialMediaLinks.reduce(
    (prev, [key, value]) => (value ? prev + 1 : prev),
    0,
  );

  const audits = Object.entries(JSON.parse(ticker?.auditDetails || '[]'));
  const auditsCount = audits.reduce(
    (prev, [key, value]) => (value ? prev + 1 : prev),
    0,
  );

  const getImageUrl = () => {
    const filteredData = assetMetadata?.find(
      res => res?.currency?.toLowerCase() === ticker?.ticker?.toLowerCase(),
    );

    if (filteredData && Object.keys(filteredData).length > 0) {
      return QuickBuyActions.getImgUrl(
        filteredData.currency,
        filteredData.version,
      );
    } else {
      return 'https://api.globiance.com/assets/wallet/default.png';
    }
  };

  const getImageUrlAny = (symbol) => {
    const filteredData = assetMetadata?.find(
      res => res?.currency?.toLowerCase() === symbol?.toLowerCase(),
    );

    if (filteredData && Object.keys(filteredData).length > 0) {
      return QuickBuyActions.getImgUrl(
        filteredData.currency,
        filteredData.version,
      );
    } else {
      return 'https://api.globiance.com/assets/wallet/default.png';
    }
  };

  useEffect(() => {
    dispatch(IeosActions.getIeoDetails(id));
  }, []);

  const checkNull = value => {
    if (value === 'null' || value === 'undefined' || value === 'NaN') {
      return '-';
    }
    if (!value && value !== 0) {
      return '-';
    }
    if (typeof value === 'number' || isNaN(Number(value))) {
      return toRealNumber(value);
    }
    return value;
  };

  projectText = `<div style="color:${
    ThemeFunctions.getTextColor(appTheme).color
  }">${checkNull(projectText)}</div>`;


  let allowed_currency = <View style={[styles.statusContainer]}>
    <Text style={[styles.statusText]}>ALL</Text>
  </View>  

  if (ticker?.allowedCurrency) {
    allowed_currency = ticker?.allowedCurrency.split(",").map(symbol => 
      <View key={symbol} style={[styles.iconImageContainer]}>
        <Image
          style={styles.iconImage}
          source={{uri: getImageUrlAny(symbol)}}
        />
        <ThemeText style={styles.iconImageText}>
          {symbol}
        </ThemeText>
        
        
      </View>
      
      )
  }

  const onAllow = () => {
    dispatch(AppActions.getAllowedRegion());
  };
  const access = hasAccess();  

  return (
    <View>
      <Header
        title={ticker?.ticker}
        isNormalText={true}
        textTransform="uppercase"
        right={(isLoading || !ticker)?<></>:<Right />}
        rightComponentWidth={75}
        handleBack={handleBack}
      />

      {(isLoading || !ticker) ? (
        <View
          style={[{height: '100%'}, ThemeFunctions.setBackground(appTheme)]}>
          <LoadingSpinner
            color={ThemeFunctions.getColor(appColor)}
            size="large"
          />
        </View>
      ) :
      !access?
      <IEOAccessCheck onAllow={onAllow} />
      :
      (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[
            styles.listContainer,
            ThemeFunctions.setBackground(appTheme),
          ]}>
          <View style={[styles.heading, isRtlApproach ? rtlStyles.reverseRow : {}]}>
            <View style={[styles.headingLeftContainer, isRtlApproach ? rtlStyles.reverseRow : {}]}>
              <Image
                style={styles.headingImage}
                source={{uri: getImageUrl()}}
              />
              <View style={[styles.headingTokenInfo, isRtlApproach ? {marginRight: 10} : {marginLeft: 10}]}>
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit={true}
                  style={[
                    styles.tokenName,
                    {color: ThemeFunctions.getCurrentTextColor(appTheme)},
                  ]}>
                  {checkNull(ticker?.ticker)}
                </Text>
                <Text
                  numberOfLines={2}
                  adjustsFontSizeToFit={true}
                  style={[
                    styles.tokenSymbol,
                    {color: ThemeFunctions.getCurrentTextColor(appTheme)},
                  ]}>
                  {checkNull(ticker?.tokenName)}
                </Text>
                {checkNull(ticker?.description).length <= 15 &&
                checkNull(ticker?.description) !== '-' ? (
                  <Text
                    style={[
                      styles.description,
                      {color: ThemeFunctions.getCurrentTextColor(appTheme)},
                    ]}>
                    {checkNull(ticker?.description)}
                  </Text>
                ) : null}
              </View>
            </View>
            <View style={[styles.headingRightContainer]}>
              <View style={[styles.audits, isRtlApproach ? rtlStyles.alignSelfStart : {}]}>
                {audits && auditsCount > 0
                  ? audits?.map(([key, value]) =>
                      value ? (
                        <OpenURLButton
                          key={key}
                          textStyle={styles.auditText}
                          containerStyle={[
                            styles.audit,
                            ThemeFunctions.themeBtnColor(appColor),
                          ]}
                          title={key}
                          url={value}
                        />
                      ) : null,
                    )
                  : null}
              </View>
              <View style={styles.socialNetworks}>
                {socialMediaLinks && socialMediaLinksCount > 0
                  ? socialMediaLinks?.map(([key, value]) =>
                      value ? (
                        <Link key={key} url={value}>
                          {socialIcons.find(item => item.name === key)?.image}
                        </Link>
                      ) : null,
                    )
                  : null}
              </View>
            </View>
          </View>
          {checkNull(ticker?.description).length > 15 &&
          checkNull(ticker?.description) !== '-' ? (
            <Text style={[styles.description, ThemeFunctions.getTextColor(appTheme)]}>
              {checkNull(ticker?.description)}
            </Text>
          ) : null}
          <Space height={30} />
          <View style={[styles.block, ThemeFunctions.setIEOCardBG(appTheme)]}>
            <View style={[styles.titleContainer, isRtlApproach ? rtlStyles.reverseRow : {}]}>
              <Text
                style={[styles.title, ThemeFunctions.getTextColor(appTheme)]}>
                {strings('globiance_launchpad')}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <View style={[styles.listItem, isRtlApproach ? rtlStyles.reverseRow : {}]}>
                <Text
                  style={[
                    styles.boldText,
                    ThemeFunctions.getTextColor(appTheme),
                  ]}>
                  {strings('start_date')}:
                </Text>
                <Text
                  style={[styles.text, ThemeFunctions.getTextColor(appTheme)]}>
                  {FormatDateTime(checkNull(new Date(ticker?.startDate)))}
                </Text>
              </View>
              <View style={[styles.listItem, isRtlApproach ? rtlStyles.reverseRow : {}]}>
                <Text
                  style={[
                    styles.boldText,
                    ThemeFunctions.getTextColor(appTheme),
                  ]}>
                  {strings('end_data')}:
                </Text>
                <Text
                  style={[styles.text, ThemeFunctions.getTextColor(appTheme)]}>
                  {FormatDateTime(checkNull(new Date(ticker?.endDate)))}
                </Text>
              </View>
              <View style={[styles.listItem, isRtlApproach ? rtlStyles.reverseRow : {}]}>
                <Text
                  style={[
                    styles.boldText,
                    ThemeFunctions.getTextColor(appTheme),
                  ]}>
                  {strings('token_price')}:
                </Text>
                <Text
                  style={[styles.text, ThemeFunctions.getTextColor(appTheme)]}>
                  {checkNull(ticker?.tokenPrice)}
                </Text>
              </View>
              <View style={[styles.listItem, isRtlApproach ? rtlStyles.reverseRow : {}]}>
                <Text
                  style={[
                    styles.boldText,
                    ThemeFunctions.getTextColor(appTheme),
                  ]}>
                  {strings('soft_cap')}:
                </Text>
                <Text
                  style={[styles.text, ThemeFunctions.getTextColor(appTheme)]}>
                  {checkNull(ticker?.softCap)}
                </Text>
              </View>
              <View style={[styles.listItem, isRtlApproach ? rtlStyles.reverseRow : {}]}>
                <Text
                  style={[
                    styles.boldText,
                    ThemeFunctions.getTextColor(appTheme),
                  ]}>
                  {strings('hard_cap')}:
                </Text>
                <Text
                  style={[styles.text, ThemeFunctions.getTextColor(appTheme)]}>
                  {checkNull(ticker?.hardCap)}
                </Text>
              </View>
              <View style={[styles.listItem, isRtlApproach ? rtlStyles.reverseRow : {}]}>
                <Text
                  style={[
                    styles.boldText,
                    ThemeFunctions.getTextColor(appTheme),
                  ]}>
                  {strings('minimum_token_purchase')}:
                </Text>
                <Text
                  style={[styles.text, ThemeFunctions.getTextColor(appTheme)]}>
                  {checkNull(ticker?.minimumPurchase)}
                </Text>
              </View>
              <View style={[styles.listItem, isRtlApproach ? rtlStyles.reverseRow : {}]}>
                <Text
                  style={[
                    styles.boldText,
                    ThemeFunctions.getTextColor(appTheme),
                  ]}>
                  {strings('minimum_gbex_required')}:
                </Text>
                <Text
                  style={[styles.text, ThemeFunctions.getTextColor(appTheme)]}>
                  {checkNull(ticker?.minimumGBEX)}
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.block, ThemeFunctions.setIEOCardBG(appTheme)]}>
            <View style={[styles.titleContainer, isRtlApproach ? rtlStyles.reverseRow : {}]}>
              <Text
                style={[styles.title, ThemeFunctions.getTextColor(appTheme)]}>
                {strings('tokenomics')}
              </Text>
            </View>
            <View style={[styles.textContainer]}>
              <View style={[styles.listItem, isRtlApproach ? rtlStyles.reverseRow : {}]}>
                <Text
                  style={[
                    styles.boldText,
                    ThemeFunctions.getTextColor(appTheme),
                  ]}>
                  {strings('token_name')}:
                </Text>
                <Text
                  style={[styles.text, ThemeFunctions.getTextColor(appTheme)]}>
                  {checkNull(ticker?.name)}
                </Text>
              </View>
              <View style={[styles.listItem, isRtlApproach ? rtlStyles.reverseRow : {}]}>
                <Text
                  style={[
                    styles.boldText,  
                    ThemeFunctions.getTextColor(appTheme),
                  ]}>
                  {strings('token_symbol')}:
                </Text>
                <Text
                  style={[styles.text, ThemeFunctions.getTextColor(appTheme)]}>
                  {checkNull(ticker?.ticker)}
                </Text>
              </View>
              <View style={[styles.listItem, isRtlApproach ? rtlStyles.reverseRow : {}]}>
                <Text
                  style={[
                    styles.boldText,
                    ThemeFunctions.getTextColor(appTheme),
                  ]}>
                  {strings('decimals')}:
                </Text>
                <Text
                  style={[styles.text, ThemeFunctions.getTextColor(appTheme)]}>
                  {checkNull(ticker?.decimals)}
                </Text>
              </View>
              <View style={[styles.listItem, isRtlApproach ? rtlStyles.reverseRow : {}]}>
                <Text
                  style={[
                    styles.boldText,
                    ThemeFunctions.getTextColor(appTheme),
                  ]}>
                  {strings('token_address')}:
                </Text>
                <Text
                  style={[styles.text, ThemeFunctions.getTextColor(appTheme)]}>
                  {checkNull(ticker?.address)}
                </Text>
              </View>
              <View style={[styles.listItem, isRtlApproach ? rtlStyles.reverseRow : {}]}>
                <Text
                  style={[
                    styles.boldText,
                    ThemeFunctions.getTextColor(appTheme),
                  ]}>
                  {strings('network')}:
                </Text>
                <Text
                  style={[styles.text, ThemeFunctions.getTextColor(appTheme)]}>
                  {checkNull(ticker?.network)}
                </Text>
              </View>
              <View style={[styles.listItem, isRtlApproach ? rtlStyles.reverseRow : {}]}>
                <Text
                  style={[
                    styles.boldText,
                    ThemeFunctions.getTextColor(appTheme),
                  ]}>
                  {strings('total_supply')}:
                </Text>
                <Text
                  style={[styles.text, ThemeFunctions.getTextColor(appTheme)]}>
                  {checkNull(ticker?.totalSupply)}
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.block, ThemeFunctions.setIEOCardBG(appTheme)]}>
            <View style={[styles.titleContainer, isRtlApproach ? rtlStyles.reverseRow : {}]}>
              <Text
                style={[styles.title, ThemeFunctions.getTextColor(appTheme)]}>
                {strings('allowed_currency')}
              </Text>
            </View>
            <View style={[styles.iconContainer]}>
                  {allowed_currency}
            </View>
          </View>


          <View style={[styles.block, ThemeFunctions.setIEOCardBG(appTheme)]}>
            <View style={[styles.titleContainer, isRtlApproach ? rtlStyles.reverseRow : {}]}>
              <Text
                style={[styles.title, ThemeFunctions.getTextColor(appTheme)]}>
                {strings('project_informtaion')}
              </Text>
            </View>
            <View style={[styles.textContainer]}>
              <RenderHtml 
                contentWidth={SCREEN_WIDTH}
                source={{html: projectText}} 
                ignoredDomTags={["html", "img", "image", "video"]} 
               />
            </View>
          </View>
          <View style={[styles.block, ThemeFunctions.setIEOCardBG(appTheme)]}>
            <View style={[styles.titleContainer, isRtlApproach ? rtlStyles.reverseRow : {}]}>
              <Text
                style={[styles.title, ThemeFunctions.getTextColor(appTheme)]}>
                {strings('project_links')}:
              </Text>
            </View>
            {projectLinks && projectLinksCount > 0 ? (
              <View style={[styles.textContainer]}>
                {projectLinks?.map(([key, value]) =>
                  value ? (
                    <View key={key} style={styles.listItem}>
                      <Text
                        style={[
                          styles.boldText,
                          ThemeFunctions.getTextColor(appTheme),
                        ]}>
                        {key}:
                      </Text>
                      <OpenURLButton title={value} url={value} />
                    </View>
                  ) : null,
                )}
              </View>
            ) : null}
          </View>
          <ThemeButton
            styleButton={[{backgroundColor: Colors.currencyGreen}]}
            onClickHandler={navToBuy}
            text={strings('buy')}
            marginStyle={{marginBottom: 200}}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default IEOinfo;

const socialIcons = [
  {
    name: 'facebook',
    image: (
      <Image
        style={styles.socialIcon}
        source={require('../../../assets/icons/social/facebook.png')}
      />
    ),
  },
  {
    name: 'twitter',
    image: (
      <Image
        style={styles.socialIcon}
        source={require('../../../assets/icons/social/twitter.png')}
      />
    ),
  },
  {
    name: 'telegram',
    image: (
      <Image
        style={styles.socialIcon}
        source={require('../../../assets/icons/social/telegram.png')}
      />
    ),
  },
  {
    name: 'medium',
    image: (
      <Image
        style={styles.socialIcon}
        source={require('../../../assets/icons/social/medium.png')}
      />
    ),
  },
  {
    name: 'reddit',
    image: (
      <Image
        style={styles.socialIcon}
        source={require('../../../assets/icons/social/reddit.png')}
      />
    ),
  },
];
