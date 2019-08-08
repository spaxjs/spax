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
  // "globals": {
  //   "ts-jest": {
  //     "tsConfig": "tsconfig.json"
  //   }
  // },
  "testMatch": [
    "**/test/*.(ts|tsx)"
  ],
  "collectCoverage": process.env.npm_lifecycle_event === "test",
  "collectCoverageFrom": [
    "**/src/**/*.(ts|tsx)"
  ],
  "coverageReporters": [
    "lcov",
    "text-summary"
  ]
}
