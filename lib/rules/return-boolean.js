module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce direct return of boolean instead of true/false',
    },
  },
  create: function (context) {
    let conditionIsBoolean = false;

    return {
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
          conditionIsBoolean
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
