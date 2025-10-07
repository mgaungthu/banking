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

const SelectBeneficiary = ({
  isVisible,
  setIsVisible,
  selectedBeneficiary,
  scrollingIndex,
  setScrollingIndex,
  handleBeneficiary,
  currencySymbol = null,
  ...props
}: any) => {
  const {appTheme, isRtlApproach} = useSelector(
    (state: any) => state.globalReducer,
  );
  const {beneficiaryList} = useSelector((state: any) => state.paymentReducer);
  const testRef = useRef(null);
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    if (beneficiaryList?.length > 0) {
      if (currencySymbol) {
        const filterwithCurrency = beneficiaryList.filter(
          item => item?.currency_symbol === currencySymbol,
        );
        setTokens(filterwithCurrency);
      }
      // else {
      //   const filteredData = beneficiaryList.sort((a, b) =>
      //     a.name.localeCompare(b.name),
      //   );
      //   filteredData ? setTokens(filteredData) : setTokens([]);
      // }
    }

    // currency_symbol
  }, [beneficiaryList?.length, currencySymbol]);

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
          <Text
            style={[
              styles.headerText,
              {color: ThemeFunctions.customText(appTheme)},
            ]}
            adjustsFontSizeToFit={true}>
            {strings('select_beneficiary')}
          </Text>
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
        {beneficiaryList?.length === 0 ? (
          <Text
            style={[
              {
                ...withdrawalStyles.placeHolderText,
                color: ThemeFunctions.customText(appTheme),
              },
            ]}
            numberOfLines={2}>
            {strings('no_benficiary')}
          </Text>
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
                onPress={handleBeneficiary(item, index)}
                style={
                  isRtlApproach
                    ? [rtlStyles.reverseRow, styles.rowItem]
                    : styles.rowItem
                }>
                <View style={commonStyles.rowItem}>
                  <View>
                    <ThemeText style={[styles.listItem]}>
                      {item?.name} - {item?.bank_name} - {item?.iban}
                    </ThemeText>
                  </View>
                </View>
                {item.id === selectedBeneficiary ? (
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

export default SelectBeneficiary;
