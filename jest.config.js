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
    "**/test/*.(ts|tsx)"
  ],
  "testEnvironment": "jest-environment-jsdom-fourteen",
  "collectCoverage": true,
  "collectCoverageFrom": [
    "**/src/**.(ts|tsx)",
    "!**/src/types.(ts|tsx)",
    "!**/demo-*/**",
    "!**/framework-*/**",
    "!**/plugin-*/**",
    "!**/spax-*/**",
    "!**/starter-*/**",
    "!**/node_modules/**"
  ],
  "coverageReporters": [
    "lcov",
    "text-summary"
  ]
}
