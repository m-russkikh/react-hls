module.exports = {
  moduleNameMapper: {
    '^.+\\.(css|scss)$': '<rootDir>/__tests__/styleMock.js',
  },
  modulePaths: ['<rootDir>'],
  setupTestFrameworkScriptFile: '<rootDir>/__tests__/setupTests.js',
  modulePathIgnorePatterns: ['<rootDir>/__tests__/'],
  globals: {
    Hls: true,
  }
};
