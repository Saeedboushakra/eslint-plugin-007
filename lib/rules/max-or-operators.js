module.exports = {
  meta: {
    type: 'layout',
    docs: {
      description: 'Enforce single OR (||) operator inside if statement.',
      recommended: true,
    },
  },
  create: function (context) {
    let orOperatorCount = 0;

    function countOrOperators(node) {
      if (node.type === 'LogicalExpression' && node.operator === '||') {
        orOperatorCount++;

        countOrOperators(node.left);
        countOrOperators(node.right);
      }
    }

    return {
      IfStatement: function (node) {
        if (
          node.test.type === 'LogicalExpression' &&
          node.test.operator === '||'
        ) {
          orOperatorCount = 0;
          countOrOperators(node.test);

          if (orOperatorCount > 1) {
            context.report({
              node: node.test,
              message: 'More than one || operator in a single condition.',
            });
          }
        }
      },
    };
  },
};
