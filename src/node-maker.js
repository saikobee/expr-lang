function f(prefix, type, props) {
    return function() {
        var obj = {};
        var args = [].slice.call(arguments);
        var n = args.length;
        var m = props.length;
        if (n !== m) {
            var name = [prefix, type].join(".");
            throw new Error(
                "got " + n + " arguments, " +
                "expected " + m + " arguments for " + name +
                " (args: " + args.join(", ") + ")"
            );
        }
        obj.type = type;
        props.forEach(function(p, i) {
            obj[p] = args[i];
        });
        return obj;
        // return Object.freeze(obj);
    };
}

function nm(prefix, ast) {
    Object
    .keys(ast)
    .forEach(function(k) {
        ast[k] = f(prefix, k, ast[k]);
    });
    return ast;
}

module.exports = nm;
