// Twilio Credentials
let accountSid = 'AC9ce0d28ee69cd6ff89fdc1b8d0139099';
let authToken = '4890e088921ee4039f79b22d44d0ebb1';

//require the Twilio module and create a REST client
let client = require('twilio')(accountSid, authToken);

// client.messages.create({
//   to: "+4056844042",
//   from: "+13102542363",
//   body: "This is the ship that made the Kessel Run in fourteen parsecs?",
// }, function(err, message) {
//   console.log(message.body);
// });
client.messages.create({
  to: '+14056844042',
  from: '+13102542363',
  body: 'hey'
}, function(err, message) {
  if(err) {
    console.log(err);
  } else {
    console.log(message.sid);
  }
});

