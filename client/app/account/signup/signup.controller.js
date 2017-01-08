'use strict';

import angular from 'angular';

export default class SignupController {
  user = {
    name: '',
    email: '',
    password: '',
    phone: ''
  };
  errors = {};
  submitted = false;
  form;


  /*@ngInject*/
  constructor(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;
  }

  setForm(form) {
    this.form = form;
  }

  $onInit() {
    let self = this;

    var telInput = $("#phone"),
      errorMsg = $("#error-msg"),
      validMsg = $("#valid-msg");

    // initialise plugin
    telInput.intlTelInput({
      //utilsScript: "../../build/js/utils.js"
    });

    var reset = function() {
      telInput.removeClass("has-error");
      errorMsg.addClass("hide");
      validMsg.addClass("hide");
    };

    // on blur: validate
    telInput.blur(() => {
      self.user.phone = telInput.intlTelInput('getNumber');
      self.form.phone.$setValidity('mongoose', true);
      reset();
      if ($.trim(telInput.val())) {
        if (telInput.intlTelInput("isValidNumber")) {
          validMsg.removeClass("hide");
        } else {
          telInput.addClass("has-error");
          errorMsg.removeClass("hide");
        }
      }
    });

    // on keyup / change flag: reset
    telInput.on("keyup change", reset);

  }

  register(form) {
    this.submitted = true;

    if (form.$valid) {
      return this.Auth.createUser({
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          phone: this.user.phone
        })
        .then(() => {
          // Account created, redirect to home
          this.$state.go('main');
        })
        .catch(err => {
          err = err.data;
          this.errors = {};

          // Update validity of form fields that match the sequelize errors
          if (err.name) {
            for (var field in err.fields) {
              console.log(field, form);
              form[field].$setValidity('mongoose', false);
              this.errors[field] = err.message;
            }
          }
        });
    }
  }
}
