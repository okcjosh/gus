'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');

// export class TransactionComponent {
//   /*@ngInject*/
//   constructor() {
//     this.message = 'Hello';
//   }
// }
export function TransactionComponent($scope, $http, $location, $state) {
  //alert('tranid: ' + $location.search()['tranid']);
  //var tranid = $location.search()['tranid'];
  let tranid = $state.params.tranid;
  $http.get('/transaction/' + tranid).then(function(response) {
    $scope.transaction = response.data.BTtransaction;
    $scope.event = response.data.transaction.Event;
    $scope.result = response.data.result;
  }, function(err) {
    console.log(err)
    //alert(err);
  });


  //alert($scope.transaction);
  // function Demo(config) {
  //   this.config = config;
  //   this.config.development = config.development || false;
  //   this.paymentForm = $('#' + config.formID);
  //   this.inputs = $('input[type=text], input[type=email], input[type=tel]');
  //   this.button = this.paymentForm.find('.button');
  //
  //   this.states = {
  //     show: 'active',
  //     wait: 'loading'
  //   };
  //   this.focusClass = 'has-focus';
  //   this.valueClass = 'has-value';
  //   this.initialize();
  // }
  //
  // Demo.prototype.initialize = function () {
  //   const self = this;
  //   this.events();
  //   this.inputs.each(function (index, element) {
  //     self.labelHander($(element));
  //   });
  //   this.notify('error');
  // };
  //
  // Demo.prototype.events = function () {
  //   const self = this;
  //   this.inputs.on('focus', function () {
  //     $(this).closest('label').addClass(self.focusClass);
  //     self.labelHander($(this));
  //   }).on('keydown', function () {
  //     self.labelHander($(this));
  //   }).on('blur', function () {
  //     $(this).closest('label').removeClass(self.focusClass);
  //     self.labelHander($(this));
  //   });
  // };
  //
  // Demo.prototype.labelHander = function (element) {
  //   const self = this;
  //   const input = element;
  //   const label = input.closest('label');
  //   window.setTimeout(function () {
  //     const hasValue = input.val().length > 0;
  //     if (hasValue) {
  //       label.addClass(self.valueClass);
  //     } else {
  //       label.removeClass(self.valueClass);
  //     }
  //   }, 10);
  // };
  //
  // Demo.prototype.notify = function (status) {
  //   const self = this;
  //   const notice = $('.notice-' + status);
  //   const delay = this.config.development === true ? 4000 : 2000;
  //   notice.show();
  //   window.setTimeout(function () {
  //     notice.addClass('show');
  //     self.button.removeClass(self.states.wait);
  //     window.setTimeout(function () {
  //       notice.removeClass('show');
  //       window.setTimeout(function () {
  //         notice.hide();
  //       }, 310);
  //     }, delay);
  //   }, 10);
  // };
  //

}

// if (messages && messages.length > 0
//   .show.notice.error.notice-error){
//   for (message in messages){}}


export default angular.module('es4App.transaction', [uiRouter])
  .component('transaction', {
    template: require('./transaction.html'),
    controller: TransactionComponent,
    controllerAs: 'TransactionCtrl'
  })
  .name;
