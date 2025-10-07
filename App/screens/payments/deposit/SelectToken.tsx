import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Platform,
  Image,
} from 'react-native';
import {
  ImageContainer,
  CustomModal,
  ModalSearch,
  ThemeText,
} from '../../../components';

import {strings} from '../../../strings';
import {SCREEN_HEIGHT, ThemeFunctions} from '../../../utils';
import {Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';
import Colors, {rapunzelTheme} from '../../../theme/Colors';
import {modalStyles as styles} from '../../gbex/styles';
import {commonStyles, rtlStyles} from '../../../globalstyles/styles';
import * as Images from '../../../assets';
import {MapperConstants, AppConstants} from '../../../constants';
import {AppFunctions} from '../../../utils';
import {isIOS} from '../../../utils/DeviceConfig';
import {Switch} from 'react-native-paper';

import {getImageFromURL} from '../../../utils/AppFunctions';
import {DEFAULT_COIN_LOGO} from '../../../store/action/quickbuy/QuickBuyAction';

const SelectToken = ({
  isVisible,
  setIsVisible,
  currency,
  updateToken,
  scrollingIndex,
  setScrollingIndex,
  isSmallBalanceHidden,
  isGbex = true,
  isFull = false,
  ...props
}: any) => {
  const {appTheme, isRtlApproach, appColor} = useSelector(
    (state: any) => state.globalReducer,
  );
  const testRef = useRef(null);
  const quickBuyData = useSelector((state: any) => state.quickBuyReducer);
  const [tokens, setTokens] = useState([]);
  const [searchQuery, setSearchQuery] = useState<any>('');
  const [showAvailable, setShowAvailable] = useState(true);

  useEffect(() => {
    onSearchCancel();
  }, [isVisible]);

  useEffect(() => {
    updateList();
  }, [quickBuyData?.fundsList?.length]);

  const updateList = () => {
    if (quickBuyData?.fundsList?.length > 0) {
      const filteredData = quickBuyData?.fundsList?.filter(e => {
        return isFull
          ? isSmallBalanceHidden
            ? e.available > 0
            : e
          : e.type !== 'crypto';
      });
      filteredData ? setTokens(filteredData) : setTokens([]);
    }
  };

  const filteredTokens = tokens;
  const searchText = e => {
    let text = e.toLowerCase().trim();
    setSearchQuery(e);
    if (quickBuyData?.fundsList?.length > 0) {
      let currencyList = quickBuyData?.fundsList.filter(e => {
        return isFull
          ? isSmallBalanceHidden
            ? e.available > 0
            : e
          : e.type !== 'crypto';
      });
      let filteredData = currencyList.filter(item => {
        return item.symbol.toLowerCase().includes(text);
      });
      if (filteredData && Array.isArray(filteredData)) {
        setTokens(filteredData);
      } else {
        updateList();
      }
    }
  };

  const onSearchCancel = () => {
    setSearchQuery('');
    updateList();
  };

  const getAvailableBalance = (trade: any) => {
    let currencyDecimal =
      trade.decimals || AppConstants.CurrencyDecimal[trade.symbol];
    const _total = trade?.available ? trade.available * 1 : 0;
    return AppFunctions.standardDigitConversion(
      parseFloat(_total.toFixed(currencyDecimal)),
    );
  };

  let switchStyle: any = {
    transform: [{scaleX: 0.6}, {scaleY: 0.6}],
    marginTop: -5,
  };

  if (Platform.OS === 'android') {
    switchStyle = {};
  }

  useEffect(() => {
    if (isVisible && filteredTokens.length > 0 && testRef.current) {
      let scrollIndex = scrollingIndex;
      filteredTokens.map((res, index) => {
        if (res.symbol === currency) {
          scrollIndex = index;
        }
      });
      testRef.current.scrollToIndex({
        index: scrollIndex,
        animated: false,
        viewOffset: 0,
      });
    }
  }, [isVisible]);

  const handleError = index => {
    let existingData = [...filteredTokens];
    existingData[index].isImageNotFound = true;
    setTokens(existingData);
  };
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

  const _getImageCurrency = currencyName => {
    return getImageFromURL(currencyName) || DEFAULT_COIN_LOGO;
  };

  return (
    <CustomModal
      visibility={isVisible}
      style={[
        isKeyboardVisible && isIOS()
          ? [styles.modals, {bottom: keyboardHeight - 10}]
          : styles.modals,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      <View>
        <View
          style={[styles.header, isRtlApproach ? rtlStyles.reverseRow : {}]}>
          <View style={{width: 10}} />
          <ThemeText
            style={[
              styles.headerText,
              {color: ThemeFunctions.customText(appTheme)},
            ]}
            adjustsFontSizeToFit={true}>
            {strings('select_currency')}
          </ThemeText>
          <TouchableOpacity
            onPress={() => setIsVisible(MapperConstants.StatusMapper.disable)}
            style={[
              commonStyles.backBtn,
              ThemeFunctions.setBackground(appTheme),
              {marginRight: 8},
            ]}>
            <Icon
              name="close"
              iconStyle={{transform: [{scaleX: isRtlApproach ? -1 : 1}]}}
              type="material"
              size={25}
              color={
                ThemeFunctions.isRapunzelTheme(appTheme)
                  ? rapunzelTheme.magenta
                  : Colors.gray
              }
            />
          </TouchableOpacity>
        </View>
        <ModalSearch
          placeholder={`${strings('search')}...`}
          onChangeText={searchText}
          searchQuery={searchQuery}
          onCancel={onSearchCancel}
        />
        {/* <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingTop: 5,
          }}>
          <ThemeText>{strings('available')}</ThemeText>

          <Switch
            style={switchStyle}
            value={showAvailable}
            onValueChange={setShowAvailable}
            color={ThemeFunctions.toggleBg(appColor)}
          />
        </View> */}
        <FlatList
          data={filteredTokens}
          ref={testRef}
          keyboardShouldPersistTaps={'handled'}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          contentContainerStyle={[
            commonStyles.paddingHorizontalView,
            {paddingBottom: SCREEN_HEIGHT * 0.2},
          ]}
          getItemLayout={(data, index) => ({
            length: 56,
            offset: 56 * index,
            index,
          })}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                onPress={updateToken(item, index, getAvailableBalance(item))}
                style={
                  isRtlApproach
                    ? [rtlStyles.reverseRow, styles.rowItem]
                    : styles.rowItem
                }>
                <View style={[commonStyles.rowItem, {alignItems: 'center'}]}>
                  {!item?.assetUrl ? (
                    <Image
                      source={Images.FundingActive}
                      resizeMode="contain"
                      style={[styles.currencyIc]}
                    />
                  ) : (
                    <>
                      <Image
                        source={{uri: _getImageCurrency(item.symbol)}}
                        resizeMode="contain"
                        style={[styles.currencyIc]}
                        onError={error => handleError(index)}
                      />
                      {/* <View
                      style={[
                        item.isImageNotFound
                          ? {
                              ...ThemeFunctions.bgImgColor(appTheme),
                              position: 'absolute',
                            }
                          : {position: 'absolute'},
                        styles.currencyIc,
                      ]}
                    /> */}
                    </>
                  )}

                  <View>
                    <ThemeText style={[styles.curr]}>{item?.symbol}</ThemeText>
                  </View>
                </View>
                <View style={[commonStyles.rowItem, styles.alignCenter]}>
                  <ThemeText style={styles.balance}>
                    {getAvailableBalance(item)}
                  </ThemeText>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item?.id?.toString()}
        />
      </View>
    </CustomModal>
  );
};

export default SelectToken;
