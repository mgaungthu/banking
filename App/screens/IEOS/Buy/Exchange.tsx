import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View, Text, ScrollView, TextInput, SafeAreaView, Platform, } from 'react-native'
import { CustomModal, LoadingSpinner, ModalSearch, ThemeButton, ThemeText, UiHeader } from '../../../components'
import { strings } from '../../../strings'
import { commonStyles } from '../../../globalstyles/styles'
import { quickSwapStyles } from '../../quickswap/styles'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeFunctions } from '../../../utils'
import { darkTheme } from '../../../theme/Colors'
import { Icon } from 'react-native-elements'
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { makeRequest } from '../../../services/ApiService'
import { IeosActions, QuickBuyActions } from '../../../store'
import { DEFAULT_COIN_LOGO } from '../../../store/action/quickbuy/QuickBuyAction'
import { showToast } from '../../../utils/GenericUtils'
import { FormatNumber, RoundUptoSignificant, toRealNumber } from '../../../utils/AppFunctions'
import { isIOS } from '../../../utils/DeviceConfig'
import TotalOutput from './TotalOutput'
import Image from "react-native-fast-image"
import { ieoDetailsSelector, ieoRateSelector, ieoSelector } from '../../../store/selectors/ieosSelector'
import Colors from '../../../theme/Colors'
import { Switch } from 'react-native-paper'

const MODAL_FIRST_CURRENCY = 1;
const MODAL_SECOND_CURRENCY = 2
const listSegmentChoose = {
  0: '25%',
  1: '50%',
  2: '75%',
  3: '100%'
}

export default () => {

  const { appTheme, appColor, assetMetadata } = useSelector((state: any) => state.globalReducer);
  const { list } = useSelector(ieoSelector);
  const { ticker: details, isLoading: isDetailsLoading, isError: isDetailsError } = useSelector(ieoDetailsSelector);
  const { rate } = useSelector(ieoRateSelector);
  
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState(MODAL_FIRST_CURRENCY)
  const [indexSegment, setIndexSegment] = useState(0)
  const [showAvailable, setShowAvailable] = useState(true);

  const quickBuyData = useSelector((state : any) => state.quickBuyReducer);
  const filtered = quickBuyData?.fundsList?.filter(item => {
    const isTicker = item?.symbol === details?.ticker;
    if (isTicker) return false
    if (details?.allowedCurrency && !details?.allowedCurrency.split(",").includes(item?.symbol)) return false
    return true
  });

  const [firstCurrency, setFirstCurrency] = useState("")
  const [amountFirstCurrency, setAmountFirstCurrency] = useState(0)
  const [amountSecondCurrency, setAmountSecondCurrency] = useState(0)
  const [searchQuery, setSearchQuery] = useState<any>('');
  const [listSearchQuery, setListSearchQuery] = useState(filtered || [])
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const livePrices = useSelector((state: any) => state.gbexReducer?.liveCurrencyPrices);

  const getBalance = () =>  quickBuyData?.fundsList?.find(item => item.symbol == firstCurrency)?.balance

  const getUsdPrice = (currency : string, amount : number) =>{
    
    const usdPrice = livePrices?.find(item => item?.currencyName == currency)?.usdPrice || 0;
    
    return toRealNumber(RoundUptoSignificant(amount * usdPrice || 0));
  }

  
  let switchStyle:any = { transform: [{ scaleX: .6 }, { scaleY: .6 }], marginTop:-5 }

  if (Platform.OS==="android") {
    switchStyle = { }
  }

  const dispatch = useDispatch()

  const _getPercent = () => {
    let percent = parseInt(listSegmentChoose[indexSegment])
    // if (percent===100) {
    //   percent=99
    // }
    return percent
  }

  useEffect(() => {
    if (isDetailsLoading || isDetailsError) {
      return;
    }
    const id = list.find(ticker => ticker.ticker === details?.ticker)?.id;
    dispatch(IeosActions.getIeoDetails(id));
    dispatch(IeosActions.getIeoRate(id));
  }, [firstCurrency, details?.ticker])

  const _getPrices = async () => {
    try {
      if (firstCurrency && details?.ticker) {
        const price = rate.rates.find(item => item.currencyname === firstCurrency)?.tokenPrice;
        setAmountSecondCurrency(toRealNumber(RoundUptoSignificant(amountFirstCurrency / price)));
      }
    } catch (error) {
      console.log(error);
    }
  }

  const _toggleModalFirstCurrency = () => {
    try {
      setShowModal(state => !state)
      setModalType(MODAL_FIRST_CURRENCY)
    } catch (error) {

    }
  }

  const _toggleModalSecondCurrency = () => {
    try {
      setShowModal(state => !state)
      setModalType(MODAL_SECOND_CURRENCY)
    } catch (error) {

    }
  }

  const _setCurrency = (currencyName) => {
    setFirstCurrency(currencyName)
    setAmountSecondCurrency(0);
    setShowModal(false);
  }

  useEffect(() => {
    _getPrices();
  }, [amountFirstCurrency, firstCurrency, rate, details])

  const _getImageCurrency = (currencyName) => {
    const filteredData = assetMetadata?.find(
      res => res?.currency?.toLowerCase() === currencyName?.toLowerCase(),
    )
    if (filteredData && Object.keys(filteredData).length > 0) {
      return QuickBuyActions.getImgUrl(filteredData.currency, filteredData.version)
    }
    return DEFAULT_COIN_LOGO 
  }

  const _changeSegment = (value) => {
    if (firstCurrency) {
      const selectedSegmentIndex = value.nativeEvent?.selectedSegmentIndex
      setIndexSegment(selectedSegmentIndex)
      let percent = parseInt(listSegmentChoose[selectedSegmentIndex])
      // if (percent===100) percent=99
      const currentBalance = quickBuyData?.fundsList?.find(item => item.symbol == firstCurrency)?.balance
      setAmountFirstCurrency(toRealNumber(RoundUptoSignificant((currentBalance * (percent / 100)))));
    }
  }

  const _exchange = async () => {
    if (details?.status === 'Ended') {
      showToast('Trade', 'Launchpad is currently inactive', 'error');
      return;
    }
    if (!rate?.rates?.map(item => item.currencyname)?.includes(firstCurrency)) {
      showToast('Trade', `Cannot get ${details?.ticker} from ${firstCurrency}`, 'error');
      return;
    }
    if (amountSecondCurrency === 0) {
      showToast('Trade', `Cannot get 0 ${details?.ticker}`, 'error');
      return;
    }
    if (amountSecondCurrency < details?.minimumPurchase) {
      showToast('Trade', `Minimum purchase should be at least ${details?.minimumPurchase}`, 'error');
      return;
    }
    if (amountFirstCurrency && amountSecondCurrency) {
      setIsSubmitLoading(true);
      const response:any = await makeRequest(
        'POST',
        'user/ieo/se/trade',
        {'Content-Type': 'application/json'},
        { 
          ticker : details?.ticker,
          firstCurrency: details?.ticker,
          secondCurrency: firstCurrency,
          firstCurrencyAmount : amountSecondCurrency
      })
      setIsSubmitLoading(false);
  
      if (response.status === 200) {
        showToast('Trade', 'success', 'success');
        dispatch(IeosActions.getIeoHistory(details?.ticker));
        dispatch(QuickBuyActions.fundsList());
      } else {
        const msg = response.message || "error"
        showToast('Trade', msg, 'error');
      }
      return;
    } 
    showToast('Trade', `Choose currencies`, 'error');
  }

  const _changeAmount = (valueChange) => {
    setIndexSegment(5);
    if (isNaN(Number(valueChange))) {
      showToast('Amount', `Plase, enter a number`, 'error')
      return;
    }
    setAmountFirstCurrency(valueChange);
  }

  const onSearchCancel = () => {
    setSearchQuery('')
  }

  const onSearch = (e) => {
    setSearchQuery(e);
    let text = e.toLowerCase().trim()
    setListSearchQuery(filtered?.filter(item => item.currencyName.toLowerCase()?.includes(text)));
  }

  useEffect(() => {
    let percent = _getPercent()    
    if (firstCurrency && percent) {
      const currentBalance = quickBuyData?.fundsList?.find(item => item.symbol == firstCurrency)?.balance
      setAmountFirstCurrency(parseFloat(RoundUptoSignificant(currentBalance / 100 * percent)))
    }
  }, [firstCurrency])
  
  return (
    <View
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(appTheme),
      ]}>
          <ScrollView style={[quickSwapStyles.container]}>
            {firstCurrency ?
              <Text style={[
                quickSwapStyles.textHint,
                { color: ThemeFunctions.customText(appTheme) }
              ]}>
                {strings('i_have')} {(FormatNumber(getBalance()))} {firstCurrency}
              </Text>
              : null}
            <TouchableOpacity
              style={[quickSwapStyles.buttonSwap, { backgroundColor: ThemeFunctions.isDarkTheme(appTheme) ? '#1C1A26' : '#F5F5F5' }]}
              onPress={_toggleModalFirstCurrency}
            >
              <TouchableOpacity
                style={[quickSwapStyles.buttonChange, ThemeFunctions.setBackground(appTheme)]}
                onPress={_toggleModalFirstCurrency}
              >
                {firstCurrency ?
                    <Image
                      source={{ uri: _getImageCurrency(firstCurrency) }}
                      style={quickSwapStyles.imageCurrency}
                      resizeMode="contain"
                    />
                    : null}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={[quickSwapStyles.textCurrencyName, ThemeFunctions.getTextColor(appTheme)]}>
                    {firstCurrency || "FROM"}
                  </Text>
                </View>
                <Icon
                  name='chevron-down'
                  type='entypo'
                  size={20}
                  color={ThemeFunctions.getCurrentTextColor(appTheme)}
                />
              </TouchableOpacity>
              <View style={quickSwapStyles.viewBalance}>
                <TextInput
                  value={`${amountFirstCurrency || 0}`}
                  placeholder={strings('enter_amount')}
                  style={[quickSwapStyles.inputAmount, quickSwapStyles.textCurrency, ThemeFunctions.getTextColor(appTheme)]}
                  onChangeText={_changeAmount}
                  placeholderTextColor={'#808080'}
                  editable={firstCurrency ? true : false}
                  keyboardType='decimal-pad'
                >
                </TextInput>
              </View>
            </TouchableOpacity>
            <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
              <Text style={{ color: ThemeFunctions.customText(appTheme) }}>~{getUsdPrice(firstCurrency, amountFirstCurrency)}$</Text>
            </View>
            <View style={[
              quickSwapStyles.hr,
              { backgroundColor: ThemeFunctions.getColor(appColor) },
            ]}>
            </View>
            <Text style={[
              quickSwapStyles.textHint,
              { color: ThemeFunctions.customText(appTheme) }
            ]}>
              {strings('i_want_to_get')}
            </Text>
            <View
              style={[quickSwapStyles.buttonSwap, { backgroundColor: ThemeFunctions.isDarkTheme(appTheme) ? '#1C1A26' : '#F5F5F5' }]}
            >
              <View style={[quickSwapStyles.buttonChange, ThemeFunctions.setBackground(appTheme)]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {details?.ticker ?
                    <Image
                      source={{ uri: _getImageCurrency(details?.ticker) }}
                      style={quickSwapStyles.imageCurrency}
                      resizeMode="contain"
                    />
                    : null}
                  <Text style={[quickSwapStyles.textCurrencyName, ThemeFunctions.getTextColor(appTheme)]}>
                    {details?.ticker || "TO"}
                  </Text>
                </View>
              </View>
              <View style={quickSwapStyles.viewBalance}>
                <Text
                  style={[quickSwapStyles.textCurrency, ThemeFunctions.getTextColor(appTheme)]}
                  numberOfLines={1}
                  adjustsFontSizeToFit={true}
                >
                  {(amountSecondCurrency || 0)}
                </Text>
              </View>
            </View>
            <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
              <Text style={{ color: ThemeFunctions.customText(appTheme) }}>~{getUsdPrice(details?.ticker, amountSecondCurrency)}$</Text>
            </View>
            <SegmentedControl
              values={Object.values(listSegmentChoose)}
              selectedIndex={indexSegment}
              style={[
                quickSwapStyles.segmentControl,
              ]}
              onChange={_changeSegment}
              backgroundColor={ThemeFunctions.isDarkTheme(appTheme) ? darkTheme.secondaryColor : '#F5F5F5'}
              tintColor={ThemeFunctions.getColor(appColor)}
              appearance='light'
              fontStyle={{ color: ThemeFunctions.getCurrentTextColor(appTheme) }}
              activeFontStyle={{ color: '#fff' }}
              enabled={Platform.OS === 'ios' ? (firstCurrency ? true : false) : true}
            />
            <View style={[commonStyles.paddingHorizontalView, { marginTop: 20, marginBottom: 100 }]}>
              {!showModal ?
                <>
                  {amountFirstCurrency ?
                    <Text style={[quickSwapStyles.feeText, , { color: ThemeFunctions.customText(appTheme) }]}>
                      {strings("transaction_cost")}: ~ {FormatNumber(amountFirstCurrency / 1000 || 0)} {firstCurrency}</Text>
                    : null}
                  <TotalOutput 
                    firstCurrency={firstCurrency} 
                    secondCurrency={details?.ticker} 
                    amount={amountSecondCurrency} 
                  />
                  {
                    isSubmitLoading 
                      ? <LoadingSpinner color={ThemeFunctions.getColor(appTheme)} size="small" />
                      : <ThemeButton
                        styleButton={[
                          {backgroundColor: Colors.currencyGreen}
                        ]}
                        disabled={details.status === 'Ended'}
                        disabledColor={details.status === 'Ended' ? '#c4c4c4' : null}
                        text={strings('buy_now')}
                        onClickHandler={_exchange}
                      />
                  }
                </>
                : null}
            </View>
          </ScrollView>
          <CustomModal
            visibility={showModal}
            onBackdropPress={_toggleModalFirstCurrency}
            justify={true}
            disableCoverScreen
            style={[
              isIOS()
                ? [quickSwapStyles.modal, { bottom: 0 - 10 }]
                : quickSwapStyles.modal,
              ,
              ThemeFunctions.setBackground(appTheme),
            ]}
          >
            <SafeAreaView style={quickSwapStyles.modalContainer}>
              <View style={{ marginRight: 20 }}>
                <UiHeader
                  title={modalType == MODAL_FIRST_CURRENCY ? "Choose your first currency" : "Choose your second currency"}
                  iconColor={ThemeFunctions.getCurrentTextColor(appTheme)}
                  showBack={false}
                  handleBack={_toggleModalSecondCurrency}
                  titleStyle={{ left: 20, color: ThemeFunctions.customText(appTheme), fontSize: 20 }}
                />
              </View>
              <ModalSearch
                placeholder={`${strings('search')}...`}
                onChangeText={onSearch}
                searchQuery={searchQuery}
                onCancel={onSearchCancel}
              />

              <View style={{display:"flex", flexDirection:"row", justifyContent:"flex-end", paddingTop:5}}>
              <ThemeText>
                {strings("available")}
                </ThemeText>

                <Switch               
                  style={switchStyle}
                  value={showAvailable}
                  onValueChange={setShowAvailable}
                  color={ThemeFunctions.toggleBg(appColor)} 
                 />
              </View>
              <ScrollView keyboardShouldPersistTaps={"handled"}>
                {listSearchQuery.map((item, key) => {
                  const tokenName = item.symbol;
                  const balance = FormatNumber(item.balance);
                  if (showAvailable&&item?.balance<=0) return;
                  return (
                    <TouchableOpacity
                    style={[quickSwapStyles.currencyChoose, {flex:1, justifyContent:"space-between"}]}
                      key={key}
                      onPress={() => _setCurrency(tokenName)}
                    >
                      <View style={{display:"flex", flexDirection:"row"}}>
                      <Image
                        source={{ uri: _getImageCurrency(tokenName) || DEFAULT_COIN_LOGO }}
                        style={quickSwapStyles.imageCurrency}
                        resizeMode="contain"
                      />
                      <ThemeText style={quickSwapStyles.currencyChooseText}>{tokenName}</ThemeText>
                      </View>
                      <ThemeText style={[{right:0}]}>
                        {balance}
                      </ThemeText>
                    </TouchableOpacity>
                  )
                })}
              </ScrollView>
            </SafeAreaView>
          </CustomModal>
    </View>
  )
}
