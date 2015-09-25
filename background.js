chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  console.log('Turning ' + tab.url + ' red!');
  
  chrome.tabs.executeScript(null, {file: "content_script.js"});
//end of browser action is right below this comment   
})


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    console.log(request);
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");

    if (request.greeting == "hello"){;
    var selectedText = { "text": request.selectedText} 

    if(selectedText.text){
    alert(selectedText.text);

    //working post method @@@@@@@
   //  $.ajax({
   //      type: 'POST',
   //      headers: {
   //          'X-Parse-Application-Id': "DQvjcrwLM1ctu4Wri3o3OEi5tLe8tvtqeCCU5egq",
   //          'X-Parse-REST-API-Key': "fDIml4hbYCWOj8B6v74ig7nNHqgESeGjB3XNXj3h"
   //      },
   //      url: "https://api.parse.com/1/classes/text",
   //      data: JSON.stringify(selectedText),
   //      contentType: "application/json"
   //  });
   // }

   $.ajax({
        type: 'POST',
        authId: 'MAOTQ1OTI0NZNMMZUYNJ',
        authToken: 'YTE2ZWRiMzFlOWI5MmM5NjIzM2JkNWJhYjVmYjI5',
        contentType: "application/json",
        data: {
            'src': '115163225033',
            'dst': '115163189812',
            'text': 'testing plivo api'
        },
        url: "https://api.plivo.com/v1/Account/MAOTQ1OTI0NZNMMZUYNJ/Message/",
    });
   }

   //if there was no selected text, run else statement
   else{
    alert("Didn't add to database, no selected Text");
   }
       //this should be at end of function... I think 
      sendResponse({farewell: "goodbye"});
    }
  });









//working get method @@@@@@@
// $.ajax({
//       type: 'GET',
//       url: "https://api.parse.com/1/classes/Groceries",
//       headers: {
//         'X-Parse-Application-Id':'DQvjcrwLM1ctu4Wri3o3OEi5tLe8tvtqeCCU5egq',
//         'X-Parse-REST-API-Key':'fDIml4hbYCWOj8B6v74ig7nNHqgESeGjB3XNXj3h',
//       }, 

//        success: function (msg) {
//                console.log(msg);
//             },
//        error: function (errormessage) {
//                 console.log(errormessage);
//             }
//   });