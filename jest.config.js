module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    // './__mocks__/react-native-blob-util.ts',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@?react-navigation|@react-native)',
  ],
  setupFiles: [
    './node_modules/react-native-gesture-handler/jestSetup.js',
    './jest.setup.js',
  ],
  resetMocks: false,
  transform: {
    // '^.+\\.svg$': 'jest-svg-transformer',
    '^.+\\.html?$': 'html-loader-jest',
  },
  globals: {
    window: {},
  },
};
