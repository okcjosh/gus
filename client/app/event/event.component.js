'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');
import routing from './event.routes';
var dummyClientToken = 'eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiI3MjVlNmZkOTUyZGY3ZGNmYmNlODQyNjg4ZmU0MjAyMmYzNGY4MWNiY2RlMThiZmIyNzRlMThjNGU4NDdiNDg3fGNyZWF0ZWRfYXQ9MjAxNS0wNS0xMlQxNzozNjozMC4yMDE1ODYxOTgrMDAwMFx1MDAyNm1lcmNoYW50X2lkPWRjcHNweTJicndkanIzcW5cdTAwMjZwdWJsaWNfa2V5PTl3d3J6cWszdnIzdDRuYzgiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvZGNwc3B5MmJyd2RqcjNxbi9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzL2RjcHNweTJicndkanIzcW4vY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIn0sInRocmVlRFNlY3VyZUVuYWJsZWQiOnRydWUsInRocmVlRFNlY3VyZSI6eyJsb29rdXBVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvZGNwc3B5MmJyd2RqcjNxbi90aHJlZV9kX3NlY3VyZS9sb29rdXAifSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiQWNtZSBXaWRnZXRzLCBMdGQuIChTYW5kYm94KSIsImNsaWVudElkIjpudWxsLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjp0cnVlLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJ1bnZldHRlZE1lcmNoYW50IjpmYWxzZSwiYnJhaW50cmVlQ2xpZW50SWQiOiJtYXN0ZXJjbGllbnQzIiwibWVyY2hhbnRBY2NvdW50SWQiOiJzdGNoMm5mZGZ3c3p5dHc1IiwiY3VycmVuY3lJc29Db2RlIjoiVVNEIn0sImNvaW5iYXNlRW5hYmxlZCI6dHJ1ZSwiY29pbmJhc2UiOnsiY2xpZW50SWQiOiIxMWQyNzIyOWJhNThiNTZkN2UzYzAxYTA1MjdmNGQ1YjQ0NmQ0ZjY4NDgxN2NiNjIzZDI1NWI1NzNhZGRjNTliIiwibWVyY2hhbnRBY2NvdW50IjoiY29pbmJhc2UtZGV2ZWxvcG1lbnQtbWVyY2hhbnRAZ2V0YnJhaW50cmVlLmNvbSIsInNjb3BlcyI6ImF1dGhvcml6YXRpb25zOmJyYWludHJlZSB1c2VyIiwicmVkaXJlY3RVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbS9jb2luYmFzZS9vYXV0aC9yZWRpcmVjdC1sYW5kaW5nLmh0bWwiLCJlbnZpcm9ubWVudCI6Im1vY2sifSwibWVyY2hhbnRJZCI6ImRjcHNweTJicndkanIzcW4iLCJ2ZW5tbyI6Im9mZmxpbmUiLCJhcHBsZVBheSI6eyJzdGF0dXMiOiJtb2NrIiwiY291bnRyeUNvZGUiOiJVUyIsImN1cnJlbmN5Q29kZSI6IlVTRCIsIm1lcmNoYW50SWRlbnRpZmllciI6Im1lcmNoYW50LmNvbS5icmFpbnRyZWVwYXltZW50cy5zYW5kYm94LkJyYWludHJlZS1EZW1vIiwic3VwcG9ydGVkTmV0d29ya3MiOlsidmlzYSIsIm1hc3RlcmNhcmQiLCJhbWV4Il19fQ';
var gateway = require('/Users/joshuajohnson/WebstormProjects/gus/server/gateway.js');
export class EventComponent {
  awesomeEvents = [];
  eventTitle = '';
  date = '';
  location_desc = '';
  address = '';
  department_id = '';
  status_id = '';
  leo_id = '';

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('event');
    });
  }

  $onInit() {
    this.$http.get('/api/events')
      .then(response => {
        this.awesomeEvents = response.data;
        this.socket.syncUpdates('event', this.awesomeEvents);
      });
  }

  addEvent() {
    if (this.eventTitle) {
      this.$http.post('/api/events', {
        eventTitle: this.eventTitle,
        date: this.date,
        location_desc: this.location_desc,
        address: this.address,
        department_id: this.department_id,
        status_id: this.status_id,
        leo_id: this.leo_id
      });
      this.eventTitle = '';
      this.date = '';
      this.location_desc = '';
      this.address = '';
      this.department_id = '';
      this.status_id = '';
      this.leo_id = '';
    }
  }

  deleteEvent(event) {
    this.$http.delete(`/api/events/${event._id}`);
  }

  clientToken() {
    this.$http.get('/client-token', function (req, res) {
      alert.clientToken();
      gateway.clientToken.generate({}, function (err, response) {
        if (err || !response || !response.clientToken) {
          if (err.name === 'authenticationError') {
            console.error('Please fill in examples/server.js with your credentials from Account->API Keys in your Sandbox dashboard: https://sandbox.braintreegateway.com/');
            console.error('Using a dummy client token... this may or may not work');
            res.send(dummyClientToken)
          } else {
            console.error(err);
            res.send(err)
          }
        } else {
          var clientToken = response.clientToken;
          res.send(clientToken)
        }
      })
    });
  }

  paymentNonce() {
    this.$http.post('/payment-nonce', function (req, res) {
      var nonce = req.body.payment_method_nonce;
      gateway.transaction.sale({
        amount: '10.00',
        paymentMethodNonce: nonce
      }, function (err, result) {
        if (err) {
          res.send('error:', err)
        } else {
          res.send('successfully charged $10, check your sandbox dashboard!')
        }
      })
    });
  }
}




export default angular.module('es42App.event', [uiRouter])
  .config(routing)
  .component('event', {
    template: require('./event.html'),
    controller: EventComponent,
  })
  .name;


//
// var angularStr = fs.readFileSync(path.resolve(__dirname, '../node_modules/angular/angular.js'), 'utf8');
// var braintreeAngularStr = fs.readFileSync(path.resolve(__dirname, '../braintree-angular.dist.js'), 'utf8');

// app.use(bodyParser.urlencoded({
//   extended: true
// }));

// app.get('/client-token', function (req, res) {
//   gateway.clientToken.generate({}, function (err, response) {
//     if (err || !response || !response.clientToken) {
//       if (err.name === 'authenticationError') {
//         console.error('Please fill in examples/server.js with your credentials from Account->API Keys in your Sandbox dashboard: https://sandbox.braintreegateway.com/');
//         console.error('Using a dummy client token... this may or may not work');
//         res.send(dummyClientToken)
//       } else {
//         console.error(err);
//         res.send(err)
//       }
//     } else {
//       var clientToken = response.clientToken;
//       res.send(clientToken)
//     }
//   })
// });
