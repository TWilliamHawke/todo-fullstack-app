module.exports = {
  "transform": {
    '^.+\\.js$': "babel-jest"
  },
  "testPathIgnorePatterns": [
    "<rootDir>/node_modules/",
    "<rootDir>/client/node_modules/"
  ],
  "coveragePathIgnorePatterns": [
    "<rootDir>/node_modules/",
    "<rootDir>/client/node_modules/"
  ]
};