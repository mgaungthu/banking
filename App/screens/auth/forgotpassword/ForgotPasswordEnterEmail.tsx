import React, {useRef, useState} from 'react';
import {WebView} from 'react-native-webview';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {commonStyles} from '../../../globalstyles/styles';
import {
  DismissKeyboardView,
  Header,
  Input,
  ThemeButton,
} from '../../../components';
import {accountStyles as styles} from '../../account/styles';
import {strings} from '../../../strings';
import {useForm} from 'react-hook-form';
import {authStyles} from '../style';
import Navigation from '../../../utils/Navigation';
import {FormConstants, Loader, ReturnKeyTypes, Screen} from '../../../enums';
import {infoAlert} from '../../../utils/GenericUtils';
import {useDispatch, useSelector} from 'react-redux';
import {RegexExpression, ThemeFunctions} from '../../../utils';
import {loginLoader} from '../../../store/action/auth/AuthAction';
import {APIConstants, MapperConstants} from '../../../constants';
import {makeRequest} from '../../../services/ApiService';
import VerifyEmailModal from '../register/VerifyEmailModal';
import {CurrentConfig} from '../../../../api_config';
import GoogleReCaptcha from '../GoogleReCaptcha';

const ForgotPasswordEnterEmail = () => {
  const {
    control,
    formState: {errors},
    handleSubmit,
    reset,
  } = useForm();
  const dispatch = useDispatch<any>();
  const authData = useSelector((state: any) => state.authReducer);
  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer);
  const emailRef = useRef(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [needRecaptcha, setNeedRecaptcha] = useState(false);
  const [gtoken, setGtoken] = useState();
  const handleNavigation = (screen: any) => () => {
    Navigation.navigate(screen, {});
  };

  const onSubmitEmailClicked = async data => {
    try {
      setNeedRecaptcha(true);
      dispatch(loginLoader(Loader.FORGOT_PASSWORD_PROCESSED));

      data.g_recaptcha_response = gtoken;

      const response = await makeRequest(
        MapperConstants.ApiTypes.POST,
        APIConstants.FORGOT_PASSWORD,
        {},
        data,
      );

      dispatch(loginLoader(MapperConstants.StatusMapper.disable));
      if (response.status === 200) {
        setShowModal(true);
      } else {
        infoAlert(
          strings('forgot_password'),
          'The selected E-mail address is invalid.',
        );
      }
    } catch (error) {
      console.log(error);
      infoAlert(strings('forgot_password'), 'Error');
      dispatch(loginLoader(MapperConstants.StatusMapper.disable));
    }
  };

  const hideModal = () => {
    reset();
    setShowModal(false);
  };

  const onVerifyEmailOkClicked = () => {
    Navigation.reset(Screen.Auth);
    hideModal();
  };

  return (
    <SafeAreaView
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      {/* <Background imagePath={Images.BgLogin} /> */}
      <Header title={strings('forgot_password')} />

      <ScrollView contentContainerStyle={styles.scrollView}>
        <DismissKeyboardView>
          <Input
            id={FormConstants.Email}
            placeholder={strings('email')}
            label={strings('email')}
            control={control}
            errors={errors}
            isFieldFilledBg={false}
            isRequired={true}
            reference={emailRef}
            returnKeyType={ReturnKeyTypes.Done}
            keyboardType="email-address"
            pattern={RegexExpression.EMAIL_REGEX}
            star
            showMargin={false}
          />
          <GoogleReCaptcha
            needRecaptcha={needRecaptcha}
            setNeedRecaptcha={setNeedRecaptcha}
            getToken={data => setGtoken(data)}
          />
        </DismissKeyboardView>
      </ScrollView>
      <View style={commonStyles.paddingHorizontalView}>
        <ThemeButton
          text={strings('submit')}
          onClickHandler={handleSubmit(onSubmitEmailClicked)}
          loading={authData.loading === Loader.FORGOT_PASSWORD_PROCESSED}
        />
        <TouchableOpacity onPress={handleNavigation(Screen.Login)}>
          <Text
            style={[
              authStyles.textReg,
              {color: ThemeFunctions.getColor(appColor)},
            ]}>
            {strings('login_text')}
          </Text>
        </TouchableOpacity>
      </View>
      <VerifyEmailModal
        isVisible={showModal}
        closeClicked={hideModal}
        okClicked={onVerifyEmailOkClicked}
        title={strings('forgot_password')}
        description={strings('reset_password_check_email')}
      />
    </SafeAreaView>
  );
};

export default ForgotPasswordEnterEmail;
