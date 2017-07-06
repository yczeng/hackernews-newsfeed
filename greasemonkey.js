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
        items = list.getElementsByClassName("itemlist")[0],
        header = items.insertRow(0),
        rows = items.getElementsByClassName("spacer"),
        subtext = list.getElementsByClassName("subtext"),
        sitestr = list.getElementsByClassName("comhead"),
        storyLinks = list.getElementsByClassName("storylink"),
        i;

    // change hackernews styling
    list.getElementsByClassName("morelink")[0].remove();
    list.getElementsByClassName("yclinks")[0].parentNode.remove();
    list.getElementsByTagName("img")[0].remove();
    list.getElementsByTagName("tr")[0].remove();

    header.innerHTML = "<h2 style='background-color: #FF6600; padding:10px'>Hacker News</h2>";
    items.style.padding = "10px";

    // change font styling for story sources, metadata
    for (i = 0; i < subtext.length; i++) {
        subtext[i].style.fontSize = "7pt";
        subtext[i].style.color = "#828282";
    }

    for (i = 0; i < sitestr.length; i++) {
        sitestr[i].style.fontSize = "7pt";
        sitestr[i].style.color = "#828282";
    }

    // change padding on story rows
    for (i = 0; i < rows.length; i++) {
        rows[i].style.height = "10px";
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
        "%c ______________________________________________________________________________________ \n" +
        "|                                                                                      |\n" +
        "| NNN      NN EEEEEEEEE WW         WW  SSSSSSS FFFFFFFFFF EEEEEEEEE EEEEEEEEE DDDDDDD   |\n" +
        "| NN NN    NN EE        WW         WW SS       FF         EE        EE        DD    DD  |\n" +
        "| NN  NN   NN EE         WW       WW   SSSSSS  FF         EE        EE        DD     DD |\n" +
        "| NN   NN  NN EEEEEEE    WW   W   WW        SS FFFFFFFF   EEEEEEE   EEEEEEE   DD     DD |\n" +
        "| NN    NN NN EE          WW W W WW         SS FF         EE        EE        DD    DD  |\n" +
        "| NN      NNN EEEEEEEEE    WW   WW    SSSSSSS  FF         EEEEEEEEE EEEEEEEEE DDDDDDD   |\n" +
        "|______________________________________________________________________________________|\n" +
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

