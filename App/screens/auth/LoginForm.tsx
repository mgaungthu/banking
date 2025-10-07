import React, {useRef} from 'react';
import {View} from 'react-native';
import {loginStyles as styles} from './style';
import {Input} from '../../components';
import {FormConstants, ReturnKeyTypes} from '../../enums';
import {strings} from '../../strings';
import {RegexExpression} from '../../utils';

const LoginForm = ({control, errors, editable}: any) => {
  const passwordRef = useRef(null);
  const emailRef = useRef(null);

  return (
    <View style={styles.formView}>
      <Input
        id={FormConstants.Email}
        label={strings('email')}
        // placeholder={strings('email')}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={true}
        reference={emailRef}
        // focusTo={passwordRef}
        pattern={RegexExpression.EMAIL_REGEX}
        returnKeyType={ReturnKeyTypes.Next}
        dropdown={!editable}
        keyboardType="email-address"
      />
      <Input
        id={FormConstants.Password}
        label={strings('password')}
        // placeholder={strings('password')}
        control={control}
        errors={errors}
        minLength={8}
        isSecured={true}
        maxLength={32}
        reference={passwordRef}
        isFieldFilledBg={false}
        isRequired={true}
        returnKeyType={ReturnKeyTypes.Go}
      />
    </View>
  );
};

export default LoginForm;
