import React, {useRef} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {securityStyles} from './styles';
import {Header, BiometricWrapper} from '../../components';
import {strings} from '../../strings';
import {commonStyles} from '../../globalstyles/styles';
import {DefaultArray} from '../../constants';
import {useSelector} from 'react-redux';
import RowItem from './RowItem';
import {ThemeFunctions} from '../../utils';
import {Screen} from '../../enums';
import {useDispatch} from 'react-redux';
import * as BiometricService from '../../services/BiometricService';
import {GlobalActions} from '../../store';

const Security = (props: any) => {
  const bioAuthRef: any = useRef();
  const {appTheme, biometryType} = useSelector(
    (state: any) => state.globalReducer,
  );
  const dispatch = useDispatch<any>();

  const enableBiometry = () => {
    BiometricService.setBioAuth(
      BiometricService.bioAuthMapper(biometryType),
      null,
      Screen.App,
      setBioAuthConfiguration,
    );
  };

  const setBioAuthConfiguration = (type: boolean) => {
    dispatch(GlobalActions.setBiometry(type));
  };

  return (
    <SafeAreaView
      style={[commonStyles.safeView, ThemeFunctions.setBackground(appTheme)]}>
      <Header title={strings('security')} />
      <BiometricWrapper ref={bioAuthRef} type="security" />
      <FlatList
        data={DefaultArray.securityOptions}
        initialNumToRender={10}
        contentContainerStyle={securityStyles.list}
        renderItem={({item}) => (
          <RowItem res={item} enableBiometry={enableBiometry} />
        )}
        keyExtractor={item => item?.id?.toString()}
      />
    </SafeAreaView>
  );
};

export default Security;
