inline-import
========

Inline (function-like) ES6 `import` like good old CommonJS `require`

[![Build Status](https://travis-ci.org/seanchas116/inline-import.svg?branch=master)](https://travis-ci.org/seanchas116/inline-import)

Example
--------

### Input

```js
var foo = {
  bar: import("bar")
};
```

### Output

```js
var foo = {
  bar: __inlineImport_0;
};
import __inlineImport_0 from 'bar';
```

Usage
--------

### As Library


```js
var inlineImport = require("inline-import");
inlineImport(source) // => transformed source
```

### As CLI

```
inline-import input.js > output.js
cat input.js | inline-import > output.js
```

Todo
--------

- Ignore template strings and regular expressions
- Source map support
- Browserify transform
- webpack loader
