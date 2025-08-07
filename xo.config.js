/** @type {import('xo').FlatXoConfig} */
const xoConfig = [
  {
    react: true,
    prettier: 'compat',
    space: true,
    rules: {
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            kebabCase: true,
            pascalCase: true,
          },
        },
      ],
    },
  },
]

export default xoConfig
