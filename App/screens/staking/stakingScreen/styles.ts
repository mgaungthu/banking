import {StyleSheet} from 'react-native';
import {t} from 'react-native-tailwindcss';
import {commonStyles} from '../../../globalstyles/styles';
import Colors from '../../../theme/Colors';
import fonts from '../../../theme/fonts';

const {shadow} = commonStyles;

export const infoCardStyle = StyleSheet.create({
  infoCardContainer: {
    ...shadow,
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    margin: 2,
  },

  infoCardContainerRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },

  infoCardContainerRowImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },

  infoCardContainerRowTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },

  infoCardContainerRowImage: {
    width: 10,
    height: 10,
  },

  statusCardLabel: {
    marginTop: 10,
  },

  statusCard: {
    ...shadow,
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginVertical: 5,
    marginBottom: 10,
    margin: 2,
  },

  statusCardContainer: {
    ...shadow,
    height: 40,
    width: '100%',
    flexDirection: 'row',
    borderRadius: 8,
    marginVertical: 5,
    marginBottom: 10,
    margin: 2,
  },

  statusCardLeft: {
    flex: 1,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderRightWidth: 1,
  },

  statusCardRight: {
    flex: 1,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },

  durationRow: {
    height: 30,
    justifyContent: 'space-between',
    marginVertical: 5,
    marginHorizontal: 5,
    flexDirection: 'row',
  },

  checkboxContainer: {
    height: 20,
    width: 20,
    padding: 0,
    margin: 0,
    marginLeft: 8,
    marginRight: 0,
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectorLeft: {
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
  },

  selectorRight: {
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
  },

  stakeCardDurationContainer: {
    flexDirection: 'row',
    flex: 1,
    height: 50,
    alignItems: 'center',
    overflow: 'scroll',
  },

  stakeCardDuration: {
    marginHorizontal: 4,
    height: 40,
    width: 50,
    padding: 5,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },

  balanceContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  stakeAmountContainer: {
    margin: 2,
    height: 50,
    flexDirection: 'row',
    ...shadow,
    borderRadius: 5,
    padding: 5,
    backgroundColor: 'red',
  },

  stakeAmountInput: {
    flex: 1,
    borderRightWidth: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },

  stakeAmountAction: {
    justifyContent: 'center',
    paddingHorizontal: 8,
  },

  poolInformationTitle: {
    marginTop: 5,
  },

  stakeButton: {
    marginVertical: 10,
  },

  check: {
    height: 20,
    width: 20,
    ...t.mR1,
  },

  stakingAgreementContainer: {
    flexDirection: 'row',
  },

  stakingAgreementCheck: {
    height: 22,
    width: 22,
    padding: 0,
    margin: 0,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  stakingAgreementText: {
    flex: 1,
  },

  linkText: {
    fontSize: 16,
    color: Colors.txtBlue,
    fontFamily: fonts.PoppinsRegular,
  },
});

export const scrollContainer = StyleSheet.create({
  scrollView: {
    padding: 10,
  },
});
