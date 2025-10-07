import React from 'react';
import {Image} from 'react-native';
import {useSelector} from 'react-redux';

const ImageContainer = ({imagePath, imgStyle, noTransform = false}: any) => {
  const {isRtlApproach} = useSelector((state: any) => state.globalReducer);

  return (
    <Image
      source={imagePath}
      resizeMode="contain"
      style={[
        imgStyle,
        {transform: [{scaleX: isRtlApproach && !noTransform ? -1 : 1}]},
      ]}
    />
  );
};

export default ImageContainer;
