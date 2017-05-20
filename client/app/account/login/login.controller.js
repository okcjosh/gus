/* eslint-disable no-unused-vars */
import * as console from 'nodemon/lib/utils/index';
'use strict';

export default class LoginController {
  user = {
    name: '',
    email: '',
    password: ''
  };
  errors = {
    login: undefined
  };
  submitted = false;
  forgotEmail = '';
  forgotNewPassword ;
  forgotPasswordCode;


  /*@ngInject*/
  constructor(Auth, $state, $http) {
    this.Auth = Auth;
    this.$state = $state;
    this.$http = $http;
  }

  login(form) {
    this.submitted = true;

    if(form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
        .then(u => {
          // Logged in, redirect to home
          this.$state.go('main');
        })
        .catch(err => {
          this.errors.login = err.message;
        });
    }
  }

  forgotPassword() {
    this.$http.get(`/api/users/${this.forgotEmail}/forgot_password`)
      .then(u => {
        this.showForgotCodeInput = true;
      })
      .catch(err => console.log(err));
  }

  submitForgotCode() {
    this.$http.put('/api/users/forgot_password', {
      code: this.forgotPasswordCode,
      password: this.forgotNewPassword
    })
      .then(u => {
        this.showForgotCodeInput = false;
      })
      .catch(err => console.log(err));
  }
}
