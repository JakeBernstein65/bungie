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




 