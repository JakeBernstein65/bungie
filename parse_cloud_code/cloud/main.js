Parse.Cloud.afterSave("Text", function(request) {
  //network requests have to be made inside of cloud functions [node and cloud code]

console.log("\n \n" + request.object.get("text") + " = request");

var selectedText = request.object.get("text");

   Parse.Cloud.httpRequest({
  method: "POST",
  url: "https://ACb557922e1bb38ab5233c76d23df8a525:c4b9795ee9c63a342565d80d5f813cfd@api.twilio.com/2010-04-01/Accounts/ACb557922e1bb38ab5233c76d23df8a525/SMS/Messages.json",
  body: {
     From:"+15162462585",
     To: "+15163189812",
     Body: ". \n" + selectedText
  }
});

});