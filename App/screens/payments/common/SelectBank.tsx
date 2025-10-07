import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {ImageContainer, CustomModal, ThemeText} from '../../../components';

import {strings} from '../../../strings';
import {SCREEN_HEIGHT, ThemeFunctions} from '../../../utils';
import {Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';
import Colors, {rapunzelTheme} from '../../../theme/Colors';
import {modalStyles as styles} from '../../gbex/styles';
import {commonStyles, rtlStyles} from '../../../globalstyles/styles';
import * as Images from '../../../assets';
import {MapperConstants} from '../../../constants';
import {withdrawalStyles} from '../styles';

const SelectBank = ({
  isVisible,
  setIsVisible,
  selectedBank,
  scrollingIndex,
  setScrollingIndex,
  handleBank,
  processingBanks,
  ...props
}: any) => {
  const {appTheme, isRtlApproach} = useSelector(
    (state: any) => state.globalReducer,
  );
  const testRef = useRef(null);
  const [tokens, setTokens] = useState([]);
  useEffect(() => {
    if (processingBanks?.length > 0) {
      const filteredData = processingBanks?.sort();
      filteredData ? setTokens(filteredData) : setTokens([]);
    }
  }, [processingBanks]);

  useEffect(() => {
    if (isVisible && tokens.length > 0 && testRef.current) {
      testRef.current.scrollToIndex({
        index: scrollingIndex,
        animated: false,
        viewOffset: 0,
      });
    }
  }, [isVisible]);

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
            {strings('select_bank')}
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
        {processingBanks?.length === 0 ? (
          <ThemeText
            style={{
              ...withdrawalStyles.placeHolderText,
              color: ThemeFunctions.customText(appTheme),
            }}
            numberOfLines={2}>
            {strings('no_banks')}
          </ThemeText>
        ) : (
          <FlatList
            data={tokens}
            ref={testRef}
            initialNumToRender={10}
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
                onPress={handleBank(item, index)}
                style={
                  isRtlApproach
                    ? [rtlStyles.reverseRow, styles.rowItem]
                    : styles.rowItem
                }>
                <View style={commonStyles.rowItem}>
                  <View>
                    <ThemeText style={[styles.listItem]}>
                      {item?.name}
                    </ThemeText>
                  </View>
                </View>
                {item.id === selectedBank ? (
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
        )}
      </View>
    </CustomModal>
  );
};

export default SelectBank;
