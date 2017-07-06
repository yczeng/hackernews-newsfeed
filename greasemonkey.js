// ==UserScript==
// @name        hackernews|feed
// @namespace   https://github.com/CatherineZeng/hackernews-newsfeed
// @author      Anthony Pizzimenti
// @author      Catherine Zeng
// @description Tired of your cluttered Facebook newsfeed?
// @include     https://www.facebook.com/*
// @version     0.0.1
// @grant       GM_xmlhttpRequest
// ==/UserScript==

/**
 * @author Anthony Pizzimenti
 * @desc Changes facebook's newsfeed and alters styling.
 * @param {object} content Content returned by Greasemonkey's request wrapper.
 * @return {undefined}
 */
function editFacebookContent (content) {
    var feed = document.getElementById("contentArea"),
        parser = new DOMParser(),
        list = parser.parseFromString(content, "text/html").getElementById("hnmain"),
        morelink = list.getElementsByClassName("morelink")[0],
        linkParent = list.getElementsByClassName("yclinks")[0].parentNode,
        subtext = list.getElementsByClassName("subtext"),
        sitestr = list.getElementsByClassName("comhead"),
        storyLinks = list.getElementsByClassName("storylink"),
        image = list.getElementsByTagName("img")[0],
        i;

    // change hackernews styling
    morelink.remove();
    linkParent.remove();
    image.remove();

    // change font styling for story sources, metadata
    for (i = 0; i < subtext.length; i++) {
        subtext[i].style.fontSize = "7pt";
        subtext[i].style.color = "#828282";
    }

    for (i = 0; i < sitestr.length; i++) {
        sitestr[i].style.fontSize = "7pt";
        sitestr[i].style.color = "#828282";
    }

    // set links so they open a new tab
    for (i = 0; i < storyLinks.length; i++) {
        storyLinks[i].target = "_blank";
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
    var content = res.responseText;

    console.log(
        "%cRetrieved data from Y Combinator's Hackernews.",
        "color=#ff660"
    );

    editFacebookContent(content);
}

/**
 * @author Anthony Pizzimenti
 * @desc Event-fired function when feed from Hackernews couldn't be loaded or the request failed.
 * @param {object} res GM_xmlhttpRequest response object.
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

