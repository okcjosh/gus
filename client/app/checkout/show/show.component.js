'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');
import routes from './show.routes';

export function BrainsComponent(config) {
  this.config = config;
  this.config.development = config.development || false;

  this.paymentForm = $('#' + config.formID);
  this.inputs = $('input[type=text], input[type=email], input[type=tel]');
  this.button = this.paymentForm.find('.button');

  this.states = {
    show: 'active',
    wait: 'loading'
  };
  this.focusClass = 'has-focus';
  this.valueClass = 'has-value';

  this.initialize();
}

BrainsComponent.prototype.initialize = function () {
  const self = this;

  this.events();
  this.inputs.each(function (index, element) {
    self.labelHander($(element));
  });
  this.notify('error');
};

BrainsComponent.prototype.events = function () {
  const self = this;

  this.inputs.on('focus', function () {
    $(this).closest('label').addClass(self.focusClass);
    self.labelHander($(this));
  }).on('keydown', function () {
    self.labelHander($(this));
  }).on('blur', function () {
    $(this).closest('label').removeClass(self.focusClass);
    self.labelHander($(this));
  });
};

BrainsComponent.prototype.labelHander = function (element) {
  const self = this;
  const input = element;
  const label = input.closest('label');

  window.setTimeout(function () {
    const hasValue = input.val().length > 0;

    if (hasValue) {
      label.addClass(self.valueClass);
    } else {
      label.removeClass(self.valueClass);
    }
  }, 10);
};

BrainsComponent.prototype.notify = function (status) {
  const self = this;
  const notice = $('.notice-' + status);
  const delay = this.config.development === true ? 4000 : 2000;

  notice.show();

  window.setTimeout(function () {
    notice.addClass('show');
    self.button.removeClass(self.states.wait);

    window.setTimeout(function () {
      notice.removeClass('show');
      window.setTimeout(function () {
        notice.hide();
      }, 310);
    }, delay);
  }, 10);
};
export default angular.module('gusApp.show', [uiRouter])
  .config(routes)
  .component('show', {
    template: require('./show.html'),
    controller: BrainsComponent,
    controllerAs: 'brainsCtrl'
  })
  .name;
