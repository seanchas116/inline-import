inline-import
========

Inline (function-like) ES6 `import` like good old CommonJS `require`

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
import __inlineImport_0 from 'baz';
```

Usage
--------

### As Library

TODO

### As CLI

TODO

Todo
--------

- Ignore comments and strings
- Source map support
- Browserify transform
- webpack loader
