import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';

import {useSelector} from 'react-redux';
import Clipboard from '@react-native-clipboard/clipboard';
import {TouchableOpacity} from 'react-native-gesture-handler';

import IconVector from '../../components/ui/IconVector';
import {Header, ThemeText} from '../../components';
import {AppFunctions, ThemeFunctions} from '../../utils';
import {FormatDateTime} from '../../utils/AppFunctions';
import {
  IsCancelled,
  IsCompleted,
  IsPending,
  StatusPill,
  TruncateString,
} from './common';
import {showToast} from '../../utils/GenericUtils';
import {strings} from '../../strings';

import {commonStyles} from '../../globalstyles/styles';
import {transactionDetailsStyles} from './styles';

const UserTransactionDetail = (props: any) => {
  const item = props?.route?.params;
  const {currency, type} = item;
  const {appTheme, appColor} = useSelector((state: any) => state.globalReducer);

  const _copyAddress = (string: string) => {
    Clipboard.setString(string);
    showToast('', strings('Copied'), 'info');
  };

  const _destTag = () => {
    if (!item.destinationTag || item.destinationTag === 'N.A') return <></>;
    return (
      <View style={[transactionDetailsStyles.transactionCardItem]}>
        <View>
          <ThemeText adjustsFontSizeToFit={true} numberOfLines={2}>
            Destination Tag
          </ThemeText>
        </View>
        <View>
          <ThemeText adjustsFontSizeToFit={true} numberOfLines={2}>
            {item.destinationTag}
          </ThemeText>
        </View>
      </View>
    );
  };

  const textWithCopy = (text: string) => {
    return (
      <View style={[{display: 'flex', flexDirection: 'row'}]}>
        <View>
          <ThemeText style={[{fontSize: 13, textAlign: 'right'}]}>
            {TruncateString(text)}
          </ThemeText>
        </View>

        <View>
          <TouchableOpacity
            style={[
              {
                backgroundColor: ThemeFunctions.getColor(appColor),
                height: 22,
                width: 22,
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'flex-end',
                marginLeft: 5,
              },
            ]}
            onPress={() => _copyAddress(text)}>
            <IconVector.FontAwesome5 name="copy" color="white" size={15} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const commonDetails = () => {
    return (
      <>
        <View style={[transactionDetailsStyles.transactionCardItem]}>
          <View>
            <ThemeText adjustsFontSizeToFit={true} numberOfLines={2}>
              Date
            </ThemeText>
          </View>
          <View>
            <ThemeText adjustsFontSizeToFit={true} numberOfLines={2}>
              {FormatDateTime(item.createdAt)}
            </ThemeText>
          </View>
        </View>

        <View style={[transactionDetailsStyles.transactionCardItem]}>
          <View>
            <ThemeText adjustsFontSizeToFit={true} numberOfLines={1}>
              Status
            </ThemeText>
          </View>
          <View>
            <ThemeText adjustsFontSizeToFit={true} numberOfLines={1}>
              {StatusPill(item.status)}
            </ThemeText>
          </View>
        </View>

        <View style={[transactionDetailsStyles.transactionCardItem]}>
          <View>
            <ThemeText adjustsFontSizeToFit={true} numberOfLines={1}>
              Amount
            </ThemeText>
          </View>
          <View>
            <ThemeText adjustsFontSizeToFit={true} numberOfLines={1}>
              {AppFunctions.standardDigitConversion(parseFloat(item.amount))}{' '}
              {item.currency}
            </ThemeText>
          </View>
        </View>

        {_destTag()}
      </>
    );
  };

  const renderDeposit = () => {
    return (
      <>
        <View
          style={[
            transactionDetailsStyles.transactionCard,
            ThemeFunctions.setIEOCardBG(appTheme),
          ]}>
          {commonDetails()}

          <View style={[transactionDetailsStyles.transactionCardItem]}>
            <View>
              <ThemeText adjustsFontSizeToFit={true} numberOfLines={2}>
                From Address
              </ThemeText>
            </View>
            {textWithCopy(item.fromAddress)}
          </View>

          <View style={[transactionDetailsStyles.transactionCardItem]}>
            <View>
              <ThemeText adjustsFontSizeToFit={true} numberOfLines={2}>
                To Address
              </ThemeText>
            </View>
            {textWithCopy(item.toAddress)}
          </View>

          <View style={[transactionDetailsStyles.transactionCardItem]}>
            <View>
              <ThemeText adjustsFontSizeToFit={true} numberOfLines={2}>
                Trasnsaction Hash
              </ThemeText>
            </View>
            {textWithCopy(item.walletTxId)}
          </View>
        </View>
      </>
    );
  };

  const renderWithdraw = () => {
    if (IsCancelled(item.status)) {
      return (
        <>
          <View
            style={[
              transactionDetailsStyles.transactionCard,
              ThemeFunctions.setIEOCardBG(appTheme),
            ]}>
            {commonDetails()}

            <View style={[transactionDetailsStyles.transactionCardItem]}>
              <View>
                <ThemeText adjustsFontSizeToFit={true} numberOfLines={2}>
                  To Address
                </ThemeText>
              </View>
              {textWithCopy(item.toAddress)}
            </View>
          </View>
        </>
      );
    }

    if (IsCompleted(item.status)) {
      return (
        <>
          <View
            style={[
              transactionDetailsStyles.transactionCard,
              ThemeFunctions.setIEOCardBG(appTheme),
            ]}>
            {commonDetails()}

            <View style={[transactionDetailsStyles.transactionCardItem]}>
              <View>
                <ThemeText adjustsFontSizeToFit={true} numberOfLines={2}>
                  To Address
                </ThemeText>
              </View>
              {textWithCopy(item.toAddress)}
            </View>

            <View style={[transactionDetailsStyles.transactionCardItem]}>
              <View>
                <ThemeText adjustsFontSizeToFit={true} numberOfLines={2}>
                  Trasnsaction Hash
                </ThemeText>
              </View>
              {textWithCopy(item.walletTxId)}
            </View>
          </View>
        </>
      );
    }

    if (IsPending(item.status)) {
      return (
        <>
          <View
            style={[
              transactionDetailsStyles.transactionCard,
              ThemeFunctions.setIEOCardBG(appTheme),
            ]}>
            {commonDetails()}

            <View style={[transactionDetailsStyles.transactionCardItem]}>
              <View>
                <ThemeText adjustsFontSizeToFit={true} numberOfLines={2}>
                  To Address
                </ThemeText>
              </View>
              {textWithCopy(item.toAddress)}
            </View>
          </View>
        </>
      );
    }

    return <></>;
  };

  return (
    <SafeAreaView
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      <Header
        title={`${currency}: ${type}`}
        isNormalText={true}
        textTransform="uppercase"
      />

      {type === 'Deposit' ? renderDeposit() : renderWithdraw()}
    </SafeAreaView>
  );
};

export default UserTransactionDetail;
