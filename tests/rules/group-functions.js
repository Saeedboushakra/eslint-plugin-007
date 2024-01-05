'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../lib/rules/group-functions');
const RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const eslintTester = new RuleTester();

eslintTester.run('group-functions', rule, {
  valid: [
    {
      code: `
      const FinalReviewTab = () => {
      
        const onSuccessModalClose = () => {
          setFailureModalOpen(false);
          dispatch(updateActiveTab(statusMatrix["STATUS_COMPLETE"]));
          navigate(PipelineNewClientsPath);
        };
      
        const onFailureModalClose = () => {
          closeFailureModal();
          dispatch(updateActiveTab(statusMatrix["STATUS_COMPLETE"]));
          navigate(PipelineNewClientsPath);
        };
         const handleopenSuccessModal = (systemId) => {
          setSystemId(systemId);
        };
      
        const openSuccessModal = (systemId) => {
          setSystemId(systemId);
        };
      
      
      };
    
      export default FinalReviewTab;
      `,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
    },
  ],
  invalid: [
    {
      code: `
      
const FinalReviewTab = () => {
  const handleopenSuccessModal = (systemId) => {
    setSystemId(systemId);
  };
  const onSuccessModalClose = () => {
    setFailureModalOpen(false);
    dispatch(updateActiveTab(statusMatrix["STATUS_COMPLETE"]));
    navigate(PipelineNewClientsPath);
  };

  const onFailureModalClose = () => {
    closeFailureModal();
    dispatch(updateActiveTab(statusMatrix["STATUS_COMPLETE"]));
    navigate(PipelineNewClientsPath);
  };
  

  const openSuccessModal = (systemId) => {
    setSystemId(systemId);
  };


};

export default FinalReviewTab;

       `,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
      errors: [
        {
          message:
            'Functions order should be "on" then "handle" then "other" functions',
        },
      ],
    },
  ],
});
