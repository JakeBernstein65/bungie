# Bungie (A Chroms Extension)  
## Overview   
Bungie is a fun chrome extension that helps you learn critical information.  

The way Bungie works is by taking any information you find important in your browser, saving it in a database, and then texting it to you periodically throughout the week.  

To specifiy what information you want "bounced" back to you, select the text you want to learn, and then hit the appropriate hotkeys:  

`Windows/Linux:` Ctrl + Alt + A  
`Mac:` Command + Alt + A  

<img src="./README_images/selected.png" alt="image of text selection" width ="300" height:"150"/>  

Once you select your informartion, a popup will appeare to let you know it was saved successfully.  

<img src="./README_images/popup.png" alt="image of popup" width ="300" height:"150"/> 

The information is then stored in [Parse's](https://parse.com/) backend through Parse's **REST API**. From here, Parse's Cloud Code will periodically call Twilio's Rest API and have it text you the information you wanted help remembering.

## Setup 

Go to [Parse](https://parse.com/) and create an account. After creating and account, create a new application and name it whatever you want.  

<img src="./README_images/create_app.png" alt="image of app creation" width ="600" height:"300"/>  

Now create a folder inside of our main `bungie` folder and follow the [Parse Cloud Code Setup](https://parse.com/docs/js/guide#command-line-installation) instructions to `set up` your Cloud Application inside the folder you just created.  

Copy the all the code from `bungie/parse_cloud_code/cloud/main.js` and put it into `bungie/your_cloud_code_folder/cloud/main.js`.  

Then go into your terminal and into `bungie/your_cloud_code_folder` and run the command `parse deploy`. 

Go into your Parse App again and go into Core and then into Jobs. Make sure you have a job named `sendText` and it's set to run every 15 minutes.  

<img src="./README_images/jobs.png" alt="image of job creation" width ="600" height:"300"/>  

Go to [Twilio](https://www.twilio.com/) and create an account.  

#### background.js  
```js
if(selectedText.text){
          $.ajax({
              type: 'POST',
              headers: {
                  'X-Parse-Application-Id': "DQvjcrwLM1ctu4Wri3o3OEi5tLe8tvtqeCCU5egq",
                  'X-Parse-REST-API-Key': "fDIml4hbYCWOj8B6v74ig7nNHqgESeGjB3XNXj3h"
              },
              url: "https://api.parse.com/1/classes/Text",
              data: JSON.stringify(selectedText)
            }).then(function(response){
              if(response.createdAt)
                alert("Bungie saved your info. We'll bounce it back to your phone throughout the week.");
            });
  }
```  

Go to your into your Parse APP and then into settings and keys. Add your Parse Rest API key and your application ID to the post method.  

#### parse-cloud-code/cloud/main.js  
```js
Parse.Cloud.job("sendText", function(request, status) {

   Parse.Cloud.httpRequest({
      method: 'GET',
      url: "https://api.parse.com/1/classes/Text",
      headers: {
        'X-Parse-Application-Id':'DQvjcrwLM1ctu4Wri3o3OEi5tLe8tvtqeCCU5egq',
        'X-Parse-REST-API-Key':'fDIml4hbYCWOj8B6v74ig7nNHqgESeGjB3XNXj3h',
       }
    }).then(function(response){

       if (typeof response.data === 'object' && response.data.results.length >= 1) {
          var queryResults = response.data.results; 

            for (var i = 0; i < queryResults.length; i++) {
               var currentResult = queryResults[i];

               var currentTime = new Date().getTime();
               
          //# of seconds in a day = 86400000
           if ((currentResult.timeStamp + 86400000) <= currentTime){
              currentResult.timesSent ++;
              currentResult.timeStamp = currentTime;

                Parse.Cloud.httpRequest({
                method: "POST",
                url: "https://ACCOUNT_SID:AUTH_TOKEN@api.twilio.com/2010-04-01/Accounts/ACCOUNT_SID/SMS/Messages.json",
                body: {
                   From:"+Twilio_Number",
                   To: "+Your_Number",
                   Body: "-> \n" + currentResult.text
                 }
              });

              Parse.Cloud.httpRequest({
                method: 'PUT',
                url: "https://api.parse.com/1/classes/Text/" + currentResult.objectId, 
                body: currentResult,
                headers: {
                  'X-Parse-Application-Id':'XXXXXXXXXX',
                  'X-Parse-REST-API-Key':'YYYYYYYYYYYY',
                  'Content-Type':'application/json'
                 }
               });
                   }

                  if (currentResult.timesSent >= 7){
                Parse.Cloud.httpRequest({
                  method: 'Delete',
                  url: "https://api.parse.com/1/classes/Text/" + currentResult.objectId,
                  headers: {
                    'X-Parse-Application-Id':'XXXXXXXXXX',
                    'X-Parse-REST-API-Key':'YYYYYYYYYYYY'
                   }
                }).then(function(response){
                console.log(" \n \n Put response = " + JSON.stringify(response));
               });
              }
                  }
             }
    });
});
```  
Add your Parse and Twilio keys as well as the proper telphone numbers from Twilio.  

After this, you should be good to go.

## Side notes  (add side notes section)

An object gets an `objectId` when it is added to Parse and created, but not before. For this reason, if you create an item while offline, you can not delete or edit that specifc item until you regain connection. ObjectIds are required for those actions and that item won't have an objectId yet. You can still preform all other actions while offline.  

You need to be disconnected from your network for at least twenty seconds for the application to recognize a **timeout** and that you are offline. This is based off of `heartbeat:` and `heartbeat_interval:` inside of `app.js`.  Change these values to changes the response time to your timeout.

##Add your own API keys to parse and Twilio, and add your own numbers to Twilio