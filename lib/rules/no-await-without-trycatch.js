module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce Await expressions to be executed in a try-catch block.',
      recommended: true,
    },
    fixable: 'code',
  },
  create(context) {
    return {
      AwaitExpression(throwNode) {
        if (
          context.getAncestors().every((node) => node.type != 'TryStatement')
        ) {
          context.report({
            node: throwNode,
            message: "Await expressions should be executed in a try-catch block.",
          });
        }
      },
    };
  },
};
