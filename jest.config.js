module.exports = {
  // Added `.mts` files since by default jest does not support them
  moduleFileExtensions: [
    'js',
    'mjs',
    'mts',
    'cjs',
    'jsx',
    'ts',
    'tsx',
    'json',
    'node',
  ],
  // Changed to add mts files to `transform` option since the default regex value does not include them
  transform: { '\\.m?[jt]sx?$': 'babel-jest' },
  // Add crypto-es to transformIgnorePatterns as it is an ESM-only package
  transformIgnorePatterns: ['/node_modules/(?!(crypto-es)/)'],
  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFiles: ['./tests/setupReactTestingLibrary.ts', 'jest-localstorage-mock'],
  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ['./tests/setupAfterEnv.ts'],
  // A list of paths to snapshot serializer modules Jest should use for snapshot testing
  snapshotSerializers: ['./tests/axiosErrorSerializer.ts'],
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
    'packages/react/src/analytics/integrations/Forter/loadForterScriptForSiteId.ts',
    'packages/react/src/payments/components/constants.js',
    'packages/react/src/checkout/hooks', // TODO - https://farfetch.atlassian.net/browse/FPSCH-1454
    'packages/redux/src/entities/schemas',
    'packages/redux/src/search/utils.js',
    // @TODO: remove these two client folders after the split
    'packages/client/src/entities/redux',
    'packages/client/src/helpers/redux',
    'packages/react/src/orders/hooks/useOrderReturnOptions.ts',
    '__fixtures__',
  ],
  // A map from regular expressions to module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.m?js$': '$1', // This is to support the resolution algorithm in jest which does not use extensions
    '^lodash-es$': 'lodash', // Map lodash-es to lodash so we do not need to transpile it
    '^@farfetch/blackout-analytics(.*)$': '<rootDir>/packages/analytics/src$1',
    '^@farfetch/blackout-client/src(.*)$': '<rootDir>/packages/client/src$1',
    '^@farfetch/blackout-client(.*)$': '<rootDir>/packages/client/src$1',
    '^@farfetch/blackout-redux/src(.*)$': '<rootDir>/packages/redux/src$1',
    '^@farfetch/blackout-redux(.*)$': '<rootDir>/packages/redux/src$1',
    '^jestSetup$': '<rootDir>/jestSetup',
    '^tests(.*)\\.m?js$': '<rootDir>/tests$1',
  },
  testPathIgnorePatterns: [
    'packages/react/src/orders/hooks/__tests__/useOrderReturnOptions.test.ts',
  ],
  // Add custom reporters to Jest
  reporters: ['default'],
  // Allows the usage of custom watch plugins
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
