"use strict";

function fileIndexToPositionMapper(code, filename) {
    var positions = [];
    var line = 1;
    var column = 1;
    for (var i = 0, n = code.length; i < n; i++) {
        positions[i] = {line: line, column: column};
        if (code.charAt(i) === "\n") {
            column = 1;
            line++;
        } else {
            column++;
        }
    }
    var m = positions.length - 1;
    var startPosition = {line: 1, column: 1};
    var endPosition = {
        line: positions[m].line,
        column: positions[m].column + 1
    };
    return function updateIndexToLoc(node) {
        if (node.index) {
            // TODO: Probably kinda bogus to just fall back to the beginning of
            // ending of the file, but I'm keeping it for now.
            node.loc = {
                start: positions[node.index.start] || startPosition,
                end: positions[node.index.end] || endPosition
            };
        }
    };
}

module.exports = fileIndexToPositionMapper;
