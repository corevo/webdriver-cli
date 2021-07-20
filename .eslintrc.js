module.exports = {
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  extends: ['eslint:recommended', 'plugin:node/recommended', 'prettier'],
  plugins: ['prettier', 'node'],
  rules: {
    'no-dupe-class-members': 'off',
    'no-unused-vars': 'off',
    'no-inner-declarations': 0,
    'prettier/prettier': 'error',
    'react/prop-types': [0],
    'no-const-assign': 'error',
    'no-this-before-super': 'error',
    'no-undef': 'error',
    'no-unreachable': 'error',
    'constructor-super': 'error',
    'valid-typeof': 'error',
    'node/no-unpublished-require': 'error',
    'node/no-unsupported-features/es-syntax': 0,
    'node/no-unsupported-features/node-builtins': 0,
    'node/shebang': 'error',
    'node/no-missing-import': [
      'error',
      {
        tryExtensions: ['.js', '.json', '.node'],
      },
    ],
  },
}
