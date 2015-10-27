var PREDEF = require("../predef-ast");
var fileWrapper = require("../file-wrapper");
var es = require("../es");

function moduleExportsEq(loc, x) {
    var moduleExports =
        es.MemberExpression(
            loc,
            false,
            es.Identifier(null, 'module'),
            es.Identifier(null, 'exports')
        );
    return es.AssignmentExpression(null, '=', moduleExports, x);
}

function Module(transform, node) {
    var value = transform(node.expr);
    var expr = moduleExportsEq(node.loc, value);
    var body = PREDEF.body.concat([expr]);
    return fileWrapper(body);
}

module.exports = Module;
