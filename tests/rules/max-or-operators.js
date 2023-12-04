'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../lib/rules/max-or-operators');
const RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const eslintTester = new RuleTester();

eslintTester.run('max-or-operators', rule, {
  valid: [
    {
      code: `const info = [clientInfo.fullName, clientInfo.dateOfBirth, clientInfo.civileIdExpiryDate];
        if (info.includes(label)){
            const name = label;
        }`,
      parserOptions: { ecmaVersion: 8, sourceType: 'module' },
    },
  ],
  invalid: [
    {
      code: `if(label === clientInfo.fullName || 
        label === clientInfo.dateOfBirth || 
        label === clientInfo.civileIdExpiryDate)
        {
         const name = label;
        }`,
      parserOptions: { ecmaVersion: 8, sourceType: 'module' },
      errors: [
        {
          message: 'More than one OR (||) operator inside if statement.',
        },
      ],
    },
  ],
});
