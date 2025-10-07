import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {balanceStyles as styles} from '../../funding/styles';
import {withdrawalStyles} from '../../payments/styles';

import {FlatList, RefreshControl, Text} from 'react-native';
import {Loader} from '../../../enums';
import {GbexActions} from '../../../store';
import RowItem from './RowItem';
import HistoryShimmer from '../../funding/withdrawals/ListShimmer';
import {ThemeFunctions} from '../../../utils';
import {strings} from '../../../strings';
import {makeRequest} from '../../../services/ApiService';
import {MapperConstants} from '../../../constants';
import {showToast} from '../../../utils/GenericUtils';

const LogList = (props: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [referralLogs, setReferralLogs] = useState([]);

  const {isRtlApproach, appTheme, appColor} = useSelector(
    (state: any) => state.globalReducer,
  );

  useEffect(() => {
    fetchUserReferralLogs();
  }, [props.activeIndex]);

  const fetchUserReferralLogs = (showLoader: boolean = true) => {
    if (showLoader) setIsLoading(true);
    makeRequest(MapperConstants.ApiTypes.GET, 'referralearnings')
      .then(resp => {
        if (resp.status === 200) {
          setReferralLogs(resp.data.data);
        }
        // else {
        //   showToast('Log List', resp.message, 'error');
        // }
      })
      .catch(e => {
        console.log(e);
        showToast(strings('referrals'), strings('error_referrals'), 'error');
      })
      .finally(() => setIsLoading(false));
  };

  console.log(referralLogs);
  return (
    <>
      <FlatList
        data={referralLogs}
        initialNumToRender={10}
        contentContainerStyle={[styles.rewardlist]}
        renderItem={({item, index}) => (
          <RowItem
            trade={item}
            index={index}
            type={1}
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
            onRefresh={() => fetchUserReferralLogs()}
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

export default LogList;
