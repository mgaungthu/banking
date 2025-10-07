import {Linking, Alert} from 'react-native';
import Toast from 'react-native-toast-message';
import {strings} from '../strings';
import {configureStore} from '../store/StoreManager';
import {GlobalActions, AuthActions} from '../store';
import {navigate} from './Navigation';
import {Screen} from '../enums';
import {setItem} from './StorageManager';
import {StorageManager} from './index';

let alertExist = {
  value: true,
};

export function openUrl(value: string) {
  Linking.openURL(value);
}

export const convertToFormdata = (data: any) => {
  let newFormData = new FormData();
  Object.keys(data).map(res => {
    newFormData.append(res, data[res]);
  });
  return newFormData;
};
export const showModalToast = (
  modalRef: any,
  title: string,
  msg: string,
  type: string,
) => {
  if (title && modalRef && modalRef.current) {
    modalRef.current.show({
      type: type || 'info',
      position: 'top',
      text1: title,
      text2: msg,
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
      onShow: () => {},
      onHide: () => {},
      onPress: () => {
        modalRef.current.hide();
      },
    });
  }
};

export const showToast = (title: string, msg: string, type: string) => {
  Toast.show({
    type: type || 'info',
    position: 'top',
    text1: title,
    text2: msg,
    visibilityTime: 2000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
    onShow: () => {},
    onHide: () => {},
    onPress: () => {},
  });
};

export const sessionExpired = (msg: string) => {
  const {store} = configureStore();

  if (alertExist.value) {
    Alert.alert(
      strings('app'),
      msg,
      [
        {
          text: strings('ok'),
          onPress: async () => {
            await store.dispatch(GlobalActions.updateUserdata(null));
            await store.dispatch(AuthActions.updateLoginResponse({}));
            await setItem('tfa_status', null);
            await StorageManager.resetCredentials();
            navigate(Screen.Auth);
            alertExist.value = false;
          },
        },
      ],
      {cancelable: false},
    );
  }
};

export const infoAlert = (title: string, msg: string) => {
  Alert.alert(
    title,
    msg,
    [
      {
        text: strings('ok'),
        onPress: async () => {},
      },
    ],

    {cancelable: false},
  );
};
