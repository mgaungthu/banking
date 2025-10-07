import {StyleSheet} from 'react-native';

const shadow = {
  borderRadius: 8,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,

  elevation: 2,
};

export const styles = StyleSheet.create({
  heading: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  title: {
    color: '#000',
    fontSize: 18,
    marginBottom: 5,
    fontWeight: '600',
  },
  titleContainer: {
    borderBottomColor: '#c4c4c4',
    borderBottomWidth: 1,
  },
  block: {
    minHeight: 90,
    padding: 20,
    marginHorizontal: 2,
    marginBottom: 15,
    borderRadius: 12,
    ...shadow,
  },
  dateText: {
    fontSize: 12,
  },
  text: {
    color: '#000',
    fontSize: 15,
  },
  boldText: {
    color: '#000',
    fontSize: 15,
    fontWeight: '500',
    marginRight: 5,
  },
  textContainer: {
    marginTop: 15,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 5,
    flexWrap: 'wrap',
  },
  headingLeftContainer: {
    flexDirection: 'row',
    maxWidth: '40%',
  },
  headingRightContainer: {
    justifyContent: 'center',
  },
  headingTokenInfo: {
    justifyContent: 'center',
  },
  tokenName: {
    fontSize: 22,
    color: '#000',
    marginBottom: 3,
    fontWeight: '500',
  },
  tokenSymbol: {
    fontSize: 16,
    color: '#000',
    marginBottom: 6,
  },
  description: {
    fontSize: 16,
    color: '#000',
  },
  headingImage: {
    width: 80,
    height: 80,
  },
  iconContainer: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  iconImageContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 2,
    marginLeft: 3,
    marginRight: 3,
  },
  iconImageText: {
    textAlign: 'center',
  },
  iconImage: {
    width: 18,
    height: 18,
    marginRight: 2,
  },
  audits: {
    flexDirection: 'row',
    marginBottom: 5,
    alignSelf: 'flex-end',
  },
  auditText: {
    color: '#fff',
    fontSize: 12,
  },
  audit: {
    backgroundColor: '#444444',
    color: '#fff',
    paddingHorizontal: 4,
    paddingVertical: 3,
    borderRadius: 4,
    marginLeft: 5,
  },
  socialNetworks: {
    flexDirection: 'row',
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginLeft: 3,
  },
  statusContainer: {
    width: 75,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 64,
    backgroundColor: '#52AA5E',
  },
  statusText: {
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 9,
    fontWeight: '400',
  },
});
