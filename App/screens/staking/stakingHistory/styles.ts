import {StyleSheet} from 'react-native';
import {t} from 'react-native-tailwindcss';
import {commonStyles} from '../../../globalstyles/styles';

const {shadow} = commonStyles;

export const stakingHistory = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 10,
    width: '100%',
    position: 'absolute',
  },

  headerCollapsedContainer: {
    width: '100%',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    overflow: 'hidden',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  headerExpandedContainer: {
    width: '100%',
    marginVertical: 10,
    alignItems: 'center',
    overflow: 'hidden',
    justifyContent: 'space-evenly',
  },

  headerExpandedContainerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 5,
    marginTop: 5,
    height: 35,
  },

  headerExpandedContainerRowLast: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 5,
  },

  headerExpandedContainerLast: {
    alignItems: 'center',
    width: '50%',
    padding: 2,
  },

  headerExpandedContainerLeft: {
    alignItems: 'flex-start',
  },

  headerExpandedContainerRight: {
    alignItems: 'flex-end',
    flex: 1,
  },

  headerCollapsedContainerLeft: {
    alignItems: 'flex-start',
    flex: 1,
    height: 40,
  },
  headerCollapsedContainerRight: {
    alignItems: 'flex-end',
    flex: 1,
    height: 40,
  },

  bodyContainer: {
    padding: 10,
    flex: 2,
  },

  historyCard: {
    padding: 15,
    display: 'flex',
    borderRadius: 10,
    margin: 8,
    ...shadow,
  },
  historyCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 13,
  },

  historyCardRowLeft: {
    alignItems: 'flex-start',
  },

  historyCardRowRight: {
    alignItems: 'flex-end',
  },

  stakingTypeContainer: {
    height: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 15,
  },

  resetButton: {
    padding: 10,
    backgroundColor: 'gray',
    width: '90%',
    borderRadius: 5,
  },

  submitButton: {
    padding: 10,
    width: '90%',
    borderRadius: 5,
  },

  buttonText: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: 'white',
    fontSize: 14,
  },

  check: {
    height: 20,
    width: 20,
    ...t.mR1,
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
