Parse.Cloud.afterSave("Text", function(request) {
  //network requests have to be made inside of cloud functions [node and cloud code]

   var smsInfo = {
          "src": "13305875722",
          "dst": "15163189812",
          "text": "hello from the cloud"
        };

   $.ajax({
        type: 'POST',
        headers:{
        "Content-Type": "application/json"
        },
        data: JSON.stringify(smsInfo),
        url: "https://MAOTQ1OTI0NZNMMZUYNJ:YTE2ZWRiMzFlOWI5MmM5NjIzM2JkNWJhYjVmYjI5@api.plivo.com/v1/Account/MAOTQ1OTI0NZNMMZUYNJ/Message/",
    });

});