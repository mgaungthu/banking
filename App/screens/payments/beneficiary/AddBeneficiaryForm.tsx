import React, {useRef} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {formStyles as styles} from '../../account/styles';
import {Input} from '../../../components';
import {FormConstants, ReturnKeyTypes} from '../../../enums';
import {strings} from '../../../strings';
import {useSelector} from 'react-redux';
import {ThemeFunctions} from '../../../utils';

const AddBeneficiaryForm = (props: any) => {
  const {appTheme} = useSelector((state: any) => state.globalReducer);
  const {control, errors, handlePicker, userProfileData} = props;
  const addressRef = useRef(null);
  const nameRef = useRef(null);
  const bankAddressRef = useRef(null);
  const bankNameRef = useRef(null);
  const bankCodeRef = useRef(null);
  const branchCodeRef = useRef(null);
  const swiftCodeRef = useRef(null);
  const accountRef = useRef(null);
  return (
    <View style={styles.formView}>
      <TouchableOpacity style={{paddingTop: 0}} onPress={handlePicker()}>
        <Input
          id={FormConstants.Currency_Label}
          label={strings('currency_label')}
          placeholder={strings('select')}
          control={control}
          errors={errors}
          isFieldFilledBg={false}
          isRequired={true}
          reference={nameRef}
          // focusTo={emailRef}
          dropdown={true}
          returnKeyType={ReturnKeyTypes.Next}
        />
      </TouchableOpacity>

      <Input
        id={FormConstants.BeneficiaryName}
        label={strings('name')}
        placeholder=""
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={true}
        reference={nameRef}
        focusTo={addressRef}
        returnKeyType={ReturnKeyTypes.Next}
      />
      <Input
        id={FormConstants.BeneficiaryAddress}
        label={strings('address')}
        placeholder=""
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={true}
        reference={addressRef}
        focusTo={bankNameRef}
        returnKeyType={ReturnKeyTypes.Next}
      />
      <Input
        id={FormConstants.BeneficiaryBankName}
        label={strings('bank_name')}
        placeholder=""
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={true}
        reference={bankNameRef}
        focusTo={bankAddressRef}
        returnKeyType={ReturnKeyTypes.Next}
      />
      <Input
        id={FormConstants.BankAddress}
        label={strings('bank_address')}
        placeholder=""
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={true}
        reference={bankAddressRef}
        focusTo={bankCodeRef}
        returnKeyType={ReturnKeyTypes.Next}
      />

      <Input
        id={FormConstants.SwiftCode}
        label={strings('swift_bic_code')}
        placeholder=""
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={true}
        reference={swiftCodeRef}
        focusTo={accountRef}
        returnKeyType={ReturnKeyTypes.Next}
      />
      <Input
        id={FormConstants.AccountNumber}
        label={strings('ibn_account')}
        placeholder=""
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={true}
        reference={accountRef}
        returnKeyType={ReturnKeyTypes.Go}
      />
      <Input
        id={FormConstants.BankCode}
        label={strings('bank_code')}
        placeholder=""
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        // isRequired={true}
        reference={bankCodeRef}
        focusTo={branchCodeRef}
        returnKeyType={ReturnKeyTypes.Next}
      />
      <Input
        id={FormConstants.BankBranchCode}
        label={strings('bank_branch_code')}
        placeholder=""
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        // isRequired={true}
        reference={branchCodeRef}
        focusTo={swiftCodeRef}
        returnKeyType={ReturnKeyTypes.Next}
      />
      {userProfileData?.two_fa_enabled === 1 && (
        <Input
          id={FormConstants.TFA}
          label={`${strings('Two Factor Authentication Code')}`}
          placeholder={strings('Two Factor Authentication Code')}
          control={control}
          errors={errors}
          isFieldFilledBg={false}
          // errorMsg={err}
          isRequired={true}
        />
      )}
    </View>
  );
};

export default AddBeneficiaryForm;
