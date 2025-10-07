import React from 'react';
import {View} from 'react-native';
import * as styles from './styles';
import {navigate, ThemeFunctions} from '../../../utils';
import {useSelector} from 'react-redux';
import {ThemeButton, ThemeText} from '../../../components';
import {strings} from '../../../strings';
import {Screen} from '../../../enums';

const IbansCard = (props: any) => {
  const {item} = props;
  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer);

  const handleOrder = () => {
    navigate(Screen.IBansTypeFormScreen, {item});
  };

  return (
    <View
      style={[styles.ibansStyle.card, ThemeFunctions.setIEOCardBG(appTheme)]}>
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
          <ThemeText>{item.display_code}</ThemeText>
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
            {strings('Country')}
          </ThemeText>
        </View>

        <View style={[styles.ibansStyle.rowRight]}>
          <ThemeText>{item.country}</ThemeText>
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
            {strings('Type')}
          </ThemeText>
        </View>

        <View style={[styles.ibansStyle.rowRight]}>
          <ThemeText>{item.type}</ThemeText>
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
          <ThemeText>{item.fiat_currency.symbol}</ThemeText>
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
            {strings('Setup Fee')}
          </ThemeText>
        </View>

        <View style={[styles.ibansStyle.rowRight]}>
          <ThemeText>
            {item.setup_fee} {item.fiat_currency.name}
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
          <ThemeText>
            {item.monthly_fee} {item.fiat_currency.name}
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
            {strings('SEPA In/Out')}
          </ThemeText>
        </View>

        <View style={[styles.ibansStyle.rowRight]}>
          <ThemeText>
            {item.sepa_in_percentage}%/ {item.sepa_out_percentage}%
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
            {strings('SWIFT In/Out')}
          </ThemeText>
        </View>

        <View style={[styles.ibansStyle.rowRight]}>
          <ThemeText>
            {item.swift_in_percentage}%/ {item.swift_out_percentage}%
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
            {strings('For Retail')}
          </ThemeText>
        </View>

        <View style={[styles.ibansStyle.rowRight]}>
          <ThemeText>{item.is_for_retail === 1 ? 'YES' : 'NO'}</ThemeText>
        </View>
      </View>
      <View
        style={[
          styles.ibansStyle.cardRow,
          {
            borderColor: ThemeFunctions.customText(appTheme),
          },
        ]}>
        <View style={[styles.ibansStyle.rowLeft]}>
          <ThemeText
            style={{fontFamily: fonts.PoppinsBold, fontWeight: 'bold'}}>
            {strings('For Business')}
          </ThemeText>
        </View>

        <View style={[styles.ibansStyle.rowRight]}>
          <ThemeText>{item.is_for_business === 1 ? 'YES' : 'NO'}</ThemeText>
        </View>
      </View>

      <ThemeButton
        text={'Order'}
        onClickHandler={handleOrder}
        styleText={{textTransform: 'uppercase'}}
        styleButton={{marginVertical: 10}}
        // loading={appData.loading === Loader.STAKE}
      />
    </View>
  );
};

export default IbansCard;
