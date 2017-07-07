// ==UserScript==
// @name        hackernews|feed
// @namespace   https://github.com/CatherineZeng/hackernews-newsfeed
// @author      Anthony Pizzimenti
// @author      Catherine Zeng
// @description Tired of your cluttered Facebook newsfeed?
// @include     https://www.facebook.com/*
// @version     0.0.2
// @grant       GM_xmlhttpRequest
// ==/UserScript==

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
 * @type {{}}
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

Editor.prototype.removeFirst = {};

Editor.prototype.removeFirst.byClass = function (classname) {
    this.content.getElementsByClassName(classname)[0].remove();
};

Editor.prototype.removeFirst.byTag = function (tagname) {
    this.content.getElementsByTagName(tagname)[0].remove();
};

Editor.prototype.links = {};

Editor.prototype.links.absolute = function (list, subtext, url) {
    var regpath_hide = /hide\?./,
        regpath = /item\?.|user\?./,
        regurl = /\//,
        link,
        links,
        
        i,
        j;
    
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

Editor.prototype.links.blank = function (context) {
    var i;
    
    // set links so they open a new tab
    for (i = 0; i < context.length; i++) {
        context.target = "_blank";
    }
};

/**
 * @author Anthony Pizzimenti
 * @desc Changes facebook's newsfeed and alters styling.
 * @param {object} content Content returned by Greasemonkey's request wrapper.
 * @param {string} url URL at the time the request was finished.
 * @return {undefined}
 */
function editFacebookContent (content, url) {
    var feed = document.getElementById("contentArea"),
        
        parser = new DOMParser(),
        list = parser.parseFromString(content, "text/html").getElementById("hnmain"),
        s = new Editor(list),
        
        items = list.getElementsByClassName("itemlist")[0],
        subtext = list.getElementsByClassName("subtext"),
        sitestr = list.getElementsByClassName("comhead"),
        storyLinks = list.getElementsByClassName("storylink"),
    
        header = items.insertRow(0),
        rows = items.getElementsByClassName("spacer"),
        
        i,
        j;

    // change hackernews styling
    list.getElementsByClassName("morelink")[0].remove();
    list.getElementsByClassName("yclinks")[0].parentNode.remove();
    list.getElementsByTagName("img")[0].remove();
    list.getElementsByTagName("tr")[0].remove();

    header.innerHTML = "<h2 style='background-color: #FF6600; padding:10px'>Hacker News</h2>";
    items.style.padding = "10px";
    
    // modify links to make them absolute
    s.links.absolute(list, subtext, url);
    s.links.blank(storyLinks);
    
    // modify font styles
    s.style.font(subtext, "Verdana", 7);
    s.style.font(sitestr, "Verdana", 7);

    // change padding on story rows
    for (i = 0; i < rows.length; i++) {
        rows[i].style.height = "10px";
    }

    // inject modified HTML
    feed.innerHTML = list.innerHTML;

    // change facebook styling;
    feed.style.padding = "10px !important";
    feed.style.backgroundColor = "#F6F6EF";
    feed.style.fontFamily = "Verdana, Geneva, sans serif";
}

/**
 * @author Anthony Pizzimenti
 * @desc Sends a message before data is loaded.
 * @param {string} url URL from which the Hackernews feed is loaded.
 * @returns {undefined}
 */
function preLoad (url) {
    var feed = document.getElementById("contentArea");
    feed.innerHTML = "<h2 align=center id='loading-data'>Retrieving Hackernews feed...</h2>";

    console.log(
        "%c ______________________________________________________________________________________ \n" +
        "|                                                                                        |\n" +
        "| NNN      NN EEEEEEEEE WW         WW  SSSSSSS FFFFFFFFFF EEEEEEEEE EEEEEEEEE DDDDDDD    |\n" +
        "| NN NN    NN EE        WW         WW SS       FF         EE        EE        DD    DD   |\n" +
        "| NN  NN   NN EE         WW       WW   SSSSSS  FF         EE        EE        DD     DD  |\n" +
        "| NN   NN  NN EEEEEEE    WW   W   WW        SS FFFFFFFF   EEEEEEE   EEEEEEE   DD     DD  |\n" +
        "| NN    NN NN EE          WW WWW WW         SS FF         EE        EE        DD    DD   |\n" +
        "| NN      NNN EEEEEEEEE    WW   WW    SSSSSSS  FF         EEEEEEEEE EEEEEEEEE DDDDDDD    |\n" +
        "|________________________________________________________________________________________|\n" +
        "@version 0.0.2",
        "color: #FF6600"
    );
    
    console.log(
        "%cRetrieving data from " + url.toString() + "...",
        "color=#ff6600"
    );
}

/**
 * @author Anthony Pizzimenti
 * @desc Event-fired function when feed from Hackernews is loaded.
 * @param {object} res GM_xmlhttpRequest response object.
 * @returns {undefined}
 */
function load (res) {
    var content = res.responseText,
        url = res.finalUrl;

    console.log(
        "%cRetrieved data from Y Combinator's Hackernews.",
        "color=#ff660"
    );

    editFacebookContent(content, url);
}

/**
 * @author Anthony Pizzimenti
 * @desc Event-fired function when feed from Hackernews couldn't be loaded or the request failed.
 * @param {object} e GM_xmlhttpRequest response object.
 * @returns {undefined}
 */
function error (e) {
    console.error(e.responseText);
    console.error("Aborting Greasemonkey user script.");
}

/**
 * @author Anthony Pizzimenti
 * @desc IIFE that immediately loads Hackernews feed.
 * @returns {undefined}
 */
(function getHackerNews () {
    var req = GM_xmlhttpRequest,
        url = "https://news.ycombinator.com";

    preLoad(url);

    // send GreaseMonkey-enabled same-origin request
    req({
        method: "GET",
        url: url,
        onload: load,
        onerror: error
    });
})();

