import {StyleSheet} from 'react-native';
import {t} from 'react-native-tailwindcss';
import fonts from '../../../theme/fonts';
import Colors from '../../../theme/Colors';
import {SCREEN_WIDTH} from '../../../utils';
import {commonStyles} from '../../../globalstyles/styles';

const {shadow} = commonStyles;
export const headerStyle = StyleSheet.create({
  statsCard: {
    width: '99%',
    height: 100,
    borderRadius: 10,

    display: 'flex',
    justifyContent: 'space-evenly',
    ...shadow,
  },

  statsCardRowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  headerContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    position: 'absolute',
  },

  searchContainer: {
    display: 'flex',
    width: '100%',
    height: 70,
    marginTop: 10,
    borderRadius: 10,
  },

  stakingTypeContainer: {
    height: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 15,
  },

  collapsedHeaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  collapsedHeaderContainerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 5,
    marginTop: 5,
    height: 35,
  },
  collapsedHeaderContainerRowLeft: {
    alignItems: 'flex-start',
    flex: 1,
  },
  collapsedHeaderContainerRowRight: {
    alignItems: 'flex-end',
    flex: 1,
  },
});

export const containerStyle = StyleSheet.create({
  container: {
    flex: 2,
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

export const unstakeScreen = StyleSheet.create({
  screenContainer: {
    padding: 10,
  },

  stakeAmountContainer: {
    margin: 2,
    height: 50,
    flexDirection: 'row',
    ...shadow,
    borderRadius: 5,
    padding: 5,
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

  infoCardContainer: {
    ...shadow,
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    margin: 2,
  },

  infoCardContainerRow: {
    flexDirection: 'row',
    marginBottom: 10,
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

  check: {
    height: 20,
    width: 20,
    ...t.mR1,
  },

  unstakeButton: {
    marginVertical: 10,
  },
});

export const redeemScreen = StyleSheet.create({
  mainContainer: {flex: 1},
  tabContainer: {width: '100%', borderRadius: 8},
  tabInactive: {
    // borderBottomColor:Colors.borderBlue,
    borderBottomWidth: 2,
  },
  tabStyle: {
    marginHorizontal: 15,
    marginTop: 2,
    ...shadow,
    borderRadius: 8,
  },
  textTab: {
    fontSize: 16,
    fontWeight: '500',
    ...t.capitalize,
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

  tabBody: {
    padding: 20,
    justifyContent: 'space-between',
    flex: 1,
  },

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
    alignItems: 'center',
  },

  infoCardContainerRowImageContainer: {
    margin: 5,
    marginTop: 8,
  },

  infoCardContainerRowTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },

  infoCardContainerRowTextLeft: {
    marginRight: 10,
  },

  infoCardContainerRowTextRight: {
    flex: 1,
  },

  infoCardContainerRowImage: {
    width: 10,
    height: 10,
  },

  releaseBreakdownContainer: {
    marginVertical: 20,
  },
});

export const redeemAllStyle = StyleSheet.create({
  container: {
    padding: 8,
    display: 'flex',
    borderTopWidth: 1,

    alignItems: 'center',
  },
  redeemAllBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,

    borderRadius: 8,
  },
});

export const poolCard = StyleSheet.create({
  container: {
    padding: 15,
    display: 'flex',
    borderRadius: 10,
    margin: 8,
    ...shadow,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  left: {
    alignItems: 'flex-start',
    marginRight: 10,
  },
  right: {
    alignItems: 'flex-end',
    flex: 1,
  },

  unstakeButtonContainer: {
    padding: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },

  redeeemButtonContainer: {
    padding: 10,
    flex: 1,
    borderRadius: 5,
    marginLeft: 5,
  },

  buttonText: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: 'white',
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
});
