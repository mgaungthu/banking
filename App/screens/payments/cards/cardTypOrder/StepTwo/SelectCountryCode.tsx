import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {
  ImageContainer,
  CustomModal,
  ThemeText,
  ModalSearch,
} from '../../../../../components';
import {strings} from '../../../../../strings';
import {SCREEN_HEIGHT, ThemeFunctions} from '../../../../../utils';
import {Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';
import Colors, {rapunzelTheme} from '../../../../../theme/Colors';
import {modalStyles as styles} from '../../../../gbex/styles';
import {commonStyles, rtlStyles} from '../../../../../globalstyles/styles';
import * as Images from '../../../../../assets';
import {MapperConstants, AppConstants} from '../../../../../constants';

const SelectCountryCode = ({
  isVisible,
  setIsVisible,
  handleCountryCode,
  selectedCountryCode,
  covertEmoji,
  ...props
}: any) => {
  const [searchQuery, setSearchQuery] = useState<any>('');
  const [tokens, setTokens] = useState([]);
  const scrollRef = useRef(null);

  const {appTheme, isRtlApproach} = useSelector(
    (state: any) => state.globalReducer,
  );

  const {countries} = useSelector((state: any) => state.appReducer);

  useEffect(() => {
    onSearchCancel();
  }, [isVisible]);

  useEffect(() => {
    updateList();
  }, [countries.countries]);

  useEffect(() => {
    if (isVisible && tokens.length > 0 && scrollRef.current) {
      let scrollIndex = 0;
      tokens.map((res, index) => {
        if (res.value === selectedCountryCode) {
          scrollIndex = index;
        }
      });

      console.log(scrollIndex);
      scrollRef.current.scrollToIndex({
        index: scrollIndex,
        animated: false,
        viewOffset: 0,
      });
    }
  }, [isVisible]);

  const getCountryList = () => {
    const countryCodes = Object.values(countries.countries).map(country => ({
      label: `+${country.calling_code} (${country.name})`,
      value: `+${country.calling_code}`,
      name: country.name,
      emoji: country.emoji,
    }));
    const filteredData = countryCodes.filter(item => item.value !== '+false');
    return filteredData;
  };

  const updateList = () => {
    const countryCodes = getCountryList();
    if (countryCodes?.length > 0) {
      setTokens(countryCodes);
    }
  };

  const searchText = e => {
    let text = e.toLowerCase().trim();
    setSearchQuery(e);
    const countryCodes = getCountryList();
    if (countryCodes?.length > 0) {
      let filteredData = countryCodes.filter(item => {
        return item.name.toLowerCase().includes(text);
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

  return (
    <CustomModal
      visibility={isVisible}
      style={[styles.modals, ThemeFunctions.setBackground(appTheme)]}>
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
            {strings('Select Country Code')}
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
          initialNumToRender={10}
          ref={scrollRef}
          maxToRenderPerBatch={10}
          contentContainerStyle={[
            commonStyles.paddingHorizontalView,
            {paddingBottom: SCREEN_HEIGHT * 0.2},
          ]}
          getItemLayout={(data, index) => ({
            length: 44,
            offset: 44 * index,
            index,
          })}
          renderItem={({item, index}) => (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => handleCountryCode(item)}
              style={
                isRtlApproach
                  ? [rtlStyles.reverseRow, styles.rowItem]
                  : styles.rowItem
              }>
              <View style={commonStyles.rowItem}>
                <View>
                  <ThemeText style={[styles.listItem]}>
                    {covertEmoji(item.emoji)} {item.label}
                  </ThemeText>
                </View>
              </View>
              {item.value === selectedCountryCode ? (
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
          keyExtractor={item => item?.label?.toString()}
        />
      </View>
    </CustomModal>
  );
};

export default SelectCountryCode;
