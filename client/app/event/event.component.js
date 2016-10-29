'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');
import routing from './event.routes';
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
//
// clientToken() {
//   this.$http.get('/client-token', function (req, res) {
//     gateway.clientToken.generate({}, function (err, response) {
//       if (err || !response || !response.clientToken) {
//         if (err.name === 'authenticationError') {
//           console.error('Please fill in examples/server.js with your credentials from Account->API Keys in your Sandbox dashboard: https://sandbox.braintreegateway.com/');
//           console.error('Using a dummy client token... this may or may not work');
//           res.send(dummyClientToken)
//         } else {
//           console.error(err);
//           res.send(err)
//         }
//       } else {
//         var clientToken = response.clientToken;
//         res.send(clientToken)
//       }
//     })
//   });
// }
//
// paymentNonce() {
//   this.$http.post('/payment-nonce', function (req, res) {
//     var nonce = req.body.payment_method_nonce;
//     gateway.transaction.sale({
//       amount: '10.00',
//       paymentMethodNonce: nonce
//     }, function (err, result) {
//       if (err) {
//         res.send('error:', err)
//       } else {
//         res.send('successfully charged $10, check your sandbox dashboard!')
//       }
//     })
//   });
// }
// }



