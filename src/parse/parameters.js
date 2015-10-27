var P = require("parsimmon");

var ast = require("../ast");

var H = require("../parse-helpers");
var word = H.word;
var ione = H.ione;
var iseq = H.iseq;
var list0 = H.list0;
var cons = H.cons;

module.exports = function(ps) {
    var Parameter =
        ione(ast.Parameter, ps.Identifier);

    // Parameters look like this:
    // (@this, a, b, c, ...xs)
    // The first piece (@this) is the context.
    // The second piece (a, b, c) is the positional.
    // The third piece (...xs) is the slurpy.
    // All pieces are optional.

    var ParamSlurpy = word("...").then(Parameter);
    var ParamContext = P.string("@").then(Parameter);
    var ParamsPositional = list0(ps.Separator, Parameter);

    var Params2 =
        P.alt(
            P.seq(ParamsPositional, ps.Separator.then(ParamSlurpy)),
            P.seq(P.of([]), ParamSlurpy),
            P.seq(ParamsPositional, P.of(null)),
            P.of(null)
        );

    var Params1 =
        P.alt(
            ParamContext.chain(function(x) {
                return ps.Separator.then(Params2.map(cons(x)));
            }),
            ParamContext.map(function(x) { return [x, [], null]; }),
            Params2.map(cons(null))
        );

    return iseq(ast.Parameters, Params1);
};
