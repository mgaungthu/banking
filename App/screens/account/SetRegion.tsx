import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  View,
  RefreshControl,
} from 'react-native';
import {identityStyles as styles} from './styles';
import {
  Background,
  Cell,
  Header,
  ImageContainer,
  Radio,
  ThemeButton,
  ThemeText,
} from '../../components';
import * as Images from '../../assets';
import {strings} from '../../strings';
import {commonStyles, rtlStyles} from '../../globalstyles/styles';
import {APIConstants, DefaultArray, MapperConstants} from '../../constants';
import {setItem, ThemeFunctions} from '../../utils';
import Navigation from '../../utils/Navigation';
import {Screen} from '../../enums';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {GlobalActions} from '../../store';
import {useSelector} from 'react-redux';
import {rapunzelTheme} from '../../theme/Colors';
import {t} from 'react-native-tailwindcss';
import {makeRequest} from '../../services/ApiService';
import {showToast} from '../../utils/GenericUtils';
import {isDarkTheme} from '../../utils/ThemeFunctions';
import {cellStyles} from '../../components/ui/styles';

const SetRegion = (props: any) => {
  const rst = useSelector((state: any) => state.globalReducer);

  const {region, appTheme, appColor} = rst;

  const dispatch = useDispatch();
  const [selectedRegion, setSelectedRegion] = useState(region);
  const [regions, setRegions] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetchRegions();
  }, []);

  const fetchRegions = () => {
    setIsFetching(true);
    makeRequest('POST', APIConstants.GET_ALL_REGION)
      .then(res => {
        if (res.status == 200) {
          setRegions(
            res.data.sort((a, b) => {
              if (a.region > b.region) return 1;
              if (a.region < b.region) return -1;
              return 0;
            }),
          );
        }
      })
      .catch(() => showToast('Region', 'error while fetching regions', 'error'))
      .finally(() => setIsFetching(false));
  };

  const handleRegionUpdate = async () => {
    dispatch(GlobalActions.changeRegion(selectedRegion));
    showToast('Region', 'region updated', 'success');
  };

  const activeRegions = regions.filter(({isDisplay}) => isDisplay == 0);
  const inactiveRegions = regions.filter(({isDisplay}) => isDisplay == 1);

  return (
    <SafeAreaView
      style={[commonStyles.safeView, ThemeFunctions.setBackground(appTheme)]}>
      <Header
        title={`${strings('select')} ${strings('region')}`}
        showClose={MapperConstants.StatusMapper.enable}
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isFetching || !region}
            onRefresh={fetchRegions}
            colors={[ThemeFunctions.getColor(appColor)]}
            tintColor={ThemeFunctions.getColor(appColor)}
          />
        }
        contentContainerStyle={commonStyles.scrollView}>
        {!(isFetching || !region) ? (
          <>
            <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
              {strings('available_regions')}
            </ThemeText>
            {activeRegions.map(res => {
              const selected =
                res.region.toLowerCase() === selectedRegion?.toLowerCase();
              return (
                <Cell
                  onPress={() => setSelectedRegion(res.region)}
                  style={{justifyContent: 'space-between'}}
                  key={res.region}>
                  <View>
                    <ThemeText style={t.uppercase}>
                      {strings(res.region)}
                    </ThemeText>
                    <ThemeText
                      style={{color: ThemeFunctions.customText(appTheme)}}>
                      {res.regionName}
                    </ThemeText>
                  </View>
                  <Radio active={selected} />
                </Cell>
              );
            })}

            <ThemeText
              style={{
                color: ThemeFunctions.customText(appTheme),
                marginTop: 20,
              }}>
              {strings('inactive_regions')} / {strings('under_process_regions')}
            </ThemeText>
            {inactiveRegions.map(res => {
              return (
                <TouchableOpacity
                  disabled={true}
                  style={[
                    isDarkTheme(appTheme)
                      ? cellStyles.containerDark
                      : cellStyles.container,
                    ,
                    {justifyContent: 'space-between'},
                  ]}
                  key={res.region}>
                  <View>
                    <ThemeText style={t.uppercase}>
                      {strings(res.region)}
                    </ThemeText>
                    <ThemeText
                      style={{color: ThemeFunctions.customText(appTheme)}}>
                      {res.regionName}
                    </ThemeText>
                  </View>
                </TouchableOpacity>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </ScrollView>
      <View style={commonStyles.paddingHorizontalView}>
        <ThemeButton text="done" onClickHandler={handleRegionUpdate} />
      </View>
    </SafeAreaView>
  );
};

export default SetRegion;
