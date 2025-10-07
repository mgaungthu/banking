import React, {useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import _ from 'lodash';

import {ThemeFunctions} from '../../utils';
import IconVector from './IconVector';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  iconTop: {},
  iconBottom: {
    marginTop: '-80%',
  },
  iconBottomAnd: {
    marginTop: '-99%',
  },
});

const ThreeWaySortable = ({
  sortDirection,
  size,
  colorInactive: _colorInactive,
  colorActive: _colorActive

}: {
  sortDirection?: SortDirection;
  size?: number;
  colorInactive?:string;
  colorActive?:string;
}) => {
  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer);

  const colorActive = _colorActive || ThemeFunctions.get3WayColor(appColor);
  const colorInactive = _colorInactive || ThemeFunctions.getCurrentTextColor(appTheme);

  let topColor = colorInactive,
    bottomColor = colorInactive;

  if (sortDirection > 0) {
    topColor = colorActive;
  } else if (sortDirection < 0) {
    bottomColor = colorActive;
  }

  const bottomStyle = Platform.OS==="ios" ? styles.iconBottom : styles.iconBottomAnd

  return (
    <View style={styles.container}>
      <IconVector.FontAwesome5
        style={styles.iconTop}
        name="caret-up"
        color={topColor}
        size={size}
      />
      <IconVector.FontAwesome5
        style={bottomStyle}
        name="caret-down"
        color={bottomColor}
        size={size}
      />
    </View>
  );
};

export default ThreeWaySortable;
