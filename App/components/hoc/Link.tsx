import React, {useCallback} from 'react';
import {Alert, Linking, Text, TouchableOpacity} from 'react-native';

const Link = ({url = '', children}) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      // Alert.alert(`Don't know how to open this URL: ${url}`);
      Linking.openURL(url).catch()
    }
  }, [url]);

  return (
    <TouchableOpacity onPress={handlePress}>
      {
        children
      }
    </TouchableOpacity>
  );
};

export default Link;