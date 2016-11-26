'use strict';

export default function($stateProvider) {
  let helloState = {
    name: 'hello',
    url: '/hello',
    template: '<h3>hello world!</h3>'
  };

  let aboutState = {
    name: 'about',
    url: '/about',
    template: '<h3>Its the UI-Router hello world app!</h3>'
  };

  $stateProvider.state(helloState);
  $stateProvider.state(aboutState);
}
