export type RewardLockTerm = {
  milestone: number;

  origin_milestone: number;

  consumable: number;

  time_type: number;
};

export enum PoolStatus {
  Disabled,
  InReview,
  Pledge,
  Live,
  CapReached,
  Pause,
  Finished,
}

export enum PoolType {
  Locked,
  Flexible,
}

export enum ApyType {
  Dynamic,
  Fixed,
}

export enum TimeType {
  Minutes,
  Hour,
  Day,
  Block,
}

export enum Method {
  MasterNode,
  BackupNode,
}

export enum RewardType {
  Normal,
  DripInterval,
}

export type StakingType = 'locked' | 'flexible';
export type StakeStatus = 'Pledge' | 'Unstake' | 'Redeem';

export type UserStaked = {
  currentStaked: number;
  lockedStaked: number;
  flexibleStaked: number;
};

export type UserEarning = {
  totalEarning: number;
  lockedEarning: number;
  flexibleEarning: number;
};

export interface StakingPool {
  active_date: null | string;
  pledge_date: null | string;
  apy: string;
  apy_shown: string;
  apy_type: ApyType;
  asset: string;
  asset_reward: string;
  cap: string;
  cooldown_period: string;
  cooldown_period_time_type: TimeType;
  day_duration: string;
  day_duration_time_type: TimeType;
  drip_interval: string;
  drip_interval_time_type: TimeType;
  estimate_drip_interval: string;
  estimate_drip_interval_time_type: TimeType;
  estimate_origin_drip_interval: string;
  interest_end_date: null | string;
  max_stake_amount: string;
  method: Method;
  min_stake_amount: string;
  pool_id: number;
  pool_status: PoolStatus;
  pool_type: PoolType;
  reach_cap: string;
  reach_cap_date: null | string;
  reward_consumable: string;
  reward_type: RewardType;
  reward_lock_terms: RewardLockTerm[];
  pre_stake_amount: null | string,
  pre_stake_asset: null | string,
  pre_stake_duration: null | string
  sub_type: null | number
  max_stake_date: number | null
}

export interface MergeData {
  asset: string;
  pools: [
    {
      asset: string;
      asset_reward: string;
      active_date: null | string;
      pledge_date: null | string;
      apy: string;
      apy_shown: string;
      apy_type: ApyType;
      pool_status: PoolStatus;
      pool_type: PoolType;
      cap: string;
      cooldown_period: string;
      cooldown_period_time_type: TimeType;
      day_duration: string;
      day_duration_time_type: TimeType;
      drip_interval: string;
      drip_interval_time_type: TimeType;
      estimate_drip_interval: string;
      estimate_drip_interval_time_type: TimeType;
      estimate_origin_drip_interval: string;
      max_stake_amount: string;
      method: Method;
      min_stake_amount: string;
      pool_id: number;
      reach_cap: string;
      reach_cap_date: null | string;
      interest_end_date: null | string;
      reward_consumable: string;
      reward_type: RewardType;
      reward_lock_terms: RewardLockTerm[];
    },
  ];
}

export const GetStatusText = (status:PoolStatus) => {
  if (status===PoolStatus.CapReached) return "Cap Reached"
  if (status===PoolStatus.Live) return "Live"
  if (status===PoolStatus.Pledge) return "Pledge"
  if (status===PoolStatus.Pause) return "Pause"
  if (status===PoolStatus.Finished) return "Finished"
  if (status===PoolStatus.Disabled) return "Disabled"
  if (status===PoolStatus.InReview) return "In Review"
  return ""
}

export const GetPoolTypeText = (type:PoolType) => {
  if (type===PoolType.Flexible) return "Flexible"
  if (type===PoolType.Locked) return "Locked"
  return ""
}

export const GetPoolSubTypeText = (subType: number|null) => {
  if (subType) return "Individual"
  return "Community"
}


export const ActionType = [
  { value: 'Stake', label: 'Pledge' },
  { value: 'Unstake', label: 'Unstake' },
  { value: 'Redeem', label: 'Redeem' },
];


export const UNSTAKE_STATUS = {
  AWAIT_UNSTAKE: '1',
  UNSTAKE_EARLY: '2',
  UNSTAKE: '3',
};

export const REWARD_TYPES = {
  DURATIONS: 0,
  DRIP_INTERVAL: 1,
};

export const REDEEM_STATUS = {
  AWAIT_REDEEM: '1',
  DRIP_REDEEM: '2',
  REDEEM: '3',
};