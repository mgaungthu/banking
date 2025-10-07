import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {commonStyles} from '../../../globalstyles/styles';
import {
  CustomModal,
  Header,
  Input,
  Space,
  ThemeButton,
  ThemeText,
  UiHeader,
} from '../../../components';
import {accountStyles} from '../styles';
import {strings} from '../../../strings';
import {useForm} from 'react-hook-form';
import {APIConstants, MapperConstants} from '../../../constants';
import {useSelector, useDispatch} from 'react-redux';
import {
  GenericFunctions,
  RegexExpression,
  ThemeFunctions,
} from '../../../utils';
import {icGoogleAuthenticator} from '../../../assets';
import Colors, {lightTheme} from '../../../theme/Colors';
import {t} from 'react-native-tailwindcss';
import QRCode from 'react-native-qrcode-svg';
import {FormConstants, ReturnKeyTypes} from '../../../enums';
import fonts from '../../../theme/fonts';
import {makeRequest, makeRequestNew} from '../../../services/ApiService';
import Toast from 'react-native-toast-message';
import {getUserProfile} from '../../../store/action/app/AppAction';
import Clipboard from '@react-native-clipboard/clipboard';
import WebView from 'react-native-webview';
import {axiosInstance} from '../../../services/AxiosOrder';
import {showToast} from '../../../utils/GenericUtils';
import {AppActions} from '../../../store';

const TwoFactorAuthentication = (props: any) => {
  const {
    control,
    formState: {errors},
    setValue,
    handleSubmit,
    reset,
  } = useForm();

  const dispatch = useDispatch<any>();
  const {userProfileData} = useSelector((state: any) => state.appReducer);

  const tfaSetupCodeRef = useRef(null);

  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [isLoading, setLoading] = useState(false);

  const [qrCode, setQrCode] = useState();
  const [secretKey, setSecretKey] = useState();

  const stateEnable2FA = userProfileData?.two_fa_enabled === 1;

  const showMsg = (title, msg, type) => {
    GenericFunctions.showModalToast(modalToastRef, title, msg, type);
  };
  const modalToastRef = useRef() as any;

  const toogleModal = () => {
    setShowModal(state => !state);
    setError('');
    reset();
    setMessage('');
  };

  useEffect(() => {
    dispatch(AppActions.getUserProfile());
    if (message) {
      setTimeout(() => {
        showToast('', message, 'success');
      }, 300); //
    }
  }, [message]);

  // const resetInput = () => {
  //   reset();
  //   setIsEnalbleInputOtp(true);
  //   setIsEnalbleInput2FA(false);
  //   setIsDisableResendOtp(false);
  //   setTimeResendOtp(timeResendOtpTotal);
  // };

  const generateOtp = async () => {
    const response = await makeRequestNew(
      MapperConstants.ApiTypes.GET,
      APIConstants.GENERATE_EMAIL_OTP_FOR_TFA,
    );
    if (response.status === 200) {
      // console.log();
      setQrCode(response.data.imageurl);
      setSecretKey(response.data.secret);
    }

    // secret
  };

  const onPress2FA = () => {
    if (!stateEnable2FA) {
      generateOtp();
    }
    toogleModal();
    reset();
  };

  const copyCode = () => {
    Clipboard.setString(secretKey);
    showMsg(strings('two_factor_authentication'), 'Copy success', 'success');
  };

  const enabledTFA = async data => {
    if (stateEnable2FA) {
      setLoading(true);
      const response = await makeRequestNew(
        MapperConstants.ApiTypes.POST,
        `${APIConstants.CANCEL_TFA}`,
        {},
        {otp: data.tfa_setup_code},
      );

      if (response.status === 200) {
        handleResponse();
        setMessage('Two factor authentication disabled Successfully');
      } else {
        setError('Two factor authentication failed!');
      }
      setLoading(false);
    } else {
      setLoading(true);
      const response = await makeRequestNew(
        MapperConstants.ApiTypes.GET,
        `${APIConstants.VERIFY_EMAIL_OTP_FOR_TFA}/${data.tfa_setup_code}`,
      );

      if (response.status === 200) {
        handleResponse();
        setMessage('Two factor authentication enabled Successfully');
      } else {
        setError('Two factor authentication failed!');
      }
      setLoading(false);
    }
  };

  const handleResponse = () => {
    toogleModal();
    dispatch(AppActions.getUserProfile());
  };

  const activeShadow = {
    ...styles.activeShadow,
    shadowColor: ThemeFunctions.getColor(appColor),
    borderColor: ThemeFunctions.getBorderColorShadow(appColor),
  };

  const base64Image = `data:image/svg+xml;base64,${qrCode}`;

  const htmlContent = `
    <html>
      <head>
        <style>
          body {
            margin: 0;
            padding: 0;
            overflow: hidden; /* Hides scrollbars */
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background-color: transparent;
          }
        </style>
      </head>
      <body>
        <img src="${base64Image}" style="width: 100%; height: 100%;" />
      </body>
    </html>
  `;

  return (
    <>
      <SafeAreaView
        style={[
          commonStyles.tabSafeView,
          ThemeFunctions.setBackground(appTheme),
        ]}>
        <Header title={strings('two_factor_authentication')} />
        <ScrollView style={{paddingTop: 20}}>
          <ThemeText style={[accountStyles.label]}>
            {strings('tfa_recommended')}
          </ThemeText>
          <Text
            style={[
              styles.title,
              {color: ThemeFunctions.customText(appTheme)},
            ]}>
            {strings('tfa_title')}
          </Text>
          <Image source={icGoogleAuthenticator} style={styles.icGA} />
          <ThemeText style={[styles.textGA]}>Google Authenticator</ThemeText>
          <ThemeText style={[styles.titleInfo]}>
            {strings('tfa_desc_app')}
          </ThemeText>
          <Space height={10} />
          <ThemeText
            style={[
              {
                ...styles.titleInfo,
                fontFamily: fonts.PoppinsBold,
                fontWeight: 'heavy',
              },
            ]}>
            {strings('tfa_protect')}
          </ThemeText>
          <ThemeText style={[styles.titleInfo]}>
            • {strings('tfa_protect_login')}
          </ThemeText>
          <ThemeText style={[styles.titleInfo]}>
            • {strings('tfa_protect_withdrawal')}
          </ThemeText>
          <ThemeText style={[styles.titleInfo]}>
            • {strings('tfa_protect_password')}
          </ThemeText>
        </ScrollView>
        <View style={commonStyles.paddingHorizontalView}>
          <ThemeButton
            text={stateEnable2FA ? 'tfa_disable' : 'tfa_enable'}
            onClickHandler={onPress2FA}
          />
        </View>
      </SafeAreaView>
      <CustomModal
        visibility={showModal}
        onBackdropPress={toogleModal}
        justify={true}
        disableCoverScreen={true}>
        <Toast />
        <SafeAreaView
          style={[
            styles.containerModal,
            ThemeFunctions.setBackground(appTheme),
          ]}>
          <View style={styles.headerContainerModal}>
            <UiHeader
              titleStyle={[
                {color: ThemeFunctions.customText(appTheme)},
                {textTransform: 'uppercase'},
              ]}
              title={strings('two_factor_authentication')}
              iconColor={Colors.dimGray}
              showBack={false}
              handleBack={toogleModal}
            />
          </View>
          <ScrollView contentContainerStyle={styles.contentContainerModal}>
            <KeyboardAvoidingView
              style={{flex: 1}}
              keyboardVerticalOffset={100}
              behavior={'position'}>
              <ThemeText style={[styles.titleInfo]}>
                {strings('tfa_enable_desc_1')}
              </ThemeText>
              <ThemeText style={[styles.titleInfo]}>
                {strings('tfa_enable_desc_2')}
              </ThemeText>
              {stateEnable2FA ? (
                <View style={[commonStyles.justifyCenter, styles.qrCodeView]}>
                  <ThemeText
                    style={{
                      ...styles.title,
                    }}>
                    Google 2FA Enabled
                  </ThemeText>
                </View>
              ) : (
                <>
                  <View style={[commonStyles.justifyCenter, styles.qrCodeView]}>
                    {/* <QRCode size={500} value={qrCode} /> */}
                    {/* <Image
                      source={{uri: base64Image}}
                      style={{width: 200, height: 200}}
                    /> */}
                    <WebView
                      originWhitelist={['*']}
                      source={{
                        html: htmlContent,
                      }}
                      style={{flex: 1, height: 230, width: 230}}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                    />
                  </View>
                  <View
                    style={[
                      commonStyles.justifyCenter,
                      styles.serectCodeContainer,
                    ]}>
                    <ThemeText style={[styles.titleInfo]}>
                      Secret (Key):
                    </ThemeText>
                    <ThemeText
                      style={[
                        styles.serectCode,
                        ThemeFunctions.getTextColor(appTheme),
                      ]}>
                      {secretKey}
                    </ThemeText>
                    <TouchableOpacity onPress={copyCode}>
                      <ThemeText
                        style={[
                          styles.titleInfo,
                          {textDecorationLine: 'underline'},
                        ]}>
                        Copy
                      </ThemeText>
                    </TouchableOpacity>
                  </View>
                </>
              )}

              <View style={styles.inputContainer}>
                <Input
                  id={FormConstants.TFASetupCode}
                  reference={tfaSetupCodeRef}
                  placeholder={strings('enter_2fa')}
                  control={control}
                  errors={errors}
                  isFieldFilledBg={true}
                  isRequired={true}
                  showTick={false}
                  fontSize={13}
                  // returnKeyType={ReturnKeyTypes.Next}
                  isModal={MapperConstants.StatusMapper.enable}
                  customLabelColor={{
                    ...ThemeFunctions.getTextColor(appTheme),
                    fontFamily: fonts.PoppinsBold,
                    fontWeight: 'heavy',
                  }}
                  showMargin={false}
                  pattern={RegexExpression.NUMBER_REGEX}
                  maxLength={6}
                  customStyles={activeShadow}
                />
                {error && (
                  <Text style={{color: Colors.pink, marginTop: 10}}>
                    {error}
                  </Text>
                )}
              </View>
            </KeyboardAvoidingView>
            <View style={commonStyles.paddingHorizontalView}>
              <ThemeButton
                text={stateEnable2FA ? 'tfa_disable' : 'tfa_enable'}
                onClickHandler={handleSubmit(enabledTFA)}
                loading={isLoading}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </CustomModal>
    </>
  );
};

export default TwoFactorAuthentication;

const styles = StyleSheet.create({
  title: {
    ...accountStyles.label,
    fontSize: 18,
    marginHorizontal: 10,
    marginVertical: 15,
  },
  icGA: {
    width: 80,
    height: 80,
    alignSelf: 'center',
  },
  textGA: {
    ...accountStyles.label,
    textAlign: 'center',
    fontSize: 16,
    marginTop: 5,
    marginBottom: 15,
    marginLeft: 0,
  },
  titleInfo: {
    ...accountStyles.label,
    fontSize: 18,
    marginBottom: 5,
  },
  buttonPd: {
    paddingHorizontal: 10,
  },
  containerModal: {
    backgroundColor: '#fff',
    height: '100%',
  },
  headerContainerModal: {
    marginRight: 20,
  },
  contentContainerModal: {
    paddingHorizontal: 10,
  },
  textModal: {
    ...t.textBlack,
  },
  qrCodeView: {
    paddingVertical: 15,
  },
  serectCode: {
    ...commonStyles.headerText,
    fontSize: 19,
  },
  serectCodeContainer: {
    paddingVertical: 15,
  },
  inputContainer: {
    padding: 15,
  },
  resendButton: {
    alignSelf: 'flex-end',
  },
  resendText: {
    ...accountStyles.label,
    fontSize: 18,
    textDecorationLine: 'underline',
    marginBottom: 15,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 10,
  },
  activeShadow: {
    // borderRadius: 8,
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
  },
});
