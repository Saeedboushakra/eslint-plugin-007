module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce Consistent Boolean Naming.',
    },
  },
  create: function (context) {
    return {
      VariableDeclarator(node) {
        const { id, init } = node;

        if (
          init &&
          init.type === 'Literal' &&
          typeof init.value === 'boolean'
        ) {
          const isPrefix = id.name.startsWith('is');

          if (!isPrefix) {
            context.report({
              node: id,
              message: 'Boolean variable names should start with "is".',
            });
          }
        }

        if (init && init.callee && init.callee.name === 'useState') {
          const [stateVariable, setStateFunction] = id.elements;
          if (
            init.arguments &&
            init.arguments.length > 0 &&
            init.arguments.some(
              (arg) => arg.type === 'Literal' && typeof arg.value === 'boolean'
            )
          ) {
            if (stateVariable && stateVariable.type === 'Identifier') {
              const isPrefix = stateVariable.name.startsWith('is');

              if (!isPrefix) {
                context.report({
                  node: stateVariable,
                  message: 'Boolean variable names should start with "is".',
                });
              }
            }
          }
          if (setStateFunction && setStateFunction.type === 'Identifier') {
            const isSetterFunction = setStateFunction.name.startsWith('set');
            if (!isSetterFunction) {
              context.report({
                node: setStateFunction,
                message:
                  'State-setting function names should start with "set".',
              });
            }
          }
        }
      },
    };
  },
};
