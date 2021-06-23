module.exports = {
  setupFilesAfterEnv: ['./src/setupTests.js'],
  coveragePathIgnorePatterns: [
    'node_modules',
    '<rootDir>/src/serviceWorker.js',
    '<rootDir>/src/setupTests.js',
    '<rootDir>/src/testing/test-utils.js'
  ],
  collectCoverageFrom: [
    "<rootDir>/src/**/*"
  ],
  testEnvironment: 'jsdom',
  globalSetup: '<rootDir>/src/testing/test-setup-env.js', //https://github.com/vercel/next.js/issues/17903
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy', // https://jestjs.io/docs/webpack#mocking-css-modules
  }
};
