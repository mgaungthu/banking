import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { gbexStyles as styles } from '../styles'
import * as Images from '../../../assets'
import { strings } from '../../../strings'
import { commonStyles } from '../../../globalstyles/styles'
import { useDispatch, useSelector } from 'react-redux'
import { AppFunctions, ThemeFunctions } from '../../../utils'
import { ImageContainer, Space, ThemeText } from '../../../components'
import { AppColor } from '../../../enums'
import { GbexActions } from '../../../store'

const GbexMiddleView = (props: any) => {
  const { appTheme, appColor } = useSelector((state: any) => state.globalReducer)
  const { gbexStatusData } = props

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(GbexActions.getGbexStatus())
  },[])

  const getImage = () => {
    switch (appColor) {
      case AppColor.black:
        return Images.gb_s_black
      case AppColor.pink:
        return Images.gb_s_pink
    }
    return Images.gb_s_green
  }

  return (
    <View style={styles.topMargin}>
      <ThemeText style={[
        styles.textHeader,
        { color: ThemeFunctions.customText(appTheme) }
      ]}>GBEX - The Token</ThemeText>
      <View
        style={[
          commonStyles.rowItem,
          styles.middleRow,
          ThemeFunctions.customInputBorderColor(appTheme),
        ]}>
        <View style={styles.imgView}>
          <ImageContainer
            imagePath={getImage()}
            imgStyle={[styles.leftLogo]}
          />
        </View>
        <View style={styles.textView}>
          <ThemeText
            style={{ color: ThemeFunctions.customText(appTheme) }}>
            {strings('token_name')}
          </ThemeText>
          <ThemeText
            style={{
              ...styles.labelValue,
            }}>
            {gbexStatusData?.name}
          </ThemeText>
        </View>
      </View>
      <View
        style={[
          commonStyles.rowItem,
          styles.middleRow,
          ThemeFunctions.customInputBorderColor(appTheme),
        ]}>
        <View style={styles.imgView}>
          <ImageContainer
            imagePath={getImage()}
            imgStyle={[styles.leftLogo]}
          />
        </View>
        <View style={styles.textView}>
          <ThemeText
            style={{ color: ThemeFunctions.customText(appTheme) }}>
            {strings('token_symbol')}
          </ThemeText>
          <ThemeText
            style={{
              ...styles.labelValue,
            }}>
            {gbexStatusData?.symbol}
          </ThemeText>
        </View>
      </View>
      <View
        style={[
          commonStyles.rowItem,
          styles.middleRow,
          ThemeFunctions.customInputBorderColor(appTheme),
        ]}>
        <View style={styles.imgView}>
          <ImageContainer
            imagePath={getImage()}
            imgStyle={[styles.leftLogo]}
          />
        </View>
        <View style={styles.textView}>
          <ThemeText
            style={{ color: ThemeFunctions.customText(appTheme) }}>
            {strings('decimals')}
          </ThemeText>
          <ThemeText
            style={{
              ...styles.labelValue
            }}>
            18
          </ThemeText>
        </View>
      </View>
      <View
        style={[
          commonStyles.rowItem,
          styles.middleRow,
          ThemeFunctions.customInputBorderColor(appTheme),
        ]}>
        <View style={styles.imgView}>
          <ImageContainer
            imagePath={getImage()}
            imgStyle={[styles.leftLogo]}
          />
        </View>
        <View style={styles.textView}>
          <ThemeText
            style={{ color: ThemeFunctions.customText(appTheme) }}>
            {strings('total_supply')}
          </ThemeText>
          <ThemeText
            style={{
              ...styles.labelValue
            }}>
            {`${AppFunctions.standardDigitConversion(
              parseFloat(AppFunctions.convertToDecimal(
                gbexStatusData?.totalSupply
              ))
            )}`}
          </ThemeText>
        </View>
      </View>
      <View
        style={[
          commonStyles.rowItem,
          styles.middleRow,
          commonStyles.noBorder,
          ThemeFunctions.customInputBorderColor(appTheme),
        ]}>
        <View style={styles.imgView}>
          <ImageContainer
            imagePath={getImage()}
            imgStyle={[styles.leftLogo]}
          />
        </View>
        <View style={styles.textView}>
          <ThemeText
            style={{ color: ThemeFunctions.customText(appTheme) }}>
            {strings('burn_address')}
          </ThemeText>
          <ThemeText
            adjustsFontSizeToFit={true}
            style={{
              ...styles.labelValue
            }}>
            {gbexStatusData.burnAddress}
          </ThemeText>
        </View>
      </View>
      <View style={[
        styles.hr,
        { backgroundColor: ThemeFunctions.customText(appTheme) }
      ]} />
      <View style={[styles.paddingView]}>
        <ThemeText>
          Established 2018, Globiance is a group of regulated/licensed exchanges and financial institutions with branches in 15+ countries servicing clients on 5 continents. GBEX is the house token of Globiance and used on all Globiance Platforms worldwide. GBEX is the first deflationary exchange token. 
        </ThemeText>
        <Space height={10} />
        <ThemeText style={styles.textDetail}>
          • GBEX is an Exchange Token Generation 3.0.
        </ThemeText>
        <ThemeText style={styles.textDetail}>
          • Deflationary. 4% Tax - 2% burn - 2% to Holders.
        </ThemeText>
        <ThemeText style={styles.textDetail}>
          • Automatically rewarding Holders
        </ThemeText>
        <ThemeText style={styles.textDetail}>
          • Starting out at a low price.
        </ThemeText>
        <ThemeText style={styles.textDetail}>
          • Anti-Whale - Dump Protection - only 0.5% Tokens of Supply per Wallet allowed.
        </ThemeText>
        <Space height={10} />
        <ThemeText>
          Based on the revolutionary protocol - XinFin XDC - which can handle more transactions, has a faster confirmation  time, offers lower fees and consumes less energy.
        </ThemeText>
      </View>
      {/* <View style={[commonStyles.rowItem, styles.paddingView]}>
        <View
          style={[
            styles.columnItem1,
            ThemeFunctions.isRapunzelTheme(appTheme) ? styles.bg : styles.card1,
          ]}>
          <ImageContainer
            imagePath={Images.icHoldercount}
            imgStyle={[styles.bottomIcon]}
          />
          <Text
            style={{
              ...styles.label,
              ...ThemeFunctions.setHeaderTextColor(appTheme),
            }}>
            {strings('holder_account')}
          </Text>
          <Text
            style={{
              ...styles.bottomlable,
              ...ThemeFunctions.setHeaderTextColor(appTheme),
            }}>
            {`${AppFunctions.standardDigitConversion(
              parseFloat(AppFunctions.convertToDecimal(
               gbexStatusData?.holderCount
              ))
            )}`}
          </Text>
        </View>
        <View style={{width: 10}} />
        <View
          style={[
            styles.columnItem1,
            ThemeFunctions.isRapunzelTheme(appTheme) ? styles.bg : styles.card2,
          ]}>
          <ImageContainer
            imagePath={Images.icTransfercount}
            imgStyle={[styles.bottomIcon]}
          />
          <Text
            style={{
              ...styles.label,
              ...ThemeFunctions.setHeaderTextColor(appTheme),
            }}>
            {strings('transfer_count')}
          </Text>
          <Text
            style={{
              ...styles.bottomlable,
              ...ThemeFunctions.setHeaderTextColor(appTheme),
            }}>
            {`${AppFunctions.standardDigitConversion(
             parseFloat(AppFunctions.convertToDecimal(
                gbexStatusData?.txCount,
              ))
            )}`}
          </Text>
        </View>
      </View>
      <View style={[commonStyles.rowItem, styles.topMargin]}>
        <View
          style={[
            styles.columnItem1,
            ThemeFunctions.isRapunzelTheme(appTheme) ? styles.bg : styles.card3,
          ]}>
          <ImageContainer
            imagePath={Images.icBurnCount}
            imgStyle={[styles.bottomIcon]}
          />
          <Text
            style={{
              ...styles.label,
              ...ThemeFunctions.setHeaderTextColor(appTheme),
            }}>
            {strings('burn_count')}
          </Text>
          <Text
            style={{
              ...styles.bottomlable,
              ...ThemeFunctions.setHeaderTextColor(appTheme),
            }}>
    
                {AppFunctions.standardDigitConversion(
            parseFloat(AppFunctions.convertToDecimal(gbexStatusData?.totalBurnFees)),
          )}
          </Text>
        </View>
        <View style={{width: 10}} />
        <View
          style={[
            styles.columnItem1,
            ThemeFunctions.isRapunzelTheme(appTheme) ? styles.bg : styles.card4,
          ]}>
          <ImageContainer
            imagePath={Images.icRewardcount}
            imgStyle={[styles.bottomIcon]}
          />
          <Text
            style={{
              ...styles.label,
              ...ThemeFunctions.setHeaderTextColor(appTheme),
            }}>
            {strings('reward_count')}
          </Text>
          <Text
            style={{
              ...styles.bottomlable,
              ...ThemeFunctions.setHeaderTextColor(appTheme),
            }}>
          
            {AppFunctions.standardDigitConversion(
            parseFloat(AppFunctions.convertToDecimal(gbexStatusData?.totalRewardFees)),
          )}
          </Text>
        </View>
      </View> */}
    </View>
  )
}

export default GbexMiddleView
