import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  awesomeThings = [];
  newThing = '';
  clientToken = '';

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  }

  $onInit() {
    this.$http.get('/api/things')
      .then(response => {
        this.awesomeThings = response.data;
        this.socket.syncUpdates('thing', this.awesomeThings);
      });
    this.$http.post('/api/token')
      .then(response => {
        this.clientToken = response.data;
        console.log(response.data);
        alert(response.data);

      });
  }

  addThing() {
    if (this.newThing) {
      this.$http.post('/api/things', {
        name: this.newThing
      });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete(`/api/things/${thing._id}`);
  }


  // static clientToken() {
  //   this.$http.get('/api/token');
  //   .then(braintree.client.create({
  //     authorization: clientToken
  //   }, function (err, clientInstance) {
  //     /* ... */
  //   });
  // }
}

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
export default angular.module('gusApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
