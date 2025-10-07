import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import Toast from 'react-native-toast-message';
import Colors from '../../theme/Colors';
import React from 'react';
import fonts from '../../theme/fonts';

export default {
  notification: (internalState: any) => {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          Toast.hide();
          internalState.text2();
        }}>
        <View style={{flex: 1, paddingLeft: 10}}>
          {internalState.text1.title && (
            <Text style={styles.title} numberOfLines={1}>
              {internalState.text1.title}
            </Text>
          )}
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.body} numberOfLines={4}>
              {internalState.text1.content}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  },
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '95%',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    color: Colors.black,
  },
  body: {
    fontSize: 13,
    flex: 1,
    color: Colors.black,
  },
});
