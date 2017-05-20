// Twilio Credentials
const accountSid = 'AC9ce0d28ee69cd6ff89fdc1b8d0139099';
const authToken = '4890e088921ee4039f79b22d44d0ebb1';


// const User = require('./sqldb').User;

//require the Twilio module and create a REST client
const twilio = require('twilio')(accountSid, authToken);
// const cookieParser = require(cookieParser());

function sendText(to, body) {
  twilio.sms.messages.create({
    to,
    from: '+12146438974',
    body
  }, (err, sms) => {
    if(err) {
      console.log(err);
    } else {
      console.log(`Text sent: ${sms.sid}`);
    }
  });
  // cookie.parse
}

// app.post('/sms', function(req, res) {
//   let twilio = require('twilio');
//   let twiml = new twilio.TwimlResponse();
//
//   let counter = parseInt(req.cookies.counter) || 0;
//   if (counter == 0) {
//     twiml.message("Hello, thanks for the new message.");
//   } else {
//     twiml.message("Hello, thanks for message number " + counter);
//   }
//   counter = counter + 1;
//   res.cookie('counter',counter);
//   res.writeHead(200, {'Content-Type': 'text/xml'});
//   res.end(twiml.toString());
//   console.log(req.cookies.count);
// });


// Event with Included User field to get user phone
function sendEventCompletionText(event) {
  const msg = `Your event ${event.venue} has been completed`;

  // This is for the phone_number of the coordinator of the event
  sendText(event.phone_number, msg);

  // This is for the customer that registered the event
  sendText(event.User.phone, msg);
}

module.exports = {
  twilio,
  sendText,
  sendEventCompletionText
};
