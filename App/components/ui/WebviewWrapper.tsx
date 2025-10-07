import React from 'react'
import {SafeAreaView} from 'react-native'
import {commonStyles} from '../../globalstyles/styles'
import {Header} from '../../components'
import {WebView} from 'react-native-webview'
import {useSelector} from 'react-redux'
import {ThemeFunctions} from '../../utils'
import {strings} from '../../strings'

const WebViewWrapper = (props: any) => {
  const {
    route: {params},
  } = props
  const {appTheme} = useSelector((state: any) => state.globalReducer)

  const onNavigationStateChange = (data: any) => {
    if (data.canGoBack) {
    }
  }

  return (
    <SafeAreaView
      style={[commonStyles.safeView, ThemeFunctions.setBackground(appTheme)]}>
      <Header title={params?.title ? strings(params.title) : ' '} />
      <WebView
        showsVerticalScrollIndicator={false}
        onNavigationStateChange={onNavigationStateChange}
        autoManageStatusBarEnabled={true}
        source={{uri: params.url}}
        scalesPageToFit
        cacheMode='LOAD_NO_CACHE'
        allowFileAccess={true}
        incognito={true}
        pullToRefreshEnabled={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
      />
    </SafeAreaView>
  )
}

export default WebViewWrapper
