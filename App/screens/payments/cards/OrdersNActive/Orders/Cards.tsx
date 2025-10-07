import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';

import * as styles from '../../styles';
import {navigate, ThemeFunctions} from '../../../../../utils';
import {useSelector} from 'react-redux';
import {ThemeButton, ThemeText} from '../../../../../components';
import {strings} from '../../../../../strings';
import {Screen} from '../../../../../enums';
import {commonStyles} from '../../../../../globalstyles/styles';
import Colors from '../../../../../theme/Colors';

const Cards = (props: any) => {
  const {item, setIsVisible, setModalText} = props;
  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer);

  const handleModal = () => {
    setIsVisible(true);
    setModalText(item.card_type.long_description);
  };

  return (
    <View style={commonStyles.paddingHorizontalView}>
      <View
        style={[styles.ibansStyle.card, ThemeFunctions.setIEOCardBG(appTheme)]}>
        <View style={{marginBottom: 10}}>
          <ThemeText
            style={{fontFamily: fonts.PoppinsBold, fontWeight: 'bold'}}>
            {item.card_type.description}
          </ThemeText>
        </View>
        <View
          style={[
            styles.ibansStyle.cardRow,
            {
              borderColor: ThemeFunctions.customText(appTheme),
              borderBottomWidth: 1,
            },
          ]}>
          <View style={[styles.ibansStyle.rowLeft]}>
            <ThemeText
              style={{fontFamily: fonts.PoppinsBold, fontWeight: 'bold'}}>
              {strings('Display Code')}
            </ThemeText>
          </View>

          <View style={[styles.ibansStyle.rowRight]}>
            <ThemeText>{item?.card_type.display_code}</ThemeText>
          </View>
        </View>

        <View
          style={[
            styles.ibansStyle.cardRow,
            {
              borderColor: ThemeFunctions.customText(appTheme),
              borderBottomWidth: 1,
            },
          ]}>
          <View style={[styles.ibansStyle.rowLeft]}>
            <ThemeText
              style={{fontFamily: fonts.PoppinsBold, fontWeight: 'bold'}}>
              {strings('Card Type')}
            </ThemeText>
          </View>

          <View style={[styles.ibansStyle.rowRight]}>
            <ThemeText>{item?.card_type.card_type}</ThemeText>
          </View>
        </View>
        <View
          style={[
            styles.ibansStyle.cardRow,
            {
              borderColor: ThemeFunctions.customText(appTheme),
              borderBottomWidth: 1,
            },
          ]}>
          <View style={[styles.ibansStyle.rowLeft]}>
            <ThemeText
              style={{fontFamily: fonts.PoppinsBold, fontWeight: 'bold'}}>
              {strings('Currency')}
            </ThemeText>
          </View>

          <View style={[styles.ibansStyle.rowRight]}>
            <ThemeText>{item?.card_type.fiat_currency.symbol}</ThemeText>
          </View>
        </View>
        <View
          style={[
            styles.ibansStyle.cardRow,
            {
              borderColor: ThemeFunctions.customText(appTheme),
              borderBottomWidth: 1,
            },
          ]}>
          <View style={[styles.ibansStyle.rowLeft]}>
            <ThemeText
              style={{fontFamily: fonts.PoppinsBold, fontWeight: 'bold'}}>
              {strings('Issuance Fee')}
            </ThemeText>
          </View>

          <View style={[styles.ibansStyle.rowRight]}>
            <ThemeText>
              {parseFloat(item?.card_type.issuance_fee)}{' '}
              {item?.card_type.fiat_currency.symbol}
            </ThemeText>
          </View>
        </View>
        <View
          style={[
            styles.ibansStyle.cardRow,
            {
              borderColor: ThemeFunctions.customText(appTheme),
              borderBottomWidth: 1,
            },
          ]}>
          <View style={[styles.ibansStyle.rowLeft]}>
            <ThemeText
              style={{fontFamily: fonts.PoppinsBold, fontWeight: 'bold'}}>
              {strings('Monthly Fee')}
            </ThemeText>
          </View>

          <View style={[styles.ibansStyle.rowRight]}>
            <ThemeText>{item?.card_type.topup_fee_percentage} %</ThemeText>
          </View>
        </View>
        {item?.delivery_provider && (
          <View
            style={[
              styles.ibansStyle.cardRow,
              {
                borderColor: ThemeFunctions.customText(appTheme),
                borderBottomWidth: 1,
              },
            ]}>
            <View style={[styles.ibansStyle.rowLeft]}>
              <ThemeText
                style={{fontFamily: fonts.PoppinsBold, fontWeight: 'bold'}}>
                {strings('Delivery Provider')}
              </ThemeText>
            </View>

            <View style={[styles.ibansStyle.rowRight]}>
              <ThemeText>
                {item?.delivery_provider.card_delivery_provider.provider}{' '}
                {item?.delivery_tracking_number || ''}
              </ThemeText>
            </View>
          </View>
        )}

        <View
          style={[
            styles.ibansStyle.cardRow,
            {
              borderColor: ThemeFunctions.customText(appTheme),
              borderBottomWidth: 1,
            },
          ]}>
          <View style={[styles.ibansStyle.rowLeft]}>
            <ThemeText
              style={{fontFamily: fonts.PoppinsBold, fontWeight: 'bold'}}>
              {strings('ATM Withdrawal Fee')}
            </ThemeText>
          </View>

          <View style={[styles.ibansStyle.rowRight]}>
            <ThemeText>
              {item.card_type.card_type !== 'Virtual cards'
                ? item?.card_type.atm_fee_percentage + '%'
                : '-'}
            </ThemeText>
          </View>
        </View>
        <View
          style={[
            styles.ibansStyle.cardRow,
            {
              borderColor: ThemeFunctions.customText(appTheme),
              borderBottomWidth: 1,
            },
          ]}>
          <View style={[styles.ibansStyle.rowLeft]}>
            <ThemeText
              style={{fontFamily: fonts.PoppinsBold, fontWeight: 'bold'}}>
              {strings('Status')}
            </ThemeText>
          </View>

          <View style={[styles.ibansStyle.rowRight]}>
            <ThemeText>{item?.status.toUpperCase()}</ThemeText>
          </View>
        </View>

        <View
          style={[
            styles.ibansStyle.cardRow,
            {
              borderColor: ThemeFunctions.customText(appTheme),
            },
          ]}>
          <TouchableOpacity onPress={handleModal}>
            <ThemeText style={{color: Colors.black}}>
              {' '}
              <Svg
                data-v-7b79a98f=""
                id="cards-details-6"
                width="18"
                height="18"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <Path
                  data-v-7b79a98f=""
                  d="M7 0C3.13428 0 0 3.13541 0 7C0 10.8669 3.13428 14 7 14C10.8657 14 14 10.8669 14 7C14 3.13541 10.8657 0 7 0ZM7 12.6452C3.88015 12.6452 1.35484 10.1209 1.35484 7C1.35484 3.88119 3.88026 1.35484 7 1.35484C10.1187 1.35484 12.6452 3.88023 12.6452 7C12.6452 10.1198 10.1209 12.6452 7 12.6452ZM10.027 5.44194C10.027 7.33453 7.98291 7.36366 7.98291 8.06307V8.24194C7.98291 8.42899 7.83125 8.58064 7.6442 8.58064H6.35577C6.16872 8.58064 6.01706 8.42899 6.01706 8.24194V7.99753C6.01706 6.9886 6.78198 6.58528 7.36002 6.26119C7.85569 5.98331 8.15949 5.79431 8.15949 5.4263C8.15949 4.93952 7.53855 4.61642 7.03655 4.61642C6.38202 4.61642 6.07987 4.92625 5.65512 5.46231C5.54061 5.60683 5.33166 5.63367 5.18471 5.52227L4.39936 4.92676C4.25521 4.81747 4.22292 4.61441 4.32473 4.4649C4.99162 3.48563 5.84105 2.93548 7.16354 2.93548C8.54861 2.93548 10.027 4.01665 10.027 5.44194V5.44194ZM8.18548 10.1613C8.18548 10.815 7.65368 11.3468 7 11.3468C6.34632 11.3468 5.81452 10.815 5.81452 10.1613C5.81452 9.50761 6.34632 8.97581 7 8.97581C7.65368 8.97581 8.18548 9.50761 8.18548 10.1613Z"
                  fill="black"
                />
              </Svg>{' '}
            </ThemeText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Cards;
