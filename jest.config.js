module.exports = {
  "transform": {
    '^.+\\.js$': "babel-jest"
  },
  "testPathIgnorePatterns": [
    "<rootDir>/node_modules/",
    "<rootDir>/client/"
  ],
  "coveragePathIgnorePatterns": [
    "<rootDir>/node_modules/",
    "<rootDir>/client/"
  ]
};