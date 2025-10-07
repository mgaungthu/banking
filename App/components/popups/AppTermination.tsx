import React from 'react'
import {MapperConstants} from '../../constants'
import CustomModal from "../hoc/CustomModal"
import ThemeButton from "../ui/ThemeButton"
import {View, Text, BackHandler} from 'react-native'
import {appStyles as styles} from '../wrapper/styles'
import {strings} from '../../strings'
import {commonStyles, rtlStyles} from '../../globalstyles/styles'
import {useSelector} from 'react-redux'

const AppTermination = ({
  isVisible,
  setIsVisible,
  showCancel = false,
  msg,
  handleOK,
}: any) => {
  const {isRtlApproach} = useSelector((state: any) => state.globalReducer)

  const handleOkPress = () => {
    setIsVisible(MapperConstants.StatusMapper.disable)
    handleOK ? handleOK() : BackHandler.exitApp()
  }

  const handleCancelPress = () => {
    setIsVisible(MapperConstants.StatusMapper.disable)
  }

  return (
    <>
      <CustomModal visibility={isVisible}>
        <View style={styles.popup}>
          <Text style={styles.title}>{strings('warning')}</Text>
          <Text style={styles.msg}>{strings(msg)}</Text>
          <View
            style={[
              styles.btn,
              commonStyles.rowItem,
              isRtlApproach ? rtlStyles.reverseRow : {},
            ]}>
            <View style={[styles.btnStyle]}>
              <ThemeButton
                text='ok'
                onClickHandler={handleOkPress}
                loading={false}
                isModal={MapperConstants.StatusMapper.enable}
              />
            </View>
            {showCancel && (
              <>
                <View style={{width: 10}} />
                <View style={styles.btnStyle}>
                  <ThemeButton
                    text='cancel'
                    onClickHandler={handleCancelPress}
                    loading={false}
                    isModal={MapperConstants.StatusMapper.enable}
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </CustomModal>
    </>
  )
}

export default AppTermination
