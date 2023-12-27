'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../lib/rules/return-boolean');
const RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const eslintTester = new RuleTester();

eslintTester.run('return-boolean', rule, {
  valid: [
    {
      code: `
      const isVisible = () => {
        return this.isLoading;
      };`,
      parserOptions: { ecmaVersion: 2021, sourceType: 'module' },
    },
  ],
  invalid: [
    {
      code: `
      const isloading = true;
      const isVisible = () => {
        if (isLoading) {
          return true;
        }
        return false;
      };`,
      parserOptions: { ecmaVersion: 2021, sourceType: 'module' },
      errors: [
        {
          message: 'Return a boolean directly instead of true/false.',
        },
        {
          message: 'Return a boolean directly instead of true/false.',
        },
      ],
    },
  ],
});
