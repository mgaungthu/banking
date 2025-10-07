import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, useWindowDimensions, Text, TouchableOpacity } from 'react-native'
import { Header, ImageContainer } from '../../components'
import { strings } from '../../strings'
import { commonStyles } from '../../globalstyles/styles'
import { APIConstants, DefaultArray, MapperConstants } from '../../constants'
import { useSelector } from 'react-redux'
import { navigate, ThemeFunctions } from '../../utils'
import * as Images from '../../assets'
import { AppColor, Screen } from '../../enums'
import styles from './styles';
import { TabView, TabBar } from 'react-native-tab-view'
import Pos from './Pos'
import PosHistory from './PosHistory'
import { rapunzelTheme } from '../../theme/Colors'
import { Icon } from 'react-native-elements'
import Colors from '../../theme/Colors'
import { makeGetRequest, makeRequest } from '../../services/ApiService'
import { showToast } from '../../utils/GenericUtils'

const GlobiancePos = (props: any) => {
    const { appTheme, appColor } = useSelector((state: any) => state.globalReducer)

    const [configData, setConfigData] = useState({});
    const [isLoading, setIsLoading] = useState(true)

    const [index, setIndex] = useState(0)

    const [routes] = useState([
        { key: 'pos', title: strings('pos') },
        { key: 'history', title: strings('history') },
    ])

    const renderScene = ({ route: { key } }) => {
        switch (key) {
            case 'history':
                return <PosHistory />
        }
        return <Pos configData={configData} loading={isLoading} />
    }

    const handleIndexChange = (index: number) => {
        setIndex(index)
    }

    const navigateConfig = () => {
        navigate(Screen.PosConfig, { configData, onSave: setConfigData })
    }

    const getItemConfig = async () => {
        try {
            const response = await makeGetRequest(APIConstants.GET_CONFIG_PAYMENT)
            setIsLoading(false);
            if (response.status === 200) {
                setIsLoading(false);
                const configItem = response.data;
                setConfigData(configItem);
            }
            else {
                showToast(strings('globiance_pos'), response.message, 'error')
            }
        } catch (error) {
            setIsLoading(false);
            showToast(strings('globiance_pos'), 'Error', 'error')
        }
    }

    const navigateExport = () => {
        navigate(Screen.PosHistoryExport, { type: 0 })
    }

    const _getLogo = () => {
        switch (appColor) {
            case AppColor.pink:
                return Images.logo_pink
            case AppColor.green:
                return Images.logo_green
        }
        return Images.logo_black
    }

    useEffect(() => {
        getItemConfig();
    }, []);

    return (
        <SafeAreaView
            style={[commonStyles.safeView, ThemeFunctions.setBackground(appTheme)]}>
            <Header isImg={true} imgUrl={_getLogo()}
                imgStyle={styles.imgHeader}
                right={
                    <>
                        <TouchableOpacity style={styles.rightHeader} onPress={navigateConfig}>
                            <Icon
                                type='feather'
                                name='settings'
                                color={ThemeFunctions.getCurrentTextColor(appTheme)}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconExport} onPress={navigateExport}>
                            <Icon
                                type='foundation'
                                name='page-export'
                                color={ThemeFunctions.getCurrentTextColor(appTheme)}
                            />
                        </TouchableOpacity>
                    </>
                }
            />
            <View style={{ flex: 1 }}>
                <TabView
                    lazy
                    tabBarPosition='top'
                    navigationState={{
                        index,
                        routes,
                    }}
                    renderScene={renderScene}
                    onIndexChange={index => handleIndexChange(index)}
                    initialLayout={{ width: useWindowDimensions().width }}
                    renderTabBar={props => (
                        <TabBar
                            bounces={true}
                            scrollEnabled={true}
                            indicatorStyle={ThemeFunctions.setBackground(appTheme)}
                            contentContainerStyle={[
                                styles.tabContainer,
                                { backgroundColor: ThemeFunctions.getTabBgColor(appTheme) }
                            ]}
                            onTabLongPress={({ route: { key } }) => {
                                props.jumpTo(key)
                            }}
                            {...props}
                            style={[
                                ThemeFunctions.setBackground(appTheme),
                                styles.tabStyle
                            ]}
                            renderLabel={({ route, focused, color }) => (
                                <View style={styles.tabView}>
                                    <Text
                                        adjustsFontSizeToFit={true}
                                        style={[
                                            styles.textTab,
                                            focused ? ThemeFunctions.textColor(appTheme) : { color: ThemeFunctions.customText(appTheme) }
                                        ]}>
                                        {route?.title}
                                    </Text>
                                    <View style={
                                        focused && [
                                            styles.line,
                                            { backgroundColor: ThemeFunctions.getColor(appColor) }
                                        ]
                                    }
                                    />
                                </View>
                            )}
                        />
                    )}
                />
            </View>
        </SafeAreaView>
    )
}

export default GlobiancePos
