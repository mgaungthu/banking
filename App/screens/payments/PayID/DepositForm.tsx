import React, {useRef} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {formStyles as styles} from '../../account/styles';
import {Input, ThemeText} from '../../../components';
import {FormConstants, ReturnKeyTypes} from '../../../enums';
import {strings} from '../../../strings';
import {useSelector} from 'react-redux';
import {ThemeFunctions} from '../../../utils';
import IconVector from '../../../components/ui/IconVector';
import Clipboard from '@react-native-clipboard/clipboard';
import {showToast} from '../../../utils/GenericUtils';

const DepositForm = (props: any) => {
  const {appTheme} = useSelector((state: any) => state.globalReducer);
  const {control, errors, payId} = props;

  const copyCardNumber = data => {
    Clipboard.setString(payId);
    // setIsVisible(false);
    showToast('Card Number', 'Copied to clipboard', 'success');
  };

  return (
    <View style={styles.formView}>
      <Input
        id={FormConstants.AccountNumber}
        label={strings('account number')}
        placeholder={strings('account number')}
        control={control}
        errors={errors}
        isRequired={true}
        isFieldFilledBg={false}
        showDropDown={false}
        dropdown={true}
        showTick={false}
        disableInput={true}
      />

      <Input
        id={FormConstants.BSB}
        label={strings('BSB')}
        placeholder={strings('BSB')}
        control={control}
        errors={errors}
        isRequired={true}
        isFieldFilledBg={false}
        showDropDown={false}
        dropdown={true}
        showTick={false}
        disableInput={true}
      />
      <Input
        id={FormConstants.PayIDName}
        label={strings('PayID Name')}
        placeholder={strings('PayID Name')}
        control={control}
        errors={errors}
        isRequired={true}
        isFieldFilledBg={false}
        showDropDown={false}
        dropdown={true}
        showTick={false}
        disableInput={true}
      />
      <Input
        id={FormConstants.PayID}
        label={strings('PayID')}
        placeholder={strings('PayID')}
        control={control}
        errors={errors}
        isRequired={true}
        isFieldFilledBg={false}
        showDropDown={false}
        dropdown={true}
        showTick={false}
        disableInput={true}
        rightComponent={
          <TouchableOpacity
            style={{paddingEnd: 10}}
            onPress={() => copyCardNumber('co')}>
            <IconVector.FontAwesome5 name="copy" color="red" size={22} />
          </TouchableOpacity>
        }
      />
      <Input
        id={FormConstants.Status}
        label={strings('Status')}
        placeholder={strings('Status')}
        control={control}
        errors={errors}
        isRequired={true}
        isFieldFilledBg={false}
        showDropDown={false}
        dropdown={true}
        showTick={false}
        disableInput={true}
      />
    </View>
  );
};

export default DepositForm;
