import React from 'react';
import {Dimensions, Image, View} from 'react-native';
import * as styles from './styles';
import {navigate, ThemeFunctions} from '../../../utils';
import {useSelector} from 'react-redux';
import {ThemeButton, ThemeText} from '../../../components';
import {strings} from '../../../strings';
import {Screen} from '../../../enums';
import {commonStyles} from '../../../globalstyles/styles';
import {FormatNumber} from '../../../utils/AppFunctions';
import CardDetail from './CardDetail';
import {CurrentConfig} from '../../../../api_config';
import Colors, {borderColors} from '../../../theme/Colors';
import {borderLineColor} from '../../../utils/ThemeFunctions';
import fonts from '../../../theme/fonts';

const Cards = (props: any) => {
  const {item, setModalText, setIsVisible} = props;
  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer);
  const {userProfileData} = useSelector((state: any) => state.appReducer);

  const handleOrder = () => {
    if (userProfileData?.kyc_record?.status !== 'approved') {
      navigate(Screen.IdentityVerificationScreen, {});
    } else {
      navigate(Screen.StepOneCardsTypeOrderScreen, {item});
    }
  };

  const handleModal = () => {
    setIsVisible(true);
    setModalText(item.long_description);
  };

  return (
    <View
      style={[styles.ibansStyle.card, ThemeFunctions.setIEOCardBG(appTheme)]}>
      <View style={[commonStyles.rowItem, {marginBottom: 5}]}>
        <ThemeText style={{fontFamily: fonts.PoppinsBold, fontWeight: 'bold'}}>
          {item.name} ({item.card_type})
        </ThemeText>
      </View>
      <View>
        <ThemeText
          style={{
            fontFamily: fonts.PoppinsBold,
            fontWeight: 'heavy',
            fontSize: 13,
            padding: 0,
            marginBottom: 5,
          }}>
          {item.description}
        </ThemeText>
      </View>
      {/* <View style={[styles.ibansStyle.rowLeft]}>
        <ThemeText>{item.description}</ThemeText>
      </View> */}
      <View style={[commonStyles.rowItem, {justifyContent: 'center'}]}>
        <Image
          style={{
            width: 280,
            height: 210,
            resizeMode: 'center',
          }}
          source={{
            uri: `${CurrentConfig.base_url}${item.image.signed_url}`,
          }}
        />
      </View>
      <CardDetail item={item} handleModal={handleModal} />

      <View style={[commonStyles.rowView, {alignItems: 'center'}]}>
        <View style={[commonStyles.halfWidth, {paddingEnd: 8}]}>
          <View>
            <ThemeButton
              text={'To Order'}
              onClickHandler={handleOrder}
              styleText={{textTransform: 'uppercase'}}
              styleButton={{marginVertical: 10}}
            />
          </View>
        </View>
        <View style={[commonStyles.halfWidth, {paddingEnd: 8}]}>
          <ThemeButton
            text={'Detail'}
            styleButton={{
              backgroundColor: 'white',
              borderColor: Colors.pink,
              // borderWidth: 1,
              boxShadowColor: Colors.pink,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 5}, // X and Y offset
              shadowOpacity: 0.2, // Opacity of shadow
              shadowRadius: 4, // Blur radius
            }}
            styleText={{textTransform: 'none', color: Colors.pink}}
            onClickHandler={handleModal}
          />
        </View>
      </View>
    </View>
  );
};

export default Cards;
