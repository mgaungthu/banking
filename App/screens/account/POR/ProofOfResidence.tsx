import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';

import {commonStyles} from '../../../globalstyles/styles';
import {Header, ThemeButton, ThemeText} from '../../../components';
import {strings} from '../../../strings';

import {useDispatch, useSelector} from 'react-redux';

import {ThemeFunctions} from '../../../utils';

import {FormatDate} from '../../../utils/AppFunctions';
import {isDarkTheme} from '../../../utils/ThemeFunctions';
import {cellStyles} from '../../../components/ui/styles';
import ConfirmModel from '../accountdetails/ConfirmModel';
import VerifyPOR from './VerifyPOR';
import Colors from '../../../theme/Colors';
import {showToast} from '../../../utils/GenericUtils';

const ProofOfResidence = (props: any) => {
  const {appTheme} = useSelector((state: any) => state.globalReducer);

  const {userProfileData} = useSelector((state: any) => state.appReducer);

  const [isModelShow, setModelShow] = useState(false);
  const [showPorForm, setShowPorForm] = useState(false);
  const [documentType, setDocumentType] = useState('');
  const [modelText, setModelText] = useState('');

  const {
    route: {params},
  } = props;

  const verify = params?.verify;

  useEffect(() => {
    if (verify) {
      setShowPorForm(true);
      setDocumentType(verify);
    }
  }, [verify]);

  const handlePORForm = () => {
    setShowPorForm(true);
  };

  const handlePORVerify = () => {
    setDocumentType(verify || 'individual');
    if (!userProfileData.kyc_record) {
      showToast(
        'KYC Verification Required',
        'Please complete your KYC verification before proceeding.',
        '',
      );
      setModelText('KYC Verification Required');
      return;
    }
    if (!userProfileData?.por_verified_at) {
      setShowPorForm(true);
    } else {
      setModelShow(true);
      setModelText(
        'This will reset your Proof of Residence (POR) status. Are you sure to continue?',
      );
    }
  };

  const handlePORBVerify = () => {
    setDocumentType('business');
    if (!userProfileData?.porb_verified_at) {
      setShowPorForm(true);
    } else {
      setModelShow(true);
      setModelText(
        'This will reset your Business Proof of Residence (BPOR) status. Are you sure to continue?',
      );
    }
  };

  console.log(userProfileData);

  return (
    <SafeAreaView
      style={[commonStyles.safeView, ThemeFunctions.setBackground(appTheme)]}>
      {/* <Background imagePath={Images.BgLogin} /> */}
      <Header title={strings('Proof Of Residence')} />

      {!showPorForm ? (
        <View style={commonStyles.paddingHorizontalView}>
          <View
            style={[
              isDarkTheme(appTheme)
                ? cellStyles.containerDark
                : cellStyles.container,
              {flexDirection: 'column'},
            ]}>
            {userProfileData.por_submitted_at ? (
              <ThemeText
                style={[
                  {
                    color: ThemeFunctions.customText(appTheme),
                    textAlign: 'center',
                  },
                ]}>
                Your POR update has been submitted and is being reviewed, you
                will receive Email notification when it has been reviewed
              </ThemeText>
            ) : userProfileData.has_address_record &&
              !userProfileData.por_expires_soon ? (
              <ThemeText
                style={[
                  {
                    color: ThemeFunctions.customText(appTheme),
                    textAlign: 'center',
                  },
                ]}>
                Your proof of residence is expired, please update your
                verification to continue uninterrupted access
              </ThemeText>
            ) : !userProfileData.has_address_record ||
              !userProfileData.por_expires_soon ? (
              <ThemeText
                style={[
                  {
                    color: ThemeFunctions.customText(appTheme),
                    textAlign: 'center',
                  },
                ]}>
                You haven't submitted Proof of Residence (POR), please update
                your verification to continue uninterrupted access
              </ThemeText>
            ) : userProfileData.por_expires_soon ? (
              <ThemeText
                style={[
                  {
                    color: Colors.pink,
                    textAlign: 'center',
                  },
                ]}>
                Your Proof Of Residence (POR) expires soon, please update your
                verification to continue uninterrupted access Validity:{' '}
                <Text style={{color: Colors.cyan}}>
                  {FormatDate(userProfileData?.por_expire_at)}
                </Text>
              </ThemeText>
            ) : (
              <ThemeText
                style={[
                  {
                    color: ThemeFunctions.customText(appTheme),
                    textAlign: 'center',
                  },
                ]}>
                Your Proof of Residence (POR) is verified {'\n'}Validity:{' '}
                <Text style={{color: Colors.cyan}}>
                  {FormatDate(userProfileData?.por_expire_at)}
                </Text>
              </ThemeText>
            )}
          </View>

          {!userProfileData.por_submitted_at && (
            <ThemeButton
              text={
                !userProfileData?.por_verified_at ||
                userProfileData.por_expires_soon
                  ? 'Verify My Por'
                  : 'Re-Verify My POR'
              }
              onClickHandler={handlePORVerify}
              styleText={{textTransform: 'uppercase'}}
            />
          )}

          {!userProfileData.por_submitted_at &&
            userProfileData.por_verified_at && (
              <View
                style={{
                  borderBottomColor: ThemeFunctions.customText(appTheme),
                  borderBottomWidth: 1,
                  marginBottom: 10,
                }}
              />
            )}

          {!userProfileData.por_submitted_at &&
            userProfileData.por_verified_at &&
            (userProfileData.porb_submitted_at ? (
              <ThemeText>
                Your POR update has been submitted and is being reviewed, you
                will receive Email notification when it has been reviewed
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
                  {!userProfileData.porb_verified_at ||
                  userProfileData.porb_expires_soon ? (
                    <ThemeText
                      style={[
                        // accountStyles.titleDesc,
                        {
                          color: ThemeFunctions.customText(appTheme),
                          textAlign: 'center',
                        },
                      ]}>
                      You haven't submitted Proof of Residence (POR), please
                      update your verification to continue uninterrupted access
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
                      Your Business Proof of Residence (POR) {'\n'} is verified
                      Validity:{' '}
                      <Text style={{color: Colors.cyan}}>
                        {FormatDate(userProfileData?.porb_expire_at)}
                      </Text>
                    </ThemeText>
                  )}
                </View>

                <ThemeButton
                  text={
                    !userProfileData?.porb_verified_at ||
                    userProfileData.porb_expires_soon
                      ? 'Verify My Business POR'
                      : 'Re-Verify My Business POR'
                  }
                  onClickHandler={handlePORBVerify}
                  styleText={{textTransform: 'uppercase'}}
                />
              </>
            ))}
        </View>
      ) : (
        <VerifyPOR
          documentType={documentType}
          setShowPorForm={setShowPorForm}
        />
      )}

      <ConfirmModel
        visible={isModelShow}
        setModelShow={setModelShow}
        text={modelText}
        handleForm={handlePORForm}
      />
    </SafeAreaView>
  );
};

export default ProofOfResidence;
