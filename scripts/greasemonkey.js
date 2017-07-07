// ==UserScript==
// @name        hackernews|feed
// @namespace   https://github.com/CatherineZeng/hackernews-newsfeed
// @author      Anthony Pizzimenti
// @author      Catherine Zeng
// @description Tired of your cluttered Facebook newsfeed?
// @include     https://www.facebook.com/*
// @version     0.0.3
// @grant       GM_xmlhttpRequest
// @require     https://greasyfork.org/scripts/31226-editor/code/Editor.js?version=204775
// @require     https://greasyfork.org/scripts/31227-utilities/code/Utilities.js?version=204776
// ==/UserScript==

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
        s = new Editor(),
        
        items = list.getElementsByClassName("itemlist")[0],
        subtext = list.getElementsByClassName("subtext"),
        sitestr = list.getElementsByClassName("comhead"),
        storyLinks = list.getElementsByClassName("storylink"),
    
        header = items.insertRow(0),
        rows = items.getElementsByClassName("spacer"),
        
        i;
    
    // change hackernews styling
    s.removeFirst.parent(list, "yclinks");
    s.removeFirst.byClass(list, "morelink");
    s.removeFirst.byTag(list, "img");
    s.removeFirst.byTag(list, "tr");

    header.innerHTML = "<h2 style='background-color: #FF6600; padding:10px'>Hacker News</h2>";
    items.style.padding = "10px";
    
    // modify links to make them absolute
    s.links.absolute(list, subtext, url);
    s.links.blank(storyLinks);
    
    // modify font styles
    s.style.font(subtext, "Verdana", 7);
    s.style.font(sitestr, "Verdana", 7);

    // change padding on story rows
    s.style.height(rows, 10);

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
