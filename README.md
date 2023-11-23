## Getting started
```bash
npm install --save-dev eslint-plugin-neo-technologies
```
## In .eslintrc.cjs
```bash 
plugins: ['eslint-plugin-neo-technologies'],

 rules: {
    'neo-technologies/if-max-lines': [2, { maxLines: 8 } ],
    'neo-technologies/no-await-without-trycatch': [2],
  }
```
## Details
This plugin is to Enforce best Coding Guidelines

## Rules
if-max-lines is to enforce max lines in a control statement.
no-await-without-trycatch is to enforce Await expressions to be executed in a try-catch block.



 
