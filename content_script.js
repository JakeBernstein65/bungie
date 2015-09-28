chrome.runtime.sendMessage({greeting: "hello", selectedText: window.getSelection().toString()}, function(response) {
  console.log(response.farewell + " = farewell");
});
