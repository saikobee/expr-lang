var mapValues = require("lodash/object/mapValues");

var nm = require('./node-maker');

var almostAst = {
    Module:      ["expr"],
    Script:      ["expr"],
    Try:         ["expr"],
    Require:     ["expr"],
    Not:         ["expr"],
    Negate:      ["expr"],
    GetProperty: ["obj", "prop"],
    GetMethod:   ["obj", "prop"],
    CallMethod:  ["obj", "prop", "args"],
    Await:       ["binding", "promise", "expression"],
    AwaitExpr:   ["expression"],
    Identifier:  ["data"],
    Block:       ["expressions"],
    Call:        ["f", "args"],
    Function:    ["name", "parameters", "body"],
    Parameter:   ["identifier"],
    Parameters:  ["context", "positional", "slurpy"],
    If:          ["p", "t", "f"],
    Let:         ["bindings", "expr"],
    BinOp:       ["operator", "left", "right"],
    Error:       ["message"],
    Throw:       ["exception"],
    Operator:    ["data"],
    Array:       ["data"],
    Object:      ["data"],
    Number:      ["data"],
    String:      ["data"],
    True:        [],
    Global:      [],
    False:       [],
    Null:        [],
    Undefined:   [],
    Binding:     ["identifier", "value"],
    Pair:        ["key", "value"],
    IdentifierExpression: ["data"],

    Match: ["expression", "clauses"],
    MatchClause: ["pattern", "expression"],
    MatchPatternSimple: ["identifier"],
    MatchPatternParenExpr: ["expr"],
    MatchPatternLiteral: ["data"],
    MatchPatternArray: ["patterns"],
    MatchPatternArraySlurpy: ["patterns", "slurp"],
    MatchPatternObject: ["pairs"],
    MatchPatternObjectPair: ["key", "value"],
};

function addLoc(array, k) {
    return ["index"].concat(array);
}

var ast = nm("ast", mapValues(almostAst, addLoc));

module.exports = ast;
