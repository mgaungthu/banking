import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';

import {commonStyles} from '../../../globalstyles/styles';
import {Header, ThemeButton, ThemeText} from '../../../components';
import {strings} from '../../../strings';
import {navigate} from '../../../utils';
import {useDispatch, useSelector} from 'react-redux';

import {ThemeFunctions} from '../../../utils';

import {FormatDate, FormatDateTime} from '../../../utils/AppFunctions';
import {isDarkTheme} from '../../../utils/ThemeFunctions';
import {cellStyles} from '../../../components/ui/styles';
import ConfirmModel from '../accountdetails/ConfirmModel';
import Colors from '../../../theme/Colors';
import {Screen} from '../../../enums';

const VerifyStatus = (props: any) => {
  const {appTheme} = useSelector((state: any) => state.globalReducer);

  const {userProfileData} = useSelector((state: any) => state.appReducer);

  const [isModelShow, setModelShow] = useState(false);
  const [modelText, setModelText] = useState('');

  const {
    route: {params},
  } = props;

  // const handlePORForm = () => {
  //   setShowPorForm(true);
  // };

  const handlePORBVerify = () => {
    setModelShow(true);
  };

  const handleVerifyBusinessForm = () => {
    // navigate(Screen.BusinessBasicInfoView, {});
    navigate(Screen.BusinessBasicInfoView, {});
  };

  return (
    <SafeAreaView
      style={[commonStyles.safeView, ThemeFunctions.setBackground(appTheme)]}>
      {/* <Background imagePath={Images.BgLogin} /> */}
      <Header title={strings('Identity Verification')} />

      <View style={commonStyles.paddingHorizontalView}>
        <View
          style={[
            isDarkTheme(appTheme)
              ? cellStyles.containerDark
              : cellStyles.container,
            {flexDirection: 'column'},
          ]}>
          {!userProfileData?.kyc_record ? (
            <>
              <ThemeText
                style={[
                  // accountStyles.titleDesc,
                  {
                    color: ThemeFunctions.customText(appTheme),
                    textAlign: 'center',
                  },
                ]}>
                In order to be able to trade or deposit/withdraw money to/from
                your account, you need to verify your identity and address with
                official documents.
              </ThemeText>
            </>
          ) : (
            <ThemeText
              style={[
                // accountStyles.titleDesc,
                {
                  color: ThemeFunctions.customText(appTheme),
                  textAlign: 'center',
                },
              ]}>
              Congratulations! KYC is Verified {'\n'}
              <Text style={{color: Colors.cyan}}>
                {FormatDateTime(userProfileData?.kyc_record?.updated_at)}
              </Text>
            </ThemeText>
          )}

          {userProfileData?.id_verified_at &&
            userProfileData?.id_expires_soon && (
              <ThemeText
                style={[
                  // accountStyles.titleDesc,
                  {
                    color: ThemeFunctions.customText(appTheme),
                    textAlign: 'center',
                  },
                ]}>
                Your KYC expires soon. Please update your verification for
                uninterrupted access.
              </ThemeText>
            )}
        </View>

        {!userProfileData?.kyc_record && (
          <ThemeButton
            text={'Verify My Identity'}
            onClickHandler={() => navigate(Screen.KycProcess, {})}
            styleText={{textTransform: 'uppercase'}}
          />
        )}

        {userProfileData?.id_verified_at &&
          userProfileData?.id_expires_soon && (
            <ThemeButton
              text={'Re-Verify My Identity'}
              onClickHandler={() => navigate(Screen.KycProcess, {})}
              styleText={{textTransform: 'uppercase'}}
            />
          )}

        <View
          style={{
            borderBottomColor: ThemeFunctions.customText(appTheme),
            borderBottomWidth: 1,
            marginVertical: 10,
          }}
        />

        {userProfileData?.kyb_submitted_at &&
        !userProfileData?.kyb_verified_at ? (
          <ThemeText style={{color: Colors.currencyGreen}}>
            Your business account is pending verification, you will receive an
            email notification when it has been reviewed.
          </ThemeText>
        ) : (
          <>
            <View
              style={[
                isDarkTheme(appTheme)
                  ? cellStyles.containerDark
                  : cellStyles.container,
                {flexDirection: 'column'},
              ]}>
              {!userProfileData?.kyb_verified_at ? (
                <ThemeText
                  style={[
                    // accountStyles.titleDesc,
                    {
                      color: ThemeFunctions.customText(appTheme),
                      textAlign: 'center',
                    },
                  ]}>
                  Or if you are a business, you can verify your business
                  information by clicking on the button below
                </ThemeText>
              ) : (
                <ThemeText
                  style={[
                    // accountStyles.titleDesc,
                    {
                      color: ThemeFunctions.customText(appTheme),
                      textAlign: 'center',
                    },
                  ]}>
                  Congratulations! KYB is Verified {'\n'} is verified
                  <Text style={{color: Colors.cyan}}>
                    {FormatDate(userProfileData?.kyb_verified_at)}
                  </Text>
                </ThemeText>
              )}
            </View>

            <ThemeButton
              text={'Verify My Business Identity'}
              onClickHandler={handlePORBVerify}
              styleText={{textTransform: 'uppercase'}}
            />
          </>
        )}
      </View>

      <ConfirmModel
        visible={isModelShow}
        setModelShow={setModelShow}
        text={'Are you sure want to change to Business Account?'}
        handleForm={handleVerifyBusinessForm}
      />
    </SafeAreaView>
  );
};

export default VerifyStatus;
