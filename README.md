# hackernews-newsfeed
Sick of your ad-ridden Facebook newsfeed? Convert it to Hacker News!

This extension removes your Facebook newsfeed and replaces it with Hacker News.

<img src="preview.png" width="100%">

# Installation
## Chrome
hackernews-newsfeed can be installed on the chrome webstore [here](https://chrome.google.com/webstore/detail/convert-facebook-newsfeed/edcoflgjlemkndaenboobeccnnlnondj).

Or you can clone this repo and upload the folder to chrome extensions at chrome://extensions/.
```
git clone https://github.com/CatherineZeng/hackernews-newsfeed
```

## Firefox/Greasemonkey/Tampermonkey
If you have Firefox, install [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/),
the friendly user-script injection service. 

[You can install from greasyfork](https://greasyfork.org/en/scripts/31209-hackernews-feed), the
Greasemonkey/Tampermonkey/*monkey hosting service. Then just click the link to install the script,
and you're good to go.

If you don't want to do the above option, you can do stuff the hard way. 

1. Go to Firefox's [addon page](about:addons)

2. Go to Greasemonkey (or *User Scripts*), and click **New User Script...**

3. Name it whatever you want, provide your email as the Domain, and click **Done**.

4. Edit the script, and paste the contents of `greasemonkey.js` in, and click save.

5. Click on **Preferences**, **User Settings**, and then **Add** included pages.

6. Enter `https://www.facebook.com/*`, then click *OK*, and *OK* again.

7. fin.

![firefox](firefox.png)

# License
hackernews-newsfeed is available under the MIT license, see `LICENSE` file in the repository.


