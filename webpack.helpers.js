const path = require('path');

function root(args){
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [path.resolve(__dirname, '.')].concat(args));
}

exports.root = root;