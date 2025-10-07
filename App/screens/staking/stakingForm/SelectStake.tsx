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
import {MapperConstants, AppConstants} from '../../../constants';
import {AppFunctions} from '../../../utils';
import {isIOS} from '../../../utils/DeviceConfig';
import {Switch} from 'react-native-paper';
import {getImageFromURL} from '../../../utils/AppFunctions';
import {DEFAULT_COIN_LOGO} from '../../../store/action/quickbuy/QuickBuyAction';

const SelectStake = ({
  isVisible,
  setIsVisible,
  currency,
  updateToken,
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
  const {stake} = useSelector((state: any) => state.stakingReducer);
  const [tokens, setTokens] = useState([]);
  const [searchQuery, setSearchQuery] = useState<any>('');
  const [showAvailable, setShowAvailable] = useState(true);

  useEffect(() => {
    onSearchCancel();
  }, [isVisible]);

  useEffect(() => {
    updateList();
  }, [stake.length]);

  const updateList = () => {
    if (stake.length > 0) {
      setTokens(stake);
    }
  };

  const searchText = e => {
    let text = e.toLowerCase().trim();
    setSearchQuery(e);
    if (stake.length > 0) {
      let filteredData = stake.filter(item => {
        return item.currency.symbol.toLowerCase().includes(text);
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
    let currencyDecimal = AppConstants.CurrencyDecimal[trade.symbol] || 4;
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
    if (isVisible && stake.length > 0 && testRef.current) {
      let scrollIndex = scrollingIndex;
      stake.map((res, index) => {
        if (res.symbol === currency) {
          scrollIndex = index;
        }
      });
      testRef.current.scrollToIndex({
        index: scrollIndex,
        animated: false,
        viewOffset: -5,
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

  const getImageUrl = (resp: any) => {
    return getImageFromURL(resp) || DEFAULT_COIN_LOGO;
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
            {strings('Select Stake')}
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
          data={tokens}
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
                onPress={updateToken(item, index)}
                style={
                  isRtlApproach
                    ? [rtlStyles.reverseRow, styles.rowItem]
                    : styles.rowItem
                }>
                <View style={[commonStyles.rowItem, {alignItems: 'center'}]}>
                  <Image
                    source={{uri: getImageUrl(item.currency.symbol)}}
                    resizeMode="contain"
                    style={[styles.currencyIc]}
                  />

                  <View>
                    <ThemeText style={[styles.curr]}>
                      {item?.currency.symbol}
                    </ThemeText>
                  </View>
                </View>
                <View style={[commonStyles.rowItem, styles.alignCenter]}>
                  <ThemeText style={styles.balance}>
                    {strings(item.term)}: {item.rate}%
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

export default SelectStake;
