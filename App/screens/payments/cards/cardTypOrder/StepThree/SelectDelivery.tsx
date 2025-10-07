import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {
  ImageContainer,
  CustomModal,
  ThemeText,
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

const SelectDelivery = ({
  isVisible,
  setIsVisible,
  handleRole,
  selectedCountry,
  selectedRole,
  ...props
}: any) => {
  const {appTheme, isRtlApproach} = useSelector(
    (state: any) => state.globalReducer,
  );

  const [List, setDeliveryList] = useState([]);

  const {deliveryList} = useSelector((state: any) => state.paymentReducer);

  useEffect(() => {
    const filterDelivery = filteringDeliveryList();
    setDeliveryList(filterDelivery);
  }, [selectedCountry]);

  const filteringDeliveryList = () => {
    // console.log(selectedCountry, 'he');
    if (selectedCountry) {
      const filterDelivery = deliveryList[0].pricings.filter(
        item => item.country == selectedCountry,
      );

      return filterDelivery;
    }
  };

  return (
    <CustomModal
      visibility={isVisible}
      style={[styles.typemodals, ThemeFunctions.setBackground(appTheme)]}>
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
            {strings('Select Delivery Provider')}
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
          data={List}
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
              onPress={() => handleRole(item)}
              style={
                isRtlApproach
                  ? [rtlStyles.reverseRow, styles.rowItem]
                  : styles.rowItem
              }>
              <View style={commonStyles.rowItem}>
                <View>
                  <ThemeText
                    style={[styles.listItem, {textTransform: 'uppercase'}]}>
                    DHL ({parseFloat(item.amount)} USD) -{' '}
                    {item.average_delivery_time_in_days} Days
                  </ThemeText>
                </View>
              </View>
              {/* {item.provider === selectedRole ? (
                <ImageContainer
                  imagePath={Images.IcVerified}
                  imgStyle={styles.check}
                  noTransform={true}
                />
              ) : (
                <View style={[styles.uncheck]} />
              )} */}
            </TouchableOpacity>
          )}
          keyExtractor={item => item?.id?.toString()}
        />
      </View>
    </CustomModal>
  );
};

export default SelectDelivery;
