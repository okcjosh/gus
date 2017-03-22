'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('leo-events', {
    url: '/leos/:leo_id/events',
    template: '<leo-dashboard></leo-dashboard>'
  });
}

