// Polyfills
// (these modules are what are in 'angular/bundles/angular-polyfills' so don't use that here)

// import 'ie-shim'; // Internet Explorer
// import 'es6-shim';
// import 'es6-promise';
// import 'es7-reflect-metadata';

// Prefer CoreJS over the polyfills above
import 'core-js/es6';
import 'core-js/es7/reflect';
let ENV;
// require('zone.js/dist/zone');


if(!ENV) {
 ENV = 'development';
}

if(ENV === 'production') {
  // Production
} else {
  // Development


 Error.stackTraceLimit = Infinity;

  // require('zone.js/dist/long-stack-trace-zone');
}
