import React, {useState} from 'react';
import {SafeAreaView, BackHandler} from 'react-native';
import {commonStyles} from '../../../globalstyles/styles';
import {AppTermination, Header} from '../../../components';
import {WebView} from 'react-native-webview';
import {navigate, ThemeFunctions} from '../../../utils';
import {Screen} from '../../../enums';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {AppActions} from '../../../store';
import {MapperConstants} from '../../../constants';

const VerifyKyc = (props: any) => {
  const {
    route: {params},
  } = props;
  const [isTermination, setIsTermination] = useState(
    MapperConstants.StatusMapper.disable,
  );
  const {appTheme} = useSelector((state: any) => state.globalReducer);

  const dispatch = useDispatch();

  const onNavigationStateChange = (data: any) => {
    if (data.canGoBack) {
      navigate(Screen.Home, {});
      dispatch(AppActions.getUserProfile());
    }
  };

  const handleBack = () => {
    setIsTermination(MapperConstants.StatusMapper.enable);
  };
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        handleBack();
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  return (
    <SafeAreaView
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      <Header title={' '} handleBack={handleBack} showClose={true} />
      <WebView
        backgroundColor={{
          backgroundColor: ThemeFunctions.setBackgroundColor(appTheme),
        }}
        showsVerticalScrollIndicator={false}
        onNavigationStateChange={onNavigationStateChange}
        autoManageStatusBarEnabled={true}
        source={{uri: params.url}}
        scalesPageToFit
        cacheMode="LOAD_NO_CACHE"
        allowFileAccess={true}
        incognito={true}
        pullToRefreshEnabled={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
      />
      <AppTermination
        isVisible={isTermination}
        setIsVisible={setIsTermination}
        showCancel={MapperConstants.StatusMapper.enable}
        msg="termination_msg"
        handleOK={() => {
          setIsTermination(MapperConstants.StatusMapper.disable);
          navigate(Screen.Home, {});
        }}
      />
    </SafeAreaView>
  );
};

export default VerifyKyc;
