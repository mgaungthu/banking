import React, {useRef, useState, useEffect} from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

import {CurrentConfig} from '../../../../../../api_config';
import {APIConstants} from '../../../../../constants';
import {useSelector} from 'react-redux';
import Colors from '../../../../../theme/Colors';

const UploadWebView = ({title = '', handleDocs, defaultValue = ''}) => {
  const globalData = useSelector((state: any) => state.globalReducer);

  const token = globalData.userdata.token;
  const uploadURL = `${CurrentConfig.api_url}${APIConstants.FILE_UPLOAD}`;
  const [defaultVal, setDefault] = useState('');

  useEffect(() => {
    setDefault(defaultValue);
  }, [defaultValue]);

  const options = {
    saveToPhotos: false,
    mediaType: 'Photo',
    maxHeight: 800,
    maxWidth: 600,
  };

  const callGallery = () => {
    if (defaultVal) {
      setDefault('');
      handleDocs(title, '');
    } else {
      launchImageLibrary(options, response => {
        // console.log('Response = ', response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else {
          // console.log('response', JSON.stringify(response));
          uploadImage(response?.assets[0]);
        }
      });
    }
  };

  const uploadImage = async img => {
    const formData = new FormData();
    const file = {
      uri: img.uri,
      name: img.fileName,
      type: img.type,
    };
    formData.append('file', file);

    console.log('FormData Contents:', formData);

    const response = await fetch(`${uploadURL}`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + `${token}`, // Include the token in the headers
      },
      body: formData,
    });
    const result = await response.json();
    result.file = img.fileName;

    handleDocs(title, result);
  };

  return (
    <TouchableOpacity
      style={[
        innerStyles.cameraBtn,
        {backgroundColor: defaultVal ? Colors.pink : 'white'},
      ]}
      activeOpacity={0.7}
      onPress={() => callGallery()}>
      {!defaultVal ? (
        <Text>Upload</Text>
      ) : (
        <Text style={{color: '#fff'}}>Remove</Text>
      )}
    </TouchableOpacity>
  );
};

export default UploadWebView;

const innerStyles = StyleSheet.create({
  cameraBtn: {
    borderWidth: 1,
    borderStyle: 'dashed',
    padding: 10,
    borderColor: '#ccc',
    borderRadius: 8,
    marginRight: 10,
  },
});
