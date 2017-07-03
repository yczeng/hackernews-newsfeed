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

var loop = setInterval(function() {
  const config = { attributes: false, childList: true, characterData: false, subtree: true }
  var x = document.getElementsByClassName("_2pie")
  var y = document.getElementsByClassName("fbUserContent")

  if (x[0] != null){
    if (y[0] != null){
      getHackerNews()
    }
  }
}, 20);