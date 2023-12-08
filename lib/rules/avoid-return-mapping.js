module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce Array Mapping outside JSX return statement',
    },
  },
  create: function (context) {
    let isMappingArray = false;
    return {
      JSXExpressionContainer(node) {
        if (
          node.expression &&
          node.expression.callee &&
          node.expression.callee.property &&
          node.expression.callee.property.name === 'map'
        ) {
          isMappingArray = true;
        }

        if (isMappingArray) {
          context.report({
            node,
            message: 'Avoid Array Mapping in JSX return statement',
          });

          isMappingArray = false;
        }
      },
    };
  },
};