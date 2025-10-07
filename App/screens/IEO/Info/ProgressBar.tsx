import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const ProgressBar = ({progress}) => {
  return (
    <>
      <View style={styles.mainWrapper}>
        <Text style={{fontSize: 16, color: '#698bae', fontWeight: '500'}}>
          Progress
        </Text>
        <View style={styles.proWrapper}>
          <Text style={{textAlign: 'center', fontSize: 12, color: '#fff'}}>
            {progress}%
          </Text>
        </View>
      </View>
    </>
  );
};

export default ProgressBar;

export const styles = StyleSheet.create({
  proWrapper: {
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#c6d3e0',
    borderRadius: 5,
    paddingVertical: 6,
    marginTop: 5,
  },
  mainWrapper: {
    marginBottom: 15,
  },
});
