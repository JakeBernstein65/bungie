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

Go to [Parse](https://parse.com/) and [Twilio](https://www.twilio.com/) and create accounts. You need the specific keys of your accounts to make Bungie work.  

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
Add your Parse Rest API key and your application ID to the post method.  

#### content_script.js 

#### parse-cloud-code/cloud/main.js 
This is the code that you should place inside of the **Cloud** Folder of your Parse Application Folder  

i.e. `parse_cloud_code/cloud/*`

## Side notes  

An object gets an `objectId` when it is added to Parse and created, but not before. For this reason, if you create an item while offline, you can not delete or edit that specifc item until you regain connection. ObjectIds are required for those actions and that item won't have an objectId yet. You can still preform all other actions while offline.  

You need to be disconnected from your network for at least twenty seconds for the application to recognize a **timeout** and that you are offline. This is based off of `heartbeat:` and `heartbeat_interval:` inside of `app.js`.  Change these values to changes the response time to your timeout.

##Add your own API keys to parse and Twilio, and add your own numbers to Twilio