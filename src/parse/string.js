var P = require("parsimmon");

var ast = require("../ast");
var H = require("../parse-helpers");

var join = H.join;
var wrap = H.wrap;
var ione = H.ione;

var Char = P.regex(/[^"\n\\]+/);

var SimpleEscape =
    P.alt(
        P.string("\\\\").result("\\"),
        P.string("\\\"").result("\""),
        P.string("\\n").result("\n"),
        P.string("\\t").result("\t"),
        P.string("\\r").result("\r")
    );

var HexNumber =
    P.regex(/[0-9a-fA-F]+/)
    .map(function(s) { return Number("0x" + s); });

// TODO: Polyfill String.fromCodePoint so this works in older enviornments.
var UnicodeEscape =
    wrap("\\u{", HexNumber, "}")
    .map(String.fromCodePoint);

var StringInner =
    P.alt(SimpleEscape, UnicodeEscape, Char)
    .many()
    .map(join(""));

var DQuote = P.string('"');

var String_ =
    ione(ast.String,
        DQuote.then(StringInner).skip(DQuote).desc("string"));

module.exports = function(ps) {
    return String_;
};
