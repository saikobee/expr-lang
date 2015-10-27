var parsimmonSalad = require("./parsimmon-salad");

var ps = parsimmonSalad({
    _: require("./parse/whitespace"),
    Literal: require("./parse/literal"),
    Expr: require("./parse/expr"),
    If: require("./parse/if"),
    Number: require("./parse/number"),
    String: require("./parse/string"),
    Parameters: require("./parse/parameters"),
    Function: require("./parse/function"),
    BasicLiteral: require("./parse/basic-literal"),
    BinExpr: require("./parse/bin-expr"),
    Let: require("./parse/let"),
    CallOrGet: require("./parse/call-or-get"),
    Identifier: require("./parse/identifier"),
    Name: require("./parse/name"),
    Match: require("./parse/match"),
    Object: require("./parse/object"),
    Array: require("./parse/array"),
    IdentifierAsString: require("./parse/identifier-as-string"),
    ObjectPairKey: require("./parse/object-pair-key"),
    Module: require("./parse/module"),
    NamedLiteral: require("./parse/named-literal"),
    TopUnaryExpr: require("./parse/top-unary-expr"),
    Separator: require("./parse/separator"),
    Await: require("./parse/await"),
    IdentExpr: require("./parse/ident-expr"),
    ParenExpr: require("./parse/paren-expr")
});

module.exports = ps;
