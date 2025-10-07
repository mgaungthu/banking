import React from 'react'
import {View, ActivityIndicator} from 'react-native'

const InfiniteScrollFooter = ({loadingMore}) => {
  if (!loadingMore) return null

  return (
    <View
      style={{
        height: 20,
        marginTop: 10,
        marginBottom: 20,
      }}>
      <ActivityIndicator color='rgb(245,126,38)' size='large' />
    </View>
  )
}

export default InfiniteScrollFooter
