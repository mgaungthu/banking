import React, {useEffect, useState, useRef} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Animated,
  RefreshControl,
} from 'react-native';
import {commonStyles, rtlStyles} from '../../../globalstyles/styles';
import {
  Cell,
  ImageContainer,
  LoadingSpinner,
  Radio,
  SearchBar,
  ThemeText,
} from '../../../components';
// import {accountStyles as styles, securityStyles} from '../../account/styles';
import * as styles from './styles';
import {strings} from '../../../strings';
import {useDispatch, useSelector} from 'react-redux';
import * as BiometricService from '../../../services/BiometricService';
import {MapperConstants} from '../../../constants';
import {Header} from '../../../components';
import {navigate, SCREEN_HEIGHT, ThemeFunctions} from '../../../utils';
import IconVector from '../../../components/ui/IconVector';
import {Loader, Screen} from '../../../enums';
import Cards from './Cards';
import {PaymentActions} from '../../../store';
import DetailModal from './DetailModal';
import {CurrentConfig} from '../../../../api_config';
import fonts from '../../../theme/fonts';

const CardsLanding = () => {
  //   const {res, enableBiometry} = props;

  const [searchQuery, setSearchQuery] = useState<String>('');
  const [searchedData, setSearchedData] = useState([]);

  const [isVisible, setIsVisible] = React.useState(false);
  const [modalText, setModalText] = React.useState('');

  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer);
  const {cardList} = useSelector((state: any) => state.paymentReducer);
  const appData = useSelector((state: any) => state.appReducer);

  const dispatch = useDispatch<any>();

  const scrollViewRef = useRef();

  const scrollY = useRef(new Animated.Value(0)).current;

  const Scroll_Distance = 200,
    Header_Max_Height = 148,
    Header_Min_Height = 0;

  const animatedHeaderHeight = scrollY.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    getFetch();
  }, []);

  useEffect(() => {
    updateList();
  }, [cardList]);

  const getFetch = () => {
    if (cardList.length === 0) {
      dispatch(PaymentActions.getNewCardsList());
    }
  };

  const searchText = e => {
    let text = e.toLowerCase().trim();
    setSearchQuery(e);
    updateList(text);
  };

  const updateList = (text = '') => {
    if (cardList?.length > 0) {
      let List = cardList;
      let filteredData = List?.filter(item => {
        return (
          item?.name.toLowerCase().match(text) ||
          item.fiat_currency?.symbol.toLowerCase().match(text)
        );
      });
      if (filteredData && Array.isArray(filteredData)) {
        setSearchedData(filteredData);
      } else {
        setSearchedData('');
      }
    }
  };

  const handleRoute = async param => {
    if (param === 'orders') {
      navigate(Screen.ActiveCardListScreen);
    } else {
      navigate(Screen.CardPaymentScreen);
    }
  };

  const renderScene = () => {
    if (appData.loading === Loader.CARDS_TYPES) {
      return (
        <View style={[styles.containerStyle.container]}>
          <View
            style={{
              padding: 10,
              marginTop: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <LoadingSpinner
              color={ThemeFunctions.getColor(appColor)}
              size="large"
            />
          </View>
        </View>
      );
    }

    if (cardList.length === 0) {
      return (
        <View style={[styles.containerStyle.container]}>
          <View
            style={{
              padding: 10,
              marginTop: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ThemeText
              style={[
                commonStyles.placeHolderText,
                {color: ThemeFunctions.customText(appTheme)},
              ]}>
              {strings('empty')}
            </ThemeText>
          </View>
        </View>
      );
    }

    return (
      <View style={[styles.containerStyle.container]}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={appData.loading === Loader.CARDS_TYPES}
              onRefresh={() => dispatch(PaymentActions.getNewCardsList())}
            />
          }
          keyboardShouldPersistTaps="handled"
          ref={scrollViewRef}
          // onScrollEndDrag={({nativeEvent}) => {
          //   if (!isLoadingNext) handleScroll(nativeEvent);
          // }}
          scrollEventThrottle={16}
          onScroll={x => {
            const scrollDist = x.nativeEvent.contentOffset.y;
            scrollY.setValue(scrollDist);
          }}>
          <Animated.View style={[commonStyles.paddingHorizontalView]}>
            {searchedData.map((item, i) => (
              <Cards
                item={item}
                key={i}
                setModalText={setModalText}
                setIsVisible={setIsVisible}
              />
            ))}
          </Animated.View>
          <DetailModal
            setIsVisible={setIsVisible}
            isVisible={isVisible}
            text={modalText}
          />
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[commonStyles.safeView, ThemeFunctions.setBackground(appTheme)]}>
      <Header
        // handleBack={() => navigate(Screen.Home, {})}
        title={strings('Order New Cards')}
      />
      <Animated.View
        style={[
          commonStyles.paddingHorizontalView,
          {
            height: animatedHeaderHeight,
            overflow: 'hidden',
          },
        ]}>
        <Animated.View>
          <Cell
            onPress={() => handleRoute('orders')}
            style={{justifyContent: 'space-between'}}>
            <View style={{flex: 1}}>
              <ThemeText
                adjustsFontSizeToFit={false}
                style={{fontFamily: fonts.PoppinsBold, fontWeight: 'bold'}}>
                My Cards
              </ThemeText>
            </View>
            <View>
              <IconVector.Entypo
                name="chevron-thin-right"
                size={16}
                color={ThemeFunctions.customText(appTheme)}
              />
            </View>
          </Cell>
          <Cell
            onPress={() => handleRoute('payment')}
            style={{justifyContent: 'space-between'}}>
            <View style={{flex: 1}}>
              <ThemeText
                adjustsFontSizeToFit={false}
                style={{fontFamily: fonts.PoppinsBold, fontWeight: 'bold'}}>
                Top-Up
              </ThemeText>
            </View>
            <View>
              <IconVector.Entypo
                name="chevron-thin-right"
                size={16}
                color={ThemeFunctions.customText(appTheme)}
              />
            </View>
          </Cell>
        </Animated.View>
      </Animated.View>
      <View
        style={[
          commonStyles.paddingHorizontalView,
          styles.headerStyle.searchContainer,
          {marginTop: 0},
        ]}>
        <SearchBar
          onCancel={() => {
            setSearchQuery('');
            setSearchedData(IbansType);
          }}
          onChangeText={x => searchText(x)}
          searchQuery={searchQuery}
          placeholder={`${strings('search by token')}`}
        />
      </View>
      {renderScene()}
    </SafeAreaView>
  );
};

export default CardsLanding;
