import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {Input} from '../../../../../components';
import {FormConstants} from '../../../../../enums';
import {strings} from '../../../../../strings';
import {useSelector} from 'react-redux';

const PhoneNumberInput = ({control, errors, handlePicker}) => {
  const [countryCode, setCountryCode] = useState('+1'); // Default country code
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <View>
      <Input
        id={FormConstants.PhoneNumber}
        label={strings('Mobile Number')}
        placeholder={strings('Mobile Number')}
        control={control}
        errors={errors}
        keyboardType="numeric"
        isFieldFilledBg={false}
        isRequired={true}
        showTick={false}
        leftComponent={
          <TouchableOpacity onPress={() => handlePicker(4)}>
            <Input
              id={FormConstants.CountryCode}
              //   label={strings('dob')}
              placeholder={strings('Country Code')}
              control={control}
              errors={errors}
              isFieldFilledBg={false}
              isRequired={false}
              dropdown={true}
              showDropDown={true}
              customStyles={{
                width: 140,
                height: 50,
                border: 0,
                boxshadow: 0,
                elevation: 0,
                marginBottom: 13,
                borderRightWidth: 1,
                borderRightColor: '#ddd',
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                paddingRight: 10,
              }}
              showTick={false}
            />
          </TouchableOpacity>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  countryCodeInput: {
    width: 150,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    color: '#333',
  },
  phoneNumberInput: {
    flex: 1,
    paddingVertical: 8,
    color: '#333',
  },
});

export default PhoneNumberInput;
