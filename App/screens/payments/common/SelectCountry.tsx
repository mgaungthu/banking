import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, Keyboard} from 'react-native';
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
import {MapperConstants} from '../../../constants';
import {isIOS} from '../../../utils/DeviceConfig';

const SelectCountry = ({
  isVisible,
  setIsVisible,
  selectedCountry,
  scrollingIndex,
  setScrollingIndex,
  handleCountry,
  ...props
}: any) => {
  const {appTheme, isRtlApproach} = useSelector(
    (state: any) => state.globalReducer,
  );
  const {countries} = useSelector((state: any) => state.appReducer);
  const testRef = useRef(null);
  const [tokens, setTokens] = useState([]);
  const [searchQuery, setSearchQuery] = useState<any>('');

  useEffect(() => {
    onSearchCancel();
  }, [isVisible]);

  useEffect(() => {
    updateCountry();
    // console.log('heello', Object.values(countries?.countries).length);
  }, [Object.values(countries?.countries).length]);

  const updateCountry = () => {
    if (Object.values(countries.countries)?.length > 0) {
      const filteredData = Object.values(countries?.countries)?.sort((a, b) =>
        a.name.localeCompare(b.name),
      );
      filteredData ? setTokens(filteredData) : setTokens([]);
    }
  };

  useEffect(() => {
    if (isVisible && tokens.length > 0 && testRef.current) {
      let scrollIndex = scrollingIndex;
      tokens.map((res, index) => {
        if (res.name === selectedCountry) {
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
  const searchText = e => {
    let text = e.toLowerCase().trim();
    setSearchQuery(e);
    if (Object.values(countries.countries)?.length > 0) {
      let countryList = Object.values(countries.countries).sort((a, b) =>
        a.name.localeCompare(b.name),
      );
      let filteredData = countryList.filter(item => {
        return item.name.toLowerCase().match(text);
      });
      if (filteredData && Array.isArray(filteredData)) {
        setTokens(filteredData);
      } else {
        updateCountry();
      }
    }
  };

  const onSearchCancel = () => {
    setSearchQuery('');
    updateCountry();
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
            {strings('select_country')}
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
          ref={testRef}
          initialNumToRender={10}
          keyboardShouldPersistTaps={'handled'}
          contentContainerStyle={[
            commonStyles.paddingHorizontalView,
            {paddingBottom: SCREEN_HEIGHT * 0.2},
          ]}
          getItemLayout={(data, index) => ({
            length: 42,
            offset: 42 * index,
            index,
          })}
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={index}
              activeOpacity={1}
              onPress={handleCountry(item, index)}
              style={
                isRtlApproach
                  ? [rtlStyles.reverseRow, styles.rowItem]
                  : styles.rowItem
              }>
              <View style={commonStyles.rowItem}>
                <View>
                  <ThemeText
                    style={[styles.listItem]}
                    adjustsFontSizeToFit={true}>
                    {item?.name}
                  </ThemeText>
                </View>
              </View>
              {item.name === selectedCountry ? (
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
          keyExtractor={item => item?.name}
        />
      </View>
    </CustomModal>
  );
};

export default SelectCountry;
