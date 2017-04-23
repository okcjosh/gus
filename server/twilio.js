// Twilio Credentials
const accountSid = 'AC9ce0d28ee69cd6ff89fdc1b8d0139099';
const authToken = '4890e088921ee4039f79b22d44d0ebb1';

// const User = require('./sqldb').User;

//require the Twilio module and create a REST client
const twilio = require('twilio')(accountSid, authToken);

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
}

// Event with Included User field to get user phone
function sendEventCompletionText(event) {
  const msg = `Your event ${event.venue} has been completed`;
  sendText(event.User.phone, msg);
}

module.exports = {
  twilio,
  sendText,
  sendEventCompletionText
};
