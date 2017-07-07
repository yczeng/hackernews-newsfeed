/**
 * @author Anthony Pizzimenti
 * @desc Checks whether a parameter exists and is of the desired type.
 * @param {*} param     Paramter to check.
 * @param {string} type Desired type.
 * @returns {boolean}
 * @private
 */
function _paramExist (param, type) {
    return typeof param === type && param !== undefined && param !== null;
}

/**
 * @author Anthony Pizzimenti
 * @desc Creates an absolute URL from the provided path and root.
 * @param {string} root Root URL.
 * @param {string} path Root-relative path.
 * @returns {*}
 */
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
