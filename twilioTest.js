let accountSid = 'AC9ce0d28ee69cd6ff89fdc1b8d0139099';
let authToken = '4890e088921ee4039f79b22d44d0ebb1';
let client = require('twilio')(accountSid, authToken);

client.sms.messages.create({
  to: '+14056844042',
  from: '+12146438974',
  body: 'Boop'
}, function (err, sms) {
  console.log(sms.sid);
});
