'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../lib/rules/if-max-lines');
const RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const eslintTester = new RuleTester();

eslintTester.run('if-max-lines', rule, {
  valid: [
    {
      code: `
        const load = () => {
          if (!isReady) {
            return null;
          }
        };`,
      parserOptions: { ecmaVersion: 8, sourceType: 'module' },
    },
  ],
  invalid: [
    {
      code: `
      const load = () => { 
        if (isReady) {
          try {
            const accessToken = BrowserUtil.extractTokenFromUrl(location);
            SessionUtil.setAccessToken(accessToken);
            RmApi.getRmProfile();
            dispatch(setIsAuthenticated(true));
            setAuthenticated(true);
          } catch (error) {
            setAuthenticated(false);
            console.error(error);
          } finally {
            setAuthenticating(false);
          }
        }
      };`,
      parserOptions: { ecmaVersion: 8, sourceType: 'module' },
      errors: [
        {
          message:
            'Too many lines {12} in control statement. Maximum allowed: 8',
        },
      ],
    },
  ],
});
