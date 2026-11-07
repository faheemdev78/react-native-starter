const { defineConfig, globalIgnores } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const globals = require('globals');

module.exports = defineConfig([
  globalIgnores(['dist/*', 'coverage/*', '.expo/*', 'node_modules/*', 'android/*', 'ios/*']),
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    files: ['babel.config.js', 'jest.config.js', 'eslint.config.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: [
      '**/__tests__/**/*.{ts,tsx}',
      '**/*.test.{ts,tsx}',
      'jest.setup.ts',
      'src/test/**/*.ts',
      'src/test/**/*.tsx',
    ],
    languageOptions: {
      globals: globals.jest,
    },
  },
]);
