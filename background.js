chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null, {file: "content_script.js"});
//end of browser action is right below this comment   
});


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    if (request.greeting == "hello"){
        var selectedText = { 
          "text": request.selectedText, 
          "timesSent": 0,
          "timeStamp": new Date().getTime()
        }; 

        if(selectedText.text){
          $.ajax({
              type: 'POST',
              headers: {
                  'X-Parse-Application-Id': "XXXXXXXXXX",
                  'X-Parse-REST-API-Key': "YYYYYYYYYY"
              },
              url: "https://api.parse.com/1/classes/Text",
              data: JSON.stringify(selectedText)
            }).then(function(response){
              if(response.createdAt)
                alert("Bungie saved your info. We'll bounce it back to your phone throughout the week.");
            });
        }
        else{
          alert("You didn't select any text for Bungie to bounce back to you");
        }
    }
      sendResponse({farewell: "goodbye"});
    });