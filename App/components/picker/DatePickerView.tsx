import React from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DatePickerView = (props: any) => {
  const {date, onChange, isDatePickerVisible, hideDatePicker, ...restProps} =
    props;

  return (
    <DateTimePickerModal
      isVisible={isDatePickerVisible}
      mode="date"
      onConfirm={onChange}
      onCancel={hideDatePicker}
      display="spinner"
      is24Hour={true}
      date={date}
      // value={date}
      {...restProps.options}
    />
  );
};

export default DatePickerView;
