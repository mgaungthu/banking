import {StyleSheet, useWindowDimensions} from 'react-native';
import Colors from '../../theme/Colors';
import fonts from '../../theme/fonts';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../utils';
import {t} from 'react-native-tailwindcss';
import {commonStyles} from '../../globalstyles/styles';

const calculateColumnWidth = (numberOfColumns, margin) => {
  // Calculate column width by dividing available width by the number of columns
  const totalMargin = margin * (numberOfColumns - 1); // Total space taken by margins
  return (SCREEN_WIDTH - totalMargin) / numberOfColumns;
};

const numberOfColumns = 4;
const margin = 5; // Margin between columns
const colWidth = calculateColumnWidth(numberOfColumns, margin);

export const homeStyles = StyleSheet.create({
  custom: {
    width: SCREEN_WIDTH * 0.95,
    marginTop: 10,
    marginRight: 5,
    marginLeft: 5,
    ...commonStyles.shadow,
    marginBottom: 2,
  },
  upcomingPlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: SCREEN_WIDTH * 0.9,
  },
  textError: {
    fontSize: 18,
    fontFamily: fonts.UrdwinDemi,
    marginHorizontal: 10,
    textAlign: 'center',
    marginTop: 6,
  },
  text: {width: 100, height: 8, ...t.mB1},
  containerView: {
    backgroundColor: Colors.themeColor,
    flex: 1,
  },
  profile: {
    height: 25,
    width: 25,
  },
  moreInfo: {
    height: 26,
    width: 26,
  },
  moreInfoContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
    padding: 2,
    transform: [{translateX: 1}, {translateY: -1}],

    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 5,

    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,

    elevation: 2,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  logo: {
    width: 100,
    height: 40,
  },
  profileBtn: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    ...commonStyles.shadow,
  },
  card: {
    paddingHorizontal: 6,
    marginBottom: 15,
  },
  tabCard: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  announcement: {
    fontSize: 15,
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    textTransform: 'uppercase',
    paddingLeft: 6,
  },
  carouselCard2: {
    backgroundColor: Colors.white,
    marginVertical: 8,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    ...commonStyles.shadow,
  },
  carouselCard: {
    backgroundColor: Colors.white,
    borderRadius: 6,
  },
  carouselCard1: {
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  carouselImg1: {
    height: 200,
    resizeMode: 'cover',
    width: '100%',
    borderRadius: 6,
  },
  carouselImgView: {
    height: 220,
    width: '100%',
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
  },
  carouselImg: {
    height: 180,
    resizeMode: 'cover',
    width: '100%',
    borderRadius: 6,
  },
  bottomView: {
    padding: 10,
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },

  bottomView1: {
    // position: 'absolute',
    // bottom: 0,
    zIndex: 999,
    backgroundColor: 'rgba(255,255,255,0.9)',
    width: SCREEN_WIDTH * 0.9,
    borderBottomEndRadius: 6,
    borderBottomStartRadius: 6,
    padding: 6,
  },
  carouselHeading: {
    fontSize: 21,
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    marginBottom: 2,
    color: '#fff',
    textAlign: 'center',
  },
  carouselText: {
    fontSize: 12,
    fontFamily: fonts.PoppinsRegular,
  },
  tabIcon: {
    height: SCREEN_HEIGHT * 0.05,
    width: SCREEN_WIDTH * 0.08,
  },
  tabText: {
    fontSize: 12,
    fontFamily: fonts.PoppinsRegular,
    textTransform: 'capitalize',
  },
  tab: {
    flex: 1,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
    borderRadius: 6,
  },
  textHeader: {
    fontSize: 24,
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
  },
  balanceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBalance: {
    fontSize: 26,
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'heavy',
    marginVertical: 4,
  },
  iconImage: {
    width: 58,
    height: 58,
  },
  iconImageContainer: {
    // paddingHorizontal: 18,
    // paddingVertical: 16,
    // width: 90,
    // marginHorizontal: 10,
    width: colWidth,
    marginVertical: 10,
    // ...commonStyles.shadow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textIcon: {
    marginTop: 10,
    textAlign: 'center',
  },
  pagination: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export const marketListStyles = StyleSheet.create({
  tabContainer: {
    width: '100%',
    borderRadius: 8,
  },
  tabStyle: {
    marginHorizontal: 10,
    marginTop: 2,
    ...commonStyles.shadow,
  },
  tabView: {
    width: SCREEN_WIDTH / 2,
    alignItems: 'center',
  },
  line: {
    width: SCREEN_WIDTH / 2 - 20,
    height: 2,
    top: 8,
  },
  textTab: {
    fontSize: 16,
    fontWeight: '500',
    ...t.uppercase,
  },
  list: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  swipeContainer: {
    paddingRight: 10,
    paddingLeft: 5,
  },
  swipeButton: {
    width: 60,
    height: 60,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    ...commonStyles.shadow,
  },
  placeholder: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: 26,
    textAlign: 'center',
    paddingTop: '10%',
  },
});
