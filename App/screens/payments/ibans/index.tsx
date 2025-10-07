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
import IbansCard from './IbansCard';
import {PaymentActions} from '../../../store';
import fonts from '../../../theme/fonts';

const IbansLanding = () => {
  //   const {res, enableBiometry} = props;

  const [searchQuery, setSearchQuery] = useState<String>('');
  const [searchedData, setSearchedData] = useState([]);

  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer);
  const {IbansType} = useSelector((state: any) => state.paymentReducer);
  const appData = useSelector((state: any) => state.appReducer);

  const dispatch = useDispatch<any>();

  const scrollViewRef = useRef();

  const scrollY = useRef(new Animated.Value(0)).current;

  const Scroll_Distance = 200,
    Header_Max_Height = 135,
    Header_Min_Height = 0;

  const animatedHeaderHeight = scrollY.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: 'clamp',
  });

  //   console.log(IbansType);

  useEffect(() => {
    if (IbansType.length === 0) {
      getFetch();
    }
  }, [IbansType]);

  useEffect(() => {
    updateList();
  }, [IbansType]);

  const getFetch = () => {
    dispatch(PaymentActions.getIBANSList());
  };

  const searchText = e => {
    let text = e.toLowerCase().trim();
    setSearchQuery(e);
    updateList(text);
  };

  const updateList = (text = '') => {
    if (IbansType?.length > 0) {
      let List = IbansType;
      let filteredData = List.filter(item => {
        return (
          item.fiat_currency.name.toLowerCase().match(text) ||
          item.fiat_currency.symbol.toLowerCase().match(text)
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
      navigate(Screen.OrderNActiveScreen);
    } else {
      navigate(Screen.IBansPaymentScreen);
    }
  };

  const renderScene = () => {
    if (appData.loading === Loader.IBANS_TYPES) {
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

    if (IbansType.length === 0) {
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
              onRefresh={() => getFetch()}
            />
          }
          keyboardShouldPersistTaps="handled"
          ref={scrollViewRef}
          scrollEventThrottle={16}
          onScroll={x => {
            const scrollDist = x.nativeEvent.contentOffset.y;
            scrollY.setValue(scrollDist);
          }}>
          <Animated.View style={[commonStyles.paddingHorizontalView]}>
            {searchedData.map((item, i) => (
              <IbansCard item={item} key={i} />
            ))}
          </Animated.View>
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[commonStyles.safeView, ThemeFunctions.setBackground(appTheme)]}>
      <Header title={strings('New IBANs')} />
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
                My IBANs
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
                Payments
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

export default IbansLanding;
