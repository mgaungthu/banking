import React, {useRef} from 'react'
import {View, TouchableOpacity} from 'react-native'
import {formStyles as styles} from '../styles'
import {Input} from '../../../components'
import {FormConstants, ReturnKeyTypes} from '../../../enums'
import {strings} from '../../../strings'
import {DefaultArray} from '../../../constants'
import {DropDown} from '../../../components'
import {useSelector} from 'react-redux'
import {RegexExpression} from '../../../utils'
import {ThemeFunctions} from '../../../utils'

const KYCForm = ({
  control,
  errors,
  setValue,
  isExpirySame,
  setType,
  setShowDatePicker,
  handlePicker
}: any) => {
  const firstNameRef = useRef(null)
  const lastNameRef = useRef(null)
  const middleNameRef = useRef(null)
  const appData = useSelector((state: any) => state.appReducer)
  const countriesData = appData?.countries?.map(el => el.name).sort()
  const {appTheme} = useSelector((state: any) => state.globalReducer)
  const inputStyles = () => {
    return [styles.input, ThemeFunctions.customInputBorderColor(appTheme)]
  }

  return (
    <View style={styles.formView}>
      <Input
        id={FormConstants.FirstName}
        label={strings('first_name') + '*'}
        placeholder={strings('first_name')}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={true}
        reference={firstNameRef}
        focusTo={lastNameRef}
        returnKeyType={ReturnKeyTypes.Next}
        customStyles={inputStyles()}
      />
      <Input
        id={FormConstants.LastName}
        label={strings('last_name') + '*'}
        placeholder={strings('last_name')}
        control={control}
        errors={errors}
        reference={lastNameRef}
        focusTo={middleNameRef}
        isFieldFilledBg={false}
        isRequired={true}
        returnKeyType={ReturnKeyTypes.Next}
        customStyles={inputStyles()}
        // pattern={RegexExpression.NAME_REGEX}
      />
      <Input
        id={FormConstants.MiddleName}
        label={strings('middle_name')}
        placeholder={strings('middle_name')}
        control={control}
        errors={errors}
        reference={middleNameRef}
        isFieldFilledBg={false}
        isRequired={false}
        returnKeyType={ReturnKeyTypes.Next}
        customStyles={inputStyles()}
        // pattern={RegexExpression.NAME_REGEX}
      />
      {/* <DropDown
        options={DefaultArray.genderArray}
        customHeight={80}
        updateValue={index =>
          setValue(FormConstants.Gender, DefaultArray.genderArray[index])
        }>
        <Input
          id={FormConstants.Gender}
          label={strings('gender') + '*'}
          placeholder={`${strings('select')} ${strings('gender')}`}
          control={control}
          errors={errors}
          isRequired={true}
          isFieldFilledBg={false}
          customStyles={inputStyles()}
          dropdown={true}
          showTick={false}
        />
      </DropDown>
      <DropDown
        options={countriesData}
        updateValue={index => {
          setValue(FormConstants.Country, countriesData?.[index])
        }}>
              <TouchableOpacity onPress={handlePicker(1)}>

        <Input
          id={FormConstants.Country}
          label={strings('country_territory') + '*'}
          placeholder={`${strings('select')} ${strings('country')}`}
          control={control}
          errors={errors}
          isRequired={true}
          isFieldFilledBg={false}
          customStyles={inputStyles()}
          dropdown={true}
          showTick={false}
        />
        </TouchableOpacity>
      </DropDown>
      <DropDown
        options={DefaultArray.documentTypes}
        customHeight={120}
        updateValue={index =>
          setValue(
            FormConstants.DocumentType,
            DefaultArray.documentTypes[index],
          )
        }>
        <Input
          id={FormConstants.DocumentType}
          label={strings('document_type') + '*'}
          placeholder={`${strings('select')} ${strings('document_type')}`}
          control={control}
          errors={errors}
          isRequired={true}
          isFieldFilledBg={false}
          customStyles={inputStyles()}
          dropdown={true}
          showTick={false}
        />
      </DropDown>
      <Input
        id={FormConstants.ProofId}
        label={strings('proof_id')}
        placeholder={strings('enter_id')}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={true}
        returnKeyType={ReturnKeyTypes.Next}
        customStyles={inputStyles()}
      /> */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setType(FormConstants.DOB)
          setShowDatePicker(true)
        }}>
          <View pointerEvents="none">
            <Input
              id={FormConstants.DOB}
              label={strings('dob')}
              placeholder={strings('enter_dob')}
              control={control}
              errors={errors}
              isFieldFilledBg={false}
              isRequired={true}
              dropdown={true}
              showDropDown={false}
              customStyles={inputStyles()}
            />
          </View>
      </TouchableOpacity>
{/* 
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setType(FormConstants.IssueDate)
          setShowDatePicker(true)
        }}>
        <Input
          id={FormConstants.IssueDate}
          label={strings('issue_date')}
          placeholder={strings('enter_issue_date')}
          control={control}
          errors={errors}
          isFieldFilledBg={false}
          isRequired={true}
          dropdown={true}
          showDropDown={false}
          customStyles={inputStyles()}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setType(FormConstants.ExpiryDate)
          setShowDatePicker(true)
        }}>
        <Input
          id={FormConstants.ExpiryDate}
          label={strings('expiry_date')}
          placeholder={strings('enter_expiry_date')}
          control={control}
          errors={errors}
          isFieldFilledBg={false}
          isRequired={true}
          dropdown={true}
          showDropDown={false}
          customStyles={inputStyles()}
          errorMsg={isExpirySame() ? strings('expiry_date_msg') : ''}
        />
      </TouchableOpacity>
      <Input
        id={FormConstants.Tax}
        label={strings('tax')}
        placeholder={strings('tax_number')}
        control={control}
        errors={errors}
        isFieldFilledBg={false}
        isRequired={false}
        returnKeyType={ReturnKeyTypes.Go}
        customStyles={inputStyles()}
      /> */}
    </View>
  )
}

export default KYCForm
