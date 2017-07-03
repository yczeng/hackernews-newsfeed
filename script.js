function replaceContent(text){
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
          replaceContent(text)
          
      }
  }
  xhr.open('GET', 'https://news.ycombinator.com/', true);
  xhr.send(null);
  return
}

// const observer = new MutationObserver(function(mutations) {
//     mutations.forEach(function(mutation) {
//         mutation.addedNodes.forEach(function(node) {
//             if (node.nodeType === 1) {
//                 getHackerNews()
//                 window.boo = true
//                 observer.disconnect()
//             }
//         });
//     });
// });

// clearfix

var loop = setInterval(function() {
  const config = { attributes: false, childList: true, characterData: false, subtree: true }
  var x = document.getElementsByClassName("_2pie")
  if (x[0] != null){
    if x.nextSibling.contains("clearfix"){
      getHackerNews()
    }
  }

  //getHackerNews()

  // try{
  //observer.observe(document.body, config);
  // }
  // catch(err){
  //   console.log("Wait")
  // }
  console.log("test")
}, 20);