module.exports = {
  'verbose': true,
  'moduleDirectories': ['node_modules', 'imports'],
  'testMatch': ['**/?(*.)test.js'],
  'transform': {
    '^.+\\.mjs$': 'babel-jest',
    '^.+\\.js$': 'babel-jest'
  },
  'moduleFileExtensions': ['js', 'js']
};
