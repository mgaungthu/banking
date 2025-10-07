import React, {useEffect, useRef} from 'react';
import {FlatList, View} from 'react-native';
import {securityStyles} from './styles';

import {strings} from '../../../strings';
import {commonStyles} from '../../../globalstyles/styles';
import {DefaultArray} from '../../../constants';
import {useDispatch, useSelector} from 'react-redux';
import RowItem from './RowItem';
import {ThemeFunctions} from '../../../utils';
import {ScrollView} from 'react-native-gesture-handler';

const Setting = (props: any) => {
  const {appTheme} = useSelector((state: any) => state.globalReducer);

  const {data} = props;

  return (
    <View style={commonStyles.paddingHorizontalView}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <RowItem title={'projects_funded'} value={data.projects_funded} />
        <RowItem title={'projects_raised'} value={data.projects_raised} />
        <RowItem title={'projects_marketcap'} value={data.projects_marketcap} />
        <RowItem title={'unique_investors'} value={data.unique_investors} />
      </ScrollView>
    </View>
  );
};

export default Setting;
