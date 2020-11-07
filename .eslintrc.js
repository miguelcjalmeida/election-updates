module.exports = {
  extends: ['airbnb-typescript', 'prettier'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    semi: ['error', 'never'],
    '@typescript-eslint/semi': ['error', 'never'],
    'react/destructuring-assignment': 'off',
  },
}
