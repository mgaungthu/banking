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
} from '../../components';

import {strings} from '../../strings';
import {SCREEN_HEIGHT, ThemeFunctions} from '../../utils';
import {Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';
import Colors, {rapunzelTheme} from '../../theme/Colors';
import {modalStyles as styles} from '../../screens/gbex/styles';
import {commonStyles, rtlStyles} from '../../globalstyles/styles';
import * as Images from '../../assets';
import {MapperConstants, AppConstants} from '../../constants';
import {AppFunctions} from '../../utils';
import {isIOS} from '../../utils/DeviceConfig';
import IconVector from '../ui/IconVector';

export const DropdownBottomModal = ({
  showSearch = false,
  renderItem,
  title,
  placeholder,
  data,
  placeholderColor,
  inputStyle = {},
}: {
  showSearch?: boolean;
  renderItem: (val: any, index: number, onPress: any) => any;
  title: string;
  placeholder: string;
  data: any[];
  placeholderColor?: string;
  inputStyle?: Object;
}) => {
  const {appTheme, isRtlApproach} = useSelector(
    (state: any) => state.globalReducer,
  );
  const [searchQuery, setSearchQuery] = useState<any>('');

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const [isVisible, setIsVisible] = useState(
    MapperConstants.StatusMapper.disable,
  );

  const testRef = useRef(null);

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

  if (!placeholderColor) placeholderColor = ThemeFunctions.customText(appTheme);

  return (
    <>
      <TouchableOpacity
        style={[
          {
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            flexDirection: 'row',
            width: '100%',
            ...inputStyle,
          },
        ]}
        onPress={() => setIsVisible(true)}>
        <ThemeText style={{color: placeholderColor, fontSize: 15}}>
          {placeholder}{' '}
        </ThemeText>

        <View>
          <Icon
            name="keyboard-arrow-down"
            type="material"
            color={placeholderColor}
            size={22}
          />
        </View>
      </TouchableOpacity>
      <CustomModal
        visibility={isVisible}
        style={[
          isKeyboardVisible && isIOS()
            ? [styles.modals, {bottom: keyboardHeight - 10}]
            : styles.modals,
          ThemeFunctions.setBackground(appTheme),
          {height: 450},
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
              {title}
            </ThemeText>
            <TouchableOpacity
              onPress={() => setIsVisible(MapperConstants.StatusMapper.disable)}
              style={[
                commonStyles.backBtn,
                ThemeFunctions.setBackground(appTheme),
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

          {showSearch && (
            <ModalSearch
              placeholder={`${strings('search')}...`}
              onChangeText={setSearchQuery}
              searchQuery={searchQuery}
              onCancel={() => setSearchQuery('')}
            />
          )}

          <FlatList
            data={data?.filter(
              x =>
                !showSearch ||
                x.value.toLowerCase().includes(searchQuery.toLowerCase()),
            )}
            ref={testRef}
            initialNumToRender={10}
            keyboardShouldPersistTaps={'handled'}
            contentContainerStyle={[
              commonStyles.paddingHorizontalView,
              {paddingBottom: SCREEN_HEIGHT * 0.2},
            ]}
            getItemLayout={(data, index) => ({
              length: 42,
              offset: 42 * index,
              index,
            })}
            renderItem={({item, index}) =>
              renderItem(item, index, () =>
                setIsVisible(MapperConstants.StatusMapper.disable),
              )
            }
            keyExtractor={item => item?.value}
          />
        </View>
      </CustomModal>
    </>
  );
};

export const CommonDropdownItem = ({label, active = false, onPress}: any) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(label)}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
      }}>
      <View style={{alignItems: 'flex-start', justifyContent: 'center'}}>
        <ThemeText>{label}</ThemeText>
      </View>

      <View style={{alignItems: 'flex-end', justifyContent: 'center'}}>
        {active ? (
          <ImageContainer
            imagePath={Images.IcVerified}
            imgStyle={styles.check}
            noTransform={true}
          />
        ) : (
          <View style={[styles.uncheck]} />
        )}
      </View>
    </TouchableOpacity>
  );
};
