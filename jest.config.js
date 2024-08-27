module.exports = {
  preset: 'react-native',
  "setupFilesAfterEnv": ["@testing-library/jest-native/extend-expect"],
  "transformIgnorePatterns": [
    "node_modules/(?!(react-native|DummyApp|react-navigation)/)"
  ]
};
