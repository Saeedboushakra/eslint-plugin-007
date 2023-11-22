module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Enforce Max Lines for control Statements.",
      recommended: true,
    },
    fixable: "code",
    schema: [
      {
        type: "object",
        properties: {
          maxLines: {
            type: "integer",
            minimum: 1,
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    const { maxLines = 8 } = context.options[0] || {};

    function checkIfStatement(node) {
      const { loc } = node;
      const startLine = loc.start.line;
      const endLine = loc.end.line;
      const lines = endLine - startLine - 1;

      if (lines > maxLines) {
        context.report({
          node,
          message: `Too many lines {${lines}} in control statement. Maximum allowed: ${maxLines}`,
        });
      }
    }

    return {
      IfStatement(node) {
        const { consequent } = node;
        if (consequent && consequent.type === "BlockStatement") {
          checkIfStatement(consequent);
        }
      },
    };
  },
};