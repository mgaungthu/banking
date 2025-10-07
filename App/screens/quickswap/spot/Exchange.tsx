import React, {useEffect, useRef, useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  TextInput,
  SafeAreaView,
  Platform,
  Keyboard,
  Image,
} from 'react-native';
import {
  CustomModal,
  LoadingSpinner,
  ModalSearch,
  ThemeButton,
  ThemeText,
  UiHeader,
} from '../../../components';
import {AppColor, Loader} from '../../../enums';
import {strings} from '../../../strings';
import {APIConstants, MapperConstants} from '../../../constants';
import {commonStyles} from '../../../globalstyles/styles';
import {quickSwapStyles} from '../styles';
import {useDispatch, useSelector} from 'react-redux';
import {ThemeFunctions} from '../../../utils';
import Colors, {darkTheme} from '../../../theme/Colors';
import {Icon} from 'react-native-elements';
import {
  IcQuickSwapDark,
  IcQuickSwapPink,
  IcQuickSwapGreen,
} from '../../../assets';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import {makeRequest, makeRequestNew} from '../../../services/ApiService';
import {AppActions, QuickBuyActions} from '../../../store';
import {
  DEFAULT_COIN_LOGO,
  fundsList,
  quickBuySuccess,
} from '../../../store/action/quickbuy/QuickBuyAction';
import {showToast} from '../../../utils/GenericUtils';
import {
  FormatNumber,
  getImageFromCDN,
  getImageFromURL,
  replaceCost,
  RoundUptoSignificant,
  toRealNumber,
} from '../../../utils/AppFunctions';
import {isIOS} from '../../../utils/DeviceConfig';

const MODAL_FIRST_CURRENCY = 1;
const MODAL_SECOND_CURRENCY = 2;
const listSegmentChoose = {
  0: '25%',
  1: '50%',
  2: '75%',
  3: '100%',
};

const Exchange = (props: any) => {
  const quickBuyData = useSelector((state: any) => state.quickBuyReducer);
  const {isBack} = props;
  const currencyQuickBuy = quickBuyData.fundsList;
  const appData = useSelector((state: any) => state.appReducer);
  // const {userProfileData} = appData;

  const pairDataWithId = useSelector(
    (state: any) => state.quickBuyReducer?.pairDataWithId,
  );

  const pairList = quickBuyData.pairs;

  const intervalGetPrice: any = useRef(null);
  const timeoutInput: any = useRef(null);

  const {appTheme, appColor, userdata, assetMetadata} = useSelector(
    (state: any) => state.globalReducer,
  );

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(MODAL_FIRST_CURRENCY);
  const [indexSegment, setIndexSegment] = useState(0);

  const [firstCurrency, setFirstCurrency] = useState(
    props?.firstCurrency || '',
  );
  const [secondCurrency, setSecondCurrency] = useState(
    props?.secondCurrency || '',
  );
  const [amountFirstCurrency, setAmountFirstCurrency] = useState(0.1);
  const [amountSecondCurrency, setAmountSecondCurrency] = useState(0.1);
  const [listFirstChoose, setListFirstChoose] = useState([]);
  const [listSecondChoose, setListSecondChoose] = useState([]);
  const [searchQuery, setSearchQuery] = useState<any>('');
  const [listSearch, setListSearch] = useState([]);
  const [listSearchQuery, setListSearchQuery] = useState([]);
  const dataStableCoin = useSelector(
    (state: any) => state.quickBuyReducer.stableCoins,
  );

  const dispatch = useDispatch<any>();

  this.changeCount = 0;

  // const _getPercent = () => {
  //   let percent = parseInt(listSegmentChoose[indexSegment]);
  //   // if (percent===100) {
  //   //   percent=99
  //   // }
  //   return percent;
  // };

  const _loadPrice = async () => {
    const list = pairList.find(item => item.symbol === firstCurrency);

    const res = list.pairs.find(item => item.pair === secondCurrency);

    if (res?.is_direct_transfer) {
      setAmountSecondCurrency(
        parseFloat((amountFirstCurrency * 1).toFixed(res.decimals)),
      );
    } else {
      if (res?.is_quote) {
        const rawAmount = amountFirstCurrency * res.bid;
        const commission = getRounded(rawAmount * 0.0025, res.decimals);
        const tax = getRounded(rawAmount * 0, 7);
        const totalCost = rawAmount - commission - tax;
        const decimal = parseFloat(totalCost.toFixed(res.decimals));
        setAmountSecondCurrency(decimal);
      } else {
        const initialBase = amountFirstCurrency / res.ask;

        const commission = initialBase * 0.0025;

        const tax = 0;

        const totalDeductions = commission + tax;

        let retVal = initialBase - totalDeductions;

        const decimal = parseFloat(retVal.toFixed(res.decimals));

        setAmountSecondCurrency(decimal || 0);
      }
    }
  };

  const getRounded = (value, decimals) => {
    // Check if value is a valid numeric value
    if (isNaN(parseFloat(value)) || !isFinite(value)) {
      return value;
    }

    if (!value) {
      value = 0;
    }

    if (!decimals) {
      decimals = 0;
    }

    // Set max 12 decimal size
    if (decimals > 12) {
      decimals = 12;
    }

    value = (
      Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
    ).toFixed(decimals);
    return value;
  };

  const _getPrices = () => {
    if (firstCurrency && secondCurrency) {
      try {
        clearInterval(intervalGetPrice.current);
        _loadPrice();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const _toggleModalFirstCurrency = () => {
    try {
      setShowModal(state => !state);
      setModalType(MODAL_FIRST_CURRENCY);
      let listChoose = pairList.map(item => item.symbol);
      setListFirstChoose(listChoose);
      setListSearch(listChoose);
      setSearchQuery('');
    } catch (error) {}
  };

  const _toggleModalSecondCurrency = () => {
    try {
      setShowModal(state => !state);
      setModalType(MODAL_SECOND_CURRENCY);

      const listChoose = pairList
        .filter(item => item.symbol === firstCurrency)
        .flatMap(item => item.pairs.map(pair => pair.pair));

      setListSecondChoose(listChoose);
      setListSearch(listChoose);
      setSearchQuery('');
    } catch (error) {}
  };

  const _setCurrency = (currencyName, isSecond = false) => {
    this.changeCount++;
    if (modalType == MODAL_FIRST_CURRENCY && !isSecond) {
      setFirstCurrency(currencyName);
      clearInterval(intervalGetPrice.current);
      setAmountSecondCurrency(0);
      setSecondCurrency('');
    } else {
      setSecondCurrency(currencyName);
      if (firstCurrency) _getPrices();
    }
    setShowModal(false);
  };

  const currentListQuickSwap = () => {
    if (searchQuery) {
      return listSearchQuery;
    } else {
      if (modalType === MODAL_SECOND_CURRENCY) {
        if (!firstCurrency) return [];
        return listSecondChoose;
      }
      return listFirstChoose;
    }
  };

  const _getImageCurrency = currencyName => {
    return getImageFromURL(currencyName) || DEFAULT_COIN_LOGO;
  };

  const _changeSegment = value => {
    if (firstCurrency) {
      const selectedSegmentIndex = value.nativeEvent?.selectedSegmentIndex;
      setIndexSegment(selectedSegmentIndex);
      let percent = parseInt(listSegmentChoose[selectedSegmentIndex]);
      // if (percent===100) percent=99
      const currentBalance = currencyQuickBuy.find(
        item => item.symbol == firstCurrency,
      )?.available;
      setAmountFirstCurrency(
        parseFloat(RoundUptoSignificant((currentBalance / 100) * percent)),
      );
    }
  };

  const currentBalance = currencyQuickBuy?.find(
    item => item.symbol == firstCurrency,
  )?.available;

  const _exchange = async () => {
    try {
      dispatch(AppActions.updateLoading(Loader.QUICK_BUY));
      dispatch(quickBuySuccess(null));
      console.log(amountFirstCurrency);
      const data = {
        payCurrency: firstCurrency,
        quantity: amountFirstCurrency,
        receiveCurrency: secondCurrency,
      };

      const response = await makeRequestNew(
        MapperConstants.ApiTypes.POST,
        APIConstants.SWAP_BUY,
        {},
        data,
      );
      dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));

      console.log(response.data);

      if (response.data === 'swap_processed') {
        dispatch(fundsList());
        dispatch(quickBuySuccess(response.data));
        const msg = strings('order_placed');
        showToast(strings('quick_buy'), msg, 'success');
      } else if (!response.data?.success) {
        if (response.data?.message === 'order_validation_failed') {
          if (response.data?.errors?.quantity?.[0]) {
            const message = response.data?.errors?.quantity?.[0];
            showToast(
              strings('quick_buy'),
              message.replace(/minimum trade quantity:\s*/, ''),
              'error',
            );
          } else {
            showToast(
              strings('quick_buy'),
              response.data?.errors?.market?.[0],
              'error',
            );
          }
        } else if (response.data?.message === 'no_pay_currency') {
          showToast(
            strings('quick_buy'),
            'Please select currency to swap',
            'error',
          );
        } else if (
          response.data?.error?.message === 'kyc_and_por_required_general'
        ) {
          showToast(strings('quick_buy'), strings('kyc_msg'), 'error');
        } else if (response.data?.error?.message === 'por_required') {
          showToast(
            strings('quick_buy'),
            strings('You need to be POR verified to do this action'),
            'error',
          );
        } else if (response.data?.message === 'validation_failed') {
          showToast(
            strings('quick_buy'),
            response.data?.errors?.payCurrency?.[0] ||
              response.data?.errors?.receiveCurrency?.[0] ||
              response.data?.errors?.quantity?.[0],
            'error',
          );
        } else {
          showToast(strings('quick_buy'), response.data?.message, 'error');
        }
      } else {
        dispatch(fundsList());
        dispatch(quickBuySuccess(response.data));
        const msg = strings('order_placed');
        showToast(strings('quick_buy'), msg, 'success');
      }
    } catch (error) {
      console.log(error);
      showToast('Trade', strings('error_boundary_msg'), 'error');
    }
  };

  const _changeAmount = valueChange => {
    setIndexSegment(5);
    setAmountFirstCurrency(valueChange);
  };

  const _reverseCurrency = () => {
    try {
      // this.changeCount++;

      setFirstCurrency(secondCurrency);
      setSecondCurrency(firstCurrency);
      setAmountFirstCurrency(0);
      setAmountSecondCurrency(0);
    } catch (error) {
      showToast(strings('quick_buy'), 'Not allowed', 'error');
    }
  };

  const _getImageExchange = () => {
    switch (appColor) {
      case AppColor.black:
        return IcQuickSwapDark;
      case AppColor.pink:
        return IcQuickSwapPink;
    }
    return IcQuickSwapGreen;
  };

  const onSearchCancel = () => {
    setSearchQuery('');
    // updateList()
  };

  const onSearch = e => {
    setSearchQuery(e);
    let text = e.toLowerCase().trim();
    setListSearchQuery(
      listSearch.filter(item => item?.toLowerCase()?.includes(text)),
    );
  };

  useEffect(() => {
    clearTimeout(timeoutInput.current);
    dispatch(QuickBuyActions.fundsList());
    dispatch(QuickBuyActions.getPairs());
    timeoutInput.current = setTimeout(() => {
      _getPrices();
    }, 200);
  }, [amountFirstCurrency, firstCurrency, secondCurrency]);

  useEffect(() => {
    _getPrices();
    return () => {
      clearInterval(intervalGetPrice.current);
      clearTimeout(timeoutInput.current);
    };
  }, [firstCurrency, secondCurrency, indexSegment]);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        setKeyboardHeight(e.endCoordinates.height);
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  let transactionCost = (
    <Text
      style={[
        quickSwapStyles.feeText,
        ,
        {color: ThemeFunctions.customText(appTheme)},
      ]}>
      Transaction cost: 0
    </Text>
  );

  return (
    <View
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(appTheme),
        !isBack && {paddingBottom: 80},
      ]}>
      {/* {appData.loading === Loader.QUICK_SWAP ? (
        <View style={quickSwapStyles.container}>
          <LoadingSpinner color={Colors.white} size="small" />
        </View>
      ) : (
         */}

      <ScrollView style={quickSwapStyles.container}>
        {firstCurrency ? (
          <Text
            style={[
              quickSwapStyles.textHint,
              {color: ThemeFunctions.customText(appTheme)},
            ]}>
            {strings('i_have')} {currentBalance} {firstCurrency}
          </Text>
        ) : null}
        <View
          style={[
            quickSwapStyles.buttonSwap,
            {
              backgroundColor: ThemeFunctions.isDarkTheme(appTheme)
                ? '#1C1A26'
                : '#F5F5F5',
            },
          ]}>
          <TouchableOpacity
            style={[
              quickSwapStyles.buttonChange,
              ThemeFunctions.setBackground(appTheme),
            ]}
            onPress={_toggleModalFirstCurrency}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {firstCurrency ? (
                <Image
                  source={{
                    uri: _getImageCurrency(firstCurrency),
                  }}
                  style={quickSwapStyles.imageCurrency}
                  resizeMode="contain"
                />
              ) : null}
              <Text
                style={[
                  quickSwapStyles.textCurrencyName,
                  {color: ThemeFunctions.customText(appTheme)},
                ]}>
                {firstCurrency || 'FROM'}
              </Text>
            </View>
            <Icon
              name="chevron-down"
              type="entypo"
              size={20}
              color={ThemeFunctions.getCurrentTextColor(appTheme)}
            />
          </TouchableOpacity>
          <View style={quickSwapStyles.viewBalance}>
            <TextInput
              value={`${toRealNumber(amountFirstCurrency) || ''}`}
              placeholder={strings('enter_amount')}
              style={[
                quickSwapStyles.inputAmount,
                quickSwapStyles.textCurrency,
                ThemeFunctions.getTextColor(appTheme),
              ]}
              onChangeText={_changeAmount}
              placeholderTextColor={'#808080'}
              editable={firstCurrency ? true : false}
              keyboardType="decimal-pad"></TextInput>
          </View>
        </View>

        <SegmentedControl
          values={Object.values(listSegmentChoose)}
          selectedIndex={indexSegment}
          style={quickSwapStyles.segmentControl}
          onChange={_changeSegment}
          backgroundColor={
            ThemeFunctions.isDarkTheme(appTheme)
              ? darkTheme.secondaryColor
              : '#F5F5F5'
          }
          tintColor={ThemeFunctions.getColor(appColor)}
          appearance="light"
          fontStyle={{color: ThemeFunctions.getCurrentTextColor(appTheme)}}
          activeFontStyle={{color: '#fff'}}
          enabled={
            Platform.OS === 'ios' ? (firstCurrency ? true : false) : true
          }
        />

        <TouchableOpacity style={{zIndex: 1}} onPress={_reverseCurrency}>
          <View
            style={[
              quickSwapStyles.hr,
              {backgroundColor: ThemeFunctions.getColor(appColor)},
            ]}>
            <Image
              source={_getImageExchange()}
              style={[
                quickSwapStyles.icQuickSwap,
                ThemeFunctions.setBackground(appTheme),
              ]}
            />
          </View>
        </TouchableOpacity>
        <Text
          style={[
            quickSwapStyles.textHint,
            {color: ThemeFunctions.customText(appTheme)},
          ]}>
          {strings('I want to get')}
        </Text>
        <TouchableOpacity
          style={[
            quickSwapStyles.buttonSwap,
            {
              backgroundColor: ThemeFunctions.isDarkTheme(appTheme)
                ? '#1C1A26'
                : '#F5F5F5',
            },
          ]}
          onPress={_toggleModalSecondCurrency}>
          <View
            style={[
              quickSwapStyles.buttonChange,
              ThemeFunctions.setBackground(appTheme),
            ]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {secondCurrency ? (
                <Image
                  source={{uri: _getImageCurrency(secondCurrency)}}
                  style={quickSwapStyles.imageCurrency}
                  resizeMode="contain"
                />
              ) : null}
              <Text
                style={[
                  quickSwapStyles.textCurrencyName,
                  {color: ThemeFunctions.customText(appTheme)},
                ]}>
                {secondCurrency || 'TO'}
              </Text>
            </View>
            <Icon
              name="chevron-down"
              type="entypo"
              size={20}
              color={ThemeFunctions.getCurrentTextColor(appTheme)}
            />
          </View>
          <View style={quickSwapStyles.viewBalance}>
            <Text
              style={[
                quickSwapStyles.textCurrency,
                ThemeFunctions.getTextColor(appTheme),
              ]}
              numberOfLines={1}
              adjustsFontSizeToFit={true}>
              {/* {FormatNumber(amountSecondCurrency)} */}
              {amountSecondCurrency}
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <View style={commonStyles.paddingHorizontalView}>
        {!showModal ? (
          <>
            {/* {transactionCost} */}
            <ThemeButton
              text={strings('exchange_now')}
              loading={appData.loading === Loader.QUICK_BUY ? true : false}
              onClickHandler={_exchange}
            />
          </>
        ) : null}
      </View>
      <CustomModal
        visibility={showModal}
        onBackdropPress={_toggleModalFirstCurrency}
        justify={true}
        disableCoverScreen
        style={[
          isIOS()
            ? [quickSwapStyles.modal, {bottom: keyboardHeight - 10}]
            : quickSwapStyles.modal,
          ,
          ThemeFunctions.setBackground(appTheme),
        ]}>
        <SafeAreaView style={quickSwapStyles.modalContainer}>
          <View style={{marginRight: 20}}>
            <UiHeader
              title={
                modalType == MODAL_FIRST_CURRENCY
                  ? 'Choose your first currency'
                  : 'Choose your second currency'
              }
              iconColor={ThemeFunctions.getCurrentTextColor(appTheme)}
              showBack={false}
              handleBack={_toggleModalSecondCurrency}
              titleStyle={{
                left: 20,
                color: ThemeFunctions.customText(appTheme),
                fontSize: 20,
              }}
            />
          </View>
          <ModalSearch
            placeholder={`${strings('search')}...`}
            onChangeText={onSearch}
            searchQuery={searchQuery}
            onCancel={onSearchCancel}
          />
          <ScrollView keyboardShouldPersistTaps={'handled'}>
            {currentListQuickSwap().map((item, key) => {
              return (
                <TouchableOpacity
                  style={quickSwapStyles.currencyChoose}
                  key={key}
                  onPress={() => _setCurrency(item)}>
                  <Image
                    resizeMode="contain"
                    source={{
                      uri: _getImageCurrency(item) || DEFAULT_COIN_LOGO,
                    }}
                    style={quickSwapStyles.imageCurrency}
                  />
                  <ThemeText style={quickSwapStyles.currencyChooseText}>
                    {item}
                  </ThemeText>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </SafeAreaView>
      </CustomModal>
    </View>
  );
};

export default Exchange;
