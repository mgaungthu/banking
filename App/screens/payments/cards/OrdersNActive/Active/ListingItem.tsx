import React, {useState} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {useForm} from 'react-hook-form';
import {strings} from '../../../../../strings';
import {commonStyles, rtlStyles} from '../../../../../globalstyles/styles';
import {useDispatch, useSelector} from 'react-redux';
import {ThemeFunctions, AppFunctions} from '../../../../../utils';
import {historyStyles as styles} from '../../../../quickbuy/styles';
import {
  ImageContainer,
  ThemeButton,
  ThemeText,
} from '../../../../../components';
import {Input} from '../../../../../components';
import {MapperConstants} from '../../../../../constants';
import {isDarkTheme} from '../../../../../utils/ThemeFunctions';
import {getImageFromURL} from '../../../../../utils/AppFunctions';
import {DEFAULT_COIN_LOGO} from '../../../../../store/action/quickbuy/QuickBuyAction';
import {navigate} from '../../../../../utils';
import {FormConstants, Screen} from '../../../../../enums';
import IconVector from '../../../../../components/ui/IconVector';
import {showToast} from '../../../../../utils/GenericUtils';

const ListingItem = (props: any) => {
  const {data, setIsVisible, setModalDetail} = props;
  const {isRtlApproach, appTheme, assetMetadata, appColor} = useSelector(
    (state: any) => state.globalReducer,
  );

  const reverseDirection = () => {
    return [
      styles.rowItem,
      {borderBottomColor: isDarkTheme(appTheme) ? '#1F1D2B' : '#d3d4db'},
      isRtlApproach ? rtlStyles.reverseRow : {},
    ];
  };

  const leftAlignView = () => {
    return [
      styles.leftItemView,
      isRtlApproach ? rtlStyles.alignEnd : rtlStyles.alignStart,
    ];
  };
  const rightAlignView = () => {
    return [
      styles.rightView,

      isRtlApproach ? rtlStyles.alignStart : rtlStyles.alignEnd,
    ];
  };

  const leftTextColor = () => {
    return ThemeFunctions.customInputText(appTheme);
  };

  const [isImageNotFound, setIsImageNotFound] = useState(
    MapperConstants.StatusMapper.disable,
  );
  const getImageUrl = (resp: any) => {
    return getImageFromURL(resp) || DEFAULT_COIN_LOGO;
  };

  const handleBtn = () => {
    // console.log(data);
    navigate(Screen.CardPaymentScreen, {data});
  };

  const {
    control,
    formState: {errors},
    setValue,
    getValues,
  } = useForm();

  const copyCardNumber = data => {
    Clipboard.setString(data);
    setIsVisible(false);
    showToast('Card Number', 'Copied to clipboard', 'success');
  };

  const detailModal = (
    <>
      <View style={[{width: '100%'}]}>
        <Input
          id={FormConstants.CardNo}
          label={strings('Card Number')}
          placeholder={strings('passport')}
          control={control}
          errors={errors}
          isFieldFilledBg={false}
          isRequired={true}
          showDropDown={false}
          dropdown={true}
          showTick={false}
          value={data?.card_number.replace(/(.{4})/g, '$1 ')}
          rightComponent={
            <TouchableOpacity
              style={{paddingEnd: 10}}
              onPress={() => copyCardNumber(data?.card_number)}>
              <IconVector.FontAwesome5 name="copy" color="red" size={22} />
            </TouchableOpacity>
          }
        />
      </View>
      <View style={[commonStyles.rowView, {justifyContent: 'space-between'}]}>
        <View style={{width: '33%', paddingEnd: 8}}>
          <Input
            id={FormConstants.Expiry}
            label={strings('Expiry')}
            placeholder={strings('Expiry')}
            control={control}
            errors={errors}
            isFieldFilledBg={false}
            isRequired={true}
            showDropDown={false}
            dropdown={true}
            showTick={false}
            value={data.expiry_date}
          />
        </View>
        <View style={{width: '33%', paddingEnd: 8}}>
          <Input
            id={FormConstants.CVV}
            label={strings('CVV')}
            placeholder={strings('CVV')}
            control={control}
            errors={errors}
            isFieldFilledBg={false}
            isRequired={true}
            showDropDown={false}
            dropdown={true}
            showTick={false}
            value={data.cvv}
          />
        </View>
        <View style={{width: '33%'}}>
          <Input
            id={FormConstants.PIN}
            label={strings('PIN')}
            placeholder={strings('PIN')}
            control={control}
            errors={errors}
            isFieldFilledBg={false}
            isRequired={true}
            showDropDown={false}
            dropdown={true}
            showTick={false}
            value={data.pin}
          />
        </View>
      </View>
    </>
  );

  const handleDetail = () => {
    setIsVisible(true);
    setModalDetail(detailModal);
  };

  return (
    <View
      style={[
        styles.historyCard,
        ThemeFunctions.getListColor(appColor, appTheme),
      ]}>
      <View style={reverseDirection()}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {strings('Country')}
          </ThemeText>
        </View>
        <View style={rightAlignView()}>
          <ThemeText
            style={[styles.rightLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {data?.card_type.country}
          </ThemeText>
        </View>
      </View>

      <View style={reverseDirection()}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {strings('name')}
          </ThemeText>
        </View>

        <View style={rightAlignView()}>
          <ThemeText
            style={[styles.rightLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {data?.card_request?.requestable.first_name || ''}{' '}
            {data?.card_request?.requestable.last_name || ''}
          </ThemeText>
        </View>
      </View>

      <View style={reverseDirection()}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {strings('Card Number')}
          </ThemeText>
        </View>
        <View style={rightAlignView()}>
          <ThemeText
            style={[styles.rightLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {data?.card_number.replace(/(.{4})/g, '$1 ')}
          </ThemeText>
        </View>
      </View>
      <View style={reverseDirection()}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {strings('balance')}
          </ThemeText>
        </View>

        <View style={rightAlignView()}>
          <ThemeText
            style={[styles.rightLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {data?.available_balance}
          </ThemeText>
        </View>
      </View>

      <View style={reverseDirection()}>
        <View style={leftAlignView()}>
          <ThemeText
            style={[styles.leftLabel, leftTextColor()]}
            adjustsFontSizeToFit={true}>
            {strings('currency_label')}
          </ThemeText>
        </View>
        <View
          style={[
            rightAlignView(),
            {
              flexDirection: 'row',
              justifyContent: isRtlApproach ? 'flex-start' : 'flex-end',
            },
          ]}>
          <>
            <Image
              source={{uri: getImageUrl(data?.card_type.fiat_currency.symbol)}}
              onError={error => setIsImageNotFound(true)}
              resizeMode="contain"
              style={[styles.ic]}
            />
            <View
              style={[
                isImageNotFound ||
                !getImageUrl(data?.card_type.fiat_currency.symbol)
                  ? {
                      ...ThemeFunctions.bgImgColor(appTheme),
                      position: 'absolute',
                    }
                  : {position: 'absolute'},
                styles.img,
              ]}
            />
          </>
          {/* <ImageContainer
            imagePath={tokenImg(getCurrency())}
            imgStyle={[styles.ic]}
            noTransform={true}
          /> */}
          <ThemeText
            style={[
              styles.rightLabel,
              {color: ThemeFunctions.getColor(appColor)},
            ]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {data?.card_type.fiat_currency.symbol}
          </ThemeText>
        </View>
      </View>

      <View style={[commonStyles.rowView, commonStyles.paddingHorizontalView]}>
        <View style={[commonStyles.halfWidth, {paddingEnd: 8}]}>
          <ThemeButton
            text="Card Detail"
            styleButton={{margin: 0, padding: 0}}
            onClickHandler={() => handleDetail()}
          />
        </View>
        <View style={[commonStyles.halfWidth, {paddingEnd: 8}]}>
          <ThemeButton
            text="Topup"
            styleButton={{margin: 0, padding: 0}}
            onClickHandler={handleBtn}
          />
        </View>
      </View>
    </View>
  );
};

export default ListingItem;
