'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('login', {
    url: '/new',
    template: require('./login/login.html'),
    controller: 'LoginController',
    controllerAs: 'vm'
  })
    .state('logout', {
      url: '/logout?referrer',
      referrer: '',
      template: '',
      controller($state, Auth) {
        'ngInject';

        let main = $state.params.referrer || $state.current.referrer || 'main';
        Auth.logout();
        $state.go(main);
      }
    })
    .state('signup', {
      url: '/signup',
      template: require('./signup/signup.html'),
      controller: 'SignupController',
      controllerAs: 'vm'
    })
    .state('settings', {
      url: '/settings',
      template: require('./settings/settings.html'),
      controller: 'SettingsController',
      controllerAs: 'vm',
      authenticate: true
    }).state('verify_phone', {
      url: '/verify_phone',
      template: require('./verify_phone/verify_phone.html'),
      controller: 'VerifyPhoneController',
      controllerAs: 'vm',
      authenticate: true
    });
}
