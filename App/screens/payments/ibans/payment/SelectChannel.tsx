import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {ImageContainer, CustomModal, ThemeText} from '../../../../components';
import {strings} from '../../../../strings';
import {SCREEN_HEIGHT, ThemeFunctions} from '../../../../utils';
import {Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';
import Colors, {rapunzelTheme} from '../../../../theme/Colors';
import {modalStyles as styles} from '../../../gbex/styles';
import {commonStyles, rtlStyles} from '../../../../globalstyles/styles';
import * as Images from '../../../../assets';
import {MapperConstants, AppConstants} from '../../../../constants';

const SelectChannel = ({
  isVisible,
  setIsVisible,
  selectedChannel,
  handleChannel,
  currencySymbol,
  ...props
}: any) => {
  const {appTheme, isRtlApproach} = useSelector(
    (state: any) => state.globalReducer,
  );

  const {IbansActive} = useSelector((state: any) => state.paymentReducer);

  const filterData = IbansActive.filter(
    item => item.iban_type.fiat_currency.symbol === currencySymbol,
  );

  const formatFees = data => {
    if (!data || data.length === 0) return [];

    const entry = data[0];
    const fees = [
      {
        type: 'sepa',
        outPercentage: entry.iban_type.sepa_out_percentage,
        min: entry.sepa_fee_out_min,
        max: entry.sepa_fee_out_max,
      },
      {
        type: 'swift',
        outPercentage: entry.iban_type.swift_out_percentage,
        min: entry.swift_fee_out_min,
        max: entry.swift_fee_out_max,
      },
      {
        type: 'gbrics',
        outPercentage: entry.iban_type.gbrics_out_percentage,
        min: entry.gbrics_fee_out_min,
        max: entry.gbrics_fee_out_max,
      },
      {
        type: 'ach',
        outPercentage: entry.iban_type.ach_out_percentage,
        min: entry.ach_fee_out_min,
        max: entry.ach_fee_out_max,
      },
    ];

    return fees
      .filter(fee => fee.outPercentage && fee.min && fee.max)
      .map(fee => ({
        item: {
          name: fee.type,
          minFee: fee.min,
          maxFee: fee.max,
          percentage: fee.outPercentage,
        },
        value: `${fee.type.toUpperCase()} - Fees: ${fee.outPercentage}%`,
      }));
  };

  const result = formatFees(filterData);

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
            {strings('Select Channel')}
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

        <FlatList
          data={result}
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
              key={index}
              activeOpacity={1}
              onPress={() => handleChannel(item, index)}
              style={
                isRtlApproach
                  ? [rtlStyles.reverseRow, styles.rowItem]
                  : styles.rowItem
              }>
              <View style={commonStyles.rowItem}>
                <View>
                  <ThemeText style={[styles.listItem]}>{item.value}</ThemeText>
                </View>
              </View>
              {item.value === selectedChannel ? (
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
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </CustomModal>
  );
};

export default SelectChannel;
