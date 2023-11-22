## Getting started

```bash
npm install --save-dev eslint-plugin-neo-technologies
```
## In .eslintrc.cjs
```bash 
plugins: ['eslint-plugin-neo-technologies'],

 rules: {
    'neo-technologies/if-max-lines': [2, { maxLines: 8 } ],
  }
```
## Note
 maxlines is the number of maximum lines allowed for control statments. The Value of maxlines must be greater than 0.

 