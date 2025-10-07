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
import {Loader, Screen} from '../../enums';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {AppActions, GlobalActions} from '../../store';
import {useSelector} from 'react-redux';
import {rapunzelTheme} from '../../theme/Colors';
import {t} from 'react-native-tailwindcss';
import {makeRequest} from '../../services/ApiService';
import {showToast} from '../../utils/GenericUtils';
import {isDarkTheme} from '../../utils/ThemeFunctions';
import {cellStyles} from '../../components/ui/styles';

type Subcription = 'critical' | 'optional' | 'normal';

const Newsletter = (props: any) => {
  const dispatch = useDispatch();
  const {userProfileData, loading} = useSelector(
    (state: any) => state.appReducer,
  );
  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLoading = () => loading === Loader.GET_USER_PROFILE;

  const fetchUserProfile = () => dispatch(AppActions.getUserProfile());

  const updateNewsletterSubscription = (
    subscription: Subcription,
    status: boolean,
  ) => {
    setIsSubmitting(true);
    makeRequest(
      'POST',
      APIConstants.UPDATE_NEWSLETTER_SUBSCRIPTION,
      {},
      {
        subscription,
        status,
      },
    )
      .then(resp => {
        if (resp.status == 200) {
          showToast(
            'Newsletter',
            resp.message || 'updated successfully',
            'success',
          );
          fetchUserProfile();
        } else {
          showToast('Newsletter', resp.message || 'error', 'error');
        }
      })
      .catch(e => {
        showToast('Newsletter', strings('error_boundary_msg'), 'error');
      })
      .finally(() => setIsSubmitting(false));
  };

  const {
    critical: isSetCritical = false,
    optional: isSetOptional = false,
    normal: isSetNormal = false,
  } = userProfileData || {};

  return (
    <SafeAreaView
      style={[commonStyles.safeView, ThemeFunctions.setBackground(appTheme)]}>
      <Header
        title={`${strings('newsletter')}`}
        showClose={MapperConstants.StatusMapper.enable}
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isLoading() || !userProfileData || isSubmitting}
            onRefresh={fetchUserProfile}
            colors={[ThemeFunctions.getColor(appColor)]}
            tintColor={ThemeFunctions.getColor(appColor)}
          />
        }
        contentContainerStyle={commonStyles.scrollView}>
        {!(isLoading() || !userProfileData || isSubmitting) ? (
          <>
            <Cell
              onPress={() =>
                updateNewsletterSubscription('critical', !isSetCritical)
              }
              style={{justifyContent: 'space-between'}}>
              <View>
                <ThemeText style={t.uppercase}>{strings('critical')}</ThemeText>
                <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
                  {strings('critical_desc')}
                </ThemeText>
              </View>
              <Radio active={isSetCritical} />
            </Cell>

            <Cell
              onPress={() =>
                updateNewsletterSubscription('normal', !isSetNormal)
              }
              style={{justifyContent: 'space-between'}}>
              <View>
                <ThemeText style={t.uppercase}>{strings('normal')}</ThemeText>
                <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
                  {strings('normal_desc')}
                </ThemeText>
              </View>
              <Radio active={isSetNormal} />
            </Cell>

            <Cell
              onPress={() =>
                updateNewsletterSubscription('optional', !isSetOptional)
              }
              style={{justifyContent: 'space-between'}}>
              <View>
                <ThemeText style={t.uppercase}>{strings('optional')}</ThemeText>
                <ThemeText style={{color: ThemeFunctions.customText(appTheme)}}>
                  {strings('optional_desc')}
                </ThemeText>
              </View>
              <Radio active={isSetOptional} />
            </Cell>
          </>
        ) : (
          <></>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Newsletter;
