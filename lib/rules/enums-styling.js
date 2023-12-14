module.exports = {
    meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce Consistent Enums Naming.',
      recommended: true,
    },
    },
    create: function (context) {
      return {
        VariableDeclaration(node) {
          for (const declaration of node.declarations) {
            const variableName = declaration.id.name;
            if (
              declaration.init &&
              declaration.init.type === 'ObjectExpression' &&
              variableName.toLowerCase().includes('enum') 
            ) {
              for (const property of declaration.init.properties) {
                  const keyName = property.key.name;
                  if (keyName !== keyName.toUpperCase()) {
                    context.report({
                      node: property.key,
                      message: 'Enum keys should be in uppercase.',
                    });
                  }
                  const valueName = property.value.value;
                  if (valueName !== valueName.toLowerCase()) {
                    context.report({
                      node: property.value,
                      message: 'Enum values should be in lowercase.',
                    });
                  }
                }
              }
            }
          }
      };
    },
  };
  