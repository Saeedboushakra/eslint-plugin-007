'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../lib/rules/actions-grouping');
const RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const eslintTester = new RuleTester();

eslintTester.run('actions-grouping', rule, {
  valid: [
    {
      code: 
        `const handleNoteActions = () => {
        if (isEditMode) {
        handleEditNote(clientId, note.id, note.value);
        } else {
        handleAddNote(clientId, note.value);
        }
        };

        const handleDeleteNoteAction = () => {
        deleteNote();
        };

        const onDeleteClick = (isOpen, noteId) => {
        setNote({
        id: noteId,
        ...note,
        });
        updateDeleteNoteDialog(isOpen);
        };`,
      parserOptions: {
        ecmaVersion:  2021,
        sourceType: 'module',
      },
    },
  ],
  invalid: [
    {
      code: `const onDeleteClick = (isOpen, noteId) => {
        setNote({
        id: noteId,
        ...note,
        });
        updateDeleteNoteDialog(isOpen);
        };
        const handleDeleteNoteAction = () => {
            deleteNote();
            };
        const onEditClick = (data, id) => {
        setEditMode(true);
        setNote({
        id,
        value: data,
        });
        };
       `,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
      errors: [
        {
          message: 'Mismatch in the grouping of "handle" and "on" functions.',
        },
      ],
    },
  ],
});
