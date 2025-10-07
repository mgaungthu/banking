import {StyleSheet} from 'react-native';
import {t} from 'react-native-tailwindcss';
import {commonStyles} from '../../globalstyles/styles';
import Colors from '../../theme/Colors';
import fonts from '../../theme/fonts';
import {SCREEN_WIDTH} from '../../utils';
import {isIOS, SCREEN_HEIGHT} from '../../utils/DeviceConfig';

export default StyleSheet.create({
  input: {
    borderBottomWidth: 2,
  },
  formView: {
    ...commonStyles.paddingHorizontalView,
  },
  qrCodeContainer: {
    ...commonStyles.justifyCenter,
    paddingTop: 25,
    paddingBottom: 50,
  },
  wrapQr: {
    padding: 10,
    backgroundColor: Colors.white,
  },
  logo: {
    height: 60,
    width: '74%',
    alignSelf: 'center',
    ...t.mB5,
  },
  upperCase: {
    ...t.uppercase,
  },
  tabContainer: {
    width: '100%',
    borderRadius: 16,
  },
  textTab: {
    fontSize: 16,
    fontWeight: '500',
    ...t.uppercase,
  },
  tabLabelActive: {
    fontFamily: fonts.PoppinsMedium,
    textTransform: 'capitalize',
    ...t.textWhite,
    ...t.textBase,
  },
  tabLabelInactive: {
    fontFamily: fonts.UrdwinDemi,
    color: Colors.grayBlue,
    ...t.textSm,
  },
  tabView: {
    width: SCREEN_WIDTH / 2,
    alignItems: 'center',
  },
  line: {
    width: SCREEN_WIDTH / 2 - 25,
    height: 2,
    top: 8,
  },
  tabInactive: {
    // borderBottomColor:Colors.borderBlue,
    borderBottomWidth: 2,
  },

  tabBarStyle: {
    backgroundColor: Colors.tabColor,
    elevation: 0,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 10}, // change this for more shadow
    // shadowOpacity: 0.4,
  },
  inputMultiline: {
    height: 80,
    justifyContent: 'flex-start',
    paddingTop: isIOS() ? 10 : 0,
  },
  enableVatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 8,
    ...commonStyles.shadow,
  },
  switch: {
    alignSelf: 'flex-start',
    marginLeft: 15,
    marginTop: 5,
  },
  titleDefault: {
    fontFamily: fonts.PoppinsRegular,
    alignSelf: 'flex-start',
    ...t.textBase,
    ...t.pY2,
  },
  resultContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  resultText: {
    fontFamily: fonts.PoppinsRegular,
    alignSelf: 'flex-start',
    ...t.textBase,
    ...t.pY2,
  },
  titleResultContainer: {
    paddingBottom: 2,
    marginBottom: 10,
  },
  resultTextBox: {
    backgroundColor: '#576097',
    height: 90,
    borderRadius: 6,
    padding: 5,
  },
  balanceContainer: {
    paddingHorizontal: 10,
    backgroundColor: Colors.cyan,
    borderRadius: 6,
    marginVertical: 15,
  },
  totalBalanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightHeader: {
    position: 'absolute',
    right: 15,
  },
  notEnoughtContainer: {
    backgroundColor: '#FDE9F1',
    borderRadius: 6,
    padding: 10,
    marginVertical: 15,
  },
  notEnoughtText: {
    textAlign: 'center',
    color: Colors.textColor,
  },
  actionnotEnought: {
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    color: Colors.pink,
    textTransform: 'capitalize',
  },
  titleSmall: {
    fontFamily: fonts.PoppinsRegular,
    alignSelf: 'flex-start',
    ...t.textBase,
    fontSize: 14,
  },
  checkboxViewContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  checkboxWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    margin: 0,
    padding: 0,
  },
  itemCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    bottom: 30,
  },
  errorVerified: {
    textAlign: 'center',
    color: Colors.gray,
    fontSize: 18,
  },
  filterHistoryContainer: {
    backgroundColor: Colors.tabColor,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleHistoryContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  textHistoryTitle: {
    fontFamily: fonts.PoppinsRegular,
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
  },
  contentHistoryContainer: {
    borderBottomWidth: 1,
    borderColor: '#3C3B60',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  rowContentHistory: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
    alignItems: 'center',
  },
  textHistoryDetail: {
    fontFamily: fonts.PoppinsRegular,
    ...t.textBase,
    fontSize: 14,
  },
  textHistoryDesc: {
    fontFamily: fonts.PoppinsRegular,
    ...t.textBase,
    fontSize: 12,
  },
  hrHistory: {
    height: 16,
    marginVertical: 15,
  },
  textHistorySmall: {
    fontFamily: fonts.PoppinsRegular,
    alignSelf: 'flex-end',
    ...t.textBase,
    ...t.pY2,
    fontSize: 12,
    textAlign: 'right',
    marginLeft: 5,
  },
  transactionContainer: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '60%',
    justifyContent: 'flex-end',
  },
  filterNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    paddingHorizontal: 15,
    borderRadius: 8,
    justifyContent: 'space-between',
  },
  textDollar: {
    fontFamily: fonts.PoppinsRegular,
    ...t.textBase,
    fontSize: 12,
    textAlign: 'right',
    flex: 1,
    bottom: 5,
  },
  imgHeader: {
    width: 170,
    position: 'absolute',
    right: SCREEN_HEIGHT / 8,
  },
  notEnoughtBalanceContainer: {
    backgroundColor: '#3F3E63',
    height: 45,
    width: '100%',
    marginTop: 15,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageCurrency: {
    height: 20,
    width: 20,
    borderRadius: 10,
    marginRight: 4,
  },
  currencyNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qrPayShowCameraContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textReferenceDetail: {
    flex: 1,
    maxWidth: '60%',
    textAlign: 'right',
  },
  modalQrCode: {
    backgroundColor: 'white',
    paddingTop: 30,
    paddingBottom: 50,
    height: '100%',
  },
  iconCloseModal: {
    alignSelf: 'flex-end',
    right: 20,
  },
  textShareQr: {
    fontFamily: fonts.PoppinsRegular,
    ...t.textBase,
    ...t.pY2,
    color: Colors.black,
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    marginLeft: 5,
  },
  headerModalQrContainer: {
    marginRight: 20,
  },
  buttonShareQr: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  textLinkDetail: {
    fontFamily: fonts.PoppinsRegular,
    color: Colors.black,
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  modal2FA: {
    backgroundColor: Colors.white,
    width: SCREEN_WIDTH,
    position: 'absolute',
    bottom: 0,
    ...t.pY4,
    ...t.pX4,
  },
  heading: {
    fontSize: 17,
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    ...t.textBlack,
    ...t.mB2,
  },
  closeBtn: {
    alignSelf: 'flex-end',
    ...t.justifyCenter,
    ...t.h8,
    ...t.w10,
  },
  iconExport: {
    position: 'absolute',
    right: 55,
  },
  tabStyle: {
    marginHorizontal: 15,
    marginTop: 2,
    ...commonStyles.shadow,
  },
  inputQr: {
    borderRadius: null,
    shadowColor: null,
    shadowOffset: {
      width: null,
      height: null,
    },
    shadowOpacity: null,
    shadowRadius: null,

    elevation: null,
    borderBottomWidth: 1,
    height: null,
    marginBottom: 10,
  },
});
