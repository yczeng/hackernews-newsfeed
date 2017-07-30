// replace newsfeed with text
function replaceContent(text){
  var x = document.getElementsByClassName("_2pie");
  x[0].innerHTML = text
}

// get hackernews html and replace newsfeed with it
function getHackerNews(){
  var xhr = new XMLHttpRequest();
  var text = ""
  xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
          text = processHTML(xhr.responseText)
          replaceContent(text)
      }
  }
  xhr.open('GET', 'https://news.ycombinator.com/', true);
  xhr.send(null);
  return
}

// convert local urls to absolute urls
var badlinks = new Array("y18", "item", "item", "vote", "newest", "news", "threads", "new", "show", "ask", "jobs", "submit", "security", "lists", "bookmark", "dmca", "flag", "hide", "user", "logout", "login", "from")
function processHTML(text){
  var newHTML = ""
  var lines = text.split('\n');

  for(var i = 0;i < lines.length;i++){
    var tempLine = lines[i]
    for(var j = 0; j < badlinks.length; j++){
      index = tempLine.search("(href|src)=\"" + badlinks[j])

      if (index != -1){
        tempLine = tempLine.slice(0, index + tempLine.substring(index).indexOf("=") + 1) + "\"https://news.ycombinator.com/" + tempLine.slice(index + tempLine.substring(index).indexOf("=") + 2)
      }
    }
    newHTML = newHTML.concat(tempLine) + "\n"
  }
  return newHTML
}

// checks for newsfeed or mutation to inject hackernews
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
