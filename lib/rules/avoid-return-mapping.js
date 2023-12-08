module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce Array Mapping outside JSX return statement',
    },
  },
  create: function (context) {
    return {
      JSXExpressionContainer(node) {
        if (
          node.expression &&
          node.expression.callee &&
          node.expression.callee.property &&
          node.expression.callee.property.name === 'map'
        ) {
          context.report({
            node,
            message: 'Avoid Array Mapping in JSX return statement',
          });
        }
      },
    };
  },
};
