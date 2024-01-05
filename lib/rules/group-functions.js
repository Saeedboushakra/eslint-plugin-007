module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce consistent grouping and ordering for functions',
    },
  },
  create: (context) => {
    return {
      BlockStatement(node) {
        let previousType = 'on';
        const functionGroup = [];

        node.body.forEach((statement) => {
          if (statement.type === 'VariableDeclaration') {
            const { declarations } = statement;

            declarations.forEach((declaration) => {
              const { id, init } = declaration;

              if (
                id &&
                id.type === 'Identifier' &&
                init &&
                (init.type === 'FunctionExpression' || init.type === 'ArrowFunctionExpression')
              ) {
                const { name } = id;
                let type = 'other';

                if (name.startsWith('on')) {
                  type = 'on';
                } else if (name.startsWith('handle')) {
                  type = 'handle';
                }

                functionGroup.push({ name, type, node: id });
              }
            });
          }
        });

        for (let i = 0; i < functionGroup.length; i++) {
          const currentFunction = functionGroup[i];

          if (
            (currentFunction.type === 'on' && previousType !== 'on') ||
            (currentFunction.type === 'handle' && previousType === 'other')
          ) {
            context.report({
              node: currentFunction.node,
              message: 'Functions order should be "on" then "handle" then "other" functions',
            });
            break;
          }

          previousType = currentFunction.type;
        }
      },
    };
  },
};
