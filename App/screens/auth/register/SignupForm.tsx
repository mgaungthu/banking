import React, {useRef, useState} from 'react';
import {View, TouchableWithoutFeedback, Text, Image} from 'react-native';
import {formStyles as styles} from '../../account/styles';
import {Input} from '../../../components';
import {FormConstants, ReturnKeyTypes, Screen} from '../../../enums';
import {strings} from '../../../strings';
import {commonStyles} from '../../../globalstyles/styles';
import {IC_BASIC_TICK} from '../../../assets/index';
import {authStyles} from '../style';
import {navigate, RegexExpression, ThemeFunctions} from '../../../utils';
import {APIConstants, MapperConstants} from '../../../constants';
import {useSelector} from 'react-redux';
import QrScanModal from '../../../components/popups/QrScanModal';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';

const SignupForm = (props: any) => {
  const {control, errors, setValue, agree, setAgree, handlePicker} = props;
  const emailRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordref = useRef(null);
  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer);
  const [showModalQrScan, setShowModalQrScan] = useState(false);

  const handleNavigation = (url: string, title: string) => () => {
    navigate(Screen.PDFViewerScreen, {
      url,
      title,
    });
  };

  const toogleModalQrScan = () => {
    setShowModalQrScan(state => !state);
  };

  const onSuccessScanQrCode = event => {
    if (event.data) {
      setShowModalQrScan(false);
      setValue(FormConstants.RefCode, event.data.replace(/.*:/, ''));
    }
  };

  return (
    <View style={styles.formView}>
      {/* <Input
        id={FormConstants.FirstName}
        label={strings('first_name')}
        placeholder={strings('first_name')}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={true}
        reference={firstNameRef}
        focusTo={lastNameRef}
        returnKeyType={ReturnKeyTypes.Next}
        star
      />
      <Input
        id={FormConstants.LastName}
        label={strings('last_name')}
        placeholder={strings('last_name')}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={true}
        reference={lastNameRef}
        focusTo={emailRef}
        returnKeyType={ReturnKeyTypes.Next}
        showMargin={false}
        star
      /> */}
      <Input
        id={FormConstants.Email}
        label={strings('email')}
        placeholder={strings('email')}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={true}
        reference={emailRef}
        focusTo={passwordRef}
        returnKeyType={ReturnKeyTypes.Next}
        keyboardType="email-address"
        pattern={RegexExpression.EMAIL_REGEX}
        star
      />

      <TouchableOpacity onPress={handlePicker(1)}>
        <Input
          id={FormConstants.Nationality}
          label={strings('nationality')}
          placeholder={`${strings('Country of your passport')}`}
          control={control}
          errors={errors}
          isRequired={true}
          isFieldFilledBg={false}
          dropdown={true}
          showTick={false}
          star
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={handlePicker(2)}>
        <Input
          id={FormConstants.Country}
          label={strings('country')}
          placeholder={`${strings('Country Where you live')}`}
          control={control}
          errors={errors}
          isRequired={true}
          isFieldFilledBg={false}
          dropdown={true}
          showTick={false}
          star
        />
      </TouchableOpacity>

      <Input
        id={FormConstants.Password}
        label={strings('password')}
        placeholder={strings('password')}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={true}
        pattern={RegexExpression.PASSWORD_REGEX}
        patternCustomMsg={MapperConstants.StatusMapper.enable}
        reference={passwordRef}
        focusTo={confirmPasswordref}
        isSecured={true}
        returnKeyType={ReturnKeyTypes.Next}
        star
      />

      <Input
        id={FormConstants.ConfirmNewPassword}
        label={strings('confirm_password')}
        placeholder={strings('confirm_password')}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={true}
        pattern={RegexExpression.PASSWORD_REGEX}
        reference={confirmPasswordref}
        patternCustomMsg={MapperConstants.StatusMapper.enable}
        isSecured={true}
        returnKeyType={ReturnKeyTypes.Done}
        star
      />

      <Input
        id={FormConstants.RefCode}
        key={'form_1_RefCode'}
        placeholder=""
        control={control}
        errors={errors}
        isFieldFilledBg={true}
        isRequired={false}
        showTick={false}
        fontSize={16}
        returnKeyType={ReturnKeyTypes.Next}
        label={strings('Referral (Optional)')}
        showMargin={false}
        pattern={null}
        rightComponent={
          <TouchableOpacity
            style={styles.qrScanButton}
            onPress={toogleModalQrScan}>
            <Icon
              name="qr-code-2"
              type="material"
              {...ThemeFunctions.getTextColor(appTheme)}
              size={30}
            />
          </TouchableOpacity>
        }
      />

      <View style={commonStyles.rowView}>
        <TouchableWithoutFeedback onPress={() => setAgree(!agree)}>
          <View
            style={[
              commonStyles.rowView,
              styles.minorAccountView,
              {alignItems: 'flex-start'},
              commonStyles.rowItem,
              commonStyles.alignCenter,
            ]}>
            <View
              style={[
                styles.checkbox,
                {borderColor: ThemeFunctions.customText(appTheme), top: 2},
              ]}>
              {agree ? (
                <Image
                  source={IC_BASIC_TICK}
                  style={[
                    styles.tickIcon,
                    {tintColor: ThemeFunctions.getColor(appColor)},
                  ]}
                />
              ) : null}
            </View>
            <View style={[commonStyles.rowItem, commonStyles.alignCenter]}>
              <Text
                style={[
                  styles.text,
                  {color: ThemeFunctions.customText(appTheme)},
                ]}>
                {strings('I agree to the')}
              </Text>
              <Text
                style={[
                  styles.text,
                  commonStyles.marginHorizontalView,
                  commonStyles.marginVerticalView,
                  {
                    color: ThemeFunctions.customText(appTheme),
                  },
                ]}>
                <Text
                  onPress={handleNavigation(
                    APIConstants.PRIVACY_TERMS,
                    strings('Terms of services'),
                  )}
                  style={[
                    authStyles.linkText,
                    commonStyles.textUnderline,
                    {color: ThemeFunctions.getColor(appColor)},
                  ]}>
                  {strings('Terms of services')}
                </Text>
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <QrScanModal
        title={strings('Scan Referral Code')}
        onSuccess={onSuccessScanQrCode}
        visibility={showModalQrScan}
        onClose={toogleModalQrScan}
      />
    </View>
  );
};

export default SignupForm;
