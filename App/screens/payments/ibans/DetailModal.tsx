import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {ThemeText} from '../../../components';

const DetailModal = ({isVisible, setIsVisible, text}) => {
  return (
    <View style={styles.container}>
      {/* <TouchableOpacity
        onPress={() => setIsVisible(true)}
        style={styles.button}>
        <Text style={styles.buttonText}>Detail</Text>
      </TouchableOpacity> */}

      <Modal
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        style={styles.modal}>
        <View style={styles.tooltipBox}>
          <ThemeText>{text}</ThemeText>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tooltipBox: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 5},
  },
});

export default DetailModal;
