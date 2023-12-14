'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../lib/rules/enums-styling');
const RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const eslintTester = new RuleTester();

eslintTester.run('enums-styling', rule, {
  valid: [
    {
      code: `
        export const requestStatusEnums = {
        STATUS_TODO: "to_do",
        STATUS_IN_PROGRESS: "in_progress",
      };`,
      parserOptions: { ecmaVersion: 8, sourceType: 'module' },
    },
  ],
  invalid: [
    {
      code: `
      export const requestStatusEnums = {
        STATUS_TODO: "TO_DO",
        status_IN_PROGRESS: "IN_PROGRESS",
      };`,
      parserOptions: { ecmaVersion: 8, sourceType: 'module' },
      errors: [
        {
          message: 'Enum values should be in lowercase.',
        },
        {
          message: 'Enum keys should be in uppercase.',
        },
        {
          message: 'Enum values should be in lowercase.',
        },
       
      ],
    },
  ],
});
