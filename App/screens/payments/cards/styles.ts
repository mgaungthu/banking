import {StyleSheet} from 'react-native';
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
    marginTop: 20,
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

export const ibansStyle = StyleSheet.create({
  card: {
    paddingTop: 20,
    padding: 15,
    display: 'flex',
    marginVertical: 8,
    ...shadow,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  rowLeft: {
    alignItems: 'flex-start',
  },

  rowRight: {
    alignItems: 'flex-end',
  },
});
