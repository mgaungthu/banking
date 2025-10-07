import React from 'react'
import {View, Text, TextInput, Image, Platform} from 'react-native'
import ModalDropdown from 'react-native-modal-dropdown'
import Colors from '../../theme/Colors'
import {dropdownStyles as styles} from './styles'

const DropDownView = (Comp: any) => {
  return ({children, ...props}: any) => (
    <ModalDropdown
      options={props.options}
      dropdownStyle={[
        styles.dropdownContainer,
        {height: props.customHeight, width: props.width ||props.customWidth|| '92%'},
      ]}
      dropdownTextStyle={
        props.customTextStyle ? props.customTextStyle : styles.dropdownTextStyle
      }
      renderSeparator={props.renderSeparator}
      isFullWidth={true}
      showSearch={props.showSearch}
      renderSearch={props.showSearch &&
          <View style={{height: Platform.OS === 'ios' ? 60 : 40}}>
              <TextInput
              placeholder='Search'
              style={{fontSize: 12, paddingHorizontal: 10, height: '100%', paddingVertical: 0, marginVertical: 0}}
              onChangeText={props.onChangeTextSearch}
            />
          </View>
      }
      renderRowText={props.renderRowText}
      onDropdownWillHide={props.onHide}
      onSelect={index => {
        props.updateValue(index)
      }}>
      <Comp {...props}>{children}</Comp>
    </ModalDropdown>
  )
}
const DropDown = DropDownView(View)
export default DropDown
