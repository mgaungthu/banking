import React from 'react';
import {View, Text} from 'react-native';
import {BottomPoup, UiHeader} from '../../../components';
import {commonStyles} from '../../../globalstyles/styles';
import {strings} from '../../../strings';
import Colors from '../../../theme/Colors';
import fonts from '../../../theme/fonts';
import {depositModalStyles as styles} from '../styles';
import QRCode from 'react-native-qrcode-svg';
import {ScrollView} from 'react-native-gesture-handler';
import {AppConstants} from '../../../constants';
import Clipboard from '@react-native-clipboard/clipboard';
import {showToast} from '../../../utils/GenericUtils';
const DepositAddress = ({
  isDepositSheet,
  handleDepositDetails,
  depositDetails,
  depositInfo,
  handleBack,
}: any) => {
  const getCurrencyAddress = () => {
    const address = depositInfo?.address;
    return address !== 'null' && address !== 'undefined' && address
      ? address
      : 'N/A';
  };
  const copyToClipboard = (text: string) => () => {
    Clipboard.setString(text);
    showToast('', strings('copied'), 'info');
  };

  return (
    <BottomPoup isVisible={isDepositSheet} customStyle={styles.popupView}>
      <UiHeader
        title={strings('deposit_address')}
        iconColor={Colors.dimGray}
        showBack={false}
        handleBack={handleBack ? handleBack : handleDepositDetails(null)}
      />
      {/* <ScrollView>
        <View
          style={[
            commonStyles.rowItem,
            commonStyles.justifyCenter,
            styles.paddingView,
          ]}>
          <Text style={styles.textTag}>{strings('destination_tag')}:</Text>
          <Text style={[styles.textTag, {fontFamily: fonts.PoppinsMedium}]}>
            {depositInfo?.destinationTag || 'N/A'}
          </Text>
        </View>
        {depositInfo?.destinationTag !== '' && (
          <>
            <Text
              style={commonStyles.copy}
              onPress={copyToClipboard(depositInfo?.destinationTag)}>
              {strings('copy')}
            </Text>
            <View style={styles.underline} />
          </>
        )}
        {getCurrencyAddress() !== 'N/A' && (
          <>
            <View style={[commonStyles.justifyCenter, styles.qrCodeView]}>
              <QRCode size={80} value={getCurrencyAddress()} />
            </View>
            <Text style={styles.address}>{getCurrencyAddress()}</Text>
            <Text
              style={commonStyles.copy}
              onPress={copyToClipboard(depositInfo?.address)}>
              {strings('copy')}
            </Text>
            <View style={styles.underline} />
          </>
        )}
        {depositDetails?.symbol === 'ETH' && (
          <Text style={styles.error}>{strings('eth_error')}</Text>
        )}
        <View style={styles.tipsView}>
          <Text style={[styles.textTag, {marginVertical: 4}]}>
            {strings('tips')}
          </Text>
          <View style={[commonStyles.rowItem, styles.tipRow]}>
            <View style={styles.bullet} />
            <Text style={styles.tips}>
              {strings('wallet_tip1')}
              {AppConstants.minDepAmount[depositDetails?.symbol]}{' '}
              {depositDetails?.symbol}
            </Text>
          </View>
          <View style={[commonStyles.rowItem, styles.tipRow]}>
            <View style={styles.bullet} />
            <Text style={styles.tips}>{`${strings('wallet_tip21')}${
              depositDetails?.symbol
            }${strings('wallet_tip22')}`}</Text>
          </View>
          <View style={[commonStyles.rowItem, styles.tipRow]}>
            <View style={styles.bullet} />
            <Text style={styles.tips}>{strings('wallet_tip3')}</Text>
          </View>
          <View style={[commonStyles.rowItem, styles.tipRow]}>
            <View style={styles.bullet} />
            <Text style={styles.tips}>{strings('wallet_tip4')}</Text>
          </View>
          <View style={[commonStyles.rowItem, styles.tipRow]}>
            <View style={styles.bullet} />
            <Text style={styles.tips}>{strings('wallet_tip5')}</Text>
          </View>
        </View>
      </ScrollView> */}
    </BottomPoup>
  );
};

export default DepositAddress;
