import React, {useEffect, useState} from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
  useDerivedValue,
  runOnJS,
} from 'react-native-reanimated';
import {
  ImageContainer,
  Input,
  LoginFields,
  ThemeButton,
  ThemeText,
} from '../../../components';
import {AppColor, FormConstants, Screen} from '../../../enums';
import {commonStyles} from '../../../globalstyles/styles';
import {useSelector} from 'react-redux';
import {navigate, setItem, ThemeFunctions} from '../../../utils';
import {t} from 'react-native-tailwindcss';
import {authStyles} from '../style';
import {strings} from '../../../strings';
import {useForm} from 'react-hook-form';
import RegionList from './RegionList';
import {CurrentConfig} from '../../../../api_config';
import Navigation from '../../../utils/Navigation';
import {DefaultArray} from '../../../constants';
import {Icon} from 'react-native-elements';

const SelectRegion = () => {
  const [showRegion, setShowRegion] = useState(false);
  const [mainLogo, setMainLogo] = useState('');
  const [regionData, setRegionData] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(
    DefaultArray.languages[0],
  );
  const animateWidth = useSharedValue<number>(100);
  const {width} = useWindowDimensions();

  const [animatedWidth, setAnimatedWidth] = useState(animateWidth.value); // React state

  const derivedWidth = useDerivedValue(() =>
    runOnJS(setAnimatedWidth)(animateWidth.value),
  );

  const {
    control,
    formState: {errors},
    setValue,
    getValues,
    trigger,
    handleSubmit,
  } = useForm();

  useEffect(() => {
    console.log(animateWidth.value);
    if (width <= animatedWidth) {
      animateWidth.value = withSpring(animateWidth.value - (width - 30));
    }
  }, [width, animateWidth.value]);

  // console.log(animateWidth.value);

  const handlePress = () => {
    animateWidth.value = withSpring(animateWidth.value + 100);
  };

  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer);

  const handleRegion = item => {
    setMainLogo(item.logo);
    setShowRegion(false);
    setValue(FormConstants.Region, item.name);
    setRegionData(item);
  };

  return (
    <SafeAreaView
      style={[commonStyles.safeView, ThemeFunctions.setBackground(appTheme)]}>
      <TouchableOpacity
        style={authStyles.languagePicker}
        onPress={() =>
          Navigation.navigate(Screen.SelectLanguage, {
            fromScreen: 'Region',
          })
        }>
        <Text
          style={[
            authStyles.language,
            {color: ThemeFunctions.customText(appTheme)},
          ]}>
          {selectedLanguage?.name}
        </Text>
        <Icon
          name="keyboard-arrow-down"
          type="material"
          color={ThemeFunctions.customText(appTheme)}
          size={25}
          style={{marginTop: 2}}
        />
      </TouchableOpacity>
      <LoginFields>
        <ImageContainer
          imagePath={require('./location.png')}
          imgStyle={[commonStyles.logo, {marginTop: 30}]}
          noTransform={true}
        />
        <View style={styles.RegionBox}>
          <ThemeText style={styles.RegionTitle}>Choose Your Region</ThemeText>
          <Text style={{textAlign: 'center', fontSize: 16}}>
            Please select your region to help us for{'\n'}give you a better
            experience
          </Text>
          <TouchableOpacity
            style={{width: '100%', alignItems: 'center'}}
            onPress={() => setShowRegion(true)}>
            <View
              style={{
                borderWidth: 2,
                borderColor: '#ccc',
                ...t.mY5,
                width: 170,
                height: 170,
                borderRadius: 300,
                overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'center',
                // backgroundColor: '#ddd',
              }}>
              <Image
                source={
                  !mainLogo
                    ? require('./selection.png')
                    : {
                        uri: `${CurrentConfig.base_url}${mainLogo}`,
                      }
                } // Local image
                style={{
                  width: !mainLogo ? 18 : 135,
                  height: !mainLogo ? 18 : 135,
                  // borderRadius: 100,
                  // borderWidth: 2,
                  // borderColor: '#000',
                }}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{width: '100%'}}
            onPress={() => setShowRegion(true)}>
            <Input
              id={FormConstants.Region}
              //   label={strings('dob')}
              placeholder={strings('Select Region')}
              control={control}
              errors={errors}
              isFieldFilledBg={false}
              isRequired={false}
              dropdown={true}
              showDropDown={false}
              rightComponent={
                <Image
                  source={require('./right-arrow.png')}
                  style={{width: 28, marginRight: 10}}
                  resizeMode="contain"
                />
              }
              showTick={false}
            />
          </TouchableOpacity>

          <RegionList
            isVisible={showRegion}
            setIsVisible={setShowRegion}
            handleRegion={handleRegion}
            handleCountryCode={() => {}}
          />
        </View>
      </LoginFields>
      <View style={commonStyles.paddingHorizontalView}>
        <ThemeButton
          text="Go ahead"
          disabled={!regionData && true}
          disabledColor={!regionData && '#ccc'}
          styleText={{textTransform: 'Captalize'}}
          onClickHandler={() => {
            setItem('Region', regionData);
            navigate(Screen.Login, {
              mainLogo,
            });
            CurrentConfig.base_url = regionData?.url;
          }}
          // loading={authData.loading === Loader.LOGIN_PROCESSED}
        />
      </View>
    </SafeAreaView>
  );
};

export default SelectRegion;

const styles = StyleSheet.create({
  RegionBox: {alignItems: 'center', ...t.pY5, ...t.pX2},
  RegionTitle: {fontSize: 21, ...t.mB2},
});
