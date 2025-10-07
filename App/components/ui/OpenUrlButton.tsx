import React, { useCallback } from "react";
import { Alert, Linking, Text, } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const OpenURLButton = ({ url = '', title = '', textStyle = {}, containerStyle = {}, numberOfLines = 1 }) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <TouchableOpacity style={containerStyle} onPress={handlePress}>
      <Text numberOfLines={numberOfLines} style={[{ color: '#2C8CD8' }, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default OpenURLButton;