import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {balanceStyles as styles} from '../../funding/styles';
import {withdrawalStyles} from '../../payments/styles';

import {FlatList, RefreshControl, Text} from 'react-native';
import RowItem from './RowItem';

import {ThemeFunctions} from '../../../utils';
import {strings} from '../../../strings';
import {makeRequest} from '../../../services/ApiService';
import {MapperConstants} from '../../../constants';
import {showToast} from '../../../utils/GenericUtils';

const RedeemList = (props: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [redeemLogs, setRedeemLogs] = useState([]);

  const {isRtlApproach, appTheme, appColor} = useSelector(
    (state: any) => state.globalReducer,
  );

  useEffect(() => {
    fetchRedeemLogs();
  }, [props.activeIndex]);

  const fetchRedeemLogs = (showLoader: boolean = true) => {
    if (showLoader) setIsLoading(true);
    makeRequest(MapperConstants.ApiTypes.GET, 'user/get_referral_redemption_logs')
      .then(resp => {
        if (resp.status === 200) {
          setRedeemLogs(resp.data);
        } else {
          showToast('Redeem List', resp.message, 'error');
        }
      })
      .catch(e => {
        console.log(e);
        showToast(
          strings('referrals'),
          strings('error_referrals'),
          'error',
        );
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <FlatList
        data={redeemLogs}
        initialNumToRender={10}
        contentContainerStyle={[styles.rewardlist]}
        renderItem={({item, index}) => (
          <RowItem
            trade={item}
            index={index}
            type={2}
            isRtlApproach={isRtlApproach}
            appTheme={appTheme}
            appColor={appColor}
          />
        )}
        keyExtractor={item => item?.id?.toString()}
        refreshControl={
          <RefreshControl
            tintColor={ThemeFunctions.getColor(appColor)}
            colors={[ThemeFunctions.getColor(appColor)]}
            refreshing={isLoading}
            onRefresh={() => fetchRedeemLogs()}
          />
        }
        ListEmptyComponent={() => (
          <Text
            style={{
              ...withdrawalStyles.placeHolderText,
              color: ThemeFunctions.customText(appTheme),
            }}>
            {strings('no_history')}
          </Text>
        )}
      />
    </>
  );
};

export default RedeemList;
