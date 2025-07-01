import js from '@eslint/js';
import pluginQuasar from '@quasar/app-vite/eslint';
import prettierSkipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from '@vue/eslint-config-typescript';
import pluginImport from 'eslint-plugin-import';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';

const tsConfigFiles = ['tsconfig.json'];

export default defineConfigWithVueTs(
  {
    /**
     * Ignore the following files.
     * Please note that pluginQuasar.configs.recommended() already ignores
     * the "node_modules" folder for you (and all other Quasar project
     * relevant folders and files).
     *
     * ESLint requires "ignores" key to be the only one in this object
     */
    // ignores: []
  },

  pluginQuasar.configs.recommended(),
  js.configs.recommended,
  pluginImport.flatConfigs.recommended,

  /**
   * https://eslint.vuejs.org
   *
   * pluginVue.configs.base
   *   -> Settings and rules to enable correct ESLint parsing.
   * pluginVue.configs[ 'flat/essential']
   *   -> base, plus rules to prevent errors or unintended behavior.
   * pluginVue.configs["flat/strongly-recommended"]
   *   -> Above, plus rules to considerably improve code readability and/or dev experience.
   * pluginVue.configs["flat/recommended"]
   *   -> Above, plus rules to enforce subjective community defaults to ensure consistency.
   */
  pluginVue.configs['flat/essential'],
  {
    files: ['**/*.ts', '**/*.vue'],
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports' },
      ],
    },
  },

  // https://github.com/vuejs/eslint-config-typescript
  vueTsConfigs.recommendedTypeChecked,

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',

      globals: {
        ...globals.browser,
        ...globals.node, // SSR, Electron, config files
        process: 'readonly', // process.env.*
        ga: 'readonly', // Google Analytics
        cordova: 'readonly',
        Capacitor: 'readonly',
        chrome: 'readonly', // BEX related
        browser: 'readonly', // BEX related
      },
    },

    /** @see https://github.com/import-js/eslint-plugin-import?tab=readme-ov-file#typescript */
    settings: {
      'import/resolver': {
        typescript: {
          project: tsConfigFiles,
        },
        node: true,
      },
    },

    // add your custom rules here
    rules: {
      'prefer-promise-reject-errors': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports' },
      ],

      // allow debugger during development only
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',

      'import/order': [
        'error',
        {
          groups: [
            'type',
            'builtin',
            'external',
            'internal',
            'index',
            ['parent', 'sibling'],
            'unknown',
          ],
          pathGroups: [
            {
              pattern: '@/api/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/composable/**',
              group: 'internal',
              position: 'before',
            },
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
          },
        },
      ],
    },
  },

  {
    /** @see https://github.com/posva/unplugin-vue-router/discussions/482 */
    files: ['src/docs/**/*.vue', 'src/layouts/**/*.vue', 'src/pages/**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },

  {
    files: ['src-pwa/custom-service-worker.ts'],
    languageOptions: {
      globals: {
        ...globals.serviceworker,
      },
    },
  },

  {
    files: ['firebase/**/*.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },

  prettierSkipFormatting,
);
