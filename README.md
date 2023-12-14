## Getting started

```bash
npm install --save-dev eslint-plugin-neo-technologies
```

## In .eslintrc.cjs

```bash
plugins: ['eslint-plugin-neo-technologies'],

 rules: {
    'neo-technologies/if-max-lines': [2, { maxLines: 8 } ],
    'neo-technologies/no-await-without-trycatch': 2,
    'neo-technologies/max-or-operators': 2,
    'neo-technologies/return-boolean': 2,
    'neo-technologies/catch-errors-naming': 2,
    'neo-technologies/avoid-return-mapping': 2,
    'neo-technologies/enums-styling': 2,
    'neo-technologies/boolean-naming': 2,
   }
```

## Details

This plugin is to Enforce best Coding Guidelines

## Rules

1. if-max-lines is to enforce max lines in a control statement.
2. no-await-without-trycatch is to enforce Await expressions to be executed in a try-catch block.
3. max-or-operators is to enforce single OR (||) operator inside an if statement.
4. return-boolean is to enforce Direct return of boolean instead of true/false.
5. catch-errors-naming is to enforce consistent naming for errors.
6. avoid-return-mapping is to enforce Array Mapping outside JSX return statement.
7. enums-styling is to enforce consistent Enums naming.
8. boolean-naming is to enforce consistent Boolean naming.