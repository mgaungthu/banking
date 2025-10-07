import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Keyboard,
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
import {modalStyles as styles} from '../styles';
import {commonStyles, rtlStyles} from '../../../globalstyles/styles';
import * as Images from '../../../assets';
import {MapperConstants, AppConstants} from '../../../constants';
import * as Flags from '../../../assets/flags';
import {AppFunctions} from '../../../utils';
import {isIOS} from '../../../utils/DeviceConfig';
import {getImageFromCDN, getImageFromURL} from '../../../utils/AppFunctions';
import {DEFAULT_COIN_LOGO} from '../../../store/action/quickbuy/QuickBuyAction';

const SelectToken = ({
  isVisible,
  setIsVisible,
  secondCurrency,
  setSecondCurrency,
  updateToken,
  scrollingIndex,
  setScrollingIndex,
  isGbex = true,
  ...props
}: any) => {
  const {appTheme, isRtlApproach} = useSelector(
    (state: any) => state.globalReducer,
  );
  const testRef = useRef(null);
  const quickBuyData = useSelector((state: any) => state.quickBuyReducer);
  const [tokens, setTokens] = useState([]);
  const [searchQuery, setSearchQuery] = useState<any>('');

  useEffect(() => {
    onSearchCancel();
  }, [isVisible]);

  useEffect(() => {
    updateList();
  }, [quickBuyData?.fundsList?.length]);
  const updateList = () => {
    if (quickBuyData?.fundsList?.length > 0) {
      const filteredData = isGbex
        ? quickBuyData?.fundsList?.filter(resp => resp.available > 0)
        : quickBuyData?.fundsList?.filter(resp => resp.available > 0);
      setTokens(filteredData?.sort());
    }
  };
  const searchText = e => {
    let text = e.toLowerCase().trim();
    setSearchQuery(e);
    if (quickBuyData?.fundsList?.length > 0) {
      let currencyList = isGbex
        ? quickBuyData?.fundsList
        : quickBuyData?.fundsList
            ?.filter(resp => resp.symbol !== 'GBEX')
            .sort();
      let filteredData = currencyList.filter(item => {
        return item.symbol.toLowerCase().match(text);
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
    let currencyDecimal = trade.decimals || 4;
    const _total = trade?.available ? trade.available * 1 : 0;
    return AppFunctions.standardDigitConversion(
      parseFloat(_total.toFixed(currencyDecimal)),
    );
  };

  useEffect(() => {
    if (isVisible && tokens.length > 0 && testRef.current) {
      let scrollIndex = scrollingIndex;
      tokens.map((res, index) => {
        if (res.symbol === secondCurrency) {
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
    let existingData = [...tokens];
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
        <View style={[styles.header]}>
          <View style={{width: 10}} />
          <ThemeText style={[styles.headerText]} adjustsFontSizeToFit={true}>
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
              size={22}
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
        <FlatList
          data={tokens}
          keyboardShouldPersistTaps={'handled'}
          ref={testRef}
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
          renderItem={({item, index}) => (
            <TouchableOpacity
              activeOpacity={1}
              onPress={updateToken(item, index)}
              style={
                isRtlApproach
                  ? [rtlStyles.reverseRow, styles.rowItem]
                  : styles.rowItem
              }>
              <View style={commonStyles.rowItem}>
                {/* <ImageContainer
                  imagePath={getTokenImg(item)}
                  imgStyle={[styles.currencyIc]}
                  noTransform={true}
                /> */}
                {!item?.assetUrl ? (
                  <View
                    style={[
                      {
                        ...ThemeFunctions.bgImgColor(appTheme),
                        borderRadius: 15,
                      },
                      styles.currencyIc,
                    ]}
                  />
                ) : (
                  <>
                    <Image
                      source={{uri: _getImageCurrency(item?.symbol)}}
                      resizeMode="contain"
                      style={[styles.currencyIc]}
                      onError={error => handleError(index)}
                    />
                    <View
                      style={[
                        item.isImageNotFound
                          ? {
                              ...ThemeFunctions.bgImgColor(appTheme),
                              position: 'absolute',
                            }
                          : {position: 'absolute'},
                        styles.currencyIc,
                      ]}
                    />
                  </>
                )}
                <View>
                  <ThemeText style={[styles.curr]}>{item?.symbol}</ThemeText>
                  <View style={[commonStyles.rowItem, styles.alignCenter]}>
                    <ImageContainer
                      imagePath={Images.WalletWhite}
                      imgStyle={[
                        styles.img,
                        {
                          tintColor:
                            ThemeFunctions.getCurrentTextColor(appTheme),
                        },
                      ]}
                    />
                    <ThemeText style={styles.balance}>
                      {getAvailableBalance(item)}
                    </ThemeText>
                  </View>
                </View>
              </View>
              {item.symbol === secondCurrency ? (
                <ImageContainer
                  imagePath={Images.IcVerified}
                  imgStyle={styles.check}
                  noTransform={true}
                />
              ) : (
                <View style={[styles.uncheck]} />
              )}
            </TouchableOpacity>
          )}
          keyExtractor={item => item?.id?.toString()}
        />
      </View>
    </CustomModal>
  );
};

export default SelectToken;
