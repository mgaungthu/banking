import {openUrl} from './GenericUtils';
import {setItem, getItem, removeItem} from './StorageManager';
import {
  deviceInfo,
  StatusBarHeight,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  setStatusBar,
  isIPhoneX,
  hasSafeView,
  // OS,
  deviceName,
} from './DeviceConfig';
import {navigate, replace, reset, goBack, jumpToAct} from './Navigation';
import * as RegexExpression from './Regex';
import * as GenericFunctions from './GenericUtils';
import * as AppFunctions from './AppFunctions';
import * as StorageManager from './StorageManager';
import * as ThemeFunctions from './ThemeFunctions';

export {
  AppFunctions,
  setItem,
  getItem,
  removeItem,
  deviceInfo,
  StatusBarHeight,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  setStatusBar,
  hasSafeView,
  isIPhoneX,
  // OS,
  openUrl,
  navigate,
  replace,
  reset,
  goBack,
  RegexExpression,
  GenericFunctions,
  jumpToAct,
  StorageManager,
  ThemeFunctions,
  deviceName,
};
