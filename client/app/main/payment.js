import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';
var client = require('braintree-web/client');
var hostedFields = require('braintree-web/hosted-fields');
var submitBtn = document.getElementById('my-submit');
var form = document.getElementById('my-sample-form');

export class PaymentController {
  clientToken = '';

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('leo');
    });
  }
  $onInit() {
    this.$http.get('/api/leos')
      .then(response => {
        this.awesomeLeos = response.data;
        this.socket.syncUpdates('leo', this.awesomeLeos);
      });
    this.$http.post('/api/token')
      .then(response => {
        this.clientToken = response.data;
        console.log(response.data);
      });
  }
}


client.create({
  authorization: 'eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiIwZGI2MGZmMWEwNjExNGQzZmRlMTVmMTFhNGRlMjU3OGYyMWYyZjdiYWFjYWQ1NWY0Y2IzOTZlMjkzZjY2NTRifGNyZWF0ZWRfYXQ9MjAxNi0xMC0zMFQwMzozMzozMi45MTkxODE3MzkrMDAwMFx1MDAyNm1lcmNoYW50X2lkPXN3dmc5c2Nqa2hmaHE5cnNcdTAwMjZwdWJsaWNfa2V5PTc4Z2hrc2Z6dDV6NWhmY3giLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvc3d2ZzlzY2praGZocTlycy9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzL3N3dmc5c2Nqa2hmaHE5cnMvY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tL3N3dmc5c2Nqa2hmaHE5cnMifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiQW1lcmljYW4gSHVzdGxlciBTeW5kaWNhdGUiLCJjbGllbnRJZCI6bnVsbCwicHJpdmFjeVVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS9wcCIsInVzZXJBZ3JlZW1lbnRVcmwiOiJodHRwOi8vZXhhbXBsZS5jb20vdG9zIiwiYmFzZVVybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXNzZXRzVXJsIjoiaHR0cHM6Ly9jaGVja291dC5wYXlwYWwuY29tIiwiZGlyZWN0QmFzZVVybCI6bnVsbCwiYWxsb3dIdHRwIjp0cnVlLCJlbnZpcm9ubWVudE5vTmV0d29yayI6dHJ1ZSwiZW52aXJvbm1lbnQiOiJvZmZsaW5lIiwidW52ZXR0ZWRNZXJjaGFudCI6ZmFsc2UsImJyYWludHJlZUNsaWVudElkIjoibWFzdGVyY2xpZW50MyIsImJpbGxpbmdBZ3JlZW1lbnRzRW5hYmxlZCI6dHJ1ZSwibWVyY2hhbnRBY2NvdW50SWQiOiJhbWVyaWNhbmh1c3RsZXJzeW5kaWNhdGUiLCJjdXJyZW5jeUlzb0NvZGUiOiJVU0QifSwiY29pbmJhc2VFbmFibGVkIjpmYWxzZSwibWVyY2hhbnRJZCI6InN3dmc5c2Nqa2hmaHE5cnMiLCJ2ZW5tbyI6Im9mZiJ9'
}, clientDidCreate);
function clientDidCreate(err, client) {
  hostedFields.create({
    client: client,
    styles: {
      'input': {
        'font-size': '16pt',
        'color': '#3A3A3A',
        'height': '20px',
      },
      '.number': {
        'font-family': 'monospace'
      },
      '.valid': {
        'color': 'green'
      }
    },
    fields: {
      number: {
        selector: '#card-number'
      },
      cvv: {
        selector: '#cvv'
      },
      expirationDate: {
        selector: '#expiration-date'
      }
    }
  }, hostedFieldsDidCreate);
}

function hostedFieldsDidCreate(err, hostedFields) {
  submitBtn.addEventListener('click', submitHandler.bind(null, hostedFields));
  submitBtn.removeAttribute('disabled');
}

function submitHandler(hostedFields, event) {
  event.preventDefault();
  submitBtn.setAttribute('disabled', 'disabled');
  hostedFields.tokenize(function (err, payload) {
    if (err) {
      submitBtn.removeAttribute('disabled');
      console.error(err);
      //Put `payload.nonce` into the `payment-method-nonce` input, and then
      //submit the form. Alternatively, you could send the nonce to your server
      //with AJAX.
    } else {
      form['payment_method_nonce'].value = payload.nonce;
      form.submit();
    }
  });
}
export default angular.module('gusApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: PaymentController
  })
  .name;
