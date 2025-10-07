import {StyleSheet} from 'react-native';


const shadow= {
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    
    elevation: 2,
  }
  

export const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  searchBar: {
    marginVertical:10,
    height: 40,
  },
  statusButton: {
    height: '100%',
    width: 100,
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  statusButtonTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  list: {
    paddingHorizontal: 16,
    backgroundColor: '#000',
    minHeight: '100%',
  },
  emptyComponent: {
    padding: 20,
    borderRadius: 5,
    ...shadow
  },
  noTokenComponent: {
    marginHorizontal:16,
    padding: 20,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    ...shadow
  },
  noTokenIcon: {
    alignSelf: 'center',
    width: 70,
    height: 70,
    marginVertical:20
  },
  noTokenText: {
    textAlign: 'center',
  },

  allowAccessContainer: {
    padding: 10,
    justifyContent:"center"
  }
});
