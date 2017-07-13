function selectFeed() {

  var menuItems = document.getElementById('universalNav').children[0].children;
  for (i=0; i<menuItems.length; i++) {
    if (this.parentNode != menuItems[i])
      menuItems[i].classList.remove('selectedItem');
    else
      menuItems[i].classList.add('selectedItem');
  }
  
  var feed = document.getElementById("stream_pagelet");

  for (i=0; i<feed.children.length; i++) {
    var div = feed.children[i];
    if (div.id == 'hacker-news' && this.id != 'ycfeed')
      div.classList.add('hidden_elem')
    else if (div.id != 'hacker-news' && this.id != 'fbfeed')
      div.classList.add('hidden_elem')
    else
      div.classList.remove('hidden_elem')
  }
}

function addToggleFeedBtn() {
  var fbNav = document.getElementById('universalNav');
  var navHTML = fbNav.children[0].innerHTML;
  var ycBtn = `
  <li class="sideNavItem">
    <a title="Hacker News Feed" id="ycfeed" class="_5afe">
      <span class="imgWrap">
        <i class="img" id="yclogo"></i>
      </span>
      <div dir="ltr" class="linkWrap noCount">YC Feed</div>
    </a>
  </li>`;
  fbNav.children[0].innerHTML = ycBtn + navHTML;

  var ycFeedBtn = fbNav.children[0].children[0];
  var fbFeedBtn = fbNav.children[0].children[1];

  fbFeedBtn.children[1].id = 'fbfeed';
  fbFeedBtn.children[1].removeAttribute('href');

  document.getElementById('yclogo').style.backgroundImage = `url(${chrome.extension.getURL('y18.gif')}`;
  document.getElementById('ycfeed').addEventListener('click', selectFeed);
  document.getElementById('fbfeed').addEventListener('click', selectFeed);
}

function prependYC2Feed(text){
  var x = document.getElementById("stream_pagelet");
  x.innerHTML = text + x.innerHTML;
  addToggleFeedBtn();
}

function getHackerNews(){
  var xhr = new XMLHttpRequest();
  var text = ""
  xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
          text = processHTML(xhr.responseText)
          prependYC2Feed(text)
      }
  }
  xhr.open('GET', 'https://news.ycombinator.com/', true);
  xhr.send(null);
  return
}
var badlinks = new Array("item", "item", "vote", "newest", "news", "threads", "new","show", "ask", "jobs", "submit", "security", "lists", "bookmark", "dmca", "flag", "hide", "user", "logout", "login", "from")

function processHTML(text){
  var newHTML = "";

  // Manual edits
  var ycLogoUrl = chrome.extension.getURL('y18.gif');
  text = text.replace('y18.gif', ycLogoUrl); // get local logo resource
  text = text.replace('.css', '.xcss'); // sabotage yc css
  text = `<div id="hacker-news" class="hidden_elem">${text}</div>`; // avoid <html> inception

  var lines = text.split('\n');

  for(var i = 0;i < lines.length;i++){
    var tempLine = lines[i]
    for(var j = 0; j < badlinks.length; j++){
      index = tempLine.search("href=\"" + badlinks[j])

      if (index != -1){
        tempLine = tempLine.slice(0, index + 5) + "\"https://news.ycombinator.com/" + tempLine.slice(index+6)
      }
    }
    newHTML = newHTML.concat(tempLine) + "\n"
  }
  return newHTML
}

var boo = false
var loop = setInterval(function() {
  var x = document.getElementsByClassName("_2pie")
  var y = document.getElementsByClassName("newsFeedComposer")

  if (x[0] != null){
    if (y[0] != null){
      if (window.boo == false){
      getHackerNews()
      window.boo = true
      }
    }
    else window.boo = false
  }
}, 20);