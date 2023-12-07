module.exports = {
  meta: {
    type: 'layout',
    docs: {
      description: 'Enforce the exception Naming instead of anything else',
    },
  },

  create(context) {
    return {
      CatchClause(node) {
        const param = node.param;

        if (
          param &&
          param.type === 'Identifier' &&
          param.name !== 'exception'
        ) {
          context.report({
            node: param,
            message: 'Catch error naming should be exception instead of anything else',
          });
        }
      },
    };
  },
};
