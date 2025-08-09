import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import eslintReact from '@eslint-react/eslint-plugin'

import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { js },
    extends: [tseslint.configs.recommended, eslintReact.configs.recommended],
    languageOptions: {
      // Include browser global variables (window, document, etc.)
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Enable JSX syntax support
        },
      },
    },
  },
])
