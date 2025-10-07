import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Switch,
  Text,
  Platform,
  TouchableOpacity,
  Dimensions,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {Header, Input, DropDown, ThemeButton} from '../../components';
import {strings} from '../../strings';
import {commonStyles} from '../../globalstyles/styles';
import {APIConstants, MapperConstants} from '../../constants';
import {useSelector} from 'react-redux';
import {getItem, RegexExpression, ThemeFunctions} from '../../utils';
import {FormConstants} from '../../enums';
import {useForm} from 'react-hook-form';
import styles from './styles';
import Colors from '../../theme/Colors';
import {showToast} from '../../utils/GenericUtils';
import {navigationRef} from '../../utils/Navigation';
import {makeDownloadRequest, makeRequest} from '../../services/ApiService';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Title from '../../components/ui/pos/Title';
import Space from '../../components/ui/Space';
import InputPos from '../../components/forms/InputPos';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
// import RNFetchBlob from 'react-native-blob-util'
import {PERMISSIONS, request} from 'react-native-permissions';
import Pdf from 'react-native-pdf';
//@ts-ignore
import {API_BASE_URL} from '@env';
import Share from 'react-native-share';

const PosHistoryExport = (props: any) => {
  const {userProfileData} = useSelector((state: any) => state.appReducer);
  const {appTheme} = useSelector((state: any) => state.globalReducer);

  const [fromDate, setFromDate] = useState(new Date());
  const [openFromDate, setOpenFromDate] = useState(false);

  const [toDate, setToDate] = useState(new Date());
  const [openToDate, setOpenToDate] = useState(false);

  const [path, setPath] = useState(null);
  const [isPress, setIsPress] = useState(null);

  const {token} = useSelector((state: any) => state.globalReducer.userdata);

  const {
    control,
    formState: {errors},
    setValue,
    handleSubmit,
    reset,
    setError,
  } = useForm();

  const actualDownload = async data => {
    try {
      const fromDate = moment(data.from_date, 'MM-DD-YYYY').format('MMDDYYYY');
      const endDate = moment(data.end_date, 'MM-DD-YYYY').format('MMDDYYYY');
      const date = new Date();
      const pdfName = `${Math.floor(
        date.getTime() + date.getSeconds() / 2,
      )}.pdf`;
      // const { dirs } = RNFetchBlob.fs;
      const dirToSave =
        Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
      const configfb = {
        fileCache: true,
        useDownloadManager: true,
        mediaScannable: true,
        title: pdfName,
        path: `${dirToSave}/${pdfName}`,
      };
      const configOptions = Platform.select({
        ios: {
          fileCache: configfb.fileCache,
          title: configfb.title,
          path: configfb.path,
          //@ts-ignore
          appendExt: 'pdf',
        },
        android: configfb,
      });
      setIsPress(true);

      // RNFetchBlob.config(configOptions)
      //     .fetch('POST', API_BASE_URL + APIConstants.EXPORT_HISTORY, {
      //         "authorization": token,
      //         'Content-Type': 'application/json'
      //     }, JSON.stringify({
      //         "from": fromDate,
      //         "to": endDate,
      //         "type": props.route.params?.type
      //     }))
      //     .then((res) => {
      //         if (Platform.OS === "ios") {
      //             RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64');
      //         }
      //         setIsPress(false)
      //         setPath(`file://${res.data}`)
      //     })
      //     .catch((e) => {
      //         setIsPress(true)
      //         console.log('The file saved to ERROR', e.message)
      //     });
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async data => {
    if (Platform.OS == 'ios') {
      actualDownload(data);
    } else {
      try {
        const granted = await request(
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        );
        if (granted) {
          actualDownload(data);
        } else {
          showToast(
            strings('globiance_pos'),
            'You need to give storage permission to download the file',
            'error',
          );
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const onExport = () => {
    Share.open({
      title: 'Globiance POS',
      message: 'POS History',
      url: path,
    });
  };

  useEffect(() => {}, []);

  return (
    <SafeAreaView
      style={[commonStyles.safeView, ThemeFunctions.setBackground(appTheme)]}>
      <Header title={strings('export history')} />
      <ScrollView nestedScrollEnabled={true}>
        <View style={styles.formView}>
          <TouchableOpacity onPress={() => setOpenFromDate(true)}>
            <InputPos
              id={FormConstants.FromDate}
              label={'From date'}
              control={control}
              errors={errors}
              placeholder={`${strings('select')}`}
              isFieldFilledBg={false}
              isRequired={true}
              dropdown={true}
              showTick={false}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setOpenToDate(true)}>
            <InputPos
              id={FormConstants.EndDate}
              label={'To date'}
              control={control}
              errors={errors}
              placeholder={`${strings('select')}`}
              isFieldFilledBg={false}
              isRequired={true}
              dropdown={true}
              showTick={false}
            />
          </TouchableOpacity>
          {path ? (
            <View style={{marginTop: 20}}>
              <Pdf
                source={{uri: path}}
                style={{height: 300}}
                fitPolicy={0}
                onError={error => {
                  console.log(error);
                }}
              />
              <ThemeButton text="Export Pdf" onClickHandler={onExport} />
            </View>
          ) : (
            <ThemeButton
              text="Preview"
              onClickHandler={handleSubmit(onSubmit)}
              loading={isPress}
            />
          )}
        </View>
        {Platform.OS === 'ios' && <KeyboardSpacer />}
      </ScrollView>
      <DatePicker
        modal
        open={openFromDate}
        date={fromDate}
        onConfirm={date => {
          setOpenFromDate(false);
          setFromDate(date);
          setValue(FormConstants.FromDate, moment(date).format('MM-DD-YYYY'));
          setPath(null);
        }}
        onCancel={() => {
          setOpenFromDate(false);
        }}
        mode="date"
      />
      <DatePicker
        modal
        open={openToDate}
        date={toDate}
        onConfirm={date => {
          setOpenToDate(false);
          setToDate(date);
          setValue(FormConstants.EndDate, moment(date).format('MM-DD-YYYY'));
          setPath(null);
        }}
        onCancel={() => {
          setOpenToDate(false);
        }}
        mode="date"
      />
    </SafeAreaView>
  );
};

export default PosHistoryExport;
