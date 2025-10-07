export const StatusMapper: any = {
  enable: true,
  disable: false,
};
export const Status = {
  active: 1,
  inactive: 0,
  approved: 2,
  rejected: 3,
};

export const Steps = {
  first: 1,
  second: 2,
  googleAuth: 3,
};

export const ApiTypes = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
  PUT: 'PUT',
};

export const Gender: any = {
  '0': 'Male',
  '1': 'Female',
};

export const GenderMapper = {
  Male: 0,
  Female: 1,
};

export const KycStatus = {
  pending: 0,
  submitted: 1,
  approved: 2,
  rejected: 3,
};
export const KycStatusConstant = {
  pending: 'pending',
  submitted: 'submitted',
  approved: 'approved',
  rejected: 'rejected',
};
export const KycStatusValues = {
  pending: 'pending',
  submitted: 'submitted',
  approved: 'verified',
  rejected: 'rejected',
};

export const PorStatusValues = {
  pending: 'Verifying',
  submitted: 'submitted',
  approved: 'verified',
  rejected: 'rejected',
  not_submitted: 'not_submitted',
};

export const AccountType = {
  individual: 'individual',
  business: 'business',
};

export const KybStatusConstant = {
  pending: 'kyb_pending',
  verified: 'verified',
  not_submitted: 'not_submitted',
};
export const KybStatus = {
  pending: '0',
  verified: '1',
};

export const mainCurrencySymbol = {BTC: '₿', EUR: '€', USD: '$', ETH: 'ETH'};

export const INFORMED_VERSION = 'INFORMED_VERSION';
