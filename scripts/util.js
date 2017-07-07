
function _paramExist (param, type) {
    return typeof param === type && param !== undefined && param !== null;
}

function absurl (root, path) {
    if (_paramExist(root, "string") && _paramExist(path, "string")) {
        if (root[root.length - 1] === "/") {
            return root + path;
        } else {
            return root + "/" + path;
        }
    }
    return null;
}
