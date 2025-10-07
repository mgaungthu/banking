import React, { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

import { ImageContainer, SearchBar } from '../../../components'
import { strings } from '../../../strings'
import { walletStyles as styles, balanceStyles } from '../styles'
import { Switch } from 'react-native-paper'
import BalanceList from './BalanceList'
import DepositAddress from '../deposits/DepositAddress'
import {
  QuickBuyActions,
  GlobalActions,
  GbexActions,
  WalletActions,
} from '../../../store'
import {useDispatch, useSelector} from 'react-redux'
import {AppConstants, MapperConstants} from '../../../constants'
import {showToast} from '../../../utils/GenericUtils'
import HistoryShimmer from '../withdrawals/ListShimmer'
import { Loader, Screen } from '../../../enums'
import { commonStyles, rtlStyles } from '../../../globalstyles/styles'
import { AppFunctions, ThemeFunctions } from '../../../utils'
import _ from 'lodash'
import { Icon } from 'react-native-elements'
import Colors from '../../../theme/Colors'
import WithdrawalAddress from '../../payments/WithdrawalAddress'
import Navigation from '../../../utils/Navigation'
import * as Images from '../../../assets'
import { CurrentConfig } from '../../../../api_config'

const Balances = (props: any) => {
  const [searchQuery, setSearchQuery] = useState<any>('')
  const [isDepositSheet, setIsDepositSheet] = useState(false)
  const [depositDetails, setDepositDetails] = useState(null)
  const [searchedData, setSearchedData] = useState([])
  const [estimatedTotal, setEstimatedTotal] = useState(0)
  const quickBuyData = useSelector((state: any) => state.quickBuyReducer)
  const { liveCurrencyPrices, isInternetReachable } = useSelector(
    (state: any) => state.gbexReducer,
  )
  const { currencyStatusData } = useSelector((state: any) => state.walletReducer)
  const [isWithdrawalSheet, setIsWithdrawalSheet] = useState(false)
  const [depositInfo, setDepositInfo] = useState(null)
  const [withdrawStep, setWithdrawStep] = useState(0)

  const appData = useSelector((state: any) => state.appReducer)
  const {
    isRtlApproach,
    appTheme,
    isSmallBalanceHidden,
    isBalanceHidden,
    mainCurrency,
    secondCurrency,
  } = useSelector((state: any) => state.globalReducer)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!quickBuyData?.fundsList || quickBuyData?.fundsList?.length === 0)
      dispatch(QuickBuyActions.fundsList())
  }, [props.activeIndex, quickBuyData?.fundsList?.length])

  useEffect(() => {
    if (quickBuyData?.fundsList?.length > 0 && liveCurrencyPrices?.length > 0) {
      getEstimateValue()
    }
  }, [quickBuyData?.fundsList?.length, liveCurrencyPrices?.length])

  useEffect(() => {
    dispatch(GbexActions.getLivePrice())
    if (!quickBuyData?.fundsList || quickBuyData?.fundsList?.length === 0) {
      dispatch(QuickBuyActions.fundsList())
    }
  }, [dispatch])

  const getEstimateValue = () => {
    let totalPrice = 0
    quickBuyData?.fundsList?.map(res => {
      let currencyData = liveCurrencyPrices?.find(
        resp => res?.symbol == resp?.currencyName,
      )
      if (currencyData && Object.keys(currencyData)?.length > 0) {
        totalPrice =
          totalPrice + Number(res?.balance) * Number(currencyData?.usdPrice)
      }
    })
    setEstimatedTotal(totalPrice)
  }

  const getBtc = () => {
    let currencyData = liveCurrencyPrices?.find(
      resp =>
        resp?.currencyName?.toUpperCase() === secondCurrency?.toUpperCase(),
    )
    let calculatedBTC = estimatedTotal / currencyData?.usdPrice
    return calculatedBTC === Infinity ||
      isNaN(calculatedBTC) ||
      _.isUndefined(calculatedBTC) ||
      _.isNull(calculatedBTC)
      ? 'N/A'
      : AppFunctions.standardDigitConversion(
        parseFloat(AppFunctions.convertToDecimal(calculatedBTC)),
      )
  }

  const onToggleSwitch = () => {
    dispatch(GlobalActions.hideSmallBalances())
  }

  const isNonFiatCurrency = (currencyName: string) => {
    const filteredData = currencyStatusData.find(
      res => res?.currency === currencyName,
    )
    if (filteredData && Object.keys(filteredData).length > 0) {
      return filteredData?.isCrypto
    } else {
      return MapperConstants.StatusMapper.disable
    }
  }
  const { userProfileData } = useSelector((state: any) => state.appReducer)

  const handleDepositDetails = (data: any, isEnabled: boolean) => async () => {
    if (userProfileData?.documentStatus ===
      MapperConstants.KycStatusConstant.rejected ||
      userProfileData?.documentStatus ===
      MapperConstants.KycStatusConstant.pending) {
        showToast(
          strings('balance_deposit'),
          strings('kyc_msg'),
          'error',
        )
    } else {
      if (data) {
        if (isEnabled) {
          if (isNonFiatCurrency(data.symbol) || data.symbol === 'ETH') {
            setIsDepositSheet(true)
            const depositData = await WalletActions.getAddressDetails({
              uniqueId: data.uniqueId,
              tokenSymbol: data.symbol,
              exchange_id: CurrentConfig.exchange_id
            })
            if (depositData?.status === 200 && depositData?.data) {
              setDepositInfo(depositData.data)
            } else if (depositData?.status === 200 && depositData?.message) {
              const x: any = depositData.message
              setDepositInfo(x.data)
            } else {
              setDepositInfo({
                address: data.currencyAddress,
                destinationTag: data.destinationTag,
                name: data.symbol,
              })
            }
            setDepositDetails(data)
          } else {
            Navigation.navigate(Screen.Payment, {})
          }
        } else {
          showToast(
            strings('balance_deposit'),
            strings('deposit_not_enabled'),
            'info',
          )
        }

      } else {
        setIsDepositSheet(false)
        setDepositDetails(null)
        setDepositInfo(null)
      }
    }
  }

  const searchText = e => {
    let text = e.toLowerCase().trim()
    setSearchQuery(e)
    if (quickBuyData?.fundsList?.length > 0) {
      let balanceList = quickBuyData?.fundsList
      let filteredData = balanceList.filter(item => {
        return (
          item.name.toLowerCase().match(text) ||
          item.symbol.toLowerCase().match(text)
        )
      })
      if (filteredData && Array.isArray(filteredData)) {
        setSearchedData(filteredData)
      } else {
        setSearchedData([])
      }
    }
  }

  const onSearchCancel = () => {
    setSearchQuery('')
    setSearchedData([])
  }

  const handleWithdrawalDetails = (
    data: any,
    isEnabled: boolean,
    resetAction: any,
  ) => () => {
    if (userProfileData?.documentStatus ===
      MapperConstants.KycStatusConstant.rejected ||
      userProfileData?.documentStatus ===
      MapperConstants.KycStatusConstant.pending) {
        showToast(
          strings('balance_deposit'),
          strings('kyc_msg'),
          'error',
        )
    } else {
      if (data) {
        if (isEnabled) {
          if (isNonFiatCurrency(data.symbol)) {
            setDepositDetails(data)
            setIsWithdrawalSheet(true)
            setDepositInfo({
              address: data.currencyAddress,
              destinationTag: data.destinationTag,
              name: data.symbol,
            })
          } else {
            Navigation.navigate(Screen.Payment, {})
          }
        } else {
          showToast(
            strings('balance_deposit'),
            strings('withdrawal_not_enabled'),
            'info',
          )
        }
      } else {
        resetAction()
        setIsWithdrawalSheet(false)
        setDepositDetails(null)
        setDepositInfo(null)
      }
    }
  }
  const getEstimatedTotal = () => {
    if (mainCurrency !== 'USD') {
      let currencyData = liveCurrencyPrices.find(
        resp =>
          resp?.currencyName?.toUpperCase() === mainCurrency?.toUpperCase(),
      )
      let calculatedValue = estimatedTotal / currencyData?.usdPrice
      return calculatedValue === Infinity ||
        isNaN(calculatedValue) ||
        _.isUndefined(calculatedValue) ||
        _.isNull(calculatedValue)
        ? 'N/A'
        : AppFunctions.standardDigitConversion(
          parseFloat(AppFunctions.convertToDecimal(calculatedValue)),
        )
    } else {
      return AppFunctions.standardDigitConversion(
        parseFloat(AppFunctions.convertToDecimal(estimatedTotal)),
      )
    }
  }

  return (
    <View style={[styles.balanceView, ThemeFunctions.setBackground(appTheme)]}>
      <View
        style={[
          styles.noted,
          ThemeFunctions.topTabBorderColor(appTheme),
          commonStyles.marginHorizontalView,
        ]}>
        <View
          style={[
            commonStyles.rowItem,
            commonStyles.justifySpace,
            isRtlApproach ? rtlStyles.reverseRow : {},
          ]}>
          <Text style={styles.portfolio}>
            {strings('estimate_portfolio')} ({mainCurrency})
          </Text>
          <TouchableOpacity
            style={styles.viewBtn}
            activeOpacity={1}
            onPress={() => dispatch(GlobalActions.updateBalanceVisibility())}>
            <Icon
              name={isBalanceHidden ? 'eye-slash' : 'eye'}
              type='font-awesome'
              color={Colors.white}
              size={18}
            />
          </TouchableOpacity>
        </View>
        <View
          style={[
            commonStyles.rowItem,
            commonStyles.justifySpace,
            isRtlApproach ? rtlStyles.reverseRow : {},
          ]}>
          <Text style={[styles.largeSize]} adjustsFontSizeToFit={true}>
            ~{MapperConstants.mainCurrencySymbol[mainCurrency]}
            {isBalanceHidden
              ? '****'
              : estimatedTotal > 0
                ? getEstimatedTotal()
                : '0.00'}
          </Text>
          <Text
            style={[
              styles.portfolio,
              styles.btc,
              { textAlign: isRtlApproach ? 'left' : 'right' },
            ]}
            adjustsFontSizeToFit={true}>
            {isBalanceHidden ? '****' : '~' + getBtc()} {secondCurrency}
          </Text>
        </View>
      </View>
      <View style={commonStyles.marginHorizontalView}>
        {!isWithdrawalSheet &&
          <SearchBar
            placeholder={`${strings('search')}...`}
            onChangeText={searchText}
            searchQuery={searchQuery}
            onCancel={onSearchCancel}
          />
        }
        <View
          style={[
            styles.hideBalanceRow,
            isRtlApproach ? rtlStyles.reverseRow : {},
          ]}>
          <Text
            style={[
              styles.hideBalance,
              { color: ThemeFunctions.customText(appTheme) },
            ]}>
            {strings('hide_small_balances')}
          </Text>
          <Switch
            value={isSmallBalanceHidden}
            onValueChange={onToggleSwitch}
            color={ThemeFunctions.toggleBg(appTheme)}
            style={{ transform: [{ scaleX: isRtlApproach ? -1 : 1 }] }}
          />
        </View>
      </View>
      {appData.loading === Loader.GET_FUND_BALANCE ||
        !quickBuyData?.fundsList ? (
        <HistoryShimmer />
      ) : quickBuyData?.fundsList?.length === 0 ? (
        <>
          <Text
            style={[
              balanceStyles.placeholderText,
              ThemeFunctions.customInputText(appTheme),
            ]}>
            {strings('error_boundary_msg')}
          </Text>
          <TouchableOpacity
            style={styles.reloadBtn}
            onPress={() => dispatch(QuickBuyActions.fundsList())}>
            <ImageContainer
              imgStyle={{
                ...styles.reload,
                ...ThemeFunctions.imgColor(appTheme),
              }}
              imagePath={Images.icReload}
            />
            <Text
              style={{
                ...balanceStyles.retry,
                color: ThemeFunctions.customText(appTheme),
              }}>
              {strings('retry')}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <BalanceList
          handleDepositDetails={handleDepositDetails}
          searchedData={searchedData}
          setSearchedData={setSearchedData}
          isSwitchOn={isSmallBalanceHidden}
          searchQuery={searchQuery}
          setDepositDetails={setDepositDetails}
          handleWithdrawalDetails={handleWithdrawalDetails}
        />
      )}
      <DepositAddress
        isDepositSheet={isDepositSheet}
        handleDepositDetails={handleDepositDetails}
        depositDetails={depositDetails}
        handleWithdrawalDetails={handleWithdrawalDetails}
        depositInfo={depositInfo}
      />
      <WithdrawalAddress
        setIsWithdrawalSheet={setIsWithdrawalSheet}
        withdrawStep={withdrawStep}
        setWithdrawStep={setWithdrawStep}
        handleWithdrawalDetails={handleWithdrawalDetails}
        depositDetails={depositDetails}
        setDepositDetails={setDepositDetails}
        setDepositInfo={setDepositInfo}
        isWithdrawalSheet={isWithdrawalSheet}
      />
    </View>
  )
}

export default Balances
