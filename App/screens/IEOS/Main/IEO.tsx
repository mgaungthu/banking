import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, FlatList} from 'react-native';
import {
  Header,
  ImageContainer,
  LoadingSpinner,
  SearchBar,
  ThemeText,
} from '../../../components';
import {commonStyles} from '../../../globalstyles/styles';
import IEOitem from './IEOitem';
import {styles} from './IEO_style';
import {ThemeFunctions} from '../../../utils';
import {ieoSelector} from '../../../store/selectors/ieosSelector';
import {IeosActions, AppActions} from '../../../store';
import {strings} from '../../../strings';
import {ic_box_empty} from '../../../assets';
import {Text} from 'react-native-elements';
import Colors from '../../../theme/Colors';
import IEOAccessCheck from './IEOAccessCheck';

const CODE = 'SE';

const IEO = (props: any) => {
  //
  const {userProfileData, allowedRegion} = useSelector(
    (state: any) => state.appReducer,
  );

  //
  const {list, isLoading} = useSelector(ieoSelector);
  const [filteredList, setFilteredList] = useState(list);
  const {appColor} = useSelector((state: any) => state.globalReducer);
  const dispatch = useDispatch();
  const {navigation} = props;

  useEffect(() => {
    dispatch(IeosActions.getIeos());
    dispatch(AppActions.getAllowedRegion());
  }, []);

  useEffect(() => {
    setFilteredList(list);
  }, [list]);

  const {appTheme} = useSelector((state: any) => state.globalReducer);

  const handleBack = () => {
    navigation.goBack();
  };

  const hasAccess = () => {
    if (!userProfileData) return true;
    return (
      (userProfileData.region || '').toUpperCase() === CODE ||
      allowedRegion.some(({region}) => region.toUpperCase() === CODE)
    );
  };

  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearchQuery = (text: string) => {
    const searchResult = text
      ? list.filter((ticker: any) =>
          ticker.ticker.toLowerCase().includes(text.toLowerCase()),
        )
      : list;
    setFilteredList(searchResult);
    setSearchQuery(text);
  };

  const onSearchBarReset = () => setSearchQuery('');

  const navigateToInfo = (ticker: any) => {
    navigation.push('IEOSinfo', {id: ticker?.id});
  };

  const NoTokenComponent = (
    <View
      style={[
        {height: '100%', paddingVertical: 10},
        ThemeFunctions.setBackground(appTheme),
      ]}>
      <View
        style={[
          styles.noTokenComponent,
          ThemeFunctions.setIEOCardBG(appTheme),
        ]}>
        <ImageContainer
          imagePath={ic_box_empty}
          imgStyle={[styles.noTokenIcon, ThemeFunctions.imgColor(appTheme)]}
        />
        <ThemeText style={styles.noTokenText}>
          No tokens available yet, stay tuned for update!
        </ThemeText>
      </View>
    </View>
  );

  const EmptyComponent = (
    <View style={[{height: '100%'}, ThemeFunctions.setBackground(appTheme)]}>
      <View
        style={[styles.emptyComponent, ThemeFunctions.setIEOCardBG(appTheme)]}>
        <ThemeText style={{textAlign: 'center'}}>No Token Found</ThemeText>
      </View>
    </View>
  );

  const renderInfo = () => {
    return (
      <>
        <View
          style={[
            styles.searchBarContainer,
            ThemeFunctions.setBackground(appTheme),
          ]}>
          <SearchBar
            placeholder={strings('search_token')}
            style={[styles.searchBar, commonStyles.shadow]}
            onCancel={onSearchBarReset}
            onChangeText={onChangeSearchQuery}
            searchQuery={searchQuery}
          />
        </View>
        {isLoading || !userProfileData ? (
          <View
            style={[{height: '100%'}, ThemeFunctions.setBackground(appTheme)]}>
            <LoadingSpinner
              color={ThemeFunctions.getColor(appColor)}
              size="large"
            />
          </View>
        ) : list.length === 0 ? (
          NoTokenComponent
        ) : (
          <FlatList
            data={filteredList}
            style={[styles.list, ThemeFunctions.setBackground(appTheme)]}
            ListEmptyComponent={EmptyComponent}
            keyExtractor={(item, key) => `${item.ticker}_${key}`}
            renderItem={({item}) => (
              <IEOitem
                startDate={item.startDate}
                endDate={item.endDate}
                key={item.id}
                projectName={item.name}
                currencyName={item.ticker}
                status={item.status}
                onPress={() => navigateToInfo(item)}
              />
            )}
          />
        )}
      </>
    );
  };

  const onAllow = () => {
    dispatch(AppActions.getAllowedRegion());
  };

  const access = hasAccess();
  
  const render = !access ? <IEOAccessCheck onAllow={onAllow} /> : renderInfo();

  return (
    <View>
      <Header
        title={
          <>
            Globiance Launchpad<Text style={{color: ThemeFunctions.getColor(appColor)}}>S</Text>
          </>
        }
        isNormalText={true}
        handleBack={handleBack}
      />

      {render}
    </View>
  );
};

export default IEO;
