import React from 'react'
import { View, FlatList } from 'react-native'
import { tickerStyles as styles, tickerRowStyles } from './styles'
import { commonStyles, rtlStyles } from '../../globalstyles/styles'
import { ThemeFunctions } from '../../utils'
import { useSelector } from 'react-redux'

const Shimmer = () => {
  const { isRtlApproach, appTheme } = useSelector(
    (state: any) => state.globalReducer,
  )
  const array = new Array(20).fill(Math.random());
  const ListItem = () => {
    return (
      <View
        style={[
          styles.card,
          ThemeFunctions.getTickerStripColor(appTheme, ''),
          isRtlApproach ? rtlStyles.reverseRow : '',
        ]}>
        <View style={[tickerRowStyles.col1]}>
          <View style={commonStyles.rowItem}>
            <View
              style={[
                styles.imgView,
                ThemeFunctions.bgImgColor(appTheme),
              ]}></View>
            <View>
              <View
                style={{
                  ...tickerRowStyles.shimmer,
                  ...ThemeFunctions.bgImgColor(appTheme),
                }}></View>
              <View
                style={{
                  ...tickerRowStyles.shimmer,
                  ...ThemeFunctions.bgImgColor(appTheme),
                }}></View>
            </View>
          </View>
        </View>
        <View style={[tickerRowStyles.col2, { marginLeft: '12%' }]}>
          <View
            style={{
              ...tickerRowStyles.shimmer,
              ...ThemeFunctions.bgImgColor(appTheme),
            }}
          />
        </View>
      </View>
    )
  }
  return (
    <FlatList
      data={array}
      initialNumToRender={10}
      contentContainerStyle={[styles.list]}
      renderItem={({ item }) => <ListItem />}
      keyExtractor={item => Math.random()?.toString()}
    />
  )
}

export default Shimmer
