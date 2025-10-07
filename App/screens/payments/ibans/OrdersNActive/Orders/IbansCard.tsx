import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import * as styles from '../../styles';
import {navigate, ThemeFunctions} from '../../../../../utils';
import {useSelector} from 'react-redux';
import {ThemeButton, ThemeText} from '../../../../../components';
import {strings} from '../../../../../strings';
import {Screen} from '../../../../../enums';
import {commonStyles} from '../../../../../globalstyles/styles';
import Colors from '../../../../../theme/Colors';

const IbansCard = (props: any) => {
  const {item, status, setIsVisible, setModalText} = props;
  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer);

  const handleModal = () => {
    setIsVisible(true);
    setModalText(item.description);
  };

  return (
    <View style={commonStyles.paddingHorizontalView}>
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
            <ThemeText>{item?.display_code}</ThemeText>
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
            <ThemeText>{item?.country}</ThemeText>
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
            <ThemeText>{item?.type}</ThemeText>
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
            <ThemeText>{item?.fiat_currency.name}</ThemeText>
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
              {item?.setup_fee} {item?.fiat_currency.name}
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
              {item?.monthly_fee} {item?.fiat_currency.name}
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
              {item?.sepa_in_percentage}%/ {item?.sepa_out_percentage}%
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
              {item?.swift_in_percentage}%/ {item?.swift_out_percentage}%
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
            <ThemeText>{item?.is_for_retail === 1 ? 'YES' : 'NO'}</ThemeText>
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
              {strings('For Business')}
            </ThemeText>
          </View>

          <View style={[styles.ibansStyle.rowRight]}>
            <ThemeText>{item?.is_for_business === 1 ? 'YES' : 'NO'}</ThemeText>
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
              {strings('Status')}
            </ThemeText>
          </View>

          <View style={[styles.ibansStyle.rowRight]}>
            <ThemeText style={{textTransform: 'uppercase'}}>{status}</ThemeText>
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
            <ThemeText style={{color: Colors.txtBlue}}>Detail...</ThemeText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default IbansCard;
