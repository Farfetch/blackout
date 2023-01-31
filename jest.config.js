module.exports = {
  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFiles: [
    './.enzymerc',
    './tests/setupReactTestingLibrary',
    'jest-localstorage-mock',
  ],
  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ['./tests/setupAfterEnv'],
  // A list of paths to snapshot serializer modules Jest should use for snapshot testing
  snapshotSerializers: [
    'enzyme-to-json/serializer',
    './tests/axiosErrorSerializer',
  ],
  // The test environment that will be used for testing
  testEnvironment: 'jsdom',
  // The regexp pattern or array of patterns that Jest uses to detect test files
  testRegex: '.+\\.test.js$',
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ['**/src/**/*.{js,jsx}'],
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
    'packages/core/src/bags/hooks/useBagItem.js',
    'packages/core/src/search/redux/utils.js',
    'packages/core/src/tests/',
    'packages/react/src/hooks/tests/',
    'packages/react/src/tests/',
    'packages/react/src/analytics/integrations/Forter/loadForterScriptForSiteId.js',
  ],
  // A map from regular expressions to module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '^@farfetch/blackout-core(.*)$': '<rootDir>/packages/core/src$1',
    '^jestSetup$': '<rootDir>/jestSetup',
    '^tests(.*)$': '<rootDir>/tests$1',
  },
  // Add custom reporters to Jest
  reporters: ['default', 'jest-junit'],
  // Allows the usage of custom watch plugins
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
