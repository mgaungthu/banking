import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {commonStyles, rtlStyles} from '../../globalstyles/styles';
import {Icon} from 'react-native-elements';
import {goBack, ThemeFunctions} from '../../utils';
import {useSelector} from 'react-redux';
import {rapunzelTheme} from '../../theme/Colors';
import Colors from '../../theme/Colors';
import {DefaultArray} from '../../constants';
import {headerStyles as styles} from './styles';
import {strings} from '../../strings';

const Header = ({
  showBack,
  handleBack,
  headerTabSelected,
  setHeaderTabSelected,
  setSearchedData,
  setSearchQuery,
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
  const updateSearch = () => {
    setSearchedData([]);
    // setSearchQuery('')
  };

  return (
    <View
      style={[
        styles.header,
        isRtlApproach
          ? [
              rtlStyles.reverseRow,
              ThemeFunctions.getTickerHeaderColor(appTheme),
            ]
          : ThemeFunctions.getTickerHeaderColor(appTheme),
      ]}>
      {showBack && (
        <TouchableOpacity
          style={[
            styles.backBtn,
            {
              borderBottomWidth: 2,
              borderBottomColor: ThemeFunctions.customText(appTheme),
            },
          ]}
          onPress={handleGoBack}>
          <Icon
            name="arrow-back"
            iconStyle={{transform: [{scaleX: isRtlApproach ? -1 : 1}]}}
            type="material"
            size={22}
            color={ThemeFunctions.getCurrentTextColor(appTheme)}
          />
        </TouchableOpacity>
      )}
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        bounces={false}>
        {DefaultArray.tickersHeaderArray.map(res => (
          <View key={Math.random()}>
            {res === 'STAR' ? (
              <View key={res}>
                <TouchableOpacity
                  style={[styles.btn]}
                  onPress={() => {
                    setHeaderTabSelected('star');
                    updateSearch();
                  }}>
                  <Icon
                    name="star-border"
                    type="material"
                    size={20}
                    color={Colors.yellow}
                  />
                </TouchableOpacity>
                <View
                  style={[
                    headerTabSelected === 'star'
                      ? {
                          backgroundColor: ThemeFunctions.getColor(appColor),
                        }
                      : ThemeFunctions.getTabColor(appTheme),
                    styles.selected,
                  ]}
                />
              </View>
            ) : (
              <View key={res}>
                <TouchableOpacity
                  style={[styles.btn]}
                  onPress={() => {
                    setHeaderTabSelected(res);
                    updateSearch();
                  }}>
                  <Text
                    style={[
                      {
                        color: ThemeFunctions.customText(appTheme),
                        fontFamily: fonts.PoppinsBold,
                        fontWeight: 'heavy',
                      },
                      headerTabSelected === res &&
                        ThemeFunctions.getTextColor(appTheme),
                    ]}
                    adjustsFontSizeToFit={true}>
                    {res === 'ALL' ? strings('all') : res}
                  </Text>
                </TouchableOpacity>
                <View
                  style={[
                    headerTabSelected === res
                      ? {backgroundColor: ThemeFunctions.getColor(appColor)}
                      : ThemeFunctions.getTabColor(appTheme),
                    styles.selected,
                  ]}
                />
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Header;
