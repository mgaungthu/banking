import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {commonStyles, rtlStyles} from '../../../globalstyles/styles';
import * as Images from '../../../assets';
import {Header, ThemeButton} from '../../../components';
import {accountStyles as styles} from '../styles';
import {strings} from '../../../strings';

import {AppActions} from '../../../store';
import {useDispatch, useSelector} from 'react-redux';

import {ThemeFunctions} from '../../../utils';

import SumsubKYC from './SumsubKYC';
import {makeRequestNew} from '../../../services/ApiService';
import {APIConstants, MapperConstants} from '../../../constants';

let option = {
  maximumDate: new Date(),
};
let option1 = {
  minimumDate: new Date(),
};

const KYCProcess = (props: any) => {
  const [resetKYC, setResetKYC] = useState(false);
  const [loading, setLoading] = useState(false);
  const {userProfileData} = useSelector((state: any) => state.appReducer);
  const globalData = useSelector((state: any) => state.globalReducer);

  console.log(userProfileData?.kyc_record);

  const handleResetKYC = async () => {
    setLoading(true);
    const response = await makeRequestNew(
      MapperConstants.ApiTypes.POST,
      APIConstants.RESET_KYRC,
      {},
      {},
    );

    console.log(response.data);

    if (response.status) setResetKYC(true);
    setLoading(false);
  };

  return (
    <SafeAreaView
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(globalData.appTheme),
      ]}>
      <Header title={strings('kyc')} />
      <View
        style={[
          styles.cardView,
          ThemeFunctions.getCardColor(globalData.appTheme),
          globalData.isRtlApproach ? {paddingEnd: 10} : {},
        ]}>
        <Text
          style={[
            styles.personal,
            {color: ThemeFunctions.customText(globalData.appTheme)},
          ]}>
          {strings('personal_details')}
        </Text>
        <Text
          style={[
            styles.desc,
            {color: ThemeFunctions.customText(globalData.appTheme)},
          ]}>
          {strings('kyc_screen_title')}
        </Text>
      </View>

      {!userProfileData?.kyc_record ? (
        <SumsubKYC />
      ) : userProfileData?.verification_too_recent || !resetKYC ? (
        <View style={commonStyles.paddingHorizontalView}>
          <ThemeButton
            text="Verify Me"
            onClickHandler={handleResetKYC}
            loading={loading}
          />
        </View>
      ) : (
        <SumsubKYC />
      )}
    </SafeAreaView>
  );
};

export default KYCProcess;
