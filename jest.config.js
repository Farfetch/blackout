module.exports = {
  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFiles: ['./tests/setupReactTestingLibrary', 'jest-localstorage-mock'],
  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ['./tests/setupAfterEnv'],
  // A list of paths to snapshot serializer modules Jest should use for snapshot testing
  snapshotSerializers: ['./tests/axiosErrorSerializer'],
  // The test environment that will be used for testing
  testEnvironment: 'jsdom',
  // The regexp pattern or array of patterns that Jest uses to detect test files
  testRegex: ['.+\\.test.[jt]s(x?)$', '!dist'],
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ['**/src/**/*.{js,jsx,ts,tsx}', '!**/.vscode/**/*'],
  // An object that configures minimum threshold enforcement for coverage results
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '__tests__/',
    'packages/client/src/entities/schemas',
    'packages/react/src/analytics/integrations/Forter/loadForterScriptForSiteId.js',
    'packages/react/src/payments/components/constants.js',
    'packages/react/src/checkout/hooks', // TODO - https://farfetch.atlassian.net/browse/FPSCH-1454
    'packages/redux/src/entities/schemas',
    'packages/redux/src/search/utils.js',
    // @TODO: remove these two client folders after the split
    'packages/client/src/entities/redux',
    'packages/client/src/helpers/redux',
    '__fixtures__',
  ],
  // A map from regular expressions to module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '^@farfetch/blackout-analytics(.*)$': '<rootDir>/packages/analytics/src$1',
    '^@farfetch/blackout-client/src(.*)$': '<rootDir>/packages/client/src$1',
    '^@farfetch/blackout-client(.*)$': '<rootDir>/packages/client/src$1',
    '^@farfetch/blackout-redux/src(.*)$': '<rootDir>/packages/redux/src$1',
    '^@farfetch/blackout-redux(.*)$': '<rootDir>/packages/redux/src$1',
    '^jestSetup$': '<rootDir>/jestSetup',
    '^tests(.*)$': '<rootDir>/tests$1',
  },
  // Add custom reporters to Jest
  reporters: ['default'],
  // Allows the usage of custom watch plugins
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
