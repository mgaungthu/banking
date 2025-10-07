import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Animated,
  Keyboard,
  RefreshControl,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Button, CheckBox} from 'react-native-elements';

import {commonStyles} from '../../../globalstyles/styles';
import * as styles from './styles';
import * as ThemeFunctions from '../../../utils/ThemeFunctions';
import Header from '../../../components/ui/Header';
import {strings} from '../../../strings';
import {Loader} from '../../../enums';
import {ThemeText, LoadingSpinner} from '../../../components';

import HistoryCard from './historyCard';

import {APIConstants, MapperConstants} from '../../../constants';
import {AppActions, StakingActions} from '../../../store';
import {makeRequestNew} from '../../../services/ApiService';
import {showToast} from '../../../utils/GenericUtils';
import ConfirmModel from './ConfirmModel';

const StakingHistory = (props: any) => {
  const scrollViewRef = useRef();

  const [historyData, setHistoryData] = useState([]);

  const {appTheme, appColor, loading} = useSelector(
    (state: any) => state.globalReducer,
  );
  const scrollY = useRef(new Animated.Value(0)).current;

  const [isModelShow, setModelShow] = useState(false);
  const [updateId, setUpdateId] = useState();

  const dispatch = useDispatch<any>();
  const {history} = useSelector((state: any) => state.stakingReducer);

  // console.log(history);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const sorteData = history.sort((a, b) => {
      const statusOrder = ['active', 'withdrawn'];

      const statusA = statusOrder.indexOf(a.status);
      const statusB = statusOrder.indexOf(b.status);

      // If neither status is 'active' or 'withdrawn', leave the order unchanged
      if (statusA === -1 && statusB === -1) return 0;

      // If one of the statuses is found in statusOrder, sort based on their position
      if (statusA === -1) return 1;
      if (statusB === -1) return -1;

      // Otherwise, compare their positions in statusOrder
      return statusA - statusB;
    });
    setHistoryData(sorteData);
  }, [history]);

  const fetchData = () => {
    dispatch(StakingActions.getStakeData());
  };

  const renderScene = () => {
    if (loading === Loader.STAKE) {
      return (
        <View style={[styles.stakingHistory.bodyContainer]}>
          <View
            style={{
              padding: 10,
              marginTop: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <LoadingSpinner
              color={ThemeFunctions.getColor(appColor)}
              size="large"
            />
          </View>
        </View>
      );
    }

    if (historyData.length === 0) {
      return (
        <View style={[styles.stakingHistory.bodyContainer]}>
          <View
            style={{
              padding: 10,
              marginTop: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ThemeText
              style={[
                commonStyles.placeHolderText,
                {color: ThemeFunctions.customText(appTheme)},
              ]}>
              {strings('empty')}
            </ThemeText>
          </View>
        </View>
      );
    }

    return (
      <View style={[styles.stakingHistory.bodyContainer]}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={loading === Loader.STAKE}
              onRefresh={() => fetchData()}
            />
          }
          keyboardShouldPersistTaps="handled"
          ref={scrollViewRef}
          scrollEventThrottle={16}
          onScroll={x => {
            const scrollDist = x.nativeEvent.contentOffset.y;
            scrollY.setValue(scrollDist);
          }}>
          <View>
            {historyData.map((item, i) => (
              <HistoryCard
                srNo={i + 1}
                item={item}
                key={i}
                handleWithdraw={handleWithdraw}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  const handleWithdraw = id => {
    setModelShow(true);
    setUpdateId(id);
  };

  const handleUpdate = async () => {
    dispatch(AppActions.updateLoading(Loader.STAKE));
    const response = await makeRequestNew(
      MapperConstants.ApiTypes.PATCH,
      APIConstants.STAKE,
      {},
      {stake_id: updateId},
    );

    console.log(response.data);

    if (response.status === 200) {
      showToast('', 'Stake Withdraw successfully', 'success');
      dispatch(StakingActions.getStakeData());
      setModelShow(false);
    }
    dispatch(AppActions.updateLoading(MapperConstants.StatusMapper.disable));
  };

  return (
    <SafeAreaView
      onStartShouldSetResponder={() => {
        Keyboard.dismiss();
      }}
      style={[
        commonStyles.tabSafeView,
        ThemeFunctions.setBackground(appTheme),
      ]}>
      <Header title={strings('staking_history')} />

      {/* BODY STARTS */}
      {renderScene()}

      <ConfirmModel
        visible={isModelShow}
        setModelShow={setModelShow}
        text={
          'Are you sure you want to withdraw? Once confirm, interest will no longer be accumulated on the principal'
        }
        handleUpdate={handleUpdate}
      />
    </SafeAreaView>
  );
};

export default StakingHistory;
