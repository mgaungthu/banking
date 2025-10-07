import React, {useRef, useEffect} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';

import {formStyles as styles} from '../../styles';
import {Input, ThemeText} from '../../../../components';
import {FormConstants, ReturnKeyTypes} from '../../../../enums';
import {strings} from '../../../../strings';
import {useSelector, useDispatch} from 'react-redux';
import {commonStyles} from '../../../../globalstyles/styles';
import UploadWebView from './UploadWebView';
import {AppActions} from '../../../../store';
import Colors from '../../../../theme/Colors';
import {t} from 'react-native-tailwindcss';

const DocsForm = (props: any) => {
  const {control, errors, handleDocs, kybdata, getValues} = props;

  return (
    <View style={styles.formView}>
      <Input
        id={FormConstants.companyCert}
        label={strings('Company Certificate Of Incorporation')}
        placeholder={strings('Company Certificate Of Incorporation')}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={true}
        showDropDown={false}
        dropdown={true}
        errorMsg={'The Company Certificate of Incorporation Photo is required'}
        rightComponent={
          <UploadWebView
            title="companyCert"
            handleDocs={handleDocs}
            defaultValue={
              kybdata?.cert_incorporation_photo?.tmp || getValues('companyCert')
            }
          />
        }
        returnKeyType={ReturnKeyTypes.Next}
      />

      <Input
        id={FormConstants.memoAndArticle}
        label={strings('Memorandum and Articles Of Association')}
        placeholder={strings('Memorandum and Articles Of Association')}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={true}
        showDropDown={false}
        dropdown={true}
        errorMsg={
          'The Memorandum and Articles Of Association Photo is required'
        }
        rightComponent={
          <UploadWebView
            title="memoAndArticle"
            handleDocs={handleDocs}
            defaultValue={
              kybdata?.memorandum_and_articles_photo?.tmp ||
              getValues('memoAndArticle')
            }
          />
        }
        returnKeyType={ReturnKeyTypes.Next}
      />

      <Input
        id={FormConstants.registerOfShareholders}
        label={strings('Register of Shareholders')}
        placeholder={strings('Register of Shareholders')}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={true}
        showDropDown={false}
        dropdown={true}
        errorMsg={'The Company Register Of Shareholders Photo is required'}
        rightComponent={
          <UploadWebView
            title="registerOfShareholders"
            handleDocs={handleDocs}
            defaultValue={
              kybdata?.register_of_shareholders_photo?.tmp ||
              getValues('registerOfShareholders')
            }
          />
        }
        returnKeyType={ReturnKeyTypes.Next}
      />

      <Input
        id={FormConstants.registerOfOfficer}
        label={strings('Register of Officers')}
        placeholder={strings('Register of Officers')}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={true}
        showDropDown={false}
        dropdown={true}
        errorMsg={'The Company Register Of Officers Photo is required'}
        rightComponent={
          <UploadWebView
            title="registerOfOfficer"
            handleDocs={handleDocs}
            defaultValue={
              kybdata?.register_of_officers_photo?.tmp ||
              getValues('registerOfOfficer')
            }
          />
        }
        returnKeyType={ReturnKeyTypes.Next}
      />

      <Input
        id={FormConstants.bankStatement}
        label={strings('6 months bank statement of the company')}
        placeholder={strings('6 months bank statement of the company')}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={true}
        showDropDown={false}
        dropdown={true}
        errorMsg={'The ubo declaration photo is required'}
        rightComponent={
          <UploadWebView
            title="bankStatement"
            handleDocs={handleDocs}
            defaultValue={
              kybdata?.ubo_declaration_photo?.tmp || getValues('bankStatement')
            }
          />
        }
        returnKeyType={ReturnKeyTypes.Next}
      />

      <Input
        id={FormConstants.meetingToOpen}
        label={strings('Signed Minutes Of Meeting/Decision To Open Account')}
        placeholder={strings(
          'Signed Minutes Of Meeting/Decision To Open Account',
        )}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={true}
        showDropDown={false}
        dropdown={true}
        errorMsg={'The signed minutes photo is required'}
        rightComponent={
          <UploadWebView
            title="meetingToOpen"
            handleDocs={handleDocs}
            defaultValue={
              kybdata?.signed_minutes_photo?.tmp || getValues('meetingToOpen')
            }
          />
        }
        returnKeyType={ReturnKeyTypes.Next}
      />

      <View style={{marginTop: 20}}>
        <ThemeText style={{color: Colors.cyan, fontSize: 10}}>
          Disclaimer - The templates provided herein are for reference purposes
          only and should not be considered as legal or professional advice. It
          is essential that your company adheres to all applicable laws,
          regulations, and guidelines specific to the jurisdiction in which it
          is registered.
        </ThemeText>
      </View>
      <View style={{marginTop: 5}}>
        <ThemeText style={{color: Colors.cyan, fontSize: 10}}>
          Depending on your operational requirements and regulatory environment,
          additional documentation and compliance measures may be necessary.
        </ThemeText>
      </View>
    </View>
  );
};

export default DocsForm;
