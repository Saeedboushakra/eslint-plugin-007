'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../lib/rules/catch_errors_naming');
const RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const eslintTester = new RuleTester();

eslintTester.run('catch_errors_naming', rule, {
  valid: [
    {
      code: `
      const onDelete = async (id) => {
        try {
        await deleteDocument(clientId, id);
         const updatedDocumentData = allDocuments.filter((doc) => doc.id !== id);
         setAllDocuments(updatedDocumentData);
        } catch (exception){
         console.log(exception)
        }
      
       }`,
      parserOptions: { ecmaVersion: 8, sourceType: 'module' },
    },
  ],
  invalid: [
    {
      code: `
      const onDelete = async (id) => {
        try {
        await deleteDocument(clientId, id);
         const updatedDocumentData = allDocuments.filter((doc) => doc.id !== id);
         setAllDocuments(updatedDocumentData);
        } catch (error){
         console.log(exception)
        }
      
       }`,
      parserOptions: { ecmaVersion: 8, sourceType: 'module' },
      errors: [
        {
          message:
            "Catch error naming should be exception instead of anything else",
        },
      ],
    },
  ],
});
