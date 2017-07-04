function replaceContent(text){
  var x = document.getElementsByClassName("_2pie");
  x[0].innerHTML = text
}

function getHackerNews(){
  var xhr = new XMLHttpRequest();
  var text = ""
  xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
          text = processHTML(xhr.responseText)
          console.log(text)
          replaceContent(text)
      }
  }
  xhr.open('GET', 'https://news.ycombinator.com/', true);
  xhr.send(null);
  return
}
var badlinks = new Array("item", "item", "vote", "newest", "news", "threads", "new","show", "ask", "jobs", "submit", "security", "lists", "bookmark", "dmca", "flag", "hide", "user", "logout", "login", "from")

function processHTML(text){
  var newHTML = ""
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