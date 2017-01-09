'use strict';

export default class VerifyPhoneController {
  verificationCode = '';
  errors = {
    other: undefined
  };
  message = '';
  submitted = false;


  /*@ngInject*/
  constructor(Auth, $http, $state) {
    this.Auth = Auth;
    this.$http = $http;
    this.$state = $state;
  }

  verify(form) {
    this.submitted = true;

    if(form.$valid) {
      this.$http.post('/api/users/me/verify_phone', {code: this.verificationCode})
        .then((res) => {
          this.message = 'Phone number successfully verified.';
          setTimeout(() => {
            this.$state.go('event');
          }, 1000);
        })
        .catch((res) => {
          this.submitted = false;
          console.log('ERROR');
         // form.code.$setValidity('mongoose', false);
          this.errors.other = 'Incorrect verification code';
          this.message = res.data.message;
        });
    }
  }

  requestCode() {
    this.$http.get('/api/users/me/generate_phone_code')
      .then((res) => {
        this.message = 'Check your mobile phone, code has been sent through SMS'
      });
  }
}
