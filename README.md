## Getting started

```bash
npm install --save-dev eslint-plugin-custom-best-practice
```
## In .eslintrc.cjs
```bash 
plugins: ['eslint-plugin-custom-best-practice'],

 rules: {
    'custom-best-practice/if-max-lines': [2, { maxLines: 8 } ],
  }
```
## Note
 maxlines is the number of max lines allowed for control statments. Value of maxlines must be greater than 0.

 


