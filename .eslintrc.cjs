module.exports = {
  env: { browser: true, es2020: true },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react-hooks/recommended'],
  parserOptions: { 
    ecmaVersion: 'latest', 
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['react', 'react-refresh', 'prettier'],
  rules: {
    'react-refresh/only-export-components': 'warn',
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
