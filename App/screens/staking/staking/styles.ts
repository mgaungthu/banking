import {StyleSheet} from 'react-native';
import {t} from 'react-native-tailwindcss';
import {isIOS} from '../../../utils/DeviceConfig';
import Colors from '../../../theme/Colors';
import {commonStyles} from '../../../globalstyles/styles';

const {shadow} = commonStyles;

export const headerStyle = StyleSheet.create({
  statsCard: {
    width: '99%',
    height: 100,
    borderRadius: 10,

    display: 'flex',
    justifyContent: 'space-evenly',
    padding: 10,
    margin: 8,
    ...shadow,
  },

  statsCardRowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  headerContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 10,
    width: '100%',
    position: 'absolute',
  },

  selectorContainer: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },

  selectorLeft: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 40,
  },

  selectorRight: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 40,
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

  checkboxContainer: {
    height: 40,
    width: 30,
    padding: 0,
    margin: 0,
    marginLeft: 0,
    marginRight: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const containerStyle = StyleSheet.create({
  container: {
    flex: 2,
  },
});

export const stakeCardStyle = StyleSheet.create({
  stakeCardContainer: {
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    margin: 8,
    borderRadius: 10,
    ...shadow,
  },

  stakeCardTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginVertical: 5,
  },

  stakeCardPillCont: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  stakeCardTitleTicker: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  stakeCardTitleStatus: {
    padding: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
    justifyContent: 'center',
    marginLeft: 5,
  },

  stakeCardTitleImage: {
    width: 24,
    height: 24,
  },

  stakeCardTitleText: {
    fontSize: 16,
    marginLeft: 5,
  },

  stakeCardDetails: {
    flexDirection: 'row',
    marginVertical: 5,
  },

  stakeCardDetailsApy: {
    width: '50%',
  },
  stakeCardDetailsReward: {
    width: '50%',
  },

  stakeCardDetailsRewardToken: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  stakeCardDetailsRewardImage: {
    width: 20,
    height: 20,
    marginRight: 2,
  },

  stakeCardDetailsRewardTokenTicker: {
    fontSize: 18,
    marginLeft: 2,
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

  stakeCardBtnContainer: {
    width: '100%',
    padding: 0,
    paddingVertical: 0,
    marginTop: 8,
    borderRadius: 10,
  },

  stakeCardBtn: {
    marginVertical: 10,
  },
});
