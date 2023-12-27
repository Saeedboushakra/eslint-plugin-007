module.exports = {
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Enforce consistent grouping for action functions',
      },
    },
    create: (context) => {
      const functionGroup = [];
      let onAfterHandle = false;
      let onBeforeHandle = false;
      let handleAfterOn = false;
      let handleBeforeOn = false;
  
      return {
        VariableDeclaration(node) {
          const { declarations } = node;
  
          declarations.forEach((declaration) => {
            const { id } = declaration;
            if (id && id.type === 'Identifier') {
              const { name } = id;
  
              if (name.startsWith('on')) {
                functionGroup.push({ name, type: 'on' });
              } else if (name.startsWith('handle')) {
                functionGroup.push({ name, type: 'handle' });
              }
            }
          });
  
          for (let i = 1; i < functionGroup.length - 1; i++) {
            if (
              functionGroup[i - 1].type === 'handle' &&
              functionGroup[i].type === 'on'
            ) {
              onAfterHandle = true;
            }
            if (
              functionGroup[i].type === 'on' &&
              functionGroup[i + 1].type === 'handle'
            ) {
              onBeforeHandle = true;
            }
            if (
              functionGroup[i - 1].type === 'on' &&
              functionGroup[i].type === 'handle'
            ) {
              handleAfterOn = true;
            }
            if (
              functionGroup[i].type === 'handle' &&
              functionGroup[i + 1].type === 'on'
            ) {
              handleBeforeOn = true;
            }
  
            if ((onAfterHandle && onBeforeHandle)||(handleAfterOn && handleBeforeOn)) {
              context.report({
                node,
                message: 'Mismatch in the grouping of "handle" and "on" functions.',
              });
              break;
            }
          }
        },
      };
    },
  };