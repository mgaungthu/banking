import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
    useRoute: () => ({
      route: jest.fn(),
    }),
    useIsFocused: jest.fn(),
  };
});

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('@react-native-community/netinfo', () =>
  jest.fn().mockImplementation(() => {}),
);
jest.mock('react-native-device-info', () => ({
  hasNotch: () => true,
}));

jest.mock('react-native-i18n', () => {
  const i18njs = require('i18n-js');
  const en = require('./App/locales/en.json');
  i18njs.translations = {en}; // Optional ('en' is the default)

  return {
    t: jest.fn((k, o) => i18njs.t(k, o)),
    currentLocale: jest.fn(() => i18njs.currentLocale()),
  };
});

// jest.mock('react-native-permissions', () =>
//   jest.fn().mockImplementation(() => {}),
// );
// jest.mock('react-native-splash-screen', () => ({
//   hide: jest.fn(),
//   show: jest.fn(),
// }));

jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist');
  return {
    ...real,
    persistReducer: jest
      .fn()
      .mockImplementation((config, reducers) => reducers),
  };
});

const mockAddListener = jest.fn();
const mockremoveListener = jest.fn();
jest.mock('react-native/Libraries/AppState/AppState', () => ({
  addEventListener: mockAddListener,
}));
jest.mock('react-native/Libraries/AppState/AppState', () => ({
  removeEventListener: mockremoveListener,
}));
