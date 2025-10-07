import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {commonStyles, rtlStyles} from '../../globalstyles/styles';
import {Icon} from 'react-native-elements';
import {goBack, ThemeFunctions} from '../../utils';
import {useSelector} from 'react-redux';
import {darkTheme, lightTheme, rapunzelTheme} from '../../theme/Colors';
import {isIOS} from '../../utils/DeviceConfig';
import {isDarkTheme} from '../../utils/ThemeFunctions';
import Space from '../../components/ui/Header';

const Header = ({
  title,
  handleBack,
  currency = false,
  currencyComponent,
  showClose = false,
  showBack = true,
  isTab = false,
  imgUrl = '',
  isImg = false,
  isNormalText = false,
  imgStyle,
  right,
  rightComponentWidth,
  ...props
}: any) => {
  const {isRtlApproach, appTheme, appColor} = useSelector(
    (state: any) => state.globalReducer,
  );

  let isCalled = false;
  let timer;
  const handleGoBack = () => {
    if (!isCalled) {
      isCalled = true;
      clearTimeout(timer);
      timer = setTimeout(() => {
        isCalled = false;
      }, 1000);
      return handleBack ? handleBack() : goBack();
    }
  };

  return (
    <View
      style={[
        commonStyles.header,
        isRtlApproach && rtlStyles.reverseRow,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      {showBack ? (
        <TouchableOpacity
          onPress={handleGoBack}
          style={
            isDarkTheme(appTheme)
              ? commonStyles.backBtnDark
              : commonStyles.backBtn
          }>
          <Icon
            name={showClose ? 'close' : 'arrow-back'}
            iconStyle={{transform: [{scaleX: isRtlApproach ? -1 : 1}]}}
            type="material"
            size={22}
            color={isDarkTheme(appTheme) ? darkTheme.text : lightTheme.text}
          />
        </TouchableOpacity>
      ) : (
        <View />
      )}
      {currency ? (
        currencyComponent
      ) : (
        <View
          style={{
            marginLeft: rightComponentWidth > 0 ? rightComponentWidth - 40 : 0,
            // marginRight: -40,
          }}>
          {isImg && (
            <Image
              source={imgUrl}
              resizeMode="contain"
              style={
                imgStyle || {
                  height: 30,
                  width: 30,
                  marginTop: isIOS() ? -10 : 0,
                }
              }
            />
          )}
          <Text
            style={[
              commonStyles.headerText,
              ThemeFunctions.setHeaderTextColor(appTheme),
              isNormalText && {textTransform: props.textTransform || 'none'},
              props.textStyle ? {...props.textStyle} : null,
            ]}
            adjustsFontSizeToFit={true}>
            {title}
          </Text>
        </View>
      )}
      {right ? right : <Space width={40} height={40} />}
    </View>
  );
};

export default Header;
