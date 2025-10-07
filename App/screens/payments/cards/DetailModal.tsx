import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import RenderHTML from 'react-native-render-html';
import {useSelector} from 'react-redux';

const DetailModal = ({isVisible, setIsVisible, text, component = null}) => {
  const {width} = useWindowDimensions();

  const {isRtlApproach, appTheme, assetMetadata, appColor} = useSelector(
    (state: any) => state.globalReducer,
  );

  return (
    <View style={[styles.container]}>
      {/* <TouchableOpacity
        onPress={() => setIsVisible(true)}
        style={styles.button}>
        <Text style={styles.buttonText}>Detail</Text>
      </TouchableOpacity> */}

      <Modal
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        backdropOpacity={0.5}
        style={styles.modal}>
        <View
          style={[
            styles.tooltipBox,
            {backgroundColor: appTheme === 'light' ? 'white' : '#f7f7f7'},
          ]}>
          {component ? (
            <>{component}</>
          ) : (
            <RenderHTML contentWidth={width} source={{html: text}} />
          )}
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
    zIndex: 0,
  },
  tooltipBox: {
    padding: 15,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10}, // Height 10 for elevation-like effect
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default DetailModal;
