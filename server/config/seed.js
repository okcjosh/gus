/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';
var Thing = sqldb.Thing;
var User = sqldb.User;
var Product = sqldb.Product;
var Event = sqldb.Event;
var Leo = sqldb.Leo;

Thing.sync()
  .then(() => {
    return Thing.destroy({ where: {} });
  })
  .then(() => {
    Thing.bulkCreate([{
      name: 'Development Tools',
      info: 'Integration with popular tools such as Webpack, Gulp, Babel, TypeScript, Karma, '
            + 'Mocha, ESLint, Node Inspector, Livereload, Protractor, Pug, '
            + 'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, '
            + 'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep '
            + 'tests alongside code. Automatic injection of scripts and '
            + 'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more '
            + 'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript '
            + 'payload, minifies your scripts/css/images, and rewrites asset '
            + 'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku '
            + 'and openshift subgenerators'
    }]);
  });

Product.sync()
  .then(() => {
    return Product.destroy({ where: {} });
  })
  .then(() => {
    Product.bulkCreate([{
      name: 'Development Tools',
      info: 'Integration with popular tools such as Webpack, Gulp, Babel, TypeScript, Karma, '
      + 'Mocha, ESLint, Node Inspector, Livereload, Protractor, Pug, '
      + 'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, '
      + 'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep '
      + 'tests alongside code. Automatic injection of scripts and '
      + 'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more '
      + 'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript '
      + 'payload, minifies your scripts/css/images, and rewrites asset '
      + 'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku '
      + 'and openshift subgenerators'
    }]);
  });

Leo.sync()
  .then(() => {
    return Leo.destroy({ where: {} });
  })
  .then(() => {
    Leo.bulkCreate([{
      name: 'Joe McJoseph',
      phone: '+14056844042',
      email: 'joe@joe.com',
      department_id: 'DPD',
      year_started: '2011',
      lastGig: '01/01/11'
    }, {
      name: 'Police Officer',
      phone: '+14056844042',
      email: 'test@test.com',
      department_id: 'DPD',
      year_started: '2011',
      lastGig: '02/02/22'
    }, {
      name: 'Mr. Rogers',
      phone: '+14056844042',
      email: 'test@test.com',
      department_id: 'DPD',
      year_started: '2011',
      lastGig: '03/03/33'
    }, {
      name: 'Sargent McGruff',
      phone: '+14056844042',
      email: 'test@test.com',
      department_id: 'DPD',
      year_started: '2011',
      lastGig: '04/04/44'
    }, {
      name: 'Five Ohh',
      phone: '+14056844042',
      email: 'test@test.com',
      department_id: 'DPD',
      year_started: '2011',
      lastGig: '05/05/55'
    }, {
      name: 'Lethal Weapon ',
      phone: '+14056844042',
      email: 'test@test.com',
      department_id: 'DPD',
      year_started: '2011',
      lastGig: '05/06/66'
    }]);
  });

User.sync()
  .then(() => User.destroy({ where: {} }))
  .then(() => {
    User.bulkCreate([{
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    }])
    .then(() => {
      console.log('finished populating users');
    });
  });
Event.sync()
  .then(() => {
    return Event.destroy({ where: {} });
  })
  .then(() => {
    Event.bulkCreate([{
      eventTitle: 'Football A3',
      date: '10/31/2016',
      location_desc: 'Cowboys Stadium',
      address: '123 Go Fuck Yourself Way',
      department_id: 'DPD',
      status_id: 'ABC123',
      leo_id: 'BALLZ'
    }, {
      eventTitle: 'After Church Gangbang',
      date: '11/31/2016',
      location_desc: 'First GOP Baptist',
      address: '123 Go Fuck Yourself Way',
      department_id: 'OKCPD',
      status_id: 'ABC124',
      leo_id: 'Deepthroat'
    }, {
      eventTitle: 'Make America Great Again Rally',
      date: '12/31/2016',
      location_desc: 'Satans House',
      address: '666 LULZ Drive',
      department_id: 'DPD',
      status_id: 'ABC125',
      leo_id: 'Boomer'
    }]);
  });
