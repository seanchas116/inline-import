"use strict";

var test = require("tap").test;
var transform = require("./index");

test("replace imports", function (t) {
  var source = "var foo = {bar: import('baz')};";
  var expect = "var foo = {bar: __inlineImport_0};\nimport __inlineImport_0 from 'baz';\n";
  t.same(transform(source), expect);
});
