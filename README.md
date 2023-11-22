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
