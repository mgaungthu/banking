import React from 'react'
import {FlatList} from 'react-native'
import {securityStyles} from '../account/styles'
import {Header} from '../../components'
import {strings} from '../../strings'
import {DefaultArray, MapperConstants} from '../../constants'
import RowItem from './GbexRow'

const Gbex = (props: any) => {
  const isBackButton = () => {
    return props?.route?.params?.fromScreen
      ? MapperConstants.StatusMapper.enable
      : MapperConstants.StatusMapper.disable
  }
  return (
    <>
      <Header title={strings('buy_gbex')} showBack={isBackButton()} />
      <FlatList
        data={DefaultArray.gbexArray}
        initialNumToRender={10}
        contentContainerStyle={securityStyles.list}
        renderItem={({item}) => <RowItem res={item} />}
        keyExtractor={item => item?.id?.toString()}
      />
    </>
  )
}

export default Gbex
