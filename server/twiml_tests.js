/* eslint-disable */
let http = require('http');
let express = require('express');
let twilio = require('twilio');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');

let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/sms', function(req, res) {
  let twilio = require('twilio');
  let twiml = new twilio.TwimlResponse();

  let counter = parseInt(req.cookies.counter) || 0;
  if (counter == 0) {
    twiml.message("Hello, thanks for the new message.");
  } else {
    twiml.message("Hello, thanks for message number " + counter);
  }
  counter = counter + 1;
  res.cookie('counter',counter);
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
  console.log(req.cookies.count);
});

http.createServer(app).listen(1337, function () {
  console.log("Express server listening on port 1337");
});
//
// let http = require('http'),
//   express = require('express'),
//   twilio = require('twilio'),
//   bodyParser = require('body-parser'),
//   cookieParser = require('cookie-parser');
//
// let app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
//
// app.get('/sms', function(req, res) {
//   let twilio = require('twilio');
//   let twiml = new twilio.TwimlResponse();
//   console.log(req.cookies.count);
//   let counter = parseInt(req.cookies.counter) || 0;
//
//   if (counter == 0) {
//     twiml.message("Hello, thanks for the new message.");
//   } else {
//     twiml.message("Hello, thanks for message number " + counter);
//   }
//   counter = counter + 1;
//   res.cookie('counter',counter);
//   res.writeHead(200, {'Content-Type': 'text/xml'});
//   res.end(twiml.toString());
// });
//
//
// http.createServer(app).listen(1337, function () {
//   console.log("Express server listening on port 1337");
// });
