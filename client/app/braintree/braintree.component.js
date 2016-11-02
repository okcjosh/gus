// 'use strict';
// import angular from 'angular';
// import uiRouter from 'angular-ui-router';
// import routes from './braintree.routes';
// import braintree from 'braintree-web';
//
// braintree.setup(clientToken, "dropin", {
//   container: "payment-form"
// });
//
// export default angular.module('gusApp.braintree', [uiRouter])
//   .config(routes)
//   .component('braintree', {
//     template: require('./braintree.html'),
//   })
//   .name;

'use strict';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routes from './braintree.routes';
import braintree from 'braintree-web';
// import {ClientTokenGateway} from "braintree/lib/braintree/client_token_gateway";


function BraintreeComponent($scope, $http) {
  $scope.hasCalledBack = 'Nope';
  $http.post('api/token')
    .then(response => {
      this.clientToken = response.data;
      $scope.hasCalled = 'Nope';
      console.log(this.clientToken);
      braintree.setup(this.clientToken,
        'dropin', {
          container: 'dropin',
          onPaymentMethodReceived: function (nonce) {
            $scope.$apply(function () {
              $scope.hasCalledBack = 'YEP!';
              alert('Did the scope variable change? Yes!');
              console.log(nonce);
            })
          }
        })
    });
}



export default angular.module('gusApp.braintree', [uiRouter])
  .config(routes)
  .component('braintree', {
    template: require('./braintree.html'),
    controller: BraintreeComponent,
  })
  .name;
