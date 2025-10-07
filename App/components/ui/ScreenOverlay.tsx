import React from 'react';
import {useSelector} from 'react-redux';

import {View, Text} from 'react-native';
import {screenOverlayStyles} from './styles';


import { LoadingSpinner } from '..';
import {ThemeFunctions} from '../../utils';

const ScreenOverlay = (props: any) => {
  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer);

  return (
    <View style={[screenOverlayStyles.container]}>
      <LoadingSpinner color={ThemeFunctions.getColor(appColor)} size={50} />
    </View>
  );
};

export default ScreenOverlay;
