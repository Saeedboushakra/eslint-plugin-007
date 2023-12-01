'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../lib/rules/no-await-without-trycatch');
const RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const eslintTester = new RuleTester();

eslintTester.run('no-await-without-trycatch', rule, {
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
        await deleteDocument(clientId, id);
        const updatedDocumentData = allDocuments.filter((doc) => doc.id !== id);
        setAllDocuments(updatedDocumentData);
      }`,
      parserOptions: { ecmaVersion: 8, sourceType: 'module' },
      errors: [
        {
          message: 'Await expressions should be executed in a try-catch block.',
        },
      ],
    },
  ],
});
