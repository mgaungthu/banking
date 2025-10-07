import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import {
  Input,
  DropDown,
  ThemeButton,
  LoadingSpinner,
  UiHeader,
  ThemeText,
} from '../../components';
import {strings} from '../../strings';
import {useSelector} from 'react-redux';
import {
  GenericFunctions,
  getItem,
  RegexExpression,
  ThemeFunctions,
} from '../../utils';
import {FormConstants} from '../../enums';
import {useForm} from 'react-hook-form';
import styles from './styles';
import QRCode from 'react-native-qrcode-svg';
import Space from '../../components/ui/Space';
import Colors from '../../theme/Colors';
import {convertToUsdPrice, roundFloatNumber} from '../../utils/AppFunctions';
import Title from '../../components/ui/pos/Title';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import InputPos from '../../components/forms/InputPos';
import {CustomModal} from '../../components';
import {Icon} from 'react-native-elements';
import Share from 'react-native-share';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {APIConstants, MapperConstants} from '../../constants';
import {makeRequest} from '../../services/ApiService';
import {showToast} from '../../utils/GenericUtils';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import {FundingActive} from '../../assets';

type QrModel = {
  amount?: string | number;
  uniqueId?: string;
  reference?: string;
  email?: string;
  currencyName?: string;
  isVat?: string;
  vatPercent?: string | number;
  vatText?: string;
  merchantAddress?: string;
  total: number;
  vatCalc: number;
  currencyId?: string;
};

const Pos = ({configData, loading}) => {
  const {userProfileData} = useSelector((state: any) => state.appReducer);
  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer);
  const currencys = useSelector(
    (state: any) => state.quickBuyReducer.fundsList,
  );
  const currencyInit = currencys?.map(el => el.name) || [];
  const currencyQuickBuy = useSelector(
    (state: any) => state.quickBuyReducer.fundsList,
  );

  const [isGenerateQr, setIsGenerateQr] = useState(false);

  const [vatPercent, setVatPercent] = useState<number>(0);
  const [vatCalc, setVatCalc] = useState<any>(0);
  const [total, setTotal] = useState<any>('0.0');
  const [currencyLabel, setcurrencyLabel] = useState('');

  const [qrGenerate, setQrGenetate] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const [linkQrCode, setLinkQrCode] = useState('');

  const [currencysArr, setCurrencyArr] = useState(currencyInit);

  const scrollViewRef = useRef(null);
  const referenceRef = useRef(null);
  const qrCodeRef: any = useRef(null);
  const modalToastRef: any = useRef(null);

  const {
    control,
    formState: {errors},
    setValue,
    handleSubmit,
    reset,
    setError,
    resetField,
  } = useForm();

  const generateQrCode = async data => {
    try {
      setIsGenerateQr(true);
      scrollViewRef.current.scrollToEnd({animated: true});
      const dataCurrency = currencys?.find(
        el => el.name === data.currency_label,
      );
      let dataGenerate: QrModel = {
        amount: data.amount,
        uniqueId: dataCurrency?.uniqueId,
        currencyId: dataCurrency?.currencyId,
        reference: data.reference,
        email: userProfileData.email,
        currencyName: data.currency_label,
        total,
        vatCalc,
      };
      if (configData) {
        dataGenerate.merchantAddress = configData.merchantAddress;
        dataGenerate.isVat = configData.isVat;
        dataGenerate.vatPercent = configData.isVat ? configData.vatPercent : '';
        dataGenerate.vatText = configData.isVat ? configData.vatText : '';
      }
      const response = await makeRequest(
        MapperConstants.ApiTypes.POST,
        APIConstants.ADD_DATA_PAYMENT,
        {},
        dataGenerate,
      );
      setIsGenerateQr(false);
      if (response.status === 200) {
        const jsonEncode = JSON.stringify(dataGenerate);
        setQrGenetate(jsonEncode);
        _toggleModalQrCode();
        setLinkQrCode(
          `https://globiance.page.link/?link=https://globiance.page.link/qr?id=${response.data.uniqueId}&apn=com.solheaven.android&isi=1584923932&ibi=com.globiance.iosapp&ofl=1`,
        );
      } else showToast(strings('globiance_pos'), response.message, 'error');
    } catch (error) {
      showToast(strings('globiance_pos'), 'Error', 'error');
    }
  };

  const changeAmount = data => {
    let amount = data.replace(',', '.') || 0;
    if (amount >= 0) {
      let isDecimal = RegexExpression.DECIMAL_REGEX.test(amount);
      if (!isDecimal && amount.substr(amount.length - 1) != '.') return;
    }
    amount = parseFloat(amount);
    let vatCalc = roundFloatNumber((amount / 100) * vatPercent, 12);
    setVatCalc(vatCalc || '0.0');
    setTotal(roundFloatNumber(amount + vatCalc, 12) || 0);
    setValue(FormConstants.Amount, data.replace(',', '.'));
  };

  const getItemConfig = async () => {
    const currencyName = currencys?.find(
      el => el.currencyId === configData?.currencyId,
    )?.name;
    if (currencyName) {
      setValue(FormConstants.Currency_Label, currencyName);
      setcurrencyLabel(currencyName);
    }
    setValue(FormConstants.Reference, configData?.reference);
    setVatPercent(configData?.isVat ? configData?.vatPercent || 0 : 0);
    setVatCalc('0.0');
    setTotal('0.0');
    setValue(FormConstants.Amount, '');
  };

  const styleResultContainer = [
    styles.resultContainer,
    {borderBottomColor: ThemeFunctions.customText(appTheme)},
  ];

  const _toggleModalQrCode = () => {
    setShowModal(state => !state);
  };

  const _shareQr = () => {
    try {
      Platform.OS === 'android' && _toggleModalQrCode();
      qrCodeRef.current.toDataURL(data => {
        const shareImageBase64 = {
          title: 'QR',
          message: 'GlobiancePOS QR code',
          url: `data:image/png;base64,${data}`,
        };
        Share.open(shareImageBase64);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const _copyLinkQr = () => {
    Clipboard.setString(linkQrCode);
    GenericFunctions.showModalToast(
      modalToastRef,
      strings('globiance_pos'),
      strings('copied'),
      'success',
    );
  };

  const _changeTextSearch = text => {
    setCurrencyArr(
      currencyInit.filter(item => item.includes(text.toUpperCase())),
    );
  };

  useEffect(() => {
    getItemConfig();
  }, [configData]);

  return (
    <ScrollView ref={scrollViewRef}>
      {loading ? (
        <>
          <Space height={20} />
          <LoadingSpinner
            color={ThemeFunctions.getColor(appColor)}
            size="small"
          />
        </>
      ) : (
        <>
          <View style={styles.formView}>
            <InputPos
              id={FormConstants.Reference}
              label={strings('reference')}
              autoCapitalize="sentences"
              placeholder="Input reference"
              reference={referenceRef}
              control={control}
              multiline={true}
              errors={errors}
              isFieldFilledBg={false}
              isRequired={true}
              inputStyle={{alignSelf: 'center'}}
              showDropDown={false}
              showTick={false}
            />
            <DropDown
              options={currencysArr}
              customHeight={180}
              customTextStyle={{textTransform: 'uppercase'}}
              showSearch={true}
              onChangeTextSearch={_changeTextSearch}
              onHide={() => setCurrencyArr(currencyInit)}
              updateValue={index => {
                setValue(FormConstants.Currency_Label, currencysArr[index]);
                setcurrencyLabel(currencysArr[index]);
                setCurrencyArr(currencyInit);
              }}
              renderSeparator={
                Platform.OS === 'ios'
                  ? () => (
                      <View
                        style={{
                          backgroundColor: '#d6d6d6',
                          height: 1,
                          bottom: 15,
                        }}></View>
                    )
                  : undefined
              }
              renderRowText={e => {
                const imageCurrency = currencyQuickBuy?.find(
                  el => el.name == e,
                )?.assetUrl;
                return (
                  <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
                    <Image
                      style={{
                        height: 20,
                        width: 20,
                        borderRadius: 10,
                        marginRight: 10,
                      }}
                      source={
                        imageCurrency ? {uri: imageCurrency} : FundingActive
                      }
                    />
                    <Text>{e}</Text>
                  </View>
                );
              }}>
              <InputPos
                id={FormConstants.Currency_Label}
                label={strings('currency_label')}
                control={control}
                errors={errors}
                placeholder={`${strings('select')}`}
                isFieldFilledBg={false}
                isRequired={true}
                dropdown={true}
                showTick={false}
              />
            </DropDown>
            <InputPos
              id={FormConstants.Amount}
              label={strings('amount')}
              pattern={RegexExpression.DECIMAL_REGEX}
              control={control}
              errors={errors}
              isFieldFilledBg={false}
              showDropDown={false}
              showTick={false}
              keyboardType="decimal-pad"
              placeholder={'Input amount'}
              isRequired={true}
              focusTo={referenceRef}
              onChangeVal={changeAmount}
            />
            <Space height={10} />
            <View style={styleResultContainer}>
              <Title>
                {strings('vat')} ({vatPercent}%)
              </Title>
              <Title>{vatCalc}</Title>
            </View>
            <View style={styleResultContainer}>
              <Title bold={true}>{strings('total')}</Title>
              <View>
                <Title bold={true}>
                  {total} {currencyLabel || ''}
                </Title>
                <ThemeText style={styles.textDollar}>
                  {convertToUsdPrice(currencyLabel, total.toString())} USD
                </ThemeText>
              </View>
            </View>
            <ThemeButton
              iconName="qrcode"
              iconType="font-awesome"
              text="generate_qr"
              onClickHandler={handleSubmit(generateQrCode)}
              styleText={{textTransform: 'none'}}
              loading={isGenerateQr}
            />
          </View>
          {qrGenerate && (
            <>
              <CustomModal
                visibility={showModal}
                onBackdropPress={_toggleModalQrCode}
                justify={true}>
                <SafeAreaView style={styles.modalQrCode}>
                  <Toast ref={modalToastRef} style={{zIndex: 999}} />
                  <View style={styles.headerModalQrContainer}>
                    <UiHeader
                      title="Share QR"
                      iconColor={Colors.dimGray}
                      showBack={false}
                      handleBack={_toggleModalQrCode}
                      titleStyle={{left: 20}}
                    />
                  </View>
                  <View style={[styles.wrapQr, {alignSelf: 'center'}]}>
                    <QRCode
                      size={300}
                      value={qrGenerate}
                      getRef={qrCodeRef}
                      quietZone={15}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={_shareQr}
                    style={styles.buttonShareQr}>
                    <Icon name="share" type="entypo" />
                    <Text style={styles.textShareQr}>Share image</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={_copyLinkQr}
                    style={styles.buttonShareQr}>
                    <Icon name="copy" type="feather" />
                    <Text style={styles.textShareQr}>Copy link</Text>
                  </TouchableOpacity>
                  <Text style={styles.textLinkDetail}>
                    Link will expire after 7 days
                  </Text>
                </SafeAreaView>
              </CustomModal>
            </>
          )}
        </>
      )}
      {Platform.OS === 'ios' && <KeyboardSpacer />}
    </ScrollView>
  );
};

export default Pos;
