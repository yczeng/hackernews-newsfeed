function replaceContent(text){
  var x = document.getElementsByClassName("_2pie");
  x[0].innerHTML = text
}

function getHackerNews(){
  var xhr = new XMLHttpRequest();
  var text = ""
  xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
          text = xhr.responseText
          replaceContent(text)
      }
  }
  xhr.open('GET', 'https://news.ycombinator.com/', true);
  xhr.send(null);
  return
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