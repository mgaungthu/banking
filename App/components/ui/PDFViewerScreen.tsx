import React from 'react';
import {SafeAreaView} from 'react-native';
import {commonStyles} from '../../globalstyles/styles';
import {Header} from '../../components';
import {WebView} from 'react-native-webview';
import {useSelector} from 'react-redux';
import {ThemeFunctions} from '../../utils';
import {strings} from '../../strings';

import Pdf from 'react-native-pdf';

interface config {
  route: {
    params: {
      url: string;
      title: string;
    };
  };
}

const PDFViewerScreen = (props: config) => {
  const {
    route: {params},
  } = props;
  const {appTheme} = useSelector((state: any) => state.globalReducer);
  const path = params?.url;

  return (
    <SafeAreaView
      style={[commonStyles.safeView, ThemeFunctions.setBackground(appTheme)]}>
      <Header title={params?.title ? strings(params.title) : ' '} />
      {path ? (
        <Pdf
          trustAllCerts={false}
          source={{uri: path}}
          style={[{flex: 1}]}
          fitPolicy={0}
          onError={error => {
            console.log(error);
          }}
        />
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};

export default PDFViewerScreen;
