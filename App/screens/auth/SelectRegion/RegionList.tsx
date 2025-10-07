import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import {
  ImageContainer,
  CustomModal,
  ThemeText,
  ModalSearch,
} from '../../../components';
import {strings} from '../../../strings';
import {SCREEN_HEIGHT, ThemeFunctions} from '../../../utils';
import {Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';
import Colors, {rapunzelTheme} from '../../../theme/Colors';
import {modalStyles as styles} from '../../gbex/styles';
import {commonStyles, rtlStyles} from '../../../globalstyles/styles';
import * as Images from '../../../assets';
import {MapperConstants, AppConstants, APIConstants} from '../../../constants';
import {makeGetRequest, makeRequestNew} from '../../../services/ApiService';
import {CurrentConfig} from '../../../../api_config';

const RegionList = ({
  isVisible,
  setIsVisible,
  handleRegion,
  selectedCountryCode,

  ...props
}: any) => {
  const [searchQuery, setSearchQuery] = useState<any>('');
  const [tokens, setTokens] = useState([]);
  const [searhData, SetSearchData] = useState([]);
  const scrollRef = useRef(null);

  const {appTheme, isRtlApproach} = useSelector(
    (state: any) => state.globalReducer,
  );

  useEffect(() => {
    getRegion();
  }, [isVisible]);

  const getRegion = async () => {
    try {
      const filteredRegions = await RegionsList();
      setTokens(filteredRegions);
      SetSearchData(filteredRegions);
    } catch (e) {
      console.log(e);
    }
  };

  const RegionsList = async () => {
    const response = await makeRequestNew(
      MapperConstants.ApiTypes.GET,
      APIConstants.GET_REGIONS,
    );

    // const blockedDomains = ['solheaven.com', 'bricspay.com', 'localhost'];

    const filteredRegions = response.data.regions.filter(item =>
      item.domain.startsWith('globiance'),
    );

    // console.log(filtered);

    // Filter the array to remove only blocked domains in regions where they appear
    // const filteredRegions = response.data.regions.filter(
    //   item => !blockedDomains.includes(item.domain),
    // );

    return filteredRegions;
  };

  useEffect(() => {
    onSearchCancel();
  }, [isVisible]);

  // const updateList = () => {
  //   const countryCodes = getCountryList();
  //   // if (countryCodes?.length > 0) {
  //   setTokens([]);
  //   // }
  // };

  const searchText = e => {
    let text = e.toLowerCase().trim();
    setSearchQuery(e);
    console.log(e);
    if (tokens?.length > 0) {
      let filteredData = tokens.filter(item => {
        return item.name.toLowerCase().includes(text);
      });
      if (filteredData && Array.isArray(filteredData)) {
        SetSearchData(filteredData);
      } else {
        SetSearchData(tokens);
      }
    }
  };

  const onSearchCancel = () => {
    setSearchQuery('');
    getRegion();
  };

  const SCREEN_HEIGHT = Dimensions.get('window').height;

  return (
    <CustomModal
      visibility={isVisible}
      style={[
        styles.modals,
        ThemeFunctions.setBackground(appTheme),
        // {height: SCREEN_HEIGHT - 25},
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
            {strings('Select Region')}
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
              size={22}
              color={
                ThemeFunctions.isRapunzelTheme(appTheme)
                  ? rapunzelTheme.magenta
                  : Colors.gray
              }
            />
          </TouchableOpacity>
        </View>

        <ModalSearch
          placeholder={`${strings('search')}...`}
          onChangeText={searchText}
          searchQuery={searchQuery}
          onCancel={onSearchCancel}
        />

        <FlatList
          data={searhData}
          initialNumToRender={10}
          ref={scrollRef}
          maxToRenderPerBatch={10}
          contentContainerStyle={[
            commonStyles.paddingHorizontalView,
            {paddingBottom: SCREEN_HEIGHT * 0.2},
          ]}
          getItemLayout={(data, index) => ({
            length: 44,
            offset: 44 * index,
            index,
          })}
          renderItem={({item, index}) => (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => handleRegion(item)}
              style={
                isRtlApproach
                  ? [rtlStyles.reverseRow, styles.rowItem]
                  : styles.rowItem
              }>
              <View style={commonStyles.rowItem}>
                <View>
                  <ThemeText>
                    {/* <Image
                      source={{uri: `${CurrentConfig.base_url}${item.favicon}`}}
                      style={{width: 20, height: 20, marginRight: 20}}
                    /> */}
                    {item.name}
                  </ThemeText>
                </View>
              </View>
              {/* {item.name === selectedCountryCode ? (
                <ImageContainer
                  imagePath={Images.IcVerified}
                  imgStyle={styles.check}
                  noTransform={true}
                />
              ) : (
                <View style={[styles.uncheck]} />
              )} */}
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </CustomModal>
  );
};

export default RegionList;
