#!/usr/bin/env node

var fs = require("fs");
var concat = require("concat-stream");
var inlineImport = require("../");

if (process.argv.length !== 3 && process.stdin.isTTY) {
  console.log("Usage: inline-import [file]");
  process.exit(1);
}

if (process.argv.length === 3) {
  var input = fs.createReadStream(process.argv[2]);
} else {
  var input = process.stdin;
  input.resume();
}

input.pipe(concat({encoding: "string"}, gotInput));
input.on("error", errorExit);

function gotInput(str) {
  process.stdout.write(inlineImport(str));
}

function errorExit(err) {
  console.err(err);
  process.exit(1);
}
