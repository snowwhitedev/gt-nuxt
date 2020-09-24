module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
  ],
  plugins: [
    'prettier'
  ],
  // add your custom rules here
  // rules: {
  //   'camelcase': [2, { 'properties': 'never' }]
  // }
  rules: {
    "camelcase": ["error"],
  },
  overrides: [
    {
      "files": ["**/*.ts", "**/*.tsx", "**/*.vue"],
      "rules": {
        "camelcase": ["off"]
      }
    }
  ],
}
