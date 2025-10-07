import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Platform,
} from 'react-native';
import {
  ImageContainer,
  CustomModal,
  ModalSearch,
  ThemeText,
} from '../../../../components';

import {strings} from '../../../../strings';
import {SCREEN_HEIGHT, ThemeFunctions} from '../../../../utils';
import {Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';
import Colors, {rapunzelTheme} from '../../../../theme/Colors';
import {modalStyles as styles} from '../../../gbex/styles';
import {commonStyles, rtlStyles} from '../../../../globalstyles/styles';
import * as Images from '../../../../assets';
import {MapperConstants, AppConstants} from '../../../../constants';
import {AppFunctions} from '../../../../utils';
import {isIOS} from '../../../../utils/DeviceConfig';
import {Switch} from 'react-native-paper';

import Image from 'react-native-fast-image';

const SelectFrom = ({
  isVisible,
  setIsVisible,
  currency,
  updateFrom,
  scrollingIndex,
  setScrollingIndex,
  isGbex = true,
  isFull = false,
  ...props
}: any) => {
  const {appTheme, isRtlApproach, appColor} = useSelector(
    (state: any) => state.globalReducer,
  );
  const testRef = useRef(null);
  const quickBuyData = useSelector((state: any) => state.quickBuyReducer);
  const {IbansActive} = useSelector((state: any) => state.paymentReducer);
  const [tokens, setTokens] = useState([]);
  const [searchQuery, setSearchQuery] = useState<any>('');
  const [showAvailable, setShowAvailable] = useState(true);

  useEffect(() => {
    onSearchCancel();
  }, [isVisible]);

  useEffect(() => {
    updateList();
  }, [IbansActive?.length]);

  const updateList = () => {
    if (IbansActive?.length > 0) {
      const filteredData = IbansActive?.filter(e => {
        return e;
      });
      filteredData ? setTokens(filteredData) : setTokens([]);
    }
  };

  const filteredTokens = tokens.filter(x => {
    return x;
  });

  const searchText = e => {
    let text = e.toLowerCase().trim();
    setSearchQuery(e);
    if (IbansActive?.length > 0) {
      let currencyList = IbansActive.filter(e => {
        return e;
      });
      let filteredData = currencyList.filter(item => {
        return item.iban.toLowerCase().includes(text);
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

  // const getAvailableBalance = (trade: any) => {
  //   let currencyDecimal = AppConstants.CurrencyDecimal[trade.symbol] || 4;
  //   const _total = trade?.available ? trade.available * 1 : 0;
  //   return AppFunctions.standardDigitConversion(
  //     parseFloat(_total.toFixed(currencyDecimal)),
  //   );
  // };

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
            {strings('Select From')}
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
                onPress={updateFrom(item, index)}
                style={
                  isRtlApproach
                    ? [rtlStyles.reverseRow, styles.rowItem]
                    : styles.rowItem
                }>
                <View style={[commonStyles.rowItem, {alignItems: 'center'}]}>
                  <View>
                    <ThemeText style={[styles.curr]}>
                      {item?.iban} - {item?.iban_type?.fiat_currency?.symbol}
                    </ThemeText>
                  </View>
                </View>
                <View style={[commonStyles.rowItem, styles.alignCenter]}>
                  <ThemeText style={styles.balance}>
                    {item?.available_balance}
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

export default SelectFrom;
