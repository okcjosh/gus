/* eslint-disable no-shadow */
'use strict';

export function authInterceptor($q, $cookies, $injector, Util) {
  //noinspection BadExpressionStatementJS
  'ngInject';

  let state;
  return {
    // Add authorization token to headers
    request(config) {
      config.headers = config.headers || {};
      if($cookies.get('token') && Util.isSameOrigin(config.url)) {
        config.headers.Authorization = `Bearer ${$cookies.get('token')}`;
      }
      return config;
    },

    // Intercept 401s and redirect you to new
    response(response) {
      if(response.config.url === '/api/users/me' && !response.data.phone_verified) {
        (state || (state = $injector.get('$state')))
        .go('verify_phone');
      }
      return response;
    },

    // Intercept 401s and redirect you to new
    responseError(response) {
      let state = state || (state = $injector.get('$state'));
      if(response.status === 401 && state.current.name !== 'event-details') {
        state.go('login');
  // remove any stale tokens
        $cookies.remove('token');
      }
      return $q.reject(response);
    }
  };
}
