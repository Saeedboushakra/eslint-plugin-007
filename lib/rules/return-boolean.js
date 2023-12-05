module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce direct return of boolean instead of true/false',
    },
  },
  create: function (context) {
    let conditionIsBoolean = false;
    let ifStatementCount = 0;

    function functionType(node) {
      ifStatementCount = countIfStatements(node.body);
    }

    function countIfStatements(node) {
      let count = 0;

      if (node.type === 'BlockStatement') {
        for (const statement of node.body) {
          if (statement.type === 'IfStatement') {
            count++;
          }
        }
      }

      return count;
    }
    return {
      FunctionDeclaration: functionType,
      FunctionExpression: functionType,
      ArrowFunctionExpression: functionType,
      IfStatement(node) {
        const { test } = node;
        if (
          test &&
          ((test.name && test.name.startsWith('is')) ||
            (test.property &&
              test.property.name &&
              test.property.name.startsWith('is')))
        ) {
          conditionIsBoolean = true;
        } else {
          conditionIsBoolean = false;
        }
      },
      ReturnStatement(node) {
        const { argument } = node;

        if (
          argument &&
          (argument.raw === 'true' || argument.raw === 'false') &&
          conditionIsBoolean &&
          ifStatementCount === 1
        ) {
          context.report({
            node,
            message: 'Return a boolean directly instead of true/false.',
          });
        }
      },
    };
  },
};
