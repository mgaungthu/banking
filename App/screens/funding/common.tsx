import React from 'react';
import {Text, View} from 'react-native';
import {ThemeFunctions} from '../../utils';

import {statusPill as styles} from './styles';

type UserTXStatus =
  | 'cancelled'
  | 'Waiting'
  | 'Completed'
  | 'Complete'
  | 'Completeed';

export const TruncateString = (str: string): string => {
  if (str.length <= 11) return str;
  return str.substr(0, 6) + '...' + str.substr(str.length - 4, 4);
};

export const IsCompleted = (status: UserTXStatus) => {
  return ['Completed', 'Complete', 'Completeed'].includes(status);
};

export const IsCancelled = (status: UserTXStatus) => {
  return status === 'cancelled';
};

export const IsPending = (status: UserTXStatus) => {
  return status === 'Waiting';
};

export const StatusColor = (status: UserTXStatus) => {
  if (IsCompleted(status)) {
    return 'green';
  }
  if (IsPending(status)) {
    return '#ffc107';
  }
  return 'gray';
};

export const StatusPill = (status: UserTXStatus) => {
  if (IsCompleted(status)) {
    return (
      <View style={[styles.successPill]}>
        <Text
          adjustsFontSizeToFit={true}
          numberOfLines={1}
          style={[styles.text]}>
          Completed
        </Text>
      </View>
    );
  }

  if (IsPending(status)) {
    return (
      <View style={[styles.pendingPill]}>
        <Text
          adjustsFontSizeToFit={true}
          numberOfLines={1}
          style={[styles.text]}>
          Pending
        </Text>
      </View>
    );
  }

  if (IsCancelled) {
    return (
      <View style={[styles.cancelledPill]}>
        <Text
          adjustsFontSizeToFit={true}
          numberOfLines={1}
          style={[styles.text]}>
          Cancelled
        </Text>
      </View>
    );
  }

  return <></>;
};
