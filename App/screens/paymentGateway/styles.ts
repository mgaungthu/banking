import {StyleSheet} from 'react-native';
import {commonStyles} from '../../globalstyles/styles';
import {t} from 'react-native-tailwindcss';
import Colors from '../../theme/Colors';
import fonts from '../../theme/fonts';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../utils';

const shadow = {
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: -1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,

  elevation: -2,
};

export default StyleSheet.create({
  tabStyle: {
    marginHorizontal: 15,
    marginTop: 2,
    ...commonStyles.shadow,
  },
  imgHeader: {
    width: 170,
    position: 'absolute',
    right: SCREEN_HEIGHT / 8,
  },
  rightHeader: {
    position: 'absolute',
    right: 15,
  },

  //

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
    width: SCREEN_WIDTH / 3 - 25,
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
  //
  storeDetailContainer: {
    flex: 1,
  },
  storeDetailCheckoutContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
    flexDirection: 'row-reverse',
  },
  storeDetailInfoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingTop: 25,
  },
  storeDetailInfoLogo: {
    width: 180,
    height: 180,
    borderRadius: 90,
  },

  storeDetailInfoStoreNameContainer: {
    paddingVertical: 10,
  },

  storeDetailInfoStoreNameText: {
    fontSize: 20,
  },

  payAmountContainer: {
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.currencyGreen,
  },

  payAmountText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    textTransform: 'uppercase',
  },

  selectContainer: {
    padding: 10,
  },

  sectionHeader: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },

  hideSmallSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  hideSmallSectionLabel: {},
  hideSmallSectionSwitch: {
    paddingHorizontal: 10,
    paddingLeft: 5,
  },

  sectionHeaderRight: {},

  selectContainerWrapper: {
    height: 270,
  },

  currencyContainer: {
    height: 65,
    flex: 1,
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'space-between',

    ...commonStyles.shadow,
    borderRadius: 5,

    ...t.mL1,
    ...t.mR1,
  },

  currencyTag: {
    width: 10,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },

  currencyContainerLeft: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    marginLeft: 5,
  },
  currencyContainerRight: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
  },

  currencyLogoWrapper: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currencyLogo: {
    width: 40,
    height: 40,
  },

  currencyNameWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 10,
  },

  confirmContainer: {
    justifyContent: 'center',
    ...shadow,
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
  },

  confirmContainerExp: {
    justifyContent: 'center',
    ...shadow,
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
  },

  confirmPaymentDetail: {
    height: 50,
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  paymentDetailMoreDetail: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 20,
  },

  paymentDetailMoreDetailRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  confirmBtn: {
    height: 50,
    marginVertical: 5,
    marginHorizontal: 10,
    marginBottom: 15,
  },

  expiresSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  // history

  historyItemCard: {
    marginHorizontal: 15,
    borderRadius: 16,
    ...t.mB4,
    padding: 10,
  },

  historyItemCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingVertical: 2,
  },

  historyWrapper: {
    paddingVertical: 10,
  },

  copyBtn: {
    width: 30,
    borderLeftWidth: 1,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadMoreContainer: {
    margin: 5,
    justifyContent: 'center',
    width: '100%',
  },

  loadMoreText: {
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
