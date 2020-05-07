module.exports = {
  'env': {
      'es6': true,
      'node': true
  },
  'extends': 'eslint:recommended',
  'globals': {
      'Atomics': 'readonly',
      'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
      'ecmaVersion': 2018,
      'sourceType': 'module'
  },
  'rules': {
      'indent': [
          'error',
          2
      ],
      'linebreak-style': [
          'error',
          'windows'
      ],
      'quotes': [
          'error',
          'single', 
          { "allowTemplateLiterals": true }
      ],
      'semi': [
          'error',
          'never'
      ],
      'require-atomic-updates': 'off'
  }
}