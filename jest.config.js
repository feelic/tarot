module.exports = {
  'verbose': true,
  'moduleDirectories': ['node_modules', 'imports'],
  'testMatch': ['**/?(*.)test.mjs'],
  'transform': {
    '^.+\\.mjs$': 'babel-jest',
    '^.+\\.js$': 'babel-jest'
  },
  'moduleFileExtensions': ['mjs', 'js']
};
