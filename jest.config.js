module.exports = {
  "moduleFileExtensions": [
    "js",
    "jsx",
    "ts",
    "tsx"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "globals": {
    "ts-jest": {
      "tsConfig": "tsconfig.json"
    }
  },
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
