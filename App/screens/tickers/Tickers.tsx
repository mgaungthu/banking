import React, {useState} from 'react';
import {SafeAreaView, TouchableOpacity, View, Text} from 'react-native';
import {commonStyles} from '../../globalstyles/styles';
import {strings} from '../../strings';
import TickersList from './TickersList';
import {useSelector} from 'react-redux';
import {ThemeFunctions} from '../../utils';
import Header from './TickerHeader';
import {SearchBar} from '../../components';
import {tickerStyles as styles} from './styles';
import {StringConstants} from '../../enums';
import ScreenOverlay from '../../components/ui/ScreenOverlay';

const Tickers = props => {
  const {route = true} = props;

  const initSearch = props?.route?.params?.initSearch || '';
  const openPair = props?.route?.params?.pair;

  const isBackButton = () => {
    return route;
  };

  const [searchQuery, setSearchQuery] = useState<any>(initSearch);
  const [selectedState, setSelectedState] = useState<any>(
    StringConstants.Limit,
  );
  const [checkboxSelected, setCheckboxSelected] = useState<any>(
    StringConstants.Change,
  );
  const [opened, setOpened] = useState(false);

  const [searchedData, setSearchedData] = useState([]);
  const [headerTabSelected, setHeaderTabSelected] = useState('ALL');

  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer);

  const searchText = e => {
    setSearchQuery(e);
  };

  const onSearchCancel = () => {
    setSearchQuery('');
  };

  const handleSelectedState = (value: string) => () => {
    setSelectedState(value);
    setSearchedData([]);
    onSearchCancel();
    if (value === StringConstants.Limit) {
      setHeaderTabSelected(headerTabSelected);
    } else {
      setHeaderTabSelected(headerTabSelected);
    }
  };

  const isExist = (value: string) => {
    return selectedState === value;
  };

  const handleTabClass = (value: string) => {
    return isExist(value)
      ? ThemeFunctions.themeBtnColor(appColor)
      : {...ThemeFunctions.getTickerHeaderColor(appTheme)};
  };

  const handleCheckbox = (value: string) => () => {
    setCheckboxSelected(value);
  };

  const isExistCheckbox = (value: string) => {
    return checkboxSelected === value;
  };

  const handleTextClass = (value: string) => {
    return isExist(value) ? {} : {color: ThemeFunctions.customText(appTheme)};
  };

  const showOverlay = openPair && !opened;

  return (
    <>
      {showOverlay && <ScreenOverlay />}
      <SafeAreaView
        style={[
          commonStyles.tabSafeView,
          commonStyles.topPadding,
          ThemeFunctions.setBackground(appTheme),
        ]}>
        <Header
          showBack={isBackButton()}
          selectedState={selectedState}
          setHeaderTabSelected={setHeaderTabSelected}
          headerTabSelected={headerTabSelected}
          setSearchedData={setSearchedData}
          setSearchQuery={setSearchQuery}
        />
        <View style={{paddingHorizontal: 15}}>
          <View style={{marginVertical: 16}}>
            <SearchBar
              placeholder={`${strings('search')}...`}
              onChangeText={searchText}
              searchQuery={searchQuery}
              onCancel={onSearchCancel}
              style={{padding: 0}}
            />
          </View>
          <View style={[commonStyles.rowItem, commonStyles.justifySpace]}>
            <View style={[commonStyles.rowItem, styles.spotView]}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={handleSelectedState(StringConstants.Limit)}
                style={[
                  styles.limitBtn,
                  handleTabClass(StringConstants.Limit),
                ]}>
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit={true}
                  style={[
                    styles.spotText,
                    handleTextClass(StringConstants.Limit),
                  ]}>
                  {strings('limit')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={handleSelectedState(StringConstants.Spot)}
                style={[styles.spotBtn, handleTabClass(StringConstants.Spot)]}>
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit={true}
                  style={[
                    styles.spotText,
                    handleTextClass(StringConstants.Spot),
                  ]}>
                  {strings('quick_swap')}
                </Text>
              </TouchableOpacity>
            </View>
            {isExist(StringConstants.Limit) && (
              <View style={[commonStyles.rowItem, styles.spotView]}>
                <TouchableOpacity
                  style={[commonStyles.rowItem, {marginTop: 10}]}
                  activeOpacity={1}
                  onPress={handleCheckbox(StringConstants.Change)}>
                  {isExistCheckbox(StringConstants.Change) ? (
                    <TouchableOpacity
                      style={[
                        ThemeFunctions.checkBoxColor(appColor),

                        styles.activeCheckbox,
                      ]}>
                      <View style={[styles.activeInner]} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={handleCheckbox(StringConstants.Change)}
                      style={[
                        styles.checkbox,
                        {
                          borderColor: ThemeFunctions.indicatorColor(appTheme),
                          borderWidth: 1,
                        },
                      ]}
                    />
                  )}
                  <Text
                    style={[
                      styles.chekboxText,
                      {color: ThemeFunctions.customText(appTheme)},
                    ]}>
                    {strings('chg')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    commonStyles.rowItem,
                    {marginLeft: 10, marginTop: 10},
                  ]}
                  activeOpacity={1}
                  onPress={handleCheckbox(StringConstants.Volume)}>
                  {isExistCheckbox(StringConstants.Volume) ? (
                    <TouchableOpacity
                      style={[
                        ThemeFunctions.checkBoxColor(appColor),
                        styles.activeCheckbox,
                      ]}>
                      <View style={[styles.activeInner]} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={handleCheckbox(StringConstants.Volume)}
                      style={[
                        styles.checkbox,
                        {
                          borderColor: ThemeFunctions.indicatorColor(appTheme),
                          borderWidth: 1,
                        },
                      ]}></TouchableOpacity>
                  )}
                  <Text
                    style={[
                      styles.chekboxText,
                      {color: ThemeFunctions.customText(appTheme)},
                    ]}>
                    {strings('vol')}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <TickersList
            selectedState={selectedState}
            headerTabSelected={headerTabSelected}
            checkboxSelected={checkboxSelected}
            searchedData={searchedData}
            searchQuery={searchQuery}
            setSearchedData={setSearchedData}
            setSearchQuery={setSearchQuery}
            openPair={openPair}
            opened={opened}
            setOpened={setOpened}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default Tickers;
