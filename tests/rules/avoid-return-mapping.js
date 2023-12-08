'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../lib/rules/avoid-return-mapping');
const RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const eslintTester = new RuleTester();

eslintTester.run('avoid-return-mapping', rule, {
  parser: 'babel-eslint',
  valid: [
    {
      code: `
        const Component = () => {
          const displayArrayItems = () => array.map(item => <Grid>...</Grid>)
          
          return (
            <>
              {displayArrayData()}
            </>
          )
        }`,
      parserOptions: {
        ecmaVersion: 8,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
  ],
  invalid: [
    {
      code: `
        const Disclosure = () => {
        const theme = useTheme();
        const isMobile = useMediaQuery(theme.breakpoints.down("md"));
        const displayDescriptions = () => {
            const components = [];
            for (let i = 3; i <= 18; i++) {
            components.push(
            );
            }
            return components;
        };

        return (
            <ul>
                {this.props.items.map(item => (
                <Item key={item.id} item={item} onClick={this.handleClick} />
                ))}
            </ul>
        );
        };`,
      parserOptions: {
        ecmaVersion: 8,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      errors: [
        {
          message:
            'Avoid Array Mapping in JSX return statement',
        },
      ],
    },
  ],
});
