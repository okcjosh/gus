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


  /*@ngInject*/
  constructor(Auth, $state, $http, $scope) {
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
        .then((u) => {
          console.log(u);
          // Logged in, redirect to home
          this.$state.go('main');
        })
        .catch(err => {
          this.errors.login = err.message;
        });
    }
  }

  loginLeo(form) {
    this.submitted = true;

    if(form.$valid) {
      this.Auth.loginLeo({
        email: this.user.email,
        password: this.user.password
      }, (err, id) => {
          if (err) {
            this.errors.login = err.message;
            return;
          }
          window.localStorage.setItem('temp_leo_id', id);
          
          // Logged in, redirect to home
          this.$state.go('leo-events', { leo_id: id });
      });
    }
  }

  forgotPassword() {
    this.$http.get('/api/users/'+ this.forgotEmail +'/forgot_password')
      .then(res => this.showForgotCodeInput = true)
      .catch(err => console.log(err));
  }

  submitForgotCode() {
    this.$http.put('/api/users/forgot_password', { 
      code: this.forgotPasswordCode,
      password: this.forgotNewPassword
    })
      .then(res => this.showForgotCodeInput = false)
      .catch(err => console.log(err));
  }
}
