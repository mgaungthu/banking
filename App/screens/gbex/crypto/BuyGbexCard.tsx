import React, {useState, useEffect} from 'react'
import {View, TextInput, Text, TouchableOpacity} from 'react-native'
import {ImageContainer, ThemeButton} from '../../../components'
import {Loader, ReturnKeyTypes} from '../../../enums'
import {strings} from '../../../strings'
import {AppConstants, MapperConstants} from '../../../constants'
import {commonStyles} from '../../../globalstyles/styles'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {Chip} from 'react-native-paper'
import {quickBuyStyles} from '../../quickbuy/styles'
import {useSelector} from 'react-redux'
import _ from 'lodash'
import {SCREEN_WIDTH, ThemeFunctions, AppFunctions} from '../../../utils'
import {buyStyles as styles} from '../styles'
import {Icon} from 'react-native-elements'
import * as Images from '../../../assets'
import * as Flags from '../../../assets/flags'

const BuyGbexCard = ({
  bonusEnabled,
  secondCurrency,
  allSecondaryPrice,
  isEnabled,
  liveCurrencyPrices,
  purchaseInfo,
  setPurchaseInfo,
  error,
  setIsVisible,
  onSubmit,
  setIsEnabled,
  setError,
}: any) => {
  const quickBuyData = useSelector((state: any) => state.quickBuyReducer)
  const appData = useSelector((state: any) => state.appReducer)
  const {appTheme} = useSelector((state: any) => state.globalReducer)
  const [currentSidePrice, setCurrentSidePrice] = useState(0)

  const getBalance = () => {
    let curr = null
    let _total = 0
    if (secondCurrency === strings('second_currency')) return null
    let currencyDecimal =
      AppConstants.CurrencyAmountDecimal[secondCurrency] || 4
    if (quickBuyData?.fundsList?.length > 0) {
      curr = quickBuyData?.fundsList.find(res => res.symbol === secondCurrency)
      _total =
        curr && Object.keys(curr).length > 0 && curr?.balance ? curr.balance : 0
      setPurchaseInfo(prevState => ({
        ...prevState,
        balance: AppFunctions.standardDigitConversion(
          parseFloat(_total.toFixed(currencyDecimal)),
        ),
        secondCurrency: curr?.symbol,
      }))
    } else {
      setPurchaseInfo(prevState => ({
        ...prevState,
        balance: 0,
        secondCurrency: secondCurrency,
      }))
    }
  }

  useEffect(() => {
    getBalance()
    if (secondCurrency && allSecondaryPrice) {
      const unitPriceData = allSecondaryPrice.find(
        res => res.currencyName === secondCurrency,
      )
      let assetPriceSecondary =
        unitPriceData && Object.keys(unitPriceData).length > 0
          ? unitPriceData.tokenPrice
          : 0
      setCurrentSidePrice(assetPriceSecondary)
      const unitPrice =
        unitPriceData && Object.keys(unitPriceData).length > 0
          ? unitPriceData.tokenPrice
          : 0
      setPurchaseInfo(prevState => ({
        ...prevState,
        unitGbexPrice:
          _.isUndefined(unitPrice) ||
          isNaN(unitPrice) ||
          unitPrice === Infinity ||
          _.isNull(unitPrice)
            ? '0'
            : '' + unitPrice,
      }))
    }
  }, [secondCurrency])

  const isSecondCurrency = () => {
    return secondCurrency !== strings('select_token')
  }

  const getCurrencyValue = (currName: any) => {
    const prices = liveCurrencyPrices?.find(
      res => res.currencyName === currName,
    )
    return prices && Object.keys(prices).length > 0 ? prices.usdPrice : 0
  }

  const getCurrencyVolGbex = () => {
    const price = getCurrencyValue('GBEX')
    return purchaseInfo?.volume ? parseFloat(purchaseInfo.volume) * price : 0
  }

  const getCurrencyVolCurr = (curr: any) => {
    const price = getCurrencyValue(curr)
    return purchaseInfo?.total ? parseFloat(purchaseInfo.total) * price : 0
  }

  const isBonusEnabled = () => {
    return bonusEnabled && purchaseInfo?.bonusTotal > 0
  }

  const onChangeVal = e => {
    const total = Number(e) * currentSidePrice
    setPurchaseInfo(prevState => ({
      ...prevState,
      volume: e === Infinity || isNaN(e) || !isFinite(e) ? '0' : '' + e,
      total:
        total === Infinity || isNaN(total) || !isFinite(total)
          ? '0'
          : '' + total,
      bonusTotal:
        total === Infinity || isNaN(total) || !isFinite(total)
          ? 0
          : '' + (e * purchaseInfo?.bonusPercentage) / 100,
    }))
    setIsEnabled(MapperConstants.StatusMapper.disable)
    setError('')
  }
  const onChangeTotal = e => {
    const vol = Number(e) / currentSidePrice
    setPurchaseInfo(prevState => ({
      ...prevState,
      volume: vol === Infinity || isNaN(vol) || !isFinite(vol) ? '0' : '' + vol,
      total: e === Infinity || isNaN(e) || !isFinite(e) ? '0' : '' + e,
      bonusTotal:
        vol === Infinity || isNaN(vol) || !isFinite(vol)
          ? 0
          : '' + ((e / currentSidePrice) * purchaseInfo?.bonusPercentage) / 100,
    }))
    setIsEnabled(MapperConstants.StatusMapper.disable)
    setError('')
  }
  const dropdownText = () => {
    return secondCurrency === strings('select_token') &&
      ThemeFunctions.isRapunzelTheme(appTheme)
      ? '#fff'
      : ThemeFunctions.customText(appTheme)
  }

  const tokenImg = res => {
    return (
      AppConstants.tokenImages[res] ||
      Flags[res.toLowerCase()] ||
      Images.currency.IcUsd
    )
  }
  return (
    <View style={commonStyles.flexDisplay}>
      <KeyboardAwareScrollView contentContainerStyle={commonStyles.scrollView}>
        {!isEnabled && (
          <Text style={{color: 'red', marginTop: 6}}>{error}</Text>
        )}
        <View style={styles.cardContainer}>
          <View style={[styles.card, ThemeFunctions.getBuyCardColor(appTheme)]}>
            <View style={styles.rowItem}>
              <TouchableOpacity
                onPress={() =>
                  setIsVisible(MapperConstants.StatusMapper.enable)
                }
                activeOpacity={1}
                style={[
                  styles.secondCurrency,
                  secondCurrency === strings('select_token')
                    ? {
                        backgroundColor: ThemeFunctions.dropDownColor(appTheme),
                      }
                    : ThemeFunctions.selectedDropdownColor(appTheme),
                ]}>
                {isSecondCurrency() && (
                  <ImageContainer
                    imagePath={tokenImg(secondCurrency)}
                    imgStyle={[styles.currencyIc]}
                    noTransform={true}
                  />
                )}
                <Text
                  style={{
                    ...styles.title,
                    color: dropdownText(),
                  }}>
                  {secondCurrency}
                </Text>
                <Icon
                  name='keyboard-arrow-down'
                  type='material'
                  color={dropdownText()}
                  size={22}
                />
              </TouchableOpacity>
              <TextInput
                style={{
                  ...styles.balance,
                  ...ThemeFunctions.customInputText(appTheme),
                  width: SCREEN_WIDTH * 0.4,
                  textAlign: 'right',
                }}
                returnKeyType={ReturnKeyTypes.Go}
                onChangeText={onChangeTotal}
                maxLength={15}
                value={purchaseInfo.total}
                keyboardType='decimal-pad'
                placeholder='0.0'
                placeholderTextColor={ThemeFunctions.gbexPlaceholder(appTheme)}
              />
            </View>
            {isSecondCurrency() && (
              <View style={[styles.rowItem, styles.marginVer]}>
                <View style={[commonStyles.rowItem, styles.wallet]}>
                  <ImageContainer
                    imagePath={Images.WalletWhite}
                    imgStyle={[
                      styles.img,
                      ThemeFunctions.imgColorTint(appTheme),
                    ]}
                  />
                  <Text
                    style={{
                      ...styles.text,
                      ...ThemeFunctions.customInputText(appTheme),
                    }}>
                    {purchaseInfo?.balance
                      ? AppFunctions.standardDigitConversion(
                          parseFloat(purchaseInfo?.balance),
                        )
                      : 0}
                  </Text>
                </View>
                <Text
                  style={{
                    ...styles.text,
                    ...ThemeFunctions.customInputText(appTheme),
                  }}>
                  ~$
                  {AppFunctions.standardDigitConversion(
                    parseFloat(
                      AppFunctions.convertToDecimal(
                        getCurrencyVolCurr(secondCurrency),
                      ),
                    ),
                  )}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.centerArrow}>
            <View
              style={[
                styles.dropArrow,
                ThemeFunctions.getBuyCardColor(appTheme),
                {borderColor: ThemeFunctions.setBackgroundColor(appTheme)},
              ]}>
              <Icon
                name='south'
                type='material'
                color={ThemeFunctions.customText(appTheme)}
                size={12}
              />
            </View>
          </View>
          <View style={[styles.card, ThemeFunctions.getBuyCardColor(appTheme)]}>
            <View style={styles.rowItem}>
              <View
                style={[
                  commonStyles.rowItem,
                  styles.wallet,
                  styles.gbexRow,
                  ThemeFunctions.getGbexColor(appTheme),
                ]}>
                <ImageContainer
                  imagePath={tokenImg('GBEX')}
                  imgStyle={[styles.currencyIc]}
                  noTransform={true}
                />
                <Text
                  style={[
                    styles.gbex,
                    {color: ThemeFunctions.customText(appTheme)},
                  ]}>
                  GBEX
                </Text>
              </View>
              <TextInput
                style={[
                  styles.balance,
                  ThemeFunctions.customInputText(appTheme),
                  {
                    width: SCREEN_WIDTH * 0.5,
                    textAlign: 'right',
                  },
                ]}
                returnKeyType={ReturnKeyTypes.Go}
                value={purchaseInfo.volume}
                onChangeText={onChangeVal}
                keyboardType='decimal-pad'
                maxLength={15}
                placeholder='0.0'
                placeholderTextColor={ThemeFunctions.gbexPlaceholder(appTheme)}
              />
            </View>
            <View style={[styles.rowItem, styles.marginVer]}>
              <View style={[commonStyles.rowItem, styles.wallet]}>
                <ImageContainer
                  imagePath={Images.WalletWhite}
                  imgStyle={[styles.img, ThemeFunctions.imgColorTint(appTheme)]}
                />
                <Text
                  style={{
                    ...styles.text,
                    ...ThemeFunctions.customInputText(appTheme),
                  }}>
                  {purchaseInfo?.gbexBalance
                    ? AppFunctions.standardDigitConversion(
                        parseFloat(purchaseInfo.gbexBalance),
                      )
                    : 0}{' '}
                  GBEX
                </Text>
              </View>
              <Text
                style={{
                  ...styles.text,
                  ...ThemeFunctions.customInputText(appTheme),
                }}>
                {/* ~$
                {AppFunctions.standardDigitConversion(
                  parseFloat(
                    AppFunctions.convertToDecimal(getCurrencyVolGbex()),
                  ),
                )} */}
              </Text>
            </View>
          </View>
          <View style={[styles.rowItem, styles.marginVer]}>
            <Text
              adjustsFontSizeToFit={true}
              style={{
                ...styles.text,
                color: ThemeFunctions.customText(appTheme),
              }}>
              {isSecondCurrency()
                ? `1GBEX= ${AppFunctions.standardDigitConversion(
                    parseFloat(purchaseInfo?.unitGbexPrice),
                  )} ${secondCurrency}`
                : ''}
            </Text>
          </View>
          <Text
            style={{
              ...styles.text,
              color: ThemeFunctions.customText(appTheme),
            }}>
            {isBonusEnabled()
              ? `${strings('bonus')}%: ${purchaseInfo?.bonusPercentage}`
              : ''}
          </Text>
          <Text
            style={{
              ...styles.text,
              color: ThemeFunctions.customText(appTheme),
              marginBottom: 7,
            }}>
            {isBonusEnabled()
              ? `${strings(
                  'bonus_total',
                )}: ${AppFunctions.standardDigitConversion(
                  parseFloat(
                    AppFunctions.convertToDecimal(purchaseInfo.bonusTotal),
                  ),
                )}`
              : ''}
          </Text>
          <View style={quickBuyStyles.badgeView}>
            {secondCurrency &&
              AppConstants.QuickSelectAmount[secondCurrency] &&
              AppConstants.QuickSelectAmount[secondCurrency].map(res => (
                <Chip
                  key={res}
                  textStyle={[
                    quickBuyStyles.chipText,
                    ThemeFunctions.customInputText(appTheme),
                  ]}
                  style={[
                    quickBuyStyles.badge,
                    {borderColor: ThemeFunctions.chipColor(appTheme)},
                  ]}
                  onPress={() => {
                    let vol = res / Number(currentSidePrice)
                    setPurchaseInfo(prevState => ({
                      ...prevState,
                      volume: isNaN(vol) || vol === Infinity ? '0' : '' + vol,
                      total: '' + res,
                      bonusTotal:
                        ((res / currentSidePrice) *
                          purchaseInfo.bonusPercentage) /
                        100,
                    }))
                  }}
                  mode='outlined'>{`${res} ${secondCurrency}`}</Chip>
              ))}
          </View>
        </View>
        <ThemeButton
          text={isEnabled ? error : strings('buy')}
          isLocalised={true}
          errorColor={isEnabled}
          onClickHandler={onSubmit}
          loading={appData.loading === Loader.BUY_GBEX ? true : false}
        />
      </KeyboardAwareScrollView>
    </View>
  )
}

export default BuyGbexCard
