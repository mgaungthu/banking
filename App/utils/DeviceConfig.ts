import {
  Platform,
  Dimensions,
  StatusBar,
  PlatformIOSStatic,
  PlatformAndroidStatic,
  PlatformWindowsOSStatic,
  PlatformMacOSStatic,
  PlatformWebStatic,
} from 'react-native'
import DeviceInfo from 'react-native-device-info'
import {PlatformType} from '../enums'

const X_WIDTH = 375
const X_HEIGHT = 812
const XSMAX_WIDTH = 414
const XSMAX_HEIGHT = 896

export const SCREEN_WIDTH = Dimensions.get('window').width
export const SCREEN_HEIGHT = Dimensions.get('window').height

function isIPhone (
  platform:
    | PlatformIOSStatic
    | PlatformAndroidStatic
    | PlatformWindowsOSStatic
    | PlatformMacOSStatic
    | PlatformWebStatic,
): platform is PlatformIOSStatic {
  return platform.OS === 'ios'
}

export const isIPhoneX = () =>
  isIPhone(Platform) && !Platform.isPad && !Platform.isTVOS
    ? (SCREEN_WIDTH === X_WIDTH && SCREEN_HEIGHT === X_HEIGHT) ||
      (SCREEN_WIDTH === XSMAX_WIDTH && SCREEN_HEIGHT === XSMAX_HEIGHT)
    : false

export const StatusBarHeight = StatusBar.currentHeight
export const hasSafeView = DeviceInfo.hasNotch()

export const setStatusBar = (val: boolean) => {
  StatusBar.setHidden(val)
}

export const deviceName = async () => {
  const name = await DeviceInfo.getDeviceName()
  return name
}

export const OS = Platform.OS

export const isIOS = () => {
  return Platform.OS === PlatformType.IOS
}
export const deviceInfo = () => {
  const deviceDetail = {
    appVersion: DeviceInfo.getReadableVersion(), // installed app version
    buildNumber: DeviceInfo.getBuildNumber(), // app build number
    osVersion: DeviceInfo.getSystemVersion(), // OS version
    uniqueId: DeviceInfo.getUniqueId(), // device unique id,
    bundleId: DeviceInfo.getBundleId(), // app bundle id,
    deviceType: isIOS() ? '2' : '1',
  }
  return deviceDetail
}
