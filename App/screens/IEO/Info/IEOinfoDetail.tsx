import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  Image,
  useWindowDimensions,
  SafeAreaView,
  RefreshControl,
  FlatList,
  TouchableOpacity,
  Linking,
  findNodeHandle,
  UIManager,
} from 'react-native';
import {useForm} from 'react-hook-form';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {TabView, TabBar} from 'react-native-tab-view';
import RenderHtml from 'react-native-render-html';

import {
  Header,
  LoadingSpinner,
  Space,
  ThemeButton,
  ThemeText,
  Input,
} from '../../../components';

import {SCREEN_WIDTH, ThemeFunctions} from '../../../utils';
import {styles} from './IEOinfo_styles';

import {strings} from '../../../strings';

import {commonStyles, rtlStyles} from '../../../globalstyles/styles';
import IEODetialCarousel from './IEODetialCarousel';
import HistoryItem from './HistoryItem';
import {historyStyles} from './styles';
import {isDarkTheme} from '../../../utils/ThemeFunctions';
import ProgressBar from './ProgressBar';
import {FormConstants, Loader, ReturnKeyTypes} from '../../../enums';
import SelectToken from './SelectToken';
import {MapperConstants} from '../../../constants';
import StatusView from '../../../components/ui/StatusButton';
import {DeriveStatus} from '../common';
import {LaunchPadActions} from '../../../store';

const IEOinfoDetail = (props: any) => {
  const {id} = props.route.params;
  const {navigation} = props;

  const [detail, setDetail] = useState();
  const [historyFilter, setHistoryFilter] = useState();
  const [index, setIndex] = useState(0);

  const scrollViewRef = useRef();

  // For currency selection
  const [isModal, setIsModal] = useState(MapperConstants.StatusMapper.disable);
  const [currency, setCurrency] = useState<any>('');
  const [currencyId, setCurrencyId] = useState(null);
  const [scrollingIndex, setScrollingIndex] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [showPrice, setShowPrice] = useState(false);
  const [price, setPrice] = useState({
    unit: 0,
    total: 0,
  });
  const [amount, setAmount] = useState(0);
  const {appTheme, assetMetadata, appColor, isRtlApproach} = useSelector(
    (state: any) => state.globalReducer,
  );

  const appData = useSelector((state: any) => state.appReducer);

  const {launchpad, setting, history} = useSelector(
    (state: any) => state.launchPadReducer,
  );

  const isLoading =
    appData.loading === Loader.LAUNCH_PAD_BUY ||
    appData.loading === Loader.LAUNCH_PAD_HISTORY;

  const {
    control,
    formState: {errors},
    setValue,
    getValues,
    handleSubmit,
    reset,
  } = useForm();

  const {width: WIDTH, height: HEIGHT} = useWindowDimensions();

  const dispatch = useDispatch();

  useEffect(() => {
    const resp = launchpad.find(item => item.id === id);
    const historyDetail = history.filter(item => item.setting.id == id);
    setHistoryFilter(historyDetail);
    setDetail(resp);
  }, [id, history]);

  useEffect(() => {
    if (Object.keys(errors).length) {
      setIndex(0);
      scrollToInput();
    }
  }, [errors]);

  const updateHistory = () => {
    dispatch(LaunchPadActions.getLaunchPadHistory());
  };

  const Right = () => (
    <StatusView status={detail?.tokenRaise.paused ? 'pause' : 'live'} />
  );

  const handleBack = () => {
    navigation.goBack();
  };

  const handleIndexChange = (index: number) => {
    setIndex(index);
  };

  useEffect(() => {
    setValue(FormConstants.Currency_Label, currency);
  }, [currency]);

  const [routes] = useState([
    {key: 'main', title: strings('Main')},
    {key: 'description', title: strings('Description')},
    {key: 'tokenomics', title: strings('Tokenomics')},
    {key: 'history', title: strings('History')},
    {key: 'whitepaper', title: strings('Whitepaper')},
  ]);

  const renderScene = ({route: {key}}) => {
    switch (key) {
      case 'main':
        return Information;
      case 'description':
        return Description;
      case 'tokenomics':
        return Tokenomics;
      case 'history':
        return HistoryList;
      case 'whitepaper':
        return WhitePaper;
      default:
        return EmptyComponent;
    }
  };

  const removeWhitespace = detail?.description
    .replace(/<p><br><\/p>/g, '') // Remove empty <p> with <br>
    .replace(/<br>/g, '') // Remove all <br> tags
    .replace(/<p>\s*<\/p>/g, '');

  const reverseDirection = () => {
    return [
      historyStyles.rowItem,
      {borderBottomColor: isDarkTheme(appTheme) ? '#1F1D2B' : '#d3d4db'},
      isRtlApproach ? rtlStyles.reverseRow : {},
    ];
  };

  const rightAlignView = () => {
    return [
      historyStyles.rightView,
      isRtlApproach ? rtlStyles.alignStart : rtlStyles.alignEnd,
    ];
  };

  const leftAlignView = () => {
    return [
      historyStyles.leftItemView,
      isRtlApproach ? rtlStyles.alignEnd : rtlStyles.alignStart,
    ];
  };

  const leftTextColor = () => {
    return ThemeFunctions.customInputText(appTheme);
  };

  const openLink = url => {
    if (url) {
      Linking.openURL(url).catch(err =>
        console.error("Couldn't load page", err),
      );
    }
  };

  const handleCurrency = (item, index) => async () => {
    setCurrency(item.symbol);
    setCurrencyId(item.currency.id);
    setIsModal(MapperConstants.StatusMapper.disable);
    setScrollingIndex(index);
    setValue(FormConstants.Currency_Label);

    if (amount > 0) {
      getExchangeRate(item.currency.id, amount);
    }
  };

  const handPicker = () => {
    setIsModal(MapperConstants.StatusMapper.enable);
  };

  const scrollToInput = () => {
    scrollViewRef.current.scrollToEnd({animated: true});
  };

  const onChangeAmount = val => {
    setShowPrice(val > 0 ? true : false);
    setAmount(val);
    setValue(FormConstants.Amount, val);
    getExchangeRate(currencyId, val);
    scrollToInput();
  };

  const getExchangeRate = (id, val) => {
    const rate = detail?.tokenRaise.allowedCurrencies.find(
      item => item.id === id,
    );
    const totalPrice = val * rate.exchange_rate;
    setPrice({
      unit: parseFloat(rate.exchange_rate).toFixed(8),
      total: parseFloat(totalPrice).toFixed(8),
    });
  };

  const onSubmit = () => {
    const payload = {
      currency_id: currencyId,
      ico_id: id,
      method_type_id: 1,
      amount: amount,
    };
    dispatch(LaunchPadActions.LaunchPadBuy(payload, reset));
  };

  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setScrollOffset(offsetY);
  };

  const Description = (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[
        commonStyles.scrollView,
        // commonStyles.paddingHorizontalView,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      <RenderHtml
        contentWidth={WIDTH}
        source={{html: removeWhitespace || '<p></p>'}}
      />
    </ScrollView>
  );

  const EmptyComponent = (
    <Text
      style={{
        ...historyStyles.placeHolderText,
        color: ThemeFunctions.customText(appTheme),
      }}>
      {/* {strings('Not Found')} */}
    </Text>
  );

  const Information = (
    <ScrollView
      ref={scrollViewRef}
      onScroll={handleScroll}
      scrollEventThrottle={16}>
      <View style={[styles.textContainer]}>
        <View
          style={[
            historyStyles.historyCard,
            ThemeFunctions.getListColor(appColor, appTheme),
          ]}>
          <View style={reverseDirection()}>
            <View style={leftAlignView()}>
              <ThemeText
                style={[historyStyles.leftLabel, leftTextColor()]}
                adjustsFontSizeToFit={true}
                numberOfLines={2}>
                {strings('datetime')}
              </ThemeText>
            </View>
            <View style={rightAlignView()}>
              <ThemeText
                style={[historyStyles.rightLabel, leftTextColor()]}
                adjustsFontSizeToFit={true}
                numberOfLines={2}>
                {/* {AppFunctions.FormatDateTime(data?.date)} */}
                {detail?.tokenRaise.startDate} {detail?.tokenRaise.startTime}
              </ThemeText>
            </View>
          </View>

          <View style={reverseDirection()}>
            <View style={leftAlignView()}>
              <ThemeText
                style={[historyStyles.leftLabel, leftTextColor()]}
                adjustsFontSizeToFit={true}
                numberOfLines={2}>
                {strings('Goal')}
              </ThemeText>
            </View>
            <View style={rightAlignView()}>
              <ThemeText
                style={[historyStyles.rightLabel, leftTextColor()]}
                adjustsFontSizeToFit={true}
                numberOfLines={2}>
                {/* {AppFunctions.FormatDateTime(data?.date)} */}
                {detail?.tokenRaise.fundraise_goal}
              </ThemeText>
            </View>
          </View>
          <View
            style={[
              commonStyles.paddingHorizontalView,
              {
                paddingTop: 10,
                borderBottomWidth: 1,
                borderBottomColor: isDarkTheme(appTheme)
                  ? '#1F1D2B'
                  : '#d3d4db',
              },
            ]}>
            <ProgressBar progress={detail?.percentage_raised} />
          </View>
          <View style={reverseDirection()}>
            <View style={leftAlignView()}>
              <ThemeText
                style={[historyStyles.leftLabel, leftTextColor()]}
                adjustsFontSizeToFit={true}
                numberOfLines={2}>
                {strings('Minimum Allocation')}
              </ThemeText>
            </View>
            <View style={rightAlignView()}>
              <ThemeText
                style={[historyStyles.rightLabel, leftTextColor()]}
                adjustsFontSizeToFit={true}
                numberOfLines={2}>
                {detail?.tokenRaise.minimumAllocation}
              </ThemeText>
            </View>
          </View>
          <View style={reverseDirection()}>
            <View style={leftAlignView()}>
              <ThemeText
                style={[historyStyles.leftLabel, leftTextColor()]}
                adjustsFontSizeToFit={true}
                numberOfLines={2}>
                {strings('Maximum Allocation')}
              </ThemeText>
            </View>
            <View style={rightAlignView()}>
              <ThemeText
                style={[historyStyles.rightLabel, leftTextColor()]}
                adjustsFontSizeToFit={true}
                numberOfLines={2}>
                {detail?.tokenRaise.maximumAllocation}
              </ThemeText>
            </View>
          </View>
          <View style={[reverseDirection()]}>
            <View style={leftAlignView()}>
              <ThemeText
                style={[historyStyles.leftLabel, leftTextColor()]}
                adjustsFontSizeToFit={true}
                numberOfLines={2}>
                {strings('Token Price (USD)')}
              </ThemeText>
            </View>
            <View style={rightAlignView()}>
              <ThemeText
                style={[
                  historyStyles.rightLabel,
                  {color: ThemeFunctions.getColor(appColor)},
                ]}
                adjustsFontSizeToFit={true}
                numberOfLines={2}>
                {detail?.tokenRaise.token_price}
              </ThemeText>
            </View>
          </View>
          <View style={[reverseDirection()]}>
            <View style={leftAlignView()}>
              <ThemeText
                style={[historyStyles.leftLabel, leftTextColor()]}
                adjustsFontSizeToFit={true}
                numberOfLines={2}>
                {strings('Fundraise Goal')}
              </ThemeText>
            </View>
            <View style={rightAlignView()}>
              <ThemeText
                style={[
                  historyStyles.rightLabel,
                  {color: ThemeFunctions.getColor(appColor)},
                ]}
                adjustsFontSizeToFit={true}
                numberOfLines={2}>
                {detail?.tokenRaise.fundraise_goal}
              </ThemeText>
            </View>
          </View>
          <View style={[reverseDirection()]}>
            <View style={leftAlignView()}>
              <ThemeText
                style={[historyStyles.leftLabel, leftTextColor()]}
                adjustsFontSizeToFit={true}
                numberOfLines={2}>
                {strings('website')}
              </ThemeText>
            </View>
            <View style={rightAlignView()}>
              <TouchableOpacity onPress={() => openLink(detail?.website)}>
                <Text style={{color: 'blue', textDecorationLine: 'underline'}}>
                  {/* {detail?.tokenomics.project_links[0].url} */}
                  Click Here
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={[reverseDirection(), historyStyles.noBorder, {margin: 0}]}>
            <View style={leftAlignView()}>
              <ThemeText
                style={[historyStyles.leftLabel, leftTextColor()]}
                adjustsFontSizeToFit={true}
                numberOfLines={2}>
                {strings('Select a payment currency')}
              </ThemeText>
            </View>
            <View style={{width: 100}}>
              <TouchableOpacity style={{paddingTop: 0}} onPress={handPicker}>
                <Input
                  id={FormConstants.Currency_Label}
                  // label={strings('currency_label')}
                  placeholder={strings('select')}
                  control={control}
                  errors={errors}
                  isFieldFilledBg={false}
                  isRequired={true}
                  dropdown={true}
                  returnKeyType={ReturnKeyTypes.Next}
                />
              </TouchableOpacity>
            </View>
          </View>

          <SelectToken
            currency={currency}
            allowed={detail?.tokenRaise.allowedCurrencies}
            isVisible={isModal}
            setIsVisible={setIsModal}
            setSecondCurrency={setCurrency}
            updateToken={handleCurrency}
            setScrollingIndex={setScrollingIndex}
            scrollingIndex={scrollingIndex}
          />

          <View
            style={[
              reverseDirection(),
              historyStyles.noBorder,
              {paddingTop: 0, margin: 0},
            ]}>
            <Input
              id={FormConstants.Amount}
              // label={strings('amount')}
              placeholder={strings('enter_amount')}
              control={control}
              errors={errors}
              onChangeVal={onChangeAmount}
              keyboardType="decimal-pad"
              isFieldFilledBg={false}
              isRequired={true}
              // reference={amountRef}
              returnKeyType={ReturnKeyTypes.Go}
            />
          </View>

          {showPrice && (
            <View
              accessible={true}
              style={[commonStyles.paddingHorizontalView, {paddingBottom: 10}]}>
              <View
                style={[
                  styles.listItem,
                  isRtlApproach ? rtlStyles.reverseRow : {},
                ]}>
                <ThemeText
                  style={[historyStyles.leftLabel, leftTextColor()]}
                  adjustsFontSizeToFit={true}
                  numberOfLines={1}>
                  {strings('price')}:
                </ThemeText>
                <ThemeText
                  style={[
                    historyStyles.leftLabel,
                    ThemeFunctions.getTextColor(appTheme),
                    {paddingLeft: 10},
                  ]}>
                  {price.unit}
                </ThemeText>
              </View>
              <View
                style={[
                  styles.listItem,
                  isRtlApproach ? rtlStyles.reverseRow : {},
                ]}>
                <ThemeText
                  style={[historyStyles.leftLabel, leftTextColor()]}
                  adjustsFontSizeToFit={true}
                  numberOfLines={1}>
                  {strings('total')}:
                </ThemeText>
                <ThemeText
                  style={[
                    historyStyles.leftLabel,
                    ThemeFunctions.getTextColor(appTheme),
                    {paddingLeft: 10},
                  ]}>
                  {price.total}
                </ThemeText>
              </View>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );

  const Tokenomics = (
    <ScrollView>
      <View style={[styles.textContainer]}>
        <View
          style={[
            historyStyles.historyCard,
            ThemeFunctions.getListColor(appColor, appTheme),
          ]}>
          <View
            style={[
              reverseDirection(),
              {
                backgroundColor: '#85556d',
                borderTopRightRadius: 8,
                borderTopLeftRadius: 8,
              },
            ]}>
            <View style={leftAlignView()}>
              <ThemeText
                style={[historyStyles.leftLabel, {color: 'white'}]}
                adjustsFontSizeToFit={true}
                numberOfLines={2}>
                {strings('Tokenomics')}
              </ThemeText>
            </View>
          </View>
          <View style={reverseDirection()}>
            <View style={leftAlignView()}>
              <ThemeText
                style={[historyStyles.leftLabel, leftTextColor()]}
                adjustsFontSizeToFit={true}
                numberOfLines={2}>
                {strings('Token Name')}
              </ThemeText>
            </View>
            <View style={rightAlignView()}>
              <ThemeText
                style={[historyStyles.rightLabel, leftTextColor()]}
                adjustsFontSizeToFit={true}
                numberOfLines={2}>
                {/* {AppFunctions.FormatDateTime(data?.date)} */}
                {detail?.tokenomics.token_name}
              </ThemeText>
            </View>
          </View>

          <View style={reverseDirection()}>
            <View style={leftAlignView()}>
              <ThemeText
                style={[historyStyles.leftLabel, leftTextColor()]}
                adjustsFontSizeToFit={true}
                numberOfLines={2}>
                {strings('Decimals')}
              </ThemeText>
            </View>
            <View style={rightAlignView()}>
              <ThemeText
                style={[historyStyles.rightLabel, leftTextColor()]}
                adjustsFontSizeToFit={true}
                numberOfLines={2}>
                {/* {AppFunctions.FormatDateTime(data?.date)} */}
                {detail?.tokenomics.decimals}
              </ThemeText>
            </View>
          </View>

          <View style={reverseDirection()}>
            <View style={leftAlignView()}>
              <ThemeText
                style={[historyStyles.leftLabel, leftTextColor()]}
                adjustsFontSizeToFit={true}
                numberOfLines={2}>
                {strings('Token Address')}
              </ThemeText>
            </View>
            <View style={rightAlignView()}>
              <ThemeText
                style={[historyStyles.rightLabel, leftTextColor()]}
                adjustsFontSizeToFit={true}
                numberOfLines={2}>
                {detail?.tokenomics.token_address}
              </ThemeText>
            </View>
          </View>
          <View style={reverseDirection()}>
            <View style={leftAlignView()}>
              <ThemeText
                style={[historyStyles.leftLabel, leftTextColor()]}
                adjustsFontSizeToFit={true}
                numberOfLines={2}>
                {strings('Network')}
              </ThemeText>
            </View>
            <View style={rightAlignView()}>
              <ThemeText
                style={[historyStyles.rightLabel, leftTextColor()]}
                adjustsFontSizeToFit={true}
                numberOfLines={2}>
                {detail?.tokenomics.network}
              </ThemeText>
            </View>
          </View>
          <View style={[reverseDirection()]}>
            <View style={leftAlignView()}>
              <ThemeText
                style={[historyStyles.leftLabel, leftTextColor()]}
                adjustsFontSizeToFit={true}
                numberOfLines={2}>
                {strings('Total Supply')}
              </ThemeText>
            </View>
            <View style={rightAlignView()}>
              <ThemeText
                style={[
                  historyStyles.rightLabel,
                  {color: ThemeFunctions.getColor(appColor)},
                ]}
                adjustsFontSizeToFit={true}
                numberOfLines={2}>
                {detail?.tokenomics.total_supply}
              </ThemeText>
            </View>
          </View>
          <View
            style={[
              reverseDirection(),
              {
                backgroundColor: '#85556d',
                // borderTopRightRadius: 8,
                // borderTopLeftRadius: 8,
              },
            ]}>
            <View style={leftAlignView()}>
              <ThemeText
                style={[historyStyles.leftLabel, {color: 'white'}]}
                adjustsFontSizeToFit={true}
                numberOfLines={2}>
                {strings('Project Links')}
              </ThemeText>
            </View>
          </View>
          <View style={[reverseDirection(), historyStyles.noBorder]}>
            <View style={leftAlignView()}>
              <ThemeText
                style={[historyStyles.leftLabel, leftTextColor()]}
                adjustsFontSizeToFit={true}
                numberOfLines={2}>
                {strings('Telegram')}
              </ThemeText>
            </View>
            <View style={rightAlignView()}>
              <ThemeText
                style={[
                  historyStyles.rightLabel,
                  {color: ThemeFunctions.getColor(appColor)},
                ]}
                adjustsFontSizeToFit={true}
                numberOfLines={2}>
                <TouchableOpacity
                  onPress={() =>
                    openLink(detail?.tokenomics.project_links[0].url)
                  }>
                  <Text
                    style={{color: 'blue', textDecorationLine: 'underline'}}>
                    {/* {detail?.tokenomics.project_links[0].url} */}
                    Click Here
                  </Text>
                </TouchableOpacity>
              </ThemeText>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const HistoryList = (
    <FlatList
      data={historyFilter}
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

  const WhitePaper = (
    <ScrollView>
      <View style={[styles.textContainer]}>
        <View
          style={[
            historyStyles.historyCard,
            ThemeFunctions.getListColor(appColor, appTheme),
          ]}>
          <View
            style={[
              reverseDirection(),
              {
                backgroundColor: '#85556d',
                borderTopRightRadius: 8,
                borderTopLeftRadius: 8,
              },
            ]}>
            <View style={leftAlignView()}>
              <ThemeText
                style={[historyStyles.leftLabel, {color: 'white'}]}
                adjustsFontSizeToFit={true}
                numberOfLines={2}>
                {strings('White Paper Information')}
              </ThemeText>
            </View>
          </View>
          <View style={[reverseDirection(), historyStyles.noBorder]}>
            <View style={leftAlignView()}>
              <ThemeText
                style={[historyStyles.leftLabel, leftTextColor()]}
                adjustsFontSizeToFit={true}
                numberOfLines={2}>
                {strings('Link')}
              </ThemeText>
            </View>
            <View style={rightAlignView()}>
              <ThemeText
                style={[historyStyles.rightLabel, leftTextColor()]}
                adjustsFontSizeToFit={true}
                numberOfLines={2}>
                <TouchableOpacity onPress={() => openLink(detail?.whitepaper)}>
                  <Text
                    style={{color: 'blue', textDecorationLine: 'underline'}}>
                    Click Here
                  </Text>
                </TouchableOpacity>
              </ThemeText>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={commonStyles.safeView}>
      <Header
        title={detail?.title}
        isNormalText={true}
        textTransform="uppercase"
        right={<Right />}
        rightComponentWidth={75}
        handleBack={handleBack}
      />

      {/* <View style={{height: HEIGHT}}> */}
      <IEODetialCarousel detail={detail} />

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
        renderTabBar={props => (
          <TabBar
            bounces={true}
            scrollEnabled={true}
            tabStyle={{width: WIDTH / 3}}
            indicatorStyle={{
              backgroundColor: ThemeFunctions.getColor(appColor),
            }}
            onTabLongPress={({route: {key}}) => {
              props.jumpTo(key);
            }}
            {...props}
            style={[ThemeFunctions.setBackground(appTheme)]}
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
      {/* </View> */}

      <View style={commonStyles.paddingHorizontalView}>
        <ThemeButton
          text="buy"
          disabled={detail?.tokenRaise.paused ? true : false}
          disabledColor={detail?.tokenRaise.paused && '#ffa1c8'}
          onClickHandler={handleSubmit(onSubmit)}
          loading={appData.loading === Loader.LAUNCH_PAD_BUY ? true : false}
        />
      </View>
    </SafeAreaView>
  );
};

export default IEOinfoDetail;
