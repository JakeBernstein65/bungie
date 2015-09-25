// if(window.getSelection().toString()){
// Text = alert(window.getSelection().toString() + " stuff ");
// }

//make it so this only runs if text is selected or make it so the REST call is only made if  text is actually selected
chrome.runtime.sendMessage({greeting: "hello", selectedText: window.getSelection().toString()}, function(response) {
  console.log(response.farewell + " = farewell");
});
