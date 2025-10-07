import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Platform,
} from 'react-native';
import {
  ImageContainer,
  CustomModal,
  ModalSearch,
  ThemeText,
} from '../../../../../components';

import {strings} from '../../../../../strings';
import {SCREEN_HEIGHT, ThemeFunctions} from '../../../../../utils';
import {Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';
import Colors, {rapunzelTheme} from '../../../../../theme/Colors';
import {modalStyles as styles} from '../../../../gbex/styles';
import {commonStyles, rtlStyles} from '../../../../../globalstyles/styles';
// import * as Images from '../../../assets';
import {MapperConstants} from '../../../../../constants';
import {isIOS} from '../../../../../utils/DeviceConfig';

import Image from 'react-native-fast-image';
import {getImageUrlFromAsset} from '../../../../../utils/AppFunctions';
import {DEFAULT_COIN_LOGO} from '../../../../../store/action/quickbuy/QuickBuyAction';

const SelectOrderAs = ({
  isVisible,
  setIsVisible,
  data,
  updateOrderAS,
  ...props
}: any) => {
  const {appTheme, isRtlApproach, appColor} = useSelector(
    (state: any) => state.globalReducer,
  );
  const testRef = useRef(null);
  // const {stake} = useSelector((state: any) => state.stakingReducer);
  const [tokens, setTokens] = useState([]);

  let switchStyle: any = {
    transform: [{scaleX: 0.6}, {scaleY: 0.6}],
    marginTop: -5,
  };

  if (Platform.OS === 'android') {
    switchStyle = {};
  }

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        setKeyboardHeight(e.endCoordinates.height);
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const getImageUrl = (resp: any) => {
    return getImageUrlFromAsset(resp) || DEFAULT_COIN_LOGO;
  };

  return (
    <CustomModal
      visibility={isVisible}
      style={[
        isKeyboardVisible && isIOS()
          ? [styles.modals, {bottom: keyboardHeight - 10}]
          : styles.typemodals,
        ThemeFunctions.setBackground(appTheme),
      ]}>
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
            {strings('Order AS')}
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
              size={25}
              color={
                ThemeFunctions.isRapunzelTheme(appTheme)
                  ? rapunzelTheme.magenta
                  : Colors.gray
              }
            />
          </TouchableOpacity>
        </View>

        <FlatList
          data={data}
          ref={testRef}
          keyboardShouldPersistTaps={'handled'}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          contentContainerStyle={[
            commonStyles.paddingHorizontalView,
            {paddingBottom: SCREEN_HEIGHT * 0.2},
          ]}
          getItemLayout={(data, index) => ({
            length: 56,
            offset: 56 * index,
            index,
          })}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={1}
                onPress={() => updateOrderAS(item, index)}
                style={
                  isRtlApproach
                    ? [rtlStyles.reverseRow, styles.rowItem]
                    : styles.rowItem
                }>
                <View style={[commonStyles.rowItem, {alignItems: 'center'}]}>
                  <View>
                    <ThemeText style={[styles.curr]}>{item?.name}</ThemeText>
                  </View>
                </View>
                {/* <View style={[commonStyles.rowItem, styles.alignCenter]}>
                  <ThemeText style={styles.balance}>
                    {strings(item.term)} ({item.rate}%)
                  </ThemeText>
                </View> */}
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </CustomModal>
  );
};

export default SelectOrderAs;
