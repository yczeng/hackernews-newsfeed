function delContent(text){
  var x = document.getElementsByClassName("_2pie");
  if (x[0] == null) return 0
  else{
    x[0].innerHTML = text
    return 1
  }
}

function getHackerNews(){
  var xhr = new XMLHttpRequest();
  var text = ""
  xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
          text = xhr.responseText
          delContent(text)
          return
      }
  }
  xhr.open('GET', 'https://news.ycombinator.com/', true);
  xhr.send(null);
}

const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === 1) {
                getHackerNews()
            }
        });
    });
});

var loop = setInterval(function() {
  const config = { attributes: false, childList: true, characterData: false, subtree: true }
  observer.observe(document.body, config);
  clearInterval(loop)
}, 20);

alert("test")