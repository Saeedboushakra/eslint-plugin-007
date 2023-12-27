'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../lib/rules/boolean-naming');
const RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const eslintTester = new RuleTester();

eslintTester.run('boolean-naming', rule, {
  valid: [
    {
      code: `
      const isLoading = true;
      const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
      const [SubmitDisabled, setSubmitDisabled] = useState("");
      `,
      parserOptions: { ecmaVersion: 2021, sourceType: 'module' },
    },
  ],
  invalid: [
    {
      code: `
      const loading = false;
      const [SubmitDisabled, setSubmitDisabled] = useState(true);
      const [isSubmitDisabled, makeIsSubmitDisabled] = useState('');`,
      parserOptions: { ecmaVersion: 2021, sourceType: 'module' },
      errors: [
        {
          message: 'Boolean variable names should start with "is".',
        },
        {
          message: 'Boolean variable names should start with "is".',
        },
        {
          message: 'State-setting function names should start with "set".',
        },
      ],
    },
  ],
});
