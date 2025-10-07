import React from 'react'
import {ActivityIndicator} from 'react-native'

const LoadingSpinner = ({color, size}) => {
  return <ActivityIndicator size={size} color={color} />
}

export default LoadingSpinner
