module.exports = {
  "moduleFileExtensions": [
    "js",
    "jsx",
    "ts",
    "tsx"
  ],
  "transform": {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
  },
  "setupFiles": [
    "react-app-polyfill/jsdom"
  ],
  "testMatch": [
    "packages/*/test/*.spec.(ts|tsx)"
  ],
  "testEnvironment": "jest-environment-jsdom-fourteen",
  "collectCoverage": true,
  "collectCoverageFrom": [
    "packages/*/src/**.(ts|tsx)",
    "!**/src/types.(ts|tsx)",
    "!**/framework-*/**",
    "!**/plugin-*/**",
    "!**/spax-*/**",
    "!**/node_modules/**"
  ],
  "coverageReporters": [
    "lcov",
    "text-summary"
  ]
}
