// Twilio Credentials
let accountSid = 'AC9ce0d28ee69cd6ff89fdc1b8d0139099';
let authToken = '4890e088921ee4039f79b22d44d0ebb1';

//require the Twilio module and create a REST client
module.exports = require('twilio')(accountSid, authToken);
