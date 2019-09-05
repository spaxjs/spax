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
  "setupFilesAfterEnv": [
    "<rootDir>/test/enzyme.ts"
  ],
  "testMatch": [
    "**/test/*.spec.(ts|tsx)"
  ],
  "testEnvironment": "jest-environment-jsdom-fourteen",
  "collectCoverage": true,
  "collectCoverageFrom": [
    "packages/*/src/**.(ts|tsx)",
    "!**/src/types.(ts|tsx)",
    "!**/framework-*/**",
    "!**/spax-cli/**",
    "!**/node_modules/**"
  ],
  "coverageReporters": [
    "lcov",
    "text-summary"
  ]
}
