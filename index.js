"use strict";

var Parser = require("fastparse");

var parser = new Parser({
  source: {
    "/\\*": "comment",
    "//": "lineComment",
    "import\\(['\"]([^'\")]*)['\"]\\)": function (match, name, index, length) {
      this.imports.push({
        name: name,
        index: index,
        length: length
      });
      return "source";
    }
  },
  comment: {
    "\\*/": "source"
  },
  lineComment: {
    "\n": "source"
  }
});

function findImports(source) {
  var context = {
    imports: []
  };
  parser.parse("source", source, context);

  return context.imports;
};

function importName(index) {
  return "__inlineImport_" + index;
}

function replaceImports(source, imports) {
  var result = "";
  var lastIndex = 0;

  imports.forEach(function (importData, i) {
    var importData = imports[i];
    result += source.substring(lastIndex, importData.index);
    result += importName(i);
    lastIndex = importData.index + importData.length;
  });

  result += source.substring(lastIndex);

  return result;
}

function topImports(imports) {
  return imports.map(function (importData, i) {
    return "import " + importName(i) + " from '" + importData.name + "';\n";
  }).join();
}

function transform(source) {
  var imports = findImports(source);

  return replaceImports(source, imports) + "\n" + topImports(imports);
}

module.exports = transform;
