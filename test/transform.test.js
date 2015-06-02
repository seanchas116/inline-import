"use strict";

var assert = require("chai").assert;
var transform = require("../");

describe("inline-import", function () {

  describe("with signle quote", function () {
    it("converts inline imports", function () {
      var source = "var foo = {bar: import('baz')};\n";
      var expect = "var foo = {bar: __inlineImport_0};\nimport __inlineImport_0 from 'baz';\n";
      assert.equal(transform(source), expect);
    });
  });

  describe("with double quote", function () {
    it("converts inline imports", function () {
      var source = 'var foo = {bar: import("baz")};\n';
      var expect = "var foo = {bar: __inlineImport_0};\nimport __inlineImport_0 from 'baz';\n";
      assert.equal(transform(source), expect);
    });
  });

  it("ignores comments", function () {
    var source = "/* import('foo')}; */ import('bar')\n";
    var expected = "/* import('foo')}; */ __inlineImport_0\nimport __inlineImport_0 from 'bar';\n";
    assert.equal(transform(source), expected);
  });

  it("ignores line comments", function () {
    var source = "// import('foo')};\nimport('bar')\n";
    var expected = "// import('foo')};\n__inlineImport_0\nimport __inlineImport_0 from 'bar';\n";
    assert.equal(transform(source), expected);
  });
})
