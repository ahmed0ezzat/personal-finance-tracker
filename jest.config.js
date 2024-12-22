module.exports = {
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
      },
    testEnvironment: 'jsdom',  // jsdom simulates a browser environment for testing
    transform: {
      '^.+\\.vue$': 'vue-jest', // Transforms .vue files using vue-jest
      '^.+\\.js$': 'babel-jest', // Transforms JavaScript files using Babel
    },
    moduleFileExtensions: ['vue', 'js', 'json'], // Recognize these file extensions for tests
    testMatch: ['**/__tests__/**/*.spec.[jt]s?(x)'], // Default pattern for test files
  };
  