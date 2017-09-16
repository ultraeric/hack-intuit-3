//
// This is main file containing code implementing the Express server and functionality for the Express echo bot.
//
'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');
const fs = require('fs');
var messengerButton = "<html><head><title>Facebook Messenger Bot</title></head><body><h1>Facebook Messenger Bot</h1>This is a bot based on Messenger Platform QuickStart. For more details, see their <a href=\"https://developers.facebook.com/docs/messenger-platform/guides/quick-start\">docs</a>.<script src=\"https://button.glitch.me/button.js\" data-style=\"glitch\"></script><div class=\"glitchButton\" style=\"position:fixed;top:20px;right:20px;\"></div></body></html>";

const PAGE_ACCESS_TOKEN = String(fs.readFileSync('./messenger-bot/PAGE_ACCESS_TOKEN')).replace(/^\s+|\s+$/gm,'');
const VERIFY_TOKEN = String(fs.readFileSync('./messenger-bot/VERIFY_TOKEN')).replace(/^\s+|\s+$/gm,'');

console.log('VERIFY_TOKEN="%s"', VERIFY_TOKEN);
console.log('PAGE_ACCESS_TOKEN="%s"', PAGE_ACCESS_TOKEN);

// The rest of the code implements the routes for our Express server.
// let app = express();
// 

function addMessengerHooks(app, callback) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  // Webhook validation
  app.get('/webhook', function(req, res) {
    if (req.query['hub.mode'] === 'subscribe' &&
        req.query['hub.verify_token'] === VERIFY_TOKEN) {
      console.log("Validating webhook");
      res.status(200).send(req.query['hub.challenge']);
    } else {
      console.error("Failed validation. Make sure the validation tokens match.");
      res.sendStatus(403);          
    }
  });
  
  
  // Message processing
  app.post('/webhook', function (req, res) {
    var data = req.body;
  
    // Make sure this is a page subscription
    if (data.object === 'page') {
      
      // Iterate over each entry - there may be multiple if batched
      data.entry.forEach(function(entry) {
        var pageID = entry.id;
        var timeOfEvent = entry.time;
  
        // Iterate over each messaging event
        entry.messaging.forEach(function(event) {
          if (event.message) {
            receivedMessage(event, callback);
          } else if (event.postback) {
            receivedPostback(event, callback);
          } else {
            console.log("Webhook received not message or postback");
          }
        });
      });
  
      // Assume all went well.
      //
      // You must send back a 200, within 20 seconds, to let us know
      // you've successfully received the callback. Otherwise, the request
      // will time out and we will keep trying to resend.
      res.sendStatus(200);
    }
  });
  console.log("webhooks bound succ eecs fully")
}

// Incoming events handling
function receivedMessage(event, callback) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;

  console.log("Received message for user %d and page %d at %d with message:", 
    senderID, recipientID, timeOfMessage);

  var messageId = message.mid;

  var messageText = message.text;
  var messageAttachments = message.attachments;

  if (messageText) {
    console.log("Received message: \"%s\"", messageText);
    // If we receive a text message, check to see if it matches a keyword
    // and send back the template example. Otherwise, just echo the text we received.
    callback(senderID, {"type": "text", "payload": {"text": messageText}});
  } else if (messageAttachments) {
    // sendTextMessage(senderID, "Message with attachment received: " + JSON.stringify(messageAttachments));
    console.log("Received attachments: %s", messageAttachments);
    for (var i = 0; i < messageAttachments.length; i++) {
      var attached = messageAttachments[i];
      if (attached.type === "image") {
        callback(senderID, attached);
      } else {
        console.log(attached.type);
      }
    }
  }
}

function receivedPostback(event, callback) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfPostback = event.timestamp;

  // The 'payload' param is a developer-defined field which is set in a postback 
  // button for Structured Messages. 
  var payload = event.postback.payload;

  console.log("Received postback for user %d and page %d with payload '%s' " + 
    "at %d", senderID, recipientID, payload, timeOfPostback);

  // When a postback is called, we'll send a message back to the sender to 
  // let them know it was successful
  sendTextMessage(senderID, "Postback called");
}

//////////////////////////
// Sending helpers
//////////////////////////
function sendTextMessage(recipientId, messageText) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  };

  callSendAPI(messageData);
}

function sendMinionsSticker(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "<3"
    }
  };

  callSendAPI(messageData);
}

function sendImage(recipientId, url) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "image",
        payload: {
          "url": url
        }
      }
    }
  };
  callSendAPI(messageData);
}

function sendGenericMessage(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [{
            title: "rift",
            subtitle: "Next-generation virtual reality",
            item_url: "https://www.oculus.com/en-us/rift/",               
            image_url: "http://messengerdemo.parseapp.com/img/rift.png",
            buttons: [{
              type: "web_url",
              url: "https://www.oculus.com/en-us/rift/",
              title: "Open Web URL"
            }, {
              type: "postback",
              title: "Call Postback",
              payload: "Payload for first bubble",
            }],
          }, {
            title: "touch",
            subtitle: "Your Hands, Now in VR",
            item_url: "https://www.oculus.com/en-us/touch/",               
            image_url: "http://messengerdemo.parseapp.com/img/touch.png",
            buttons: [{
              type: "web_url",
              url: "https://www.oculus.com/en-us/touch/",
              title: "Open Web URL"
            }, {
              type: "postback",
              title: "Call Postback",
              payload: "Payload for second bubble",
            }]
          }]
        }
      }
    }
  };  

  callSendAPI(messageData);
}

function callSendAPI(messageData) {
  console.log("Sent messageData: %s", JSON.stringify(messageData));
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: messageData

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      console.log("Successfully sent generic message with id %s to recipient %s", 
        messageId, recipientId);
    } else {
      console.error("Unable to send message.");
      // console.error(response);
      // console.error(error);
    }
  });  
}

// Set Express to listen out for HTTP requests
// var server = app.listen(process.env.PORT || 3000, function () {
//   console.log("Listening on port %s", server.address().port);
// });

export default addMessengerHooks;
export {addMessengerHooks};
