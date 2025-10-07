import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {themeStyles as styles, themeStyles} from '../styles';
import {
  Cell,
  Header,
  LoadingSpinner,
  Radio,
  Space,
  ThemeText,
} from '../../../components';
import {strings} from '../../../strings';
import {commonStyles, rtlStyles} from '../../../globalstyles/styles';
import {useDispatch, useSelector} from 'react-redux';
import {DefaultArray, MapperConstants} from '../../../constants';
import {GlobalActions} from '../../../store';
import Colors from '../../../theme/Colors';
import {ThemeFunctions} from '../../../utils';
import {AppColor, AppTheme} from '../../../enums';
import {getColor} from '../../../utils/ThemeFunctions';

const Theme = (props: any) => {
  const dispatch = useDispatch();
  const {isRtlApproach, appTheme, appColor} = useSelector(
    (state: any) => state.globalReducer,
  );
  const [loading, setLoading] = useState(MapperConstants.StatusMapper.disable);

  const updateTheme = themeData => {
    setLoading(MapperConstants.StatusMapper.enable);
    if (appColor === AppColor.black)
      dispatch(GlobalActions.changeColor(AppColor.pink));
    dispatch(GlobalActions.changeAppearance(themeData.title));
    setTimeout(() => {
      setLoading(MapperConstants.StatusMapper.disable);
    }, 1500);
  };

  const updateColor = colorData => {
    dispatch(GlobalActions.changeColor(colorData.title));
  };

  return (
    <SafeAreaView
      style={[commonStyles.safeView, ThemeFunctions.setBackground(appTheme)]}>
      <Header title={strings('appearance')} />
      <View style={[styles.container, commonStyles.paddingHorizontalView]}>
        {/* <View
          style={[
            themeStyles.titleContainer,
            isRtlApproach ? rtlStyles.reverseRow : {},
          ]}>
          <Text
            style={[
              styles.label,
              { color: ThemeFunctions.customText(appTheme) },
            ]}>
            {strings('theme')}
          </Text>
          {loading && <LoadingSpinner color={Colors.white} size='small' />}
        </View>
        {DefaultArray.apprearances.map((res, key) => (
          <Cell
            style={{ justifyContent: 'space-between' }}
            onPress={() => updateTheme(res)}
            key={key}
          >
            <ThemeText style={{textTransform:"capitalize"}}>{strings(res.title)}</ThemeText>
            <Radio active={appTheme === res.title} />
          </Cell>
        ))}
        <Space height={10} /> */}
        <View
          style={[
            themeStyles.titleContainer,
            isRtlApproach ? rtlStyles.reverseRow : {},
          ]}>
          <Text
            style={[
              styles.label,
              {color: ThemeFunctions.customText(appTheme)},
            ]}>
            {strings('colour')}
          </Text>
        </View>
        {DefaultArray.colour.map((res, key) => (
          <React.Fragment key={key}>
            {!(res.title == AppColor.black && appTheme == AppTheme.dark) && (
              <Cell
                style={{justifyContent: 'space-between'}}
                onPress={() => updateColor(res)}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={[
                      themeStyles.circleColor,
                      {backgroundColor: getColor(res.title)},
                    ]}
                  />
                  <ThemeText style={{textTransform: 'capitalize'}}>
                    {strings(res.title)}
                  </ThemeText>
                </View>
                <Radio active={appColor === res.title} />
              </Cell>
            )}
          </React.Fragment>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Theme;
