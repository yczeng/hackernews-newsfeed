/**
 * @Anthony Pizzimenti
 * @desc Class containing useful style manipulation methods.
 * @param {object} content      Parent DOM container.
 * @property {object} content   Parent DOM container.
 * @constructor
 */
function Editor (content) { this.content = content; }

/**
 * @Anthony Pizzimenti
 * @desc Object wrapper for styling functions.
 */
Editor.prototype.style = {};

/**
 * @author Anthony Pizzimenti
 * @desc Changes the font style attributes of a given list of DOM nodes.
 *
 * @param {Array} context                   Array of DOM nodes to be modified. Usually consists of rows.
 * @param {string} [family="Comic Sans"]    Desired font families.
 * @param {number} [size=12]                Desired font size.
 * @param {string} [weight=""]              Desired font weight.
 * @returns {undefined};
 */
Editor.prototype.style.font = function (context, family, size, weight) {
    var i,
        text;
    
    if (!_paramExist(context, "array")) {
        console.error("Invalid font context provided.");
        return;
    }
    
    if (!_paramExist(family, "string")) {
        family = "Comic Sans";
    }
    
    if (!_paramExist(size, "number")) {
        size = 12;
    }
    
    if (!_paramExist(weight, "string")) {
        weight = "";
    }
    
    // modify text properties with defaults
    for (i = 0; i < context.length; i++) {
        text = context[i];
        text.style.fontFamily = family;
        text.style.fontSize = size.toString() + "pt";
        text.style.fontWeight = weight;
    }
};

/**
 * @author Anthony Pizzimenti
 * @param {Array} subtext       Array of DOM nodes to be modified.
 * @param {number} [height=""]  Desired height.
 */
Editor.prototype.style.height = function (subtext, height) {
    var i;
    
    if (!_paramExist(subtext, "array")) {
        console.error("Invalid subtext.");
        return;
    }
    
    if (!_paramExist(height, "number")) {
        height = "";
    }
    
    for (i = 0; i < subtext.length; i++) {
        subtext[i].style.height = height.toString() + "px";
    }
};

/**
 * @author Anthony Pizzimenti
 * @desc Wrapper object for removeFirst.
 *
 * @this Editor
 */
Editor.prototype.removeFirst = {};

/**
 * @author Anthony Pizzimenti
 * @desc Removes first DOM node's parent in class family.
 * @param {string} classname Family that contains element to be deleted.
 * @returns {undefined};
 *
 * @this Editor
 */
Editor.prototype.removeFirst.parent = function (classname) {
    if (_paramExist(classname, "string")) {
        this.content.getElementsByClassName(classname)[0].parentNode.remove();
    } else {
        console.error("Invalid class name provided.");
    }
};

/**
 * @author Anthony Pizzimenti
 * @desc Removes first DOM node in class family.
 * @param {string} classname Family that contains element to be deleted.
 * @returns {undefined};
 */
Editor.prototype.removeFirst.byClass = function (classname) {
    if (_paramExist(classname, "string")) {
        this.content.getElementsByClassName(classname)[0].remove();
    } else {
        console.error("Invalid class name provided.");
    }
};

/**
 * @author Anthony Pizzimenti
 * @desc Removes first DOM node in tag family.
 * @param {string} tagname Family that contains element to be deleted.
 * @returns {undefined};
 */
Editor.prototype.removeFirst.byTag = function (tagname) {
    if (_paramExist(tagname, "string")) {
        this.content.getElementsByTagName(tagname)[0].remove();
    } else {
        console.error("Invalid tag name provided.");
    }
};

/**
 * @author Anthony Pizzimenti
 * @desc Wrapper object for links.
 */
Editor.prototype.links = {};

/**
 * @author Anthony Pizzimenti
 * @desc Changes all relative links to absolute ones.
 * @param {Array} subtext   Array of DOM nodes.
 * @param {string} url      Root to join paths with.
 * @returns {undefined};
 */
Editor.prototype.links.absolute = function (subtext, url) {
    var regpath_hide = /hide\?./,
        regpath = /item\?.|user\?./,
        regurl = /\//,
        link,
        links,
        
        i,
        j;
    
    if (!_paramExist(subtext, "array")) {
        console.error("Subtext provided is invalid. Must be a list of DOM nodes.");
        return;
    }
    
    if (!_paramExist(url, "string")) {
        console.error("URL provided is invalid.");
        return;
    }
    
    for (i = 0; i < subtext.length; i++) {
        links = subtext[i].getElementsByTagName("a");
        
        // check for regex matches on hiding and item links
        for (j = 0; j < links.length; j++) {
            if (regpath_hide.test(links[j].href)) {
                links[j].remove();
            }
        }
    }
    
    // check for links everywhere else
    links = this.content.getElementsByTagName("a");
    for (i = 0; i < links.length; i++) {
        link = links[i].href.split(regurl)[3];
        
        if (regpath.test(link)) {
            links[i].href = absurl(url, link);
        }
    }
};

/**
 * @author Anthony Pizzimenti
 * @desc Sets all links' targets to be blank so they open on a new page.
 * @param {Array} subtext Array of DOM nodes containing links.
 */
Editor.prototype.links.blank = function (subtext) {
    var i;
    
    // set links so they open a new tab
    for (i = 0; i < subtext.length; i++) {
        subtext.target = "_blank";
    }
};
